/**
 * imagemin.js - Optimize images.
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
		settings = config.images;

	/**
	 * The tasks are synchronous to ensure the order is maintained and
	 * avoid any potential conflicts with the promises.
	 *
	 * @since 1.0.0
	 */
	return function () {

		gulp.src( settings.src )

		    // Deal with errors.
		    .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

		    .pipe( plugins.imagemin( {
			    optimizationLevel: 5,
			    progressive: true,
			    interlaced: true
		    } ) )
		    .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {
				plugins.util.log( plugins.util.colors.bgGreen( 'Images are optimized....[imagemin()]' ) );
			} );
	}
};