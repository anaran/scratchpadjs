/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */ (function() {
    var reportFeedbackInformation = function() {
        var copyright = document.querySelector('meta[name=copyright]'),
            keywords = document.querySelector('meta[name=keywords]'),
            description = document.querySelector('meta[name=description]'),
            author = document.querySelector('meta[name=author]'),
            generator = document.querySelector('meta[name=generator]')
            known_origins = {
                "https://developer.mozilla.org": "https://bugzilla.mozilla.org/form.doc"
            }
        var mailtos = [];
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function(value) {
            mailtos.push(value.href);
        });
        var gpluses = [];
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://plus.google.com/"]'), function(value) {
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
        txtArea.textContent = 'potential feedback information\n' + JSON.stringify(data, null, 2);
        txtArea.title = 'Trying to figure out how to provide feedback to webpage...';
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
        if ((event.key === '@' || event.keyIdentifier === '@') && event.ctrlKey && !event.shiftKey) {
            reportFeedbackInformation();
        }
    }, false);
};
})();