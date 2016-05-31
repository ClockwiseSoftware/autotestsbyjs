function Parser(name, folder) {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var template = require('./template');
    var fsops = require('../fsops');
    var pathNode = require('path');

    var pathSrc = pathNode.join(__dirname, '..', 'selenium_ide_src');
    var pathDist = pathNode.join(__dirname, '..', 'tests');
    var dirSrc = pathSrc;
    var dirDest = pathDist;

    if (folder) {
        dirSrc = pathNode.join(dirSrc, folder);
        dirDest = pathNode.join(dirDest, folder);
    }

    if (!name) {
        var files = fsops.filepathGetter(dirSrc);
        (files || []).forEach(function(file) {
            readAndGenerate(file);
        });
    } else {
        readAndGenerate(pathNode.join(dirSrc, name + '.html'));
    }



    function readAndGenerate(file) {
        var name = fsops.getModuleName(file, 1);
        var includedDir = file.replace(dirSrc, '').replace(name, '');
        var isIncluded = includedDir.replace('/', '').length;
        var dest = dirDest;
        if(isIncluded){
            dest = pathNode.join(dest, includedDir);
        }

       
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            var parsed = parser(data);
            var newTest = template(parsed);
            generate(newTest, name.replace('.html',''), dest);
        });
    }

    function parser(html) {
        var $ = cheerio.load(html);
        var testCase = {};
        testCase.testCaseName = $('title').text();

        var tr = $('tbody > tr');

        var tests = [];
        tr.each((i, el) => {
            var td = $(el).find('td');
            var test = {
                command: $(td).eq(0).text(),
                target: $(td).eq(1).text(),
                value: $(td).eq(2).text()
            };

            tests.push(test);


        });
        testCase.tests = tests;

        return testCase;
    }





    function fileHandler(file) {
        return function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(file + ' has been saved');
        };
    }

    function generate(testFile, name, dest) {

        fs.exists(dest, function(exists) {
            if (exists) {
                var filename = dest + '/' + name + '.js';
                fs.writeFile(filename, testFile, fileHandler(filename));
            } else {
                fs.mkdir(dest, '0755', function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        var filename = dest + '/' + name + '.js';
                        fs.writeFile(filename, testFile, fileHandler(filename));
                    }
                });
            }
        });
    }

}



var o = {};
process.argv
    .filter(function(el) {
        return /file=/.test(el) || /folder=/.test(el);
    })
    .forEach(function(el) {
        var s = el.split('=');
        if (/file=/.test(el)) {
            o.name = s[1];
        }
        if (/folder=/.test(el)) {
            o.folder = s[1];
        }
    });
if (o.name) {
    Parser(o.name, o.folder);
}


module.exports = Parser;
