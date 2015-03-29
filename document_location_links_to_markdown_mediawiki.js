(function linkShortener() {
  var replaceInText = function (text, regexp, replacement) {
    return text.replace(regexp, replacement);
  }
  var shortenBMO = function (text) {
                              return replaceInText(text, /\bhttps:\/\/bugzilla\.mozilla\.org\/show_bug\.cgi\?id=(\d+)\b/g, "https://bugzil.la/$1");
  }
  // TODO: mediawiki syntax is [link title] vs markdown [title](link)
  var markdownLink = '[' + document.title + '](' + shortenBMO(document.location.href) + ')';
  var e = new Error(markdownLink);
  window.prompt(e.stack.split("\n")[0] + ', running on this tab, says:', e.message);
  return markdownLink;
  // return JSON.stringify(e, Object.getOwnPropertyNames(e), 2);
}) ();

/*
[ECMAScript Language Specification - ECMA-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-5.1.5)
*/
/*
[512266 – JSON.stringify serializes \n to \u000a](https://bugzil.la/512266)
*/
/*
[1111566 – DevTools touch emulation: context menu should not come up and block interaction with touched element](https://bugzil.la/1111566)
*/