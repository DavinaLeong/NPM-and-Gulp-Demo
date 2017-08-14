var gulp = require('gulp');
var del = require('del');
var gulp_clean_css = require('gulp-clean-css');
var gulp_concat = require('gulp-concat');

const NODE_PATH = './node_modules/';
const VENDOR_PATH = './vendor/';
const SRC_PATH = './src/';

gulp.task('watch', function()
{
    gulp.watch(SRC_PATH + '**/*.css', ['minify-css']);
});

gulp.task('minify-css', function() {
    gulp.src([
        SRC_PATH + '**/*.css',
        '!' + SRC_PATH + 'border-everything.css'
    ])
    .pipe(gulp_clean_css({compatibility: 'ie8'}))
    .pipe(gulp_concat('my-css.min.css'))
    .pipe(gulp.dest('dist'));
});

// --- manage vendor ---
gulp.task('copy-vendor', function() {
    // jquery
    gulp.src(NODE_PATH + 'jquery/dist/**')
        .pipe(gulp.dest(VENDOR_PATH + '/jquery'));
    console.log('~ copied jquery files')

    // bootstrap
    gulp.src(NODE_PATH + 'bootstrap/dist/**')
        .pipe(gulp.dest(VENDOR_PATH + '/bootstrap'));
    console.log('~ copied bootstrap files');

    // font awesome
    gulp.src([
        NODE_PATH + 'font-awesome/**/*.css',
        NODE_PATH + 'font-awesome/**/*-webfont.*'
    ])
        .pipe(gulp.dest(VENDOR_PATH + '/font-awesome'));
    console.log('~ copied font awesome files');
});

gulp.task('clear-vendor', function() {
    del.sync([
        VENDOR_PATH + 'bootstrap/**',
        VENDOR_PATH + 'font-awesome/**',
        VENDOR_PATH + 'jquery/**',
        '!' + VENDOR_PATH
    ]);
});

gulp.task('update-vendor', ['clear-vendor', 'copy-vendor']);
// --- manage vendor ---