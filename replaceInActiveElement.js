/* jslint browser: true */
/*global console: false*/
//
// Workaround for Eclipse Orion for Mozilla Bug 
// From:\n[ \t]*(//\$NON.+)
// To: $1
// Options: [v] Regular expression
//
// TODO This dows not work in Scratchpad:
// Replace:/\n\s*(\/\/\$NON-NLS)/
// With: $1
'use strict';
//$NON-NLS-0$
(function () {
  if (window.hasOwnProperty('Cu')) {
    alert('Run this scratchpad script in Environment->Content');
    return ;
  }
  if (typeof require === 'function') {
    require('getElementPath');
  } 
  else {
    window.alert('Run scratchpad script getElementPath first');
  }
  window.replaceInActiveElement = function replaceInActiveElement(regexp, replacement, element) {
    var ae = element || document.activeElement;
    if (regexp === undefined) {
      var str = window.prompt('Search RegExp (please escape .+*(){}[]? with \\', 'e.g. [\\w+\\d]'); //$NON-NLS-0$
      var captureGroups = str.match(/^\/?(.+?)(?:\/([gim]*))?$/);
      var regexp = new RegExp(captureGroups[1], captureGroups[2]);
    }
    if (replacement === undefined) {
      replacement = JSON.parse('"' + window.prompt('Replacement String with substitutions $1,$&,$`,$', 'e.g. $&') + '"') //$NON-NLS-1$ //$NON-NLS-0$
    }
    if (ae) {
      if (ae.value) {
        ae.value = ae.value.replace(regexp, replacement);
      }
      if (ae.textContent) {
        ae.textContent = ae.textContent.replace(regexp, replacement);
      }
    }
  };
  var usage = function usage() {
    // Replace globally in currently active Element:
    replaceInActiveElement(/apa\.selfhost\.eu/g, 'my.own.server'); //$NON-NLS-0$
    // Replace interactively, prompting for regexp and replacement:
    replaceInActiveElement();
  }
  if (typeof document.activeElement === 'undefined') {
    window.alert('There is no active element to replace in.\nClick inside an editable element to make it active.');
  } 
  else if (window.confirm('Do interactive replace now?\n\nActive element:\n' + getElementPath(document.activeElement) + '\n\nAlternatively open the webconsole for command line use.')) {
    replaceInActiveElement();
  } 
  else {
    console.info(usage.toString());
  }
}) ();
