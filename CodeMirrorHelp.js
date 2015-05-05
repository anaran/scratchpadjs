// Code snippet CodeMirrorHelp.js for Google Chrome and Mozilla Firefox.
// Ctrl+F1 opens fixed textarea displaying CodeMirror keymappings and defaults.
// Close by pressing Esc or clicking anywhere in the textarea.
// Navigate it with PageDown, PageUp.
/*jslint browser: true*/
/*globals console: false */
;
try {
  var codeMirrorHelp = function codeMirrorHelp() {
    var getKeyMapHelp = function getKeyMapHelp(name) {
      var keyMap = window.CodeMirror.keyMap[name];
      var keyMapFallthrough = keyMap.fallthrough;
      var text = 'CodeMirror ' + name + ' keyMap = ' + JSON.stringify(keyMap, Object.getOwnPropertyNames(keyMap).sort(), 2);
      return text += '\nCodeMirror ' + name + ' keyMap fallthrough = '
      + JSON.stringify(window.CodeMirror.keyMap[keyMapFallthrough],
                       window.CodeMirror.keyMap[keyMapFallthrough] && Object.getOwnPropertyNames(window.CodeMirror.keyMap[keyMapFallthrough]).sort(), 2);
    };
    // debugger;
    var findActiveCodeMirror = function findActiveCodeMirror(elem) {
      let element = elem || document.activeElement;
      while (element) {
        if (element.hasOwnProperty('CodeMirror')) {
          return element.CodeMirror;
        }
        element = element.parentElement;
      }
      let nes = element.nextElementSibling;
      if (nes.hasOwnProperty('CodeMirror')) {
        return nes;
      }
      let dcc = document.querySelector('div.CodeMirror');
      if (dcc.hasOwnProperty('CodeMirror')) {
        return dcc;
      }
      return undefined;
    };
    var reportCodeMirrorInfo = function () {
      let activeCodeMirror = findActiveCodeMirror(document.activeElement);
      var div = document.querySelector('#reportCodeMirrorInfo');
      if (div) {
        document.body.removeChild(div);
      }
      var div = document.createElement('div');
      div.id = 'reportCodeMirrorInfo';
      var close = document.createElement('span');
      var move = document.createElement('span');
      // close.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      close.innerHTML = '&cross;';
      close.align = 'right';
      move.align = 'left';
      move.style.padding = '0 1em';
      // move.style.border = 'solid lightgrey';
      move.innerHTML = '&nesear;';
      // close.style['width'] = '100%';
      var undo = document.createElement('input');
      undo.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      undo.value = 'undo';
      var redo = document.createElement('input');
      redo.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      redo.value = 'redo';
      var upcase = document.createElement('input');
      upcase.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      upcase.value = 'upcase';
      var downcase = document.createElement('input');
      downcase.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      downcase.value = 'downcase';
      var capitalize = document.createElement('input');
      capitalize.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      capitalize.value = 'capitalize';
      var replace = document.createElement('input');
      replace.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      replace.value = 'replace';
      // var txtArea = document.createElement('textarea');
      var txtArea = document.createElement('pre');
      div.style['position'] = 'fixed';
      div.style['top'] = '1em';
      div.style['left'] = '1em';
      div.style['zIndex'] = 10;
      div.style['height'] = '10%';
      div.style['width'] = '70%';
      // txtArea.style['width'] = '100%';
      // txtArea.style['height'] = '100%';
      // div.style['maxWidth'] = '50%';
      txtArea.style['overflow'] = 'visible';
      // TODO: Firefox will process the click caused by resizing and close the textarea immediately after resizing.
      // Not very useful. Resizing does not cause a click event in Google Chrome.
      // div.style['resize'] = 'both';
      div.style['tabindex'] = '1';
      div.style['background'] = 'white';
      div.style['resize'] = 'both';
      div.style['overflow'] = 'auto';
      if (!activeCodeMirror) {
        txtArea.textContent = 'Only reporting Defaults (no active editor)';
      }
      else {
        // console.dir(activeCodeMirror);
        // console.dir(activeCodeMirror.commands);
        txtArea.textContent = '';
      }
      if (activeCodeMirror) {
        txtArea.textContent += '\n' + getKeyMapHelp(activeCodeMirror.getOption('keyMap'));
      }
      if (activeCodeMirror) {
        var activeOptionsHelp = 'CodeMirror Active Options = ' + JSON.stringify(activeCodeMirror.options, Object.getOwnPropertyNames(activeCodeMirror.options).sort(), 2);
        txtArea.textContent += '\n' + activeOptionsHelp;
      }
      txtArea.textContent += '\n' + getKeyMapHelp(window.CodeMirror.defaults.keyMap);
      var defaultsHelp = '\nCodeMirror Defaults = ' + JSON.stringify(window.CodeMirror.defaults, null, 2);
      txtArea.textContent += defaultsHelp;
      txtArea.textContent += '\n' + 'instance commands?';
      var commandsHelp = '\nCodeMirror Commands = ' + JSON.stringify(Object.keys(window.CodeMirror.commands).sort(), null, 2);
      txtArea.textContent += commandsHelp;
      if (activeCodeMirror) {
        txtArea.title = 'CodeMirror Active KeyMap, Active Options,';
      }
      else {
        txtArea.title = 'CodeMirror';
      }
      txtArea.title += ' Default KeyMap, Defaults';
      close.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        document.body.removeChild(div);
      }, false);
      undo.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.execCommand('undo');
      }, false);
      redo.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.execCommand('redo');
      }, false);
      upcase.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.replaceSelection(activeCodeMirror.getSelection()
                                          .toUpperCase(), "around");
      }, false);
      downcase.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.replaceSelection(activeCodeMirror.getSelection()
                                          .toLowerCase(), "around");
      }, false);
      capitalize.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.replaceSelection(activeCodeMirror.getSelection()
                                          .substring(0, 1).toUpperCase()
                                          + activeCodeMirror.getSelection()
                                          .substring(1).toLowerCase(),
                                          "around");
      }, false);
      replace.addEventListener('click', function (event) {
        console.log(event.srcElement, event.currentTarget, event);
        activeCodeMirror.execCommand('replace');
      }, false);
      txtArea.addEventListener('keydown', function (event) {
        // console.log(event.target, event);
        if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
          document.body.removeChild(div);
        }
      }, false);
      move.addEventListener('mousemove', function (event) {
        // if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
        //   document.body.removeChild(div);
        // }
        if (event.buttons == 1/* && event.currentTarget === move*/) {
          // event.preventDefault();
          event.stopPropagation();
          // console.log(div.style['left'], div.style['top']);
          // console.log([div.offsetTop, div.offsetLeft, div.offsetWidth, div.offsetHeight]);
          //console.log([event.target,
          //            event.currentTarget,
          //            event.srcElement,
          //            event.originalTarget]);
          // , event.target.offsetLeft, event.target.offsetTop, event.clientX, event.clientY);
          // div.offsetTop = (event.clientY - event.target.offsetTop
          //                  - event.target.offsetHeight / 2);
          // div.offsetLeft = (event.clientX - event.target.offsetLeft
          //                   - event.target.offsetWidth / 2);
          div.style.top = (event.clientY - event.target.offsetTop - event.target.offsetHeight / 2) + 'px';
          div.style.left = (event.clientX - event.target.offsetLeft - event.target.offsetWidth / 2) + 'px';
        }
      }, true);
      txtArea.addEventListener('keypress', function (event) {
        // event.preventDefault();
      }, false);
      document.body.appendChild(div);
      div.appendChild(undo);
      div.appendChild(redo);
      div.appendChild(upcase);
      div.appendChild(downcase);
      div.appendChild(capitalize);
      div.appendChild(replace);
      div.appendChild(move);
      div.appendChild(close);
      div.appendChild(txtArea);
      txtArea.readOnly = true;
      // txtArea.focus();
    };
    var setupCodeMirrorHelp = function setupCodeMirrorHelp(event) {
      if ((event.key === 'F1' || event.keyIdentifier === 'F1') && event.ctrlKey && !event.shiftKey) {
        reportCodeMirrorInfo();
      }
    };
    window.removeEventListener('keydown', setupCodeMirrorHelp, false);
    window.addEventListener('keydown', setupCodeMirrorHelp, false);
  };
  codeMirrorHelp();
}
catch (exception) {
  var exceptionText = JSON.stringify(exception, Object.getOwnPropertyNames(exception), 2);
  console.error(exceptionText);
}
