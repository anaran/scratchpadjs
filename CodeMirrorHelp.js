// snippet CodeMirrorHelp.js
(function() {
    var reportCodeMirrorInfo = function() {
        if (!window.CodeMirror) {
            console.log('No CodeMirror here');
            return;
        }
        var dflt = window.CodeMirror.defaults.keyMap;
        var fallthrough = window.CodeMirror.keyMap[window.CodeMirror.defaults.keyMap].fallthrough;
        var defaultKeyMapHelp = JSON.stringify(window.CodeMirror.keyMap[dflt], null, 4);
        var fallthroughKeyMapHelp = JSON.stringify(window.CodeMirror.keyMap[fallthrough], null, 4);
        var defaultsHelp = JSON.stringify(window.CodeMirror.defaults, null, 4);
        // console.log(defaultKeyMapHelp);
        // console.log(fallthroughKeyMapHelp);
        // console.log(defaultsHelp);
        var pre = document.createElement('textarea');
        // pre.style = 'position: fixed; top: 1em; left: 1em;';
        pre.style['position'] = 'fixed';
        pre.style['bottom'] = '1em';
        pre.style['right'] = '1em';
        pre.style['zIndex'] = 10;
        pre.style['height'] = '50%';
        pre.style['width'] = '50%';
        pre.style['overflow'] = 'auto';
        pre.style['resize'] = 'both';
        // pre.style['whitespace'] = 'pre';
        pre.style['tabindex'] = '1';
        pre.style['background'] = 'white';
        pre.textContent = defaultKeyMapHelp + '\n' + fallthroughKeyMapHelp + '\n' + defaultsHelp;
        pre.title = 'CodeMirror Default Keymap, Fallthrough Keymap, Defaults';
        pre.addEventListener('click', function(event) {
            console.log(event.target, event);
            document.body.removeChild(pre);
        }, false);
        pre.addEventListener('keydown', function(event) {
            // event.cancelBubble = true;
            console.log(event.target, event);
            if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
                document.body.removeChild(pre);
            }
            //             if ((event.key === 'PageDown') || (event.keyIdentifier === '???U+001B')) {
            // event.stopPropagation();
            //             }

        }, false);
        pre.addEventListener('keypress', function(event) {
            console.log(event.target, event);
            // event.preventDefault();
        }, false);
        document.body.appendChild(pre);
        // pre.contentEditable = true;
        pre.readOnly = true;
        pre.focus();
        console.log(pre);
        // pre.contentEditable = 'false';
    };
    if (true) {
        window.addEventListener('keydown', function(event) {
            console.log(event.target, event);
            if ((event.key === 'F2' || event.keyIdentifier === 'F2') && event.shiftKey && event.ctrlKey) {
                reportCodeMirrorInfo();
            } else {
                // return '';
            }
        }, false);
    }
})();
