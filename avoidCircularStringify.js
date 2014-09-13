// FIX missing space after let with Ctrl+Shift+F /\blet\B/ "let "
// snippet avoidCircularStringify.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.353Z
let avoidCircular = function (element, indent) {
  return JSON.stringify(element, function (key, value) {
    if (value !== null && typeof (value) === 'object' && key) {
      return value.toString();
    }
    return value;
  }, indent);
};
let avoidCircular2 = function (element, indent) {
  return JSON.stringify(element, function (key, value) {
    if (typeof (value) !== 'object') {
      return value;
    } else if (key) {
      return 'not printing objects: ' + key;
    }
  }, indent);
};
let avoidCircular3 = function (element, indent) {
  return JSON.stringify(element, function (key, value) {
    if (!key || (value !== element)) {
      return value;
    }
  }, indent);
};
avoidCircular(document, 2);
/*
{
  "location": "http://www.ecma-international.org/ecma-262/5.1/#sec-15.12.3"
}
*/
avoidCircular2(document, 2);
/*
undefined
*/
avoidCircular3(document, 2);
/*
{
  "location": {
    "href": "http://www.ecma-international.org/ecma-262/5.1/#sec-15.12.3",
    "origin": "http://www.ecma-international.org",
    "protocol": "http:",
    "username": "",
    "password": "",
    "host": "www.ecma-international.org",
    "hostname": "www.ecma-international.org",
    "port": "",
    "pathname": "/ecma-262/5.1/",
    "search": "",
    "searchParams": {},
    "hash": "#sec-15.12.3"
  }
}
*/
let avoidCircular4 = function (element, indent) {
  let seen = {
  };
  return JSON.stringify(element, function (key, value) {
    if (key) {
      if (seen[value[key]]) {
        return 'circularity detected!'
      } else {
        seen[value[key]] = true;
        return value[key];
      }
    } else {
      return value[key];
    }
  }, indent);
};
avoidCircular4(document, 2);
