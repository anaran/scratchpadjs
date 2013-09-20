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
