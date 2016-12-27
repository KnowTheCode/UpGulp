/**
 * i18n.js - Builds the internationalization files
 *
 * @package     UpGulp
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GNU-2.0+
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	var handleErrors = require( config.gulpDir + 'utils/handleErrors.js' );

	/**
	 * The tasks are synchronous to ensure the order is maintained and
	 * avoid any potential conflicts with the promises.
	 *
	 * @since 1.0.0
	 */
	return function () {
		clean();
	};

	/**
	 * Delete the .css before we minify and optimize
	 */
	function clean() {
		var settings = config.i18n.clean;

		plugins.del( settings.src ).then( function () {
			plugins.util.log( plugins.util.colors.bgGreen( 'Scripts are now clean....[clean()]' ) );
			pot();
		} );
	};

	function pot() {
		var settings = config.i18n.pot,
			wpPot = require( 'gulp-wp-pot' );

		return gulp.src( settings.src )

		           // Deal with errors.
		           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

		           .pipe( plugins.sort() )
		           .pipe( wpPot( settings.wppot ) )
		           .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {
						plugins.util.log( plugins.util.colors.bgGreen( 'Translations are now done....[i18n:pot()]' ) );
					} );
	}
};