var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'public/components');
var APP_DIR = path.resolve(__dirname, 'public/build');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: BUILD_DIR + '/Main.jsx',
    output: {
        path: APP_DIR,
        filename: '[name].js',
        library: ['app']
    },
    cache: false,
    module: {
        loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.sass/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded', { publicPath: './public/scss/' })
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            }
        ]
    }
}