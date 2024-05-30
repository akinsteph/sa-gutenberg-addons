<?php
/**
 * Updater.
 *
 * Update the Plugin directly from GitHub.
 *
 * Inspired by the Smashing Magazine Article: https://www.smashingmagazine.com/2015/08/deploy-wordpress-plugins-with-github-using-transients/
 *
 * @package sa-gutenberg-addons
 */

namespace SAGutenbergAddons\Updater;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}


class Updater {

    /**
     * File.
     * @var string.
     */
    private $file;

    /**
     * Plugin.
     * @var array.
     */
    private $plugin;

    /**
     * Basename.
     * @var string.
     */
    private $basename;

    /**
     * Active.
     * @var bool.
     */
    private $active;

    /**
     * Username.
     * @var string.
     */
    private $username;

    /**
     * Repository.
     * @var string.
     */
    private $repository;

    /**
     * Authorize Token.
     * @var string.
     */
    private $authorize_token;

    /**
     * GitHub Response.
     * @var array.
     */
    private $github_response;


    /**
     * Constructor.
     *
     * @param string $file File Path.
     */
    public function __construct( $file ) {
        $this->file = $file;
        add_action( 'admin_init', [ $this, 'set_plugin_properties' ] );
    }

    /**
     * Set plugin properties.
     */
    public function set_plugin_properties() {
        $this->plugin   = get_plugin_data( $this->file );
        $this->basename = plugin_basename( $this->file );
        $this->active   = is_plugin_active( $this->basename );
    }

    /**
     * Set the GitHub username.
     *
     * @param string $username Username.
     */
    public function set_username( $username ) {
        $this->username = $username;
    }

    /**
     * Set the GitHub repository.
     *
     * @param string $repository Repository.
     */
    public function set_repository( $repository ) {
        $this->repository = $repository;
    }

    /**
     * Authorize with a GitHub token.
     *
     * @param string $token Authorization Token.
     */
    public function authorize( $token ) {
        $this->authorize_token = $token;
    }

    /**
     * Get repository information from GitHub.
     */
    private function get_repository_info() {
        if ( is_null( $this->github_response ) ) {
            $args        = [];
            $request_uri = sprintf( 'https://api.github.com/repos/%s/%s/releases', $this->username, $this->repository );

            if ( $this->authorize_token ) {
                $args['headers']['Authorization'] = "token {$this->authorize_token}";
            }

            $response = json_decode( wp_remote_retrieve_body( wp_remote_get( $request_uri, $args ) ), true );

            if ( is_array( $response ) ) {
                $response = current( $response );
            }

            $this->github_response = $response;
        }
    }

    /**
     * Initialize the updater.
     */
    public function initialize() {
        add_filter( 'pre_set_site_transient_update_plugins', [ $this, 'modify_transient' ], 10, 1 );
        add_filter( 'plugins_api', [ $this, 'plugin_popup' ], 10, 3 );
        add_filter( 'upgrader_post_install', [ $this, 'after_install' ], 10, 3 );

        add_filter(
            'upgrader_pre_download',
            function() {
                add_filter( 'http_request_args', [ $this, 'download_package' ], 15, 2 );
                return false;
            }
        );
    }

    /**
     * Modify the transient to include GitHub update data.
     *
     * @param object $transient Transient.
     * @return object
     */
    public function modify_transient( $transient ) {
        if ( property_exists( $transient, 'checked' ) ) {
            $checked = $transient->checked;

            if ( $checked ) {
                $this->get_repository_info();
                $out_of_date = version_compare( $this->github_response['tag_name'], $checked[ $this->basename ], 'gt' );

                if ( $out_of_date ) {
                    $new_files = $this->github_response['zipball_url'];
                    $slug      = current( explode( '/', (string) $this->basename ) );

                    $plugin = [
                        'url'         => $this->plugin['PluginURI'],
                        'slug'        => $slug,
                        'package'     => $new_files,
                        'new_version' => $this->github_response['tag_name'],
                    ];

                    $transient->response[ $this->basename ] = (object) $plugin;
                }
            }
        }

        return $transient;
    }

    /**
     * Add plugin update details to the plugins API response.
     *
     * @param object $result The Result Object.
     * @param string $action Action.
     * @param object $args Arguments.
     * @return object
     */
    public function plugin_popup( $result, $action, $args ) {
        if ( ! empty( $args->slug ) && ( current( explode( '/', (string) $this->basename ) ) === $args->slug ) ) {
            $this->get_repository_info();

            $plugin = [
                'name'              => $this->plugin['Name'],
                'slug'              => $this->basename,
                'requires'          => '5.0',
                'tested'            => '5.8',
                'rating'            => '0',
                'num_ratings'       => '0',
                'downloaded'        => '0',
                'added'             => '2021-01-01',
                'version'           => $this->github_response['tag_name'],
                'author'            => $this->plugin['AuthorName'],
                'author_profile'    => $this->plugin['AuthorURI'],
                'last_updated'      => $this->github_response['published_at'],
                'homepage'          => $this->plugin['PluginURI'],
                'short_description' => $this->plugin['Description'],
                'sections'          => [
                    'Description' => $this->plugin['Description'],
                    'Updates'     => $this->github_response['body'],
                ],
                'download_link'     => $this->github_response['zipball_url'],
            ];

            return (object) $plugin;
        }

        return $result;
    }

    /**
     * Add authorization token to the package download request.
     *
     * @param array  $args Arguments.
     * @param string $url URL.
     * @return array
     */
    public function download_package( $args, $url ) {
        if ( null !== $args['filename'] && $this->authorize_token ) {
            $args = array_merge( $args, [ 'headers' => [ 'Authorization' => "token {$this->authorize_token}" ] ] );
        }

        remove_filter( 'http_request_args', [ $this, 'download_package' ] );

        return $args;
    }

    /**
     * Handle actions after the plugin has been installed.
     *
     * @param Object $response Response.
     * @param string $hook_extra Hook.
     * @param Object $result Result.
     * @return Object.
     */
    public function after_install( $response, $hook_extra, $result ) {
        global $wp_filesystem;

        $install_directory = plugin_dir_path( $this->file );
        $wp_filesystem->move( $result['destination'], $install_directory );
        $result['destination'] = $install_directory;

        if ( $this->active ) {
            activate_plugin( $this->basename );
        }

        return $result;
    }
}
