// snippet generate_password.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.351Z
/* jslint browser: true */
/*global console: false*/
'use strict';
//$NON-NLS-0$
(function () {
  var Passwd = function (length, classes) {
    do {
      var passwd = '',
      classTypes = {
      },
      classCount = 0,
      len = length || Math.round(Math.random() * 5 + 8),
      clsss = classes || ['digit',
      'lower',
      'space',
      'upper'],
      cnt = clsss.length,
      classIndex,
      charIndex,
      chars = {
        'digit': '0123456789',
        'lower': 'abcdefghijklmnopqrstuvwxyz',
        'punct': '~!@#$%^&*()_+=-|\\}]{["\':;?/>.<,',
        'space': ' ',
        'upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      };
      // console.log("clsss = " + clsss);
      while (passwd.length < len) {
        classIndex = Math.floor(Math.random() * cnt);
        classTypes[clsss[classIndex]] = true;
        charIndex = Math.floor(Math.random() * chars[clsss[classIndex]].length);
        passwd += chars[clsss[classIndex]].charAt(charIndex);
      }
      // console.log(JSON.stringify(classTypes));

      classCount = Object.keys(classTypes) .length;
      // console.log("classCount = " + classCount);
      // console.log("passwd.length = " + passwd.length);
    } while (classCount < cnt);
    if (window.confirm('See generated password of '+passwd.length+' characters using ' + Object.keys(classTypes) + ' now?\n\nSee also\nhttp://xkcd.com/936/\nfor better passwords.')) {
      window.prompt('Generated password has ' + passwd.length + ' characters covering types ' + Object.keys(classTypes) .sort() + '\n', passwd);
    }
  };
  if (true) {
    Passwd();
  }
  var usage = function usage() {
    // TODO See http://xkcd.com/936/
    // Generate password of 8 to 13 characters of types 'digit', 'lower', 'space', 'upper'.
    Passwd();
    // Generate password of 16 characters of types 'digit', 'lower', 'space', 'upper'.
    Passwd(16);
    // Generate PIN of 4 characters of type 'digit'.
    Passwd(4, [
      'digit'
    ]);
  }
  if (typeof require === 'function') {
    module.exports.Passwd = Passwd;
  } 
  else if (content === window) {
    window.Passwd = Passwd;
  } 
  else {
    content.window.Passwd = Passwd;
  }
  console.info(usage.toString());
}) ();
