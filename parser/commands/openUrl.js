'use strict';
var _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
module.exports = function(target, value) {
    var command = [
"driver.get({{URL}});",
"		driver.wait(waiter({{time}}), {{time2}});",
    ].join('\n');

    var compiled = _.template(command);
    return compiled({ URL: target, time: value, time2: value * 2 });

};
