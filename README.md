# Firefox Scratchpad scripts and modules to build scripts with tools

## Tooling

### webpack

webpack works real well for my `replaceInActiveElement.js` script.

The script gets built by [gulp.task("webpack", ...)](gulpfile.js#L4) from following modules:

* replaceInActiveElement.css
* replaceInActiveElement.html
* replaceInActiveElement.js

## Featured Scripts

### replaceInActiveElement.js

I have used that at `MDN` to contribute to the [Remove in-content iframes](https://developer.mozilla.org/en-US/docs/MDN/Plans/Remove_in-content_iframes) effort.

### toc.js

Standalone script I use to get a quick overview of long webpages not featuring an index, either by sidebar or navigateable index.

One such example are long README.md files at github, e.g. [mozilla-b2g/gaia](https://github.com/mozilla-b2g/gaia) to take a random pick.

~~### Old Content

These are my snippets not yet part of some upstream effort.

See
(#/file/adrian/devtools-snippets/snippets/html_i18n_content.js)
or
https://github.com/anaran/devtools-snippets.git for my first generally useful snippet, html_i18n_content.js~~
