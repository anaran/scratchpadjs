// -sp-context: browser
// above line needs to be first one for firefox scratchpad to honor it.
// TODO: how can I achieve this when running thru browserify?
;
(function () {
  var tabs = [
  ];
  var scratchpads = [
  ];
  // var w = window.open('data:text/html;charset=UTF-8,');
  var tabInfo = 'Browser has ' + gBrowser.tabs.length + ' Tabs';
  var getLabel = function getLabel(obj) {
    return obj.label;
  };
  var getLink = function getLink(obj) {
    // console.log(obj.linkedBrowser);
    // return "no href";
    return obj.linkedBrowser.lastURI.spec;
    // return obj.linkedBrowser.contentDocument.location.href;
  };
  // See Scratchpad.ScratchpadManager.saveOpenWindows.toSource()
  var getSaved = function getSaved(window) {
    var state = window.Scratchpad.getState();
    return (state.saved ? '__' : '*_') + state.filename + ' ('
    + (state.executionContext == window.SCRATCHPAD_CONTEXT_BROWSER
       ? 'Browser' : 'Content')
    + ')';
  };
  var getPath = function getPath(window) {
    var state = window.Scratchpad.getState();
    console.log(state.filename);
    return state.filename;
  };
  var focusScratchpad = function focusScratchpad(obj) {
    return function (event) {
      event.preventDefault();
      event.stopPropagation();
      obj.focus();
    };
  };
  var clickFunc = function clickFunc(obj) {
    return function (event) {
      event.preventDefault();
      event.stopPropagation();
      obj.click();
    };
  };
  var buildTableDiv = function buildTable(d, info, tabs, getLabel, getLink /*, clickFunc*/) {
    var t = d.createElement('table');
    var div = d.createElement('div');
    t.style.width = '100%';
    var caption = d.createElement('caption');
    caption.textContent = tabInfo;
    // caption.style.align = 'left';
    t.appendChild(caption);
    for (i = 0; i < tabs.length; i++) {
      var tdl = d.createElement('td');
      var tdh = d.createElement('td');
      var tr = d.createElement('tr');
      tdl.textContent = getLabel(tabs[i]);
      tdh.textContent = getLink(tabs[i]);
      tr.appendChild(tdl);
      tr.appendChild(tdh);
      t.appendChild(tr);
    }
    div.appendChild(t);
    div.style = 'position: fixed; width: 90%; height: 80%; overflow: scroll; top: 15%; left: 5%; opacity: 0.9; background: white;'
    // div.style = "position: fixed; overflow: scroll; top: 2em; right: 2em; bottom: 2em; left: 2em; opacity: 0.9; background: white;"
    return div;
  };
  var buildLinksDiv = function buildLinksDiv(d, info, tabs, getLabel, getLink, clickFunc) {
    var div = d.createElement('div');
    var header = d.createElement('h1');
    header.textContent = info;
    div.appendChild(header);
    var div2 = d.createElement('div');
    var search = d.createElement('input');
    search.type = 'search';
    search.placeholder = 'search by regexp';
    div2.appendChild(search);
    var progress = d.createElement('progress');
    // progress.max = 50;
    div2.appendChild(progress);
    div.appendChild(div2);
    progress.style.display = 'none';
    // progress.value = 25;
    // progress.value = 50;
    // div.removeChild(progress);
    search.addEventListener('keypress', function (event) {
      if (event.key == 'Enter') {
        window.setTimeout(function () {
          progress.style.display = 'inline';
        }, 200);
        var buildElementRegExpMatchRanges = require('./build_element_regexp_text_match_ranges.js').buildElementRegExpMatchRanges;
        for (i = 0; i < tabs.length; i++) {
          // console.log(tabs[i].linkedBrowser.contentDocument.location);
          // console.log(tabs[i].linkedBrowser.contentDocument);
          var noMatch = div.querySelector('li:nth-child('+(i+1)+')');
          event.target.value = event.target.value.trim();
          // if (event.target.value.length < 3) {
          //   event.target.value = 'Too short (< 3): ' + event.target.value;
          // }
          if (event.target.value) {
            var betterMatches = buildElementRegExpMatchRanges(tabs[i].linkedBrowser.contentDocument.body, event.target.value, 'searchFlagGlobal.checked', 'searchFlagIgnoreCase.checked', !'searchFlagMultiLine.checked');
            if (!betterMatches.length) {
              // noMatch.style.opacity = 0.2;
              // noMatch.tabIndex = -1;
              noMatch.style.display = 'none';
            } else {
              // noMatch.style.opacity = 1.0;
              // noMatch.tabIndex = 0;
              noMatch.style.display = 'list-item';
              console.log((i+1)+'.', betterMatches);
            }
          } else {
            noMatch.style.display = 'list-item';
            // tab content has been loaded (e.g. since last browser restart)
            if (tabs[i].linkedBrowser.contentDocument.body.textContent.length) {
              noMatch.style.opacity = 1.0;
            } else {
              // tab content has not been loaded, user needs to visit tab.
              noMatch.style.opacity = 0.4;
            }
          }
        }
        window.setTimeout(function () {
          progress.style.display = 'none';
        }, 200);
      }
    });
    var links = d.createElement('ol');
    div.appendChild(links);
    div2.style = 'position: fixed; z-index: 1; background: ' + window.getComputedStyle(d.body).backgroundColor;
    // progress.style = 'position: fixed; z-index: 1;';
    header.style = 'position: fixed; z-index: 1; background: ' + window.getComputedStyle(d.body).backgroundColor;
    // header.style = 'position: fixed; z-index: 1;';
    for (i = 0; i < tabs.length; i++) {
      var item = d.createElement('li');
      var link = d.createElement('a');
      link.textContent = getLabel(tabs[i]);
      link.href = getLink(tabs[i]);
      // NOTE clickFunc returns a function closing over the current tab.
      clickFunc && link.addEventListener('click', clickFunc(tabs[i]));
      item.appendChild(link);
      links.appendChild(item);
    }
    links.style = 'position: absolute; top: 4em; left: 0;'
    // div.style = "position: fixed; width: 60%; height: 60%; overflow: auto; top: 20%; left: 20%; opacity: 0.9; background: white;"
    // div.style = "position: fixed; overflow: scroll; top: 2em; right: 2em; bottom: 2em; left: 2em; opacity: 0.9; background: white;"
    return div;
  };
  for (i = 0; i < gBrowser.tabs.length; i++) {
    tabs.push(gBrowser.tabs[i]);
  }
  var enumerator = Services.wm.getEnumerator('devtools:scratchpad');
  while (enumerator.hasMoreElements()) {
    var win = enumerator.getNext();
    if (!win.closed && win.Scratchpad.initialized) {
      console.log(win.Scratchpad);
      scratchpads.push(win);
    }
  }
  // openWebConsole is not a toggle.
  // win.Scratchpad.openWebConsole();
  // openErrorConsole is a toogle, so you risk losing console history!
  // win.Scratchpad.openErrorConsole();
  // console.log(scratchpads);
  // var div = buildTableDiv(tabInfo, tabs, getLabel, getLink);
  var otw = window.open('', 'open_tabs');
  var osw = window.open('', 'open_scratchpads');
  var div = buildLinksDiv(otw.document, tabInfo, tabs, getLabel, getLink, clickFunc);
  var spInfo = 'Browser has ' + scratchpads.length + ' Scratchpads';
  var spDiv = buildLinksDiv(osw.document, spInfo, scratchpads, getSaved, getPath, focusScratchpad);
  // content.document.body.appendChild(div);
  otw.document.body.appendChild(div);
  osw.document.body.appendChild(spDiv);
}) ();
