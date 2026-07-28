<script>
(() => {
  const STYLE_ID = "ceriabet-footer-purple-style";
  const READY_FLAG = "data-ceriabet-footer-ready";

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      @property --ceriabet-footer-angle {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }

      @keyframes ceriabetFooterRotate {
        from { --ceriabet-footer-angle: 0deg; }
        to { --ceriabet-footer-angle: 360deg; }
      }

      .site-footer {
        position: fixed !important;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        display: grid !important;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;
        align-items: end;
        padding: 8px 10px calc(10px + env(safe-area-inset-bottom,0px));
        min-height: 76px;
        background: linear-gradient(180deg, #4a0d59 0%, #2a0436 100%) !important;
        border-top: 1px solid rgba(206, 98, 255, 0.28);
        box-shadow: 0 -8px 24px rgba(0,0,0,.45);
        overflow: visible !important;
      }

      .site-footer a {
        position: relative !important;
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 56px;
        padding: 6px 4px !important;
        border-radius: 16px !important;
        background: rgba(255,255,255,0.03) !important;
        color: #d8c9e6 !important;
        text-decoration: none !important;
        overflow: hidden;
        isolation: isolate;
        box-sizing: border-box;
        transition: transform .2s ease, filter .2s ease;
      }

      .site-footer a::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.03));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        opacity: .45;
      }

      .site-footer a img,
      .site-footer a svg,
      .site-footer a i {
        width: 20px !important;
        height: 20px !important;
        margin-bottom: 4px;
        position: relative;
        z-index: 2;
      }

      .site-footer a,
      .site-footer a span,
      .site-footer a small,
      .site-footer a div {
        font-size: 10px !important;
        line-height: 1.1 !important;
        text-align: center !important;
        white-space: nowrap;
      }

      .site-footer a > * {
        position: relative;
        z-index: 2;
      }

      .site-footer a[data-active="true"] {
        color: #ff5cff !important;
      }

      .site-footer a:hover {
        transform: translateY(-1px);
      }

      .site-footer .ceriabet-footer-center,
      .site-footer a[data-require-login],
      .site-footer a[href*="/mobile/deposit"] {
        width: 64px !important;
        min-width: 64px !important;
        max-width: 64px !important;
        height: 64px !important;
        min-height: 64px !important;
        justify-self: center;
        align-self: start;
        transform: translateY(-18px);
        border-radius: 50% !important;
        background: radial-gradient(circle at 50% 35%, rgba(143, 47, 210, .25), rgba(38, 9, 60, .96) 65%) !important;
        box-shadow: 0 8px 20px rgba(0,0,0,.35), 0 0 16px rgba(217, 70, 239, .20);
        padding: 8px 4px !important;
      }

      .site-footer .ceriabet-footer-center::before,
      .site-footer a[data-require-login]::before,
      .site-footer a[href*="/mobile/deposit"]::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        padding: 2px;
        background: conic-gradient(
          from var(--ceriabet-footer-angle),
          #52107d 0deg,
          #8d2cff 60deg,
          #ff73ff 120deg,
          #cf3fff 180deg,
          #7b1fff 245deg,
          #46106b 315deg,
          #52107d 360deg
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: ceriabetFooterRotate 3.6s linear infinite;
        pointer-events: none;
        opacity: 1;
      }

      .site-footer .ceriabet-footer-center::after,
      .site-footer a[data-require-login]::after,
      .site-footer a[href*="/mobile/deposit"]::after {
        content: "";
        position: absolute;
        inset: 6px;
        border-radius: 50%;
        background: radial-gradient(circle at 50% 30%, rgba(255,255,255,.10), rgba(118, 28, 177, .06) 42%, transparent 72%);
        pointer-events: none;
      }

      .site-footer .ceriabet-footer-center img,
      .site-footer .ceriabet-footer-center svg,
      .site-footer .ceriabet-footer-center i,
      .site-footer a[data-require-login] img,
      .site-footer a[data-require-login] svg,
      .site-footer a[data-require-login] i,
      .site-footer a[href*="/mobile/deposit"] img,
      .site-footer a[href*="/mobile/deposit"] svg,
      .site-footer a[href*="/mobile/deposit"] i {
        width: 24px !important;
        height: 24px !important;
        margin-bottom: 3px;
      }

      .site-footer .ceriabet-footer-center *,
      .site-footer a[data-require-login] *,
      .site-footer a[href*="/mobile/deposit"] * {
        position: relative;
        z-index: 2;
      }

      .site-footer a.ceriabet-footer-center .footer-text-line-1,
      .site-footer a[data-require-login] .footer-text-line-1,
      .site-footer a[href*="/mobile/deposit"] .footer-text-line-1 {
        font-size: 10px !important;
        font-weight: 700 !important;
      }

      .site-footer a.ceriabet-footer-center .footer-text-line-2,
      .site-footer a[data-require-login] .footer-text-line-2,
      .site-footer a[href*="/mobile/deposit"] .footer-text-line-2 {
        font-size: 9px !important;
        font-weight: 700 !important;
      }

      .site-footer a.ceriabet-footer-center[data-login-state="deposit"],
      .site-footer a[href*="/mobile/deposit"][data-login-state="deposit"] {
        color: #ff8cff !important;
      }

      @media (min-width: 992px) {
        .site-footer {
          max-width: 430px;
          margin: 0 auto;
          left: 50%;
          transform: translateX(-50%);
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const setCenterButtonText = (anchor) => {
    if (!anchor) return;
    const textNodes = [...anchor.childNodes].filter(node => node.nodeType === 3 && node.textContent.trim());
    textNodes.forEach(node => node.remove());

    let existingWrap = anchor.querySelector('.ceriabet-footer-text-wrap');
    if (existingWrap) existingWrap.remove();

    const raw = (anchor.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
    const isDeposit = raw.includes('depo') || raw.includes('deposit') || anchor.querySelector('img[alt*="Depo" i], img[alt*="Deposit" i]');

    anchor.classList.add('ceriabet-footer-center');
    anchor.setAttribute('data-login-state', isDeposit ? 'deposit' : 'login');

    const wrap = document.createElement('div');
    wrap.className = 'ceriabet-footer-text-wrap';
    wrap.innerHTML = isDeposit
      ? '<div class="footer-text-line-1">Depo</div><div class="footer-text-line-2">/WD</div>'
      : '<div class="footer-text-line-1">Masuk</div>';

    anchor.appendChild(wrap);
  };

  const applyFooter = () => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const anchors = footer.querySelectorAll('a');
    anchors.forEach(a => {
      a.removeAttribute(READY_FLAG);
    });

    const centerAnchor = footer.querySelector('a[data-require-login]') || footer.querySelector('a[href*="/mobile/deposit"]') || anchors[2];
    if (centerAnchor) setCenterButtonText(centerAnchor);
  };

  const init = () => {
    applyFooter();
    const mo = new MutationObserver(() => applyFooter());
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    window.addEventListener('load', applyFooter);
    window.addEventListener('resize', applyFooter);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
