"use strict";

(function () {

    function replaceLiveTv() {

        const btn = document.querySelector(".live-tv-button");
        if (!btn) return false;

        btn.style.setProperty(
            "--image-src",
            'url("https://plcl.me/images/WTicQ.gif")',
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
