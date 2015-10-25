# Gulp Basic
Gulp settings for very basic tasks below:

1. Processing Sass
2. Optimizing images
3. Reloading browser while developing

## 1. Processing Sass
It processes .scss files in `dev` and output .css in `css`.  It also outputs the source map file main.css.map in `css`.

- Process .scss files using gulp-ruby-sass and partials in `scss/components`
- Adds browser prefixes using gulp-autoprefixer
- Outputs source map file called maps/main.css.map using gulp-sourcemaps in css folder

### Command to run the task:

	$ gulp sass

## 2. Optimizing images
It optimizes the images in `dev/img` and output them in `dist/img`.

### Command to run the task:

	$ gulp img

## 3. Reloading browser
Using BrowserSync, it runs a relevant task and reloads the browser when any of the following files are updated:
- Reloads when .html files in `dev` are updated
- Runs the sass task and reloads when .scss files in `dev/scss` are updated
- Reloads when any image files are updated in `dev/img`

### Command to run the task:

	$ gulp bs

## 4. Combining media queries in CSS
It processes .css files in 'dev/css' and out put .css in 'dist'.

### Command to run the task:

	$ gulp mmq

## ToDos in random order
1. Optimize all files including HTML and concatenated JS files  and copy them to `dist` when all is well and done
2. Clean up CSS using gulp-uncss