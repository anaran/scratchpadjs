(function() {
    var acronymyDiv;
    var acronyms = [];
    if (sessionStorage['acronymy']) {
        acronyms = JSON.parse(sessionStorage.acronymy);
    }

    function isInFront(div) {
        var whoComputedStyle;
        var bcr = div.getBoundingClientRect();
        console.log(bcr, bcr.right - bcr.left, bcr.bottom - bcr.top);
        var leftTop = document.elementFromPoint(bcr.left, bcr.top);
        // TODO bottom right seems already outside element.
        var rightBottom = document.elementFromPoint(bcr.right - 1, bcr.bottom - 1);
        if (leftTop !== div && !div.contains(leftTop)) {
            whoComputedStyle = window.getComputedStyle(leftTop);
            console.info('trying to get in front of leftTop ', leftTop, whoComputedStyle.zIndex);
            //$NON-NLS-0$
            return false;
        }
        if (rightBottom !== div && !div.contains(rightBottom)) {
            whoComputedStyle = window.getComputedStyle(rightBottom);
            console.info('trying to get in front of rightBottom ', rightBottom, whoComputedStyle.zIndex);
            //$NON-NLS-0$
            return false;
        }
        console.info('we are in front at leftTop and rightBottom!');
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
                bc = window.getComputedStyle(document.body.children[i])['backgroundColor'];
                c = window.getComputedStyle(document.body.children[i])['color'];
                console.log(document.body.children[i].nodeName, bc);
                if (bc && bc !== 'transparent') {
                    acronymyDiv.style['background'] = bc;
                    acronymyDiv.style['color'] = c;
                }
            }
            acronymyDiv.textContent = 'We have ' + (acronyms.length / 2) + ' acronyms';
            acronymyDiv.title = 'Acronymy User Interface';
            importDiv = document.createElement('div');
            importLink = document.createElement('input');
            importLink.type = 'url';
            importLink.placeholder = 'import URL (acronymy or popchrom)';
            importLink.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    // window.prompt('you want to import', importLink.value);
                    var importWindow = window.open(importLink.value, '_blank');
                    importIframe.src = importLink.value;
                    importIframe.contentDocument
                    importIframe.contentDocument.load = function() {
                        //                     window.setTimeout(function() {
                        console.log('importIframe', importIframe);
                        //                     console.log('importWindow.document.URL', importWindow.document.URL);
                        //                                       }, 5000);
                    };
                    // var importDocument = importWindow && importWindow.document;
                    // console.log('importDocument', importDocument);
                    if (importWindow) {
                        importWindow.addEventListener('load', function(event) {
                            try {
                                console.log('importWindow load', event);
                                //                                 if (event.target.readyState !== "complete") {
                                //                                     return;
                                //                                 }
                                var httpRequest = new XMLHttpRequest();
                                var infoReceived = function() {
                                    var output = httpRequest.responseText;
                                    console.log(httpRequest.status);
                                    if (output.length) {
                                        sessionStorage.acronymy = output;
                                        acronyms = JSON.parse(sessionStorage.acronymy);
                                        console.log(output);
                                    }
                                };
                                // console.log('withCredentials', httpRequest.hasOwnProperty('withCredentials'));
                                httpRequest.open('GET', importLink.value, true);
                                httpRequest.withCredentials = false;
                                httpRequest.onload = infoReceived;
                                httpRequest.onerror = function() {
                                    console.log('There was an error!', httpRequest);
                                };
                                httpRequest.send(null);
                            } catch (exception) {
                                window.alert('exception.stack: ' + exception.stack);
                                console.log((new Date()).toJSON(), "exception.stack:", exception.stack);
                            }
                        }, false);
                    }
                }
            }, false);
            importDiv.appendChild(importLink);
            acronymyDiv.appendChild(importDiv);
            importIframe = document.createElement('iframe');
            acronymyDiv.appendChild(importIframe);
            document.body.appendChild(acronymyDiv);
            for (var zIndex = 1; zIndex <= 10000; zIndex *= 10) {
                if (isInFront(acronymyDiv)) {
                    break;
                }
                console.log('set zIndex to ' + zIndex);
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
            console.log('addAcronymy');
            addAcronymy();
        } else {
            console.log('removeAcronymy');
            removeAcronymy();
        }
    }, false);
})();