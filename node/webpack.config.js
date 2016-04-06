const path = require('path');
const webpack = require('webpack');

// Django log keeps reporting a 404 at /__webpack_hmr, though
// this does not noticeably affect the app's functionality

module.exports = {
    context: path.join(__dirname, 'components/frontend'),
    entry: ["./index.js","webpack-hot-middleware/client"],
    output: {
        path: path.resolve('./assets'),
        filename: "bundle.js",
        publicPath: 'http://localhost:4000/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.jsx?$/,
                include: /components/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
