const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const fork = require('child-process').fork;
const spawn = require('child-process').spawn;
const webpack = require('webpack-stream');

var appFiles = ['*.js', './lib/**/*.js', './backend/routes/**/*.js', './backend/models/**/*.js'];
var testFiles = ['./backend/test/**/*.js'];

gulp.task('webpack:dev', () => {
  return gulp.src('./frontend/js/index.jsx')
  .pipe(webpack({
    devtool: 'source-map',
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style.css' },
        { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  return gulp.src('./frontend/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint:testFiles', () => {
  return gulp.src(testFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:appFiles', () => {
  return gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

var children = [];
gulp.task('start:server', ['static:dev'], () => {
  children.push(fork('server.js'));
  children.push(spawn('webdriver-manager', ['start']));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:appFiles']);
gulp.task('watch', () => {
  gulp.watch(testFiles, ['test:mocha', 'lint:testFiles']);
  gulp.watch(appFiles, ['test:mocha', 'lint:appFiles']);
});

gulp.task('default', ['build:dev', 'watch', 'lint', 'test']);

process.on('exit', () => {
  children.forEach((child) => {
    child.kill('SIGINT');
  });
});
