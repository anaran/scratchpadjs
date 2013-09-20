 // Keyboard Event Experiments
(function() {
    if (false) {
        //     console.trace();
        // debugger;
        // window.CodeMirror might be available in this iframe after I added following line to HMTL.
        // script src='http://jsfiddle.net/js/codemirror/lib/codemirror.js?StillNoSpring'
        // console.log(JSON.stringify(window.CodeMirror.keyMap[window.CodeMirror.defaults.keyMap]).replace(/,/g, "\n"));
        // window.addEventListener("keypress", doKeyPress, false);
        window.addEventListener("keydown", doKeyDown, false);
        reportKeyInfo = function(e) {
            if (e.keyIdentifier === "F2" && e.shiftKey && e.ctrlKey && e.type === "keydown") {
                var dflt = window.CodeMirror.defaults.keyMap;
                var fallthrough = window.CodeMirror.keyMap[window.CodeMirror.defaults.keyMap].fallthrough;
                var helpWindow = window.open("data:application/json," + 
                JSON.stringify(window.CodeMirror.keyMap[dflt]).replace(/([[{,])/g, "$1%0a"), 
                'jsonFrame1', 
                'modal,resizeable,top=100, left=100, height=500, width=470,personalbar=yes,menubar=yes,titlebar=yes,status=yes,location=yes');
                console.dir(helpWindow);
                var helpWindow2 = window.open("data:application/json," + 
                JSON.stringify(window.CodeMirror.keyMap[fallthrough]).replace(/([[{,])/g, "$1%0a"), 
                'jsonFrame2', 
                'modal,resizeable,top=100, left=100, height=450, width=470');
                var helpWindow3 = window.open("data:text/html,<pre>" + 
                encodeURIComponent(JSON.stringify(window.CodeMirror.keyMap, null, 4)) + '</pre>', 
                'jsonFrame3', 
                'resizeable,top=100,left=100,height=600,width=470');
            // .title = "CodeMirror Key Bindings"
            }
        }
        function doKeyDown(e) {
            reportKeyInfo(e);
            return true;
        }
    } else {
        window.open("data:text/html,<pre>" + 
        encodeURIComponent(JSON.stringify(window.CodeMirror.keyMap, null, 4)) + '</pre>', 
        'jsonFrame3', 
        'resizeable,top=100,left=100,height=600,width=470');
    
    }
})();
