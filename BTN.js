(function () {
    "use strict";

    const _b64 = [
        "LndpZGdldC10aXRsZS1jb250YWluZXI=",
        "YnRuLWF0YXM=",
        "aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS9jcmIz",
        "aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS90ZWxlZ3JhbWNoYXQ=",
        "aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS9ydHAtZ2Fjb3ItY2VyaWFiZXQ=",
        "aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS9saXZlc2NvcmU=",
        "aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS9wb2xpY2VjcmI=",
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy9aeEtqei5naWY=",
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy9ma0ZvRi5naWY=",
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy9NTHdKTS5naWY=",
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy90WXZLUS5naWY=",
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy9jc3hVNy5naWY="
    ];

    const D = i => atob(_b64[i]);
    const MOBILE_BREAKPOINT = 480;

    const css = document.createElement("style");

    css.textContent = `
        .btn-atas {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            align-items: center;
            width: 100%;
            padding: 6px 8px;
            margin: 6px 0;
            box-sizing: border-box;
            gap: 6px;
        }

        .btn-atas a {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 0;
            text-decoration: none;
        }

        .btn-atas a img {
            display: block;
            width: 60px;
            max-width: 100%;
            height: 60px;
            object-fit: contain;
            border: 0;
        }

        @media (min-width: 481px) {
            .btn-atas {
                position: relative;
                z-index: 5;
                max-width: 1200px;
                margin: 8px auto;
                padding: 8px 12px;
            }
        }

        @media (max-width: 480px) {
            .btn-atas {
                padding: 5px 4px;
                margin: 6px 0;
                gap: 3px;
            }

            .btn-atas a img {
                width: 52px;
                height: 52px;
            }
        }
    `;

    document.head.appendChild(css);

    function createButtonBox() {
        let box = document.querySelector("." + D(1));

        if (box) {
            return box;
        }

        box = document.createElement("div");
        box.className = D(1);

        box.innerHTML = `
            <a href="${D(2)}" target="_blank" rel="noopener noreferrer">
                <img src="${D(7)}" alt="CERIABET">
            </a>

            <a href="${D(3)}" target="_blank" rel="noopener noreferrer">
                <img src="${D(8)}" alt="Telegram">
            </a>

            <a href="${D(4)}" target="_blank" rel="noopener noreferrer">
                <img src="${D(9)}" alt="RTP CERIABET">
            </a>

            <a href="${D(5)}" target="_blank" rel="noopener noreferrer">
                <img src="${D(10)}" alt="Live Score">
            </a>

            <a href="${D(6)}" target="_blank" rel="noopener noreferrer">
                <img src="${D(11)}" alt="CERIABET">
            </a>
        `;

        return box;
    }

    function placeButtonBox() {
        const box = createButtonBox();
        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

        if (isMobile) {
            // MOBILE:
            // Tetap berada tepat di atas jackpot-play-section.
            const jackpotSection = document.querySelector(
                ".jackpot-play-section"
            );

            if (!jackpotSection || !jackpotSection.parentNode) {
                return false;
            }

            if (box.nextElementSibling !== jackpotSection) {
                jackpotSection.parentNode.insertBefore(
                    box,
                    jackpotSection
                );
            }

            return true;
        }

        // DESKTOP:
        // Berada di bawah announcement-outer-container
        // dan di atas home-inner-container.
        const announcementOuter = document.querySelector(
            ".announcement-outer-container"
        );

        const homeInner = document.querySelector(
            ".home-inner-container"
        );

        if (!announcementOuter || !homeInner) {
            return false;
        }

        /*
         * Apabila announcement dan home-inner berada pada parent
         * yang sama, masukkan tombol tepat sebelum home-inner.
         */
        if (
            announcementOuter.parentNode &&
            announcementOuter.parentNode === homeInner.parentNode
        ) {
            if (box.nextElementSibling !== homeInner) {
                homeInner.parentNode.insertBefore(box, homeInner);
            }

            return true;
        }

        /*
         * Fallback apabila struktur parent berbeda:
         * masukkan tombol tepat setelah announcement.
         */
        if (announcementOuter.parentNode) {
            announcementOuter.insertAdjacentElement("afterend", box);
            return true;
        }

        return false;
    }

    let checker = setInterval(function () {
        const success = placeButtonBox();

        if (success) {
            clearInterval(checker);
        }
    }, 500);

    // Atur ulang posisi ketika ukuran layar berubah
    let resizeTimer;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            placeButtonBox();
        }, 150);
    });

    // Coba kembali apabila isi halaman dimuat secara dinamis
    const observer = new MutationObserver(function () {
        const box = document.querySelector("." + D(1));

        if (!box) {
            placeButtonBox();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Hentikan interval setelah 30 detik
    setTimeout(function () {
        clearInterval(checker);
    }, 30000);
})();
