'use strict';
module.exports = function(app) {
    var isEnabled = 0;

    if (isEnabled) {
        var chai = app.chai;
        var driver = app.driver;
        var until = driver.until;
        var by = driver.by;
        var waiter = app.waiter;

      

        describe('Page title', function() {
            this.timeout(10000);

            beforeEach(function() {
                driver.get('http://clockwisesoftware.com');
                driver.wait(waiter(500), 2000);
                // return driver;
            });

            afterEach(function() {
                // return driver.quit();
            });


            it('should be Clockwise ok', function(done) {

                    chai.expect('.logo_main')
                        .dom
                        .to
                        .contain
                        .text("Clockwise").then(done);


            });


        });
    }
};
