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
  var setupHelpTypes = function(cm, options) {
    var bufferNames = Object.keys(options);
    var buffers = {
    };
    var wrap = cm.getWrapperElement();
    var sel = document.body.querySelector('select.CodeMirror-help');
    sel && sel.parentElement.removeChild(sel);
    sel = document.createElement('select');
    sel.className = 'CodeMirror-help';
    bufferNames.forEach(function(name) {
      var optHelp = document.createElement('option');
      optHelp.text = name;
      // optHelp.defaultSelected = true;
      buffers[name] = CodeMirror.Doc(options[name], 'javascript');
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
    buffers['Editor'] = cm.swapDoc(buffers[sel.value]);
  };
  var getCommandsHelp = function(cm) {
    return JSON.stringify({
      'typeof cm': typeof cm,
      'Object.keys(CodeMirror.commands).length': Object.keys(CodeMirror.commands).length,
      'Object.keys(CodeMirror.commands).sort()': Object.keys(CodeMirror.commands).sort()
    }, null, 2);
  };
  var getDefaultsHelp = function(cm) {
    return JSON.stringify({
      'Object.keys(CodeMirror.defaults).length': Object.keys(CodeMirror.defaults).length,
      'Object.keys(CodeMirror.defaults).sort()': Object.keys(CodeMirror.defaults).sort()
    }, null, 2);
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
    var keyMapName = cm.getOption('keyMap');
    var keyMapFallthrough = CodeMirror.keyMap[keyMapName].fallthrough;
    return JSON.stringify({
      'keyMapName': keyMapName,
      'keyMapFallthrough': keyMapFallthrough,
      'CodeMirror.keyMap[keyMapName]': CodeMirror.keyMap[keyMapName],
      'CodeMirror.keyMap[keyMapFallthrough]': CodeMirror.keyMap[keyMapFallthrough]
    }, null, 2);
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
    setupHelpTypes(cm, { '*defaults Help*': getDefaultsHelp(cm) });
  };
  CodeMirror.commands.keyMapHelp = function (cm) {
    setupHelpTypes(cm, { '*keyMap Help*': getKeyMapHelp(cm) });
  };
  CodeMirror.commands.optionsHelp = function (cm) {
    setupHelpTypes(cm, { '*options Help*': getOptionsHelp(cm) });
  };
});
