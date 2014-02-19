/* jslint browser: true */
/*global console: false*/
"use strict"; //$NON-NLS-0$
var replaceInActiveElement = function(regexp, replacement, element) {
    var ae = element || document.activeElement;
    if (regexp === undefined) {
        var str = window.prompt('Search RegExp (please escape .+*(){}[]? with \\', 'e.g. [\\w+\\d]'); //$NON-NLS-0$
        var captureGroups = str.match(/^\/?(.+?)(?:\/([gim]*))?$/);
        var regexp = new RegExp(captureGroups[1], captureGroups[2]);
    }
    if (replacement === undefined) {
        replacement = window.prompt('Replacement String with substitutions $1,$&,$`,$', 'e.g. $&'); //$NON-NLS-1$ //$NON-NLS-0$
    }
    if (ae) {
        if (ae.value) {
            ae.value = ae.value.replace(regexp, replacement);
        }
        if (ae.textContent) {
            ae.textContent = ae.textContent.replace(regexp, replacement);
        }
    }
};

    function usage() {
        // Replace globally in currently active Element:
        replaceInActiveElement(/apa\.selfhost\.eu/g, 'my.own.server'); //$NON-NLS-0$
        // Replace interactively, prompting for regexp and replacement:
        replaceInActiveElement();
    }

console.info(usage.toString());