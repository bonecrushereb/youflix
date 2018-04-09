const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

let backendFiles = ['*.js', './lib/**/*.js',
                    './backend/routes/**/*.js',
                    './backend/models/**/*.js'
                  ];
let testFiles = ['./backend/test/**/*.js'];

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

gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:backendFiles']);

gulp.task('default', ['lint', 'test']);
