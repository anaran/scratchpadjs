(function() {
    var lastScrollTop = document.documentElement.scrollTop;
    var lastStyle = window.getComputedStyle(document.documentElement);
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.background = lastStyle.color;
    div.style.color = lastStyle.backgroundColor;
    div.style.fontSize = "xx-large";
    div.title = "reading aid";
    div.style.padding = "3px";
    div.style.borderRadius = "3px";
    div.style.opacity = 0.2;
    div.style.left = (window.scrollX + window.innerWidth) + "px";
    div.style.top = window.scrollY + "px";
    div.className = "readingAid";
    if (div.parentElement) {
        document.body.removeChild(div);
    }
    window.addEventListener('scroll', function(event) {
        if (div.parentElement) {
            document.body.removeChild(div);
        }
        div.style.left = document.documentElement.scrollLeft + document.documentElement.clientWidth / 2 + "px";
        // TODO Please note this is not possible in a clean way, see
        // http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
        //             event.preventDefault();
        //             event.stopPropagation();
        var scrollingUp = lastScrollTop > document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - document.documentElement.scrollTop) > document.documentElement.clientHeight * 0.5) {
            // TODO Please note we are scrolling by page here.
            if (scrollingUp) {
                div.innerHTML = "&UpTeeArrow;";
                //                 div.style.top = (lastScrollTop - document.documentElement.clientHeight) + "px";
                div.style.top = (lastScrollTop) + "px";
            } else {
                div.innerHTML = "&DownTeeArrow;";
                div.style.top = (lastScrollTop + document.documentElement.clientHeight) + "px";
            }
        } else {
            // TODO Please note we are scrolling by line here.
            if (scrollingUp) {
                div.innerHTML = "&UpTeeArrow;";
                div.style.top = (document.documentElement.scrollTop) + "px";
            } else {
                div.innerHTML = "&DownTeeArrow;";
                div.style.top = (document.documentElement.scrollTop) + "px";
            }

        }
        //             div.style.top = (window.innerHeight - lastCBR.top) + "px";
        //             } else {
        //             div.style.top = (window.scrollY) + "px";
        //             }
        //         } else {
        //             div.style.top = -lastCBR.top + "px";
        //             div.style.top = (document.documentElement.scrollTop + document.documentElement.clientHeight) + "px";
        //         }
        //     }
        //             return true;
        // event.returnValue is deprecated. Please use the standard event.preventDefault() instead.
        //             event.returnValue = false;
        //         } else {
        //             if (-lastCBR.top < window.scrollY) {
        //                 div.style.top = (window.innerHeight - lastCBR.top) + "px";
        //                 div.innerHTML = "&DownTeeArrow;";
        //             } else {
        //                 div.style.top = -lastCBR.top + "px";
        //                 div.innerHTML = "&UpTeeArrow;";
        //             }
        //         }
        document.body.appendChild(div);
        //         window.scrollTo(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
        console.log(JSON.stringify(document.documentElement, [
            'clientHeight', 'clientLeft', 'clientTop', 'clientWidth',
            'scrollHeight', 'scrollLeft', 'scrollTop', 'scrollWidth'], 2));
        lastScrollTop = document.documentElement.scrollTop;
    }, true);
})();