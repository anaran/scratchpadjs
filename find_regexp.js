// snippet find_regexp.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
catchFind = function(event) {
    if (event.ctrlKey && event.keyCode === "F".charCodeAt(0)) {
        event.preventDefault();
        //         console.log("got it!", event);
        var searchField = document.createElement('input');
        searchField.position = "fixed";
        searchField.top = 100;
        searchField.left = 100;
        searchField.type = "search";
        searchField.placeholder = "\\w+\\s+\\d+";
        console.log(searchField);
        document.body.insertBefore(searchField, document.body.firstChild);
    }
}
window.addEventListener('keydown', catchFind, false);
