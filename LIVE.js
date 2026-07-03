"use strict";

(function () {

    function replaceLiveTv() {

        const btn = document.querySelector(".live-tv-button");
        if (!btn) return false;

        btn.style.setProperty(
            "--image-src",
            'url("https://www.image2url.com/r2/default/gifs/1783073015437-d083596a-dcf3-499f-a3cb-a2945e55a86c.gif")',
            "important"
        );

        btn.textContent = "";
        btn.style.fontSize = "0";
        btn.style.color = "transparent";
        btn.style.textIndent = "-9999px";
        btn.style.overflow = "hidden";

        return true;
    }

    function init() {

        let retry = 0;

        const timer = setInterval(function () {

            if (replaceLiveTv() || retry >= 40) {
                clearInterval(timer);
            }

            retry++;

        }, 500);

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
