// snippet find_regexp.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
(function() {
    var matchRangesByMatch = {};
    var matchRanges = [];
    var matchIndex = 0;
    catchFind = function(event) {
        if (event.ctrlKey && event.keyCode === "F".charCodeAt(0)) {
            event.preventDefault();
            //         console.log("got it!", event);
            var searchBox = document.createElement('div');
            var searchField = document.createElement('input');
            var searchNext = document.createElement('input');
            searchNext.addEventListener('click', function(event) {
                matchIndex %= matchRanges.length;
                window.getSelection().removeAllRanges();
                document.body.scrollIntoView(true);
                window.getSelection().addRange(matchRanges[matchIndex]);
                //                         var bcr = matchRanges[matchIndex].getBoundingClientRect();
                var bcr = window.getSelection().getRangeAt(0).getBoundingClientRect();
                window.scrollTo(bcr.left - window.innerWidth / 2, bcr.top - window.innerHeight / 2);
                console.log(bcr);
                console.log(matchIndex);
                matchIndex += 1;
            }, false);
            var searchPrevious = document.createElement('input');
            var searchClose = document.createElement('input');
            searchBox.style.position = "fixed";
            //         searchBox.style.top = 100 + 'px';
            //         searchBox.style.left = 100 + 'px';
            searchField.type = "search";
            searchField.autofocus = true;
            searchField.autocomplete = true;
            searchNext.type = "button";
            searchNext.value = "\u22C1";
            searchPrevious.type = "button";
            searchPrevious.value = "\u22C0";
            searchClose.type = "button";
            searchClose.value = "\u2A2F";
            searchField.addEventListener('keypress', function(event) {
                console.log(event.keyIdentifier);
                // TODO Please note keyIdentifier is still undefied in Google Chrome 31
                if (event.keyIdentifier === 'Enter' || event.keyCode === 13) {
                    var exp = event.target.value.match(/^(\s*\/)?(.+?)(?:\/([gim]*))?\s*$/);
                    //             window.alert(JSON.stringify(document.body.textContent.match(new RegExp(event.target.value, "g")), null, 2));
                    var matches = document.body.textContent.match(exp[1] && exp[3] ? new RegExp(exp[2], exp[3]) : event.target.value);
                    window.alert(JSON.stringify(matches, null, 2));
                    getSelection().removeAllRanges();
                    matchRanges = [];
                    matchRangesByMatch = {};
                    matches && matches.forEach(function(match) {
                        console.log(match);
                        //                         document.body.focus();
                        // TODO Please note it is pretty nasty to get out of look for !!"aWrapAround"
                        window.find(match, "aCaseSensitive", !"aBackwards", !"aWrapAround", !"aWholeWord", !"aSearchInFrames", !"aShowDialog");
                        matchRanges.push(window.getSelection().getRangeAt(0));
                        if (matchRangesByMatch[match]) {
                            matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                        } else {
                            matchRangesByMatch[match] = [];
                            matchRangesByMatch[match].push(window.getSelection().getRangeAt(0));
                        }
                    });
                    window.getSelection().removeAllRanges();
                    document.body.scrollIntoView(true);
                    console.log(matchRangesByMatch);
                    console.log(matchRanges);
                }
            }, false);
            searchClose.addEventListener('click', function() {
                document.body.removeChild(searchBox);
            }, false);
            searchField.placeholder = "\\w+\\s+\\d+";
            searchBox.appendChild(searchField);
            searchBox.appendChild(searchPrevious);
            searchBox.appendChild(searchNext);
            searchBox.appendChild(searchClose);
            console.log(searchBox);
            document.body.insertBefore(searchBox, document.body.firstChild);

            function whoIsInFrontOf(div) {
                return document.elementFromPoint((div.getBoundingClientRect().right + div.getBoundingClientRect().left) / 2, (div.getBoundingClientRect().top + div.getBoundingClientRect().bottom) / 2);
            }
            for (var zIndex = 1, who = whoIsInFrontOf(searchBox); who && !searchBox.contains(who) && zIndex <= 10000; zIndex *= 10) {
                var whoComputedStyle = window.getComputedStyle(who);
                console.info('increasing z-index to ', zIndex, ' trying to get in front of ', who, whoComputedStyle.zIndex);
                searchBox.style.zIndex = zIndex;
                who = whoIsInFrontOf(searchBox);
            }
        }
    }
    window.addEventListener('keydown', catchFind, false);
})();