/* eslint-env es6 */
'use strict';

const gulp = require('gulp');

const autoprefixer = require('autoprefixer'); // Autoprefixes CSS for configured browser's list.
const minifyCSS = require('cssnano'); // Minifies CSS file(s).
const log = require('fancy-log'); // Writes messages out to the console.
const postcss = require('gulp-postcss');
const rename = require('gulp-rename'); // Renames .css to .min.css.
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps'); // Embeds inline source maps at the bottom of the .css file(s).

const config = require('./config.js');

/**
 * Convert Sass into CSS.
 */
function sassToCss() {
	// Configures the Sass compiler.
	sass.compiler = require('node-sass');

	return gulp.src(config.styles.sass)
		.pipe(sourcemaps.init())
		// Convert Sass into CSS.
		.pipe(sass(config.styles.sassOptions).on('error', sass.logError))
		// Write out the sourcemaps, appends to the end of the .css file.
		.pipe(sourcemaps.write())
		// Adds browser (vendor) prefixes to CSS rules, per the browsers configured in .browserslistrc.
		// Uses PostCSS to speed up the task.
		.pipe(postcss([ autoprefixer({ cascade: false }) ]))
		// Write out the CSS to the configured <filename>.css destination.
		.pipe(gulp.dest(config.styles.dest))
		// When done, print out a message to the console.
		.on('end', () =>{
			log(config.styles.messages.sassToCss);
		});
}

/**
 * Optimize the styles.
 */
function optimizeStyles() {
	return gulp.src(config.styles.src)
		// Rename the .css to .min.css.
		.pipe(rename({suffix: '.min'}))
		// Minify the CSS. Uses PostCSS to speed up the task.
		.pipe(postcss([ minifyCSS() ]))
		// Write out the CSS to the configured <filename>.min.css destination.
		.pipe(gulp.dest(config.styles.dest))
		// When done, print out a message to the console.
		.on('end', () => {
			log(config.styles.messages.optimize);
		});
}

function lintStyles() {
	const stylelint = require('gulp-stylelint');

	return gulp.src(config.styles.src)
	// Lint the .css files against the configuration in .stylelintrc.json.
		.pipe(stylelint( {
			reporters: [ config.styles.lintReporter ]
		}))
		// When done, print out a message to the console.
		.on('end', () => {
			log(config.styles.messages.lint);
		});
}

/**
 * Run the style tasks once by typing: `gulp styles`.
 */
module.exports.styles = gulp.series(
	() => {
		return sassToCss();
	},
	() => {
		return optimizeStyles()
	},
	() => {
		return lintStyles()
	}
);

/**
 * Run the script tasks once by typing: `gulp stylelint`.
 */
module.exports.stylelint = gulp.series(
	() => {
		return lintStyles()
	}
);
