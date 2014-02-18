// snippet generate_password.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.351Z
/* jslint browser: true */
/*global console: false*/
"use strict"; //$NON-NLS-0$
var Passwd = function(length, classes) {
    do {
        var passwd = "",
            classTypes = {}, classCount = 0,
            len = length || Math.round(Math.random() * 5 + 8),
            clsss = classes || ['digit', 'lower', 'punct', 'upper'],
            cnt = clsss.length,
            classIndex, charIndex,
            chars = {
                'punct': "~!@#$%^&*()_+=-|\\}]{[\"':;?/>.<,",
                    'digit': "0123456789",
                    'lower': "abcdefghijklmnopqrstuvwxyz",
                    'upper': "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            };
        // console.log("clsss = " + clsss);
        while (passwd.length < len) {
            classIndex = Math.floor(Math.random() * cnt);
            classTypes[clsss[classIndex]] = true;
            charIndex = Math.floor(Math.random() * chars[clsss[classIndex]].length);
            passwd += chars[clsss[classIndex]].charAt(charIndex);
        }
        // console.log(JSON.stringify(classTypes));
        classCount = Object.keys(classTypes).length;
        // console.log("classCount = " + classCount);
        // console.log("passwd.length = " + passwd.length);
    } while (classCount < cnt);
    if (window.confirm('See generated password now?')) {
        window.prompt("See http://xkcd.com/936/ for better passwords.\n\nGenerated password has " + passwd.length + ' characters covering types ' + Object.keys(classTypes).sort() + '\n', passwd);
    }
};
if (true) {
    Passwd();
}
