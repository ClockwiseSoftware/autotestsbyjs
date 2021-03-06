    var _ = require('lodash');
    var storedVarsPattern = /\${([\s\S]+?)}/g;
    _.templateSettings.interpolate = storedVarsPattern;

    module.exports = function(app) {
        var driver = app.driver;
        var By = app.By;
        var waiter = app.waiter;
        var averageTime = app.speed;
        if (averageTime > 10000) {
            averageTime = 10000;
        }

        return {
            end: end,
            e: e,
            buildHelpers: buildHelpers,
            getBy: getBy,
            checkElement: checkElement,
            parseStoredVars: parseStoredVars,
            errorHandler: errorHandler,
            getRulesType: getRulesType,
            getRulesTypeAndCut: getRulesTypeAndCut,
            getRegExpFunction: getRegExpFunction,
            byTargetErrorHandler: byTargetErrorHandler,
            WebElementExtended: WebElementExtended,
            wait: wait
        };

        function errorHandler(cb) {
            return function(error) {
                console.log(error);
                return cb(error);
            };
        }

        function byTargetErrorHandler(cb) {
            return errorHandler(cb)(new Error('Unknow target type'));
        }

        function checkElement(cb) {
            return function(el) {
                if (!el) {
                    return Promise.reject(new Error('element not found'));
                }
                return cb(el);
            };
        }

        function parseStoredVars(value, vars, isRecurse) {
            if (storedVarsPattern.test(value)) {
                var parsed = _.template(value);
                value = parsed(vars);
                if (isRecurse) {
                    return parseStoredVars(value, vars, isRecurse);
                }
            }
            return value;
        }



        function end(method, isUsedWait) {
            return {
                end: function(done) {
                    if (averageTime && !isUsedWait) {
                        wait(averageTime)(function() {
                            method(done);
                        });
                    } else {
                        method(done);
                    }

                }
            };
        }

        function e(cb) {
            return function() {
                cb();
            };
        }

        function wait(time) {
            time = time || 2000;
            return (cb) => {
                return driver.wait(waiter(time), +time + 500).then(e(cb));
            };
        }

        function buildHelpers(method, notUseWaiter) {
            return {
                wait: function(time) {
                    console.log('==========\n', time, '\n==========');
                    return end(function(done) {
                        wait(time)(done);
                    }, true);

                },
                end: end(method, notUseWaiter).end
            };
        }

        function getBy(target) {
            var methods = {
                ByLink: ByLink,
                ById: ById,
                ByCss: ByCss,
                ByName: ByName,
                ByXpathSimple: ByXpathSimple,
                ByXpath: ByXpath
            };
            var type = getRulesType(target);
            if (!type) {
                return null;
            }

            return methods[type];

        }


        function ByLink(target) {
            target = target.replace('link=', '');
            return By.xpath('//a[text()="' + target + '"]');
        }

        function ById(target) {
            target = target.replace('id=', '#');
            return By.css(target);
        }

        function ByCss(target) {
            target = target.replace('css=', '');
            return By.css(target);
        }


        function ByName(target) {
            target = target.replace('name=', '');
            return By.name(target);
        }


        function ByXpath(target) {
            target = target.replace('xpath=(', '').slice(0, -1);
            return By.xpath(target);
        }

        function ByXpathSimple(target) {
            return By.xpath(target);
        }

        function getRulesTypeAndCut(target) {
            var value;
            var who = getRulesType(target);
            switch (who) {
                case 'ByLink':
                    value = target.replace('link=', '');
                    break;
                case 'ByCss':
                    value = target.replace('css=', '');
                    break;
                case 'ByName':
                    value = target.replace('name=', '');
                    break;
                case 'ById':
                    value = target.replace('id=', '');
                    break;
                case 'ByXpathSimple':
                    value = target;
                    break;
                case 'ByXpath':
                    value = target.replace('xpath=', '');
                    break;
            }


            return {
                type: who || null,
                value: value
            };


        }


        function getRulesType(target) {
            var rules = {
                ByLink: /^link\=/.test(target),
                ByCss: /^css\=/.test(target),
                ByName: /^name\=/.test(target),
                ById: /^id\=/.test(target),
                ByXpathSimple: /^\/\//.test(target) || /^xpath=/.test(target),
                ByXpath: /^xpath=/.test(target)
            };

            var type = Object.keys(rules).filter(function(rule) {
                return rules[rule];
            });

            return type && type[0] || null;
        }

        function getRegExpFunction(value) {
            if (/^regexp\:\(/.test(value)) {
                return function(value) {
                    var pattern = value.match(/^regexp\:\((.*?)\)/)[1];
                    return {
                        test: function(member) {
                            return new RegExp(pattern, 'ig').test(member);
                        }
                    };
                };
            }
        }


        function WebElementExtended(WebElement) {
            return {
                getValue: getValue,
                getSelectOptions: getSelectOptions,
                getSelectedLabel: getSelectedLabel
            };

            function getSelectOptions() {
                return WebElement.findElements(By.css('option'))
                    .then(function(options) {
                        return options.map(function(option) {
                            return option.getAttribute('label');
                        });
                    })
                    .then(function(arr) {
                        var labels = arr.map(function(a) {
                            return a['value_'];
                        });
                        return labels;
                    });
            }

            function getSelectedLabel() {
                return WebElement.findElements(By.css('option'))
                    .then(function(options) {
                        return Promise.all([
                            options.map(function(option) {
                                return option.getAttribute('label');
                            }),
                            options.map(function(option) {
                                return option.getAttribute('selected');
                            })
                        ]);

                    })
                    .then(function(obj) {
                        var labels = obj[0].filter(function(label, i) {
                            return obj[1][i]['value_'];
                        });
                        return labels[0];
                    });
            }

            function getValue() {
                return new Promise(function(resolve, reject) {
                    WebElement.getTagName()
                        .then(function(tag) {
                            console.log(tag);
                            return (tag === 'input') ? WebElement.getAttribute('type') : reject(new Error('not input tag'));
                        })
                        .then(function(type) {

                            var r;
                            switch (type) {
                                case 'checkbox':
                                case 'radio':
                                    r = new Promise((res) => WebElement.getAttribute('checked').then((el) => res(el ? 'on' : 'off')));
                                    break;
                                case 'text':
                                case 'hidden':
                                    r = new Promise((res) => WebElement.getAttribute('value').then((el) => res(el || 'cstm_=_empty_=_')));
                                    break;
                                default:
                                    r = null;
                            }
                            return r || reject(new Error('unknown input type'));
                        })
                        .then(function(value) {
                            return resolve(value);
                        }, reject);
                });
            }
        }


    };
