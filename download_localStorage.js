// snippet download_localStorage.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.356Z
(function() {
    var blob = new window.Blob([JSON.stringify(localStorage, null, 4)], {
        'type': 'text/utf-8'
    });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "localStorage_" + (new Date()).toJSON().replace(/:/g, '') + '.txt';
    a.innerText = 'Download localStorage';
//     a.click();
    var w = window.open('', '', "width=280,height=100,top=100,left=100");
    w.document.title = 'localStorage';
    w.document.body.appendChild(a);
})();
