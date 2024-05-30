# SA Gutenberg Addons

**SA Gutenberg Addons* is a WordPress plugin that enhances the default Gutenberg editor by adding custom blocks and formats. This plugin provides additional functionalities to make your content creation more versatile and powerful.

## Features

- **Custom Container Block**: Enhance your content with custom blocks.
- **Inline Tooltip Format**: Add tooltips to your text with ease.
- **Responsive Design**: All blocks are responsive and adapt to various screen sizes.
- **Easy to Use**: Simple and intuitive interface for adding custom blocks and formats.

## Installation

### Prerequisites

- WordPress 5.0 or higher
- PHP 7.0 or higher
- Node.js and npm (for development)

### Steps

1. **Clone the Repository**

    ```sh
    git clone https://github.com/akinsteph/sa-gutenberg-addons.git
    ```

2. **Navigate to the Plugin Directory**

    ```sh
    cd sa-gutenberg-addons
    ```

3. **Install Composer Dependencies**

    ```sh
    composer install
    ```

4. **Dump Autoload Files**

    ```sh
    composer dump-autoload
    ```

5. **Install Node Dependencies**

    ```sh
    npm install
    ```

6. **Build Assets**

    ```sh
    npm run build
    ```

7. **Activate the Plugin**

    - Upload the plugin folder to the `/wp-content/plugins/` directory.
    - Activate the plugin through the 'Plugins' screen in WordPress.

## Usage

### Adding Inline Tooltips

1. In the Gutenberg editor, select the text where you want to add a tooltip.
2. Click on the tooltip icon in the toolbar.
3. Enter the tooltip text in the input field.
4. The tooltip will be added to the selected text.

### Custom Blocks

- Use the custom blocks provided by the plugin to enhance your content.
- Customize the blocks using the block settings in the editor sidebar.

## Development

### Watch for Changes

To automatically build assets while developing, run:

```sh
npm start
```

### Build for Production
To build the assets for production, run:

```sh
npm run build
```
### Contributing
We welcome contributions to enhance the functionality of this plugin. Please fork the repository and submit a pull request with your changes.

### License
This plugin is licensed under the GPL-2.0-or-later license. See the LICENSE file for details.

### Acknowledgements
This plugin is developed and maintained by [Stephen Akinola](https://github.com/akinsteph).

For any questions or issues, please open a GitHub issue or contact us at [stephthedeveloper\[at\]gmail.com](mailto:stephthedeveloper@gmail.com).

### Additional Information

- **Composer Installation**: This section includes steps to run `composer install` and `composer dump-autoload` before activating the plugin.
- **Development Instructions**: Details on how to install dependencies, build assets, and watch for changes during development.
- **Usage Instructions**: Information on how to use the custom blocks and formats provided by the plugin.

