function Parser(name, folder) {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var template = require('./template');
    var fsops = require('../fsops');
    var pathNode = require('path');
    var async = require('async');
    var _ = require('lodash');

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
        async.eachSeries((files || []), function(file, done) {
            readAndGenerate(file, done);
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    } else {
        readAndGenerate(pathNode.join(dirSrc, name + '.html'));
    }



    function readAndGenerate(file, done) {
        var name = fsops.getModuleName(file, 1);
        var includedDir = file.replace(dirSrc, '').replace(name, '');
        var isIncluded = includedDir.replace('/', '').length;
        var dest = dirDest;
        if (isIncluded) {
            dest = pathNode.join(dest, includedDir);
        }


        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            var parsed = parser(data);
            var newTest = template(parsed);
            generateListOfCommands(parsed);
            generate(newTest, name.replace('.html', ''), dest, done);
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





    function fileHandler(file, done) {
        return function(err) {
            if (err) {
                console.trace(err);
                return;
            }

            console.log(file + ' has been saved');
            if (done) {
                done();
            }
        };
    }

    function generate(testFile, name, dest, done) {
        name = name.replace(new RegExp('\ ', 'g'), '_');
        fs.exists(dest, function(exists) {
            if (exists) {
                var filename = dest + '/' + name + '.js';
                fs.writeFile(filename, testFile, fileHandler(filename, done));
            } else {
                fs.mkdir(dest, '0755', function(err) {
                    if (err) {
                        console.trace(err);
                    } else {
                        var filename = dest + '/' + name + '.js';
                        fs.writeFile(filename, testFile, fileHandler(filename, done));
                    }
                });
            }
        });
    }

    function generateListOfCommands(testCase) {
        var tests = testCase.tests;
        var filtered = _.chain(tests).map(el => el.command).uniq();
        var commandNames = filtered.map(el => '- '+el).value().join('\n');
        var commands = filtered.map(el => '```js\ncmd.' +el +'("target", "value").wait(1000).end(done);\n```\n').value().join('\n');
        fs.writeFile(pathNode.join(__dirname, '..', 'commandList.md'), '#LIST OF COMMAND NAMES\n\n'+commandNames + '\n\n\n' + '#LIST OF COMMANDS\n\n' +commands, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Command list created');
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
