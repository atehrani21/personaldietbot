var express = require('express');
var fs = require('fs');

/**
 * Format all api file names as './api/apiname' for easy reference and access to calls
 */

var API = {};
fs.readdirSync('./scripts/api/_api').forEach(function (file) {
  if (file.match(/\.js$/) !== null) {
    var name = file.replace('.js', '');
    API[name] = require('./_api/' + file);
  }
});

module.exports = API;
