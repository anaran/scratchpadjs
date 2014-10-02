// Replace /\b(const|let)\B/ with "$1 "
/* jslint browser: true */
/*global console: false*/
//
// Workaround for Eclipse Orion for Mozilla Bug 
// From:\n[ \t]*(//\$NON.+)
// To: $1
// Options: [v] Regular expression
//
// TODO This does not work in Scratchpad:
// Replace:/\n\s*(\/\/\$NON-NLS)/m
// With: $1
'use strict';
//$NON-NLS-0$
let gep = require('./getElementPath');
(function () {
  if (window.hasOwnProperty('Cu')) {
    alert('Run this scratchpad script in Environment->Content');
    return;
  }
  let exampleFunction = 'function(m, c1){return c1.toLowerCase();}';
  let usage = function usage() {
    //
    // Replace globally in currently active Element:
    //
    replaceInActiveElement(/apa\.selfhost\.eu/g, 'my.own.server');
    //$NON-NLS-0$
    //
    // Replace interactively in specified element.
    // Prompts for undefined regexp and replacement:
    //
    replaceInActiveElement(undefined, undefined, document.querySelector('input#siteSearchQuery'))
    //
    // Use a function to do the replacement:
    //
    let f = function (match, capture1, offset, string) {
      return capture1.toLowerCase();
    };
    replaceInActiveElement(/\b([A-Z])/g, f);
    //
    // Use function source code to do the replacement:
    //
    replaceInActiveElement(/\b([A-Z])/g, exampleFunction);
  }
  console.info(usage.toString());
  window.replaceInActiveElement = function replaceInActiveElement(regexp, replacement, element) {
    let ae = element || document.activeElement,
        str;
    if (!ae) {
      window.alert('There is no active element to replace in.\nClick inside an editable element to make it active or supply a third argument.');
    } 
    // || document.activeElement.contentDocument.activeElement;
    if (ae.nodeName == 'IFRAME') {
      ae = ae.contentDocument.activeElement;
    }
    console.log(gep.getElementPath(ae));
    // TODO Handle innerHTML (e.g. wordpress) as well!
    let target = ae.value ? 'value' : (ae.isContentEditable ? (ae.textContent == ae.innerHTML ? 'textContent' : 'innerHTML')  : '');
    if (typeof target !== 'string' || !target.length) {
      window.alert('Cannot Edit:\n\n' + gep.getElementPath(ae) + '\n\nClick inside an editable element to make it active or supply a third argument.');
      return;
    }
    console.log('target=' + target);
    if (typeof regexp === 'undefined') {
      str = window.prompt('Search RegExp\nPlease escape characters .+*(){}[]? with \\\ne.g. \\w+\\d');
      //$NON-NLS-0$
      if (str === null) {
        window.alert('No value for Search RegExp');
        return;
      }
      let captureGroups = str.match(/^\/?(.+?)(?:\/([gim]*))?$/);
      regexp = new RegExp(captureGroups[1], captureGroups[2]);
    }
    if (typeof replacement === 'undefined') {
      replacement = JSON.parse('"' + window.prompt('Replacement String with substitutions $1,$&,$`,$\nCan also be a replacement function text, e.g.\n' + exampleFunction) + '"')
      //$NON-NLS-1$ //$NON-NLS-0$
    }
    if (target) {
      if (typeof replacement === 'string') {
        console.log(replacement);
        console.log((/\s*function(\s+\w+)?\s*\(/).test(replacement));
        if ((/\s*function(\s+\w+)?\s*\(/).test(replacement)) {
          try {
            let result = eval('replacement = ' + replacement);
            console.log('result', result);
          } 
          catch (exception) {
            window.alert(exception.toString());
          }
        }
      }
      if (replacement !== null) {
        try {
          ae[target] = ae[target].replace(regexp, replacement);
          console.log('replaced ae["' + target + '"]', ae[target]);
        } 
        catch (exception) {
          window.alert(exception.toString());
        }
      } else {
        window.alert('No value for Replacement String');
      }
    }
  };
  if (!document.activeElement) {
    window.alert('There is no active element to replace in.\nClick inside an editable element to make it active.');
  } 
  else if (window.confirm('Do interactive replace now?\n\n Active element:\n ' + gep.getElementPath(document.activeElement) + '\n\nAlternatively open the webconsole for command line use.')) {
    replaceInActiveElement();
  }
}) ();
