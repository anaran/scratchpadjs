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
        var LOG = true;
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
            var w = window.open('', '');
            // var w = window.open('', '', 'width=230,height=280,top=10,left=10');
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
                    offset.draggable = true;
                    true && offset.addEventListener('touchstart', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        LOG && console.log(event.type, event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY);
                        prevX = event.touches[event.touches.length - 1].clientX;
                        prevY = event.touches[event.touches.length - 1].clientY;
                        // event.dataTransfer.effectAllowed = "all";
                        // event.dataTransfer.setData('text/plain', 'This text may be dragged');                        deltaSum = Number(offset.textContent);
                    }, false);
                    true && offset.addEventListener('click', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        LOG && console.log(event.type, event.touches ? event.touches[event.touches.length - 1].clientX : event.clientX, event.touches ? event.touches[event.touches.length - 1].clientY : event.clientY);
                        LOG && console.log(event);
                        // NOTE: Cannot distinguish between mouse click with and without mouse move.
                        // Therefor we only reset value for single click on touch device.
                        if (! "touches" in event) {
                        offset.style.backgroundColor = 'white';
                        offset.textContent = '0';
                        }
                        // prevX = event.touches[event.touches.length - 1].clientX;
                        // prevY = event.touches[event.touches.length - 1].clientY;
                        // event.dataTransfer.effectAllowed = "all";
                        // event.dataTransfer.setData('text/plain', 'This text may be dragged');                        deltaSum = Number(offset.textContent);
                    }, false);
                    // NOTE: We use double click to reset value for mouse clicks to be sure there was no associated mouse move.
                    true && offset.addEventListener('dblclick', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        LOG && console.log(event.type, event.touches ? event.touches[event.touches.length - 1].clientX : event.clientX, event.touches ? event.touches[event.touches.length - 1].clientY : event.clientY);
                        LOG && console.log(event);
                        offset.style.backgroundColor = 'white';
                        offset.textContent = '0';
                        // prevX = event.touches[event.touches.length - 1].clientX;
                        // prevY = event.touches[event.touches.length - 1].clientY;
                        // event.dataTransfer.effectAllowed = "all";
                        // event.dataTransfer.setData('text/plain', 'This text may be dragged');                        deltaSum = Number(offset.textContent);
                    }, false);
                    false && offset.addEventListener('mouseenter', function(event) {
                        LOG && console.log(event.type, event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY);
                        LOG && console.log(event.target);
                        var s = getSelection();
                        s.removeAllRanges();
                        var r = document.createRange();
                        r.selectNodeContents(offset);
                        s.addRange(r);
                    }, false);
                    false && offset.addEventListener('mouseenter', function(event) {
                        event.preventDefault();
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event.target);
                    }, false);
                    false && offset.addEventListener('mouseleave', function(event) {
                        event.preventDefault();
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event.target);
                    }, false);
                    true && offset.addEventListener('mousemove', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (event.buttons == 0) {
                        prevX = event.clientX;
                        prevY = event.clientY;
                        }
                        if (event.buttons == 1) {
                        deltaX = event.clientX - prevX;
                        deltaY = prevY - event.clientY;
                        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                            if (Math.abs(deltaX) * 2 > Math.abs(deltaY)) {
                                //     Slow mode
                                offset.style.backgroundColor = 'lightcyan';
                                deltaSum += deltaX / 8;
                                deltaSum += 0.1;
                                offset.textContent = Math.round(deltaSum) % 100;
                            }
                            if (Math.abs(deltaY) * 2 > Math.abs(deltaX)) {
                                //     Fast mode
                                offset.style.backgroundColor = 'lightpink';
                                deltaSum += deltaY;
                                deltaSum += 0.1;
                                // TODO Please note toFixed() also produces -0 values.
                                offset.textContent = Math.round(deltaSum) % 100;
                            }
                        }
                        LOG && console.log(deltaX, deltaY, offset.textContent);
                        prevX = event.clientX;
                        prevY = event.clientY;
                    }
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event);
                        LOG && console.log(event.buttons);
                    }, false);
                    // NOTE: Only fires when another element is dragged into this one.
                    false && offset.addEventListener('dragenter', function(event) {
                        // event.preventDefault();
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event.target);
                    }, false);
                    // NOTE: Only fires when another element is dragged into this one.
                    false && offset.addEventListener('dragover', function(event) {
                        // event.preventDefault();
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event.target);
                    }, false);
                    // NOTE: No dragover events are triggered for the element receiving dragstart.
                    false && offset.addEventListener('dragstart', function(event) {
                        // event.preventDefault();
                        event.dataTransfer.effectAllowed = "all";
                        LOG && console.log(event.type, event.clientX, event.clientY);
                        LOG && console.log(event.target);
                    }, false);
                    false && offset.addEventListener('touchend', function(event) {
                        LOG && console.log(event.type, event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY);
                        offset.style.backgroundColor = 'white';
                    }, false);
                    true && offset.addEventListener('touchmove', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        LOG && console.log(event.type, event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY, event.x, event.y);
                        LOG && console.log(event);
                        deltaX = event.touches[event.touches.length - 1].clientX - prevX;
                        deltaY = prevY - event.touches[event.touches.length - 1].clientY;
                        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
                            if (Math.abs(deltaX) * 2 > Math.abs(deltaY)) {
                                //     Slow mode
                                offset.style.backgroundColor = 'lightcyan';
                                deltaSum += deltaX / 8;
                                deltaSum += 0.1;
                                offset.textContent = Math.round(deltaSum) % 100;
                            }
                            if (Math.abs(deltaY) * 2 > Math.abs(deltaX)) {
                                //     Fast mode
                                offset.style.backgroundColor = 'lightpink';
                                deltaSum += deltaY;
                                deltaSum += 0.1;
                                // TODO Please note toFixed() also produces -0 values.
                                offset.textContent = Math.round(deltaSum) % 100;
                            }
                        }
                        LOG && console.log(deltaX, deltaY, offset.textContent);
                        prevX = event.touches[event.touches.length - 1].clientX;
                        prevY = event.touches[event.touches.length - 1].clientY;
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
                    LOG && console.log('cancelTimer');
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
            LOG && console.log((new Error()).stack.split('\n')[1].trim());
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
        div.setAttribute('style', 'position: fixed; border: 0.2em solid silver; background: white;');
        document.body.appendChild(div);
        div.style.top = (((window.innerHeight - div.offsetHeight) / 2) + 'px');
        div.style.left = (((window.innerWidth - div.offsetWidth) / 2) + 'px');
        console.log(div.style);
        LOG && console.log(window.location.href);
        LOG && console.log(document.URL);
        LOG && console.log(document.hasFocus());
        LOG && console.log(window.activeElement);
        LOG && console.log(document.activeElement);
        //        if (!document.hasFocus()) {
        //            window.alert("This window needs your attention\nsee Clock & Window Size Tracker");
        //        }
        // LOG && console.log(window.hasFocus());
        LOG && console.log(document.defaultView.location.href);
        // This confirmer also opens a popup, not a tab!
        //         if (window.confirm("Start Clock & Window Size Tracker?")) {
        //             setupTab();
        //         }
    } catch (exception) {
        window.alert(exception.message + '\n' + exception.stack);
        LOG && console.error(exception.message + '\n' + exception.stack);
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
    // LOG && console.clear();
    // <body> … </body>
    b.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var newwindow = window.open('http://www.xemacs.org', '_blank', 'width=300,height=400,top=10,left=1000,statusbar=no,locationbar=no,scrollbars=no');
    }, false);
}
