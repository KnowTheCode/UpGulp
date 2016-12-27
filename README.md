# UpGulp

UpGulp is our gulp module.  It contains all of the configuration, setup, and tasks for processing themes, plugins, and whatever else.
	 	
## Features

It's modular. Shocking, I know.  But navigating one big-butt `gulpfile.js` is a pain in the backside.  

Instead, we split our gulp tasks out in the `assets/gulp/tasks` folder.  The main file `gulpfile.js` then loads up all of the configuration (which is stored in `config/gulp/config.js`), plugins, and requirements.  Then it calls each of the tasks.  Think of it as your Controller or better yet, Task Manager.

It includes:

- Scripts
    - Concatentates all the scripts found in `assets/js/*.js`
    - Renames the combined file with a `.min` suffix
    - Minifies that file
    - And then stores it into the configured distribution folder, default is `assets/dist/`
    - You can name the file whatever you want via the Configuration file
- Styles
    - Uses [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - for debug ease
    - Loads in both [Bourbon](https://www.npmjs.com/package/bourbon) and [Neat](https://www.npmjs.com/package/bourbon-neat)
    - Process with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
    - Runs [postcss](https://www.npmjs.com/package/postcss)
    - Includes [sass-rem](https://www.npmjs.com/package/sass-rem)
    - [Autoprefix](https://github.com/postcss/autoprefixer) to ensure we get the cross-browser prefixes
    - Includes linting using [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint)
    - Copy and rename the full stylesheet with a `.min` suffix
    - It minifies to optimize the stylesheet
    - If this is a theme, then it moves both the `.css` and `.min.css` files to the root of the theme folder.
- Translations
    - i18n translations are included (NEEDS TESTING)
- Sprites and icons optimizations
- Imagine optimizations    

### Sass Features

This gulp starter has Bourbon, Neat, and Sass REM baked into it.  To use these in your `style.scss` file and project, do the following:

```
@import 'bourbon';
@import 'neat';
@import '../../node_modules/sass-rem/rem';
```

REM is being deprecated out of Bourbon.  Using the `sass-rem` module lets us import the functionality we want.  To convert pixels into rems, add the following into your Sass declaration:

`@include rem( font-size, 18px );`

You can learn more about the syntax in the [documentation](https://www.npmjs.com/package/sass-rem#scss); 

## Installation:

1. Open up terminal and navigate to the theme, plugin, or proper folder.
2. Then type: `git clone https://github.com/KnowTheCode/UpGulp.git`.  The repository is loaded into a new subfolder called UpGulp.
3. Now it's time to move the contents of `UpGulp` folder into the root of your plugin or theme.
    - Move `gulpfile.js`, `package.json`, `config/gulp`, and `assets/gulp`
    - Move these resources into the root of your theme or plugin
4. Type `npm install`.  It will automatically install all of the modules specified in the `package.json` file.
5. Change the configuration parameters in the variable `moduleSettings` as found in `config/gulp/config.js`. You will want to change:
    - `moduleSettings.package` -> change to the package's name
    - `moduleSettings.domain` -> change to the domain name
    - `moduleSettings.isTheme` -> If this is a theme, then set it to `true`.
    - `moduleSettings.i18n` -> Define the i18n parameters

### Run it
    
To run it, open terminal and type `gulp watch`.  There are various watchers available including:
    
- `gulp scripts`
- `gulp styles`
- `gulp sprites`
- `gulp i18n`
- `gulp icons`
- `gulp imagemin`

## Credit

This gulp setup is inspired by [WebDev Studio's setup](https://github.com/WebDevStudios/wd_s/blob/master/Gulpfile.js).

## Contributions

All feedback, bug reports, and pull requests are welcome.

## TODOs

There are things we need to improve and test in this starter module including:

- Automate the installation process
- Test sprites and translations
