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
    var findActiveCodeMirror = function findActiveCodeMirror(element) {
      let element = element || document.activeElement;
      while (element) {
        if (element.hasOwnProperty('CodeMirror')) {
          return element.CodeMirror;
        }
        element = element.parentElement;
      }
    };
    var reportCodeMirrorInfo = function () {
      let activeCodeMirror = findActiveCodeMirror(document.activeElement);
      var div = document.querySelector('#reportCodeMirrorInfo');
      if (div) {
        document.body.removeChild(div);
      }
      var div = document.createElement('div');
      div.id = 'reportCodeMirrorInfo';
      var close = document.createElement('input');
      close.type = 'button';
      // NOTE &Cross; is not available in Firefox for Android.
      close.value = 'Close';
      close.style['width'] = '100%';
      // close.align = 'right';
      var txtArea = document.createElement('textarea');
      div.style['position'] = 'fixed';
      div.style['bottom'] = '1em';
      div.style['right'] = '1em';
      div.style['zIndex'] = 10;
      div.style['height'] = '50%';
      div.style['width'] = '50%';
      txtArea.style['width'] = '100%';
      txtArea.style['height'] = '100%';
      // div.style['maxWidth'] = '50%';
      txtArea.style['overflow'] = 'auto';
      // TODO: Firefox will process the click caused by resizing and close the textarea immediately after resizing.
      // Not very useful. Resizing does not cause a click event in Google Chrome.
      // div.style['resize'] = 'both';
      div.style['tabindex'] = '1';
      div.style['background'] = 'white';
      if (!activeCodeMirror) {
        txtArea.textContent = 'Only reporting Defaults (no active editor)';
      }
      else {
        console.dir(activeCodeMirror);
        console.dir(activeCodeMirror.commands);
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
      txtArea.addEventListener('keydown', function (event) {
        // console.log(event.target, event);
        if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
          document.body.removeChild(div);
        }
      }, false);
      txtArea.addEventListener('keypress', function (event) {
        // event.preventDefault();
      }, false);
      document.body.appendChild(div);
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

/*
Exception: syntax error
@Scratchpad/1:59
*/
/*
Exception: syntax error
@Scratchpad/1:59
*/