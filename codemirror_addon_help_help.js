// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function (mod) {
  if (typeof exports == 'object' && typeof module == 'object') // CommonJS
    mod(require('../../lib/codemirror'));
  else if (typeof define == 'function' && define.amd) // AMD
    define(['../../lib/codemirror'], mod);
  else
    // Plain browser env
    mod(CodeMirror);
}) (function (CodeMirror) {
  'use strict';
  // Keep state across calls to setupHelpTypes, so that Editor buffer won't get overwritten.
  var buffers = {
  };
  var setupHelpTypes = function(cm, options) {
    var bufferNames = Object.keys(options);
    var wrap = cm.getWrapperElement();
    var sel = document.body.querySelector('select.CodeMirror-help');
    sel && sel.parentElement.removeChild(sel);
    sel = document.createElement('select');
    sel.className = 'CodeMirror-help';
    bufferNames.forEach(function(name) {
      var optHelp = document.createElement('option');
      optHelp.text = name;
      var doc = CodeMirror.Doc(options[name], 'javascript');
      buffers[name] = doc;
      doc.markText(doc.posFromIndex(0),
                   doc.posFromIndex(doc.getValue().length), {
                     // inclusiveLeft: true,
                     // inclusiveRight: true,
                     // Did not seem to work (using CTRL-Z to test).
                     // Perhaps this is due to readOnly clearing undo history?
                     addToHistory: true,
                     readOnly: true });
      console.log('doc', doc);
      console.log(doc.getAllMarks());
      // buffers[name].cm.readOnly = true;
      sel.add(optHelp, null);
    });
    var optEditor = document.createElement('option');
    optEditor.text = 'Editor';
    sel.add(optEditor, null);
    CodeMirror.on(sel, 'change', function () {
      var name = sel.options[sel.selectedIndex].value;
      var buf = buffers[name];
      var old = cm.swapDoc(buf);
      console.log(old);
    });
    wrap.parentElement.appendChild(sel);
    console.log(sel);
    if (!buffers['Editor']) {
      buffers['Editor'] = cm.swapDoc(buffers[sel.value]);
    }
  };
  var getCommandsHelp = function(cm) {
    try {
      return JSON.stringify({
        'Object.keys(CodeMirror.commands).length': Object.keys(CodeMirror.commands).length,
        'Object.keys(CodeMirror.commands).sort()': Object.keys(CodeMirror.commands).sort()
      }, null, 2);
    }
    catch (ex) {
      console.exception(ex);
      return JSON.stringify(ex, Object.getOwnPropertyNames(ex), 2);
    }
  };
  var getDefaultsHelp = function(cm) {
    try {
      return JSON.stringify(CodeMirror.defaults, Object.keys(CodeMirror.defaults).sort(), 2);
      // return 
      // 'Object.keys(CodeMirror.defaults).length: ' +
      //   Object.keys(CodeMirror.defaults).length + '\n' +
      //   JSON.stringify(CodeMirror.defaults, null, 2) + '\n' +
      //   JSON.stringify(Object.keys(CodeMirror.defaults).sort(), null, 2);
    }
    catch (ex) {
      console.exception(ex);
      return JSON.stringify(ex, Object.getOwnPropertyNames(ex), 2);
    }
  };
  var getOptionsHelp = function(cm) {
    try {
      return JSON.stringify({
        'Object.keys(cm.options).length': Object.keys(cm.options).length,
        'Object.keys(cm.options).sort()': Object.keys(cm.options).sort()
      }, null, 2);
    }
    catch (ex) {
      console.exception(ex);
      return JSON.stringify(ex, Object.getOwnPropertyNames(ex), 2);
    }
  };
  var getKeyMapHelp = function(cm) {
    try {
      var keyMapName = cm.getOption('keyMap');
      var keyMapFallthrough = CodeMirror.keyMap[keyMapName].fallthrough;
      // 5 = 3;
      return JSON.stringify({
        'keyMapName': keyMapName,
        'keyMapFallthrough': keyMapFallthrough,
        'CodeMirror.keyMap[keyMapName]': CodeMirror.keyMap[keyMapName],
        'CodeMirror.keyMap[keyMapFallthrough]': CodeMirror.keyMap[keyMapFallthrough]
      }, null, 2);
    }
    catch (ex) {
      console.exception(ex);
      return JSON.stringify(ex, Object.getOwnPropertyNames(ex), 2);
    }
  };
  CodeMirror.commands.allHelp = function (cm) {
    setupHelpTypes(cm, {
      '*commands Help*': getCommandsHelp(cm),
      '*defaults Help*': getDefaultsHelp(cm),
      '*keyMap Help*': getKeyMapHelp(cm),
      '*options Help*': getOptionsHelp(cm)});
  };
  CodeMirror.commands.commandsHelp = function (cm) {
    setupHelpTypes(cm, { '*commands Help*': getCommandsHelp(cm) });
  };
  CodeMirror.commands.defaultsHelp = function (cm) {
    console.log(getDefaultsHelp(cm));
    setupHelpTypes(cm, { '*defaults Help*': getDefaultsHelp(cm) });
  };
  CodeMirror.commands.keyMapHelp = function (cm) {
    setupHelpTypes(cm, { '*keyMap Help*': getKeyMapHelp(cm) });
  };
  CodeMirror.commands.optionsHelp = function (cm) {
    setupHelpTypes(cm, { '*options Help*': getOptionsHelp(cm) });
  };
});
