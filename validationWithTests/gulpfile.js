var gulp = require('gulp'),
    watch = require('gulp-watch'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    concatFilenames = require('gulp-concat-filenames'),
    argv = require('yargs').argv;;

var basePath = "specs",
	spec;

gulp.task('watch', function () {
    // pick up new spec files and include them in the "_all" spec list
    // update one time then watch
    regenerateAllSpecsFile();
    gulp.watch([ basePath + '/**/*.spec.js'], handleSpecChanges);
});

function handleSpecChanges(obj) {
    console.log(obj.type);
    if (obj.type === 'added' || obj.type === 'deleted' || obj.type === 'renamed') {
        console.log('Spec ' + obj.type + ': ' + obj.path);
        regenerateAllSpecsFile();
    }
}

gulp.task('regenerateAllSpecsFile', regenerateAllSpecsFile);

function regenerateAllSpecsFile() {
    console.log('Regenerating allSpecs file');
    gulp.src(basePath + '/**/*.spec.js')
        .pipe(concatFilenames('allSpecs.js', {
            root: basePath,
            prepend: "'../specs/",
            append: "',"
        }))
        .pipe(insert.transform(function (contents, file) {
            return 'define([' + contents + '], function(){ });';
        }))
        .pipe(gulp.dest(basePath));
}