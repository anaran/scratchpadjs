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
