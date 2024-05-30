const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );

module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve( process.cwd(), 'src', 'index.js' ),
        frontend: path.resolve( process.cwd(), 'src', 'frontend.js' ),
        style: path.resolve( process.cwd(), 'src', 'style.scss' ),
        editor: path.resolve( process.cwd(), 'src', 'editor.scss' ),
    },
    optimization: {
        ...defaultConfig.optimization,
        splitChunks: {
            cacheGroups: {
                editor: {
                    name: 'editor',
                    test: /editor\.(sc|sa|c)ss$/,
                    chunks: 'all',
                    enforce: true,
                },
                style: {
                    name: 'style',
                    test: /style\.(sc|sa|c)ss$/,
                    chunks: 'all',
                    enforce: true,
                },
                default: false,
            },
        },
    },
    module: {
        ...defaultConfig.module
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtractPlugin( {
            filename: '[name].css',
        } ),
        new IgnoreEmitPlugin( [ 'editor.js', 'style.js'] ),
    ],
    resolve: {
    extensions: ['.js', '.jsx', '.scss'],
        alias: {
        '@': path.resolve(__dirname, 'src'),
    },
},
};
