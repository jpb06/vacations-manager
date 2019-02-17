﻿const gulp = require('gulp');
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

const consoleUtil = require('./../util/console.util.js');

tscBuild = async function (
    generateTypings
) {
    consoleUtil.printHeader('Building prooject [typescript:src -> js:dist] ...');

    let tsProject = ts.createProject('./tsconfig.json');
    let reporter = ts.reporter.fullReporter();
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return new Promise((resolve, reject) => {

        if (generateTypings === true) {
            let stream = merge(
                tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest("./dist/js"))
                    .on('error', reject)
                ,
                tsResult.dts
                    .pipe(gulp.dest('dist/typings'))
                    .on('error', reject)
            );

            resolve(stream);

        } else {
            tsResult.js
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest("./dist/js"))
                .on('error', reject)
                .on('end', resolve);
        }

    }).then(function () {
        console.log("Done.");
    });
};

module.exports = tscBuild;
