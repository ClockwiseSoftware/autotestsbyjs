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
        run: run,
        end: end,
        open: open,
        close: close,
        click: click,
        sendKeys: sendKeys,
        verifyTitle: verifyTitle,
        verifyElementPresent: verifyElementPresent,
        verifyText: verifyText
    };


    function run(flow) {
        this.flow = flow;
        return this;

    }

    function end(done) {
        async.waterfall(this.flow, function(err, res) {
            if (err) {
                return done(err);
            }
            done();
        });
    }

    function open(url, time) {
        time = time || 2000;
        return (cb) => {
            return driver.get(url).then(() => {
                return driver.wait(waiter(time), +time + 500).then(e(cb));

            });

        };

    }

    function close() {
        return (cb) => {
            return driver.close().then(e(cb));

        };

    }

    function e(cb) {
        return function() {
            cb();
        };
    }



    function verifyTitle(expectedTitle) {
        return (cb) => {
            return chai.expect('return document.title').exec.to.equal(expectedTitle).then(e(cb));
        };
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
        return (cb) => {
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
        };

    }

    function verifyElementPresent(target) {
        return (cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.isElementPresent(by(target)).then(e(cb));
        };

    }

    function click(target) {
        return (cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).click().then(e(cb));

        };

    }

    function sendKeys(target, value) {
        return (cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).sendKeys(value).then(e(cb));

        };

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
