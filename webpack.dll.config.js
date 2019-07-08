const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        // "App": "./app/bootstrap/bootstrap.js",
        vendor: [
            '@uirouter/angularjs',
            'oclazyload',
            'underscore',
            'layui-laydate',
            'jquery',
            'angular-ui-tree',
            'angular-ui-notification',
            'angular-ui-bootstrap',
            'angular-file-upload',
            'angular-confirm1',
            'angular-animate'
        ]
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name]-[hash].js",
        library: '[name]_[hash]'
    },

    plugins: [
        // dll
        new webpack.DllPlugin({
            // DllPlugin的name属性需要和libary保持一致
            name: '[name]_[hash]',
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            context: __dirname,
            // context需要和webpack.config.js保持一致
        }),
    ]
};
