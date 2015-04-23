var gulp = require('gulp');
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
gulp.task("webpack", function() {
  return gulp.src([
    'acronymy.js'
    , 'activeElementCodeMirror.js'
    , 'browser_tabs_and_scratchpads.js'
    , 'find_regexp.js'
    , 'replaceInActiveElement.js'
  ])
  .pipe(named())
  .pipe(webpack({
    module: {
    loaders: [
    { test: "\.jpg$", loader: "file-loader" },
                // HTML seems to be supported without test.
                { test: "\.png$", loader: "url-loader?mimetype=image/png" },
                // { test: /\.jade$/, loader: "jade" },
                // => "jade" loader is used for ".jade" files

                // { test: /\.css$/, loader: "style!css" },
                // => "style" and "css" loader is used for ".css" files
                // Alternative syntax:
                // { test: /\.css$/, loaders: ["style", "css"] }
                ]
                }
                /* webpack configuration */ }))
  .pipe(gulp.dest('webpack/'));
});
