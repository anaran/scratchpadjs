(function() {
    var lastScrollTop = document.documentElement.scrollTop;
    // TODO Please note that documentElement might not have useful styling set up.
    var lastStyle = window.getComputedStyle(document.body);
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
        var scrollingUp = lastScrollTop > document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - document.documentElement.scrollTop) > document.documentElement.clientHeight * 0.5) {
            // TODO Please note we are scrolling by page here.
            if (scrollingUp) {
                div.innerHTML = "&DoubleUpArrow;";
                div.style.top = (lastScrollTop) + "px";
            } else {
                div.innerHTML = "&DoubleDownArrow;";
                div.style.top = (lastScrollTop + document.documentElement.clientHeight) + "px";
            }
        } else {
            // TODO Please note we are scrolling by line here.
            if (scrollingUp) {
                div.innerHTML = "&UpArrow;";
                div.style.top = (document.documentElement.scrollTop) + "px";
            } else {
                div.innerHTML = "&DownArrow;";
                div.style.top = (document.documentElement.scrollTop) + "px";
            }

        }
        document.body.appendChild(div);
        //         window.scrollTo(div.getBoundingClientRect().left, div.getBoundingClientRect().top);
        //        console.log(JSON.stringify(document.documentElement, [
        //            'clientHeight', 'clientLeft', 'clientTop', 'clientWidth',
        //            'scrollHeight', 'scrollLeft', 'scrollTop', 'scrollWidth'], 2));
        lastScrollTop = document.documentElement.scrollTop;
    }, true);
})();