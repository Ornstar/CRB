<script>
(() => {
  "use strict";

  const ID = "ceriabet-footer-hard-override";
  if (window[ID]) return;
  window[ID] = true;

  const set = (el, prop, value) => {
    if (el) el.style.setProperty(prop, value, "important");
  };

  const ensureLabel = (button, isDeposit) => {
    let label = button.querySelector(":scope > .ceriabet-center-label");

    if (!label) {
      label = document.createElement("span");
      label.className = "ceriabet-center-label";
      button.appendChild(label);
    }

    label.textContent = isDeposit ? "Depo/WD" : "Masuk";

    set(label, "position", "relative");
    set(label, "z-index", "5");
    set(label, "display", "block");
    set(label, "font-size", "9px");
    set(label, "font-weight", "700");
    set(label, "line-height", "1");
    set(label, "margin-top", "3px");
    set(label, "color", "#ff70ff");
    set(label, "white-space", "nowrap");
    set(label, "pointer-events", "none");

    [...button.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = "";
      }
    });

    [...button.children].forEach(child => {
      if (child === label || child.classList.contains("ceriabet-rotating-ring")) return;
      set(child, "position", "relative");
      set(child, "z-index", "5");
    });
  };

  const ensureRing = button => {
    let ring = button.querySelector(":scope > .ceriabet-rotating-ring");

    if (!ring) {
      ring = document.createElement("span");
      ring.className = "ceriabet-rotating-ring";
      button.prepend(ring);

      Object.assign(ring.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "1",
        background: "conic-gradient(#431063 0deg,#7c22dc 55deg,#bd4dff 105deg,#ff8dff 145deg,#d83eff 190deg,#8028e8 250deg,#49106e 315deg,#431063 360deg)",
        boxShadow: "0 0 12px rgba(213,67,255,.70)"
      });

      const inner = document.createElement("span");
      inner.className = "ceriabet-ring-inner";
      Object.assign(inner.style, {
        position: "absolute",
        inset: "3px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 50% 30%,#4f1268 0%,#24052f 72%)",
        pointerEvents: "none"
      });
      ring.appendChild(inner);

      ring.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        {
          duration: 3600,
          iterations: Infinity,
          easing: "linear"
        }
      );
    }
  };

  const styleFooter = footer => {
    if (!footer) return;

    set(footer, "position", "fixed");
    set(footer, "left", "0");
    set(footer, "right", "0");
    set(footer, "bottom", "0");
    set(footer, "z-index", "2147483000");
    set(footer, "display", "flex");
    set(footer, "align-items", "flex-end");
    set(footer, "justify-content", "space-between");
    set(footer, "gap", "6px");
    set(footer, "height", "72px");
    set(footer, "min-height", "72px");
    set(footer, "padding", "7px 8px calc(8px + env(safe-area-inset-bottom, 0px))");
    set(footer, "box-sizing", "border-box");
    set(footer, "overflow", "visible");
    set(footer, "background", "linear-gradient(180deg,#4b0d59 0%,#280333 100%)");
    set(footer, "border-top", "1px solid rgba(226,94,255,.38)");
    set(footer, "box-shadow", "0 -8px 22px rgba(0,0,0,.45)");

    const buttons = [...footer.querySelectorAll(":scope > a")];
    if (!buttons.length) return;

    buttons.forEach(button => {
      set(button, "position", "relative");
      set(button, "flex", "1 1 0");
      set(button, "width", "auto");
      set(button, "height", "54px");
      set(button, "min-height", "54px");
      set(button, "padding", "5px 3px");
      set(button, "display", "flex");
      set(button, "flex-direction", "column");
      set(button, "align-items", "center");
      set(button, "justify-content", "center");
      set(button, "box-sizing", "border-box");
      set(button, "overflow", "hidden");
      set(button, "border-radius", "14px");
      set(button, "border", "1px solid rgba(179,88,227,.55)");
      set(button, "background", "rgba(25,3,35,.48)");
      set(button, "color", button.getAttribute("data-active") === "true" ? "#ff55f7" : "#cbb9d5");
      set(button, "text-decoration", "none");
      set(button, "font-size", "9px");
      set(button, "line-height", "1.05");
      set(button, "text-align", "center");

      button.querySelectorAll("img,svg,i").forEach(icon => {
        set(icon, "width", "20px");
        set(icon, "height", "20px");
        set(icon, "max-width", "20px");
        set(icon, "max-height", "20px");
        set(icon, "margin", "0 0 4px 0");
      });
    });

    const center =
      footer.querySelector(':scope > a[href*="/mobile/deposit"]') ||
      footer.querySelector(':scope > a[data-require-login*="/mobile/deposit"]') ||
      buttons[2];

    if (!center) return;

    const href = center.getAttribute("href") || "";
    const isDeposit = href.includes("/mobile/deposit");

    set(center, "flex", "0 0 64px");
    set(center, "width", "64px");
    set(center, "min-width", "64px");
    set(center, "max-width", "64px");
    set(center, "height", "64px");
    set(center, "min-height", "64px");
    set(center, "max-height", "64px");
    set(center, "margin", "0 1px");
    set(center, "padding", "7px 4px");
    set(center, "border", "0");
    set(center, "border-radius", "50%");
    set(center, "overflow", "visible");
    set(center, "background", "#260531");
    set(center, "transform", "translateY(-17px)");
    set(center, "box-shadow", "0 8px 20px rgba(0,0,0,.42)");
    set(center, "isolation", "isolate");

    center.querySelectorAll("img,svg,i").forEach(icon => {
      set(icon, "width", "24px");
      set(icon, "height", "24px");
      set(icon, "max-width", "24px");
      set(icon, "max-height", "24px");
      set(icon, "margin", "0");
    });

    ensureRing(center);
    ensureLabel(center, isDeposit);

    document.body.style.setProperty("padding-bottom", "82px", "important");
  };

  const scanDocument = doc => {
    try {
      const footer = doc.querySelector("footer.site-footer, .site-footer");
      if (footer) styleFooter(footer);

      doc.querySelectorAll("iframe").forEach(frame => {
        try {
          if (frame.contentDocument) scanDocument(frame.contentDocument);
        } catch (_) {}
      });
    } catch (_) {}
  };

  let queued = false;
  const apply = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scanDocument(document);
    });
  };

  apply();
  document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
  window.addEventListener("resize", apply);

  new MutationObserver(apply).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href", "data-require-login", "data-active", "class"]
  });

  setInterval(apply, 1000);
})();
</script>
