// snippet reading_aid.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1703.0 Safari/537.36
// at 2013-11-09T15:05:08.831Z
(function() {
    var lastCBR = document.body.getBoundingClientRect();
    var lastStyle = window.getComputedStyle(document.body);
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.background = lastStyle.color;
    div.style.color = lastStyle.backgroundColor;
//     div.innerHTML = "&DownTeeArrow;";
    div.style.fontSize = "xx-large";
    div.title = "reading aid";
    div.style.padding = "3px";
    div.style.borderRadius = "3px";
    div.style.opacity = 0.2;
    //     div.style.height = window.innerHeight + "px";
    //     div.style.width = window.innerWidth + "px";
    div.style.left = (window.scrollX + window.innerWidth) + "px";
    div.style.top = window.scrollY + "px";
    div.className = "readingAid";
    //     document.body.appendChild(div);
    window.addEventListener('scroll', function(event) {
        console.log(div);
        if (div.parentElement) {
            document.body.removeChild(div);
        }
        //         var appendedDiv = document.querySelector('div.readingAid');
        //         if (appendedDiv) {
        //             document.body.removeChild(appendedDiv);
        //         }
        div.style.left = (window.innerWidth / 2- lastCBR.left) + "px";
        if (-lastCBR.top < window.scrollY) {
            div.style.top = (window.innerHeight - lastCBR.top) + "px";
            div.innerHTML = "&DownTeeArrow;";
        } else {
            div.style.top = -lastCBR.top + "px";
            div.innerHTML = "&UpTeeArrow;";
        }
        document.body.appendChild(div);
        //         window.scrollTo(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
        //         console.log(JSON.stringify(lastCBR, null, 2));
        lastCBR = document.body.getBoundingClientRect();
    //         console.log(JSON.stringify(lastCBR, null, 2));
    //         console.count(lastCBR);
    });
})();
