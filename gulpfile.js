var gulp = require('gulp');
var mocha = require('gulp-mocha');
var processEnv = require('gulp-process-env');

function testRunner(browser) {
    return function() {
        var env = processEnv({ browser: browser });
        return gulp.src('index.js', {
                read: false
            })
            .pipe(env)
            .pipe(mocha({
                reporter: 'spec'
            }));
    };
}

gulp.task('firefox', testRunner('firefox'));
gulp.task('ie', testRunner('ie'));
gulp.task('chrome', testRunner('chrome'));
gulp.task('safari', testRunner('safari'));
gulp.task('opera', testRunner('opera'));
gulp.task('edge', testRunner('edge'));
gulp.task('default', ['firefox']);
