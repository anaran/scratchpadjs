// snippet backup2timelog.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.355Z
// TODO Specialized for my pcopy backup script,
// but works for date-time on first line, followed by any number of linnes,
//  optionally ended by another date-time.
//  Multiple newlines, possibly preceeded by space characters are collapsed
// into one newline.
function timelogGetDate(d) {
    var timeString = d.getFullYear();
    var month = d.getMonth() + 1;
    timeString += '/' + ((month < 10) ? '0' + month : month);
    //$NON-NLS-0$ //$NON-NLS-1$
    //	TODO getDay() returns the day of week,
    //	see http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.5.16
    var day = d.getDate();
    timeString += '/' + ((day < 10) ? '0' + day : day);
    //$NON-NLS-0$ //$NON-NLS-1$
    var hours = d.getHours();
    timeString += ' ' + ((hours < 10) ? '0' + hours : hours);
    //$NON-NLS-0$ //$NON-NLS-1$
    var minutes = d.getMinutes();
    timeString += ':' + ((minutes < 10) ? '0' + minutes : minutes);
    //$NON-NLS-0$
    var seconds = d.getSeconds();
    timeString += ':' + ((seconds < 10) ? '0' + seconds : seconds);
    //$NON-NLS-0$
    return timeString;
}
var pre = document.body && document.body.querySelector('pre');
var text = getSelection() && getSelection().toString() || pre && pre.textContent || document.querySelector('textarea').value;
text = document.URL + '\n' + document.title + '\n' + text;
// TODO This might be needed in Firefox Aurora to get newline and space into textContent
// document.body.firstChild.textContent = document.body.firstChild.innerHTML.replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
// Firefox nightly might even have more issues.
var activity = text.replace(/.[\b]/g, '') .replace(/( *\n)+/g, '\n');
activity = activity.replace(/(.+MB \((\d+) .+\n)(.+MB \(\2 .+\n)+/g, '$1more lines with same transfer rate...\n');
var lines = activity.split('\n');
// var ci = (new Date(Date.parse(lines.splice(0, 3).join(' '))));
var ci,
ciString;
for (var i = 0, len = 10; i < len; i++) {
    ci = new Date(Date.parse(lines[i].replace(/Script started on /i, '')));
    if (!isNaN(ci.getTime())) {
        ciString = timelogGetDate(ci);
        break;
    }
}
if (isNaN(ci.getTime())) {
    ci = new Date();
    console.warn('could not parse start date-time, defaulting to now (%s)', ci);
    ciString = prompt('Adjust defaulted time for ' + lines.slice(0, 9) .join('\n') + (lines.length > 4 ? '\n...' : ''), timelogGetDate(ci));
}
// var co = (new Date(Date.parse(lines.splice(lines.length - 3, 3).join(' '))));

var co,
coString;
for (var last = lines.length - 1, i = last; i > last - 11; i--) {
    co = new Date(Date.parse(lines[i].replace(/Script done on /i, '')));
    if (!isNaN(co.getTime())) {
        coString = timelogGetDate(co);
        break;
    }
}
if (isNaN(co.getTime())) {
    coString = ciString;
    console.warn('could not parse end date-time, defaulting to start date-time');
}
console.log('i %s %s\no %s\n', ciString, JSON.stringify(activity), coString);
// Text is awkwrad to select in Firefox nightly (drag across all of it, then copy with Ctrl+C (no menu available))
window.alert('i '+ciString+' '+JSON.stringify(activity)+'\no '+coString+'\n\nEND\n\n');
