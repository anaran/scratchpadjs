// Works pretty well already as Scratchpad snippet.
// This could become a simple jetpack add-on for Firefox on Android, Linux, Windows
var toc = (function () {
  if (!document || !document.body) {
    return;
  }
  var buildTOC = function (headlines) {
    var toc = [];
    if (headlines.length) {
      Array.prototype.forEach.call(document.body.querySelectorAll(headlines),
                                   function (headline) {
                                     // github appends hidden links to headlines
                                     var anchor = headline.id || headline.name || headline.querySelector('a.anchor') && headline.querySelector('a.anchor').id;
                                     // if (anchor && !headline.childElementCount && /\w+/.test(headline.textContent)) {
                                     if (anchor && headline.textContent.length > 3  && /\w+/.test(headline.textContent) && headline.textContent.split(/\n/).length < 3) {
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
    }
    return toc;
  };
  // window.alert(JSON.stringify(toc, null, 2));
  var buildUI = function () {
    var toggles = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'pre', 'span'
    ];
    var div = document.body.querySelector('body>div#tocdiv');
    console.log(div);
    div && document.body.removeChild(div);
    div = document.createElement('div');
    div.id = 'tocdiv';
    div.style = 'position: fixed; top: 0; left: calc(100% - 20em); max-height: 100%; background: white; opacity: 0.8; overflow: auto;';
    var togglesDiv = document.createElement('div');
    toggles.forEach(function (toggle) {
      var label = document.createElement('label');
      label.style = 'border: solid 1px; font-size: x-small;'
      label.textContent = toggle;
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = toggle;
      checkbox.value = toggle;
      checkbox.checked = false;
      checkbox.onchange = function () {
        console.log(this.type, this.className || this.id, this.checked);
        buildTocUpdateUi(div);
      };
      togglesDiv.appendChild(label);
      label.appendChild(checkbox);
    });
    var close = document.createElement('div');
    close.textContent = 'Close Table of Contents';
    close.onclick = function () {
      document.body.removeChild(this.parentElement);
    };
    div.appendChild(close);
    div.appendChild(togglesDiv);
    document.body.appendChild(div);
    buildTocUpdateUi(div);
  };
  var updateTocUi = function (toc, div) {
    var ul = div.querySelector('ul#tocul');
    console.log(div, ul);
    ul && div.removeChild(ul);
    if (toc) {
      ul = document.createElement('ul');
      ul.id = 'tocul';
      toc.forEach(function (entry) {
        if (entry.anchor != 'tocul' && entry.anchor != 'tocdiv') {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + entry.anchor;
          a.textContent = entry.text;
          li.appendChild(a);
          ul.appendChild(li);
        }
      });
      // div.insertBefore(ul, div.lastElementChild);
      div.appendChild(ul);
    }
  };
  var buildTocUpdateUi = function (div) {
    var headlines = Array.prototype.filter.call(div.querySelectorAll(
      'input[type=checkbox]'), function (toggle) {
      return toggle.checked ? toggle.value : "";
    }).map(function (checked) {
      return checked.value;
    }).join(',');
    // if (headlines.length) {
    var toc = buildTOC(headlines);
    // if (toc) {
    updateTocUi(toc, div);
    // }
    // }
    // else {
    //   buildUI();
    // }
  };
  buildUI();
})();
