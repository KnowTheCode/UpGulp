/**
 * handleErrors.js - Error handler that sends notification and keeps gulp
 * running.
 *
 * Depending on the OS that gulp is run on, the `notify` command might have
 * different run-time dependencies to actually show a real notification.
 * @see https://www.npmjs.com/package/gulp-notify#requirements
 *
 * @package     UpGulp
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GNU-2.0+
 */

var notify = require( 'gulp-notify' ),
	gutil = require( 'gulp-util' );

module.exports = function (error) {
	var args = Array.prototype.slice.call( arguments );

	notify.onError( {
		title: 'Task Failed [<%= error.message %>',
		message: 'See console.',
		sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
	} ).apply( this, args );

	gutil.beep(); // Beep 'sosumi' again

	// Prevent the 'watch' task from stopping
	this.emit( 'end' );
};