// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.commands.commandsHelp = function(cm) {
    console.log(JSON.stringify({
      'typeof cm': typeof cm,
      'Object.keys(CodeMirror.commands).length': Object.keys(CodeMirror.commands).length,
      'Object.keys(CodeMirror.commands).sort()': Object.keys(CodeMirror.commands).sort()/*,
      'Object.keys(cm.commands).length': Object.keys(cm.commands).length,
      'Object.keys(cm.commands).sort()': Object.keys(cm.commands).sort()*/
    }, null, 2));
  };
  CodeMirror.commands.defaultsHelp = function(cm) {
    console.log(JSON.stringify({
      'Object.keys(CodeMirror.defaults).length': Object.keys(CodeMirror.defaults).length,
      'Object.keys(CodeMirror.defaults).sort()': Object.keys(CodeMirror.defaults).sort()
    }, null, 2));
  };
  CodeMirror.commands.optionsHelp = function(cm) {
    try {
      console.log(cm);
      console.log(JSON.stringify({/*
	        'Object.keys(CodeMirror.options).length': Object.keys(CodeMirror.options).length,
	        'Object.keys(CodeMirror.options).sort()': Object.keys(CodeMirror.options).sort(),*/
        'Object.keys(cm.options).length': Object.keys(cm.options).length,
        'Object.keys(cm.options).sort()': Object.keys(cm.options).sort()
      }, null, 2));
    }
    catch (ex) {
      console.log(JSON.stringify(ex, Object.getOwnPropertyNames(ex), 2));
      console.exception(ex);
    }
  };
  CodeMirror.commands.keyMapHelp = function(cm) {
    var keyMapName = cm.getOption('keyMap');
    var keyMapFallthrough = CodeMirror.keyMap[keyMapName].fallthrough;
    console.log(JSON.stringify({
      'keyMapName': keyMapName,
      'keyMapFallthrough': keyMapFallthrough,/*
      'cm.keyMap[keyMapName]': cm.keyMap[keyMapName],
      'cm.keyMap[keyMapFallthrough]': cm.keyMap[keyMapFallthrough],*/
      'CodeMirror.keyMap[keyMapName]': CodeMirror.keyMap[keyMapName],
      'CodeMirror.keyMap[keyMapFallthrough]': CodeMirror.keyMap[keyMapFallthrough],
    }, null, 2));
  };

});
