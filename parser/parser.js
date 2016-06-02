function Parser(name, folder, isSuite) {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var template = require('./template');
    var fsops = require('../fsops');
    var pathNode = require('path');
    var async = require('async');
    var _ = require('lodash');
    var commandList = [];

    var pathSrc = pathNode.join(__dirname, '..', 'selenium_ide_src');
    var pathDist = pathNode.join(__dirname, '..', 'tests');

    var pathSuitesSrc = pathNode.join(__dirname, '..', 'selenium_ide_suites');
    var pathSuitesDest = pathNode.join(__dirname, '..', 'suites');

    var dirSrc = pathSrc;
    var dirDest = pathDist;

    var dirSuitesSrc = pathSuitesSrc;
    var dirSuitesDest = pathSuitesDest;

    if (folder) {
        dirSrc = pathNode.join(dirSrc, folder);
        dirDest = pathNode.join(dirDest, folder);

        dirSuitesSrc = pathNode.join(dirSuitesSrc, folder);
        dirSuitesDest = pathNode.join(dirSuitesDest, folder);
    }

    if (!name) {
        isSuite = true;
        var filesSuites = fsops.filepathGetter(dirSuitesSrc);
        var files = fsops.filepathGetter(dirSrc);

        async.eachSeries((filesSuites || []), function(file, done) {
            readAndGenerate(file, done);
        }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            isSuite = false;
            async.eachSeries((files || []), function(file, done) {
                readAndGenerate(file, done);
            }, function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                generateListOfCommands(commandList);
            });
        });

    } else {
        if (isSuite) {
            readAndGenerate(pathNode.join(pathSuitesDest, name + '.html'));
        } else {
            readAndGenerate(pathNode.join(dirSrc, name + '.html'));
        }
        readAndGenerate(pathNode.join(dirSrc, name + '.html'));
    }



    function readAndGenerate(file, done) {
        var name = fsops.getModuleName(file, 1);

        var dest = isSuite ? dirSuitesDest : dirDest;
        var destTest = dirDest;



        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            var parsed = isSuite ? parserSuites(data, name, destTest) : parserTests(data, snakeCase(name.replace('.html', '')) + '.js');
            var newTest = isSuite ? template.suites(parsed) : template.tests(parsed);
            if (!isSuite) {
                commandList = commandList.concat(parsed.tests);
            }
            generate(newTest, name.replace('.html', ''), dest, done);
        });
    }

    function parserTests(html, fileName) {
        var $ = cheerio.load(html);
        var testCase = {};
        testCase.testCaseName = fileName;
        testCase.baseUrl = $('link[rel="selenium.base"]').attr('href') || "";


        if(_.endsWith(testCase.baseUrl, '/')){
            testCase.baseUrl = _.trimEnd(testCase.baseUrl, '/');
        }

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

    function parserSuites(html, suiteName, dest) {

        var $ = cheerio.load(html);
        var testCase = {};
        testCase.suiteName = snakeCase(suiteName.replace('.html', '')) + '.js';

        var tr = $('tbody > tr');

        var suites = [];
        tr.each((i, el) => {
            var a = $(el).find('td > a');



            var testName = $(a).eq(0).text();
            if (!testName) {
                return;
            }
            suites.push(pathNode.join(dest, snakeCase(testName)));


        });
        testCase.suites = suites;

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
        name = snakeCase(name);
        console.log(name, dest);
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

    function generateListOfCommands(commandList) {
        var tests = commandList;
        var filtered = _.chain(tests).map(el => el.command).uniq();
        var commandNames = filtered.map(el => '- ' + el).value().join('\n');
        var commands = filtered.map(el => '```js\ncmd.' + el + '("target", "value").end(done);\n```\n').value().join('\n');
        fs.writeFile(pathNode.join(__dirname, '..', 'commandList.md'), '#LIST OF COMMAND NAMES\n\n' + commandNames + '\n\n\n' + '#LIST OF COMMANDS\n\n' + commands, function(err) {
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

function snakeCase(value){
    return value.replace(/\ /g, '_').replace(/\\/g,'\\\\');
}

module.exports = Parser;
