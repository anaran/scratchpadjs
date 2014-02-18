// snippet WindowOpen.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.353Z
// See https://developer.mozilla.org/en-US/docs/Web/API/window.open
// Try this from a New Tab so that popups are not blocked by the browser.
/* jslint browser: true */
/*global console: false*/
    'use strict';
(function() {
    try {
        var formatDateTime = function(d, TZD) {
            // TODO See also http://www.w3.org/TR/NOTE-datetime
            var timeString = d.getFullYear();
            var month = d.getMonth() + 1;
            // TODO getDay() returns the day of week,
            // see http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.5.16
            var day = d.getDate();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if (TZD) {
                var timeZoneOffset = -d.getTimezoneOffset();
                var offsetMinutes = timeZoneOffset % 60;
                var offsetHours = (timeZoneOffset - offsetMinutes) / 60;
                timeString += '-' + ((month < 10) ? '0' + month : month);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += '-' + ((day < 10) ? '0' + day : day);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += 'T' + ((hours < 10) ? '0' + hours : hours);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += ':' + ((minutes < 10) ? '0' + minutes : minutes);
                //$NON-NLS-0$
                timeString += ':' + ((seconds < 10) ? '0' + seconds : seconds);
                //$NON-NLS-0$
                timeString += (offsetHours > 0 ? '+' : '') + ((offsetHours < 10) ? '0' + offsetHours : offsetHours) + ((offsetMinutes < 10) ? '0' + offsetMinutes : offsetMinutes);
                //$NON-NLS-0$ //$NON-NLS-2$ //$NON-NLS-1$
            } else {
                timeString += '/' + ((month < 10) ? '0' + month : month);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += '/' + ((day < 10) ? '0' + day : day);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += ' ' + ((hours < 10) ? '0' + hours : hours);
                //$NON-NLS-0$ //$NON-NLS-1$
                timeString += ':' + ((minutes < 10) ? '0' + minutes : minutes);
                //$NON-NLS-0$
                timeString += ':' + ((seconds < 10) ? '0' + seconds : seconds);
                //$NON-NLS-0$
            }
            return timeString;
        };
        var setupTab = function() {
            // NOTE Remove third argument to open tab instead of popup window.
            // NOTE location=no,titlebar=0 have no effect in chrome or firefox around 2014-02-11.
            // var w = window.open('', '');
            var w = window.open('', '', 'width=230,height=280,top=10,left=10');
            w.document.title = (new Error()).stack.split('\n')[1].trim();
            var clock = w.document.body.appendChild(document.createElement('pre'));
            var clockStyle2 = w.document.body.appendChild(document.createElement('pre'));
            var clockStyle3 = w.document.body.appendChild(document.createElement('pre'));
            var addTouchable = function() {
                var offset = w.document.body.appendChild(document.createElement('pre'));
                offset.contentEditable = false;
                offset.textContent = '0';
                offset.style.display = 'inline-block';
                offset.style.textAlign = 'end';
                offset.style.width = '2em';
                offset.style.fontFamily = 'monospace';
                offset.style.border = 'solid 2px';
                (function() {
                    var prevX,
                    prevY,
                    deltaX,
                    deltaY,
                    deltaSum;
                    prevX = prevY = deltaX = deltaY = deltaSum = 0;
                    offset.addEventListener('dragstart', function(event) {
                        deltaSum = Number(offset.textContent);
                    }, false);
                    offset.addEventListener('mouseenter', function(event) {
                        console.log(event.target);
                        var s = getSelection();
                        s.removeAllRanges();
                        var r = document.createRange();
                        r.selectNodeContents(offset);
                        s.addRange(r);
                    }, false);
                    offset.addEventListener('dragend', function(event) {
                        offset.style.backgroundColor = 'white';
                    }, false);
                    offset.addEventListener('drag', function(event) {
                        //             console.log(event.x, event.y);
                        //             console.log(event);
                        deltaY = event.y - prevY;
                        deltaX = event.x - prevX;
                        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                            if (Math.abs(deltaX) * 2 > Math.abs(deltaY)) {
                                //     Slow mode
                                offset.style.backgroundColor = 'lightcyan';
                                deltaSum += deltaX / 8;
                                deltaSum += 0.1;
                                offset.textContent = Math.round(deltaSum);
                            }
                            if (Math.abs(deltaY) * 2 > Math.abs(deltaX)) {
                                //     Fast mode
                                offset.style.backgroundColor = 'lightpink';
                                deltaSum += deltaY;
                                deltaSum += 0.1;
                                // TODO Please note toFixed() also produces -0 values.
                                offset.textContent = Math.round(deltaSum);
                            }
                        }
                        console.log(deltaX, deltaY, offset.textContent);
                        prevX = event.x;
                        prevY = event.y;
                    }, false);
                })();
            };
            addTouchable();
            addTouchable();
            addTouchable();
            addTouchable();
            addTouchable();
            addTouchable();
            addTouchable();
            var clockTimerId;
            var pad = function(value, padChar, length) {
                var stringValue = Number(value).toString(10);
                for (var i = 0, padLength = length - stringValue.length; i < padLength; i++) {
                    stringValue = padChar + stringValue;
                }
                return stringValue;
            };
            var size = w.document.body.appendChild(document.createElement('pre'));
            size.title = 'outerWidth * outerHeight @ screenX, screenY of original window';
            size.textContent = pad(window.outerWidth, ' ', 4) + '*' + pad(window.outerHeight, ' ', 4) + '@' + pad(window.screenX, ' ', 4) + ',' + pad(window.screenY, ' ', 4);
            var screen = w.document.body.appendChild(document.createElement('pre'));
            screen.title = 'availWidth * availHeight @ availLeft * availTop of screen';
            screen.textContent = pad(window.screen.availWidth, ' ', 4) + '*' + pad(window.screen.availHeight, ' ', 4) + '@' + pad(window.screen.availLeft, ' ', 4) + '*' + pad(window.screen.availTop, ' ', 4);
            var popup = w.document.body.appendChild(document.createElement('pre'));
            popup.title = 'outerWidth * outerHeight @ screenX, screenY of Clock & Window Size Tracker Tab';
            popup.textContent = pad(w.outerWidth, ' ', 4) + '*' + pad(w.outerHeight, ' ', 4) + '@' + pad(w.screenX, ' ', 4) + ',' + pad(w.screenY, ' ', 4);
            var timerID;
            popup.addEventListener('click', function(event) {
                if (timerID) {
                    w.clearInterval(timerID);
                    timerID = undefined;
                    console.log('cancelTimer');
                } else {
                    timerID = w.setInterval(function() {
                        size.textContent = pad(window.outerWidth, ' ', 4) + '*' + pad(window.outerHeight, ' ', 4) + '@' + pad(window.screenX, ' ', 4) + ',' + pad(window.screenY, ' ', 4);
                        popup.textContent = pad(w.outerWidth, ' ', 4) + '*' + pad(w.outerHeight, ' ', 4) + '@' + pad(w.screenX, ' ', 4) + ',' + pad(w.screenY, ' ', 4);
                    }, 100);
                }
            }, false);
            //             popup.addEventListener('click', function (event) {
            //                 //                     window.alert('focus');
            //             }, false);
            var setClockValues = function() {
                var d = new Date;
                // TODO Here is a sample of date-time formats provided:
                // 2013-09-22T14:42:56.878Z
                // 2013/09/22 16:42:56
                // 2013-09-22T16:42:56+0200
                clock.textContent = d.toJSON();
                clockStyle2.textContent = formatDateTime(d);
                clockStyle3.textContent = formatDateTime(d, true);
            };
            var startClock = function() {
                setClockValues();
                clockTimerId = w.setInterval(setClockValues, 1000);
            };
            var toggleClock = function(event) {
                if (clockTimerId) {
                    clockTimerId = w.clearInterval(clockTimerId);
                    var selection = w.getSelection();
                    selection.removeAllRanges();
                    var range = document.createRange();
                    range.selectNodeContents(event.target);
                    // Collapse range to end, i.e. toStart argument is false.
                    // range.collapse(false);
                    // Always add the range to restore focus.
                    selection.addRange(range);
                } else {
                    startClock();
                }
            };
            startClock();
            clock.addEventListener('click', toggleClock, false);
            clockStyle2.addEventListener('click', toggleClock, false);
            clockStyle3.addEventListener('click', toggleClock, false);
            console.log((new Error()).stack.split('\n')[1].trim());
        };
        // Minimum is around 148 x 66 due to title, minimize, maximize, close buttons, locationbar
        // canary chrome does not seem to accept any of the Toolbar and chrome features
        // var w = window.open("", "", "width=150,height=100,top=0,left=0,location=0,menubar=0,resizable=0,status=0");
        //         var w = window.open("", "", "width=220,height=200,top=10,left=10");

        var div = document.createElement('div');
        var aYes = document.createElement('a');
        aYes.textContent = 'Clock & Window Size Tracker';
        aYes.addEventListener('click', function(event) {
            setupTab();
            document.body.removeChild(event.target.parentElement.parentElement);
        });
        div.appendChild(document.createElement('div').appendChild(aYes).parentElement);
        var aNo = document.createElement('a');
        aNo.textContent = 'Cancel';
        aNo.addEventListener('click', function(event) {
            document.body.removeChild(event.target.parentElement.parentElement);
        });
        div.appendChild(document.createElement('div').appendChild(aNo).parentElement);
        // FIXME This still opens a popup, not a tab!
        // a.click();
        div.setAttribute('style', 'position: fixed; top:50%; left: 50%; border: 0.2em solid silver; background: white;');
        document.body.appendChild(div);
        console.log(window.location.href);
        console.log(document.URL);
        console.log(document.hasFocus());
        console.log(window.activeElement);
        console.log(document.activeElement);
        //        if (!document.hasFocus()) {
        //            window.alert("This window needs your attention\nsee Clock & Window Size Tracker");
        //        }
        // console.log(window.hasFocus());
        console.log(document.defaultView.location.href);
        // This confirmer also opens a popup, not a tab!
        //         if (window.confirm("Start Clock & Window Size Tracker?")) {
        //             setupTab();
        //         }
    } catch (exception) {
        window.alert(exception.message + '\n' + exception.stack);
        console.error(exception.message + '\n' + exception.stack);
    }
})();
if (false) {
    window.open('data:application/json,' + JSON.stringify(window.screen).replace(/([[{,])/g, '$1%0a'),
    //     'jsonFrame',
    'window' + Date.now(), 'resizeable=0,top=100, left=100, height=' + window.screen.availHeight / 2 + ',width=' + window.screen.availWidth / 2 + ',status=1');
    window.open('data:application/json,' + JSON.stringify(window.screen).replace(/([[{,])/g, '$1%0a'), 'window' + Date.now(), 'close=0,modal=1,resizable=0,top=100,left=100,height=' + window.screen.availHeight / 2 + ',scrollbars=0' + ',width=' + window.screen.availWidth / 2 + ',status=0,location=0,titlebar=1');
    window.open('data:application/json,' + JSON.stringify(location).replace(/([[{,])/g, '$1%0a'),
    //     +JSON.stringify(location, null, 4),
    'jsonFrame', 'resizeable,top=100, left=100, height=' + window.screen.availHeight / 2 + ',width=' + window.screen.availWidth / 2 + ',status=1');
    var b = document.querySelector('body');
    // FIXME!
    // console.clear();
    // <body> … </body>
    b.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var newwindow = window.open('http://www.xemacs.org', '_blank', 'width=300,height=400,top=10,left=1000,statusbar=no,locationbar=no,scrollbars=no');
    }, false);
}
