module.exports = function(app) {
    var chai = app.chai;
    var driver = app.driver;
    var until = app.until;
    var By = app.By;
    var waiter = app.waiter;
    var seq = app.seq;
    var _ = require('lodash');
    var dom = require('./dom');

    var helpers = require('../helpers')(app);
    var end = helpers.end;
    var buildHelpers = helpers.buildHelpers;
    var getBy = helpers.getBy;
    var checkElement = helpers.checkElement;
    var parseStoredVars = helpers.parseStoredVars;
    var errorHandler = helpers.errorHandler;
    var getRulesType = helpers.getRulesType;
    var getRulesTypeAndCut = helpers.getRulesTypeAndCut;
    var byTargetErrorHandler = helpers.byTargetErrorHandler;
    var webElementExtended = helpers.WebElementExtended;
    var e = helpers.e;
    var wait = helpers.wait;
    var eq = chai.assert.equal;

    var finishTest = false;



    return {
        flow: [],
        storedVars: {},
        end: end,
        setBaseUrl: setBaseUrl,

        assertText: assertText,
        assertTitle: assertTitle,
        assertValue: assertValue,
        click: click,
        clickAndWait: clickAndWait,
        close: close,
        doubleClick: doubleClick,
        doubleClickAt: doubleClick,
        echo: echo,
        focus: focus,
        getEval: getEval,
        goBackAndWait: goBackAndWait,
        mouseOut: mouseOut,
        mouseOver: mouseOver,
        open: open,
        pause: wait,
        runScript: runScript,
        select: select,
        selectWindow: selectWindow,
        sendKeys: sendKeys,
        setSpeed: setSpeed,
        store: store,
        storeCssCount: storeCssCount,
        storeExpression: store,
        storeSelectOptions: storeSelectOptions,
        storeText: storeText,
        storeValue: storeValue,
        storeEval: storeEval,
        selectFrame: selectFrame,
        type: type,
        typeKeys: sendKeys,
        verifyAttribute: verifyAttribute,
        verifyChecked: verifyChecked,
        verifyElementNotPresent: verifyElementNotPresent,
        verifyElementPresent: verifyElementPresent,
        verifyEval: verifyEval,
        verifyLocation: verifyLocation,
        verifyNotAttribute: verifyNotAttribute,
        verifyNotEditable: verifyNotEditable,
        verifyNotText: verifyNotText,
        verifyNotVisible: verifyNotVisible,
        verifySelectedLabel: verifySelectedLabel,
        verifySelectOptions: verifySelectOptions,
        verifyText: verifyText,
        verifyTitle: verifyTitle,
        verifyValue: verifyValue,
        verifyVisible: verifyVisible,
        wait: wait,
        waitForElementPresent: waitForElementPresent,
        waitForPageToLoad: waitForPageToLoad,
        waitForText: waitForText,
    };

    function setBaseUrl(url) {
        this.baseUrl = url || '';
    }




    function open(url, time) {
        url = parseStoredVars(url, this.storedVars);
        time = time || 2000;
        var baseUrl = this.baseUrl || '';

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return driver.get(baseUrl + url).then(() => {
                return wait(time)(cb);
            });

        });

    }

    function checkExit(isAssert, actualy, expected) {
        if (isAssert && actualy !== expected) {
            finishTest = false;
        }
    }

    function finish() {
        return buildHelpers((cb) => {
            return cb(new Error('TEST WAS STOPED'));
        });
    }

    function close() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return driver.close().then(e(cb));
        }, true);

    }


    function verifyTitle(value, isAssert) {
        value = parseStoredVars(value, this.storedVars);
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return driver.getTitle().then(function(title) {
                checkExit(isAssert, title, value);
                eq(title, value);
                return cb();
            }, errorHandler);
        });
    }

    function assertTitle(value) {
        return verifyTitle.apply(this, [value, true]);
    }


    function verifyText(target, value, isAssert) {
        if (finishTest) {
            return finish();
        }

        value = parseStoredVars(value, this.storedVars);

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target))
                .then(checkElement(function(el) {
                    return el.getText();
                }))
                .then(checkElement(function(text) {
                    checkExit(isAssert, text, value);
                    eq(text, value);
                    return cb();
                }), errorHandler(cb));


        });

    }

    function verifyElementPresent(target) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.isElementPresent(by(target)).then(e(cb));
        });

    }

    function waitForElementPresent(target) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.wait(function() {
                return driver.isElementPresent(by(target)).then(function(el) {
                    return el;
                });
            }, 5000).then(e(cb));
        });

    }

    function store(value, variable) {
        if (finishTest) {
            return finish();
        }
        this.storedVars[variable] = value;
        return buildHelpers((cb) => {
            return cb();
        });
    }

    function storeText(target, value) {
        if (finishTest) {
            return finish();
        }
        var storedVars = this.storedVars;

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
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
        if (finishTest) {
            return finish();
        }
        value = parseStoredVars(value, this.storedVars);

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
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
        if (finishTest) {
            return finish();
        }
        string = parseStoredVars(string, this.storedVars);
        console.log('cmd.echo -> ' + string);
        return buildHelpers((cb) => {
            return cb();
        });

    }

    function click(target) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target)).click().then(function() {
                return wait(500)(cb);
            });

        });

    }

    function sendKeys(target, value) {
        if (finishTest) {
            return finish();
        }
        value = parseStoredVars(value, this.storedVars);

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target)).sendKeys(value).then(function() {
                return wait(500)(cb);
            });

        });

    }




    function verifyVisible(target) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target))
                .then(function(el) {
                    return el.isDisplayed();
                })
                .then(function(visibility) {
                    eq(visibility, true);
                    return cb();
                }, errorHandler);
        });

    }

    function doubleClick(target) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target))
                .then(function(el) {
                    return seq.mouseMove(el).doubleClick().perform();
                })
                .then(function() {
                    return wait(5000)(cb);
                }, errorHandler);
        });

    }

    function waitForPageToLoad(tm) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            if (tm) {
                setTimeout((() => cb(new Error('page load timout exprired'))), tm);
            }

            return wait(2000)(cb);

        });

    }

    function verifyAttribute(target, value, isAssert) {
        if (finishTest) {
            return finish();
        }
        value = parseStoredVars(value, this.storedVars);
        return buildHelpers((cb) => {
            var parts = target.split('@');
            var locator = parts[0];
            var attr = parts[1];

            var by = getBy(locator);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(locator))
                .then(function(el) {
                    return el.getAttribute(attr);
                })
                .then(function(attr) {
                    checkExit(isAssert, attr, value);
                    eq(attr, value);
                    return cb();
                }, errorHandler);
        });

    }



    function select(target, targetForOption) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getRulesTypeAndCut(target);
            var optionType;
            var targetOptionsTypes = {
                label: /^label=/.test(targetForOption),
                value: /^value=/.test(targetForOption),
                id: /^id=/.test(targetForOption),
                index: /^index=/.test(targetForOption)
            };
            var x = Object.keys(targetOptionsTypes).filter((key) => targetOptionsTypes[key]);
            optionType = x.length > 0 ? x[0] : 'label';

            switch (optionType) {
                case 'label':
                    targetForOption = targetForOption.replace('label=', '');
                    break;
                case 'id':
                    targetForOption = targetForOption.replace('id=', '');
                    break;
                case 'value':
                    targetForOption = targetForOption.replace('value=', '');
                    break;
                case 'index':
                    targetForOption = targetForOption.replace('index=', '');
                    break;
            }
            driver.executeAsyncScript(dom.select, by.value, targetForOption, by.type, optionType).

            then(function(error) {
                if (error) {
                    return cb(new Error(error));
                }
                cb();
            });
        });

    }



    function verifyValue(target, value, isAssert) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target))
                .then(checkElement(function(el) {
                    return webElementExtended(el).getValue();
                }))
                .then(checkElement(function(attr) {
                    if (attr === 'cstm_=_empty_=_') {
                        attr = '';
                    }
                    checkExit(isAssert, attr, value);
                    eq(attr, value);
                    return cb();
                }), errorHandler(cb));


        });

    }

    function storeEval(value, variable) {
        if (finishTest) {
            return finish();
        }
        value = parseStoredVars(value, this.storedVars, true);
        this.storedVars[variable] = eval(value);
        return buildHelpers((cb) => {
            return cb();
        });
    }


    function assertText(target, value) {
        return verifyText.apply(this, [target, value, true]);
    }

    function storeCssCount(target, variable) {
        if (finishTest) {
            return finish();
        }
        var storedVars = this.storedVars;
        return buildHelpers((cb) => {
            driver.findElements(By.css(target)).then(function(els) {
                    return els.length;
                })
                .then(function(count) {
                    storedVars[variable] = count;
                    cb();
                }, errorHandler);
        });

    }

    function clickAndWait(target) {
        if (finishTest) {
            return finish();
        }

        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            var ByType = getRulesType(target);
            click(target).end(function() {
                if (ByType === 'ByLink') {
                    return waitForPageToLoad().end(cb);
                }
                cb();
            });
        });

    }

    function verifyChecked(target, isAssert) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            return driver.findElement(by(target))
                .then(checkElement(function(el) {
                    return webElementExtended(el).getValue();
                }))
                .then(checkElement(function(attr) {
                    if (attr === 'cstm_=_empty_=_') {
                        attr = '';
                    }

                    if (attr !== 'on' && attr !== 'off') {
                        return cb(new Error('Element is not radio or checkbox type'));
                    }
                    checkExit(isAssert, attr, 'on');
                    eq(attr, 'on');
                    return cb();
                }), errorHandler(cb));


        });

    }

    function storeSelectOptions(target, variable) {
        if (finishTest) {
            return finish();
        }
        var storedVars = this.storedVars;
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            driver
                .findElement(by(target))
                .then(function(el) {
                    return webElementExtended(el).getSelectOptions();
                })
                .then(function(labels) {
                    storedVars[variable] = labels;
                    cb();
                }, errorHandler);
        });

    }

    function assertValue(target, value) {
        return verifyValue(target, value, true);

    }

    function verifySelectOptions(target, value) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            var regexpFunc = helpers.getRegExpFunction(value);
            driver
                .findElement(by(target))
                .then(function(el) {
                    return webElementExtended(el).getSelectOptions();
                })
                .then(function(labels) {
                    var some = labels.some(function(label) {
                        if (regexpFunc) {
                            return regexpFunc(value).test(label);
                        }
                        return value === label;
                    });
                    eq(some, true, 'Actual value ' + labels.toString() + ' did not match ' + value);
                    cb();
                }, errorHandler);
        });

    }

    function verifySelectedLabel(target, value) {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return byTargetErrorHandler(cb);
            }
            var regexpFunc = helpers.getRegExpFunction(value);
            driver
                .findElement(by(target))
                .then(function(el) {
                    return webElementExtended(el).getSelectedLabel();
                })
                .then(function(label) {
                    if (regexpFunc) {
                        eq(regexpFunc(value).test(label), true, 'Actual value ' + label + ' did not match ' + value);
                        return cb();
                    }

                    eq(label, value);
                    cb();
                }, errorHandler);
        });

    }

    function verifyNotText() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function focus() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function selectWindow() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function selectFrame() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotVisible() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotEditable() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function storeValue() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function setSpeed() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function mouseOver() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function runScript() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyNotAttribute() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function getEval() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyEval() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function mouseOut() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyLocation() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function verifyElementNotPresent() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function waitForText() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }

    function goBackAndWait() {
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

    }









};
