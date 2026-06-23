(function () {

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
        .btn-atas{
            display:flex;
            justify-content:space-between;
            align-items:center;
            width:100%;
            padding:5px 8px;
            box-sizing:border-box;
            gap:6px
        }
        .btn-atas a{
            display:flex;
            justify-content:center;
            align-items:center;
            flex:1
        }
        .btn-atas a img{
            width:60px;
            height:60px;
            display:block;
            object-fit:contain
        }
    `;

    document.head.appendChild(css);

    let checker = setInterval(function () {

        const target = document.querySelector(D(0));

        if (!target || document.querySelector("." + D(1))) {
            return;
        }

        const box = document.createElement("div");

        box.className = D(1);

        box.innerHTML = `
            <a href="${D(2)}" target="_blank"><img src="${D(7)}"></a>
            <a href="${D(3)}" target="_blank"><img src="${D(8)}"></a>
            <a href="${D(4)}" target="_blank"><img src="${D(9)}"></a>
            <a href="${D(5)}" target="_blank"><img src="${D(10)}"></a>
            <a href="${D(6)}" target="_blank"><img src="${D(11)}"></a>
        `;

        target.parentNode.insertBefore(box, target);

        clearInterval(checker);

    }, 500);

})();
