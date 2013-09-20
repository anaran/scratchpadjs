function LogMouseOverElement() {
    var name;
    var getElementPath = function getElementPath(element, path) {
        if (!path) {
            path = "";
        }
//         console.trace();
        if (!element) {
            return path;
        } else {
            var elementSelector = element.localName
                        + (element.id ? '#' + element.id : "")
            + (element.className.length ? '.' + element.className.replace(/ /g, '.') : "");
            return getElementPath(element.parentElement, elementSelector + " " + path);
        }
    };
    this.enabled = false;
    this.listener = function listener(event) {
        console.count(name);
        var elementPath = getElementPath(event.srcElement);
        console.log(elementPath);
        console.log(event.srcElement);
    };
    name = 'logMouseOverElement.listener';
    this.enable = function enable() {
        if (!this.enabled) {
            window.addEventListener('mouseover', this.listener, false);
            this.enabled = true;
        }
    }
    this.disable = function disable() {
        if (this.enabled) {
            // useCapture argument value must match that in addEventListener.
            window.removeEventListener('mouseover', this.listener, false);
            this.enabled = false;
        }
    }
}
