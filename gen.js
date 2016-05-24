var fs = require('fs');

var folder = process.argv[2];
var name = process.argv[3];

if (!folder) {
    console.log('Please input path name');
    return;
}

var testFile = [
    "  'use strict';",
    " module.exports = function(app) {",
    "         var isEnabled = 1;",
    "",
    "         if (isEnabled) {",
    "             var URL = 'http://google.com';",
    "",
    "             var chai = app.chai;",
    "             var driver = app.driver;",
    "             var until = app.until;",
    "             var By = app.By;",
    "             var waiter = app.waiter;",
    "             var $ = app.$;",
    "             var seq = app.seq;",
    "",
    "",
    "             describe('" + name + "', function() {",
    "                 this.timeout(10000);",
    "",
    "                 beforeEach(function() {",
    "",
    "                 });",
    "",
    "                 afterEach(function() {",
    "",
    "                 });",
    "",
    "",
    "                 it('- name of test should be here', function(done) {",
    "                     driver.get(URL);",
    "                     driver.wait(waiter(1000), 1500);",
    "                     //chai.expect('.hello').dom.to.have.text('Games').then(done);",
    "                     chai.expect('return document.title').exec.to.equal('Games').then(done);",
    "                 });",
    "",
    "             });",
    "",
    "    }",
    "};",
].join('\n');


var path = './tests/';
var dir = path + folder;


var fileHandler = function(file) {
    return function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(file + ' has been saved');
    };
};


fs.exists(dir, function(exists) {
    if (exists) {
        var filename = dir + '/' + name + '.js';
        fs.writeFile(filename, testFile, fileHandler(filename));
    } else {
        fs.mkdir(dir, '0755', function(err) {
            if (err) {
                console.log(err);
            } else {
                var filename = dir + '/' + name + '.js';
                fs.writeFile(filename, testFile, fileHandler(filename));
            }
        });
    }
});
