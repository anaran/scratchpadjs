// Code snippet CodeMirrorHelp.js for Google Chrome and Mozilla Firefox.
// Ctrl+F1 opens fixed textarea displaying CodeMirror keymappings and defaults.
// Close by pressing Esc or clicking anywhere in the textarea.
// Navigate it with PageDown, PageUp.
/*jslint browser: true*/
/*globals console: false */

(function() {
    var reportCodeMirrorInfo = function() {
        if (!window.CodeMirror) {
            console.log('No CodeMirror here');
            return;
        }
        var dflt = window.CodeMirror.defaults.keyMap;
        var fallthrough = window.CodeMirror.keyMap[window.CodeMirror.defaults.keyMap].fallthrough;
        var defaultKeyMapHelp = 'CodeMirror defaultKeyMap = ' + JSON.stringify(window.CodeMirror.keyMap[dflt], null, 2);
        var fallthroughKeyMapHelp = 'CodeMirror fallthroughKeyMap = ' + JSON.stringify(window.CodeMirror.keyMap[fallthrough], null, 2);
        var defaultsHelp = 'CodeMirror defaults = ' + JSON.stringify(window.CodeMirror.defaults, null, 2);
        var txtArea = document.createElement('textarea');
        txtArea.style['position'] = 'fixed';
        txtArea.style['bottom'] = '1em';
        txtArea.style['right'] = '1em';
        txtArea.style['zIndex'] = 10;
        txtArea.style['height'] = '50%';
        txtArea.style['width'] = '25em';
        txtArea.style['maxWidth'] = '50%';
        txtArea.style['overflow'] = 'auto';
        // TODO: Firefox will process the click caused by resizing and close the textarea immediately after resizing.
        // Not very useful. Resizing does not cause a click event in Google Chrome.
        // txtArea.style['resize'] = 'both';
        txtArea.style['tabindex'] = '1';
        txtArea.style['background'] = 'white';
        txtArea.textContent = defaultKeyMapHelp + '\n' + fallthroughKeyMapHelp + '\n' + defaultsHelp;
        txtArea.title = 'CodeMirror Default Keymap, Fallthrough Keymap, Defaults';
        txtArea.addEventListener('click', function(event) {
            console.log(event.srcElement, event.currentTarget, event);
            document.body.removeChild(txtArea);
        }, false);
        txtArea.addEventListener('keydown', function(event) {
            // console.log(event.target, event);
            if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
                document.body.removeChild(txtArea);
            }
        }, false);
        txtArea.addEventListener('keypress', function(event) {
            // event.preventDefault();
        }, false);
        document.body.appendChild(txtArea);
        txtArea.readOnly = true;
        txtArea.focus();
    };
    window.addEventListener('keydown', function(event) {
        // console.log(event.srcElement, event.currentTarget, event);
        if ((event.key === 'F1' || event.keyIdentifier === 'F1') && event.ctrlKey && !event.shiftKey) {
            reportCodeMirrorInfo();
        }
    }, false);
})();
