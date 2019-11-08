/* eslint-env es6 */
'use strict';

const gulp = require('gulp');
const config = require('./config.js');
const stylesTasks = require('./styles.js');
const scriptsTasks = require('./scripts.js');

/**
 * Make the individual tasks commands available to the CLI.
 */
module.exports.styles = stylesTasks.styles;
module.exports.lintStyles = stylesTasks.stylelint;
module.exports.scripts = scriptsTasks.scripts;
module.exports.lintScripts = scriptsTasks.lintScripts;

/**
 * Let's watch everything by running: `gulp watch`.
 */
module.exports.watch = () => {
	gulp.watch(config.styles.sass, stylesTasks.styles);
	gulp.watch(config.scripts.src, scriptsTasks.scripts);
}
