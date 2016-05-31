'use strict';
var fsops = require('./fsops');
var app = require('./app');
var dir = './tests';

function builder(dir) {

    var files = fsops.filepathGetter(dir);

    files.forEach(function(filepath) {
        var file = filepath.replace(/\.js/, '');
        var includedFile = require(file);
        if (includedFile) {
            console.log('-- INCLUDE "' + file);
            includedFile(app);
        }
    });
}


builder(dir);