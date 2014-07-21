# Gulp Basic
Gulp settings for very basic tasks below:

1. Processing Sass
2. Optimizing images
3. Reloading browser while developing

## 1. Processing Sass
It processes .scss files in `dev` and output .css in `css`.  It also outputs the source map file main.css.map in `css`.  Source map URLs are wrong for the @import files for the moment.  I think it is a rubySass bug and hope it will be fixed.

- Process .scss files using gulp-ruby-sass and partials in `scss/components`
- Adds browser prefixes using gulp-autoprefixer
- Outputs source map file called main.css.map using gulp-ruby-sass

To enable source map, main.scss needs to have the following line at the end:
```
/*# sourceMappingURL=main.css.map */
```

## 2. Optimizing images
It optimizes the images in `dev/img` and output them in `dist/img`.

## 3. Reloading browser
Using BrowserSync, it runs a relevant task and reloads the browser when any of the following files are updated:
- Reloads when .html files in `dev` are updated
- Runs the sass task and reloads when .scss files in `dev/scss` are updated
- Reloads when any image files are updated in `dev/img`