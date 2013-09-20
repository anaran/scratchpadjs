 // See https://developer.mozilla.org/en-US/docs/Web/API/window.open
// Try this from a New Tab so that popups are not blocked by the browser.
(function() {
    try {
        // Minimum is around 148 x 66 due to title, minimize, maximize, close buttons, locationbar
        // canary chrome does not seem to accept any of the Toolbar and chrome features
        // var w = window.open("", "", "width=150,height=100,top=0,left=0,location=0,menubar=0,resizable=0,status=0");
        var w = window.open("", "", "width=180,height=100,top=0,left=0");
        var size = w.document.body.appendChild(document.createElement('pre'));
        var screen = w.document.body.appendChild(document.createElement('pre'));
        var popup = w.document.body.appendChild(document.createElement('pre'));
        var pad = function(value, padChar, length) {
            var stringValue = Number(value).toString(10);
            for (var i = 0, padLength = length - stringValue.length; i < padLength; i++) {
                stringValue = padChar + stringValue;
            }
            return stringValue;
        };
        window.addEventListener('resize', function(event) {
            size.innerText = pad(window.outerWidth, ' ', 4) + '*' + pad(window.outerHeight, ' ', 4) + '@' + pad(window.screenX, ' ', 4) +','+ pad(window.screenY, ' ', 4);
        }, false);
        window.addEventListener('keypress', function(event) {
            screen.innerText = pad(window.screen.availWidth, ' ', 4) + '*' + pad(window.screen.availHeight, ' ', 4) + '@' + pad(window.screen.availLeft, ' ', 4) + '*' + pad(window.screen.availTop, ' ', 4);
            size.innerText = pad(window.outerWidth, ' ', 4) + '*' + pad(window.outerHeight, ' ', 4) + '@' + pad(window.screenX, ' ', 4) +','+ pad(window.screenY, ' ', 4);
            popup.innerText = pad(w.outerWidth, ' ', 4) + '*' + pad(w.outerHeight, ' ', 4) + '@' + pad(w.screenX, ' ', 4) +','+ pad(w.screenY, ' ', 4);
        }, false);
    } catch (exception) {
        window.alert(exception.stack);
    }
})();

window.open('data:application/json,' 
+ JSON.stringify(window.screen).replace(/([[{,])/g, "$1%0a"), 
//     'jsonFrame',
'window' + Date.now(), 
'resizeable=0,top=100, left=100, height=' + window.screen.availHeight / 2 
+ ',width=' + window.screen.availWidth / 2 + ',status=1');

window.open('data:application/json,' 
+ JSON.stringify(window.screen).replace(/([[{,])/g, "$1%0a"), 
'window' + Date.now(), 
'close=0,modal=1,resizable=0,top=100,left=100,height=' 
+ window.screen.availHeight / 2 + ',scrollbars=0' 
+ ',width=' + window.screen.availWidth / 2 + ',status=0,location=0,titlebar=1');

window.open('data:application/json,' 
+ JSON.stringify(location).replace(/([[{,])/g, "$1%0a"), 
//     +JSON.stringify(location, null, 4),
'jsonFrame', 
'resizeable,top=100, left=100, height=' + window.screen.availHeight / 2 
+ ',width=' + window.screen.availWidth / 2 + ',status=1');

b = document.querySelector('body');
// FIXME!
// console.clear();
// <body>​…​</body>​
b.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    newwindow = window.open("http://www.xemacs.org", "_blank", "width=300,height=400,top=10,left=1000,statusbar=no,locationbar=no,scrollbars=no");
}, false);
