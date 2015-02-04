;
function buildElementRegExpMatchRanges(element, regexp, globalMatch, ignoreCase, multiLine) {
  var regularExpression = new RegExp(regexp, (globalMatch ? 'g' : '') + (ignoreCase ? 'i' : '') + (multiLine ? 'm' : '')); //$NON-NLS-4$ //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$ //$NON-NLS-0$
  var sdni = 0;
  var textElement = [
  ];
  console.time('dni');
  var dni = document.createNodeIterator(element, NodeFilter.SHOW_TEXT, function (node) {
    if (node.textContent.length > 0) {
      textElement.push([sdni,
      sdni += node.textContent.length,
      node]);
      return NodeFilter.FILTER_ACCEPT
    } else {
      console.exception(node);
      return NodeFilter.FILTER_REJECT;
    }
  });
  while (dni.nextNode());
  console.timeEnd('dni');
  console.log(sdni);
  console.log(textElement);
  var betterMatches = [
  ];
  var m;
  var tei = 0;
  while (m = regularExpression.exec(element.textContent)) {
    var r = document.createRange();
    for (; textElement[tei][1] <= m.index; tei++);
    r.setStart(textElement[tei][2], m.index - textElement[tei][0]);
    for (; textElement[tei][1] < m.index + m[0].length; tei++);
    r.setEnd(textElement[tei][2], m.index + m[0].length - textElement[tei][0]);
    betterMatches.push(r);
    if (regularExpression.lastIndex == 0) {
      break;
    }
  }
  return betterMatches;
}
exports.buildElementRegExpMatchRanges = buildElementRegExpMatchRanges;
