"use strict";

(function () {
  const STYLE_ID = "crb-ai-style-final-v3";
  const BTN_ID = "crb-ai-btn-final-v3";
  const MODAL_ID = "crb-ai-modal-final-v3";

  const LINK = "https://access.vpnceria.life/prediksi-bola";
  const LOGO = "https://plcl.me/images/2rkpt.png";
  const GENERATE_GIF = "https://www.image2url.com/r2/default/gifs/1783499727684-7bf03515-d569-4857-9129-a838c5b78831.gif";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const s = document.createElement("style");
    s.id = STYLE_ID;

    s.textContent = `
      #${BTN_ID}{
        width:100%;
        margin:10px 0 0 0;
        padding:10px 12px;
        background:
          linear-gradient(
            180deg,
            #8b2484 0%,
            #77146f 18%,
            #6a0d63 40%,
            #5b0957 65%,
            #460442 100%
          );
        display:flex;
        align-items:center;
        justify-content:space-between;
        cursor:pointer;
        box-sizing:border-box;
        color:#fff;
        font-family:inherit;
        font-size:14px;
        font-weight:500;
        line-height:1.3;
        letter-spacing:0;
        text-transform:none;
        border:none;
        border-top:1px solid rgba(255,255,255,.18);
        border-bottom:1px solid rgba(0,0,0,.45);
        outline:none;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.10),
          inset 0 -1px 0 rgba(0,0,0,.35),
          0 1px 2px rgba(0,0,0,.35);
        position:relative;
        overflow:hidden;
        -webkit-tap-highlight-color:transparent;
        user-select:none;
      }

      #${BTN_ID}:before{
        content:"";
        position:absolute;
        left:0;
        right:0;
        top:0;
        height:1px;
        background:rgba(255,255,255,.25);
        pointer-events:none;
      }

      #${BTN_ID}:active{
        opacity:.88;
      }

      .crb-ai-left{
        display:flex;
        align-items:center;
        gap:8px;
        min-width:0;
        flex:1 1 auto;
        position:relative;
        z-index:2;
      }

      .crb-ai-left img{
        width:23px;
        height:23px;
        object-fit:contain;
        flex:0 0 auto;
        display:block;
      }

      .crb-ai-left span{
        display:block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        font-family:inherit;
        font-size:14px;
        font-weight:500;
        color:#fff;
      }

      .crb-ai-generate{
        display:flex;
        align-items:center;
        justify-content:center;
        flex:0 0 auto;
        margin-left:10px;
        position:relative;
        z-index:2;
      }

      .crb-ai-generate img{
        width:70px;
        height:26px;
        object-fit:cover;
        display:block;
        border-radius:20px;
      }

      #${MODAL_ID}{
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        z-index:2147483647;
        background:#000;
        display:none;
        overflow:hidden;
      }

      #${MODAL_ID}.show{
        display:block;
      }

      .crb-ai-close{
        position:fixed;
        top:10px;
        right:10px;
        width:38px;
        height:38px;
        border-radius:50%;
        background:linear-gradient(180deg,#a855f7,#3b0764);
        color:#fff;
        border:1px solid #e9d5ff;
        font-size:23px;
        font-weight:900;
        cursor:pointer;
        z-index:2147483647;
        box-shadow:0 0 16px rgba(168,85,247,.9),0 6px 18px rgba(0,0,0,.6);
        display:flex;
        align-items:center;
        justify-content:center;
        line-height:1;
        -webkit-tap-highlight-color:transparent;
      }

      .crb-ai-close:active{
        transform:scale(.94);
      }

      .crb-ai-frame{
        width:100%;
        height:100%;
        border:0;
        display:block;
        background:#000;
      }

      .crb-ai-loader{
        position:fixed;
        inset:0;
        z-index:2147483646;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#000;
        color:#fff;
        font-family:inherit;
        font-size:14px;
        font-weight:600;
      }

      .crb-ai-loader:before{
        content:"";
        width:34px;
        height:34px;
        border-radius:50%;
        border:3px solid rgba(255,255,255,.25);
        border-top-color:#a855f7;
        margin-right:10px;
        animation:crbAiSpin .8s linear infinite;
      }

      @keyframes crbAiSpin{
        to{transform:rotate(360deg)}
      }

      @media(max-width:480px){
        #${BTN_ID}{
          padding:9px 10px;
          font-size:13px;
        }

        .crb-ai-left img{
          width:22px;
          height:22px;
        }

        .crb-ai-left span{
          font-size:13px;
        }

        .crb-ai-generate img{
          width:86px;
          height:28px;
        }

        .crb-ai-close{
          width:36px;
          height:36px;
          font-size:22px;
        }
      }
    `;

    document.head.appendChild(s);
  }

  function createButton() {
    if (document.getElementById(BTN_ID)) return;

    const mainMenu = document.querySelector("#main_menu_outer_container");
    if (!mainMenu) return;

    injectStyle();

    const btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.innerHTML = `
      <div class="crb-ai-left">
        <img src="${LOGO}" alt="">
        <span>PREDIKSI BOLA AI GENERATE</span>
      </div>

      <div class="crb-ai-generate">
        <img src="${GENERATE_GIF}" alt="">
      </div>
    `;

    mainMenu.parentNode.insertBefore(btn, mainMenu);

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.innerHTML = `
      <div class="crb-ai-loader">Loading...</div>
      <button type="button" class="crb-ai-close">×</button>
      <iframe class="crb-ai-frame" src="" allowfullscreen></iframe>
    `;

    document.body.appendChild(modal);

    const frame = modal.querySelector(".crb-ai-frame");
    const close = modal.querySelector(".crb-ai-close");
    const loader = modal.querySelector(".crb-ai-loader");

    function openModal() {
      loader.style.display = "flex";
      frame.src = LINK;
      modal.classList.add("show");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("show");
      frame.src = "";
      loader.style.display = "flex";
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    btn.onclick = openModal;

    btn.onkeydown = function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    };

    frame.onload = function () {
      loader.style.display = "none";
    };

    close.onclick = closeModal;

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
  }

  function init() {
    let count = 0;

    const timer = setInterval(function () {
      createButton();
      count++;

      if (document.getElementById(BTN_ID) || count >= 60) {
        clearInterval(timer);
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
