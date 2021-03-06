window.addEventListener('DOMContentLoaded',
function() {
    prompt('domc:' + window.app.getCurrentTime());
})

window.addEventListener('load',
function() {
    prompt('load:' + window.app.getCurrentTime());
})

window.addEventListener('DOMContentLoaded',
function() {
    first_screen();
})

function first_screen() {
    var imgs = document.getElementsByTagName("img"),
    fs = +window.app.getCurrentTime();
    var fsItems = [],
    that = this;
    function getOffsetTop(elem) {
        var top = 0;
        top = window.pageYOffset ? window.pageYOffset: document.documentElement.scrollTop;
        try {
            top += elem.getBoundingClientRect().top;
        } catch(e) {
    } finally {
            return top;
        }
    }
    var loadEvent = function() {
        //gif避免
        if (this.removeEventListener) {
            this.removeEventListener("load", loadEvent, false);
        }
        fsItems.push({
            img: this,
            time: window.app.getCurrentTime()
        });
    }
    for (var i = 0; i < imgs.length; i++) { (function() {
            var img = imgs[i];
            if (img.addEventListener) {
                ! img.complete && img.addEventListener("load", loadEvent, false);
            } else if (img.attachEvent) {
                img.attachEvent("onreadystatechange",
                function() {
                    if (img.readyState == "complete") {
                        loadEvent.call(img, loadEvent);
                    }
                });
            }
        })();
    }
    function firstscreen_time() {
        var sh = document.documentElement.clientHeight;
        for (var i = 0; i < fsItems.length; i++) {
            var item = fsItems[i],
            img = item['img'],
            time = item['time'],
            top = getOffsetTop(img);
            if (top > 0 && top < sh) {
                fs = time > fs ? time: fs;
            }
        }
        return fs;
    }
    window.addEventListener('load',
    function() {
        prompt('firstscreen:' + firstscreen_time());
    });
}