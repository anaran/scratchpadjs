// snippet commenting_bug.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1688.0 Safari/537.36
// at 2013-11-02T18:50:31.497Z
// This comment can be toggled fine with Ctrl+'
// This comment can be toggled fine with Ctrl+'
// console.log("This comment can be toggled fine with Ctrl+'");
// console.log("This comment can be toggled fine with Ctrl+'");
console.log("// This string gets mistaken for a comment and loses all sets of // when toggled fine with Ctrl+'");
console.log("// This string gets mistaken for a comment and loses all sets of // when toggled fine with Ctrl+'");
var str = 'a // b' + " and c // d (they are all parallel.";
var str = 'a // b' + " and c // d (they are all parallel.";
