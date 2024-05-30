<?php

namespace SAGutenbergAddons;

//use SAGutenbergAddons\Formats\Tooltip\Tooltip_Format;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class SA_Gutenberg_Addons {

    /**
     * Initialize the plugin by setting up hooks.
     */
    public static function init() {
        // Load text domain for translations
        add_action( 'plugins_loaded', [ __CLASS__, 'load_textdomain' ] );

        // Enqueue editor and frontend assets
        add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'enqueue_editor_assets' ] );
        add_action( 'enqueue_block_assets', [ __CLASS__, 'enqueue_assets' ] );
    }

    /**
     * Load plugin text domain for translations.
     */
    public static function load_textdomain() {
        load_plugin_textdomain( 'sa-gutenberg-addons', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
    }

    /**
     * Enqueue assets for the block editor.
     */
    public static function enqueue_editor_assets() {
        wp_enqueue_script(
            'sa-gutenberg-addons-editor-script',
            plugins_url( '/build/index.js', dirname(__FILE__) ),
            [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-rich-text' ],
            filemtime( plugin_dir_path( __DIR__ ) . 'build/index.js' )
        );

        wp_enqueue_script(
            'sa-gutenberg-addons-frontend-script',
            plugins_url( '/build/frontend.js', dirname(__FILE__) ),
            [],
            filemtime( plugin_dir_path( __DIR__ ) . 'build/frontend.js' )
        );

        wp_enqueue_style(
            'sa-gutenberg-addons-editor-css', // Handle.
            plugins_url( '/build/editor.css', dirname(__FILE__) ),
            [ 'wp-edit-blocks' ],
            filemtime( plugin_dir_path( __DIR__ ) . 'build/editor.css' )
        );
    }

    /**
     * Enqueue assets for the frontend.
     */
    public static function enqueue_assets() {
        wp_enqueue_style(
            'sa-gutenberg-addons-style',
            plugins_url( 'build/style.css', dirname(__FILE__) ),
            [],
            filemtime( plugin_dir_path( __DIR__ ) . 'build/style.css' )
        );
        wp_enqueue_script(
            'sa-gutenberg-addons-frontend-script',
            plugins_url( '/build/frontend.js', dirname(__FILE__) ),
            [],
            filemtime( plugin_dir_path( __DIR__ ) . 'build/frontend.js' )
        );
    }
}
