module.exports = function(app) {
    var chai = app.chai;
    var driver = app.driver;
    var until = app.until;
    var By = app.By;
    var waiter = app.waiter;
    var $ = app.$;
    var seq = app.seq;
    var async = require('async');



    return {
        flow: [],
        end: end,
        open: open,
        close: close,
        click: click,
        wait: wait,
        sendKeys: sendKeys,
        verifyTitle: verifyTitle,
        verifyElementPresent: verifyElementPresent,
        verifyText: verifyText
    };



    function end(method) {
        return {
            end: function(done) {
                method(done);
            }
        };
    }

    function wait(time) {
        time = time || 2000;
        return this.end((cb) => {
            return driver.wait(waiter(time), +time + 500).then(e(cb));
        });
    }

    function open(url, time) {
        time = time || 2000;

        return this.end((cb) => {
            return driver.get(url).then(() => {
                return wait(time).end(cb);
            });

        });

    }

    function close() {
        return this.end((cb) => {
            return driver.close().then(e(cb));

        });

    }

    function e(cb) {
        return function() {
            cb();
        };
    }



    function verifyTitle(expectedTitle, time) {
        return this.end((cb) => {
            var promise = chai.expect('return document.title').exec.to.equal(expectedTitle);
            if (time) {
                return promise.then(()=>{
                    return wait(time).end(cb);
                });
            }
            return promise.then(e(cb));
        });
    }

    function getRulesType(target) {
        var rules = {
            ByLink: /^link\=/.test(target),
            ByCss: /^css\=/.test(target),
            ByName: /^name\=/.test(target),
            ById: /^id\=/.test(target),
            ByXpath: /^\/\//.test(target)
        };

        var type = Object.keys(rules).filter(function(rule) {
            return rules[rule];
        });

        return type && type[0] || null;
    }

    function getBy(target) {
        var methods = {
            ByLink: ByLink,
            ById: ById,
            ByCss: ByCss,
            ByName: ByName,
            ByXpath: ByXpath
        };
        var type = getRulesType(target);
        if (!type) {
            return null;
        }

        return methods[type];

    }




    function verifyText(target, value) {
        return this.end((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target))
                .then(function(el) {
                    return el.getInnerHtml();
                })
                .then((text) => {
                    chai.assert.equal(text, value);
                    cb();
                });
        });

    }

    function verifyElementPresent(target) {
        return this.end((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.isElementPresent(by(target)).then(e(cb));
        });

    }

    function click(target) {
        return this.end((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).click().then(e(cb));

        });

    }

    function sendKeys(target, value) {
        return this.end((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).sendKeys(value).then(e(cb));

        });

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
        return By.xpath(target);
    }




};
