  'use strict';
  var _ = require('lodash');
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var commandList = require('./command_list');


  //var compiled = _.template('hello {{ user }}!');
  //compiled({ 'user': 'mustache' });

  module.exports = function(data) {
      var head = [
          "'use strict';",
          "module.exports = function(app) {",
          "    var isEnabled = 1;",
          "",
          "    if (isEnabled) {",
          "        var URL = '{{main_url}}';",
          "",
          "        var chai = app.chai;",
          "        var driver = app.driver;",
          "        var until = app.until;",
          "        var By = app.By;",
          "        var waiter = app.waiter;",
          "        var $ = app.$;",
          "        var seq = app.seq;",
          "",
          "",
          "        describe('{{testcase_name}}', function() {",
          "            this.timeout(10000);",
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

      var unit_test_template = [
          "",
          "            it('- {{name}}', function(done) {",
          "",
          "                {{body_of_test}}",
          "",
          "            });"
      ].join('\n');

      var tests = data.tests.map((test, i) => {
          var body_of_test = [];
          test.steps.map((step, i) => {
              var commandTemplate = commandList[step.command];
              if (commandTemplate) {
                  body_of_test.push(commandTemplate(step.target, step.value));
              }
          });
          var compiled = _.template(unit_test_template);
          return compiled({
              name: test.name,
              body_of_test: body_of_test.join('\n')
          });

      });


      var tail = [
          "",
          "        });",
          "    }",
          "};"
      ].join('\n');

      return [head, tests.join('\n'), tail].join('\n');
  };
