/*jslint browser: true*/
/*globals Cc: false, Ci: false, Components: false, Cu: false, content: false, gBrowser:false, FileUtils: false,
NetUtil: false, URL: false, console: false */
'use strict';
// Normalize comments because Format JS cannot do that yet.
// From:^(\s*//\s)(\s+):To:$1:
;var getElementPath = function getElementPath(element, path) {
  if (!path) {
    path = '';
  }
  // console.trace();

  if (!element) {
    return path;
  } else {
    var elementSelector = element.localName + (element.id ? '#' + element.id : '') + (element.className.length ? '.' + element.className.replace(/ /g, '.')  : '');
    return getElementPath(element.parentElement, elementSelector + ' ' + path);
  }
};
exports.getElementPath = getElementPath;
