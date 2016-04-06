const urls = require('../settings').urls;

function apiCall(uri, method) {
    // Performs asynchronous call to Django Rest Framework
    // Use with .done(function(res) { console.log(res); });
    return $.ajax(urls.api + uri, {
        method: method,
        dataType: "json"
    });
}

exports.get = (uri) => apiCall(uri, "GET");
exports.post = (uri) => apiCall(uri, "POST");
exports.getUser = () => apiCall('/users/me/', "GET");