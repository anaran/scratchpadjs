// Works pretty well already as Scratchpad snippet.
// This could become a simple jetpack add-on for Firefox on Android, Linux, Windows
var toc = (function () {
  if (!document || !document.body) {
    return;
  }
  var headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  var toc = [];
  var now = Date.now();
  Array.prototype.forEach.call(headlines, function (headline) {
    // github appends hidden links to headlines
    var anchor = headline.id || headline.name || headline.querySelector('a.anchor') && headline.querySelector('a.anchor').id;
    if (anchor) {
      // NOTE: TOC anchor is not needed with fixed positioning
      // var a = document.createElement('a');
      // a.href = '#toc' + now;
      // a.textContent = 'TOC';
      // a.style = 'font-size: x-small;';
      // In mozilla Firefox, if referenceElement is null,
      // newElement is inserted at the end of the list of child nodes.
      // headline.parentElement.insertBefore(a, headline.nextElementSibling);
      toc.push({ anchor: anchor, level: headline.localName, text: headline.textContent });
    }
  });
  // window.alert(JSON.stringify(toc, null, 2));
  var div = document.createElement('div');
  div.id = 'toc' + now;
  div.style = 'position: fixed; top: 0; right: 0; max-height: 100%; background: white; opacity: 0.8; overflow: auto;';
  var ul = document.createElement('ul');
  toc.forEach(function (entry) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + entry.anchor;
    a.textContent = entry.text;
    li.appendChild(a);
    ul.appendChild(li);
  });
  div.appendChild(ul);
    var close = document.createElement('div');
  close.textContent = 'Close Table of Contents';
  close.onclick = function () {
    document.body.removeChild(this.parentElement);
  };
  div.appendChild(close);
  document.body.appendChild(div);
  return toc;
})();
