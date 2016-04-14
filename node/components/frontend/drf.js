const urls = require('../settings').urls;
const request = require('ajax-request');

function apiCall2(uri, method) {
    // Performs asynchronous call to Django Rest Framework
    // Use with .done(function(res) { console.log(res); });
    return $.ajax(urls.api + uri, {
        method: method,
        dataType: "json"
    });
}

function apiCall(uri, method, callback) {
    return request({
        url: urls.api + uri,
        method: method,
        json: true
    }, function(err, res, body) {
        if (err) throw "AJAX Error";
        callback(body);
    });
}

// request({
//   url: '',
//   method: 'GET',
//   data: {
//     query1: 'value1'
//   }
// }, function(err, res, body) {
//
// });
//
// var get = uri => request({
//     url: urls.api + uri,
//     json: true
// });
//
// var post = uri => request.post({
//     url: urls.api + uri,
//     json: true
// });
//
// var getUser = () => request({
//     url: urls.api + '/users/me',
//     json: true
// });

exports.get = (uri, callback) => apiCall(uri, "GET", callback);
exports.post = (uri, callback) => apiCall(uri, "POST", callback);
exports.getUser = (callback) => apiCall('/users/me/', "GET", callback);