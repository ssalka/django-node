const urls = require('../settings').urls;

// Grab user data from call to Django Rest Framework
const drf = require('./drf');
var currentUser;
drf.getUser().done(
    (user) => currentUser = user
);

var entry_el = $('#comment');
var socket = io.connect(urls.node);

socket.on('connect', function () {
    // TODO: Send notification when a new user joins
    socket.on('message', appendComment);
});

socket.on('disconnect', function() {
    // TODO: Send notification when a user leaves
});

entry_el.keypress(function (event) {
    // Submit message to be received by Node.js
    let msg = entry_el.attr('value');
    if (msg && event.keyCode == 13) {
        socket.emit('message', msg);
        entry_el.attr('value', '');
    }
});

function appendComment(msg) {
    // Adds a comment-item to DOM 
    var comment = useCharEntities(msg);
    $('#comments').append(`<li>${comment}</li>`);
    window.scrollBy(0, 10000000000);
    entry_el.focus();
}

function useCharEntities(str) {
    // Replaces HTML-sensitive characters
    // with their character references
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}