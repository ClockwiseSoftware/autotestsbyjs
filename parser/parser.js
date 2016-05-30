var fs = require('fs');
var cheerio = require('cheerio');
var template = require('./template');


var folder = process.argv[3];
var name = process.argv[2];

if (!name) {
    console.log('Please input file name');
    return;
}


var path = './selenium_ide_src/';
var dir = path + (folder || "");


var fileHandler = function(file) {
    return function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(file + ' has been saved');
    };
};


fs.readFile(dir + name + '.html', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    var parsed = parser(data);
    var m = template(parsed);
    console.log(m);
});


function parser(html) {
    var content = html.replace(new RegExp('\<\!\-\-', 'g'), '<tr class="testname"><td>').replace(new RegExp('\-\-\>', 'g'), '</td></tr>');
    
    var $ = cheerio.load(content);
    var testCase = {};
    testCase.testCaseName = $('title').text();

    var tr = $('tbody > tr');

    var tests = [];
    tr.each((i, el) => {
        var td = $(el).find('td');
        if (td.length === 1) {
            var test = { name: '', steps: [] };
            test.name = $(td).eq(0).text();
            tests.push(test);
        } else {
            var t = {
                command: $(td).eq(0).text(),
                target: $(td).eq(1).text(),
                value: $(td).eq(2).text()
            };
            tests[tests.length - 1].steps.push(t);
        }

    });
    testCase.tests = tests;

    return testCase;
}
