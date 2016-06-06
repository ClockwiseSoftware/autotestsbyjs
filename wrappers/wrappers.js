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
    var ne = chai.assert.notEqual;

    var finishTest = false;



    var wrappers = {
        flow: [],
        storedVars: {},
        end: end,
        setBaseUrl: setBaseUrl,
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
        verifyEditable: verifyEditable,
        verifyElementNotPresent: verifyElementNotPresent,
        verifyElementPresent: verifyElementPresent,
        verifyEval: verifyEval,
        verifyLocation: verifyLocation,
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




        addLocationStrategy: addLocationStrategy,
        addScript: addScript,
        addSelection: addSelection,
        allowNativeXpath: allowNativeXpath,
        altKeyDown: altKeyDown,
        altKeyUp: altKeyUp,
        assignId: assignId,
        break: breakF,
        captureEntirePageScreenshot: captureEntirePageScreenshot,
        check: check,
        chooseCancelOnNextConfirmation: chooseCancelOnNextConfirmation,
        chooseOkOnNextConfirmation: chooseOkOnNextConfirmation,
        contextMenu: contextMenu,
        contextMenuAt: contextMenuAt,
        controlKeyDown: controlKeyDown,
        controlKeyUp: controlKeyUp,
        createCookie: createCookie,
        deleteAllVisibleCookies: deleteAllVisibleCookies,
        deleteCookie: deleteCookie,
        deselectPopUp: deselectPopUp,
        dragAndDrop: dragAndDrop,
        dragAndDropToObject: dragAndDropToObject,
        dragdrop: dragdrop,
        fireEvent: fireEvent,
        goBack: goBack,
        highlight: highlight,
        ignoreAttributesWithoutValue: ignoreAttributesWithoutValue,
        keyDown: keyDown,
        keyPress: keyPress,
        keyUp: keyUp,
        metaKeyDown: metaKeyDown,
        metaKeyUp: metaKeyUp,
        mouseDown: mouseDown,
        mouseDownAt: mouseDownAt,
        mouseDownRight: mouseDownRight,
        mouseDownRightAt: mouseDownRightAt,
        mouseMove: mouseMove,
        mouseMoveAt: mouseMoveAt,
        mouseUp: mouseUp,
        mouseUpAt: mouseUpAt,
        mouseUpRight: mouseUpRight,
        mouseUpRightAt: mouseUpRightAt,
        openWindow: openWindow,
        refresh: refresh,
        removeAllSelections: removeAllSelections,
        removeScript: removeScript,
        removeSelection: removeSelection,
        rollup: rollup,
        selectPopUp: selectPopUp,
        setBrowserLogLevel: setBrowserLogLevel,
        setCursorPosition: setCursorPosition,
        setMouseSpeed: setMouseSpeed,
        setTimeout: setTimeout,
        shiftKeyDown: shiftKeyDown,
        shiftKeyUp: shiftKeyUp,
        waitFor: waitFor,
        verify: verify,
        submit: submit,
        uncheck: uncheck,
        useXpathLibrary: useXpathLibrary,
        waitForCondition: waitForCondition,
        waitForFrameToLoad: waitForFrameToLoad,
        waitForPopUp: waitForPopUp,
        windowFocus: windowFocus,
        windowMaximize: windowMaximize,
        waitForAlert: waitForAlert,
        verifyAlert: verifyAlert,
        storeAlert: storeAlert,
        waitForAllButtons: waitForAllButtons,
        verifyAllButtons: verifyAllButtons,
        storeAllButtons: storeAllButtons,
        waitForAllFields: waitForAllFields,
        verifyAllFields: verifyAllFields,
        storeAllFields: storeAllFields,
        waitForAllLinks: waitForAllLinks,
        verifyAllLinks: verifyAllLinks,
        storeAllLinks: storeAllLinks,
        waitForAllWindowIds: waitForAllWindowIds,
        verifyAllWindowIds: verifyAllWindowIds,
        storeAllWindowIds: storeAllWindowIds,
        waitForAllWindowNames: waitForAllWindowNames,
        verifyAllWindowNames: verifyAllWindowNames,
        storeAllWindowNames: storeAllWindowNames,
        waitForAllWindowTitles: waitForAllWindowTitles,
        verifyAllWindowTitles: verifyAllWindowTitles,
        storeAllWindowTitles: storeAllWindowTitles,
        waitForAttribute: waitForAttribute,
        storeAttribute: storeAttribute,
        waitForAttributeFromAllWindows: waitForAttributeFromAllWindows,
        verifyAttributeFromAllWindows: verifyAttributeFromAllWindows,
        storeAttributeFromAllWindows: storeAttributeFromAllWindows,
        waitForBodyText: waitForBodyText,
        verifyBodyText: verifyBodyText,
        storeBodyText: storeBodyText,
        waitForConfirmation: waitForConfirmation,
        verifyConfirmation: verifyConfirmation,
        storeConfirmation: storeConfirmation,
        waitForCookie: waitForCookie,
        verifyCookie: verifyCookie,
        storeCookie: storeCookie,
        waitForCookieByName: waitForCookieByName,
        verifyCookieByName: verifyCookieByName,
        storeCookieByName: storeCookieByName,
        waitForCursorPosition: waitForCursorPosition,
        verifyCursorPosition: verifyCursorPosition,
        storeCursorPosition: storeCursorPosition,
        waitForElementHeight: waitForElementHeight,
        verifyElementHeight: verifyElementHeight,
        storeElementHeight: storeElementHeight,
        waitForElementIndex: waitForElementIndex,
        verifyElementIndex: verifyElementIndex,
        storeElementIndex: storeElementIndex,
        waitForElementPositionLeft: waitForElementPositionLeft,
        verifyElementPositionLeft: verifyElementPositionLeft,
        storeElementPositionLeft: storeElementPositionLeft,
        waitForElementPositionTop: waitForElementPositionTop,
        verifyElementPositionTop: verifyElementPositionTop,
        storeElementPositionTop: storeElementPositionTop,
        waitForElementWidth: waitForElementWidth,
        verifyElementWidth: verifyElementWidth,
        storeElementWidth: storeElementWidth,
        waitForEval: waitForEval,
        waitForExpression: waitForExpression,
        verifyExpression: verifyExpression,
        waitForHtmlSource: waitForHtmlSource,
        verifyHtmlSource: verifyHtmlSource,
        storeHtmlSource: storeHtmlSource,
        waitForLocation: waitForLocation,
        storeLocation: storeLocation,
        waitForMouseSpeed: waitForMouseSpeed,
        verifyMouseSpeed: verifyMouseSpeed,
        storeMouseSpeed: storeMouseSpeed,
        waitForPrompt: waitForPrompt,
        verifyPrompt: verifyPrompt,
        storePrompt: storePrompt,
        waitForSelectedId: waitForSelectedId,
        verifySelectedId: verifySelectedId,
        storeSelectedId: storeSelectedId,
        waitForSelectedIds: waitForSelectedIds,
        verifySelectedIds: verifySelectedIds,
        storeSelectedIds: storeSelectedIds,
        waitForSelectedIndex: waitForSelectedIndex,
        verifySelectedIndex: verifySelectedIndex,
        storeSelectedIndex: storeSelectedIndex,
        waitForSelectedIndexes: waitForSelectedIndexes,
        verifySelectedIndexes: verifySelectedIndexes,
        storeSelectedIndexes: storeSelectedIndexes,
        waitForSelectedLabel: waitForSelectedLabel,
        storeSelectedLabel: storeSelectedLabel,
        waitForSelectedLabels: waitForSelectedLabels,
        verifySelectedLabels: verifySelectedLabels,
        storeSelectedLabels: storeSelectedLabels,
        waitForSelectedValue: waitForSelectedValue,
        verifySelectedValue: verifySelectedValue,
        storeSelectedValue: storeSelectedValue,
        waitForSelectedValues: waitForSelectedValues,
        verifySelectedValues: verifySelectedValues,
        storeSelectedValues: storeSelectedValues,
        waitForSelectOptions: waitForSelectOptions,
        waitForSpeed: waitForSpeed,
        verifySpeed: verifySpeed,
        storeSpeed: storeSpeed,
        waitForTable: waitForTable,
        verifyTable: verifyTable,
        storeTable: storeTable,
        waitForTitle: waitForTitle,
        storeTitle: storeTitle,
        waitForValue: waitForValue,
        waitForWhetherThisFrameMatchFrameExpression: waitForWhetherThisFrameMatchFrameExpression,
        verifyWhetherThisFrameMatchFrameExpression: verifyWhetherThisFrameMatchFrameExpression,
        storeWhetherThisFrameMatchFrameExpression: storeWhetherThisFrameMatchFrameExpression,
        waitForWhetherThisWindowMatchWindowExpression: waitForWhetherThisWindowMatchWindowExpression,
        verifyWhetherThisWindowMatchWindowExpression: verifyWhetherThisWindowMatchWindowExpression,
        storeWhetherThisWindowMatchWindowExpression: storeWhetherThisWindowMatchWindowExpression,
        waitForXpathCount: waitForXpathCount,
        verifyXpathCount: verifyXpathCount,
        storeXpathCount: storeXpathCount,
        waitForAlertPresent: waitForAlertPresent,
        verifyAlertPresent: verifyAlertPresent,
        storeAlertPresent: storeAlertPresent,
        waitForChecked: waitForChecked,
        storeChecked: storeChecked,
        waitForConfirmationPresent: waitForConfirmationPresent,
        verifyConfirmationPresent: verifyConfirmationPresent,
        storeConfirmationPresent: storeConfirmationPresent,
        waitForCookiePresent: waitForCookiePresent,
        verifyCookiePresent: verifyCookiePresent,
        storeCookiePresent: storeCookiePresent,
        waitForEditable: waitForEditable,
        storeEditable: storeEditable,
        storeElementPresent: storeElementPresent,
        waitForOrdered: waitForOrdered,
        verifyOrdered: verifyOrdered,
        storeOrdered: storeOrdered,
        waitForPromptPresent: waitForPromptPresent,
        verifyPromptPresent: verifyPromptPresent,
        storePromptPresent: storePromptPresent,
        waitForSomethingSelected: waitForSomethingSelected,
        verifySomethingSelected: verifySomethingSelected,
        storeSomethingSelected: storeSomethingSelected,
        waitForTextPresent: waitForTextPresent,
        verifyTextPresent: verifyTextPresent,
        storeTextPresent: storeTextPresent,
        waitForVisible: waitForVisible,
        storeVisible: storeVisible
    };




    function extendWrappers(wrappers) {
        _.chain(wrappers).keys().forEach(function(key) {
            if (/^verify/.test(key)) {

                var keyAssert = key.replace('verify', 'assert');
                var keyVerifyNot;
                var keyAssertNot;

                if (/Pesent/.test(key)) {
                    keyVerifyNot = key.replace('Present', 'NotPresent');
                    keyAssertNot = key.replace('verify', 'assert').replace('Present', 'NotPresent');
                } else {
                    keyVerifyNot = key.replace('verify', 'verifyNot');
                    keyAssertNot = key.replace('verify', 'assertNot');
                }

                wrappers[keyAssert] = function() {
                    var args = _.map(arguments);
                    return wrappers[key].apply(wrappers, args.concat([true, false]));
                };

                wrappers[keyVerifyNot] = function() {
                    var args = _.map(arguments);
                    return wrappers[key].apply(wrappers, args.concat([false, true]));
                };

                wrappers[keyAssertNot] = function() {
                    var args = _.map(arguments);
                    return wrappers[key].apply(wrappers, args.concat([true, true]));
                };
            }

        }).value();
        return wrappers;
    }

    wrappers = extendWrappers(wrappers);
    return wrappers;

    function setBaseUrl(url) {
        this.baseUrl = url || '';
    }

    function assert(actualy, expected, message, revert) {
        if (revert) {
            ne(actualy, expected, message);
        } else {
            eq(actualy, expected, message);
        }
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

    function checkExit(isAssert, actualy, expected, revert) {
        if (isAssert) {
            finishTest = revert ? actualy === expected : actualy !== expected;
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


    function verifyTitle(value, isAssert, revert) {
        value = parseStoredVars(value, this.storedVars);
        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return driver.getTitle().then(function(title) {
                checkExit(isAssert, title, value, revert);
                assert(title, value, null, revert);
                return cb();
            }, errorHandler);
        });
    }

    function verifyText(target, value, isAssert, revert) {
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
                    checkExit(isAssert, text, value, revert);
                    if (revert) {
                        ne(text, value);
                    } else {
                        eq(text, value);
                    }
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




    function verifyVisible(target, isAssert, revert) {
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
                    assert(visibility, true, null, revert);
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

    function verifyAttribute(target, value, isAssert, revert) {
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
                    checkExit(isAssert, attr, value, revert);
                    assert(attr, value, null, revert);
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



    function verifyValue(target, value, isAssert, revert) {
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
                    checkExit(isAssert, attr, value, revert);
                    assert(attr, value, null, revert);
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

    function verifyChecked(target, isAssert, revert) {
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
                    checkExit(isAssert, attr, 'on', revert);
                    assert(attr, 'on', null, revert);
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


    function verifySelectOptions(target, value, isAssert, revert) {
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
                    checkExit(isAssert, some, true, revert);
                    assert(some, true, 'Actual value ' + labels.toString() + (!revert ? ' match ' : ' did not match ') + value, revert);
                    cb();
                }, errorHandler);
        });

    }

    function verifySelectedLabel(target, value, isAssert, revert) {
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
                        checkExit(isAssert, regexpFunc(value).test(label), true, revert);
                        assert(regexpFunc(value).test(label), true, 'Actual value ' + label + (!revert ? ' match ' : ' did not match ') + value, revert);

                        return cb();
                    }
                    checkExit(isAssert, label, value, revert);
                    assert(label, value, null, revert);
                    cb();
                }, errorHandler);
        });

    }

    function verifyNotText(target, value, isAssert) {
        return verifyText(target, value, isAssert, true);
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


    function verifyEditable() {
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


    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    function addLocationStrategy(strategyName, functionDefinition) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		efines a new function for Selenium to locate elements on the page.For example,if you define the strategy "foo", and someone runs click("foo=blah"), we'llrun your function, passing you the string "blah", and click on the element that your functionreturns, or throw an "Element not found" error if your function returns null.We'll pass three arguments to your function: locator: the string the user passed ininWindow: the currently selected windowinDocument: the currently selected documentThe function must return null if the element can't be found. Arguments: strategyName - the name of the strategy to define; this should use only   letters [a-zA-Z] with no spaces or other punctuation.functionDefinition - a string defining the body of a function in JavaScript.   For example:  return inDocument.getElementById(locator);
		*/
    }

    function addScript(scriptContent, scriptTagId) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		oads script content into a new script tag in the Selenium document. Thisdiffers from the runScript command in that runScript adds the script tagto the document of the AUT, not the Selenium document. The followingentities in the script content are replaced by the characters theyrepresent:    &lt;    &gt;    &amp;The corresponding remove command is removeScript.Arguments:scriptContent - the Javascript content of the script to addscriptTagId - (optional) the id of the new script tag. If                       specified, and an element with this id already                       exists, this operation will fail.
		*/
    }

    function addSelection(locator, optionLocator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		dd a selection to the set of selected options in a multi-select element using an option locator.@see #doSelect for details of option locatorsArguments:locator - an  element locator identifying a multi-select box optionLocator - an option locator (a label by default)
		*/
    }

    function allowNativeXpath(allow) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		pecifies whether Selenium should use the native in-browser implementationof XPath (if any native version is available); if you pass "false" tothis function, we will always use our pure-JavaScript xpath library.Using the pure-JS xpath library can improve the consistency of xpathelement locators between different browser vendors, but the pure-JSversion is much slower than the native implementations.Arguments:allow - boolean, true means we'll prefer to use native XPath; false means we'll only use JS XPath
		*/
    }

    function altKeyDown() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ress the alt key and hold it down until doAltUp() is called or a new page is loaded.
		*/
    }

    function altKeyUp() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elease the alt key.
		*/
    }

    function answerOnNextPrompt(answer) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		nstructs Selenium to return the specified answer string in response tothe next JavaScript prompt [window.prompt()].Arguments:answer - the answer to give in response to the prompt pop-up
		*/
    }

    function assignId(locator, identifier) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		emporarily sets the "id" attribute of the specified element, so you can locate it in the futureusing its ID rather than a slow/complicated XPath.  This ID will disappear once the page isreloaded.Arguments:locator - an  element locator pointing to an element identifier - a string to be used as the ID of the specified element
		*/
    }

    function breakF() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		alt the currently running test, and wait for the user to press the Continue button.This command is useful for debugging, but be careful when using it, because it willforce automated tests to hang until a user intervenes manually.
		*/
    }

    function captureEntirePageScreenshot(filename, kwargs) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		aves the entire contents of the current window canvas to a PNG file.Contrast this with the captureScreenshot command, which captures thecontents of the OS viewport (i.e. whatever is currently being displayedon the monitor), and is implemented in the RC only. Currently this onlyworks in Firefox when running in chrome mode, and in IE non-HTA usingthe EXPERIMENTAL "Snapsie" utility. The Firefox implementation is mostlyborrowed from the Screengrab! Firefox extension. Please seehttp://www.screengrab.org and http://snapsie.sourceforge.net/ fordetails.Arguments:filename - the path to the file to persist the screenshot as. No                  filename extension will be appended by default.                  Directories will not be created if they do not exist,                    and an exception will be thrown, possibly by native                  code.kwargs - a kwargs string that modifies the way the screenshot                  is captured. Example: "background=#CCFFDD" .                  Currently valid options:                    backgroundthe background CSS for the HTML document. This                     may be useful to set for capturing screenshots of                     less-than-ideal layouts, for example where absolute                     positioning causes the calculation of the canvas                     dimension to fail and a black background is exposed                     (possibly obscuring black text).
		*/
    }

    function check(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		heck a toggle-button (checkbox/radio)Arguments: locator - an  element locator
		*/
    }

    function chooseCancelOnNextConfirmation() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		y default, Selenium's overridden window.confirm() function willreturn true, as if the user had manually clicked OK; after runningthis command, the next call to confirm() will return false, as ifthe user had clicked Cancel.  Selenium will then resume using thedefault behavior for future confirmations, automatically returning true (OK) unless/until you explicitly call this command for eachconfirmation.Take note - every time a confirmation comes up, you mustconsume it with a corresponding getConfirmation, or elsethe next selenium operation will fail.
		*/
    }

    function chooseOkOnNextConfirmation() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ndo the effect of calling chooseCancelOnNextConfirmation.  Notethat Selenium's overridden window.confirm() function will normally automaticallyreturn true, as if the user had manually clicked OK, so you shouldn'tneed to use this command unless for some reason you need to changeyour mind prior to the next confirmation.  After any confirmation, Selenium will resume using thedefault behavior for future confirmations, automatically returning true (OK) unless/until you explicitly call chooseCancelOnNextConfirmation for eachconfirmation.Take note - every time a confirmation comes up, you mustconsume it with a corresponding getConfirmation, or elsethe next selenium operation will fail.
		*/
    }

    function click(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		licks on a link, button, checkbox or radio button. If the click actioncauses a new page to load (like a link usually does), callwaitForPageToLoad.Arguments:locator - an element locator
		*/
    }

    function clickAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		licks on a link, button, checkbox or radio button. If the click actioncauses a new page to load (like a link usually does), callwaitForPageToLoad.Arguments:locator - an element locatorcoordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function close() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the user clicking the "close" button in the titlebar of a popupwindow or tab.
		*/
    }

    function contextMenu(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates opening the context menu for the specified element (as might happen if the user "right-clicked" on the element).Arguments:locator - an element locator
		*/
    }

    function contextMenuAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates opening the context menu for the specified element (as might happen if the user "right-clicked" on the element).Arguments:locator - an element locatorcoordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function controlKeyDown() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ress the control key and hold it down until doControlUp() is called or a new page is loaded.
		*/
    }

    function controlKeyUp() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elease the control key.
		*/
    }

    function createCookie(nameValuePair, optionsString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		reate a new cookie whose path and domain are same with those of current pageunder test, unless you specified a path for this cookie explicitly.Arguments:nameValuePair - name and value of the cookie in a format "name=value"optionsString - options for the cookie. Currently supported options include 'path', 'max_age' and 'domain'.      the optionsString's format is "path=/path/, max_age=60, domain=.foo.com". The order of options are irrelevant, the unit      of the value of 'max_age' is second.  Note that specifying a domain that isn't a subset of the current domain will      usually fail.
		*/
    }

    function deleteAllVisibleCookies() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		alls deleteCookie with recurse=true on all cookies visible to the current page.As noted on the documentation for deleteCookie, recurse=true can be much slowerthan simply deleting the cookies using a known domain/path.
		*/
    }

    function deleteCookie(name, optionsString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elete a named cookie with specified path and domain.  Be careful; to delete a cookie, youneed to delete it using the exact same path and domain that were used to create the cookie.If the path is wrong, or the domain is wrong, the cookie simply won't be deleted.  Alsonote that specifying a domain that isn't a subset of the current domain will usually fail.Since there's no way to discover at runtime the original path and domain of a given cookie,we've added an option called 'recurse' to try all sub-domains of the current domain withall paths that are a subset of the current path.  Beware; this option can be slow.  Inbig-O notation, it operates in O(n*m) time, where n is the number of dots in the domainname and m is the number of slashes in the path.Arguments:name - the name of the cookie to be deletedoptionsString - options for the cookie. Currently supported options include 'path', 'domain'      and 'recurse.' The optionsString's format is "path=/path/, domain=.foo.com, recurse=true".      The order of options are irrelevant. Note that specifying a domain that isn't a subset of      the current domain will usually fail.
		*/
    }

    function deselectPopUp() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elects the main window. Functionally equivalent to usingselectWindow() and specifying no value forwindowID.
		*/
    }

    function doubleClick(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ouble clicks on a link, button, checkbox or radio button. If the double click actioncauses a new page to load (like a link usually does), callwaitForPageToLoad.Arguments:locator - an element locator
		*/
    }

    function doubleClickAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		oubleclicks on a link, button, checkbox or radio button. If the actioncauses a new page to load (like a link usually does), callwaitForPageToLoad.Arguments:locator - an element locatorcoordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function dragAndDrop(locator, movementsString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		rags an element a certain distance and then drops itArguments:locator - an element locatormovementsString - offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
		*/
    }

    function dragAndDropToObject(locatorOfObjectToBeDragged, locatorOfDragDestinationObject) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		rags an element and drops it on another elementArguments:locatorOfObjectToBeDragged - an element to be draggedlocatorOfDragDestinationObject - an element whose location (i.e., whose center-most pixel) will be the point where locatorOfObjectToBeDragged  is dropped
		*/
    }

    function dragdrop(locator, movementsString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		eprecated - use dragAndDrop insteadArguments:locator - an element locatormovementsString - offset in pixels from the current location to which the element should be moved, e.g., "+70,-300"
		*/
    }

    function echo(message) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		rints the specified message into the third table cell in your Selenese tables.Useful for debugging.Arguments:message - the message to print
		*/
    }

    function fireEvent(locator, eventName) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		xplicitly simulate an event, to trigger the corresponding "onevent"handler.Arguments:locator - an  element locator eventName - the event name, e.g. "focus" or "blur"
		*/
    }

    function focus(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ove the focus to the specified element; for example, if the element is an input field, move the cursor to that field.Arguments: locator - an  element locator
		*/
    }

    function goBack() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the user clicking the "back" button on their browser.
		*/
    }

    function highlight(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		riefly changes the backgroundColor of the specified element yellow.  Useful for debugging.Arguments: locator - an  element locator
		*/
    }

    function ignoreAttributesWithoutValue(ignore) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		pecifies whether Selenium will ignore xpath attributes that have novalue, i.e. are the empty string, when using the non-native xpathevaluation engine. You'd want to do this for performance reasons in IE.However, this could break certain xpaths, for example an xpath that looksfor an attribute whose value is NOT the empty string.The hope is that such xpaths are relatively rare, but the user shouldhave the option of using them. Note that this only influences xpathevaluation when using the ajaxslt engine (i.e. not "javascript-xpath").Arguments:ignore - boolean, true means we'll ignore attributes without value                        at the expense of xpath "correctness"; false means                        we'll sacrifice speed for correctness.
		*/
    }

    function keyDown(locator, keySequence) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing a key (without releasing it yet).Arguments:locator - an  element locator keySequence - Either be a string("\" followed by the numeric keycode  of the key to be pressed, normally the ASCII value of that key), or a single  character. For example: "w", "\119".
		*/
    }

    function keyPress(locator, keySequence) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing and releasing a key.Arguments:locator - an  element locator keySequence - Either be a string("\" followed by the numeric keycode  of the key to be pressed, normally the ASCII value of that key), or a single  character. For example: "w", "\119".
		*/
    }

    function keyUp(locator, keySequence) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user releasing a key.Arguments:locator - an  element locator keySequence - Either be a string("\" followed by the numeric keycode  of the key to be pressed, normally the ASCII value of that key), or a single  character. For example: "w", "\119".
		*/
    }

    function metaKeyDown() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ress the meta key and hold it down until doMetaUp() is called or a new page is loaded.
		*/
    }

    function metaKeyUp() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elease the meta key.
		*/
    }

    function mouseDown(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the left mouse button (without releasing it yet) onthe specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseDownAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the left mouse button (without releasing it yet) atthe specified location.Arguments:locator - an  element locator coordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function mouseDownRight(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the right mouse button (without releasing it yet) onthe specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseDownRightAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the right mouse button (without releasing it yet) atthe specified location.Arguments:locator - an  element locator coordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function mouseMove(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the mouse button (without releasing it yet) onthe specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseMoveAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user pressing the mouse button (without releasing it yet) onthe specified element.Arguments:locator - an  element locator coordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function mouseOut(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user moving the mouse pointer away from the specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseOver(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates a user hovering a mouse over the specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseUp(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the event that occurs when the user releases the mouse button (i.e., stopsholding the button down) on the specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseUpAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the event that occurs when the user releases the mouse button (i.e., stopsholding the button down) at the specified location.Arguments:locator - an  element locator coordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function mouseUpRight(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the event that occurs when the user releases the right mouse button (i.e., stopsholding the button down) on the specified element.Arguments: locator - an  element locator
		*/
    }

    function mouseUpRightAt(locator, coordString) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the event that occurs when the user releases the right mouse button (i.e., stopsholding the button down) at the specified location.Arguments:locator - an  element locator coordString - specifies the x,y position (i.e. - 10,20) of the mouse      event relative to the element returned by the locator.
		*/
    }

    function open(url) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		pens an URL in the test frame. This accepts both relative and absoluteURLs.The "open" command waits for the page to load before proceeding,ie. the "AndWait" suffix is implicit.Note: The URL must be on the same domain as the runner HTMLdue to security restrictions in the browser (Same Origin Policy). If youneed to open an URL on another domain, use the Selenium Server to start anew browser session on that domain.Arguments:url - the URL to open; may be relative or absolute
		*/
    }

    function openWindow(url, windowID) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		pens a popup window (if a window with that ID isn't already open).After opening the window, you'll need to select it using the selectWindowcommand.This command can also be a useful workaround for bug SEL-339.  In some cases, Selenium will be unable to intercept a call to window.open (if the call occurs during or before the "onLoad" event, for example).In those cases, you can force Selenium to notice the open window's name by using the Selenium openWindow command, usingan empty (blank) url, like this: openWindow("", "myFunnyWindow").Arguments:url - the URL to open, which can be blankwindowID - the JavaScript window ID of the window to select
		*/
    }

    function pause(waitTime) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ait for the specified amount of time (in milliseconds)Arguments:waitTime - the amount of time to sleep (in milliseconds)
		*/
    }

    function refresh() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates the user clicking the "Refresh" button on their browser.
		*/
    }

    function removeAllSelections(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		nselects all of the selected options in a multi-select element.Arguments: locator - an  element locator identifying a multi-select box
		*/
    }

    function removeScript(scriptTagId) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		emoves a script tag from the Selenium document identified by the givenid. Does nothing if the referenced tag doesn't exist.Arguments:scriptTagId - the id of the script element to remove.
		*/
    }

    function removeSelection(locator, optionLocator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		emove a selection from the set of selected options in a multi-select element using an option locator.@see #doSelect for details of option locatorsArguments:locator - an  element locator identifying a multi-select box optionLocator - an option locator (a label by default)
		*/
    }

    function rollup(rollupName, kwargs) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		xecutes a command rollup, which is a series of commands with a uniquename, and optionally arguments that control the generation of the set ofcommands. If any one of the rolled-up commands fails, the rollup isconsidered to have failed. Rollups may also contain nested rollups.Arguments:rollupName - the name of the rollup commandkwargs - keyword arguments string that influences how the                    rollup expands into commands
		*/
    }

    function runScript(script) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		reates a new "script" tag in the body of the current test window, and adds the specified text into the body of the command.  Scripts run inthis way can often be debugged more easily than scripts executed usingSelenium's "getEval" command.  Beware that JS exceptions thrown in these scripttags aren't managed by Selenium, so you should probably wrap your scriptin try/catch blocks if there is any chance that the script will throwan exception.Arguments:script - the JavaScript snippet to run
		*/
    }

    function select(selectLocator, optionLocator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elect an option from a drop-down using an option locator.Option locators provide different ways of specifying options of an HTMLSelect element (e.g. for selecting a specific option, or for assertingthat the selected option satisfies a specification). There are severalforms of Select Option Locator. label=labelPattern:matches options based on their labels, i.e. the visible text. (Thisis the default.) label=regexp:^[Oo]ther value=valuePattern:matches options based on their values. value=other id=id:matches options based on their ids. id=option1 index=index:matches an option based on its index (offset from zero). index=2 If no option locator prefix is provided, the default behaviour is to match on  label. Arguments: selectLocator - an  element locator identifying a drop-down menu optionLocator - an option locator (a label by default)
		*/
    }

    function selectFrame(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elects a frame within the current window.  (You may invoke this commandmultiple times to select nested frames.)  To select the parent frame, use"relative=parent" as a locator; to select the top frame, use "relative=top".You can also select a frame by its 0-based index number; select the first frame with"index=0", or the third frame with "index=2".You may also use a DOM expression to identify the frame you want directly,like this:  dom=frames["main"].frames["subframe"] Arguments: locator - an  element locator identifying a frame or iframe
		*/
    }

    function selectPopUp(windowID) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		implifies the process of selecting a popup window (and does not offerfunctionality beyond what selectWindow() already provides).If  windowID is either not specified, or specified as"null", the first non-top window is selected. The top window is the onethat would be selected by selectWindow() without providing awindowID . This should not be used when more than one popupwindow is in play. Otherwise, the window will be looked up considering windowID as the following in order: 1) the "name" of thewindow, as specified to window.open(); 2) a javascriptvariable which is a reference to a window; and 3) the title of thewindow. This is the same ordered lookup performed byselectWindow .Arguments: windowID - an identifier for the popup window, which can take on a                  number of different meanings
		*/
    }

    function selectWindow(windowID) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elects a popup window using a window locator; once a popup window has been selected, allcommands go to that window. To select the main window again, use nullas the target.Window locators provide different ways of specifying the window object:by title, by internal JavaScript "name," or by JavaScript variable. title=My Special Window:Finds the window using the text that appears in the title bar.  Be careful;two windows can share the same title.  If that happens, this locator willjust pick one.  name=myWindow:Finds the window using its internal JavaScript "name" property.  This is the second parameter "windowName" passed to the JavaScript method window.open(url, windowName, windowFeatures, replaceFlag)(which Selenium intercepts).  var=variableName:Some pop-up windows are unnamed (anonymous), but are associated with a JavaScript variable name in the currentapplication window, e.g. "window.foo = window.open(url);".  In those cases, you can open the window using"var=foo".If no window locator prefix is provided, we'll try to guess what you mean like this:1.) if windowID is null, (or the string "null") then it is assumed the user is referring to the original window instantiated by the browser).2.) if the value of the "windowID" parameter is a JavaScript variable name in the current application window, then it is assumedthat this variable contains the return value from a call to the JavaScript window.open() method.3.) Otherwise, selenium looks in a hash it maintains that maps string names to window "names".4.) If  that fails, we'll try looping over all of the known windows to try to find the appropriate "title".Since "title" is not necessarily unique, this may have unexpected behavior. If you're having trouble figuring out the name of a window that you want to manipulate, look at the Selenium log messageswhich identify the names of windows created via window.open (and therefore intercepted by Selenium).  You will see messageslike the following for each window as it is opened: debug: window.open call intercepted; window ID (which you can use with selectWindow()) is "myNewWindow" In some cases, Selenium will be unable to intercept a call to window.open (if the call occurs during or before the "onLoad" event, for example).(This is bug SEL-339.)  In those cases, you can force Selenium to notice the open window's name by using the Selenium openWindow command, usingan empty (blank) url, like this: openWindow("", "myFunnyWindow").Arguments: windowID - the JavaScript window ID of the window to select
		*/
    }

    function setBrowserLogLevel(logLevel) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ets the threshold for browser-side logging messages; log messages beneath this threshold will be discarded.Valid logLevel strings are: "debug", "info", "warn", "error" or "off".To see the browser logs, you need toeither show the log window in GUI mode, or enable browser-side logging in Selenium RC.Arguments:logLevel - one of the following: "debug", "info", "warn", "error" or "off"
		*/
    }

    function setCursorPosition(locator, position) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		oves the text cursor to the specified position in the given input element or textarea.This method will fail if the specified element isn't an input element or textarea.Arguments:locator - an  element locator pointing to an input element or textarea position - the numerical position of the cursor in the field; position should be 0 to move the position to the beginning of the field.  You can also set the cursor to -1 to move it to the end of the field.
		*/
    }

    function setMouseSpeed(pixels) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		onfigure the number of pixels between "mousemove" events during dragAndDrop commands (default=10).Setting this value to 0 means that we'll send a "mousemove" event to every single pixelin between the start location and the end location; that can be very slow, and maycause some browsers to force the JavaScript to timeout.If the mouse speed is greater than the distance between the two dragged objects, we'lljust send one "mousemove" at the start location and then one final one at the end location.Arguments:pixels - the number of pixels between "mousemove" events
		*/
    }

    function setSpeed(value) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		et execution speed (i.e., set the millisecond length of a delay which will follow each selenium operation).  By default, there is no such delay, i.e.,the delay is 0 milliseconds.Arguments:value - the number of milliseconds to pause after operation
		*/
    }

    function setTimeout(timeout) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		pecifies the amount of time that Selenium will wait for actions to complete.Actions that require waiting include "open" and the "waitFor*" actions.The default timeout is 30 seconds.Arguments:timeout - a timeout in milliseconds, after which the action will return with an error
		*/
    }

    function shiftKeyDown() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ress the shift key and hold it down until doShiftUp() is called or a new page is loaded.
		*/
    }

    function shiftKeyUp() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		elease the shift key.
		*/
    }

    function waitFor(expression, variableName) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });


    }

    function verify(expression, variableName) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });


    }

    function store(expression, variableName) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		his command is a synonym for storeExpression.Arguments: expression - the value to storevariableName - the name of a  variable in which the result is to be stored.
		*/
    }

    function submit(formLocator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ubmit the specified form. This is particularly useful for forms withoutsubmit buttons, e.g. single-input "Search" forms.Arguments: formLocator - an  element locator for the form you want to submit
		*/
    }

    function type(locator, value) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ets the value of an input field, as though you typed it in.Can also be used to set the value of combo boxes, check boxes, etc. In these cases,value should be the value of the option selected, not the visible text.Arguments:locator - an  element locator value - the value to type
		*/
    }

    function typeKeys(locator, value) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		imulates keystroke events on the specified element, as though you typed the value key-by-key.This is a convenience method for calling keyDown, keyUp, keyPress for every character in the specified string;this is useful for dynamic UI widgets (like auto-completing combo boxes) that require explicit key events.Unlike the simple "type" command, which forces the specified value into the page directly, this commandmay or may not have any visible effect, even in cases where typing keys would normally have a visible effect.For example, if you use "typeKeys" on a form element, you may or may not see the results of what you typed inthe field.In some cases, you may need to use the simple "type" command to set the value of the field and then the "typeKeys" command tosend the keystroke events corresponding to what you just typed.Arguments:locator - an  element locator value - the value to type
		*/
    }

    function uncheck(locator) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ncheck a toggle-button (checkbox/radio)Arguments: locator - an  element locator
		*/
    }

    function useXpathLibrary(libraryName) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		llows choice of one of the available libraries.Arguments:libraryName - name of the desired library Only the following three can be chosen:   "ajaxslt" - Google's library"javascript-xpath" - Cybozu Labs' faster library"default" - The default library.  Currently the default library is "ajaxslt" . If libraryName isn't one of these three, then  no change will be made.
		*/
    }

    function waitForCondition(script, timeout) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		uns the specified JavaScript snippet repeatedly until it evaluates to "true".The snippet may have multiple lines, but only the result of the last linewill be considered.Note that, by default, the snippet will be run in the runner's test window, not in the windowof your application.  To get the window of your application, you can usethe JavaScript snippet selenium.browserbot.getCurrentWindow(), and thenrun your JavaScript in there Arguments: script - the JavaScript snippet to runtimeout - a timeout in milliseconds, after which this command will return with an error
		*/
    }

    function waitForFrameToLoad(frameAddress, timeout) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		aits for a new frame to load.Selenium constantly keeps track of new pages and frames loading, and sets a "newPageLoaded" flag when it first notices a page load.See waitForPageToLoad for more information.Arguments:frameAddress - FrameAddress from the server sidetimeout - a timeout in milliseconds, after which this command will return with an error
		*/
    }

    function waitForPageToLoad(timeout) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		aits for a new page to load.You can use this command instead of the "AndWait" suffixes, "clickAndWait", "selectAndWait", "typeAndWait" etc.(which are only available in the JS API).Selenium constantly keeps track of new pages loading, and sets a "newPageLoaded"flag when it first notices a page load.  Running any other Selenium command afterturns the flag to false.  Hence, if you want to wait for a page to load, you mustwait immediately after a Selenium command that caused a page-load.Arguments:timeout - a timeout in milliseconds, after which this command will return with an error
		*/
    }

    function waitForPopUp(windowID, timeout) {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		aits for a popup window to appear and load up.Arguments:windowID - the JavaScript window "name" of the window that will appear (not the text of the title bar)                 If unspecified, or specified as "null", this command will                 wait for the first non-top window to appear (don't rely                 on this if you are working with multiple popups                 simultaneously).timeout - a timeout in milliseconds, after which the action will return with an error.                If this value is not specified, the default Selenium                timeout will be used. See the setTimeout() command.
		*/
    }

    function windowFocus() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		ives focus to the currently selected window
		*/
    }

    function windowMaximize() {

        if (finishTest) {
            return finish();
        }
        return buildHelpers((cb) => {
            return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
        });

        /*
		esize currently selected window to take up the entire screenSelenium Accessors   assertErrorOnNext        (            message        )    Tell Selenium to expect an error on the next command execution. Arguments: message - The error message we should expect.  This command will fail if the wrong error message appears. Related Assertions, automatically generated: assertNotErrorOnNext                (                    message                )            verifyErrorOnNext                (                    message                )            verifyNotErrorOnNext                (                    message                )            waitForErrorOnNext                (                    message                )            waitForNotErrorOnNext                (                    message                )            
		*/
    };


    /*
    Tell Selenium to expect a failure on the next command execution.Arguments:message - The failure message we should expect.  This command will fail if the wrong failure message appears. Related Assertions, automatically generated: assertNotFailureOnNext                (                    message                )            verifyFailureOnNext                (                    message                )            verifyNotFailureOnNext                (                    message                )            waitForFailureOnNext                (                    message                )            waitForNotFailureOnNext                (                    message                )            
    */
};


/*
		erifies that the selected option of a drop-down satisfies the optionSpecifier.  Note that this command is deprecated; you should use assertSelectedLabel, assertSelectedValue, assertSelectedIndex, or assertSelectedId instead.See the select command for more information about option locators.Arguments:selectLocator - an  element locator identifying a drop-down menu optionLocator - an option locator, typically just an option label (e.g. "John Smith") Related Assertions, automatically generated: assertNotSelected                (                    selectLocator, optionLocator                )            verifySelected                (                    selectLocator, optionLocator                )            verifyNotSelected                (                    selectLocator, optionLocator                )            waitForSelected                (                    selectLocator, optionLocator                )            waitForNotSelected                (                    selectLocator, optionLocator                )            
*/
}

function waitForAlert(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAlert(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAlert(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the message of a JavaScript alert generated during the previous action, or fail if there were no alerts.Getting an alert has the same effect as manually clicking OK. If analert is generated but you do not consume it with getAlert, the next Selenium actionwill fail.Under Selenium, JavaScript alerts will NOT pop up a visible alertdialog.Selenium does NOT support JavaScript alerts that are generated in apage's onload() event handler. In this case a visible dialog WILL begenerated and Selenium will hang until someone manually clicks OK.  
*/
}

function waitForAllButtons(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllButtons(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllButtons(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the IDs of all buttons on the page.If a given button has no ID, it will appear as "" in this array.  
*/
}

function waitForAllFields(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllFields(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllFields(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the IDs of all input fields on the page.If a given field has no ID, it will appear as "" in this array.  
*/
}

function waitForAllLinks(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllLinks(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllLinks(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the IDs of all links on the page.If a given link has no ID, it will appear as "" in this array.  
*/
}

function waitForAllWindowIds(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllWindowIds(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllWindowIds(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the IDs of all windows that the browser knows about in an array.  
*/
}

function waitForAllWindowNames(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllWindowNames(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllWindowNames(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the names of all windows that the browser knows about in an array.  
*/
}

function waitForAllWindowTitles(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAllWindowTitles(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAllWindowTitles(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the titles of all windows that the browser knows about in an array.  
*/
}

function waitForAttribute(attributeLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAttribute(attributeLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAttribute(attributeLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the value of an element attribute. The value of the attribute maydiffer across browsers (this is the case for the "style" attribute, forexample).Arguments: attributeLocator - an element locator followed by an @ sign and then the name of the attribute, e.g. "foo@bar"variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForAttributeFromAllWindows(attributeName, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAttributeFromAllWindows(attributeName, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAttributeFromAllWindows(attributeName, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns an array of JavaScript property values from all known windows having one.Arguments: attributeName - name of an attribute on the windowsvariableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForBodyText(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyBodyText(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeBodyText(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the entire text of the page.  
*/
}

function waitForConfirmation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyConfirmation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeConfirmation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the message of a JavaScript confirmation dialog generated duringthe previous action.By default, the confirm function will return true, having the same effectas manually clicking OK. This can be changed by prior execution of thechooseCancelOnNextConfirmation command. If an confirmation is generated but you do not consume it with getConfirmation,the next Selenium action will fail.NOTE: under Selenium, JavaScript confirmations will NOT pop up a visibledialog.NOTE: Selenium does NOT support JavaScript confirmations that aregenerated in a page's onload() event handler. In this case a visibledialog WILL be generated and Selenium will hang until you manually clickOK.  
*/
}

function waitForCookie(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyCookie(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeCookie(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturn all cookies of the current page under test.  
*/
}

function waitForCookieByName(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyCookieByName(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeCookieByName(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the value of the cookie with the specified name, or throws an error if the cookie is not present.Arguments: name - the name of the cookievariableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForCursorPosition(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyCursorPosition(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeCursorPosition(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the text cursor position in the given input element or textarea; beware, this may not work perfectly on all browsers.Specifically, if the cursor/selection has been cleared by JavaScript, this command will tend toreturn the position of the last location of the cursor, even though the cursor is now gone from the page.  This is filed as  SEL-243.This method will fail if the specified element isn't an input element or textarea, or there is no cursor in the element. Arguments: locator - an  element locator pointing to an input element or textarea variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementHeight(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementHeight(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementHeight(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the height of an elementArguments: locator - an  element locator pointing to an element variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementIndex(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementIndex(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementIndex(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		et the relative index of an element to its parent (starting from 0). The comment node and empty text nodewill be ignored.Arguments: locator - an  element locator pointing to an element variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementPositionLeft(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementPositionLeft(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementPositionLeft(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the horizontal position of an elementArguments: locator - an  element locator pointing to an element OR an element itself variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementPositionTop(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementPositionTop(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementPositionTop(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the vertical position of an elementArguments: locator - an  element locator pointing to an element OR an element itself variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementWidth(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementWidth(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementWidth(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the width of an elementArguments: locator - an  element locator pointing to an element variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForEval(script, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyEval(script, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeEval(script, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the result of evaluating the specified JavaScript snippet.  The snippet mayhave multiple lines, but only the result of the last line will be returned.Note that, by default, the snippet will run in the context of the "selenium"object itself, so  this will refer to the Selenium object.  Use window torefer to the window of your application, e.g. window.document.getElementById('foo') If you need to usea locator to refer to a single element in your application page, you canuse  this.browserbot.findElement("id=foo") where "id=foo" is your locator. Arguments: script - the JavaScript snippet to runvariableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForExpression(expression, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyExpression(expression, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeExpression(expression, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the specified expression.This is useful because of JavaScript preprocessing.It is used to generate commands like assertExpression and waitForExpression.Arguments: expression - the value to returnvariableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForHtmlSource(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyHtmlSource(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeHtmlSource(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the entire HTML source between the opening andclosing "html" tags.  
*/
}

function waitForLocation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyLocation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeLocation(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the absolute URL of the current page.  
*/
}

function waitForMouseSpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyMouseSpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeMouseSpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the number of pixels between "mousemove" events during dragAndDrop commands (default=10).  
*/
}

function waitForPrompt(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyPrompt(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storePrompt(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etrieves the message of a JavaScript question prompt dialog generated duringthe previous action.Successful handling of the prompt requires prior execution of theanswerOnNextPrompt command. If a prompt is generated but youdo not get/verify it, the next Selenium action will fail.NOTE: under Selenium, JavaScript prompts will NOT pop up a visibledialog.NOTE: Selenium does NOT support JavaScript prompts that are generated in apage's onload() event handler. In this case a visible dialog WILL begenerated and Selenium will hang until someone manually clicks OK.  
*/
}

function waitForSelectedId(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedId(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedId(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets option element ID for selected option in the specified select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedIds(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedIds(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedIds(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets all option element IDs for selected options in the specified select or multi-select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedIndex(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedIndex(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedIndex(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets option index (option number, starting at 0) for selected option in the specified select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedIndexes(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedIndexes(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedIndexes(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets all option indexes (option number, starting at 0) for selected options in the specified select or multi-select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedLabel(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedLabel(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedLabel(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets option label (visible text) for selected option in the specified select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedLabels(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedLabels(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedLabels(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets all option labels (visible text) for selected options in the specified select or multi-select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedValue(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedValue(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedValue(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets option value (value attribute) for selected option in the specified select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectedValues(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectedValues(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectedValues(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets all option values (value attributes) for selected options in the specified select or multi-select element.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSelectOptions(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySelectOptions(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSelectOptions(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets all option labels in the specified select drop-down.Arguments: selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForSpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSpeed(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		et execution speed (i.e., get the millisecond length of the delay following each selenium operation).  By default, there is no such delay, i.e.,the delay is 0 milliseconds.See also setSpeed.  
*/
}

function waitForTable(tableCellAddress, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyTable(tableCellAddress, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeTable(tableCellAddress, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the text from a cell of a table. The cellAddress syntaxtableLocator.row.column, where row and column start at 0.Arguments: tableCellAddress - a cell address, e.g. "foo.1.4"variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForText(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyText(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeText(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the text of an element. This works for any element that containstext. This command uses either the textContent (Mozilla-like browsers) orthe innerText (IE-like browsers) of the element, which is the renderedtext shown to the user.Arguments: locator - an  element locator variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForTitle(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyTitle(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeTitle(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the title of the current page.  
*/
}

function waitForValue(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyValue(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeValue(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets the (whitespace-trimmed) value of an input field (or anything else with a value parameter).For checkbox/radio elements, the value will be "on" or "off" depending onwhether the element is checked or not.Arguments: locator - an  element locator variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForWhetherThisFrameMatchFrameExpression(currentFrameString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyWhetherThisFrameMatchFrameExpression(currentFrameString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeWhetherThisFrameMatchFrameExpression(currentFrameString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etermine whether current/locator identify the frame containing this running code.This is useful in proxy injection mode, where this code runs in everybrowser frame and window, and sometimes the selenium server needs to identifythe "current" frame.  In this case, when the test calls selectFrame, thisroutine is called for each frame to figure out which one has been selected.The selected frame will return true, while all others will return false.Arguments:currentFrameString - starting frametarget - new frame (which might be relative to the current one)variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForWhetherThisWindowMatchWindowExpression(currentWindowString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyWhetherThisWindowMatchWindowExpression(currentWindowString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeWhetherThisWindowMatchWindowExpression(currentWindowString, target, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etermine whether currentWindowString plus target identify the window containing this running code.This is useful in proxy injection mode, where this code runs in everybrowser frame and window, and sometimes the selenium server needs to identifythe "current" window.  In this case, when the test calls selectWindow, thisroutine is called for each window to figure out which one has been selected.The selected window will return true, while all others will return false.Arguments:currentWindowString - starting windowtarget - new window (which might be relative to the current one, e.g., "_parent")variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForXpathCount(xpath, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyXpathCount(xpath, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeXpathCount(xpath, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns the number of nodes that match the specified xpath, eg. "//table" would givethe number of tables.Arguments: xpath - the xpath expression to evaluate. do NOT wrap this expression in a 'count()' function; we will do that for you.variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForAlertPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyAlertPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeAlertPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		as an alert occurred?This function never throws an exception 
*/
}

function waitForChecked(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyChecked(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeChecked(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		ets whether a toggle-button (checkbox/radio) is checked.  Fails if the specified element doesn't exist or isn't a toggle-button.Arguments:locator - an  element locator pointing to a checkbox or radio button variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForConfirmationPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyConfirmationPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeConfirmationPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		as confirm() been called?This function never throws an exception 
*/
}

function waitForCookiePresent(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyCookiePresent(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeCookiePresent(name, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		eturns true if a cookie with the specified name is present, or false otherwise.Arguments:name - the name of the cookievariableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForEditable(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyEditable(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeEditable(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etermines whether the specified input element is editable, ie hasn't been disabled.This method will fail if the specified element isn't an input element.Arguments:locator - an  element locator variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForElementPresent(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyElementPresent(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeElementPresent(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		erifies that the specified element is somewhere on the page.Arguments:locator - an  element locator variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForOrdered(locator1, locator2, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyOrdered(locator1, locator2, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeOrdered(locator1, locator2, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		heck if these two elements have same parent and are ordered siblings in the DOM. Two same elements willnot be considered ordered.Arguments:locator1 - an  element locator pointing to the first element locator2 - an  element locator pointing to the second element variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForPromptPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyPromptPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storePromptPresent(variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		as a prompt occurred?This function never throws an exception 
*/
}

function waitForSomethingSelected(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifySomethingSelected(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeSomethingSelected(selectLocator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etermines whether some option in a drop-down menu is selected.Arguments:selectLocator - an  element locator identifying a drop-down menu variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForTextPresent(pattern, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyTextPresent(pattern, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeTextPresent(pattern, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		erifies that the specified text pattern appears somewhere on the rendered page shown to the user.Arguments:pattern - a  pattern to match with the text of the page variableName -                    the name of a  variable in which the result is to be stored.                  
*/
}

function waitForVisible(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function verifyVisible(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });


}

function storeVisible(locator, variableName) {

    if (finishTest) {
        return finish();
    }
    return buildHelpers((cb) => {
        return cb(new Error('THIS FUNCTION NOT IMPLEMENTED YET'));
    });

    /*
		etermines if the specified element is visible. Anelement can be rendered invisible by setting the CSS "visibility"property to "hidden", or the "display" property to "none", either for theelement itself or one if its ancestors. This method will fail ifthe element is not present.    Arguments:              locator - an   element locator                                           variableName - the name of a   variable                                             in which the result is to be stored.                               
*/
}

};
