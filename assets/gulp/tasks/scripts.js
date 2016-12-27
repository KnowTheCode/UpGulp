/**
 * scripts.js - Builds the distribution JavaScript and jQuery files
 *
 * @package     UpGulp
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GNU-2.0+
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	var handleErrors = require( config.gulpDir + 'utils/handleErrors.js' ),
		runSequence = require('run-sequence').use(gulp);

	/**
	 * scripts task which is callable
	 *
	 * Tasks are run synchronously to ensure each step is completed
	 * BEFORE moving on to the next one.  We don't want any race situations.
	 *
	 * @since 1.0.0
	 */
	gulp.task( 'scripts', function ( callback ) {
		runSequence(
			'scripts-clean',
			'scripts-build-concat',
			'scripts-minify',
			callback );
	} );


	gulp.task( 'scripts-clean', function () {
		var settings = config.scripts.clean;

		return cleanScripts( settings );
	} );

	gulp.task( 'scripts-build-concat', function () {
		return concatScripts();
	} );

	gulp.task( 'scripts-minify', function () {
		return minifyScripts();
	} );

	/*******************
	 * Task functions
	 ******************/

	/**
	 * Delete the .js before we minify and optimize
	 *
	 * @since 1.0.0
	 *
	 * @param settings
	 * @returns {*}
	 */
	function cleanScripts( settings ) {
		plugins.del( settings.src );
	};

	/**
	 * Concatentate the scripts into one big butt file
	 *
	 * @since 1.0.0
	 *
	 * @returns {*}
	 */
	function concatScripts() {
		var settings = config.scripts.concat;

		return gulp.src( settings.src )

           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )
           .pipe( plugins.concat( settings.concatSrc ) )
           .pipe( gulp.dest( settings.dest ) );
	}
	/**
	 * Minify scripts
	 *
	 * @since 1.0.0
	 */
	function minifyScripts() {
		var settings = config.scripts.uglify;

		return gulp.src( settings.src )
	           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

	           .pipe( plugins.rename( {suffix: '.min'} ) )
	           .pipe( plugins.uglify( {
		           mangle: false
	           } ) )
               .pipe( gulp.dest( settings.dest ) )
	           .pipe( plugins.notify( {message: 'Scripts are built.'} ) );
	};
};
