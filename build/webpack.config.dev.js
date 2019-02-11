const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  })
module.exports = {
    entry: './src/client/bundle.js',
    output: {
        path: path.join(__dirname, '../assets'),
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
                test: /\.html$/,
                use: [{loader: 'html-loader'}]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        open: true,
        proxy: {
          '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        htmlPlugin
    ]
}