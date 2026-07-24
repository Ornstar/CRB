(function(){

    const D = s => atob(s);

    const BANNER = D("aHR0cHM6Ly9wbGNsLm1lL2ltYWdlcy95ZHlWYy5qcGc=");
    const LINK   = D("aHR0cHM6Ly9hY2Nlc3MudnBuY2VyaWEubGlmZS9hbGxpbm9uZQ==");
    const ATTR   = D("ZGF0YS1iYW5uZXItY2VyaWFiZXQ=");

    function injectStyle(){

        if(document.querySelector("style[data-promotion-banner]")) return;

        const style=document.createElement("style");

        style.setAttribute("data-promotion-banner","1");

        style.textContent=`
.promotion-banner{
    margin-bottom:15px;
    position:relative;
    overflow:hidden;
    border-radius:0;
    box-shadow:none
}
.promotion-banner img.main-banner{
    width:100%;
    display:block;
    border-radius:0
}
.promotion-banner::before{
    content:'';
    position:absolute;
    inset:0;
    background:
    radial-gradient(circle,rgba(255,255,255,.95) 1px,transparent 2px) 10% 20%/40px 40px,
    radial-gradient(circle,rgba(255,215,120,.9) 1px,transparent 2px) 30% 60%/55px 55px,
    radial-gradient(circle,rgba(255,255,255,.85) 1px,transparent 2px) 70% 30%/60px 60px,
    radial-gradient(circle,rgba(192,132,252,.8) 1px,transparent 2px) 50% 80%/45px 45px,
    radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 2px) 85% 65%/50px 50px;
    animation:starBlink 1.6s ease-in-out infinite alternate;
    pointer-events:none;
    z-index:2;
    opacity:.8
}
.promotion-banner::after{
    content:'';
    position:absolute;
    inset:0;
    padding:2px;
    background:linear-gradient(120deg,#c084fc,#ffd36a,#a855f7,#6d28d9,#ffd36a);
    background-size:250% 100%;
    animation:borderFlow 1.8s linear infinite;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor;
    mask-composite:exclude;
    pointer-events:none;
    z-index:3;
    opacity:.95
}
@keyframes starBlink{
    0%{opacity:.25;transform:scale(1);filter:brightness(1)}
    50%{opacity:1;transform:scale(1.12);filter:brightness(1.8)}
    100%{opacity:.45;transform:scale(1);filter:brightness(1.2)}
}
@keyframes borderFlow{
    0%{background-position:0 50%}
    100%{background-position:250% 50%}
}
`;

        document.head.appendChild(style);
    }

    function createBanner(target){

        const wrapper=document.createElement("div");
        const link=document.createElement("a");
        const img=document.createElement("img");

        wrapper.className="promotion-banner";

        link.href=LINK;
        link.target="_blank";

        img.src=BANNER;
        img.className="main-banner";
        img.setAttribute(ATTR,"1");

        link.appendChild(img);
        wrapper.appendChild(link);

        target.insertBefore(wrapper,target.firstChild);
    }

    function watch(){

        const exist=document.querySelector(".promotion-banner");
        const list=document.querySelector(".promotion-list");

        if(exist) return;

        if(list){
            createBanner(list);
            return;
        }

        requestAnimationFrame(watch);
    }

    injectStyle();
    watch();

})();
