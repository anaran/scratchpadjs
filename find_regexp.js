// snippet find_regexp.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
(function() {
    try {
        var matchRangesByMatch = {};
        var matchRanges = [];
        var matchIndex = 0;
        var regularExpression;
        catchFind = function(event) {
            try {
                if (event.keyIdentifier === "U+0006") {
                    event.preventDefault();
                    //         console.log("got it!", event);
                    var goToMatch = function(event, next) {
                        try {
                            window.getSelection().removeAllRanges();
                            document.body.scrollIntoView(true);
                            if (next) {
                                matchIndex = (matchIndex === matchRanges.length ? 1 : matchIndex + 1);
                            } else {
                                matchIndex = (matchIndex === 1 ? matchRanges.length : matchIndex - 1);
                            }
                            window.getSelection().addRange(matchRanges[matchIndex - 1]);
                            //                         var bcr = matchRanges[matchIndex].getBoundingClientRect();
                            if (window.getSelection().rangeCount === 1) {
                                var bcr = window.getSelection().getRangeAt(0).getBoundingClientRect();
                                window.scrollTo(bcr.left - window.innerWidth / 2, bcr.top - window.innerHeight / 2);
                                // console.log(bcr);
                                console.log(matchIndex);
                                searchFieldMatches.innerText = matchRanges.length > 0 ? (matchIndex + " of " + matchRanges.length) : 'no match';
                            } else {
                                console.log('unexpected rangeCount', window.getSelection().rangeCount, matchRanges[matchIndex - 1]);
                            }
                        } catch (exception) {
                            console.error(exception.stack);
                        }
                    }
                    var searchBox = document.createElement('div');
                    var searchField = document.createElement('input');
                    var searchFlagGlobal = document.createElement('input');
                    searchFlagGlobal.id = "searchFlagGlobal";
                    //                     searchFlagGlobal.name = "searchFlagGlobal";
                    searchFlagGlobal.type = "checkbox";
                    searchFlagGlobal.title = "match globally";
                    var searchFlagGlobalLabel = document.createElement('label');
                    searchFlagGlobalLabel.
                    for = "searchFlagGlobal";
                    searchFlagGlobalLabel.innerText = "g";
                    //                     searchFlagGlobal.addEventListener('change', function(event) {
                    //                         event.target.value = !event.target.value;
                    //                         if (regularExpression instanceof RegExp) {
                    //                             regularExpression = new RegExp(regularExpression.source, (event.target.checked ? "g" : "") + (regularExpression.ignoreCase ? "i" : "") + (regularExpression.multiline ? "m" : ""));
                    //                             searchField.value = regularExpression.toString();
                    //                         }
                    //                     }, false);
                    var searchFlagIgnoreCase = document.createElement('input');
                    searchFlagIgnoreCase.id = "searchFlagIgnoreCase";
                    searchFlagIgnoreCase.type = "checkbox";
                    searchFlagIgnoreCase.title = "ignore letter case";
                    var searchFlagIgnoreCaseLabel = document.createElement('label');
                    searchFlagIgnoreCaseLabel.
                    for = "searchFlagIgnoreCase";
                    searchFlagIgnoreCaseLabel.innerText = "i";
                    //                     searchFlagIgnoreCase.addEventListener('change', function(event) {
                    //                         goToMatch(event, !! "next");
                    //                     }, false);
                    var searchFlagMultiLine = document.createElement('input');
                    searchFlagMultiLine.id = "searchFlagMultiLine";
                    searchFlagMultiLine.type = "checkbox";
                    searchFlagMultiLine.title = "match multiple lines";
                    var searchFlagMultiLineLabel = document.createElement('label');
                    searchFlagMultiLineLabel.
                    for = "searchFlagMultiLine";
                    searchFlagMultiLineLabel.innerText = "m";
                    //                     searchFlagMultiLine.addEventListener('change', function(event) {
                    //                         goToMatch(event, !! "next");
                    //                     }, false);
                    var searchFieldMatches = document.createElement('span');
                    searchFieldMatches.innerText = 'no match';
                    var searchNext = document.createElement('input');
                    searchNext.type = "button";
                    searchNext.value = "\u22C1";
                    searchNext.addEventListener('click', function(event) {
                        goToMatch(event, !! "next");
                    }, false);
                    var searchPrevious = document.createElement('input');
                    searchPrevious.type = "button";
                    searchPrevious.value = "\u22C0";
                    searchPrevious.addEventListener('click', function(event) {
                        goToMatch(event, !"next");
                    }, false);
                    var searchClose = document.createElement('input');
                    searchBox.style.position = "fixed";
                    //         searchBox.style.top = 100 + 'px';
                    //         searchBox.style.left = 100 + 'px';
                    searchField.type = "search";
                    searchField.autofocus = true;
                    searchField.autocomplete = "on";
                    searchField.autosave = "re_match";
                    searchClose.type = "button";
                    searchClose.value = "\u2A2F";
                    searchClose.addEventListener('click', function() {
                        document.body.removeChild(searchBox);
                    }, false);
                    searchBox.addEventListener('keypress', function(event) {
                        try {
                            console.log(event.keyIdentifier);
                            //                             if (!event.ctrlKey && event.shiftKey && event.keyIdentifier === 'Space') {
                            //                                                         goToMatch(event, ! "next");
                            //                             }
                            //                             if (!event.ctrlKey && !event.shiftKey && event.keyIdentifier === 'Space') {
                            //                                                         goToMatch(event, !! "next");
                            //                             }
                            if (event.keyIdentifier === 'Enter' || event.keyCode === 13) {
                                //                                 var exp = event.target.value.match(/^(\s*\/)?(.+?)(?:\/([gim]*))?\s*$/);
                                regularExpression = new RegExp(searchField.value, (searchFlagGlobal.checked ? "g" : "") + (searchFlagIgnoreCase.checked ? "i" : "") + (searchFlagMultiLine.checked ? "m" : ""));
                                //             window.alert(JSON.stringify(document.body.textContent.match(new RegExp(event.target.value, "g")), null, 2));
                                var tmp = searchField.value;
                                searchField.value = "";
                                var matches = document.body.textContent.match(regularExpression);
                                console.log(JSON.stringify(matches, null, 2));
                                getSelection().removeAllRanges();
                                matchIndex = 0;
                                matchRanges = [];
                                matchRangesByMatch = {};
                                matches && matches.forEach(function(match) {
                                    console.log(match);
                                    //                         document.body.focus();
                                    // TODO Please note it is pretty nasty to get out of look for !!"aWrapAround"
                                    window.find(match, !regularExpression.ignoreCase, !"aBackwards", !"aWrapAround", !"aWholeWord", !"aSearchInFrames", !"aShowDialog");
                                    if (window.getSelection().rangeCount === 1) {
                                        matchRanges.push(window.getSelection().getRangeAt(0));
                                        if (matchRangesByMatch[match]) {
                                            matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                                        } else {
                                            matchRangesByMatch[match] = [];
                                            matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                                        }
                                        matchIndex++;
                                    } else {
                                        console.log('unexpected rangeCount', window.getSelection().rangeCount, matchRanges[matchIndex]);
                                    }
                                });
                                searchField.value = tmp;
                                // window.getSelection().removeAllRanges();
                                // document.body.scrollIntoView(true);
                                console.log(matchRangesByMatch);
                                console.log(matchRanges);
                                searchFieldMatches.innerText = matchRanges.length > 0 ? (matchIndex + " of " + matchRanges.length) : 'no match';
                            }
                        } catch (exception) {
                            console.error(exception.stack);
                        }
                    }, false);
                    searchField.placeholder = "\\w+\\s+\\d+";
                    searchBox.appendChild(searchField);
                    searchBox.appendChild(searchFlagGlobal);
                    searchBox.appendChild(searchFlagGlobalLabel);
                    searchBox.appendChild(searchFlagIgnoreCase);
                    searchBox.appendChild(searchFlagIgnoreCaseLabel);
                    searchBox.appendChild(searchFlagMultiLine);
                    searchBox.appendChild(searchFlagMultiLineLabel);
                    searchBox.appendChild(searchFieldMatches);
                    searchFieldMatches.style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
                    searchFieldMatches.style.margin = "0 6px";
                    searchFieldMatches.style.opacity = 0.7;
                    searchBox.appendChild(searchPrevious);
                    searchBox.appendChild(searchNext);
                    searchBox.appendChild(searchClose);
                    console.log(searchBox);
                    document.body.insertBefore(searchBox, document.body.firstChild);

                    function isInFront(div) {
                        var whoComputedStyle;
                        var leftTop = document.elementFromPoint(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
                        var rightBottom = document.elementFromPoint(div.getBoundingClientRect().right, div.getBoundingClientRect().bottom);
                        if (leftTop !== div && !div.contains(leftTop)) {
                            whoComputedStyle = window.getComputedStyle(leftTop);
                            console.info('trying to get in front of ', leftTop, whoComputedStyle.zIndex);
                            return false;
                        }
                        if (rightBottom !== div && !div.contains(rightBottom)) {
                            whoComputedStyle = window.getComputedStyle(rightBottom);
                            console.info('trying to get in front of ', rightBottom, whoComputedStyle.zIndex);
                            return false;
                        }
                        console.info('we in front at leftTop and rightBottom!');
                        return true;
                    }
                    for (var zIndex = 1; zIndex <= 10000; zIndex *= 10) {
                        if (isInFront(searchBox)) {
                            break;
                        }
                        searchBox.style.zIndex = zIndex;
                    }
                }
            } catch (exception) {
                console.error(exception.stack);
            }
        }
        window.addEventListener('keypress', catchFind, false);
    } catch (exception) {
        console.error(exception.stack);
    }
})();