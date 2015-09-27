;var cme = (function () {
  var cm = require('codemirror');
  // var cmcss = require('./codemirror.css');
  var cmcss = require('style!css!./node_modules/codemirror/lib/codemirror.css');
  var cmfgcss = require('style!css!./node_modules/codemirror/addon/fold/foldgutter.css');
  // require('codemirror');
  var ta = document.querySelector('textarea.cke_source');
  var div = document.createElement('div');
  var pin = document.createElement('input');
  pin.type = 'checkbox';
  pin.checked = false;
  div.textContent = 'currently trying to get working on MDN source code mode textarea';
  div.style = 'position: fixed; top: 25%; left: 25%; font-size: x-large; color: red; background: white; transition: opacity 4s 1s;';
  var timer = window.setTimeout(function () {
    document.body.removeChild(div);
  }, 5000);
  pin.onchange = function () {
    if (this.checked) {
      window.clearTimeout(timer);
      div.style.opacity = 1;
    }
    else {
      document.body.removeChild(div);
    }
  };
  // div.onclick = function () {
  // };
  document.body.appendChild(div);
  div.appendChild(pin);
  window.requestAnimationFrame(function (timestamp) {
    div.style.opacity = 1;
  });
  window.requestAnimationFrame(function (timestamp) {
    div.style.opacity = 0.2;
  });
  // require([
  //   // "./node_modules/codemirror/lib/codemirror"/*,
  //   "codemirror"/*,
  require("./node_modules/codemirror/addon/fold/foldgutter");
  require("./node_modules/codemirror/addon/fold/foldcode");
  // Prototype addon path for early tracking in git:
  // require("./codemirror_addon_help_help");
  // ...does not work due to:
  // ERROR in ./codemirror_addon_help_help.js
  // Module not found: Error: Cannot resolve 'file' or 'directory' ../../lib/codemirror in C:\scratchpadjs
  //  @ ./codemirror_addon_help_help.js 6:8-39
  // [12:29:17] Finished 'webpack' after 9.11 s
  // So I have to use
  // cp codemirror_addon_help_help.js node_modules/codemirror/addon/help/help.js
  // Probable addon path, if accepted:
  require("./node_modules/codemirror/addon/help/help");
  require("./node_modules/codemirror/keymap/vim");
  require("./node_modules/codemirror/keymap/emacs");
  require("./node_modules/codemirror/keymap/sublime");
  require("./node_modules/codemirror/addon/fold/brace-fold");
  require("./node_modules/codemirror/addon/fold/xml-fold");
  require("./node_modules/codemirror/addon/fold/comment-fold");
  require("./node_modules/codemirror/mode/htmlmixed/htmlmixed");
  require("./node_modules/codemirror/addon/search/search");
  require("./node_modules/codemirror/addon/search/searchcursor");
  require("./node_modules/codemirror/addon/dialog/dialog");
  require("style!css!./node_modules/codemirror/addon/dialog/dialog.css");
  // ], function(CodeMirror) {
  var editor = cm.fromTextArea(ta, {
    keyMap: 'sublime',
    // keyMap: 'emacs',
    foldGutter: true,
    lineNumbers: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    mode: 'htmlmixed'/**/
  });
  console.log(editor);
  return editor;
  // });
})();
