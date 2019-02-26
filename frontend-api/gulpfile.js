/// <binding BeforeBuild='clean, use-dev-config' Clean='clean' />
const gulp = require('gulp');

const cleanDist = require('./project-apparatus/tasks/clean.dist.task.js');
const tscBuild = require('./project-apparatus/tasks/tsc.build.task.js');
const configSwitcher = require('./project-apparatus/tasks/config-switcher.js');

gulp.task('clean', async () => {
    await cleanDist();
});

gulp.task('use-dev-config', async () => {
    await configSwitcher.useDevConfig();
});

gulp.task('build-dev', async () => {
    await tscBuild(false, true);
});

gulp.task('build-release', async () => {
    await tscBuild(true, false);
});