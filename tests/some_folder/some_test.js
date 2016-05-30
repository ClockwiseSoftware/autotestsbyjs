'use strict';
module.exports = function(app) {
    var isEnabled = 1;

    if (isEnabled) {

        var chai = app.chai;
        var driver = app.driver;
        var until = app.until;
        var By = app.By;
        var waiter = app.waiter;
        var $ = app.$;
        var seq = app.seq;
        var cmd = require('../../wrappers/wrappers')(app);


        describe('New Test', function() {
            this.timeout(18000);

            beforeEach(function() {

            });

            afterEach(function() {

            });


            it('- verify Title "Clockwise - Web and Mobile Apps Development Company"', function(done) {

                cmd.run([
					cmd.open('http://clockwisesoftware.com'),
					cmd.verifyTitle('Clockwise - Web and Mobile Apps Development Company'),
				])
				.end(done);

            });

            it('- verify link with text "Contact" present', function(done) {

                cmd.run([
					cmd.verifyText('link=Contact', 'Contact'),
				])
				.end(done);

            });

            it('- verify link "Contact"', function(done) {

                cmd.run([
					cmd.click('link=Contact'),
				])
				.end(done);

            });

            it('- verify text "Contact us"', function(done) {

                cmd.run([
					cmd.verifyText('//section[@id=\'contact\']/div/h2', 'Contact us'),
				])
				.end(done);

            });

            it('- verify is input field "Name" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('id=name'),
				])
				.end(done);

            });

            it('- verify is input field "Email" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('id=email'),
				])
				.end(done);

            });

            it('- verify is input field "Phone" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('id=phone'),
				])
				.end(done);

            });

            it('- verify is input field "Website" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('id=website'),
				])
				.end(done);

            });

            it('- verify is input field "Message" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('name=message'),
				])
				.end(done);

            });

            it('- verify is button "Send Message" present', function(done) {

                cmd.run([
					cmd.verifyElementPresent('css=button.btn.btn_shadow'),
					cmd.verifyText('css=button.btn.btn_shadow', 'Send Message'),
				])
				.end(done);

            });

            it('- set "Name" field', function(done) {

                cmd.run([
					cmd.sendKeys('id=name', 'Test_name'),
				])
				.end(done);

            });

            it('- set "Email" field', function(done) {

                cmd.run([
					cmd.sendKeys('id=email', 'Test_name@gmail.com'),
				])
				.end(done);

            });

            it('- set "Phone" field', function(done) {

                cmd.run([
					cmd.sendKeys('id=phone', '7856-8345-692'),
				])
				.end(done);

            });

            it('- set "Website" field', function(done) {

                cmd.run([
					cmd.sendKeys('id=website', 'testsite.com'),
				])
				.end(done);

            });

            it('- set "Message" field', function(done) {

                cmd.run([
					cmd.sendKeys('name=message', 'Test, test, test, test, test, test, test, test, test, test, test.'),
				])
				.end(done);

            });

            it('- submit the form', function(done) {

                cmd.run([
					cmd.click('css=button.btn.btn_shadow'),
				])
				.end(done);

            });

        });
    }
};