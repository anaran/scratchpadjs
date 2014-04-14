/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var reportFeedbackInformation = function () {
    var copyright = document.querySelector('meta[name=copyright]'),
    keywords = document.querySelector('meta[name=keywords]'),
    description = document.querySelector('meta[name=description]'),
    author = document.querySelector('meta[name=author]'),
    generator = document.querySelector('meta[name=generator]')
    known_origins = {
        "https://developer.mozilla.org": "https://bugzilla.mozilla.org/form.doc"
    }
    var mailtos = [];
    // TODO Please see http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#attribute-substrings
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (value) {
        mailtos.push(value.href);
    });
    var gpluses = [];
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://plus.google.com/"]'), function (value) {
        gpluses.push(value.href);
    });
    var data = {
        copyright: copyright && copyright.content,
        keywords: keywords && keywords.content,
        description: description && description.content,
        author: author && author.content,
        generator: generator && generator.content,
        mailtos: mailtos,
        gpluses: gpluses,
        known_origins: known_origins
    };
    window.alert('potential feedback information\n' + JSON.stringify(data, null, 2));
//     window.alert('mailto addresses\n' + JSON.stringify(mailtos, null, 2));
};
reportFeedbackInformation();
