  'use strict';
  var _ = require('lodash');
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var commandList = [
      'open',
      'verifyTitle',
      'verifyText',
      'click',
      'verifyElementPresent',
      'sendKeys'

  ];


  //var compiled = _.template('hello {{ user }}!');
  //compiled({ 'user': 'mustache' });

  module.exports = function(data) {
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
          "",
          "",
          "        describe('{{testCaseName}}', function() {",
          "            this.timeout({{timeout}});",
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

      function escape(string){
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
  };
