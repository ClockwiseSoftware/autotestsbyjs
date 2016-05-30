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
          "    var isEnabled = 1;",
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
          ""
      ].join('\n');

      var unitTestTemplate = [
          "",
          "            it('- {{name}}', function(done) {",
          "",
          "                {{body_of_test}}",
          "",
          "            });"
      ].join('\n');

      var compiledHead = _.template(headTemplate);
      var timeout = 0;


      var tests = data.tests.map((test, i) => {
          var body_of_test = [
              "cmd.run([",
          ];

          timeout += test.steps.length * 1000;


          test.steps.forEach((step, i) => {
              if (!!~commandList.indexOf(step.command)) {
                  var command = step.command;
                  var target = step.target.replace(new RegExp("\'", 'g'), '\\\'');
                  var value = step.value && step.value.replace(new RegExp("\'", 'g'), '\'') || '';
                  var commandTemplate = [(i > 0 ? "" : ""), "\t\t\t\t\tcmd.", command, "('", target, "'", (value ? (", '" + value + "'") : ""), "),"].join("");
                  body_of_test.push(commandTemplate);
              }

          });

          body_of_test.push('\t\t\t\t])\n\t\t\t\t.end(done);');


          var compiled = _.template(unitTestTemplate);
          return compiled({
              name: test.name,
              body_of_test: body_of_test.join('\n')
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

      return [head, tests.join('\n'), tail].join('\n');
  };
