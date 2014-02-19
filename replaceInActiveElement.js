/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
let replaceInActiveElement = function (search_re, flags, replacement) {
    var ae = document.activeElement;
    if (!search_re) {
        search_re = window.prompt('Search RegExp (please escape \\.\\+\\*\\(\\)\\? etc.', 'e.g. [\\w+\\d]');
    }
    if (!flags) {
        flags = window.prompt('Flags', 'e.g. [gi] for global, igoring letter case');
    }
    if (!replacement) {
        replacement = window.prompt('Replacement String', 'e.g. [$1] for first matched group');
    }
    if (ae) {
        if (ae.value) {
            ae.value = ae.value.replace(new RegExp(search_re, flags), replacement);
        }
        if (ae.textContent) {
            ae.textContent = ae.textContent.replace(new RegExp(search_re, flags), replacement);
        }
    }
}
// replaceInActiveElement('apa\\.selfhost\\.eu', 'g', 'my.own.server');
replaceInActiveElement();
