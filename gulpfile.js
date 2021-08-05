const { src, dest, parallel, watch, series } = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const gulpWebpack = require('webpack-stream')

const styles = () => {
    return src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('./app/css'))
        .pipe(browserSync.stream())
}

const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
}

const scripts = () => {
    return src([
        './app/js/**/*.js',
        '!./app/js/bundle.js'
    ])
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream())
}

const clean = () => {
    return del('dist')
}

const build = () => {
    return src([
        "app/css/style.min.css",
        "app/fonts/**/*",
        "app/img/**/*",
        "app/js/main.min.js",
        "app/resources/**/*",
        "app/*.html"
    ], {base: 'app'})
    .pipe(dest('dist'))
}



const watching = () => {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/bundle.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.watching = watching
exports.styles = styles
exports.clean = clean
exports.build = series(clean, build)
exports.default = parallel(browsersync, watching)

