// -sp-context: browser
// Replace /\b(const|let)\B/ with "$1 "
'use strict';
;
(function scratchpad_open_link(linkData) {
  const DEBUG = false;
  let openScratchpad = function (linkData) {
    let file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
    let ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
    //  file:///c:/tmp/git.mozilla.org/gecko-dev/browser/devtools/scratchpad/scratchpad.js
    //   var path = event.target.files[0].mozFullPath;
    DEBUG && console.log('linkData', linkData);
    let path = linkData;
    if (/^file:\/\/\//.test(path)) {
      path = OS.Path.fromFileURI(linkData);
      //       path = path.replace(new RegExp('^file:///'), '').replace(/\//g, '\\');
    }
    DEBUG && console.log('path', path);
    file.initWithPath(path);
    DEBUG && console.log('file', file);
    var url = ioService.newFileURI(file);
    // var url = ioService.newURI(file, "utf-8", null);
    var fileURL = url.spec;
    // TODO Do this using the correct API!
    fileURL = fileURL.replace(/%2520/g, '%20');
    let sp = Scratchpad.ScratchpadManager.openScratchpad({
      text: 'Please wait for import...'
    });
    function doImport(event) {
      sp.Scratchpad.setState({
        saved: true
      });
      sp.Scratchpad.importFromFile(fileURL, 'silentError', function callback(aStatus, aContent) {
        sp.Scratchpad.setState({
          filename: path,
          saved: true
        });
      });
    }
    let win = sp.window;
    let onLoad = function () {
      win.removeEventListener('load', onLoad, false);
      win.Scratchpad.addObserver({
        onReady: function (aScratchpad) {
          aScratchpad.removeObserver(this);
          doImport(win, aScratchpad);
        }
      });
    };
    if (doImport) {
      win.addEventListener('load', onLoad, false);
    }
  };
  // let myDocument = content.document;
  // See
  // https://developer.mozilla.org/en-US/docs/Web/API/Window.open#Return_value_and_parameters
  // let strWindowFeatures = 'resizable=yes,scrollbars=yes,toolbar=yes';
  // let strWindowFeatures = 'dialog=yes';
  let strWindowFeatures = 'width=400,height=100,top=10,left=10,dialog=yes';
  if (!window instanceof ChromeWindow) {
    window.alert((new Error()).stack.split('\n') [0] + ' needs to run in Environment->Browser');
    return;
  }
  let myDocument = content.window.open('', '_blank', strWindowFeatures).document;
  myDocument.title = 'Drop file to open in Scratchpad';
  let inputElement = myDocument.body.appendChild(myDocument.createElement('input'));
  inputElement.type = 'file';
  inputElement.title = 'Drop a file here to open it';
  inputElement.dropzone = 'link';
  inputElement.style.cssText = 'padding: 1em; border: 0.2em silver dashed; position: fixed; top: 2em; left: 2em; opacity: 0.9; background: white';
  inputElement.addEventListener('drop', function (event) {
    // TODO needed for drop to work!
    event.preventDefault(); // stops the browser from redirecting.
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    // event.dataTransfer.effectAllowed = "link"; //$NON-NLS-0$
    DEBUG && console.log('event.dataTransfer.types', event.dataTransfer.types);
    Array.prototype.forEach.call(event.dataTransfer.types, function (type) {
      DEBUG && console.log({
        type: type,
        'getData(type)': event.dataTransfer.getData(type)
      });
    });
    let linkData = event.dataTransfer.getData(event.dataTransfer.types[1]);
    // let linkData = event.dataTransfer.getData('text/x-moz-url');
    linkData || console.error({
      linkData: linkData,
      types: event.dataTransfer.types
    });
    event.target.value = linkData;
    DEBUG && console.log(JSON.stringify(linkData));
    openScratchpad(linkData);
    // TODO Find an event instead. onload is not the right one.
    // setTimeout(doImport, 2000);
    // event.target.files[0].mozFullPath = event.target.value;
  }, false);
  myDocument.addEventListener('dragover', function (event) { //$NON-NLS-0$
    event.preventDefault();
    if ((event.target === inputElement)) {
      event.dataTransfer.effectAllowed = 'link'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'link'; //$NON-NLS-0$
    } else {
      event.dataTransfer.effectAllowed = 'none'; //$NON-NLS-0$
      event.dataTransfer.dropEffect = 'none'; //$NON-NLS-0$
    }
    DEBUG && console.log(event.type, event.dataTransfer.files, event.target);
    return false;
  }, false && 'useCapture'); //$NON-NLS-0$ //$NON-NLS-1$
  inputElement.addEventListener('change', function (event) {
    DEBUG && console.log('inputElement.outerHTML', inputElement.outerHTML);
    var path = event.target.files[0].mozFullPath;
    openScratchpad(path);
  }, false);
}) ();
