var gulp = require('gulp');
var mocha = require('gulp-mocha');
var processEnv = require('gulp-process-env');
var exec = require('gulp-exec');
var args = require('get-gulp-args')();
var openBrowser = require('gulp-open');
var parser = require('./parser/parser');

var isReport = args.report;

function testRunner(browser) {
    var speed = args.speed;
    var width = args.ww;
    var heigth = args.wh;
    var isNotClose = args.show;
    var envObject = {
        browser: browser,
        isNotClose: isNotClose
    };

    if (width) {
        envObject.windowWidth = width;
    }

    if (heigth) {
        envObject.windowHeigth = heigth;
    }


    if (speed) {
        envObject.speed = speed;
    }

    return function(done) {
        var env = processEnv(envObject);
        return gulp.src('index.js', {
                read: false
            })
            .pipe(env)
            .pipe(mocha({
                reporter: 'mochawesome'
            }))
            .on('end', function() {
                if (isReport) {
                    return gulp
                        .src('./mochawesome-reports/mochawesome.html')
                        .pipe(openBrowser())
                        .on('end', done);
                }
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
