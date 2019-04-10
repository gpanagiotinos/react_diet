const path = require('path')
module.exports = {
    entry: {
        client: './src/client/client.js',
        bundle: './src/client/bundle.js'
    },
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
            },
            {
                test: /\.(scss|sass)$/,
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader'
                }, {
                  loader: 'sass-loader',
                  options: {
                    includePaths: [path.resolve('../node_modules')]
                  }
                }]
              }
        ]
    }
}