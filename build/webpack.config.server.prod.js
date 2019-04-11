const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        server: './src/api/server.js'
    },
    // devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{loader: 'html-loader'}]
            },
            {
              test: /\.graphql?$/,
              use: [{loader: 'webpack-graphql-loader'}]
            }
        ]
    },
    stats: { children: false },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html",
    //         excludeChunks: [ 'server' ]
    //     })
    //   ]
}