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
