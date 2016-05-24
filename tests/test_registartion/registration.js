'use strict';
module.exports = function(app) {
    var isEnabled = 1;

    if (isEnabled) {
        var URL = 'http://clockwise-kicker.herokuapp.com/';

        var chai = app.chai;
        var driver = app.driver;
        var until = app.until;
        var By = app.By;
        var waiter = app.waiter;
        var $ = app.$;
        var seq = app.seq;


        describe('Kicker registartion', function() {
            this.timeout(10000);

            beforeEach(function() {
                //   driver.get('http://clockwise-kicker.herokuapp.com/');
                //    driver.wait(waiter(1000), 1500);
                // return driver;
            });

            afterEach(function() {
                // return driver.quit();
            });


            it('- title should be "Games"', function(done) {
                driver.get(URL);
                driver.wait(waiter(1000), 1500);

                driver.getTitle()
                    .then(function(title) {
                        chai.assert(title, 'Games');
                        done();
                    });


            });

            it('- click to register and verify text "Please sign up"', function(done) {

                var link = driver.findElement(By.tagName('a[href="/#/signup"]'));
                link.click();
                driver.wait(waiter(500), 1000);
                chai.expect('.form-sign-heading').to.dom.be.text('Please sign up6').then(done);

            });


            it('- generate user name"', function(done) {

                var possible = "abcdefghijklmnopqrstuvwxyz";
                var name = '';

                for (var i = 0; i < 5; i++) {
                    name += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                driver.findElement(By.id('inputName')).sendKeys(name).then(function() {
                    driver.close();
                    done();
                });

            });


        });
    }
};
