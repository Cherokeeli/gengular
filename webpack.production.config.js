const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        "App": "./app/bootstrap/bootstrap.js",
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name]-[hash].js",
    },

    plugins: [
        // 解析html中的APP，和vendor路径
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),

        // 引入jquery
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            _: "underscore"
        }),

        // new webpack.HotModuleReplacementPlugin()
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
                exclude: [/@uirouter/, /(node_modules)/]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            // 得用legacy，不然decorator function只能获取class的descriptors
                            ['@babel/plugin-proposal-decorators', {"legacy": true}],
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                },
            },

            // html解析loader
            {
                test: /\.html$/,
                // exclude: /(index.html)/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        attrs: [':ng-include'],
                        removeComments: true
                    }
                }
            },

            // ejs解析loader
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
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
                            sourceMap: false
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
                        sourceMap: false
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