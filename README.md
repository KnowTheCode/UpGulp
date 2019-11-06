# UpGulp

UpGulp is our gulp module. It contains all of the configuration, setup, and tasks for processing themes, plugins, and whatever else.
	 	
## Features

It's modular. Shocking, I know. But navigating one big-butt `gulpfile.js` is a pain in the backside.

UpGulp splits the traditional `gulpfile.js` into separate task files and follows the ["Splitting a gulpfile"](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile) recommendation:

>Node's module resolution allows you to replace your gulpfile.js file with a directory named gulpfile.js that contains an index.js file which is treated as a gulpfile.js. This directory could then contain your individual modules for tasks. If you are using a transpiler, name the folder and file accordingly.

The traditional `gulpfile.js` file becomes a directory. Within that directory, Node resolves the `index.js` as the entry point. The new design is as follows:

```text
gulpfile.js
    index.js    // Gulp's main file, used to import each of the task and config files and then make those tasks available to CLI.
    config.js   // Configuration parameters for each of the tasks. This is where you customize the tasks to fit your needs.
    styles.js   // For the styles tasks. 
```

### Styles Tasks

To run the styles task, type the following command:

```js
gulp styles
```

This command runs the following tasks:
    - `sassToCss`: 
        - converts [Sass into CSS](https://www.npmjs.com/package/gulp-sass)
        - creates the [source maps](https://www.npmjs.com/package/gulp-sourcemaps) (for debugging) and embeds them at the bottom of the .css file
        - adds cross-browser CSS support (via [Autoprefixer](https://github.com/postcss/autoprefixer))
    - `optimizeStyles`:
        - optimizes the style by [minifing](https://www.npmjs.com/package/cssnano)
        - [saves the .css as a .min.css file](https://www.npmjs.com/package/gulp-rename)
    - `lintStyles`: 
        - validates the styles using [stylelint](gulp-stylelint)
            - Uses the configuration from `.stylelintrc`
            - [WordPress coding standard](https://www.npmjs.com/package/stylelint-config-wordpress) + custom rules (which you can customize)

To run only the linter task (ie `lintStyles`), type the following command:

```js
gulp lintStyles
```

### Sass Rem

UpGulp includes [sass-rem](https://www.npmjs.com/package/sass-rem), which provides a function and mixin to convert pixels into rems.

To use this feature, import the module into your parent sass file:

```sass
@import '../../node_modules/sass-rem/rem';
```

Then use it as follows:

```sass
@include rem( font-size, 18px );
```

To include a pixel fallback, add this:

````sass
$rem-fallback: true;
````

You can learn more about the syntax in the [documentation](https://www.npmjs.com/package/sass-rem#scss); 

## Installation:

1. Open up terminal and navigate to the theme, plugin, or proper folder.
2. Then type: `git clone https://github.com/KnowTheCode/UpGulp.git dev`, where it will be saved into a new `dev` directory.
3. Navigate into the `dev` directory, ie `cd dev`.
4. Type `npm install`.  It will automatically install all of the modules specified in the `package.json` file.
5. Open up the `gulpfile.fs/config.js` file. Customize the parameters to fit your project's needs. 

### Run it
    
To run it, open terminal and type `gulp watch`.  There are various watchers available including:
    
- `gulp styles`

## Credit

Messaging is copied from and/or inspired by [WPGulp](https://github.com/ahmadawais/WPGulp).

## Contributions

All feedback, bug reports, and pull requests are welcome.
