'use strict';
var fsops = require('./fsops');
var app = require('./app');
var path = require('path');
var _ = require('lodash');
var dirSuites = './suites';
var dir = './tests';
app.root = __dirname;

function builder() {

    var filesSuites = fsops.filepathGetter(path.join(__dirname, dirSuites));
    var files = fsops.filepathGetter(path.join(__dirname, dir));
    var allTestFiles = [];
    /*
		todo нужно научится подсоединять и тести без сьютов и сами сьюты
    */
    filesSuites.forEach(function(filepathSuite) {
        var fileSuite = filepathSuite.replace(/\.js/, '');

        var includedFileSuite = require(fileSuite);
        if (includedFileSuite) {
            console.log('-- INCLUDE "' + fileSuite);
            allTestFiles = allTestFiles.concat(includedFileSuite.tests);
            includedFileSuite.run(app);
        }

    });
    allTestFiles = _.uniq(allTestFiles);

    files.forEach(function(filepath) {
        var file = filepath.replace(/\.js/, '');
        if(_.includes(allTestFiles, file)){
        	return;
        }
        var includedFile = require(file);
        if (includedFile) {
            console.log('-- INCLUDE "' + file);
            includedFile(app);
        }

    });


}


builder();
