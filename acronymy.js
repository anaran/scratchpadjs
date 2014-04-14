(function () {
    const findMyTargetTab = function () {
        window.alert('you were here!');
    }
    var acronymyDiv,
    statusDiv;
    var acronyms = [
    ];
    if (sessionStorage['acronymy']) {
        try {
            acronyms = JSON.parse(sessionStorage.acronymy);
        } catch (exception) {
            // window.alert('exception.stack: ' + exception.stack);
            console.log((new Date()) .toJSON(), 'exception.stack:', exception.stack);
        }
    }

    function isInFront(div) {
        var whoComputedStyle;
        var bcr = div.getBoundingClientRect();
        // console.log(bcr, bcr.right - bcr.left, bcr.bottom - bcr.top);
        var leftTop = document.elementFromPoint(bcr.left, bcr.top);
        // TODO bottom right seems already outside element.
        var rightBottom = document.elementFromPoint(bcr.right - 1, bcr.bottom - 1);
        if (leftTop !== div && !div.contains(leftTop)) {
            whoComputedStyle = window.getComputedStyle(leftTop);
            // console.info('trying to get in front of leftTop ', leftTop, whoComputedStyle.zIndex);
            //$NON-NLS-0$
            return false;
        }
        if (rightBottom !== div && !div.contains(rightBottom)) {
            whoComputedStyle = window.getComputedStyle(rightBottom);
            // console.info('trying to get in front of rightBottom ', rightBottom, whoComputedStyle.zIndex);
            //$NON-NLS-0$
            return false;
        }
        // console.info('we are in front at leftTop and rightBottom!');
        //$NON-NLS-0$

        return true;
    }
    var isElementEditable = function() {
        var activeElement = document.activeElement;
        if (activeElement.isContentEditable) {
            return activeElement;
        }
        if (activeElement.nodeName === 'INPUT') {
            return activeElement;
        }
    };
    var addAcronymy = function() {
        if (acronymyDiv) {
            acronymyDiv.style.display = 'block';
        } else {
            acronymyDiv = document.createElement('div');
            statusDiv = document.createElement('div');
            acronymyDiv.style['position'] = 'fixed';
            acronymyDiv.style['bottom'] = '2em';
            acronymyDiv.style['right'] = '2em';
            acronymyDiv.style['zIndex'] = 10;
            //         acronymyDiv.style['height'] = '50%';
            //         acronymyDiv.style['width'] = '25em';
            //         acronymyDiv.style['maxWidth'] = '50%';
            acronymyDiv.style['overflow'] = 'auto';
            acronymyDiv.style['resize'] = 'both';
            acronymyDiv.style['tabindex'] = '1';
            //         var main = document.querySelector('main');
            //         var p = document.querySelector('p');
            //         if (p) {
            //         acronymyDiv.style['background'] = window.getComputedStyle(p)['backgroundColor'];
            //         }
            //         else if (main) {
            //         acronymyDiv.style['background'] = window.getComputedStyle(main)['backgroundColor']
            //         } else {
            //         var topLeftBackgroundColor = window.getComputedStyle(getElementBehind(acronymyDiv)[0]).backgroundColor;
            //         var bottomRightBackgroundColor = window.getComputedStyle(getElementBehind(acronymyDiv)[1]).backgroundColor;
            //         acronymyDiv.style['background'] = bottomRightBackgroundColor;
            //         }
            var bc;
            acronymyDiv.style['background'] = 'white';
            acronymyDiv.style['color'] = 'black';
            for (i = 0, ec = document.body.childElementCount; i < ec; i++) {
                bc = window.getComputedStyle(document.body.children[i]) ['backgroundColor'];
                c = window.getComputedStyle(document.body.children[i]) ['color'];
                // console.log(document.body.children[i].nodeName, bc);
                if (bc && bc !== 'transparent') {
                    acronymyDiv.style['background'] = bc;
                    acronymyDiv.style['color'] = c;
                }
            }
            statusDiv.textContent = 'We have ' + (acronyms.length / 2) + ' acronyms';
            acronymyDiv.title = 'Acronymy User Interface';
            importDiv = document.createElement('div');
            importLink = document.createElement('input');
            importLink.type = 'url';
            // importLink.autocomplete = 'on';
            // importLink.autosave = 'acronymy0815';
            importLink.placeholder = 'import URL (acronymy, popchrom, MyWords)';
            let importIframe = document.createElement('iframe');
            // console.dir(importIframe);
            importLink.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    // https://apa.selfhost.eu:8443/file/adrian-OrionContent/bugzilla.eclipse.org/tmp/mywords.xml
                    // https://apa.selfhost.eu:8443/file/adrian-OrionContent/javascript/popchrom-34-2013-07-18T113703+0200.txt
                    importIframe.onload = function () {
                        // };
                        // var importDocument = importWindow && importWindow.document;
                        // console.log(event);
                        // if (importWindow) {
                        // importWindow.addEventListener('load', function (event) {
                        try {
                            // console.log('importWindow load', event);
                            //                                 if (event.target.readyState !== "complete") {
                            //                                     return;
                            //                                 }
                            var httpRequest = new XMLHttpRequest();
                            var infoReceived = function () {
                                try {
                                    // var output = httpRequest.responseText;
                                    // console.dir(httpRequest);
                                    // console.dir(httpRequest.getAllResponseHeaders());
                                    console.log(httpRequest);
                                    // console.log(httpRequest.status);
                                    if (!/\.xml$/.test(importLink.value)) {
                                        sessionStorage.acronymy = httpRequest.responseText;
                                        acronyms = JSON.parse(sessionStorage.acronymy);
                                        statusDiv.textContent = 'We have ' + (acronyms.length / 2) + ' acronyms';
                                        // console.log(output);
                                    }
                                    if (/\.xml$/.test(importLink.value)) {
                                        var xmlDoc = httpRequest.responseXML;
                                        var words = xmlDoc.getElementsByTagName('mywords') [0].getElementsByTagName('word');
                                        for (var i = 0, len = words.length; i < len; i++) {
                                            var label = words[i].getElementsByTagName('label') [0].textContent
                                            var text = words[i].getElementsByTagName('text') [0].textContent
                                            console.log(label);
                                            console.log(text);
                                            // TODO Please note abbreviation names (called label) are optional in MyWords.
                                            if (label) {
                                                acronyms.push(label);
                                            } else {
                                                acronyms.push('MyWords' + i);
                                            }
                                            // TODO Please note the empty string, as MyWords does not support arguments.
                                            acronyms.push(JSON.stringify(['',
                                            text]));
                                        }
                                        sessionStorage.acronymy = JSON.stringify(acronyms);
                                        statusDiv.textContent = 'We have ' + (acronyms.length / 2) + ' acronyms';
                                        console.dirxml(httpRequest.responseXML);
                                        // var myWords = httpRequest.responseXML.evaluate('//label', httpRequest.responseXML, null, XPathResult.ANY_TYPE, null);
                                        // sessionStorage.acronymy = httpRequest.responseText;
                                        // acronyms = JSON.parse(sessionStorage.acronymy);
                                        // console.log(myWords);
                                    }
                                } catch (exception) {
                                    // window.alert('exception.stack: ' + exception.stack);
                                    console.log((new Date()) .toJSON(), 'exception', exception);
                                }
                            };
                            // console.log('withCredentials', httpRequest.hasOwnProperty('withCredentials'));
                            httpRequest.open('GET', importLink.value, true);
                            httpRequest.withCredentials = false;
                            httpRequest.onload = infoReceived;
                            httpRequest.onerror = function () {
                                console.log('There was an error!', httpRequest);
                            };
                            httpRequest.ontimeout = function () {
                                console.log('There was a timeout!', httpRequest);
                            };
                            if (/\.xml$/.test(importLink.value)) {
                                console.log('Overriding MIME Type');
                                // httpRequest.overrideMimeType("text/xml");
                                // httpRequest.overrideMimeType('application/xml');
                                // httpRequest.overrideMimeType("text/html");
                                httpRequest.responseType = 'document';
                            }
                            httpRequest.send(null);
                        } catch (exception) {
                            window.alert('exception.stack: ' + exception.stack);
                            console.log((new Date()) .toJSON(), 'exception.stack:', exception.stack);
                        }
                        // }, false);

                    };
                    importIframe.src = importLink.value;
                }
            }, false);
            acronymyDiv.appendChild(statusDiv);
            importDiv.appendChild(importLink);
            acronymyDiv.appendChild(importDiv);
            acronymyDiv.appendChild(importIframe);
            document.body.appendChild(acronymyDiv);
            for (var zIndex = 1; zIndex <= 10000; zIndex *= 10) {
                if (isInFront(acronymyDiv)) {
                    break;
                }
                // console.log('set zIndex to ' + zIndex);

                acronymyDiv.style.zIndex = zIndex;
            }
        }
    };
    var removeAcronymy = function() {
        if (acronymyDiv) {
            acronymyDiv.style.display = 'none';
        }
    };
    window.addEventListener('click', function(event) {
        if (isElementEditable()) {
            // console.log('addAcronymy');
            addAcronymy();
        } else {
            // console.log('removeAcronymy');
            removeAcronymy();
        }
    }, false);
})();
