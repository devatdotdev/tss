// Project Details
//

let themename = "DotDev-Gulp"

// Modules
//

let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let lineEndingCorrector = require('gulp-line-ending-corrector');

// File Structure / Location
//

let src = 'src/';
let dist = 'dist/';

// CSS / SASS
//

let scssSrc = src + 'sass/';
let scssDist = scssSrc + 'css/';
let scssOrder = [
  scssSrc + 'style.scss'
]
let scssWatch = scssSrc + 'style.scss';

let cssSrc = scssDist;
let cssDist = dist + 'css/';
let cssOrder = [
  cssSrc + 'bootStrap.min.css',
  cssSrc + 'all.min.css',
  cssSrc + 'style.css'
];
let cssWatch = cssSrc + '*.css';

function scss() {
  return gulp.src(scssOrder)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(lineEndingCorrector())
    .pipe(gulp.dest(scssDist));
}

function css() {
  return gulp.src(cssOrder, {
      allowEmpty: true
    })
    .pipe(sourcemaps.init({
      loadMaps: true,
      largeFile: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(lineEndingCorrector())
    .pipe(gulp.dest(cssDist));
}

// JavaScript
//

let jsSrc = src + 'js/';
let jsDist = dist + 'js/';
let jsOrder = [
  jsSrc + 'jquery-3.4.0.min.js',
  jsSrc + 'TweenMax.min.js',
  jsSrc + 'popper.min.js',
  jsSrc + 'bootstrap.min.js',
  jsSrc + 'animation.js',
  jsSrc + 'main.js'
]
let jsWatch = jsSrc + '*.js';


function javascript() {
  return gulp.src(jsOrder)
    .pipe(concat(themename + '.min.js'))
    .pipe(uglify())
    .pipe(lineEndingCorrector())
    .pipe(gulp.dest(jsDist));
}

// Images
//

let imgSrc = src + 'img/';
let imgDist = dist + 'img/';
let imgWatch = imgSrc + '**/*.*';

function images() {
  return gulp.src(imgWatch)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDist));
}

// HTML
//

let htmlSrc = src + 'html/';
let htmlDist = dist;
let htmlWatch = htmlSrc + "*.html";

function html() {
  return gulp.src(htmlWatch)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(htmlDist))
    .pipe(browserSync.stream());
}

// Static Files
//

let staticSrc = src + 'static/';
let staticDist = dist;
let staticWatch = staticSrc + '**/*.*';

function static() {
  return gulp.src(staticWatch)
    .pipe(gulp.dest(staticDist));
}

// Init
//
function init() {
  scss();
  css();
  javascript();
  html();
  images();
  static();
}

// Watch Task
//

function watch() {
  browserSync.init({
    server: dist
  });
  init();
  gulp.watch(scssWatch, gulp.series([scss, css]));
  gulp.watch(jsWatch, gulp.series([javascript]));
  gulp.watch(imgWatch, gulp.series([images]));
  gulp.watch(staticWatch, gulp.series([static]));
  gulp.watch(htmlWatch, gulp.series([html]));
  gulp.watch([jsDist + themename + '.min.js', cssDist + 'style.min.css', dist + '*.html'])
    .on('change', browserSync.reload);
}

// Exports 
//

exports.scss = scss;
exports.css = css;
exports.javascript = javascript;
exports.watch = watch;
exports.imagemin = imagemin;
exports.html = html;
exports.static = static;

// Gulp default
//

let build = gulp.parallel(watch);
gulp.task('default', build);