/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var reportFeedbackInformation = function () {
  let copyright = document.querySelector('meta[name=copyright]'),
  keywords = document.querySelector('meta[name=keywords]'),
  description = document.querySelector('meta[name=description]'),
  author = document.querySelector('meta[name=author]'),
  generator = document.querySelector('meta[name=generator]'),
      strWindowFeatures = 'resizable=yes,scrollbars=yes',
  extractLinksFromselection = function() {
  var s = window.getSelection();
  let rangeLinks = [
  ];
  for (let i = 0; i < s.rangeCount; i++) {
    if (s.getRangeAt(i).commonAncestorContainer.parentElement.hasAttribute('href')) {
      rangeLinks.push(s.getRangeAt(i).commonAncestorContainer.parentElement.href);
    }
  }
  return rangeLinks;
  },
      mozillaReporter = function() {
        rangeLinks = extractLinksFromselection();
        window.open(this.help, null, strWindowFeatures);
    window.open(this.report + '&comment='
    + window.encodeURIComponent((rangeLinks.length ? 'See these links:\n\n'
    + rangeLinks.join(' ') + '\n\n  referenced from\n\n' : 'See:\n\n') + window.location.href + '\n\nDetails:\n\n' + window.getSelection().toString())
    + '&bug_file_loc=' + window.encodeURIComponent(window.location.href)s
    + '&short_desc=' + window.encodeURIComponent('Summarise issue or request about ' + document.title)
    , "_blank", strWindowFeatures
    );
      },
  mdn = {
    'help': 'https://developer.mozilla.org/en-US/docs/MDN/About#Documentation_errors',
    //       'report': 'https://bugzilla.mozilla.org/form.doc?bug_file_loc='
    'report': 'https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=Developer%20Documentation&component=General',
    'reporter': mozillaReporter
  },
  amo = {
    'help': 'https://addons.mozilla.org/en-US/developers/docs/policies/contact',
    'report': 'https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=addons.mozilla.org',
    'reporter': mozillaReporter
  },
  dcca = {
    'help': 'https://developer.chrome.com/apps/faq',
    'report': 'https://code.google.com/p/chromium/issues/entry?label=Cr-Platform-Apps&summary=does%20not%20work&comment=off%20the%20record'
  },
  dcce = {
    'help': 'https://developer.chrome.com/extensions/faq',
    'report': 'https://code.google.com/p/chromium/issues/entry?label=Cr-Platform-Extensions&summary=does%20not%20work&comment=off%20the%20record'
  },
  known_origins = {
    'https://developer.mozilla.org': mdn,
    'https://addons.mozilla.org': amo,
    // staging site for AMO
    'https://addons.allizom.org': amo,
    'https://developer.chrome.com/apps/': dcca,
    'https://developer.chrome.com/extensions/': dcce
  }
  var mailtos = [
  ];
  // TODO Please see http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#attribute-substrings
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (value) {
    mailtos.push(value.href);
  });
  var gpluses = [
  ];
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://plus.google.com/"]'), function (value) {
    gpluses.push(value.href);
  });
  var data = {
    copyright: copyright && copyright.content,
    keywords: keywords && keywords.content,
    description: description && description.content,
    author: author && author.content,
    generator: generator && generator.content,
    mailtos: mailtos,
    gpluses: gpluses,
    url: document.URL,
    selection: window.getSelection().toString()
  };
  let handler = known_origins[window.location.origin];
  if (handler) {
    handler.reporter();
  } else {
    window.alert('potential feedback information\n' + JSON.stringify(data, null, 2));
  }
  // window.alert('mailto addresses\n' + JSON.stringify(mailtos, null, 2));

};
reportFeedbackInformation();
