const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: './app/js/index.js',
    output: {
        filename: "bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    mode: 'development',
};

module.exports = config;