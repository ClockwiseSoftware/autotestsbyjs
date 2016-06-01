  'use strict';
  var _ = require('lodash');
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;



  //var compiled = _.template('hello {{ user }}!');
  //compiled({ 'user': 'mustache' });

  module.exports = {
      tests: tests,
      suites: suites
  };

  function suites(data) {
      var headTemplate = [
          "'use strict';",
          "var tests = [{{testsList}}];",
          "module.exports = {run: run, tests: tests};",
          "function run(app) {",
          "    var isEnabled = 0;",
          "",
          "    if (isEnabled) {",
          "",
          "        var cmd = require(app.root +'/wrappers/wrappers')(app);",
          "        var test = {};",
          "",
          "",
          "        describe('{{suiteName}}', function() {",
          "            this.timeout({{timeout}});",
          "",
          "",
          "            before(function() {",
          "",
          "            });",
          "",
          "            after(function(done) {",
          "               cmd.close().end(done);",
          "            });",
          ""
      ].join('\n');

      var unitTestTemplate = [
          "",
          "          try {",
          "            test['{{suiteFilePath}}'] = require('{{suiteFilePath}}');",
          "            test['{{suiteFilePath}}'](app);",
          "          } ",
          "          catch(e){",
          "            console.log(e);",
          "          }",
          ""
      ].join('\n');

      var compiledHead = _.template(headTemplate);
      var timeout = data.suites.length * 100000;


      var filePathList = data.suites.map((suiteFilePath, i) => {
          return suiteFilePath.replace(new RegExp('\ ', 'g'), '_');
      });

      data.testsList = filePathList.map(el => "'" + el + "'").join(',\n');

       var suites = filePathList.map((suiteFilePath, i) => {
          var compiled = _.template(unitTestTemplate);
          return compiled({
              suiteFilePath: suiteFilePath
          });

      });

      data.timeout = timeout;
      var head = compiledHead(data);


      var tail = [
          "",
          "        });",
          "    }",
          "};"
      ].join('\n');

      var buildedSuite = [head, suites.join('\n\n'), tail].join('\n');
      return buildedSuite;
  }

  function tests(data) {
      var headTemplate = [
          "'use strict';",
          "module.exports = function(app) {",
          "    var isEnabled = 0;",
          "",
          "    if (isEnabled) {",
          "",
          "        var chai = app.chai;",
          "        var driver = app.driver;",
          "        var until = app.until;",
          "        var By = app.By;",
          "        var waiter = app.waiter;",
          "        var $ = app.$;",
          "        var seq = app.seq;",
          "        var cmd = require('../../wrappers/wrappers')(app);",
          "        var speed = app.speed || 1;",
          "        var baseUrl = \"{{baseUrl}}\";",
          "        cmd.setBaseUrl(baseUrl);",
          "",
          "",
          "        describe('{{testCaseName}}', function() {",
          "            this.timeout({{timeout}} * speed);",
          "",
          "            beforeEach(function() {",
          "",
          "            });",
          "",
          "            afterEach(function() {",
          "",
          "            });",
          "",
          "            before(function() {",
          "",
          "            });",
          "",
          "            after(function(done) {",
          "               cmd.close().end(done);",
          "            });",
          ""
      ].join('\n');

      var unitTestTemplate = [
          "",
          "            it('- {{name}}', function(done) {",
          "",
          "                {{unit}}",
          "",
          "            });"
      ].join('\n');

      var compiledHead = _.template(headTemplate);
      var timeout = data.tests.length * 1000;

      function escape(string) {
          return string
              .replace(new RegExp("\'", 'g'), '\\\'')
              .replace(new RegExp("\"", 'g'), '\\\"')
              .replace(new RegExp("\/", 'g'), '\/');
      }

      var tests = data.tests.map((test, i) => {
          var command = test.command;
          var target = escape(test.target);
          var value = test.value && escape(test.value) || '';

          var unitTemplate = 'cmd.{{command}}("{{target}}"{{value}}).end(done);';
          var unitCompiled = _.template(unitTemplate);
          var unit = unitCompiled({
              command: command,
              target: target,
              value: value ? ', "' + value + '"' : ''
          });
          var name = unit.replace('', '').replace('cmd.', '').replace('.end(done);', '');


          var compiled = _.template(unitTestTemplate);
          return compiled({
              name: name,
              unit: unit
          });

      });
      data.timeout = timeout;
      var head = compiledHead(data);


      var tail = [
          "",
          "        });",
          "    }",
          "};"
      ].join('\n');

      return [head, tests.join('\n\n'), tail].join('\n');
  }
