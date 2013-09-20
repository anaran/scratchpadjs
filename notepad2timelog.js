 // Parse German dates insert in Windows Notepad with F5 keyboard shortcut
// document.body.textContent.match(/(\d{2}):(\d{2}) (\d{2})\.(\d{2})\.(\d{4})/g);
(function() {
    var label = "Measure time starting "+(new Error()).stack.split('\n')[1].trim();
    console.time(label);
    var stats = {
        maxLine: {length: 0,index: 0, text: undefined},
        minLine: {length: undefined,index: undefined, text: undefined}
    };
        var lines = document.body.textContent.split('\n');
    document.body.firstChild.textContent = document.body.firstChild.textContent.replace(/\\\n/g, '');
    // console.log(document.body.firstChild.textContent.replace(/auweh/gm, '\\'));
    // console.log(document.body.firstChild.textContent);
    // Find information about longest line in timelog text file loaded into current tab.
    (function() {
        lines.map(function(value, index, object) {
            if (stats.maxLine.length === undefined || value.length > stats.maxLine.length) {
                stats.maxLine.length = value.length;
                stats.maxLine.index = index;
                stats.maxLine.text = value;
            }
        });
    })();

    // Find information about shortest clockin line in timelog text file loaded into current tab.
    (function() {
        lines.map(function(value, index, object) {
            if ((true || value.match(/^i \d/)) && (stats.minLine.length === undefined || (value.length < stats.minLine.length))) {
                stats.minLine.length = value.length;
                stats.minLine.index = index;
                stats.minLine.text = value;
            }
        });
    })();
    console.log(JSON.stringify(stats, null, 2));
    console.timeEnd(label);
})();

