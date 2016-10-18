var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var strip = require('gulp-strip-comments');
var rename = require("gulp-rename");

gulp.task('build', () => {
    return gulp.src('lib/scripty.js')
        .pipe(strip())
        .pipe(babel({
            presets: ['babili'],
            plugins: ["babel-plugin-transform-undefined-to-void" ,"transform-minify-booleans"]
        }))
        .pipe(rename("scripty.min.js"))
        .pipe(gulp.dest('dist'))
});


gulp.task('html', function() {
    return gulp.src('test/*.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: 'test/test.html',
        browser: 'chrome'
    })
});

gulp.task('watch', ['build', 'browserSync', 'html'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('lib/*.js', browserSync.reload);
    gulp.watch('test/*.*', browserSync.reload);
});