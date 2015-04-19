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
    'navigator.languages'
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
  // console.table(table);
  // console.log(dl.textContent);
  // console.log(dl.innerHTML);
  doc.body.appendChild(dl);
  // dl.style = 'position: fixed; background: skyblue;';
  var bcr = dl.getBoundingClientRect();
  console.log(dl.style);
  // dl.style = dl.style + ' top: calc(50% - ' + bcr.height + 'px); left: calc(50% - ' + bcr.width + 'px);';
  // dl.style = 'position: fixed; top: calc(50% - ' + bcr.height + 'px); left: calc(50% - ' + bcr.width + 'px); background: skyblue;';
  // dl.style = 'position: fixed; top: calc(50% - ' + bcr.height + '); left: calc(50% - ' + bcr.width + '); background: skyblue;';
  dl.style = 'padding: 1em; position: fixed; top: 50%; left: 50%; background: skyblue;';
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
