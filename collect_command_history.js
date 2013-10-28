// snippet collect_command_history.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
(function() {
    var selectedCommands = [];
    catchSelectAndClose = function(event) {
    if (event.ctrlKey && event.keyCode === "A".charCodeAt(0)) {
        selectedCommands.push(event.target.innerText);
    }
    if (event.ctrlKey && event.shiftKey && event.keyCode === "J".charCodeAt(0)) {
        if (window.confirm("save selected (Ctrl+A) commands?")) {
        var a = document.createElement('a');
        var blob = new window.Blob([JSON.stringify(selectedCommands, null, 4)], {
            'type': 'text/utf-8'
        });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "console_selected_" + Date.now() + '.txt';
        var nw = window.open("", "");
        nw.document.body.appendChild(a);
        a.click();
        }
    }
}
window.addEventListener('keydown', catchSelectAndClose, false);
})();