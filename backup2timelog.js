// TODO Specialized for my pcopy backup script,
// but works for date-time on first line, followed by any number of linnes,
//  optionally ended by another date-time.
//  Multiple newlines, possibly preceeded by space characters are collapsed
// into one newline.
function timelogGetDate(d) {
    var timeString = d.getFullYear();
    var month = d.getMonth() + 1;
    timeString += "/" + ((month < 10) ? "0" + month : month); //$NON-NLS-0$ //$NON-NLS-1$
    //	TODO getDay() returns the day of week,
    //	see http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.5.16
    var day = d.getDate();
    timeString += "/" + ((day < 10) ? "0" + day : day); //$NON-NLS-0$ //$NON-NLS-1$
    var hours = d.getHours();
    timeString += " " + ((hours < 10) ? "0" + hours : hours); //$NON-NLS-0$ //$NON-NLS-1$
    var minutes = d.getMinutes();
    timeString += ":" + ((minutes < 10) ? "0" + minutes : minutes); //$NON-NLS-0$
    var seconds = d.getSeconds();
    timeString += ":" + ((seconds < 10) ? "0" + seconds : seconds); //$NON-NLS-0$
    return timeString;
}
var text = document.body.querySelector('pre').textContent;
var activity = text.replace(/.[\b]/g, '').replace(/( *\n)+/g, '\n');
activity = activity.replace(/(.+MB \((\d+) .+\n)(.+MB \(\2 .+\n)+/g, 
"$1more lines with same transfer rate...\n");
var lines = activity.split('\n');
// var ci = (new Date(Date.parse(lines.splice(0, 3).join(' '))));
var ci;
for (var i = 0, len = 3; i < len; i++) {
    ci = new Date(Date.parse(lines[i]));
    if (!isNaN(ci.getTime())) {
        break;
    }
}
if (isNaN(ci.getTime())) {
    ci = new Date();
    console.warn("could not parse start date-time, defaulting to now (%s)", ci);
}
// var co = (new Date(Date.parse(lines.splice(lines.length - 3, 3).join(' '))));
var co;
for (var len = lines.length, i = len - 3; i < len; i++) {
    co = new Date(Date.parse(lines[i]));
    if (!isNaN(co.getTime())) {
        break;
    }
}
if (isNaN(co.getTime())) {
    co = ci;
    console.warn("could not parse end date-time, defaulting to start date-time");
}
console.log("i %s %s\no %s\n",
timelogGetDate(ci),
JSON.stringify(activity),
timelogGetDate(co));
