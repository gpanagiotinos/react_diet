const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        client: './src/client/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
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
    // devServer: {
    //     historyApiFallback: true,
    //     port: 8090,
    //     open: true,
    //     proxy: {
    //         '/api': 'http://localhost:8091'
    //     }
    // },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: './src/index.html',
    //         filename: './index.html',
    //         excludeChunks: ['server']
    //     })
    // ]
}