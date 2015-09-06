// Useful information about content window and navigator
;
(function () {
  var doc = 'ChromeWindow' in window ? content.document : document;
  var dl = doc.createElement('dl');
  dl.addEventListener('click', function (e) {
    // Not needed.
    // e.preventDefault();
    var s = window.getSelection();
    s.selectAllChildren(e.currentTarget);
  });
  var table = [
    'document.lastModified',
    'navigator.userAgent',
    'navigator.javaEnabled()',
    'navigator.buildID',
    'navigator.language',
    'navigator.languages',
    '(new Date).getTimezoneOffset()'
  ].sort().map(function (value, index, object) {
    var dt = doc.createElement('dt');
    var dd = doc.createElement('dd');
    dt.textContent = value;
    dd.textContent = eval(value);
    dl.appendChild(dt);
    dl.appendChild(dd);
    return {
      'object': value,
      'value': eval(value)
    };
  });
  // Extract input values from bugzilla from for later use (e.g. when
  // sbmit fails):
  Array.prototype.forEach.call(
    document.querySelectorAll('textarea,input'), function (node) {
      if (node.value.length && node.id != node.value) {
        var dt = doc.createElement('dt');
        var dd = doc.createElement('dd');
        dt.textContent = node.id;
        dd.textContent = node.value;
        dl.appendChild(dt);
        dl.appendChild(dd);
        console.log(node.value);
      }
    });
  // console.table(table);
  // console.log(dl.textContent);
  // console.log(dl.innerHTML);
  var close = doc.createElement('div');
  // close.textContent = 'Close \u2717 \u2A2F';
  close.textContent = '\u2A2F';
  close.onclick = function () {
    doc.body.removeChild(this.parentElement);
  };
  close.style = 'background: white; position: fixed; left: 50%; top: 50%; font-size: large;';
  // dl.style = 'padding: 1em; top: 2em;';
  var div = doc.createElement('div');
  div.appendChild(close);
  div.appendChild(dl);
  doc.body.appendChild(div);
  // dl.style = 'position: fixed; background: skyblue;';
  var bcr = dl.getBoundingClientRect();
  console.log(dl.style);
  // dl.style = dl.style + ' top: calc(50% - ' + bcr.height + 'px); left: calc(50% - ' + bcr.width + 'px);';
  // dl.style = 'position: fixed; top: calc(50% - ' + bcr.height + 'px); left: calc(50% - ' + bcr.width + 'px); background: skyblue;';
  // dl.style = 'position: fixed; top: calc(50% - ' + bcr.height + '); left: calc(50% - ' + bcr.width + '); background: skyblue;';
  div.style = 'padding: 1em; position: fixed; top: 50%; left: 50%; bottom: 0; right: 0; background: skyblue; overflow: scroll;';
  console.log(bcr);
}) ();
// window.alert(window.hasOwnProperty('Cu'));
var gDevTools = window.hasOwnProperty('Cu') && Cu.import('resource:///modules/devtools/gDevTools.jsm', {
}).gDevTools;
var tools = window.hasOwnProperty('Cu') && Cu.import('resource://gre/modules/devtools/Loader.jsm', {
}).devtools;
var HUDService = tools && tools.require('devtools/webconsole/hudservice');
var browserConsole = HUDService && HUDService.getBrowserConsole();
var webConsole = HUDService && HUDService.getOpenWebConsole();
// JSON.stringify([gDevTools, tools, HUDService, browserConsole, webConsole ], null, 2);
// TODO: Use Environment Browser when CSP gets in the way:
/*
Exception: Error: call to eval() blocked by CSP
table<@Scratchpad/2:27:16
@Scratchpad/2:14:15
@Scratchpad/2:11:2
*/
