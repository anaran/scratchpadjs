// My answer for
// http://stackoverflow.com/questions/20507396/regular-expression-for-dominion-land-surveyor/20508597?noredirect=1#comment30663755_20508597
// Use it in Firefox Scratchpad or Google Chrome devtools Snippets.
 /* jslint browser: true */
 /*global console: false*/
     'use strict';
(function testDominionLandSurveyor() {
    var inp = document.body.appendChild(document.createElement('input'));
    inp.type = 'text';
    inp.value = '01-01-001-01W1';
    inp.title = 'e.g. 16-36-127-34W8';
    inp.onkeyup = function LsdLocation(obj) {
        var value = obj.target.value;
        // Based on idea by sln in http://stackoverflow.com/a/20508410/743358
        // Match incrementally, producing ever more subexpression matches until fully matched.
        var regex = /^(?:(0(?:[1-9])?|1(?:[0-6])?)(?:-(?:(0(?:[1-9])?|1(?:[0-9])?|2(?:[0-9])?|3(?:[0-6])?)(?:-(?:(0(?:[0-9](?:[1-9])?)?|1(?:[0-1](?:[0-9])?)?|1(?:[2](?:[0-7])?)?)(?:-(?:(0(?:[1-9])?|1(?:[0-9])?|2(?:[0-9])?|3(?:[0-4])?)(?:W(?:([1-8]))?)?)?)?)?)?)?)?)$/;
        var matches = regex.exec(value);
        console.log(matches);
        if (matches) {
            var unmatched = matches.filter(function(value) {
                return value === undefined;
            });
            console.log(unmatched);
            obj.target.style.backgroundColor = 'hsl(360,100%,'
            // Increase luminance with each component match, up to white.
            + (100 - 8 * unmatched.length) + '%)';
            console.log(obj.target.style.backgroundColor);
        } else {
            obj.target.style.backgroundColor = 'red';
        }
    // obj.target.value = value;
    };
})();
