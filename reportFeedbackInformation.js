/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
(function () {
    
                    var getElementBehind = function (frontElement) {
                        var bcr = frontElement.getBoundingClientRect();
                        var displayStyle = frontElement.style.display;
                        frontElement.style.display = 'none';
                        var leftTop = document.elementFromPoint(bcr.left, bcr.top);
                        var rightBottom = document.elementFromPoint(bcr.right, bcr.bottom);
                        frontElement.style.display = displayStyle;
                        return [leftTop,
                        rightBottom];
                    };
    var reportFeedbackInformation = function () {
        var copyright = document.querySelector('meta[name=copyright]'),
        keywords = document.querySelector('meta[name=keywords]'),
        description = document.querySelector('meta[name=description]'),
        author = document.querySelector('meta[name=author]'),
        generator = document.querySelector('meta[name=generator]')
        known_origins = {
            'https://developer.mozilla.org': 'https://bugzilla.mozilla.org/form.doc'
        }
        var mailtos = [
        ];
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (value) {
            mailtos.push(value.href);
        });
        var gpluses = [
        ];
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://plus.google.com/"]'), function (value) {
            if (!/https:\/\/plus\.google\.com\/u\/0\//.test(value)) {
            gpluses.push(value.href);
            }
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
        var divInfo = document.createElement('div');
        var divInfoTextArea = document.createElement('div');
        var divInfoIconic = document.createElement('div');
        divInfoIconic.textContent = '!';
        //         divInfoIconic.display = 'block';
        var txtArea = document.createElement('textarea');
        divInfoTextArea.style['position'] = 'fixed';
        divInfoTextArea.style['bottom'] = '2em';
        divInfoTextArea.style['right'] = '2em';
        divInfoTextArea.style['zIndex'] = 10;
        //         divInfoTextArea.style['height'] = '50%';
        //         divInfoTextArea.style['width'] = '25em';
        //         divInfoTextArea.style['maxWidth'] = '50%';
        divInfoTextArea.style['overflow'] = 'auto';
        // TODO: Firefox will process the click caused by resizing and close the textarea immediately after resizing.
        // Not very useful. Resizing does not cause a click event in Google Chrome.
        divInfoTextArea.style['resize'] = 'both';
        divInfoTextArea.style['tabindex'] = '1';
        var main = document.querySelector('main');
        var p = document.querySelector('p');
        if (p) {
        divInfoTextArea.style['background'] = window.getComputedStyle(p)['backgroundColor'];
        }
        else if (main) {
        divInfoTextArea.style['background'] = window.getComputedStyle(main)['backgroundColor']
        } else {
        var topLeftBackgroundColor = window.getComputedStyle(getElementBehind(divInfoTextArea)[0]).backgroundColor;
        var bottomRightBackgroundColor = window.getComputedStyle(getElementBehind(divInfoTextArea)[1]).backgroundColor;
        divInfoTextArea.style['background'] = bottomRightBackgroundColor;
        }
        var bc;
        divInfoTextArea.style['background'] = 'white';
        divInfoTextArea.style['color'] = 'black';
        for (i = 0, ec = document.body.childElementCount; i < ec; i++) { 
            bc = window.getComputedStyle(document.body.children[i])['backgroundColor'];
            c = window.getComputedStyle(document.body.children[i])['color'];
            console.log(document.body.children[i].nodeName, bc);
            if (bc && bc !== 'transparent') {
                        divInfoTextArea.style['background'] = bc;
                        divInfoTextArea.style['color'] = c;
            }
        }
        
        //             window.getComputedStyle(document.body).color;
        /*
rgb(250, 200, 23)
*/
        /*
transparent
*/
        divInfoTextArea.textContent = 'potential feedback information\n' + JSON.stringify(data, null, 2);
        divInfoTextArea.title = 'Trying to figure out how to provide feedback to webpage...';
        // divInfoTextArea.readOnly = true;
//         window.addEventListener('resize', function (event) {
//             console.log(event.type, event);
//         }, false);
        if (mailtos.length) {
            mailtoList = document.createElement('ul');
            mailtos.forEach(function (value) {
                mailtoLink = document.createElement('a');
                mailtoLink.href = value;
                // But, alas, see https://bugzilla.mozilla.org/show_bug.cgi?id=646552
                // Use Ctrl+click workaround to open mailto link in new tab for now.
                mailtoLink.target = '_blank';
                mailtoRecipient = /^mailto:([^\?]+)\??/.exec(value)[1];
                mailtoLink.textContent = mailtoRecipient;
                mailtoList.appendChild(document.createElement('li').appendChild(mailtoLink).parentElement);
            });
            divInfoTextArea.appendChild(mailtoList);
        }
        if (known_origins[document.location.origin]) {
            siteFeedback = document.createElement('div');
                feedbackLink = document.createElement('a');
                feedbackLink.href = known_origins[document.location.origin];
                // But, alas, see https://bugzilla.mozilla.org/show_bug.cgi?id=646552
                // Use Ctrl+click workaround to open mailto link in new tab for now.
                feedbackLink.target = '_blank';
                feedbackLink.textContent = 'Known feedback form';
                siteFeedback.appendChild(feedbackLink);
            divInfoTextArea.appendChild(siteFeedback);
        }
        divInfoTextArea.addEventListener('click', function (event) {
            console.log(event.type, event);
            if (false && event.layerX < 16 && event.layerY < 16) {
            } else {
                if (divInfoTextArea.style['height'] === '2em') {
                    divInfoTextArea.style['height'] = lastHeight;
                    divInfoTextArea.style['width'] = lastWidth;
                } else {
                    lastHeight = divInfoTextArea.style['height'];
                    lastWidth = divInfoTextArea.style['width'];
                    divInfoTextArea.style['height'] = '2em';
                    divInfoTextArea.style['width'] = '2em';
                }
            }
            //             //             if (divInfoIconic.style.display === 'block') {
            //             //                 divInfoIconic.style.display = 'none';
            //             //                 divInfoTextArea.style.display = 'block';
            //             //             } else {
            //             //                 divInfoIconic.style.display = 'block';
            //             //                 divInfoTextArea.style.display = 'none';
            //             //             }
            //             // console.log(event.srcElement, event.currentTarget, event);
            //             // document.body.removeChild(txtArea);

        }, false);
        divInfoTextArea.addEventListener('keydown', function (event) {
            // console.log(event.target, event);
            if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
                document.body.removeChild(divInfo);
            }
        }, false);
        divInfoTextArea.addEventListener('keypress', function (event) {
            // console.log(event.target, event);
            if ((event.key === 'Esc') || (event.keyIdentifier === 'U+001B')) {
                document.body.removeChild(divInfo);
            }
        }, false);
        //         txtArea.addEventListener('keypress', function (event) {
        //             // event.preventDefault();
        //         }, false);
        // divInfo.appendChild(divInfoIconic);
        // divInfo.appendChild(divInfoTextArea);
        //         divInfoTextArea.style.display = 'none';
        document.body.appendChild(divInfoTextArea);
        // txtArea.focus();
    };
    //     window.addEventListener('keydown', function (event) {
    //         // console.log(event.srcElement, event.currentTarget, event);
    //         if ((event.key === '@' || event.keyIdentifier === '@') && event.ctrlKey && !event.shiftKey) {
    //         }
    //     }, false);
    if (document.body) {
    reportFeedbackInformation();
    }
}) ();
