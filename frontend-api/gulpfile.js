/// <binding BeforeBuild='clean' Clean='clean' />
const gulp = require('gulp');

const cleanDist = require('./project-apparatus/tasks/clean.dist.task.js');
const tscBuild = require('./project-apparatus/tasks/tsc.build.task.js');

gulp.task('clean', async () => {
    await cleanDist();
});

gulp.task('build', async () => {
    await tscBuild(true);
});