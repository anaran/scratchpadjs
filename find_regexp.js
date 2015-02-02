// See
// TabSeeChrome/TabSee/find_regexp.js
// for the maintained version of this discontinued snippet.
/* jslint browser: true */
/*global console: false*/
"use strict"; //$NON-NLS-0$
(function() {
  try {
    var iif = require('./is_in_front.js');
    var betterMatches = [];
    var matchIndex = 0;
    var regularExpression;
    var catchFind = function(event) {
      try {
        if (event.key === 'f' && event.ctrlKey === true) {
          event.preventDefault();
          //         console.log("got it!", event);
          var goToMatch = function(event, next) {
            try {
              window.getSelection().removeAllRanges();
              document.body.scrollIntoView(true);
              if (next) {
                matchIndex = (matchIndex === betterMatches.length ? 1 : matchIndex + 1);
              } else {
                matchIndex = (matchIndex === 1 ? betterMatches.length : matchIndex - 1);
              }
              window.getSelection().addRange(betterMatches[matchIndex - 1]);
              //                         var bcr = betterMatches[matchIndex].getBoundingClientRect();
              if (window.getSelection().rangeCount === 1) {
                var bcr = window.getSelection().getRangeAt(0).getBoundingClientRect();
                window.scrollTo(bcr.left - window.innerWidth / 2, bcr.top - window.innerHeight / 2);
                // console.log(bcr);
                console.log(matchIndex);
                searchFieldMatches.textContent = betterMatches.length > 0 ? (matchIndex + " of " + betterMatches.length) : 'no match'; //$NON-NLS-1$ //$NON-NLS-0$
              } else {
                console.log('unexpected rangeCount', window.getSelection().rangeCount, betterMatches[matchIndex - 1]); //$NON-NLS-0$
              }
            } catch (exception) {
              debugger;
              console.error(exception.message + '\n' + exception.stack);
              window.alert(exception.message + '\n' + exception.stack);
            }
          };
          var searchBox = document.createElement('div'); //$NON-NLS-0$
          var searchField = document.createElement('input'); //$NON-NLS-0$
          var searchFlagGlobal = document.createElement('input'); //$NON-NLS-0$
          searchFlagGlobal.id = "searchFlagGlobal"; //$NON-NLS-0$
          //                     searchFlagGlobal.name = "searchFlagGlobal";
          searchFlagGlobal.type = "checkbox"; //$NON-NLS-0$
          searchFlagGlobal.title = "match globally"; //$NON-NLS-0$
          var searchFlagGlobalLabel = document.createElement('label'); //$NON-NLS-0$
          searchFlagGlobalLabel.
            for = "searchFlagGlobal"; //$NON-NLS-0$
          searchFlagGlobalLabel.textContent = "g"; //$NON-NLS-0$
          var searchFlagIgnoreCase = document.createElement('input'); //$NON-NLS-0$
          searchFlagIgnoreCase.id = "searchFlagIgnoreCase"; //$NON-NLS-0$
          searchFlagIgnoreCase.type = "checkbox"; //$NON-NLS-0$
          searchFlagIgnoreCase.title = "ignore letter case"; //$NON-NLS-0$
          var searchFlagIgnoreCaseLabel = document.createElement('label'); //$NON-NLS-0$
          searchFlagIgnoreCaseLabel.
            for = "searchFlagIgnoreCase"; //$NON-NLS-0$
          searchFlagIgnoreCaseLabel.textContent = "i"; //$NON-NLS-0$
          //                     searchFlagIgnoreCase.addEventListener('change', function(event) {
          //                         goToMatch(event, !! "next");
          //                     }, false);
          var searchFlagMultiLine = document.createElement('input'); //$NON-NLS-0$
          searchFlagMultiLine.id = "searchFlagMultiLine"; //$NON-NLS-0$
          searchFlagMultiLine.type = "checkbox"; //$NON-NLS-0$
          searchFlagMultiLine.title = "match multiple lines"; //$NON-NLS-0$
          var searchFlagMultiLineLabel = document.createElement('label'); //$NON-NLS-0$
          searchFlagMultiLineLabel.
            for = "searchFlagMultiLine"; //$NON-NLS-0$
          searchFlagMultiLineLabel.textContent = "m"; //$NON-NLS-0$
          //                     searchFlagMultiLine.addEventListener('change', function(event) {
          //                         goToMatch(event, !! "next");
          //                     }, false);
          var searchFieldMatches = document.createElement('span'); //$NON-NLS-0$
          searchFieldMatches.textContent = 'no match'; //$NON-NLS-0$
          var searchNext = document.createElement('input'); //$NON-NLS-0$
          searchNext.type = "button"; //$NON-NLS-0$
          searchNext.value = "\u22C1"; //$NON-NLS-0$
          searchNext.addEventListener('click', function(event) { //$NON-NLS-0$
            goToMatch(event, !! "next");
          }, false);
          var searchPrevious = document.createElement('input'); //$NON-NLS-0$
          searchPrevious.type = "button"; //$NON-NLS-0$
          searchPrevious.value = "\u22C0"; //$NON-NLS-0$
          searchPrevious.addEventListener('click', function(event) { //$NON-NLS-0$
            goToMatch(event, !"next"); //$NON-NLS-0$
          }, false);
          searchNext.disabled = true;
          searchPrevious.disabled = true;
          var searchClose = document.createElement('input'); //$NON-NLS-0$
          searchBox.style.position = "fixed"; //$NON-NLS-0$
          //         searchBox.style.top = 100 + 'px';
          //         searchBox.style.left = 100 + 'px';
          searchField.type = "search"; //$NON-NLS-0$
          searchField.autofocus = true;
          searchField.autocomplete = "on"; //$NON-NLS-0$
          searchField.autosave = "re_match"; //$NON-NLS-0$
          searchClose.type = "button"; //$NON-NLS-0$
          searchClose.value = "\u2A2F"; //$NON-NLS-0$
          searchClose.addEventListener('click', function() { //$NON-NLS-0$
            document.body.removeChild(searchBox);
          }, false);
          searchBox.addEventListener('keypress', function(event) { //$NON-NLS-0$
            try {
              console.log(event.key, event);
              if (event.key === 'Esc') {
                document.body.removeChild(searchBox);
              }
              if (event.key === 'Enter' || event.keyCode === 13) {
                //                                 var exp = event.target.value.match(/^(\s*\/)?(.+?)(?:\/([gim]*))?\s*$/);
                regularExpression = new RegExp(searchField.value, (searchFlagGlobal.checked ? "g" : "") + (searchFlagIgnoreCase.checked ? "i" : "") + (searchFlagMultiLine.checked ? "m" : "")); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
                //             window.alert(JSON.stringify(document.body.textContent.match(new RegExp(event.target.value, "g")), null, 2));
                var tmp = searchField.value;
                searchField.value = "";
                betterMatches = [];
                var collectMatches = function (node) {
                  var m;
                  var r = document.createRange();
                  if (m = regularExpression.exec(node.textContent)) {
                    r.setStart(node, m.index);
                    r.setEnd(node, m.index + m[0].length);
                    betterMatches.push(r);
                    // console.log(node, m, r);
                  }
                  return (r.startOffset != r.endOffset);
                };
                // TODO In this design matches cannot span text elements.
                var dni = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, collectMatches);
                while (dni.nextNode()) {
                }
                console.log(betterMatches);
                // var matches = document.body.textContent.match(regularExpression);
                // console.log(JSON.stringify(matches, null, 2));
                getSelection().removeAllRanges();
                matchIndex = 0;
                searchField.value = tmp;
                console.log(betterMatches);
                searchFieldMatches.textContent = betterMatches.length > 0 ? (matchIndex + ' of ' + betterMatches.length) : 'no match';
                if (betterMatches.length > 0) {
                  searchNext.disabled = false;
                  searchPrevious.disabled = false;
                } else {
                  searchNext.disabled = true;
                  searchPrevious.disabled = true;
                }
              }
            } catch (exception) {
              debugger;
              console.error(exception.message + '\n' + exception.stack);
              window.alert(exception.message + '\n' + exception.stack);
            }
          }, false);
          searchField.placeholder = 'e.g. \\w+\\s+\\d+';
          searchBox.appendChild(searchField);
          searchBox.appendChild(searchFlagGlobal);
          searchBox.appendChild(searchFlagGlobalLabel);
          searchBox.appendChild(searchFlagIgnoreCase);
          searchBox.appendChild(searchFlagIgnoreCaseLabel);
          searchBox.appendChild(searchFlagMultiLine);
          searchBox.appendChild(searchFlagMultiLineLabel);
          searchBox.appendChild(searchFieldMatches);
          searchFieldMatches.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
          searchFieldMatches.style.margin = "0 6px"; //$NON-NLS-0$
          searchFieldMatches.style.opacity = 0.7;
          searchBox.appendChild(searchPrevious);
          searchBox.appendChild(searchNext);
          searchBox.appendChild(searchClose);
          console.log(searchBox);
          document.body.insertBefore(searchBox, document.body.firstChild);
          searchField.focus();
          for (var zIndex = 1; zIndex <= 10000; zIndex *= 10) {
            if (iif.isInFront(searchBox)) {
              break;
            }
            searchBox.style.zIndex = zIndex;
          }
        }
      } catch (exception) {
        debugger;
        console.error(exception.message + '\n' + exception.stack);
        window.alert(exception.message + '\n' + exception.stack);
      }
    };
    window.addEventListener('keypress', catchFind, false); //$NON-NLS-0$
  } catch (exception) {
    debugger;
    console.error(exception.message + '\n' + exception.stack);
    window.alert(exception.message + '\n' + exception.stack);
  }
})();
