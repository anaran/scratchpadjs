(function() {
    try {
        function alertAndWarn(message) {
            window.alert(message + "\nSee JavaScript console the complete log of warnings");
            console.warn(message);
        }

        function selectCommand(event, prevent, stop) {
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
        }

        function setupEventListeners(element) {
            element.addEventListener('mouseenter', selectCommand, true);
            element.addEventListener('dragstart', function(event) {
                event.dataTransfer.effectAllowed = "copy";
            }, false);
            element.addEventListener('drop', function(event) {
                event.dataTransfer.effectAllowed = "none";
            }, false);
            element.addEventListener('keydown', function(event) {
                selectCommand(event, false, true)
            }, true);
            element.addEventListener('keypress', function(event) {
                selectCommand(event, true, true)
            }, true);
            element.addEventListener('keyup', function(event) {
                selectCommand(event, false, true)
            }, true);
        }

        function installGeneratedHtmlEventListeners() {
            document.addEventListener('readystatechange', function(event) {
                if (event.target.readyState !== 'complete') {
                    return;
                }
                (function() {
                    var nds = document.querySelectorAll('div>pre');
                    for (var i = 0, len = nds.length; i < len; i++) {
                        setupEventListeners(nds[i]);
                    }
                    // TODO Please note the Download button would be confusing in the generated document.
                    document.body.removeChild(document.querySelector('.download').parentElement);
                })();
            }, false);
        }
        //         var w = window.open("", "");
        var w = window.open("", "", "width=" + window.screen.availWidth / 2 + ",height=" + window.screen.availHeight / 2);
        var meta = document.createElement('meta');
        meta.content = "text/html; charset=UTF-8";
        meta.httpEquiv = "content-type";
        w.document.head.appendChild(meta);
        var script = document.createElement('script');
        // TODO Why the \/ (see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)?
        script.type = "text\/javascript";
        script.textContent = '"use strict"' + ';\n' + selectCommand + ';\n' + setupEventListeners + ';\n' + installGeneratedHtmlEventListeners + ';\n' + 'installGeneratedHtmlEventListeners();\n';
        w.document.head.appendChild(script);
        var style = document.createElement('style');
        style.type = "text/css";
        style.textContent = 'pre:before { content: attr(line-number); float: left; text-align: right; width: 2em; padding-right: 1em; }\n';
        w.document.head.appendChild(style);
        var now = new Date();
        var ch = JSON.parse(localStorage.consoleHistory);
        w.document.title = "consoleHistory (" + ch.length + ' commands)';
        var consoleHistoryDownloadButton = document.createElement('input');
        consoleHistoryDownloadButton.type = 'button';
        consoleHistoryDownloadButton.className = 'download';
        consoleHistoryDownloadButton.value = 'Download consoleHistory';
        w.document.body.appendChild(document.createElement('div').appendChild(document.createTextNode(w.document.title + ' as of ' + now + ' in ' + navigator.userAgent)).parentElement);
        w.document.body.appendChild(document.createElement('div').appendChild(consoleHistoryDownloadButton).parentElement);
        ch.forEach(function(command, index) {
            var pre = document.createElement('pre');
            //            pre.setAttribute('style', 'display: inline; border: 1px solid silver; margin: 1em;');
            pre.setAttribute('style', 'margin: 0em;');
            var div = document.createElement('div');
            div.setAttribute('style', 'margin: 0.25em;');
            pre.setAttribute('line-number', index + 1);
            pre.contentEditable = true;
            setupEventListeners(pre);
            pre.innerText = command;
            w.document.body.appendChild(div.appendChild(pre).parentElement);
            //             w.document.body.appendChild(pre);
            console.log(command);
        });
        consoleHistoryDownloadButton.addEventListener('click', function(event) {
            var consoleHistoryDocumentBlob = new window.Blob([
            w.document.documentElement.innerHTML], {
                'type': 'text/utf-8'
            });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(consoleHistoryDocumentBlob);
            a.download = "consoleHistory_" + (now).toJSON().replace(/:/g, '') + '.html';
            a.click();
        }, false);
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();