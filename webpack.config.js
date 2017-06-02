const webpack = require('webpack');
const path = require('path');


module.exports = {
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ],
    module: {
        rules: [
            { test: /\.html/, use: [ "html-loader" ] },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        //contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ]
};