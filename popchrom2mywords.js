// Begin of popchrom2mywords.js
//
// Run this JavaScript code snippet in Firefox Scratchpad
// or import to Google Chrome devtools source snippets
// in a tab containing a Popchrom export file with
// Character encoding set to Unicode for that tab.
//
// A newly created dialog contains a link to download the
// generated
// 'popchrom2mywords_@' + Date.now() + '.xml'
// file.
// Conversion of 1518 popchrom abbreviations took well under a second
// in Firefox:
//
// "Running popchrom2mywords@Scratchpad/4#L35C31
// @Scratchpad/4#L33C11
// " Scratchpad/4:35
// conversion time: timer started Scratchpad/4:36
// "converting 1518 abbreviations"
// conversion time: 140ms
//
// The .xml file import was tested in MyWords 0.2.12.
//
// Limitation:
//
// MyWords does not support abbreviation arguments, so they are
// just added to the imported label as a hint to the user.
//
// MyWords does not understand the Popchrom keywords like %CLIPBOARD%,
// so they will remain verbatim in the expansion.
//
// Unlike Popchrom MyWords Configuration text cannot be searched,
// which makes it unmanagable with a large number of abbreviations.
//
// The import of my 1518 Popchrom abbreviations into MyWords took over
// a minute but succeeded at last. MyWord performance is still
// acceptable after the import.
//
// Author: adrian.aichner@gmail.com
// Lives in private git repository "javascript.git"
//
;
(function popchrom2mywords() {
  try {
    console.log('Running ' + (new Error).stack.replace(/:(\d+):(\d+)/g, '#L$1C$2'));
    console.time('conversion time');
    let popchromData = JSON.parse(document.body.textContent),
    abbrev,
    expansion,
    pattern,
    value;
    console.log('converting ' + popchromData.length / 2
                + ' abbreviations');
    let myWordsDocument = new Document(null, null, 'text/xml');
    let myWords = myWordsDocument.appendChild(myWordsDocument.createElement('mywords'));
    while (true) {
      abbrev = popchromData.shift();
      expansion = popchromData.shift();
      if (!(abbrev && abbrev.length && expansion && expansion.length)) {
        break;
      }
      let word = myWords.appendChild(myWordsDocument.createElement('word'));
      let label = word.appendChild(myWordsDocument.createElement('label'));
      let text = word.appendChild(myWordsDocument.createElement('text'));
      try {
        [
          pattern,
          value
        ] = JSON.parse(expansion);
        label.appendChild(myWordsDocument.createTextNode(abbrev + ' ' + pattern));
        text.appendChild(myWordsDocument.createTextNode(value));
      } catch (exception) {
        label.appendChild(myWordsDocument.createTextNode(abbrev));
        text.appendChild(myWordsDocument.createTextNode(expansion));
      }
    }
    var oSerializer = new XMLSerializer();
    var sXML = oSerializer.serializeToString(myWordsDocument);
    var blob = new window.Blob([sXML], {
      'type': 'text/plain;charset=utf-8'
    });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'popchrom2mywords_@' + Date.now() + '.xml';
    a.textContent = 'Download ' + a.download;
    var myDocument = document;
    var autosaveIndicator = myDocument.createElement('div');
    autosaveIndicator.style.top = '20px';
    autosaveIndicator.style.left = '20px';
    autosaveIndicator.style.backgroundColor = 'white';
    a.style.padding = '0.5em';
    autosaveIndicator.style.padding = '0.5em';
    autosaveIndicator.style.border = '0.1em solid';
    autosaveIndicator.appendChild(a);
    var close = autosaveIndicator.appendChild(myDocument.createElement('span'));
    close.innerHTML = '&Cross;';
    close.addEventListener('click', function (event) {
      event.preventDefault();
      myDocument.body.removeChild(autosaveIndicator);
    }, false);
    myDocument.body.appendChild(autosaveIndicator);
    autosaveIndicator.style.position = 'fixed';
    console.timeEnd('conversion time');
  } 
  catch (exception) {
    console.error(JSON.stringify(exception, Object.getOwnPropertyNames(exception), 2));
  }
}) ();
// End of popchrom2mywords.js
