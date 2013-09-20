try {
    console.trace();
    console.log("hi");
    FIXME
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

