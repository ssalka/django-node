"use strict";

// Local Dependencies
const ENV = require('./components/settings');
const server = require('./components/server');
const django = require('./components/django');

// Node Modules
const io = require('socket.io')(server);
const cookie_reader = require('cookie');
const redis = require('redis').createClient();

let sessionid;

server.listen(ENV.ports.node);
redis.subscribe('chat');

io.use(function (socket, next) {
    // Grab session ID from cookie
    var handshake = socket.request;
    if (handshake.headers.cookie) {
        let cookie = handshake.headers.cookie;
        sessionid = cookie_reader.parse(cookie).sessionid;
    }
    next();
});

io.on('connection', function (socket) {
    // Push updates from Redis to socket.io
    redis.on('message', function (channel, message) {
        socket.send(message);
    });

    // Message received from client is posted to Django
    socket.on('message', function (message) {
        django.post({
            comment: message,
            sessionid: sessionid
        });
    });
});