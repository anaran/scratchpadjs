// snippet avoidCircularStringify.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.353Z
avoidCircual = function(element) {
    return JSON.stringify(element, function(key, value) {
        if (value !== null && typeof(value) === "object" && key) {
            return value.toString();
        }
        return value;
    });
}

avoidCircual2 = function(element) {
    return JSON.stringify(element, function(key, value) {
        if (typeof(value) !== "object") {
            return value;
        } else if (key) {
            return "not printing objects: " + key;
        }
    });
}

avoidCircual3 = function(element) {
    return JSON.stringify(element, function(key, value) {
        if (!key || (value !== element)) {
            return value;
        }
    });
}

