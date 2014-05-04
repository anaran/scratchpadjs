/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
// const { Loader } = require('toolkit/loader');
// console.log(Loader);
// var l = Cu.import("resource://gre/modules/commonjs/toolkit/loader.js", {});
// console.log(l);
// See http://forums.mozillazine.org/viewtopic.php?f=19&t=2698901
(function () {
  if (!window.hasOwnProperty('Cu')) {
    alert('Run this scratchpad script in Environment->Browser');
    return ;
  }
  var {
    Loader
  }
  = Components.utils.import('resource://gre/modules/commonjs/toolkit/loader.js', {
  });
  console.log(Loader);
  var loader = Loader.Loader({
    paths: {
      'sdk/': 'resource://gre/modules/commonjs/sdk/',
      // 'file/': 'file:///C:/javascript/GoogleChromeSnippets/',
      '': 'file:///C:/javascript/GoogleChromeSnippets/'
      // '': 'globals:///'
    },
    resolve: function (id, base) {
      if (id == 'chrome' || id.startsWith('@'))
      return id;
      return Loader.resolve(id, base);
    }
  });
  var module = Loader.Module('main', 'scratchpad://');
  var require = Loader.Require(loader, module);
  window.require = require;
  //     var selection = require("sdk/selection");
  //     selection.on('select', function(){alert(1);});
  console.log(loader);
  console.log(require);
  var data = require('sdk/self') .data;
  // var tabs = require('sdk/tabs');
  /*
Exception: [object Object]
@undefined:NaN:NaN
@resource://gre/modules/commonjs/sdk/util/dispatcher.js:11:7
@resource://gre/modules/commonjs/sdk/model/core.js:12:7
@resource://gre/modules/commonjs/sdk/tabs.js:14:7
@Scratchpad/1:38:7
WCA_evalWithDebugger@resource://gre/modules/devtools/server/actors/webconsole.js:1065:7
WCA_onEvaluateJS@resource://gre/modules/devtools/server/actors/webconsole.js:730:9
DSC_onPacket@resource://gre/modules/devtools/server/main.js:1098:9
LDT_send/<@resource://gre/modules/devtools/server/transport.js:279:11
makeInfallible/<@resource://gre/modules/devtools/DevToolsUtils.js:84:7
*/
  // tabs.open("http://www.xemacs.org");
  var notifications = require('sdk/notifications');
  notifications.notify({
    //     onClick: function (data) {
    //       alert(data);
    //       // console.log(this.data) would produce the same result.
    //     },
    title: 'Scratchpad CommonJS Testing',
    text: 'You can now use\nrequire(\'file\');\nrequire(\'sdk/file\');\nto load from following paths:\n' + JSON.stringify(loader.mapping, null, 2)
    // data: 'did gyre and gimble in the wabe',
  });
  // var fre = require('file/find_regexp');
  // var fre = require('find_regexp');
  var gep = require('getElementPath');
}) ();
