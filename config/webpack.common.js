const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        // 'polyfills': './src/polyfills.ts',
        // 'vendor': './src/vendor.ts',
        'app': './src/main.jsx'
    },

    resolve: {
        extensions: ['.jsx', '.js']
    },

    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     // loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            //     loaders: [
            //         {
            //             loader: 'awesome-typescript-loader',
            //             options: { configFileName: helpers.root('tsconfig.json') }
            //         } , 'angular2-template-loader'
            //     ]
            // },
            // { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['react', 'env'] },
            },
            {
                test: /\.ico$$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     loader: 'file-loader?name=assets/[name].[hash].[ext]'
            // },
            // {
            //     test: /\.css$/,
            //     include: helpers.root('scss'),
            //     loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize' })
            // },
            // {
            //     test: /\.css$/,
            //     include: helpers.root('src', 'app'),
            //     loader: 'raw-loader'
            // },
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     loaders: ['raw-loader', 'sass-loader']
            // }
            // {
            //     test: /\.scss$/,
            //     include: helpers.root('scss'),
            //     loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['raw-loader', 'sass-loader', 'css-loader?minimize'] })
            //     // loaders: ['raw-loader', 'sass-loader']
            // },
            {
                test: /\.scss$/,
                // include: helpers.root('scss'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?minimize', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        // // Workaround for angular/angular#11580
        // new webpack.ContextReplacementPlugin(
        //     // The (\\|\/) piece accounts for path separators in *nix and Windows
        //     /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        //     helpers.root('./src'), // location of your src
        //     {} // a map of your routes
        // ),

        // new webpack.ContextReplacementPlugin(
        //     /angular(\\|\/)core(\\|\/)@angular/,
        //     helpers.root('./src')
        // ),
        //
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|lv/),
        //
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor', 'polyfills']
        // }),

        // new ExtractTextPlugin('style.css'),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};