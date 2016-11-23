var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var es = require('event-stream');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var exec = require('child_process').exec;

var source = {
  js: {
    main: 'www/js/dist/app.js',
    src: [
      'www/js/dist/app.js',
      'www/js/dist/constants.js',
      'www/js/dist/run.js',
      'www/js/dist/config/*.js',
      'www/js/dist/service/*.js',
      'www/js/dist/directive/**/*.js',
      'www/js/dist/controller/*.js',
      'www/js/dist/util/*.js'
    ]
  }
};

var destinations = {
  js: 'www/js/build'
};

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(source.js.src, ['js']);
});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('js', function(){
  return es.merge(gulp.src(source.js.src))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destinations.js));
});

gulp.task('build', function(){
  return es.merge(gulp.src(source.js.src))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(destinations.js));
});


gulp.task('startServer', function(){
  exec('ionic serve', function (err, stdout, stderr) {});
});

gulp.task('prod', ['sass', 'build']);

gulp.task('dev', ['js', 'sass', 'watch', 'startServer']);

gulp.task('gen', ['js', 'sass', 'watch']);
