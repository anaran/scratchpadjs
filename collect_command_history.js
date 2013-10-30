(function() {
    try {
        var alertAndWarn = function(message) {
            window.alert(message + "\nSee JavaScript console the complete log of warnings");
            console.warn(message);
        }
        var selectCommand = function(event, prevent, stop) {
            if (prevent) {
                event.preventDefault();
            }
            if (stop) {
                event.stopPropagation();
            }
            var selection = window.getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(event.target);
            // Collapse range to end, i.e. toStart argument is false.
            // range.collapse(false);
            // Always add the range to restore focus.
            selection.addRange(range);
        };
        var w = window.open("", "");
        var meta = document.createElement('meta');
        meta.content = "text/html; charset=UTF-8";
        meta.httpEquiv = "content-type";
        w.document.head.appendChild(meta);
        var ch = JSON.parse(localStorage.consoleHistory);
        w.document.title = "consoleHistory (" + ch.length + ' commands)';
        ch.forEach(function(command) {
            var pre = document.createElement('pre');
            pre.setAttribute('style', 'display: inline; border: 1px solid silver;');
            pre.contentEditable = true;
            pre.addEventListener('mouseenter', selectCommand, true);
            pre.addEventListener('dragstart', function(event) {
                event.dataTransfer.effectAllowed = "copy";
            }, false);
            pre.addEventListener('drop', function(event) {
                event.dataTransfer.effectAllowed = "none";
            }, false);
            pre.addEventListener('keydown', function(event) {
                selectCommand(event, false, true)
            }, true);
            pre.addEventListener('keypress', function(event) {
                selectCommand(event, false, true)
            }, true);
            pre.addEventListener('keyup', function(event) {
                selectCommand(event, false, true)
            }, true);
            pre.innerText = command;
            w.document.body.appendChild(document.createElement('pre').appendChild(pre).parentElement);
            console.log(command);
        });
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();