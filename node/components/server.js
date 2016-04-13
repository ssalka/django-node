"use strict";

// Webpack
const webpackConfig = require('../webpack.config');
const compiler = require('webpack')(webpackConfig);
const webpackMiddleware = {
    dev: require('webpack-dev-middleware'),
    hot: require('webpack-hot-middleware')
};

// Express
const http = require('http');
const express = require('express');
const app = express();

// React
var reactRender = require('react-render');
const bodyParser = require('body-parser');

// Ensure support for loading files that contain ES6+7 & JSX
require('babel-register');

// Set up express app
app.use(bodyParser.json());
app.use(webpackMiddleware.dev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackMiddleware.hot(compiler));
app.use(express.static('assets'));

// Render
app.post('/render', function (req, res) {
    reactRender(req.body, function (err, markup) {
        if (err) {
            res.json({
                error: {
                    type: err.constructor.name,
                    message: err.message,
                    stack: err.stack
                },
                markup: null
            });
        } else {
            res.json({
                error: null,
                markup: markup
            });
        }
    });
});

module.exports = new http.Server(app);