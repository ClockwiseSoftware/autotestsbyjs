'use strict';

var browser = process.argv[4];


function buildDriver() {
    var sw = require('selenium-webdriver');
    var chaiWebdriver = require('chai-webdriver');
    var chai = require('chai');


    var driver = new sw.Builder()
        .forBrowser(browser)
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
