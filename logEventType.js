// snippet logEventType.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.353Z
function logEventType(type) {
    var name;
    this.enabled = false;
    this.listener = function listener(event) {
        console.count(name);
        console.log(event.srcElement.localName
                    + (event.srcElement.id ? '#' + event.srcElement.id : "")
        + (event.srcElement.className.length ? '.' + event.srcElement.className.replace(/ /g, '.') : ""));
        console.dir(event);
    };
    name = 'logEventType.listener.'+type;
    this.enable = function enable() {
        if (!this.enabled) {
            window.addEventListener(type, this.listener, false);
            this.enabled = true;
        }
    }
    this.disable = function disable() {
        if (this.enabled) {
            // useCapture argument value must match that in addEventListener.
            window.removeEventListener(type, this.listener, false);
            this.enabled = false;
        }
    }
}
