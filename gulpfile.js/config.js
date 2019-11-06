/* eslint-env es6 */
'use strict';
const path = require('path');
const rootDir = path.join(__dirname, '../../');
const devDir = path.join(__dirname, '../');

module.exports = {
	styles: {
		sass: devDir + 'assets/sass/style.scss',
		src: rootDir + 'style.css',
		dest: rootDir,
		sassOptions: {
			outputStyle: 'expanded',
			indentType: 'tab',
			indentWidth: 1
		},
		lintReporter: {
			formatter: 'verbose',
			console: true
		},
		messages: {
			sassToCss: '\n\n✅  ===> SASS, AUTOPREFIXER, SOURCEMAPS — completed!\n',
			optimize: '\n\n✅  ===> OPTIMIZED STYLES — completed!\n',
			lint: '\n\n✅  ===> LINT STYLES — completed!\n'
		}
	}
};
