/**
 * gulfile.js - Entry point for launching KnowTheCodeGulp
 *
 * @package     UpGulp
 * @since       1.0.2
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GPL-2.0+
 *
 * This gulpfile.js is a customized version of the wd_s from WebDevStudios
 * @link https://github.com/WebDevStudios/wd_s/blob/master/Gulpfile.js
 */

/**********************************************
 * Declarations
 *********************************************/
var gulp = require( 'gulp' ),
	/**
	 * Fetch all of the plugins out of the package.json file.
	 * This reduces redundancy and keeps us DRY.
	 */
	plugins = require( 'gulp-load-plugins' )( {
		pattern: '*'
	} ),
	/**
	 * Fetch where the `config.js` is located within the theme.  This value
	 * is stored in the `package.json` file and keyed by `gulpConfig`.
	 */
	gulpConfig = require( './package' ).gulpConfig,
	/**
	 * We want to make sure we have the module's root, as files are being
	 * loaded and processed from subfolders.
	 */
	moduleRoot = require( 'app-root-path' ).resolve( './' ),
	/**
	 * Now load the `config.js` file, which has all of the
	 * settings and parameters for the tasks.
	 */
	config = require( "./" + gulpConfig )( moduleRoot );

/**
 * Load up the reload into plugins.
 */
plugins.reload = plugins.browserSync.reload;

/**********************************************
 * Task Module Loader
 * ********************************************
 *
 * Get the Task from the tasks folder.  Using this architecture,
 * we are able to parse out the tasks into separate files, which are
 * located in the `gulp/tasks/` folder.  This promotes a more
 * modular gulp structure verses having everything loaded here
 * in this one file.
 *
 * @since 1.0.0
 *
 * @param {string} task Name of the task to be loaded.
 *
 * @returns {*}
 */
function getTask( task ) {
	var taskDir = config.gulpDir + 'tasks/' + task;

	return require( taskDir )( gulp, plugins, config );
}

var tasks = ['i18n', 'icons', 'imagemin', 'styles', 'scripts', 'sprites', 'watch'];
for ( var index in tasks ) {
	getTask( tasks[ index ] );
}

/**********************************************
 * Callable Tasks
 * ********************************************
 *
 * Here are the individual tasks which can be run.  Notice that
 * they load up the task file when called.
 */

gulp.task( 'default', ['sprites', 'i18n', 'icons', 'styles', 'scripts', 'imagemin' ] );
