var gulp = require('gulp')
var runSequence = require('run-sequence')
var connect = require('gulp-connect') //构建本地web服务器
var less = require('gulp-less') //less编译
var sourcemaps = require('gulp-sourcemaps')
var cssmin = require('gulp-minify-css') //css压缩
var uglify = require('gulp-uglify') //js压缩
var concat = require('gulp-concat') //文件合并

var rename = require('gulp-rename') //文件更名

var webpack = require("gulp-webpack")
var webpackConfig = require('./webpack.config')

gulp.task("webpack", function() {
    return gulp.src('./app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('min-css', function() {
    gulp.src('dist/app.css')
        .pipe(cssmin({
            compatibility: 'ie7' //兼容IE7及以下需设置compatibility属性
        }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('min-js', function() {
    return gulp.src(['dist/app.js'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})

gulp.task('less', function() {
    gulp.src('less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(rename('style.map.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(cssmin({
            compatibility: 'ie7' //兼容IE7及以下需设置compatibility属性
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('web', function(cb) {
    runSequence('webpack', 'less', ['min-css', 'min-js'], cb);
});


gulp.task('connect', function() {
    connect.server({
        port: 8887,
        livereload: true
    })
})

gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(['./less/*.less'], ['less'])
})

gulp.task('default', ['connect', 'watch'])
