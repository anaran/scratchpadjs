// snippet JSLintErrors.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.352Z
/*jslint browser: true, devel: true, todo: true */
/*global  JSLINT */
(function() {
    'use strict'; //$NON-NLS-0$
    var citeError = document.querySelectorAll('#JSLINT_ERRORS>div>cite'), //$NON-NLS-0$
        ta = document.querySelector('#JSLINT_SOURCE>textarea'), //$NON-NLS-0$
        sourceLines = ta.value.split(/\n/),
        getOffsetFromLineChar = function(line, char) {
            var line0 = line - 1,
                char0 = char - 1,
                offset = 0,
                i;
            for (i = 0; i < line0; i += 1) {
                offset += sourceLines[i].length + 1;
            }
            offset += char0;
            return offset;
        },
        makeErrorSelector = function(i) {
            var err = JSLINT.errors[i],
                offset = getOffsetFromLineChar(err.line, err.character),
                closeToBottom = err.line - ta.rows;
            // TODO Please note this event listener does not need the event argument.
            return function() {
                // TODO Please note this calculation needs to be adjusted for 1-based line numbers.
                var firstVisibleLine = Math.ceil(ta.scrollTop * ta.rows / ta.clientHeight) + 1;
                ta.setSelectionRange(offset, offset);
                // ta.setSelectionRange(offset, offset+1);
                if (err.line < firstVisibleLine) {
                    ta.scrollTop = 0;
                    if (err.line > ta.rows) {
                        ta.scrollByLines(closeToBottom);
                    }
                }
                if (err.line > firstVisibleLine + ta.rows) {
                    ta.scrollTop = 0;
                    ta.scrollByLines(closeToBottom);
                }
            };
        },
        i;
    for (i = 0; i < citeError.length; i += 1) {
        citeError[i].addEventListener('click', makeErrorSelector(i), false); //$NON-NLS-0$
    }
}());