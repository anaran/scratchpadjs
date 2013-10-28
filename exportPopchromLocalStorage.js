// Code snippet based on my work in Popchrom
//window.open(
//'data:text/html,'
//    +JSON.stringify(location).replace(/([[{,])/g, "$1%0a"),
//    'jsonFrame',
//    'resizeable,top=100, left=100, height=200, width=300,status=1')

(function downloadPopchromAbbrevs() {
    var a = document.createElement('a');
    var abbrevCount = JSON.parse(localStorage.map).length / 2;
    var d = new Date();
    var fileName = 'popchrom-' + abbrevCount + '-'; //$NON-NLS-1$ //$NON-NLS-0$
    fileName += d.getFullYear();
    var month = d.getMonth() + 1;
    fileName += "-" + ((month < 10) ? "0" + month : month); //$NON-NLS-0$ //$NON-NLS-1$
    var day = d.getDate();
    fileName += "-" + ((day < 10) ? "0" + day : day); //$NON-NLS-0$ //$NON-NLS-1$
    var hours = d.getHours();
    fileName += "T" + ((hours < 10) ? "0" + hours : hours); //$NON-NLS-0$ //$NON-NLS-1$
    var minutes = d.getMinutes();
    fileName += ((minutes < 10) ? "0" + minutes : minutes); //$NON-NLS-0$
    var seconds = d.getSeconds();
    fileName += ((seconds < 10) ? "0" + seconds : seconds); //$NON-NLS-0$
    var timeZoneOffset = -d.getTimezoneOffset();
    var offsetMinutes = timeZoneOffset % 60;
    var offsetHours = (timeZoneOffset - offsetMinutes) / 60;
    fileName += (offsetHours > 0 ? "+" : "") + ((offsetHours < 10) ? "0" + offsetHours : offsetHours) + ((offsetMinutes < 10) ? "0" + offsetMinutes : offsetMinutes); //$NON-NLS-0$ //$NON-NLS-2$ //$NON-NLS-1$
    fileName += '.txt'; //$NON-NLS-0$
    a.href = URL.createObjectURL(new window.Blob([localStorage.map], {
        "type": 'text/plain'
    }));
    a.download = fileName;
    a.click();
})()