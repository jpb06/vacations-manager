const fs = require('fs-extra');

const consoleUtil = require('./../util/console.util.js');

var main = {};

main.useDevConfig = async function () {
    consoleUtil.printHeader('Switching to dev config ...');

    await fs.copy('./src/config/dev.config.json', './dist/js/config/current.config.json');

    console.log('Done.');
};

main.useProdConfig = async function () {
    consoleUtil.printHeader('Switching to dev config ...');

    await fs.copy('./src/config/prod.config.json', './dist/js/config/current.config.json');

    console.log('Done.');
};

module.exports = main;
