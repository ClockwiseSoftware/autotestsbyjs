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
            wait: wait
        };

        function errorHandler(cb) {
            return function(error) {
                console.log(error);
                return cb(error);
            };
        }

        function checkElement(cb) {
            return function(el) {
                if (!el) {
                    return Promise.reject(new Error('element not found'));
                }
                return cb(el);
            };
        }

        function parseStoredVars(value, vars) {
            if (storedVarsPattern.test(value)) {
                var parsed = _.template(value);
                return parsed(vars);
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
    };
