'use strict';
var fs = require('fs');
var path = require('path');
var app = require('./app');
var dir = './tests';

function filepathGetter(dir) {

    var files = fs.readdirSync(dir);
    var filepathArray = [];
    files.forEach(function(filename) {
        var filepath = dir + '/' + filename;
        if (fs.statSync(filepath).isDirectory()) {
            filepathArray = filepathArray.concat(filepathGetter(filepath));
        } else {
            filepathArray.push(filepath);
        }

    });
    return filepathArray;
}

function getModuleName(path) {
    var filename = path.split('/');
    return filename[filename.length - 2];
}

function builder(dir) {

    var files = filepathGetter(dir);

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