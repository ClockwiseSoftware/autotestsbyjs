var gulp = require('gulp');
var mocha = require('gulp-mocha');
var processEnv = require('gulp-process-env');
var exec = require('gulp-exec');
var args = require('get-gulp-args')();
var openBrowser = require('gulp-open');
var parser = require('./parser/parser');

function testRunner(browser) {
    return function(done) {
        var env = processEnv({ browser: browser });
        return gulp.src('index.js', {
                read: false
            })
            .pipe(env)
            .pipe(mocha({
                reporter: 'mochawesome'
            }))
            .on('end', function() {

                return gulp
                    .src('./mochawesome-reports/mochawesome.html')
                    .pipe(openBrowser())
                    .on('end', done);
            });
    };
}

gulp.task('firefox', testRunner('firefox'));
gulp.task('ie', testRunner('ie'));
gulp.task('chrome', testRunner('chrome'));
gulp.task('safari', testRunner('safari'));
gulp.task('opera', testRunner('opera'));
gulp.task('edge', testRunner('edge'));
gulp.task('default', ['firefox']);

gulp.task('parse', function() {
    var fileName = args.file;
    var folderName = args.folder;
    var all = args.all;
    if (all) {
        parser();
        return;
    }
    parser(fileName, folderName);
});
