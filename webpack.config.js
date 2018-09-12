const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlLoader = require('html-loader');
const ngCache = require('ng-cache-loader');
const styleLoader = require('style-loader');
const cssLoader = require('css-loader');
const lessLoader = require('less-loader');
const urlLoader = require('url-loader');
const webpack = require('webpack');

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
        // 解析htmlh中的APP，和vendor路径
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),

        // 引入jquery
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
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

            // html解析loader
            {
                test: /\.html$/,
                // exclude: /(index.html)/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        attrs: [':ng-include']
                        // removeComments: true
                    }
                }
            },

            // css解析loader
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
            // less解析loader
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
            },
            // 解析其它图片svg,字体文件等
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
};