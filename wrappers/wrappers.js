module.exports = function(app) {
    var chai = app.chai;
    var driver = app.driver;
    var until = app.until;
    var By = app.By;
    var waiter = app.waiter;
    var seq = app.seq;

    var helpers = require('../helpers')(app);
    var end = helpers.end;
    var buildHelpers = helpers.buildHelpers;
    var isBy = helpers.isBy;
    var getBy = helpers.getBy;
    var e = helpers.e;
    var wait = helpers.wait;



    return {
        flow: [],
        end: end,
        open: open,
        close: close,
        click: click,
        wait: wait,
        sendKeys: sendKeys,
        verifyTitle: verifyTitle,
        verifyAttribute: verifyAttribute,
        verifyElementPresent: verifyElementPresent,
        verifyText: verifyText
    };





    function open(url, time) {
        time = time || 2000;

        return buildHelpers((cb) => {
            return driver.get(url).then(() => {
                return wait(time).end(cb);
            });

        });

    }

    function close() {
        return buildHelpers((cb) => {
            return driver.close().then(e(cb));
        }, true);

    }


    function verifyTitle(expectedTitle) {
        return buildHelpers((cb) => {
            return chai.expect('return document.title').exec.to.equal(expectedTitle).then(e(cb));
        });
    }


    function verifyText(target, value) {
        return buildHelpers((cb) => {
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
    //target id=email@placeholder
    function verifyAttribute(target, value) {

        return buildHelpers((cb) => {
            var parts = target.split('@'); 

            var target_locator = parts[0];
            var attribute = parts[1];
            var by = getBy(target);

            return driver.findElement(by(target_locator))
                .then(function(el) {
                    return el.getAttribute(attribute);
                })
                .then((attribute) => {
                    if(!attribute){
                        return cb(new Error('attribute not found'));
                    }
                    chai.assert.equal(attribute, value);
                    cb();
                })
                .catch(function(error) {
                    cb(error);
                });

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

    function click(target) {
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).click().then(e(cb));

        });

    }

    function sendKeys(target, value) {
        return buildHelpers((cb) => {
            var by = getBy(target);
            if (!by) {
                return cb();
            }
            return driver.findElement(by(target)).sendKeys(value).then(e(cb));

        });

    }

};
