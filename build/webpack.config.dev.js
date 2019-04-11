const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ],
    entry: {
        client: './src/client/client.js',
        bundle: './src/client/bundle.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../dist/assets'),
        filename: '[name].js',
        publicPath: '/'
    },
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
                test:/\.json$/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{loader: 'html-loader'}]
            },
            {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
}