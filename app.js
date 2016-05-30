'use strict';

var browser = process.env.browser;

function buildDriver() {
    var sw = require('selenium-webdriver');
    var chaiWebdriver = require('chai-webdriver');
    var chaiWebdriverExec = require('chai-webdriver-exec');
    var chai = require('chai');


    var driver = new sw.Builder()
        .forBrowser(browser|| 'firefox')
        .build();

    function waiter(time) {
        var x = false;
        return function() {
            setTimeout(function() {
                x = true;
            }, time);
            return x;

        };

    }

    chai.use(chaiWebdriverExec(driver));
    chai.use(chaiWebdriver(driver));
    return {
        driver: driver,
        chai: chai,
        waiter: waiter,
        By: sw.By,
        until: sw.until,
        seq: sw.ActionSequence
    };
}

var app = buildDriver();


module.exports = app;
