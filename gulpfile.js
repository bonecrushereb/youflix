const gulp = require('gulp');

//Backend Imports
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

let backendFiles = ['./backend/*.js', './backend/lib/**/*.js',
                    './backend/routes/**/*.js',
                    './backend/models/**/*.js'
                  ];
let testFiles = ['./backend/test/**/*.js'];

//FronEnd Imports
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const reactify = require('reactify');
const streamify = require('gulp-streamify');

let frontEndFiles = {
  HTML: 'frontend/public/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './frontend/src/app.js'
};

//Backend Tasks
gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint:testFiles', () => {
  return gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:backendFiles', () => {
  return gulp.src(backendFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

//FrontEnd tasks
gulp.task('copy', function() {
  gulp.src(frontEndFiles.HTML)
    .pipe(gulp.dest(frontEndFiles.DEST));
});

gulp.task('watch', function() {
  gulp.watch(frontEndFiles.HMTL, ['copy']);

  const watcher = watchify(browserify({
    entries: [frontEndFiles.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source(frontEndFiles.OUT))
      .pipe(gulp.dest(frontEndFiles.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(frontEndFiles.OUT))
    .pipe(gulp.dest(frontEndFiles.DEST_SRC))
});

gulp.task('build', function() {
  browserify({
    entries: [frontEndFiles.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(frontEndFiles.MINIFIED_OUT))
    .pipe(gulp.dest(frontEndFiles.DEST_BUILD));
});

gulp.task('replaceHTMl', function() {
  gulp.src(frontEndFiles.HTML)
    .pipe(htmlreplace({
      'js' : 'build/' + frontEndFiles.MINIFIED_OUT 
    }))
    .pipe(gulp.dest(frontEndFiles.DEST));
});

//Processes
gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:backendFiles']);
gulp.task('production', ['replaceHTMl', 'build']);
gulp.task('watch', ['watch']);

gulp.task('default', ['lint', 'test', 'watch']);
