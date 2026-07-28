<script>
(() => {
  "use strict";

  const STYLE_ID = "ceriabet-footer-fix-v2";
  const LABEL_CLASS = "ceriabet-center-label";

  const css = `
    @keyframes ceriabetFooterSpinV2 {
      to { transform: rotate(360deg); }
    }

    body {
      padding-bottom: calc(92px + env(safe-area-inset-bottom, 0px)) !important;
    }

    footer.site-footer {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 2147483000 !important;
      min-height: 74px !important;
      padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px)) !important;
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      align-items: end !important;
      gap: 6px !important;
      overflow: visible !important;
      background: linear-gradient(180deg, #4c0a59 0%, #25022f 100%) !important;
      border-top: 1px solid rgba(231, 73, 255, .45) !important;
      box-shadow: 0 -8px 24px rgba(0, 0, 0, .45) !important;
      box-sizing: border-box !important;
    }

    footer.site-footer > a {
      position: relative !important;
      min-width: 0 !important;
      width: 100% !important;
      height: 56px !important;
      min-height: 56px !important;
      padding: 6px 3px !important;
      margin: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 3px !important;
      border: 1px solid rgba(179, 91, 209, .72) !important;
      border-radius: 13px !important;
      background: rgba(18, 3, 27, .72) !important;
      color: #d7c6e2 !important;
      box-shadow: inset 0 0 8px rgba(173, 52, 224, .08) !important;
      text-align: center !important;
      text-decoration: none !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      isolation: isolate !important;
    }

    footer.site-footer > a[data-active="true"] {
      color: #ff42dc !important;
      border-color: #d82eff !important;
      box-shadow: inset 0 0 10px rgba(216, 46, 255, .18) !important;
    }

    footer.site-footer > a img,
    footer.site-footer > a svg,
    footer.site-footer > a i {
      position: relative !important;
      z-index: 3 !important;
      width: 21px !important;
      height: 21px !important;
      max-width: 21px !important;
      max-height: 21px !important;
      margin: 0 !important;
      object-fit: contain !important;
    }

    footer.site-footer > a,
    footer.site-footer > a span,
    footer.site-footer > a div,
    footer.site-footer > a small {
      font-size: 9px !important;
      line-height: 1.05 !important;
      white-space: nowrap !important;
    }

    footer.site-footer > a.ceriabet-center-btn {
      width: 66px !important;
      min-width: 66px !important;
      max-width: 66px !important;
      height: 66px !important;
      min-height: 66px !important;
      padding: 8px 4px !important;
      justify-self: center !important;
      align-self: start !important;
      transform: translateY(-19px) !important;
      border: 0 !important;
      border-radius: 50% !important;
      background: #24022f !important;
      color: #ff72ed !important;
      overflow: hidden !important;
      box-shadow: 0 8px 18px rgba(0, 0, 0, .45), 0 0 14px rgba(202, 45, 255, .26) !important;
    }

    footer.site-footer > a.ceriabet-center-btn::before {
      content: "" !important;
      position: absolute !important;
      inset: -26px !important;
      z-index: 0 !important;
      border-radius: 50% !important;
      background: conic-gradient(
        #4b076d 0deg,
        #7c20ff 55deg,
        #f066ff 115deg,
        #b72cff 175deg,
        #6c1aff 240deg,
        #ff70eb 305deg,
        #4b076d 360deg
      ) !important;
      animation: ceriabetFooterSpinV2 3s linear infinite !important;
      pointer-events: none !important;
    }

    footer.site-footer > a.ceriabet-center-btn::after {
      content: "" !important;
      position: absolute !important;
      inset: 3px !important;
      z-index: 1 !important;
      border-radius: 50% !important;
      background: radial-gradient(circle at 50% 30%, #4b0b60 0%, #260330 58%, #190020 100%) !important;
      box-shadow: inset 0 0 10px rgba(231, 83, 255, .14) !important;
      pointer-events: none !important;
    }

    footer.site-footer > a.ceriabet-center-btn > * {
      position: relative !important;
      z-index: 3 !important;
    }

    footer.site-footer > a.ceriabet-center-btn img,
    footer.site-footer > a.ceriabet-center-btn svg,
    footer.site-footer > a.ceriabet-center-btn i {
      width: 24px !important;
      height: 24px !important;
      max-width: 24px !important;
      max-height: 24px !important;
    }

    footer.site-footer > a.ceriabet-center-btn .${LABEL_CLASS} {
      position: relative !important;
      z-index: 3 !important;
      display: block !important;
      margin: 0 !important;
      color: #ff8bf2 !important;
      font-size: 9px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      pointer-events: none !important;
    }

    @media (min-width: 769px) {
      footer.site-footer {
        max-width: 450px !important;
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
      }
    }
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    if (style.textContent !== css) style.textContent = css;
  }

  function getCenterButton(footer) {
    return (
      footer.querySelector('a[data-require-login="/mobile/deposit"]') ||
      footer.querySelector('a[data-require-login*="deposit"]') ||
      footer.querySelector('a[href="/mobile/deposit"]') ||
      footer.querySelector('a[href*="/mobile/deposit"]') ||
      footer.querySelectorAll("a")[2] ||
      null
    );
  }

  function cleanDirectText(anchor) {
    Array.from(anchor.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.remove();
      }
    });
  }

  function updateFooter() {
    installStyle();

    const footer = document.querySelector("footer.site-footer, .site-footer");
    if (!footer) return false;

    const center = getCenterButton(footer);
    if (!center) return false;

    center.classList.add("ceriabet-center-btn");

    const loginRequired = center.hasAttribute("data-require-login");
    const href = (center.getAttribute("href") || "").toLowerCase();
    const labelText = !loginRequired && href.includes("/mobile/deposit")
      ? "Depo/WD"
      : "Masuk";

    cleanDirectText(center);

    let label = center.querySelector(`.${LABEL_CLASS}`);
    if (!label) {
      label = document.createElement("span");
      label.className = LABEL_CLASS;
      center.appendChild(label);
    }

    if (label.textContent !== labelText) label.textContent = labelText;

    return true;
  }

  let timer = 0;
  function scheduleUpdate() {
    clearTimeout(timer);
    timer = setTimeout(updateFooter, 60);
  }

  installStyle();
  updateFooter();

  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "data-require-login", "data-active", "class"]
  });

  let attempts = 0;
  const finder = setInterval(() => {
    updateFooter();
    attempts += 1;
    if (attempts >= 120) clearInterval(finder);
  }, 500);

  window.addEventListener("load", updateFooter);
  window.addEventListener("resize", scheduleUpdate);
})();
</script>
