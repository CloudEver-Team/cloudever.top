/* CloudEver HUD front page helpers */
(function () {
  "use strict";

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function setupClock() {
    const clock = document.querySelector("[data-hud-clock]");
    if (!clock) return;

    const tick = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("zh-CN", {
        hour12: false,
        timeZone: "Asia/Shanghai",
      });
      clock.textContent = time + " CST";
    };

    tick();
    window.setInterval(tick, 1000);
  }

  function setupScrollUi() {
    const header = document.querySelector("[data-header]");
    const progress = document.querySelector("[data-scroll-progress]");
    const sections = Array.from(document.querySelectorAll("[data-section]"));
    const links = Array.from(document.querySelectorAll("[data-nav-link]"));

    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY || window.pageYOffset;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      if (progress) progress.style.width = Math.min(100, (y / max) * 100) + "%";
      if (header) header.classList.toggle("is-scrolled", y > 24);

      const anchor = y + window.innerHeight * 0.34;
      let current = null;
      sections.forEach((section) => {
        if (section.offsetTop <= anchor) current = section;
      });

      links.forEach((link) => {
        const active = current && link.getAttribute("href") === "#" + current.id;
        link.classList.toggle("is-active", Boolean(active));
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    const request = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }

  function setupHeroParallax() {
    const hero = document.querySelector(".hero");
    const hud = document.querySelector("[data-hero-hud]");
    if (!hero || !hud) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      raf = 0;
      hud.style.setProperty("--mx", targetX.toFixed(3));
      hud.style.setProperty("--my", targetY.toFixed(3));
    };

    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = window.requestAnimationFrame(apply);
    });

    hero.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = window.requestAnimationFrame(apply);
    });
  }

  function setupRevealDelays() {
    const groups = [
      ".hero-copy .reveal",
      ".roster-meta",
      ".profile-strip",
    ];

    groups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((item, index) => {
        item.style.setProperty("--reveal-delay", index * 55 + "ms");
      });
    });

    document.querySelectorAll(".team-grid .member-card").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", (index % 8) * 35 + "ms");
    });
  }

  function setupFooterClock() {
    const meta = document.querySelector(".footer-meta");
    if (!meta) return;
    const year = new Date().getFullYear();
    const month = pad(new Date().getMonth() + 1);
    meta.innerHTML = "BUILD " + year + "." + month + " <i>/</i> KUNMING <i>/</i> CN";
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupClock();
    setupScrollUi();
    setupHeroParallax();
    setupRevealDelays();
    setupFooterClock();
  });
})();
