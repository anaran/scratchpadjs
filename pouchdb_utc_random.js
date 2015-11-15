function couchdbUtcRandomFromDate(date) {
  // Convert from milliseconds to microseconds
  var time = date.getTime() * 1000;
  // See http://www.erlang.org/doc/man/io.html#fwrite-1
  // which I found after rnewson pointed me to
  // https://github.com/cloudant/couchdb-couch/blob/master/src/couch_uuids.erl#L40-L49
  var utc14Char = time.toString(16);
  // couchdb utc_random uses 14 characters to represent the microseconds
  // since Jan 1, 1970 UTC in hex.
  // See http://docs.couchdb.org/en/1.6.1/config/misc.html#uuids/algorithm
  if (utc14Char.length < 14) {
    var pad = "";
    for (var i = utc14Char.length; i < 14; i++) {
      pad = "0" + pad;
    }
    if (time < 0) {
      utc14Char = '-' + pad + utc14Char.substring(1);
    }
    else {
      utc14Char = pad + utc14Char;
    }
  }
  // couchdb utc_random uses 18 characters representing a random number in hex.
  // Concatenate two random numbers to get enough significant digits.
  var random18Char = (Math.random()).toString(16).substring(3, 12) + (Math.random()).toString(16).substring(3, 12);
  return utc14Char + random18Char;
}

if (typeof exports != 'undefined') {
  exports.couchdbUtcRandomFromDate = couchdbUtcRandomFromDate;
}
else {
  // Firefox Scratchpad "test" (use Ctrl+L)
  let d = new Date;
  let bd = new Date("1961-02-19T02:00:00Z");
  JSON.stringify({
    ' d.getTime()': d.getTime(),
    'bd.getTime()': bd.getTime(),
    ' d': couchdbUtcRandomFromDate(d),
    'bd': couchdbUtcRandomFromDate(bd)
  }, null, 2);
}

/*
{
  " d.getTime()": 1447547431861,
  "bd.getTime()": -279756000000,
  " d": "0524896678bb0841fb0bbf3311590b89",
  "bd": "-0fe6fc500f8009566af109edea91c77"
}
*/
/*
{
  " d.getTime()": 1447547438949,
  "bd.getTime()": -279756000000,
  " d": "05248966e4e28891ef5860aae0806037",
  "bd": "-0fe6fc500f800ef3621779dbb073853"
}
*/
