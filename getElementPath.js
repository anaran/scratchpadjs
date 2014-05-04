/*jslint browser: true*/
/*globals Cc: false, Ci: false, Components: false, Cu: false, content: false, gBrowser:false, FileUtils: false,
NetUtil: false, URL: false, console: false */
'use strict';
// Normalize comments because Format JS cannot do that yet.
// From:^(\s*//\s)(\s+):To:$1:
(function () {
//   if (window.hasOwnProperty('Cu')) {
//     alert('Run this scratchpad script in Environment->Content');
//     return ;
//   }
  var getElementPath = function getElementPath(element, path) {
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
  // TODO Please note we only try to be a firefox module when exports is defined.
  if (typeof require === 'function') {
    module.exports.getElementPath = getElementPath;
  }
  else if (content === window) {
    window.getElementPath = getElementPath;
  }
  else {
    content.window.getElementPath = getElementPath;
  }
}) ();
