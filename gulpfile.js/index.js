/* eslint-env es6 */
'use strict';

const gulp = require('gulp');
const config = require('./config.js');
const stylesTasks = require('./styles.js');

/**
 * Make the individual tasks commands available to the CLI.
 */
module.exports.styles = stylesTasks.styles;
module.exports.lintStyles = stylesTasks.stylelint;

/**
 * Let's watch everything by running: `gulp watch`.
 */
module.exports.watch = () => {
	gulp.watch(config.styles.sass, stylesTasks.styles);
}
