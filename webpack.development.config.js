const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        "App": "./app/bootstrap/bootstrap.js",
    },

    // devServer，内置编译至内存的服务
    devServer: {
        hot: true,
        proxy: {
            '/oshoms': {
                // 孙雨大佬
                target :'http://IQSZ-L3314:8088',
                secure: false,
                changeOrigin: true,
                clientLogLevel: 'debug'
            }
        }
    },

    devtool: 'source-map',

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
            "window.jQuery": "jquery",
            _: "underscore"
        }),

        new webpack.HotModuleReplacementPlugin()
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
                include: [/app/],
                exclude: [/@uirouter/, /(node_modules)/]
            },
            {
                test: /\.js$/,
                include: [/app/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            // 得用legacy，不然decorator function只能获取class的descriptors
                            ['@babel/plugin-proposal-decorators', {"legacy": true}]
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
                        attrs: [':ng-include']
                        // removeComments: true
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
                            sourceMap: true
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
                        sourceMap: true
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