"use strict";

const qs = require('querystring');
const http = require('http');

// Received by Django
const defaults = {
    host: 'localhost',
    port: 8000,
    path: '/node_api',
    method: 'POST'
};

const getOptions = (query, options) => {
    return Object.assign(options, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': query.length
        }
    });
};

exports.post = function (params) {
    var query = qs.stringify(params);
    var options = getOptions(query, defaults);
    var response = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', (info) => {
            if (info != 'success') {
                console.log(info);
            }
        });
    });
    response.write(query);
    response.end();
};
