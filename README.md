# Gulp Basic
Gulp settings for very basic tasks below:

1. Processing Sass and CSS
2. Optimizing images
3. Reloading browser while developing
4. PostCSS

## 1. Processing Sass and CSS
It processes .scss files in `dev` and output .css in `css`.  It also outputs the source map file main.css.map in `css/maps`.

- Process .scss files using gulp-ruby-sass and partials in `scss/components`
- Process CSS using PostCSS - autoprefixer, css-mqpacker, and cssnano
- Outputs source map file called main.css.map using gulp-sourcemaps in `maps/css`

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

## 4. PostCSS
It processes .css files in 'dev/css' and output .css in 'dist'. It uses the following plugins to process CSS:
- autoprefixer
- css-mqpacker - joins maching CSS media queries into a single statment
- cssnano - optimizes CSS size

### Command to run the task:

	$ gulp postcss

## ToDos in random order
1. Optimize all files including HTML and concatenated JS files  and copy them to `dist` when all is well and done