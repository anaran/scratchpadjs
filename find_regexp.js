// snippet find_regexp.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
(function() {
    catchFind = function(event) {
        if (event.ctrlKey && event.keyCode === "F".charCodeAt(0)) {
            event.preventDefault();
            //         console.log("got it!", event);
            var searchBox = document.createElement('div');
            var searchField = document.createElement('input');
            var searchNext = document.createElement('input');
            var searchPrevious = document.createElement('input');
            var searchClose = document.createElement('input');
            searchBox.style.position = "fixed";
            //         searchBox.style.top = 100 + 'px';
            //         searchBox.style.left = 100 + 'px';
            searchField.type = "search";
            searchField.autofocus = true;
            searchField.autocomplete = true;
            searchNext.type = "button";
            searchNext.value = ">";
            searchPrevious.type = "button";
            searchPrevious.value = "<";
            searchClose.type = "button";
            searchClose.value = "X";
            searchField.addEventListener('keypress', function(event) {
                console.log(event.keyIdentifier);
                if (event.keyIdentifier === 'Enter') {
                    var exp = event.target.value.match(/^(\s*\/)?(.+?)(?:\/([gim]*))?\s*$/);
                    //             window.alert(JSON.stringify(document.body.textContent.match(new RegExp(event.target.value, "g")), null, 2));
                    window.alert(JSON.stringify(document.body.textContent.match(exp[1] && exp[3] ? new RegExp(exp[2], exp[3]) : event.target.value), null, 2));
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
    // window.find(clipParam, "aCaseSensitive", !"aBackwards", !"aWrapAround", "aWholeWord", !"aSearchInFrames", !"aShowDialog");
    window.addEventListener('keydown', catchFind, false);
})();