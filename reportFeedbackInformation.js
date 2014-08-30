//
// Author: adrian.aichner@gmail.com
// Lives in private git repository "javascript.git"
//
var reportFeedbackInformation = function () {
  var copyright = document.querySelector('meta[name=copyright]'),
  keywords = document.querySelector('meta[name=keywords]'),
  description = document.querySelector('meta[name=description]'),
  author = document.querySelector('meta[name=author]'),
  generator = document.querySelector('meta[name=generator]'),
  strWindowFeatures = 'resizable=yes,scrollbars=yes,toolbar=yes',
  extractLinksFromSelection = function () {
    var s = window.getSelection();
    var rangeLinks = {
    };
    for (var i = 0; i < s.rangeCount; i++) {
      var rc = s.getRangeAt(i).cloneContents();
      rc.querySelectorAll
      && Array.prototype.forEach.call(
        rc.querySelectorAll('a[href]'),
        function (value) {
          rangeLinks[value.href] = true;
        });
    }
    return Object.keys(rangeLinks);
  },
  githubReporter = function (base) {
    rangeLinks = extractLinksFromSelection();
    window.open(base + '/wiki', '_blank', strWindowFeatures);
    window.open(base + '/issues/new'
    + '?title=' + window.encodeURIComponent('Summarise issue or request about ' + document.title)
    + '&body='
    + window.encodeURIComponent((rangeLinks.length ? 'See these links:\n\n'
    + rangeLinks.join('\n') + '\n\n  referenced from\n\n' : 'See:\n\n') + window.location.href + '\n\nDetails:\n\n' + window.getSelection().toString()), '_blank', strWindowFeatures
    );
  },
  mozillaReporter = function () {
    rangeLinks = extractLinksFromSelection();
    window.open(this.help, '_blank', strWindowFeatures);
    window.open(this.report + '&comment='
    + window.encodeURIComponent((rangeLinks.length ? 'See these links:\n\n'
    + rangeLinks.join('\n') + '\n\n  referenced from\n\n' : 'See:\n\n') + window.location.href + '\n\nDetails:\n\n' + window.getSelection().toString())
    + '&bug_file_loc=' + window.encodeURIComponent(window.location.href)
    + '&short_desc=' + window.encodeURIComponent('Summarise issue or request about ' + document.title), '_blank', strWindowFeatures
    );
  },
  chromiumReporter = function () {
    rangeLinks = extractLinksFromSelection();
    window.open(this.help, null, strWindowFeatures);
    window.open(this.report + '&comment='
    + window.encodeURIComponent((rangeLinks.length ? 'See these links:\n\n'
    + rangeLinks.join('\n') + '\n\n  referenced from\n\n' : 'See:\n\n') + window.location.href + '\n\nDetails:\n\n' + window.getSelection().toString())
    + '&bug_file_loc=' + window.encodeURIComponent(window.location.href)
    + '&summary=' + window.encodeURIComponent('Summarise issue or request about ' + document.title), null, strWindowFeatures
    );
  },
  mdn = {
    'help': 'https://developer.mozilla.org/en-US/docs/MDN/About#Documentation_errors',
    'report': 'https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=Developer%20Documentation',
    'reporter': mozillaReporter
  },
  amo = {
    'help': 'https://addons.mozilla.org/en-US/developers/docs/policies/contact',
    'report': 'https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=addons.mozilla.org',
    'reporter': mozillaReporter
  },
  dcca = {
    'help': 'https://developer.chrome.com/apps/faq',
    'report': 'https://code.google.com/p/chromium/issues/entry?label=Cr-Platform-Apps',
    'reporter': chromiumReporter
  },
  dcce = {
    'help': 'https://developer.chrome.com/extensions/faq',
    'report': 'https://code.google.com/p/chromium/issues/entry?label=Cr-Platform-Extensions',
    'reporter': chromiumReporter
  },
  github = {
    'reporter': githubReporter
  },
  knownSites = {
    'https://developer.mozilla.org': mdn,
    'https://addons.mozilla.org': amo,
    // staging site for AMO
    'https://addons.allizom.org': amo,
    'https://developer.chrome.com/apps': dcca,
    'https://developer.chrome.com/extensions': dcce,
    // github reporter uses argument passed to it to derive help and report URL.
    'https://github.com/[^/]+/[^/]+': github
  },
  mailtos = [
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
    knownSites: Object.getOwnPropertyNames(knownSites),
    copyright: copyright && copyright.content,
    keywords: keywords && keywords.content,
    description: description && description.content,
    author: author && author.content,
    generator: generator && generator.content,
    mailtos: mailtos,
    gpluses: gpluses,
    url: document.URL,
    selection: window.getSelection().toString(),
    rangeLinks: extractLinksFromSelection()
  };
  var handler = Object.keys(knownSites).some(function (value) {
    var captureGroups = value.match(/^\/?(.+?)(?:\/([gim]*))?$/);
    var regexp = new RegExp(captureGroups[1], captureGroups[2]);
    var match = window.location.href.match(regexp);
    if (match) {
      // window.alert(JSON.stringify(match, Object.getOwnPropertyNames(match), 2));
      knownSites[value].reporter(match[0]);
      return true;
    }
    return false;
  });
  if (handler) {
  } else {
    window.alert('potential feedback information\n' + JSON.stringify(data, null, 2));
  }
};
reportFeedbackInformation();
