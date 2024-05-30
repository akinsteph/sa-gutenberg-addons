<?php
/**
 * Plugin Name: SA Gutenberg Addons
 * Description: A Gutenberg plugin that adds addons to the wordpress default gutenberg editor.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version: 1.0.0
 * Author: Stephen Akinola
 * Author URI: https://github.com/akinsteph
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package           sa-gutenberg-addons
 */

namespace SAGutenbergAddons;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}
$url = untrailingslashit( plugin_dir_url( __FILE__ ) );

// Autoload Composer dependencies
require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
require_once plugin_dir_path( __FILE__ ) . 'inc/class-sa-gutenberg-addons.php';
require_once plugin_dir_path( __FILE__ ) . 'inc/updater/class-updater.php';

// Initialize the plugin
SA_Gutenberg_Addons::init();

/**
 * Allow plugin to update from GitHub.
 */
$updater = new \SAGutenbergAddons\Updater\Updater( __FILE__ );
$updater->set_username( 'akinsteph' );
$updater->set_repository( 'sa-gutenberg-addons' );
$updater->initialize();
