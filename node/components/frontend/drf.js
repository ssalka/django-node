const urls = require('../settings').urls;
const request = require('ajax-request');

function apiCall(uri, method, callback) {
    // Performs asynchronous call to Django Rest Framework
    // Use with .done(function(res) { console.log(res); });
    return request({
        url: urls.api + uri,
        method: method,
        json: true
    }, function(err, res, body) {
        if (err) throw "AJAX Error";
        callback(body);
    });
}

exports.get = (uri, callback) => apiCall(uri, "GET", callback);
exports.post = (uri, callback) => apiCall(uri, "POST", callback);
exports.getUser = (callback) => apiCall('/users/me/', "GET", callback);