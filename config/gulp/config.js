/**
 * UpGulp - Gulp tasks runtime configuration script
 *
 * @package     UpGulp
 * @since       1.0.1
 * @author      hellofromTonya
 * @link        https://KnowTheCode.io
 * @license     GNU-2.0+
 */

module.exports = function ( moduleRoot ) {

	/************************************
	 * Module Settings
	 *
	 * You need to change these settings to fit the project.
	 ***********************************/

	var moduleSettings = {
		package: 'knowthecode',
		domain: 'knowthecode.dev',
		// If this is for a theme, set to `true`; else, set to `false`.
		isTheme: false,
		i18n: {
			textdomain: 'knowthecode',
			languageFilename: 'knowthecode.pot',
			bugReport: 'https://knowthecode.io',
			lastTranslator: 'Know the Code <hello@knowthecode.io>',
			team: 'Team <hello@knowthecode.io>'
		}
	};


	/************************************
	 * Folder Structure
	 ***********************************/

	/**
	 * Assets folder - path to the location of all the assets,
	 * i.e. images, Sass, scripts, styles, etc.
	 *
	 * @type {String}
	 */
	var assetsDir = moduleRoot + 'assets/';

	/**
	 * gulp folder - path to where the gulp utils and
	 * tasks are located.
	 *
	 * @type {String}
	 */
	var gulpDir = assetsDir + 'gulp/';

	/**
	 * Distribution folder - path to where the final build, distribution
	 * files will be located.
	 *
	 * @type {String}
	 */
	var distDir = assetsDir + 'dist/';

	/**
	 * Assets folder - path to where the raw files are located.
	 *
	 * @type {Object}
	 */
	var assetDirs = {
		css: assetsDir + 'css/',
		fonts: assetsDir + 'fonts/',
		icons: assetsDir + 'icons/',
		images: assetsDir + 'images/',
		sass: assetsDir + 'sass/',
		scripts: assetsDir + 'js/'
	}

	/**
	 * Paths
	 *
	 * @type {Object}
	 */
	var paths = {
		css: ['./*.css', '!*.min.css'],
		icons: assetDirs.images + 'svg-icons/*.svg',
		images: [ assetDirs.images + '*', '!' + assetDirs.images + '*.svg' ],
		php: [ moduleRoot + '*.php', moduleRoot + '**/*.php'],
		sass: assetDirs.sass + '**/*.scss',
		concatScripts: assetDirs.scripts + '*.js',
		scripts: [ assetDirs.scripts + '*.js', '!' + assetDirs.scripts + '*.min.js' ],
		sprites: assetDirs.images + 'sprites/*.png'
	};

	/**
	 * Distribution folder - path to where the final build, distribution
	 * files will be located.
	 *
	 * @type {Object}
	 */
	var distDirs = {
		root: moduleRoot,
		css: distDir + 'css/',
		finalCSS: moduleSettings.isTheme ? moduleRoot : distDir + 'css/',
		scripts: distDir + 'js/'
	};

	var distFilenames = {
		concatScripts: 'jquery.project.js'
	};

	/************************************
	 * Theme Settings
	 ***********************************/

	var stylesSettings = {
		clean: {
			src : [ distDirs.css + "*.*", moduleRoot + "style.css", moduleRoot + "style.min.css" ]
		},
		postcss: {
			src: [ assetDirs.sass + '*.scss' ],
			dest: distDirs.css,
			autoprefixer: {
				browsers: [
					'last 2 versions',
					'ie 9',
					'ios 6',
					'android 4'
				]
			}
		},
		cssnano: {
			src: distDirs.css + "*.css",
			dest: distDirs.css,
		},
		cssfinalize: {
			run: false,
			src: [ distDirs.css + "style.css", distDirs.css + "style.min.css" ],
			dest: distDirs.finalCSS,
		}
	};

	var scriptsSettings = {
		clean: {
			src : [ distDirs.scripts + "*.*" ]
		},
		concat: {
			src: paths.concatScripts,
			dest: distDirs.scripts,
			concatSrc: distFilenames.concatScripts,
		},
		uglify: {
			src: distDirs.scripts + '*.js',
			dest: distDirs.scripts,
		}
	};
	
	var i18nSettings = {
		clean: {
			src : [ moduleRoot + "languages/" + moduleSettings.i18n.languageFilename ]
		},
		pot: {
			src: paths.php,
			wppot: {
				domain: moduleSettings.i18n.textdomain,
				destFile: moduleSettings.i18n.languageFilename,
				package: moduleSettings.package,
				bugReport: moduleSettings.i18n.bugReport,
				lastTranslator: moduleSettings.i18n.lastTranslator,
				team: moduleSettings.i18n.team
			},
			dest: moduleRoot + "languages/"
		}
	}
	
	var iconsSettings = {
		clean: {
			src : [ assetDirs.images + "svg-icons.svg" ]
		},
		svg: {
			src: paths.icons,
			desc: assetDirs.images
		}
	}

	var spriteSettings = {
		clean: {
			src : [ assetDirs.images + "sprites.png" ]
		},
		spritesmith: {
			src: paths.sprites,
			dest: assetDirs.images
		}
	}

	var imageminSettings = {
		src: paths.images,
		dest: assetDirs.images
	}

	var watchSettings = {
		browserSync:	{
			open: false,             // Open project in a new tab?
			injectChanges: true,     // Auto inject changes instead of full reload
			proxy: moduleSettings.domain,  // Use http://domainname.tld:3000 to use BrowserSync
			watchOptions: {
				debounceDelay: 1000  // Wait 1 second before injecting
			}
		}
	}


	/************************************
	 * Do not touch below this line.
	 *
	 * The following code assembles up the
	 * configuration object that is returned
	 * to gulpfile.js.
	 ***********************************/

	return {
		moduleRoot: moduleRoot,
		assetsDir: assetsDir,
		assetDirs: assetDirs,
		dist: distDirs,
		distDir: distDir,
		gulpDir: gulpDir,
		paths: paths,

		i18n: i18nSettings,
		icons: iconsSettings,
		images: imageminSettings,
		scripts: scriptsSettings,
		sprites: spriteSettings,
		styles: stylesSettings,
		watch: watchSettings
	};
};