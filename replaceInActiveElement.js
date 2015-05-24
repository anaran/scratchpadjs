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
  var dataUriType = 'data:text/plain;charset=utf-8,';
  var DEBUG = false;
  var examples = [{
    "comment": "Convert MDN link text to URL.pathname",
    "from": "/<a href=\"https:\\/\\/developer\\.mozilla\\.org(.+)\">.+<\\/a>/g",
    "to": "<a href=\"https://developer.mozilla.org$1\">$1</a></li>"
  }, {
    "comment": "Convert to EmbedYouTube macro. See https://developer.mozilla.org/en-US/docs/MDN/Plans/Remove_in-content_iframes",
    "from": "/<iframe[^>]+https:\\/\\/www\\.youtube\\.com\\/embed\\/([^\\/]+)[\\/?][^>]+><\\/iframe>/g",
    "to": "{{EmbedYouTube(\"$1\")}}"
  }, {
    "comment": "Convert to JSFiddleEmbed macro. See https://developer.mozilla.org/en-US/docs/MDN/Plans/Remove_in-content_iframes",
    "from": "/<iframe.+height=\"(\\d+)\" src=\"(https:\\/\\/jsfiddle.net\\/.+)embedded\\/([a-z,]*)\\/?\".*><\\/iframe>/g",
    "to": "{{JSFiddleEmbed(\"$2\",\"$3\",\"$1\")}}"
  }, {
    "comment": "Wrap German Keyboard labels in kbd tag",
    "from": "/<td>(Tab|Eingabetaste|Pfeil (oben|unten|links|rechts)|Bild (Auf|Ab)|F\\d+|H|Escape|Pos1|Ende)<\\/td>/g",
    "to": "<td><kbd>$1</kbd></td>"
  }, {
    "comment": "Wrap Keyboard labels (A + \\S) in kbd tag",
    "from": "/<td>(\\w+)\\s*\\+\\s*(\\S)<\\/td>/g",
    "to": "<td><kbd>$1</kbd> + <kbd>$2</kbd></td>"
  }, {
    "comment": "Wrap Keyboard labels (A + B) in kbd tags",
    "from": "/<td>(\\w+)\\s*\\+\\s*(\\w+)<\\/td>/g",
    "to": "<td><kbd>$1</kbd> + <kbd>$2</kbd></td>"
  }, {
    "comment": "Wrap Keyboard labels (A + B + C) in kbd tags",
    "from": "/<td>(\\w+)\\s*\\+\\s*(\\w+)\\s*\\+\\s*(\\w+)<\\/td>/g",
    "to": "<td><kbd>$1</kbd> + <kbd>$2</kbd> + <kbd>$3</kbd></td>"
  }];
  window.addEventListener("beforeunload", function (event) {
    event.returnValue = "unsaved";
  });
  var setUpDragAndDropLink = function (inputElement, parent, data) {
    // inputElement.title = 'Drop a file here to open it';
    inputElement.dropzone = 'link';
    inputElement.draggable = true;
    inputElement.addEventListener('dragstart', function (event) {
      if (!updateDownloadLinkFromUI(event)) {
        return;
      }
      event.dataTransfer.effectAllowed = 'copyLink'; //$NON-NLS-0$
      // event.dataTransfer.dropEffect = 'copy'; //$NON-NLS-0$
      event.dataTransfer.setData('text/x-moz-url', inputElement.href + '\n' + inputElement.textContent);
      event.dataTransfer.setData('text/x-moz-url-data', inputElement.href);
      event.dataTransfer.setData("text/x-moz-url-desc", inputElement.textContent);
      event.dataTransfer.setData('text/uri-list', inputElement.href);
      // event.dataTransfer.setData('text/_moz_htmlcontext', "<a href=\"" + inputElement.href);
      event.dataTransfer.setData('text/_moz_htmlinfo', "0,0");
      event.dataTransfer.setData('text/html', inputElement.innerHTML);
      event.dataTransfer.setData('text/plain', inputElement.href);
      DEBUG && console.log(event.type, data, 'event.dataTransfer.types', event.dataTransfer.types);
      Array.prototype.forEach.call(event.dataTransfer.types, function (type) {
        DEBUG && console.log(type, event.dataTransfer.getData(type));
      });
    });
    inputElement.addEventListener('drop', function (event) {
      // TODO needed for drop to work!
      event.preventDefault(); // stops the browser from redirecting.
      // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
      // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
      DEBUG && console.log(event.type, 'event.dataTransfer.types', event.dataTransfer.types);
      Array.prototype.forEach.call(event.dataTransfer.types, function (type) {
        DEBUG && console.log(type, event.dataTransfer.getData(type));
        // var linkData = event.dataTransfer.getData(type).split('\n')[0];
      });
      var text = event.dataTransfer.getData('text/plain');
      var data = event.dataTransfer.getData('text/x-moz-url');
      // event.target.value = linkData;
      try {
        var parsedData;
        if (data.length) {
          parsedData = JSON.parse(window.decodeURIComponent(data.split('\n')[0].substring(dataUriType.length)));
        }
        else if (text.length) {
          parsedData = JSON.parse(window.decodeURIComponent(text));
        }
        else {
          window.alert('Drop data contains neither type text/plain nor text/x-moz-url data');
        }
        to.value = parsedData.to;
        from.value = parsedData.from;
      }
      catch (e) {
        window.alert(JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      }
    });
    // NOTE: Needed to set up allowed effects.
    var checkDragTargetAndData = function (event) { //$NON-NLS-0$
      event.preventDefault();
      if ((event.target === json)) {
        DEBUG && console.log(event.type, 'event.dataTransfer.types', event.dataTransfer.types);
        event.dataTransfer.effectAllowed = 'copyLink'; //$NON-NLS-0$
        if (Array.prototype.some.call(event.dataTransfer.types, function (type) {
          return type == 'text/x-moz-url';
        })) {
          event.dataTransfer.dropEffect = 'link'; //$NON-NLS-0$
        }
        else if (Array.prototype.some.call(event.dataTransfer.types, function (type) {
          return type == 'text/plain';
        })) {
          event.dataTransfer.dropEffect = 'copy'; //$NON-NLS-0$
        }
        else {
          event.dataTransfer.effectAllowed = 'none'; //$NON-NLS-0$
          // event.dataTransfer.dropEffect = 'none'; //$NON-NLS-0$
        }
        // event.preventDefault();
        // return false;
      } else {
        event.dataTransfer.effectAllowed = 'none'; //$NON-NLS-0$
        // event.dataTransfer.dropEffect = 'none'; //$NON-NLS-0$
        // return true;
      }
      DEBUG && console.log(event.type, event.dataTransfer.files, event.target);
      // Alternative to event.preventDefault();
      return false;
    };
    true && document.addEventListener('dragover', checkDragTargetAndData); //$NON-NLS-0$ //$NON-NLS-1$
    // NOTE: Needed for :-moz-drag-over CSS pseudoclass to apply (not checked during dragover)
    true && document.addEventListener('dragenter', checkDragTargetAndData); //$NON-NLS-0$ //$NON-NLS-1$
    // inputElement.addEventListener('change', function (event) {
    //   DEBUG && console.log(event.type, 'inputElement.outerHTML', inputElement.outerHTML);
    //   var path = event.target.files[0].mozFullPath;
    //   // openScratchpad(path);
    // });

  };
  var ae = document.activeElement;
  let gep = require('./getElementPath');
  let html = require('html!./replaceInActiveElement.html');
  var div = document.body.querySelector('body>div#replaceInActiveElement');
  DEBUG && console.log(div);
  div && document.body.removeChild(div);
  // TODO: How can I load a template via webpack?
  div = document.createElement('div');
  div.id = 'replaceInActiveElement';
  // TODO: We really don't want to use innerHTML!
  div.innerHTML = html;
  document.body.appendChild(div);
  // TODO: I was not able to listen to any events using document.importNode
  // if ('content' in document.createElement('template')) {
  //   var t = document.querySelector('#replaceInActiveElementTemplate');
  // var from = t.content.querySelector('#from');
  var from = div.querySelector('#from');
  from.value = /<iframe[^>]+https:\/\/www\.youtube\.com\/embed\/([^\/]+)\/[^>]+><\/iframe>/.toString();
  // var to = t.content.querySelector('#to');
  var to = div.querySelector('#to');
  to.value = "{{EmbedYouTube(\"$1\")}}";
  var json = div.querySelector('#json');
  var replace = div.querySelector('#replace');
  var dim = div.querySelector('#dim');
  var close = div.querySelector('#close');
  var exampleSelect = div.querySelector('#examples');
  examples.forEach(function (example) {
    var opt = document.createElement("option");
    opt.value = JSON.stringify(example, null, 2);
    opt.text = example.comment;
    exampleSelect.add(opt, null);
  });
  var updateUiFromSelectedOption = function (event) {
    DEBUG && console.log(event.type, this);
    var parsedValue = JSON.parse(this.value);
    div.title = parsedValue.comment;
    from.value = parsedValue.from;
    to.value = parsedValue.to;
  };
  // exampleSelect.onclick = updateUiFromSelectedOption;
  exampleSelect.onchange = updateUiFromSelectedOption;
  var clearExampleSelection = function (event) {
    DEBUG && console.log(event.type, event);
    // if (event.target.readyState == 'complete') {
    //   examples.selectedIndex = -1;
    // }
  };
  exampleSelect.selectedIndex = -1;
  // window.setTimeout(function () {
  // }, 3000);
  document.addEventListener('readystatechange', clearExampleSelection);
  document.addEventListener('load', clearExampleSelection);
  close.addEventListener('click', function (e) {
    // close.onclick = function () {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, from.value, to.value, ae);
    document.body.removeChild(div);
  });
  dim.onchange = function () {
    console.log(this.type, this.className || this.id, this.checked);
    if (this.checked) {
      div.style.opacity = 0.2;
    }
    else {
      div.style.opacity = 0.9;
    }
  };
  replace.onclick = function () {
    console.log(this, from.value, to.value, ae);
    // (window.confirm('Do interactive replace now?\n\n Active element:\n ' + gep.getElementPath(document.activeElement) + '\n\nAlternatively open the webconsole for command line use.')) {
    let captureGroups = from.value.match(/^\/?(.+?)(?:\/([gim]*))?$/);
    let regexp = new RegExp(captureGroups[1], captureGroups[2]);
    window.alert(JSON.stringify([from.value, to.value, gep.getElementPath(ae)], null, 2));
    replaceInActiveElement(regexp, to.value, ae);
  };
  var updateDownloadLinkFromUI = function (event) {
    if (!from.checkValidity()) {
      window.alert('Cannot save invalid regular expression, see RegExp Help');
      event.preventDefault();
    }
    DEBUG && console.log('updateDownloadLinkFromUI', event.type, event);
    json.href = dataUriType + window.encodeURIComponent(JSON.stringify({ from: from.value, to: to.value }, null, 2));
    json.textContent =  'from_' + from.value.replace(/[^0-9a-zA-Z]+/g, '_').substring(0, 10) +
      '_to_' + to.value.replace(/[^0-9a-zA-Z]+/g, '_').substring(0, 10);
    json.download = json.textContent + window.encodeURIComponent(location.hostname) + '@' + Date.now() + '.txt';
  };
  // json.addEventListener('mousedown', updateDownloadLinkFromUI);
  // json.addEventListener('touchstart', updateDownloadLinkFromUI);
  json.addEventListener('click', updateDownloadLinkFromUI);
  setUpDragAndDropLink(json, div);
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
    replaceInActiveElement(/\b([A-Z])/g, f.toString());
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
