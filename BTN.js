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

        @media (max-width: 480px) {
            .btn-atas {
                padding: 5px 4px;
                gap: 3px;
            }

            .btn-atas a img {
                width: 52px;
                height: 52px;
            }
        }
    `;

    document.head.appendChild(css);

    let checker = setInterval(function () {
        const banner = document.querySelector(".banner-img");
        const jackpotSection = document.querySelector(
            ".jackpot-play-section"
        );

        const existingBox = document.querySelector("." + D(1));

        if (existingBox) {
            clearInterval(checker);
            return;
        }

        if (!banner || !jackpotSection) {
            return;
        }

        const box = document.createElement("div");
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

        // Masukkan tombol tepat di atas jackpot-play-section
        jackpotSection.parentNode.insertBefore(
            box,
            jackpotSection
        );

        clearInterval(checker);
    }, 500);

    // Mencegah interval berjalan terus apabila elemen tidak ditemukan
    setTimeout(function () {
        clearInterval(checker);
    }, 30000);
})();
