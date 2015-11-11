let d = new Date;
let bd = new Date("1961-02-19T02:00:00Z");

var couchdbUtcRandomFromDate = function(date) {
  // Convert from milliseconds to microseconds
  var time = date.getTime() * 1000;
  // See http://www.erlang.org/doc/man/io.html#fwrite-1
  // which I found after rnewson pointed me to
  // https://github.com/cloudant/couchdb-couch/blob/master/src/couch_uuids.erl#L40-L49
  var utc14Bit = time.toString(16);
  // couchdb utc_random uses 14 bits to represent the microseconds
  // since Jan 1, 1970 UTC in hex.
  if (utc14Bit.length < 14) {
    var pad = "";
    for (var i = utc14Bit.length; i < 14; i++) {
      pad = "0" + pad;
    }
    if (time < 0) {
      utc14Bit = '-' + pad + utc14Bit.substring(1);
    }
    else {
      utc14Bit = pad + utc14Bit;
    }
  }
  // couchdb utc_random uses 18 random bits
  // Concatenate two random numbers to get enough significant bits.
  var random18Bit = (Math.random()).toString(16).substring(3, 12) + (Math.random()).toString(16).substring(3, 12);
  return utc14Bit + random18Bit;
};

JSON.stringify({
  ' d.getTime()': d.getTime(),
  'bd.getTime()': bd.getTime(),
  ' d': couchdbUtcRandomFromDate(d),
  'bd': couchdbUtcRandomFromDate(bd)
}, null, 2);
/*
{
  " d.getTime()": 1442580597183,
  "bd.getTime()": -279756000000,
  " d": "052004f80e12181d6fc0f445fe694f39",
  "bd": "-0fe6fc500f80059b58d3fa7dc1fa714"
}
*/
/*
{
  " d.getTime()": 1442581013958,
  "bd.getTime()": -279756000000,
  " d": "05200510e58d70107e94208d5bdfe0d4",
  "bd": "-0fe6fc500f800b0a63dd0986d86ba97"
}
*/
