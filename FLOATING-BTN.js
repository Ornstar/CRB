(function(){

    const D = s => atob(s);

    const BTN_ID   = D("cGFydG5lci1wdXJwbGUtYnRu");
    const STYLE_ID = D("cGFydG5lci1nb2xkLXN0eWxl");

    const LINK = D(
        "aHR0cHM6Ly9nb3ZpcGxpbmsubGl2ZS9wNHN0MTV1NWs1ZXM="
    );

    const LOGO = D(
        "aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy9kYnNaSy5naWY="
    );

    const RIGHT  = 15;
    const BOTTOM = 96;
    const SIZE   = 50;

    function allowed(){

        const p = location.pathname
            .replace(/\/+$/,"")
            .toLowerCase();

        return p==="" || p==="/" || p.includes("home");
    }

    function injectStyle(){

        if(!allowed()) return;

        if(document.getElementById(STYLE_ID)) return;

        const style=document.createElement("style");

        style.id=STYLE_ID;

        style.textContent=`
#${BTN_ID}{
    position:fixed;
    right:${RIGHT}px;
    bottom:${BOTTOM}px;
    width:${SIZE}px;
    height:${SIZE}px;
    border-radius:50%;
    overflow:visible;
    z-index:999999;
    display:none
}
#${BTN_ID} img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    border-radius:50%
}
#${BTN_ID}::after{
    content:"1";
    position:absolute;
    top:-4px;
    right:-4px;
    width:14px;
    height:14px;
    background:#ff0033;
    color:#fff;
    font-size:9px;
    font-weight:900;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    border:2px solid #fff;
    box-shadow:0 0 4px rgba(255,0,51,.7);
    z-index:10
}
@media(max-width:768px){
    #${BTN_ID}{
        display:block
    }
}
`;

        document.head.appendChild(style);
    }

    function createButton(){

        if(!allowed()) return;

        if(document.getElementById(BTN_ID)) return;

        const hideUntil =
            localStorage.getItem("partnerBtnHideUntil");

        if(
            hideUntil &&
            Date.now() < parseInt(hideUntil)
        ){
            return;
        }

        const btn=document.createElement("a");

        btn.id=BTN_ID;
        btn.href=LINK;
        btn.target="_blank";
        btn.rel="noopener noreferrer";

        btn.innerHTML=
            `<img src="${LOGO}" alt="">`;

        document.body.appendChild(btn);
    }

    function init(){

        injectStyle();
        createButton();
    }

    if(document.readyState==="loading"){
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    }else{
        init();
    }

})();
