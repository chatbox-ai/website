const
  gulp = require('gulp')
  concatCss = require('gulp-concat-css')
  concat = require('gulp-concat');


gulp.task('concat-css', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/pace-js/themes/blue/pace-theme-minimal.css',
    'node_modules/ti-icons/css/themify-icons.css',
    'node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
    'node_modules/selectize/dist/css/selectize.default.css',
    'public/css/*.css'
  ])
  .pipe(concatCss('core.css'))
  .pipe(gulp.dest('public/dist'));
});

gulp.task('concat-js', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js',
    'node_modules/jquery-sticky/jquery.sticky.js',
    'public/js/vendor.js',
    'public/js/app.js',
    'node_modules/selectize/dist/js/standalone/selectize.min.js'
  ])
  .pipe(concat('core.js'))
  .pipe(gulp.dest('public/dist'));
});
