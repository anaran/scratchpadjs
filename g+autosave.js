// snippet g+autosave.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.354Z
// Broken keys in canary Aura: {}[]\~@€µ
// Broken keys on Kuckuck: <>|
(function() {
    var postDiv = document.querySelectorAll('div[g_editable]'),
        autoSaveKey = "g+autosave:" + Date.now(),
        iframes = document.getElementsByTagName("iframe");
    if (postDiv.length === 1) {
        postDiv[0].addEventListener('keypress', function(event) {
            console.dirxml(event.eventPhase);
            if (localStorage.getItem(autoSaveKey) == null
                || localStorage.getItem(autoSaveKey).length < postDiv[0].innerText.length
                || window.confirm("text shrunk from " + localStorage.getItem(autoSaveKey).length
                    + " to " + postDiv[0].innerText.length + " characters"
                    + "\n\nOverwrite autosave\n\n'" + localStorage.getItem(autoSaveKey) + "'\n\n with new, shorter content?")) {
                localStorage.setItem(autoSaveKey, postDiv[0].innerText);
            }
        }, false);
    }
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        if (iframe.src.match('https://plus.google.com/u/0/_/notifications/')) {
            console.dirxml(iframe);
//             window.open(iframe.src, "send in the clowns");
                window.alert('cannot provide autosave feature inside Google+ notifications.\n\nPlease use "View Post" link at bottom of notifications.')
//             if (window.confirm('cannot provide autosave feature inside Google+ notifications.\n\nView Post in new tab now?')) {
//                 window.open('URL', 'Edit with g+autosave');
//             }
        }
//         if (iframe.src.match("^https?://") === null && iframe.contentDocument) { //$NON-NLS-0$
//             console.dir(iframe.ownerDocument); //$NON-NLS-0$
//             console.dirxml(iframe.ownerDocument.querySelectorAll('div[g_editable]'));
//         } else if (iframe.src.match("^https?://") === null && iframe.contentWindow) { //$NON-NLS-0$
//             console.dir(iframe.contentWindow); //$NON-NLS-0$
//             console.dirxml(iframe.ownerWindow.querySelectorAll('div[g_editable]'));
//         }
    }
})();
