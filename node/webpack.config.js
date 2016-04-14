const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'components/frontend'),
    entry: ["./index.js","webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr"],
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
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    node: {
        fs: "empty"
    },
    externals: {
        // TODO: Load node_modules as external dependencies to reduce webpack compile time
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
