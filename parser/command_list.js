'use strict';
var openUrl = require('./commands/openUrl');
var verifyTitle = require('./commands/verifyTitle');
var verifyText = require('./commands/verifyText');
var click = require('./commands/click');
var verifyElementPresent = require('./commands/verifyElementPresent');
var sendKeys = require('./commands/sendKeys');


var list = {
    open: openUrl,
    verifyTitle: verifyTitle,
    verifyText: verifyText,
    click: click,
    verifyElementPresent: verifyElementPresent,
    sendKeys: sendKeys,
};


module.exports = list;
