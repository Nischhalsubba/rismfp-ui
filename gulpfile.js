'use strict';


var gulp = require("gulp");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var watch = require("gulp-watch");
var autoprefixer = require("gulp-autoprefixer");
var htmlmin = require("gulp-htmlmin");
var rename = require('gulp-rename');
var image = require('gulp-imagemin');
var concat = require('gulp-concat');

//style paths
var scssfiles = './src/**/**/*.scss';
var cssDest = './assets/css/';

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    "bb >= 10"
];
// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src(scssfiles)
        //compiling scss file
        .pipe(sass({
            outputStyle: 'expanded',
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
        }))
        //without minifying
        .pipe(gulp.dest(cssDest))

        // Minify the file
        .pipe(csso())
        // Output
        .pipe(rename({
            suffix: "-min"
        }))
        .pipe(gulp.dest(cssDest));
});


//scripts path
var jsfiles = ["./src/js/main_custom.js","./src/js/owl.carousel.js","./src/js/parallax.min.js","./src/js/scroll-out.min.js"],
   jsdest = "./assets/js/";

//Gulp task to minify javascript
gulp.task("scripts", function () {
    return gulp.src(jsfiles)

        //Minifying the files
        .pipe(uglify())

        // Concating
        .pipe(concat("app.js"))

        //Output
        .pipe(gulp.dest(jsdest))

});


//pages path
var pgfiles = "./src/pages/*html",
    pgdest = "assets/pages/minified_pages/";

//Minifying HTML files
gulp.task('pages', function () {
    return gulp.src(pgfiles)

        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(pgdest))

});


//Images path
var imgfiles = "./src/images/raw/*",
    imgdest = "./assets/images/"

//Minifying the images
gulp.task('images', function () {
    return gulp.src(imgfiles)
        .pipe(image({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [{
                removeViewBox: true
            }]
        }))

        .pipe(gulp.dest(imgdest))
});


//Watching
gulp.task('default', function () {
    gulp.watch(scssfiles, gulp.series('styles'));
    gulp.watch(jsfiles, gulp.series('scripts'));
    //gulp.watch(pgfiles, gulp.series('pages'));
    gulp.watch(imgfiles,gulp.series('images'))
});


//gulp.task('default', gulp.parallel('styles','scripts','pages','images'));