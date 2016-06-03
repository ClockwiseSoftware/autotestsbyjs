'use strict';

var browser = process.env.browser;
var speed = process.env.speed;
var windowWidth = process.env.windowWidth;
var windowHeigth = process.env.windowHeigth;
var isNotClose = process.env.isNotClose;

var d = 'Default';

function buildDriver() {
    var sw = require('selenium-webdriver');
    var chaiWebdriver = require('chai-webdriver');
    var chaiWebdriverExec = require('chai-webdriver-exec');
    var chai = require('chai');


    var driver = new sw.Builder()
        .forBrowser(browser || 'firefox')
        .build();

    if (!!windowWidth) {
        if (!windowHeigth) {
            windowHeigth = Math.floor(+windowWidth / 1.7777777777777777);
        }
        driver.manage().window().setSize(+windowWidth, +windowHeigth);
    }

    describe('INFO', function() {
        it('Browser: ' + browser);
        it('Speed: ' + (speed || d));
        it('Width: ' + (windowWidth || d));
        it('Height: ' + (windowHeigth || d));
    });

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
        seq: new sw.ActionSequence(driver),
        speed: speed,
        isNotClose: isNotClose
    };
}

var app = buildDriver();


module.exports = app;
