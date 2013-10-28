// snippet LogMouseOverElement.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.352Z
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
