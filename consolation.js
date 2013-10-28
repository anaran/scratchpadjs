// snippet consolation.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.354Z
try {
    console.trace();
    console.log("hi");
    console.log((new Error()).stack.split('\n')[1].trim());
//     FIXME
} catch (exception) {
    console.log(exception.stack);
}
// Originally created in Workspace folder.
// try {
//     console.trace();
//     console.log("hi");
//     // console.logCopy = console.log.bind(console);
//     console.logCopy = function(arguments) {
//         Function.prototype.call(console.log, (new Date()).toJSON(), arguments);
//         console.log(Object.getOwnPropertyDescriptor(console.__proto__, "log"));
//         console.log(Object.getOwnPropertyDescriptor(console, "logCopy"));
//     //     console.log((new Date()).toJSON(), arguments);
//     };
//     // function () {
//     // this.logCopy.apply(console, arguments);
//     // }
//     console.log("hi");
//     console.logCopy("hi");
// // FIXME
// } catch (exception) {
//     console.log(exception.stack);
// }

