// snippet snippeteer.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1682.3 Safari/537.36
// at 2013-10-26T23:06:11.208Z
(function() {
    try {
        var div = document.createElement('div');
        var importSnippets = document.createElement('input');
        importSnippets.type = 'file';
        importSnippets.multiple = true;
        importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
        var exportButton = document.createElement('input');
        exportButton.type = 'button';
        exportButton.value = 'Download Snippets';
        //         a.innerText = 'Download localStorage for ' + location.origin+location.pathname;
        //     div.setAttribute('style', 'position:fixed;top:50%;left:50%;opacity:1.0;background:white;border: 0.5em solid silver');
        //         div.setAttribute('style', 'position:fixed;top:50%;left:50%;opacity:0.7;');
        //         div.setAttribute('style', 'position:fixed;top:50%;left:50%;opacity:1.0;background:white;border: 0.5em solid silver');
        //         div.setAttribute('style', 'position:fixed;align:center;opacity:1.0;background:white;border: 0.5em solid silver');
        var w = window.open("", "", "width=280,height=100,top=100,left=100");
        w.document.title = 'Snippets Import/Export';
        w.document.body.appendChild(div);
        //         div.appendChild(importButton);
        div.appendChild(importSnippets);
        div.appendChild(exportButton);
        //         div.appendChild(dismissButton);
        //         div.appendChild(a);
        exportButton.addEventListener('click', function(event) {
        var snippets = JSON.parse(localStorage.scriptSnippets);
        snippets.forEach(function(snippet) {
        var blob = new window.Blob(['// snippet '+snippet.name+' exported by snippeteer from\n// '
        +navigator.userAgent+'\n// at '+(new Date()).toJSON()+'\n'+snippet.content], {
            'type': 'text/utf-8'
        });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = snippet.name;
            a.click();
        });
        }, false);
        var checkFileCount = function(files) {
            if (files.length === 0) {
                alert('Please pick some .js files for import as google chrome devtools snippets.');
                return false;
            } else {
                return true;
            }
        };
        var readFileUpdateUI = function(file) {
            var reader = new FileReader();
            var filesLoaded = 0;
            reader.onerror = errorHandler;
            reader.onload = function(readEvent) {
                filesLoaded++;
                var w = window.open("", "", "width="+window.screen.availWidth/2+",height="+window.screen.availHeight/2+",top=100,left=100");
                w.document.title = 'Snippet ' + file.name;
                console.timeEnd('read of ' + file.name);
                var result = readEvent.target.result;
                               console.log(result);
                var pre = document.createElement('pre');
                pre.innerText = result;
                w.document.body.appendChild(pre);
            };
            console.time('read of ' + file.name)
            reader.readAsText(file);
        };
        importSnippets.addEventListener('change', function(event) {
            console.log(event.target.files);
            if (checkFileCount(event.target.files)) {
                // TODO files are added to head of the list, so we have to process in reverse order.
                console.log("Loading files, please wait...");
                for (var i = 0, len = event.target.files.length; i < len; i++) {
                readFileUpdateUI(event.target.files[i]);
                }
            }
        //            diffFiles();
        }, false);
        function errorHandler(domError) {
            console.log(domError);
            alert(domError);
        }
        var handleDrop = function(file) { //$NON-NLS-0$
            readFileUpdateUI(file);
        };
        w.document.body.addEventListener("dragover", function(event) { //$NON-NLS-0$
            event.preventDefault();
            if ((event.srcElement === importSnippets)) {
                event.dataTransfer.effectAllowed = "copy"; //$NON-NLS-0$
                event.dataTransfer.dropEffect = "copy"; //$NON-NLS-0$
                w.document.body.classList.add('valid');
                console.log(event.dataTransfer.effectAllowed, event.dataTransfer.dropEffect);
            } else {
                event.dataTransfer.effectAllowed = "none"; //$NON-NLS-0$
                event.dataTransfer.dropEffect = "none"; //$NON-NLS-0$
                w.document.body.classList.remove('valid');
                console.log(event.dataTransfer.effectAllowed, event.dataTransfer.dropEffect);
            }
            return false;
        }, false && "useCapture"); //$NON-NLS-0$ //$NON-NLS-1$
        w.document.body.addEventListener("dragstart", function(event) {
            // TODO needed for drop to work!
            event.preventDefault(); // stops the browser from redirecting.
        }, false);
        div.addEventListener("drop", function(event) {
            // TODO needed for drop to work!
            event.preventDefault(); // stops the browser from redirecting.
            if (checkFileCount(event.dataTransfer.files)) {
                // TODO files are added to head of the list, so we have to process in reverse order.
                filesLoaded = 0;
                console.log("Loading files, please wait...");
                for (var i = 0, len = event.dataTransfer.files.length; i < len; i++) {
                handleDrop(event.dataTransfer.files[i]);
                }
                w.document.body.classList.remove('valid');
            }
        }, false && "useCapture"); //$NON-NLS-0$ //$NON-NLS-1$
    } catch (exception) {
        console.log(exception.stack);
        window.alert(exception.stack);
    }
})();
