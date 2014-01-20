// snippet download_localStorage.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.356Z
(function() {
    var blob = new window.Blob([JSON.stringify(localStorage, null, 4)], {
        'type': 'text/utf-8'
    });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "localStorage_" + encodeURIComponent(location.origin) + '@' + Date.now() + '.txt';
    a.textContent = 'Download localStorage';
//     a.click();
    // var w = window.open('', '', "width=280,height=100,top=100,left=100");
    // w.document.title = 'localStorage';
    // w.document.body.appendChild(a);
        var myDocument = document;
        var autosaveIndicator = myDocument.createElement('div');
        autosaveIndicator.style.position = 'fixed';
        autosaveIndicator.style.top = '20px';
        autosaveIndicator.style.left = '20px';
//        autosaveIndicator.style.bottom = '1em';
//        autosaveIndicator.style.right = '1em';
        autosaveIndicator.style.backgroundColor = 'white';
        autosaveIndicator.style.border = '1px dashed';
        // autosaveIndicator.style.transition = 'opacity 1s 0s';

        // var downloadLink = myDocument.createElement('pre');
        // downloadLink.textContent = document.URL + '\n' + document.title + '\n';
        autosaveIndicator.appendChild(a);

        var close = autosaveIndicator.appendChild(myDocument.createElement('span'));
        close.textContent = "[x]";
        close.addEventListener('click', function(event) {
            event.preventDefault();
                myDocument.body.removeChild(autosaveIndicator);
        }, false);
        myDocument.body.appendChild(autosaveIndicator);

})();
