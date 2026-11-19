/* ---------------------------------------------------------------
   Deck engine: renders slides, navigation, dots and overview.
   All text lives in js/slides.js.
----------------------------------------------------------------*/
(() => {
  "use strict";

  const SLIDES = window.SLIDES || [];
  const deck = document.getElementById("deck");

  const ui = {
    current: document.getElementById("current"),
    total: document.getElementById("total"),
    prev: document.getElementById("prev"),
    next: document.getElementById("next"),
    bar: document.getElementById("progressBar"),
    dots: document.getElementById("dots"),
    overview: document.getElementById("overview"),
    overviewGrid: document.getElementById("overviewGrid"),
    overviewBtn: document.getElementById("overviewBtn"),
    overviewClose: document.getElementById("overviewClose"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
  };

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"]/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]
    ));

  /* ---------- building blocks ---------- */

  const media = (m, eager = false) => `
    <figure class="media${m.compact ? " compact" : ""}">
      <div class="frame">
        <img src="${esc(m.src)}" alt="${esc(m.alt)}"
             ${eager ? "" : 'loading="lazy"'} decoding="async">
      </div>
      ${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ""}
    </figure>`;

  const pointList = (items, modifier = "") => `
    <ul class="points${modifier ? ` ${modifier}` : ""}">
      ${items.map((t) => `<li>${esc(t)}</li>`).join("")}
    </ul>`;

  const bulletList = (items) => `
    <ul class="bullets">
      ${items.map((b) => `
        <li>
          <strong>${esc(b.t)}</strong>
          ${b.d ? `<span>${esc(b.d)}</span>` : ""}
        </li>`).join("")}
    </ul>`;

  /* ---------- layouts ---------- */

  const layouts = {
    cover: (s, i) => `
      <div class="slide-inner bleed">
        <div class="cover">
          <div class="cover-text">
            <p class="kicker">${esc(s.kicker)}</p>
            <h1>${esc(s.title)}</h1>
            <div class="cover-foot">
              ${s.subtitle ? `<p class="lede">${esc(s.subtitle)}</p>` : ""}
              ${s.meta ? `<p class="meta">${esc(s.meta)}</p>` : ""}
            </div>
          </div>
          <div class="cover-media">
            <img src="${esc(s.image.src)}" alt="${esc(s.image.alt)}"
                 ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
            ${s.credit ? `<span class="credit">${esc(s.credit)}</span>` : ""}
          </div>
        </div>
      </div>`,

    agenda: (s) => `
      <div class="slide-inner stack">
        <p class="kicker">${esc(s.kicker)}</p>
        <h2>${esc(s.title)}</h2>
        ${s.lede ? `<p class="lede">${esc(s.lede)}</p>` : ""}
        <ol class="agenda">
          ${s.items.map(([num, label]) => `
            <li><span class="num">${esc(num)}</span><span>${esc(label)}</span></li>`).join("")}
        </ol>
      </div>`,

    split: (s) => `
      <div class="slide-inner split${s.reverse ? " reverse" : ""}${s.media ? "" : " no-media"}">
        <div class="text">
          <p class="kicker">${esc(s.kicker)}</p>
          <h2>${esc(s.title)}</h2>
          ${s.lede ? `<p class="lede">${esc(s.lede)}</p>` : ""}
          ${s.points ? pointList(s.points) : s.bullets ? bulletList(s.bullets) : ""}
        </div>
        ${s.media ? media(s.media) : ""}
      </div>`,

    stats: (s) => `
      <div class="slide-inner">
        <p class="kicker">${esc(s.kicker)}</p>
        <h2>${esc(s.title)}</h2>
        ${s.lede ? `<p class="lede">${esc(s.lede)}</p>` : ""}
        <div class="stats">
          ${s.stats.map((st) => `
            <div class="stat">
              <span class="value">${esc(st.value)}</span>
              <span class="label">${esc(st.label)}</span>
            </div>`).join("")}
        </div>
      </div>`,

    facts: (s) => `
      <div class="slide-inner stack">
        <p class="kicker">${esc(s.kicker)}</p>
        <h2>${esc(s.title)}</h2>
        ${s.lede ? `<p class="lede">${esc(s.lede)}</p>` : ""}
        <div class="facts">
          ${s.cards.map((c) => `
            <div class="fact">
              <span class="tag">${esc(c.tag)}</span>
              <h3>${esc(c.title)}</h3>
              ${c.text ? `<p>${esc(c.text)}</p>` : ""}
            </div>`).join("")}
        </div>
      </div>`,

    hero: (s, i) => `
      <div class="slide-inner bleed">
        <div class="hero">
          <img src="${esc(s.image.src)}" alt="${esc(s.image.alt)}"
               ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
          <div class="hero-text">
            <p class="kicker">${esc(s.kicker)}</p>
            <h2>${esc(s.title)}</h2>
            ${s.points ? pointList(s.points, "points--light") : ""}
            ${s.text ? `<p>${esc(s.text)}</p>` : ""}
          </div>
          ${s.credit ? `<span class="credit">${esc(s.credit)}</span>` : ""}
        </div>
      </div>`,

    statement: (s) => `
      <div class="slide-inner statement">
        <p class="kicker">${esc(s.kicker)}</p>
        <h2>${esc(s.title)}</h2>
        ${s.text ? `<p class="lede">${esc(s.text)}</p>` : ""}
      </div>`,

    sources: (s) => `
      <div class="slide-inner stack">
        <p class="kicker">${esc(s.kicker)}</p>
        <h2>${esc(s.title)}</h2>
        <div class="sources">
          ${s.groups.map((g) => `
            <div>
              <h3>${esc(g.heading)}</h3>
              <ul>
                ${g.items.map((item) => `
                  <li><a href="${esc(item.href)}" target="_blank" rel="noopener noreferrer">${esc(item.label)}</a></li>`).join("")}
              </ul>
            </div>`).join("")}
        </div>
        ${s.note ? `<p class="sources-note">${esc(s.note)}</p>` : ""}
      </div>`,
  };

  /* ---------- render ---------- */

  deck.innerHTML = SLIDES.map((slide, i) => {
    const layout = layouts[slide.layout] || layouts.split;
    const classes = ["slide", i === 0 ? "is-active" : "", slide.tone ? `tone-${slide.tone}` : ""]
      .filter(Boolean).join(" ");
    const hasOwnPhoto = slide.layout === "cover" || slide.layout === "hero";
    const photo = slide.image && !hasOwnPhoto
      ? ` style="background-image:linear-gradient(180deg,rgba(10,10,8,.72) 0%,rgba(10,10,8,.55) 35%,rgba(10,10,8,.93) 78%,rgba(10,10,8,.97) 100%),linear-gradient(95deg,rgba(10,10,8,.78) 0%,rgba(10,10,8,.34) 52%,rgba(10,10,8,.04) 100%),url('${esc(slide.image.src)}')"`
      : "";
    const credit = slide.credit && !hasOwnPhoto
      ? `<span class="credit">${esc(slide.credit)}</span>`
      : "";
    return `<section class="${classes}" data-index="${i}"${photo}
                     aria-hidden="${i !== 0}"
                     aria-label="Slide ${i + 1} of ${SLIDES.length}">
              ${credit}
              ${layout(slide, i)}
            </section>`;
  }).join("");

  const slideEls = [...deck.querySelectorAll(".slide")];
  const last = SLIDES.length - 1;
  ui.total.textContent = SLIDES.length;

  const slideName = (s, i) => `Slide ${i + 1}: ${s.title || "Untitled"}`;

  /* ---------- dots ---------- */

  ui.dots.innerHTML = SLIDES.map((s, i) => `
    <button class="dot${i === 0 ? " is-active" : ""}" type="button"
            data-index="${i}" aria-label="${esc(slideName(s, i))}"
            title="${esc(slideName(s, i))}"></button>`).join("");

  const dotEls = [...ui.dots.querySelectorAll(".dot")];
  ui.dots.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (dot) go(Number(dot.dataset.index));
  });

  /* ---------- state ---------- */

  const startFromHash = () => {
    const n = parseInt(window.location.hash.replace("#", ""), 10);
    return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), last) : 0;
  };

  let index = startFromHash();
  let sweepTimer = null;

  function paint() {
    slideEls.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-hidden", String(!active));
    });
    dotEls.forEach((el, i) => {
      el.classList.toggle("is-active", i === index);
      el.setAttribute("aria-current", i === index ? "true" : "false");
    });
    ui.current.textContent = index + 1;
    ui.bar.style.transform = `scaleX(${(index + 1) / SLIDES.length})`;
    ui.prev.disabled = index === 0;
    ui.next.disabled = index === last;
    history.replaceState(null, "", `#${index + 1}`);
  }

  function go(target) {
    const nextIndex = Math.min(Math.max(target, 0), last);
    if (nextIndex === index) return;

    const direction = nextIndex > index ? "forward" : "backward";
    deck.dataset.dir = direction;

    // let the outgoing slide drift away in the opposite direction
    const leaving = slideEls[index];
    slideEls.forEach((el) => el.classList.remove("out-left", "out-right"));
    leaving.classList.add(direction === "forward" ? "out-left" : "out-right");
    clearTimeout(leaving._outTimer);
    leaving._outTimer = setTimeout(() => {
      leaving.classList.remove("out-left", "out-right");
    }, 1100);

    index = nextIndex;
    slideEls[index].scrollTop = 0;
    paint();

    // light sweep across the change
    deck.classList.remove("is-sweeping");
    void deck.offsetWidth;
    deck.classList.add("is-sweeping");
    clearTimeout(sweepTimer);
    sweepTimer = setTimeout(() => deck.classList.remove("is-sweeping"), 1050);
  }

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  ui.prev.addEventListener("click", prev);
  ui.next.addEventListener("click", next);

  /* ---------- overview ---------- */

  function buildOverview() {
    ui.overviewGrid.innerHTML = SLIDES.map((s, i) => `
      <button class="ov-item${i === index ? " is-current" : ""}" type="button" data-index="${i}">
        <span class="n">${String(i + 1).padStart(2, "0")}</span>
        <span>${esc(s.title || "Untitled")}</span>
      </button>`).join("");
  }

  function openOverview() {
    buildOverview();
    ui.overview.classList.add("is-open");
    ui.overview.setAttribute("aria-hidden", "false");
    ui.overviewClose.focus({ preventScroll: true });
  }

  function closeOverview(returnFocus = true) {
    ui.overview.classList.remove("is-open");
    ui.overview.setAttribute("aria-hidden", "true");
    if (returnFocus) ui.overviewBtn.focus({ preventScroll: true });
  }

  const overviewOpen = () => ui.overview.classList.contains("is-open");

  ui.overviewBtn.addEventListener("click", openOverview);
  ui.overviewClose.addEventListener("click", () => closeOverview());
  ui.overviewBtn.setAttribute("aria-expanded", "false");

  ui.overview.addEventListener("click", (e) => {
    if (e.target === ui.overview) closeOverview();
    const item = e.target.closest(".ov-item");
    if (item) {
      go(Number(item.dataset.index));
      closeOverview();
    }
  });

  ui.overviewBtn.addEventListener("click", () => {
    ui.overviewBtn.setAttribute("aria-expanded", "true");
  });
  ui.overview.addEventListener("transitionend", () => {
    if (!overviewOpen()) ui.overviewBtn.setAttribute("aria-expanded", "false");
  });

  /* ---------- fullscreen ---------- */

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }
  ui.fullscreenBtn.addEventListener("click", toggleFullscreen);

  /* ---------- keyboard ---------- */

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (overviewOpen()) {
      if (e.key === "Escape") { e.preventDefault(); closeOverview(); }
      return;
    }

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
      case "Spacebar":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(last);
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
      case "o":
      case "O":
        e.preventDefault();
        openOverview();
        break;
      case "Escape":
        closeOverview(false);
        break;
    }
  });

  /* ---------- touch ---------- */

  let touch = null;

  deck.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });

  deck.addEventListener("touchend", (e) => {
    if (!touch) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x;
    const dy = t.clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  /* ---------- deep links ---------- */

  window.addEventListener("hashchange", () => {
    const target = startFromHash();
    if (target !== index) go(target);
  });

  paint();
})();
