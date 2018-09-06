const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlLoader = require('html-loader');
const ngCache = require('ng-cache-loader');
const styleLoader = require('style-loader');
const cssLoader = require('css-loader');
const lessLoader = require('less-loader');

const DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
const DEV = DEV_SERVER || process.env.DEV;

module.exports = {
    mode: DEV ? 'development' : 'production',
    entry: {
        "App": "./app/bootstrap/bootstrap.js",
    },

    devtool: DEV ? 'eval' :'source-map',


    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name]-[hash].js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ],

    resolve: {
        extensions: ['.js', '.html', '.css', '.less']
    },

    optimization: {
        splitChunks: { chunks: 'all', },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: [/@uirouter/]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: { loader: 'babel-loader' },
            },
            {
                test: /\.html$/,
                // exclude: /(index.html)/,
                use: {
                    loader: 'html-loader?exportAsEs6Default',
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            // sourceMap: true
                        }
                    }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        // sourceMap: true
                    }
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    },
};