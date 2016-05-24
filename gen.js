var fs = require('fs');

var folder = process.argv[2];
var name = process.argv[3];

if (!folder) {
    console.log('Please input path name');
    return;
}

var testFile = [
    "'use strict';",
    "var express = require('express');",
    "var router = express.Router();",
    "var ctrl = require('./controller');",
    "",
    "router.post('/create', ctrl.create);",
    "router.get('/read/:id', ctrl.read);",
    "router.put('/update/:id', ctrl.update);",
    "router.delete('/delete/:id', ctrl.delete);",
    "router.get('/all', ctrl.all);",
    "",
    "",
    "module.exports = router;"
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
        console.log('Error!! Directory exists');
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
