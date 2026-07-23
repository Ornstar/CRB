"use strict";

(function () {
  const IMG = [
    "https://www.image2url.com/r2/default/images/1784828945587-80ca61d9-21ce-42e2-b295-0df6497cae7a.png",
    "https://www.image2url.com/r2/default/images/1784827511825-7081b9d5-7acc-407d-8d19-b5ed7bce4f1c.png",
    "https://www.image2url.com/r2/default/images/1784827651280-ad6dc56d-34eb-4680-b371-61679a3aac55.png",
    "https://www.image2url.com/r2/default/images/1784827613114-a68cb2cf-7d1c-4996-a135-0ed6363d0b98.png"
  ];

  const DELAY_KEY = "popup_delay_1h";
  const SLIDER_INTERVAL = 10000;
  const STYLE_ID = "crb-popup-style";
  const POPUP_ID = "crb-popup";
  const OVERLAY_ID = "crb-popup-overlay";

  let popupCreated = false;
  let currentIndex = 0;
  let sliderTimer = null;
  let changingSlide = false;

  /* ==============================
     CEK HALAMAN
  ============================== */

  function isAllowedPage() {
    const path = location.pathname
      .replace(/\/+$/, "")
      .toLowerCase();

    return (
      path === "" ||
      path === "/" ||
      path.includes("home")
    );
  }

  function canShowPopup() {
    if (!isAllowedPage()) return false;

    const lastClosed = Number(
      localStorage.getItem(DELAY_KEY) || 0
    );

    return !(
      lastClosed &&
      Date.now() - lastClosed < 3600000
    );
  }

  /* ==============================
     PRELOAD SEMUA GAMBAR SLIDER
  ============================== */

  function preloadImages() {
    IMG.forEach(function (url) {
      const preload = new Image();
      preload.src = url;
    });
  }

  /* ==============================
     CSS
  ============================== */

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      @keyframes crbFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes crbFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      @keyframes crbSlideIn {
        from {
          transform: translateY(25px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes crbSlideOut {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(25px);
          opacity: 0;
        }
      }

      @keyframes crbShine {
        0% { left: -40%; }
        100% { left: 125%; }
      }

      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        background:
          linear-gradient(
            180deg,
            rgba(0, 0, 0, .35),
            rgba(0, 0, 0, .82)
          );
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        animation: crbFadeIn .35s ease forwards;
      }

      #${OVERLAY_ID}.fade-out {
        animation: crbFadeOut .35s ease forwards;
      }

      #${POPUP_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        box-sizing: border-box;
      }

      #crb-popup-box {
        position: relative;
        animation: crbSlideIn .45s ease forwards;
        filter:
          drop-shadow(0 18px 40px rgba(0, 0, 0, .6));
      }

      #crb-popup-box.slide-out {
        animation: crbSlideOut .45s ease forwards;
      }

      #crb-close {
        position: absolute;
        top: -12px;
        right: -12px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background:
          linear-gradient(
            180deg,
            #a855f7,
            #4c1d95 60%,
            #111
          );
        color: #fff;
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        border: 1px solid #c084fc;
        box-shadow:
          0 0 16px rgba(168, 85, 247, .7);
      }

      #crb-popup-img {
        display: block;
        max-width: 92vw;
        max-height: 58vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 12px;
        opacity: 1;
        transition: opacity .3s ease;
        box-shadow:
          0 0 22px rgba(168, 85, 247, .45),
          0 0 45px rgba(91, 33, 182, .35);
      }

      #crb-popup-img.fade {
        opacity: 0;
      }

      .crb-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #c084fc;
        background:
          linear-gradient(
            180deg,
            #7c3aed,
            #2e1065
          );
        color: #fff;
        font-size: 24px;
        font-weight: 900;
        cursor: pointer;
        z-index: 9998;
        line-height: 22px;
        box-shadow:
          0 0 14px rgba(168, 85, 247, .55);
      }

      #crb-prev {
        left: 8px;
      }

      #crb-next {
        right: 8px;
      }

      #crb-dots {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        z-index: 9998;
        padding: 5px 8px;
        border-radius: 20px;
        background: rgba(0, 0, 0, .25);
      }

      .crb-dot {
        width: 8px;
        height: 8px;
        min-width: 8px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, .5);
        padding: 0;
        cursor: pointer;
        transition:
          transform .2s ease,
          background .2s ease;
      }

      .crb-dot.active {
        background: #a855f7;
        transform: scale(1.3);
        box-shadow: 0 0 10px #a855f7;
      }

      #crb-title {
        font-weight: 900;
        font-size: 16px;
        color: #d8b4fe;
        letter-spacing: 2px;
        text-shadow:
          0 0 10px rgba(168, 85, 247, .9),
          0 0 25px rgba(168, 85, 247, .55);
      }

      .crb-gif-row {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
      }

      .crb-gif-box {
        position: relative;
        width: 90px;
      }

      .crb-gif-box img {
        display: block;
        width: 100%;
        border-radius: 12px;
        pointer-events: none;
        box-shadow:
          0 0 10px rgba(168, 85, 247, .35);
      }

      .crb-btn-row {
        width: 310px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
      }

      .crb-btn,
      .crb-ok {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        font-weight: 900;
        color: #fff !important;
        transition:
          transform .18s ease,
          filter .18s ease;
      }

      .crb-btn {
        width: 148px;
        padding: 12px 0;
        border-radius: 15px;
        font-size: 12px;
        white-space: nowrap;
        text-decoration: none;
        letter-spacing: .5px;
        background:
          linear-gradient(
            180deg,
            #8b5cf6 0%,
            #6d28d9 30%,
            #3b0764 70%,
            #111 100%
          );
        border: 1px solid #c084fc;
        box-shadow:
          0 0 12px rgba(139, 92, 246, .7),
          0 0 28px rgba(139, 92, 246, .38),
          0 9px 22px rgba(0, 0, 0, .55),
          inset 0 1px 0 rgba(255, 255, 255, .2);
      }

      .crb-ok {
        width: 120px;
        padding: 11px 0;
        border-radius: 14px;
        font-size: 14px;
        background:
          linear-gradient(
            180deg,
            #a855f7 0%,
            #6d28d9 38%,
            #3b0764 75%,
            #111 100%
          );
        border: 1px solid #d8b4fe;
        box-shadow:
          0 0 12px rgba(168, 85, 247, .8),
          0 0 25px rgba(168, 85, 247, .45),
          0 8px 20px rgba(0, 0, 0, .5),
          inset 0 1px 0 rgba(255, 255, 255, .2);
      }

      .crb-btn:hover,
      .crb-ok:hover {
        transform: scale(1.045);
        filter: brightness(1.18);
      }

      .crb-btn:active,
      .crb-ok:active {
        transform: scale(.96);
      }

      .crb-btn::before,
      .crb-ok::before {
        content: "";
        position: absolute;
        top: 0;
        left: -40%;
        width: 25%;
        height: 100%;
        background:
          linear-gradient(
            120deg,
            rgba(255, 255, 255, 0),
            rgba(216, 180, 254, .95),
            rgba(255, 255, 255, 0)
          );
        transform: skewX(-25deg);
        animation: crbShine 2s infinite;
      }

      @media (max-width: 768px) {
        #${POPUP_ID} {
          gap: 8px;
        }

        #crb-popup-img {
          max-width: 94vw;
          max-height: 55vh;
        }

        .crb-gif-box {
          width: 78px;
        }

        .crb-btn-row {
          width: 310px;
          gap: 8px;
        }

        .crb-btn {
          width: 148px;
          font-size: 12px;
          padding: 11px 0;
        }

        .crb-ok {
          width: 115px;
          font-size: 13px;
          padding: 10px 0;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* ==============================
     BUAT POPUP
  ============================== */

  function createPopup() {
    if (
      popupCreated ||
      !canShowPopup() ||
      !document.body
    ) {
      return;
    }

    popupCreated = true;

    preloadImages();
    injectStyle();

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;

    const popup = document.createElement("div");
    popup.id = POPUP_ID;

    popup.innerHTML = `
      <div id="crb-popup-box">

        <div id="crb-close" title="Tutup">
          ✕
        </div>

        <button
          type="button"
          class="crb-nav"
          id="crb-prev"
          aria-label="Gambar sebelumnya"
        >
          ‹
        </button>

        <img
          id="crb-popup-img"
          src="${IMG[0]}"
          alt="World Cup 2026 Slide 1"
        >

        <button
          type="button"
          class="crb-nav"
          id="crb-next"
          aria-label="Gambar berikutnya"
        >
          ›
        </button>

        <div id="crb-dots"></div>
      </div>

      <div id="crb-title">
        WORLD CUP 2026
      </div>

      <div class="crb-gif-row">

        <div class="crb-gif-box">
          <img
            src="https://media.tenor.com/ky4lyYmnHlsAAAAM/starlight-princess-slot-inces.gif"
            alt="Starlight Princess"
          >
        </div>

        <div class="crb-gif-box">
          <img
            src="https://media.tenor.com/Hm5Hk1U_uVoAAAAd/fifa-world-cup-2026-fifa.gif"
            alt="FIFA World Cup 2026"
          >
        </div>

        <div class="crb-gif-box">
          <img
            src="https://imgcdn.it.com/knb2zump50st9c6kzrne/VIP_AI88/lucky_neko.webp"
            alt="Lucky Neko"
          >
        </div>

      </div>

      <div class="crb-btn-row">

        <a
          class="crb-btn"
          href="https://access.vpnceria.life/allinone"
          target="_blank"
          rel="noopener noreferrer"
        >
          ⚽ ALL IN ONE
        </a>

        <a
          class="crb-btn"
          href="https://access.vpnceria.life/prediksi-bola"
          target="_blank"
          rel="noopener noreferrer"
        >
          PREDIKSI BOLA ⚽
        </a>

        <button
          type="button"
          class="crb-ok"
          id="crb-ok"
        >
          OK
        </button>

      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    const popupBox =
      document.getElementById("crb-popup-box");

    const sliderImage =
      document.getElementById("crb-popup-img");

    const dotsContainer =
      document.getElementById("crb-dots");

    /* ==============================
       BUAT 4 DOT SLIDER
    ============================== */

    function renderDots() {
      dotsContainer.innerHTML = "";

      IMG.forEach(function (_, imageIndex) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className =
          "crb-dot" +
          (imageIndex === currentIndex ? " active" : "");

        dot.setAttribute(
          "aria-label",
          "Tampilkan gambar " + (imageIndex + 1)
        );

        dot.addEventListener("click", function () {
          changeSlide(imageIndex);
          resetSliderTimer();
        });

        dotsContainer.appendChild(dot);
      });
    }

    /* ==============================
       PINDAH GAMBAR
    ============================== */

    function changeSlide(newIndex) {
      if (changingSlide) return;

      if (
        newIndex < 0 ||
        newIndex >= IMG.length
      ) {
        return;
      }

      if (newIndex === currentIndex) return;

      changingSlide = true;
      sliderImage.classList.add("fade");

      const newImage = new Image();
      newImage.src = IMG[newIndex];

      function showNewImage() {
        currentIndex = newIndex;

        sliderImage.src = IMG[currentIndex];
        sliderImage.alt =
          "World Cup 2026 Slide " + (currentIndex + 1);

        renderDots();

        requestAnimationFrame(function () {
          sliderImage.classList.remove("fade");
          changingSlide = false;
        });
      }

      newImage.onload = function () {
        setTimeout(showNewImage, 200);
      };

      newImage.onerror = function () {
        console.warn(
          "Gambar slider gagal dimuat:",
          IMG[newIndex]
        );

        sliderImage.classList.remove("fade");
        changingSlide = false;
      };

      if (newImage.complete) {
        setTimeout(showNewImage, 200);
      }
    }

    function nextSlide() {
      const nextIndex =
        (currentIndex + 1) % IMG.length;

      changeSlide(nextIndex);
    }

    function previousSlide() {
      const previousIndex =
        (currentIndex - 1 + IMG.length) % IMG.length;

      changeSlide(previousIndex);
    }

    function startSliderTimer() {
      clearInterval(sliderTimer);

      sliderTimer = setInterval(function () {
        nextSlide();
      }, SLIDER_INTERVAL);
    }

    function resetSliderTimer() {
      startSliderTimer();
    }

    /* ==============================
       TUTUP POPUP
    ============================== */

    function closePopup() {
      clearInterval(sliderTimer);

      popupBox.classList.add("slide-out");
      overlay.classList.add("fade-out");

      localStorage.setItem(
        DELAY_KEY,
        String(Date.now())
      );

      setTimeout(function () {
        popup.remove();
        overlay.remove();
      }, 450);
    }

    /* ==============================
       EVENT
    ============================== */

    document
      .getElementById("crb-next")
      .addEventListener("click", function () {
        nextSlide();
        resetSliderTimer();
      });

    document
      .getElementById("crb-prev")
      .addEventListener("click", function () {
        previousSlide();
        resetSliderTimer();
      });

    document
      .getElementById("crb-close")
      .addEventListener("click", closePopup);

    document
      .getElementById("crb-ok")
      .addEventListener("click", closePopup);

    /* Tampilan awal menghasilkan 4 titik */
    renderDots();

    /* Jalankan slider otomatis */
    startSliderTimer();
  }

  /* ==============================
     INIT
  ============================== */

  function init() {
    let retry = 0;

    const checkBody = setInterval(function () {
      createPopup();
      retry++;

      if (popupCreated || retry >= 40) {
        clearInterval(checkBody);
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
