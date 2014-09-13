// -sp-context: browser
// Replace /\b(const|let)\B/ with "$1 "
'use strict';
;
(function () {
  const DEBUG = false;
  let inputElement = content.document.body.appendChild(content.document.createElement('input'));
  inputElement.type = 'file';
  inputElement.title = 'Drop a file here to open it';
  inputElement.dropzone = 'link';
  inputElement.style.cssText = 'position: fixed; top: 2em; left: 2em; opacity: 0.9; background: white';
  inputElement.addEventListener('drop', function (event) {
    // TODO needed for drop to work!
    event.preventDefault(); // stops the browser from redirecting.
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    DEBUG && console.log('event.dataTransfer.types', event.dataTransfer.types);
    Array.prototype.forEach.call(event.dataTransfer.types, function (type) {
      console.log({ type: type,
                   'getData(type)': event.dataTransfer.getData(type) });
    });
    let linkData = event.dataTransfer.getData(event.dataTransfer.types[1]);
    // let linkData = event.dataTransfer.getData('text/x-moz-url');
    linkData || console.error({ linkData: linkData,
                               types: event.dataTransfer.types });
    DEBUG && console.log(JSON.stringify(linkData));
    let file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    let ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
    //  file:///c:/tmp/git.mozilla.org/gecko-dev/browser/devtools/scratchpad/scratchpad.js
    //   var path = event.target.files[0].mozFullPath;
    DEBUG && console.log('linkData', linkData);
    let path = linkData;
    if (/^file:\/\/\//.test(path)) {
      path = path.replace(new RegExp('^file:///'), '').replace(/\//g, '\\');
    }
    DEBUG && console.log('path', path);
    file.initWithPath(path);
    DEBUG && console.log('file', file);
    var url = ioService.newFileURI(file);
    // var url = ioService.newURI(file, "utf-8", null);
    var fileURL = url.spec;
    // TODO Do this using the correct API!
    fileURL = fileURL.replace(/%2520/g, "%20");
    let sp = Scratchpad.ScratchpadManager.openScratchpad({
      text: 'Please wait for import...'
    });
    function doimport(event) {
      DEBUG && console.log(event);
      if (!event || event.target.readyState == 'complete') {
        DEBUG && console.log(sp);
        try {
          sp.Scratchpad.importFromFile(fileURL);
          sp.Scratchpad.setState({
            filename: path
          });
          console.log({ path: path, fileURL: fileURL });
        } catch (exception) {
          console.error({ message: exception.message,
                         filename: exception.filename,
                         stack: exception.stack });
        }
      }
    }
    // TODO Find an event instead. onload is not the right one.

    setTimeout(doimport, 2000);
    // event.target.files[0].mozFullPath = event.target.value;
  }, false);
  content.document.addEventListener('dragover', function (event) { //$NON-NLS-0$
    event.preventDefault();
    if ((event.target === inputElement)) {
      event.dataTransfer.effectAllowed = 'link'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'link'; //$NON-NLS-0$
      //   if (event.dataTransfer.mozSourceNode.href) {
      //   inputElement.mozSetFileNameArray([ event.dataTransfer.mozSourceNode.href ], 1);
      //   }
      // event.target.files.pushd.mozFullPath = event.dataTransfer.mozSourceNode.href;
      //     document.body.classList.add('valid');
    } else {
      event.dataTransfer.effectAllowed = 'none'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'none'; //$NON-NLS-0$
    }
    DEBUG && console.log(event.type, event.dataTransfer.files, event.target);
    return false;
  }, false && 'useCapture'); //$NON-NLS-0$ //$NON-NLS-1$
  // content.document.addEventListener("dragstart", function(event) {
  //   // TODO needed for drop to work!
  //   event.preventDefault(); // stops the browser from redirecting.
  //     event.dataTransfer.effectAllowed = "none"; //$NON-NLS-0$
  //     event.dataTransfer.dropEffect = "none"; //$NON-NLS-0$
  //     DEBUG && console.log(event.type, event.dataTransfer.files, event.target);
  // }, false);
  inputElement.addEventListener('change', function (event) {
    console.log('inputElement.outerHTML', inputElement.outerHTML);
    let file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    let ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
    var path = event.target.files[0].mozFullPath;
    file.initWithPath(path);
    var url = ioService.newFileURI(file);
    var fileURL = url.spec;
    let sp = Scratchpad.ScratchpadManager.openScratchpad({
      text: 'Please wait for import...'
    });
    function doimport(event) {
      DEBUG && console.log(event);
      if (!event || event.target.readyState == 'complete') {
        DEBUG && console.log(sp);
        sp.Scratchpad.importFromFile(fileURL);
        sp.Scratchpad.setState({
          filename: path
        });
      }
    }
    // TODO Find an event instead. onload is not the right one.

    setTimeout(doimport, 1000);
    // sp.window.addEventListener('readystatechange', doimport, false);
  }, false);
}) ();
