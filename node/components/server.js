"use strict";

// Setup webpack and middleware
const webpackConfig = require('../webpack.config');
const compiler = require('webpack')(webpackConfig);
const webpackMiddleware = {
    dev: require('webpack-dev-middleware'),
    hot: require('webpack-hot-middleware')
};

// Create express app
const http = require('http');
const express = require('express');


const app = express();
// Attach dev middleware
app.use(webpackMiddleware.dev(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
// Attach hot middleware
app.use(webpackMiddleware.hot(compiler));
app.use(express.static('assets'));

module.exports = new http.Server(app);