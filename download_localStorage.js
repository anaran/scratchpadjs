(function() {
//     var selectedCommands = [];
//     catchSelectAndClose = function(event) {
//     if (event.ctrlKey && event.keyCode === "A".charCodeAt(0)) {
//         selectedCommands.push(event.target.innerText);
//     }
//     if (event.ctrlKey && event.shiftKey && event.keyCode === "J".charCodeAt(0)) {
//         if (window.confirm("save selected (Ctrl+A) commands?")) {
//         var a = document.createElement('a');
        var blob = new window.Blob([JSON.stringify(localStorage)], {
            'type': 'text/utf-8'
        });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "localStorage_" + Date.now() + '.txt';
//         var nw = window.open("", "");
//         nw.document.body.appendChild(a);
        a.click();
//         }
//     }
// }
// window.addEventListener('keydown', catchSelectAndClose, false);
})();
