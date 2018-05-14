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
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const react = require('gulp-react');
const htmlreplace = require('gulp-html-replace');

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

//Processes
gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:testFiles', 'lint:backendFiles']);

gulp.task('default', ['lint', 'test']);
