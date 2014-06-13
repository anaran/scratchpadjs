// 1445  20140411T142118+0200 cat history* .bash_history > cat-history-bash-history.txt
// 1447  20140411T142212+0200 mv cat-history-bash-history.txt ~/eclipse-orion-ws/ad/adrian/OrionContent/tanga-etc
// Open file
// https://apa.selfhost.eu:8443/file/adrian-OrionContent/tanga-etc/cat-history-bash-history.txt
// With Orion Web Browser, run this script in scratchpad
/*
80 character line length
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
(function () {
    const UNSORTED_HISTORY = document.body.firstChild.textContent;
    const UNSORTED_HISTORY_ARRAY = UNSORTED_HISTORY.match(/^#\d{10}\n[^#\n].*$/gm);
    console.log(UNSORTED_HISTORY_ARRAY.length);
    /*
10296
*/
    console.log(UNSORTED_HISTORY_ARRAY[0]);
    /*
#1363828556
git svn dcommit --dry-run
*/
    // return;
    const SORTED_HISTORY_ARRAY = UNSORTED_HISTORY_ARRAY.sort(function (a, b) {
        return String.localeCompare(a.substring(1, 11), b.substring(1, 11))
    });
    const FIRST_COMMAND_DATE = new Date(Number.parseInt(SORTED_HISTORY_ARRAY[0].substring(1, 11), 10) * 1000);
    const LAST_COMMAND_DATE = new Date(Number.parseInt(SORTED_HISTORY_ARRAY[SORTED_HISTORY_ARRAY.length - 1].substring(1, 11), 10) * 1000);
    console.log('first', FIRST_COMMAND_DATE, SORTED_HISTORY_ARRAY[0]);
    console.log('last', LAST_COMMAND_DATE, SORTED_HISTORY_ARRAY[SORTED_HISTORY_ARRAY.length - 1]);
    // TODO Please not how we add a final newline here.
    const SORTED_HISTORY = SORTED_HISTORY_ARRAY.join('\n') + '\n';
    var blob = new window.Blob([SORTED_HISTORY], {
        'type': 'text/plain; charset=utf-8'
    });
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    const PATH_ARRAY = location.pathname.split(/[\/]/);
    const BASENAME = PATH_ARRAY[PATH_ARRAY.length - 1];
    downloadLink.download = "sorted_history_" + encodeURIComponent(BASENAME) + '@' + Date.now() + '.txt';
    // downloadLink.download = 'sorted_history.txt';
    downloadLink.innerHTML = 'Download &DoubleDownArrow; sorted history';
    document.body.appendChild(downloadLink);
    downloadLink.setAttribute('style', "position:fixed;top:1em;right:1em;");
}) ();
