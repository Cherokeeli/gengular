const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('HappyPack');
const os = require('os');

const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length });

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

        // dll
        new webpack.DllReferencePlugin({
            /*这个context很重要，必须指定到dist目录*/
            context: path.join(__dirname, 'dist'),
            // manifest就是我们第一步中打包出来的json文件
            manifest: require('./dist/vendor-manifest.json'),
        }),

        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader:'babel-loader',
                    options: {
                        plugins: [
                            // 得用legacy，不然decorator function只能获取class的descriptors
                            ['@babel/plugin-proposal-decorators', {"legacy": true}],
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }]
        }),
        new HappyPack({
            id: 'ejs',
            threadPool: happyThreadPool,
            loaders: [ 'ejs-loader' ]
        }),
        new HappyPack({
            id: 'html',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader:'html-loader',
                    options: {
                        minimize: true,
                        attrs: [':ng-include'],
                        removeComments: true
                    }
                }],

        }),
        new HappyPack({
            id: 'css',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        sourceMap: false
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            loaders: [ 'style-loader', {
                loader: 'css-loader',
                options: {
                    modules: false,
                    sourceMap: false
                }
            }, 'less-loader']
        }),
        new HappyPack({
            id: 'sourcemap',
            threadPool: happyThreadPool,
            loaders: [ 'source-map-loader']
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
                use: ["happypack/loader?id=sourcemap"],
                enforce: "pre",
                include: [/app/],
                exclude: [/@uirouter/, /(node_modules)/]
            },
            {
                test: /\.js$/,
                include: [/app/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'happypack/loader?id=babel',
                },
            },

            // html解析loader
            {
                test: /\.html$/,
                // exclude: /(index.html)/,
                loader: 'happypack/loader?id=html',
            },

            // ejs解析loader
            {
                test: /\.ejs$/,
                loader: 'happypack/loader?id=ejs'
            },

            // css解析loader
            {
                test: /\.css$/,
                loader: 'happypack/loader?id=css'
            },
            // less解析loader
            {
                test: /\.less$/,
                loader: 'happypack/loader?id=less'
            },
            // 解析其它图片svg,字体文件等
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
};
