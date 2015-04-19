var linkShortener = function (title, href) {
  var replaceInText = function (text, regexp, replacement) {
    return text.replace(regexp, replacement);
  }
  var shortenBMO = function (text) {
    return replaceInText(text, /\bhttps:\/\/bugzilla\.mozilla\.org\/show_bug\.cgi\?id=(\d+)\b/g, 'https://bugzil.la/$1');
  }
  var shortLink = {
    title: title,
    href: shortenBMO(href)
  };
  var e = new Error(shortLink);
  // window.prompt(e.stack.split("\n")[0] + ', running on this tab, says:', e.message);
  return shortLink;
  // return JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
};
var toMarkdown = function (options) {
  return '[' + options.title + '](' + options.href + ')';
};
var toMediawiki = function (options) {
  return '[' + options.href + ' ' + options.title + ']';
};
var linkContainer = document.createElement('div');
var linkHeadline = document.createElement('h1');
var closingLink = document.createElement('a');
var closeLink = function (event) {
  document.body.removeChild(event.target.parentElement);
};
closingLink.onclick = closeLink;
closingLink.textContent = 'Close';
// linkContainer.style = 'position: fixed; top: 2em; left: 2em; opacity: 0.9; ';
// linkContainer.style += 'z-index: 1000; background-color: yellow; overflow: scroll;';
linkContainer.style = 'z-index: 1000; background-color: yellow; overflow: scroll;';
linkContainer.id = 'dlltmm';
for(var dlltmm of document.querySelectorAll('#dlltmm')) {
  document.body.removeChild(dlltmm);
}
linkHeadline.textContent = 'Shortened Links in Page';
linkContainer.className = 'linky';
linkContainer.appendChild(closingLink);
linkContainer.appendChild(linkHeadline);
var addSingleLink = function (title, href) {
  var markdownLink = document.createElement('input');
  var markdownLabel = document.createElement('label');
  var mediawikiLink = document.createElement('input');
  var mediawikiLabel = document.createElement('label');
  var singleLinkContainer = document.createElement('div');
  singleLinkContainer.style = 'border: 2px solid; margin: 0.5em';
  markdownLink.value = toMarkdown(linkShortener(title, href));
  mediawikiLink.value = toMediawiki(linkShortener(title, href));
  markdownLink.readOnly = true;
  mediawikiLink.readOnly = true;
  // markdownLink.size = 80;
  // mediawikiLink.size = 80;
  markdownLink.style = 'width: calc(50% - 10ex);';
  mediawikiLink.style = 'width: calc(50% - 10ex);';
  linkContainer.appendChild(singleLinkContainer);
  markdownLabel.textContent = 'markdown';
  markdownLabel.appendChild(markdownLink);
  singleLinkContainer.appendChild(markdownLabel);
  mediawikiLabel.textContent = 'mediawiki';
  mediawikiLabel.appendChild(mediawikiLink);
  singleLinkContainer.appendChild(mediawikiLabel);
  var topLink = document.createElement('a');
  var gotoTop = function (event) {
    event.target.parentElement.parentElement.scrollIntoView();
  };
  topLink.onclick = gotoTop;
  topLink.textContent = 'Top';
  singleLinkContainer.appendChild(topLink);
};
if (document.referrer) {
  addSingleLink("document.referrer", document.referrer);
}
addSingleLink(document.title, document.location.href);
var summary = document.createElement('h2');
summary.textContent = "Page has " + document.links.length + " links listed below."
linkContainer.appendChild(summary);
Array.prototype.forEach.call(document.links, function (link) {
  addSingleLink(link.textContent, link.href);
});
document.body.appendChild(linkContainer);
linkContainer.scrollIntoView();
// window.alert('you are here: ' + document.location.href);
console.log(linkContainer.outerHTML);
console.log(document.body.lastElementChild);
/*
[ECMAScript Language Specification - ECMA-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-5.1.5)
*/
/*
[512266 – JSON.stringify serializes \n to \u000a](https://bugzil.la/512266)
*/
/*
[1111566 – DevTools touch emulation: context menu should not come up and block interaction with touched element](https://bugzil.la/1111566)
*/
/*
[HTMLScriptElement - Web API Interfaces | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)
*/
/*
Exception: SyntaxError: missing ) after argument list
@Scratchpad/1:61
*/
