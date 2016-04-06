"use strict";

exports.entries = function* entries(obj) {
    // Generates [key, value] pairs of an object's properties
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
};