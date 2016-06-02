module.exports = function(app) {
    var chai = app.chai;
    var driver = app.driver;
    var until = app.until;
    var By = app.By;
    var waiter = app.waiter;
    var seq = app.seq;
    var _ = require('lodash');

    var helpers = require('../helpers')(app);
    var end = helpers.end;
    var buildHelpers = helpers.buildHelpers;
    var getBy = helpers.getBy;
    var checkElement = helpers.checkElement;
    var parseStoredVars = helpers.parseStoredVars;
    var errorHandler = helpers.errorHandler;
    var e = helpers.e;
    var wait = helpers.wait;



    return {
        flow: [],
        storedVars: {},
        end: end,
        setBaseUrl: setBaseUrl,
        open: open,
        close: close,
        click: click,
        wait: wait,
        sendKeys: sendKeys,
        type: type,
        echo: echo,
        verifyTitle: verifyTitle,
        verifyText: verifyText,
        verifyElementPresent: verifyElementPresent,
        assertTitle: assertTitle,
        storeText: storeText,
        waitForElementPresent: waitForElementPresent,
        store: store,


        verifyVisible: verifyVisible,
        doubleClickAt: doubleClickAt,
        waitForPageToLoad: waitForPageToLoad,
        verifyAttribute: verifyAttribute,
        storeExpression: storeExpression,
        select: select,
        pause: pause,
        verifyValue: verifyValue,
        typeKeys: typeKeys,
        assertText: assertText,
        storeCssCount: storeCssCount,
        clickAndWait: clickAndWait,
        verifyChecked: verifyChecked,
        storeSelectOptions: storeSelectOptions,
        assertValue: assertValue,
        verifySelectOptions: verifySelectOptions,
        verifySelectedLabel: verifySelectedLabel,
        verifyNotText: verifyNotText,
        focus: focus,
        selectWindow: selectWindow,
        verifyNotVisible: verifyNotVisible,
        verifyNotEditable: verifyNotEditable,
        storeValue: storeValue,
        setSpeed: setSpeed,
        mouseOver: mouseOver,
        runScript: runScript,
        verifyNotAttribute: verifyNotAttribute,
        getEval: getEval,
        verifyEval: verifyEval,
        mouseOut: mouseOut,
        verifyLocation: verifyLocation,
        verifyElementNotPresent: verifyElementNotPresent,
        waitForText: waitForText,
        goBackAndWait: goBackAndWait
    };

    function setBaseUrl(url) {
        this.baseUrl = url || '';
    }

    function open(url, time) {
        time = time || 2000;
        var baseUrl = this.baseUrl || '';

        return buildHelpers((cb) => {
            return driver.get(baseUrl + url).then(() => {
                return wait(time)(cb);
            });

        });

    }

    function close() {
        return buildHelpers((cb) => {
            return driver.close().then(e(cb));
        }, true);

    }


    function verifyTitle() {
        return buildHelpers((cb) => {
            return driver.getTitle().then(e(cb));
        });
    }

    function assertTitle(expectedTitle) {
        return buildHelpers((cb) => {
            return chai.expect('return document.title').exec.to.equal(expectedTitle).then(e(cb));
        });
    }


    function verifyText(target, value) {

        value = parseStoredVars(value, this.storedVars);

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target))
                .then(checkElement(function(el) {
                    return el.getText();
                }), 'find')
                .then(checkElement(function(text) {
                    chai.assert.equal(text, value);
                    return cb();
                }, target + ' ' + value), errorHandler(cb));


        });

    }

    function verifyElementPresent(target) {
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.isElementPresent(by(target)).then(e(cb));
        });

    }

    function waitForElementPresent(target) {
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.wait(function() {
                return driver.isElementPresent(by(target)).then(function(el) {
                    return el;
                });
            }, 5000).then(e(cb));
        });

    }

    function store(value, variable) {
        this.storedVars[variable] = value;
        return buildHelpers((cb) => {
            return cb();
        });
    }

    function storeText(target, value) {
        var storedVars = this.storedVars;
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target))
                .then(function(el) {
                    return el.getText();
                })
                .then((text) => {
                    storedVars[value] = text;
                    cb();
                });
        });

    }

    function type(target, value) {
        value = parseStoredVars(value, this.storedVars);
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            var el = driver.findElement(by(target));
            return el.clear()
                .then(function() {
                    return el.sendKeys(value);
                })
                .then(function() {
                    return wait(500)(cb);
                }, errorHandler(cb));


        });
    }

    function echo(string) {
        string = parseStoredVars(string, this.storedVars);
        console.log('cmd.echo -> ' + string);
        return buildHelpers((cb) => {
            return cb();
        });

    }

    function click(target) {
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).click().then(function() {
                return wait(500)(cb);
            });

        });

    }

    function sendKeys(target, value) {
        value = parseStoredVars(value, this.storedVars);
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).sendKeys(value).then(function() {
                return wait(500)(cb);
            });

        });

    }









    function verifyVisible() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function doubleClickAt() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function waitForPageToLoad() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyAttribute() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function storeExpression() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function select() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function pause() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyValue() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function typeKeys() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function assertText() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function storeCssCount() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function clickAndWait() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyChecked() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function storeSelectOptions() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function assertValue() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifySelectOptions() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifySelectedLabel() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotText() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function focus() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function selectWindow() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotVisible() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotEditable() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function storeValue() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function setSpeed() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function mouseOver() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function runScript() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotAttribute() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function getEval() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyEval() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function mouseOut() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyLocation() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyElementNotPresent() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function waitForText() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function goBackAndWait() {
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }









};
