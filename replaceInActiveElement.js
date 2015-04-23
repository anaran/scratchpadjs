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
;
//$NON-NLS-0$
(function () {
  'use strict';
  var DEBUG = true;
  var setUpDragAndDrop = function (parent, data) {
      let inputElement = parent.appendChild(document.createElement('input'));
  inputElement.type = 'file';
  inputElement.title = 'Drop a file here to open it';
  inputElement.dropzone = 'copy';
  inputElement.style.cssText = 'padding: 1em; border: 0.2em silver dashed; position: fixed; top: 2em; left: 2em; opacity: 0.9; background: white';
  inputElement.addEventListener('dragstart', function (event) {
    // event.dataTransfer.setData('application/json', data);
      event.dataTransfer.effectAllowed = 'copy'; //$NON-NLS-0$
    event.dataTransfer.setData('text/plain; charset=utf-8', data);
  });
  inputElement.addEventListener('drop', function (event) {
    // TODO needed for drop to work!
    event.preventDefault(); // stops the browser from redirecting.
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    DEBUG && console.log('event.dataTransfer.types', event.dataTransfer.types);
    Array.prototype.forEach.call(event.dataTransfer.types, function (type) {
      DEBUG && console.log({
        type: type,
        'getData(type)': event.dataTransfer.getData(type)
      });
    });
    let linkData = event.dataTransfer.getData(event.dataTransfer.types[1]);
    // let linkData = event.dataTransfer.getData('text/x-moz-url');
    linkData || console.error({
      linkData: linkData,
      types: event.dataTransfer.types
    });
    event.target.value = linkData;
    DEBUG && console.log(JSON.stringify(linkData));
    // openScratchpad(linkData);
    // TODO Find an event instead. onload is not the right one.
    // setTimeout(doImport, 2000);
    // event.target.files[0].mozFullPath = event.target.value;
  }, false);
  document.addEventListener('dragover', function (event) { //$NON-NLS-0$
    event.preventDefault();
    if ((event.target === inputElement)) {
      event.dataTransfer.effectAllowed = 'link'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'link'; //$NON-NLS-0$
    } else {
      event.dataTransfer.effectAllowed = 'none'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'none'; //$NON-NLS-0$
    }
    DEBUG && console.log(event.type, event.dataTransfer.files, event.target);
    return false;
  }, false && 'useCapture'); //$NON-NLS-0$ //$NON-NLS-1$
  inputElement.addEventListener('change', function (event) {
    DEBUG && console.log('inputElement.outerHTML', inputElement.outerHTML);
    var path = event.target.files[0].mozFullPath;
    // openScratchpad(path);
  }, false);

  };
  var ae = document.activeElement;
  let gep = require('./getElementPath');
  let html = require('html!./replaceInActiveElement.html');
  // window.alert(html);
  // TODO: How can I load a template via webpack?
  var d = document.createElement('div');
  // TODO: We really don't want to use innerHTML!
  d.innerHTML = html;
  document.body.appendChild(d);
  // TODO: I was not able to listen to any events using document.importNode
  // if ('content' in document.createElement('template')) {
  //   var t = document.querySelector('#replaceInActiveElementTemplate');
  // var from = t.content.querySelector('#from');
  var from = d.querySelector('#from');
  from.value = /<iframe[^>]+https:\/\/www\.youtube\.com\/embed\/([^\/]+)\/[^>]+><\/iframe>/.toString();
  // var to = t.content.querySelector('#to');
  var to = d.querySelector('#to');
  to.value = "{{EmbedYouTube(\"$1\")}}";
  var replace = d.querySelector('#replace');
  var close = d.querySelector('#close');
  // var replace = t.content.querySelector('#replace');
  // var close = t.content.querySelector('#close');
  // var clone = document.importNode(t.content, true);
  // console.log(replace);
  to.addEventListener('click', function (e) {
    // if (e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, from.value, to.value, ae);
    // }
  });
  close.addEventListener('click', function (e) {
    // close.onclick = function () {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, from.value, to.value, ae);
    document.body.removeChild(e.target.parentElement.parentElement);
  });
  // clone.appendChild(close);
  // replace.addEventListener('click', function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log(e.target, from.value, to.value, ae);
  // });
  replace.onclick = function () {
    console.log(this, from.value, to.value, ae);
    // (window.confirm('Do interactive replace now?\n\n Active element:\n ' + gep.getElementPath(document.activeElement) + '\n\nAlternatively open the webconsole for command line use.')) {
    let captureGroups = from.value.match(/^\/?(.+?)(?:\/([gim]*))?$/);
    let regexp = new RegExp(captureGroups[1], captureGroups[2]);
    window.alert(JSON.stringify([from.value, to.value, gep.getElementPath(ae)], null, 2));
    replaceInActiveElement(regexp, to.value, ae);
  }
  setUpDragAndDrop(d, JSON.stringify({ to: to.value, from: from.value }));
  // document.body.appendChild(clone);
  // }
  let css = require('style!css!./replaceInActiveElement.css');
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
            var replaceValue;
          do {
           replaceValue = ae[target].replace(regexp, replacement);
            if (window.confirm('replace at ' + regexp.lastIndex + '?')) {
                  ae[target] = replaceValue;
            }
          console.log('replaced ae["' + target + '"]', ae[target]);
          } while (ae[target] != replaceValue);
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
}) ();
