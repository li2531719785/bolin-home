/* Bolin Lab — small, dependency-free site script */
(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  /* ---------- theme ---------- */
  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b0d10" : "#f4f1e9");
    const toggle = $("[data-theme-toggle]");
    if (toggle) {
      const next = theme === "dark" ? "浅色" : "深色";
      toggle.setAttribute("aria-label", "切换到" + next + "模式");
      toggle.setAttribute("title", "切换到" + next + "模式");
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
    if (persist) {
      try { localStorage.setItem("bolin-theme", theme); } catch (e) { /* private mode */ }
    }
  }

  function initTheme() {
    const toggle = $("[data-theme-toggle]");
    // Inline head script sets the initial theme. Keep this fallback for safety.
    if (!root.dataset.theme) {
      const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(systemDark ? "dark" : "light", false);
    } else {
      applyTheme(root.dataset.theme, false);
    }
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- header scroll state ---------- */
  function initHeader() {
    const header = $(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: .06 });
    items.forEach(el => io.observe(el));
  }

  /* ---------- notes filter ---------- */
  function initNotesFilter() {
    const input = $("#noteSearch");
    if (!input) return;
    const cards = $$("[data-note-card]");
    const chips = $$("[data-filter]");
    const empty = $("#notesEmpty");
    const count = $("#noteCount");
    let activeFilter = "all";

    function apply() {
      const q = input.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const tags = (card.dataset.tags || "").toLowerCase();
        const text = (card.dataset.search || card.textContent || "").toLowerCase();
        const matchesFilter = activeFilter === "all" || tags.split(/\s+/).includes(activeFilter);
        const matchesQuery = !q || text.includes(q);
        const show = matchesFilter && matchesQuery;
        card.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.classList.toggle("show", visible === 0);
      if (count) {
        const pad = n => String(n).padStart(2, "0");
        count.textContent = q || activeFilter !== "all"
          ? pad(visible) + " / " + pad(cards.length) + " 篇"
          : pad(cards.length) + " 篇笔记";
      }
    }

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        activeFilter = chip.dataset.filter || "all";
        chips.forEach(c => c.setAttribute("aria-pressed", c === chip ? "true" : "false"));
        apply();
      });
    });
    input.addEventListener("input", apply);
    // "/" focuses the search, like most documentation sites.
    document.addEventListener("keydown", event => {
      if (event.key === "/" && document.activeElement !== input &&
          !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        event.preventDefault();
        input.focus();
      }
    });
    apply();
  }

  /* ---------- reading progress + toc ---------- */
  function initArticle() {
    const body = $(".article-body");
    if (!body) return;
    const bar = $("#readingProgress");
    const headings = $$("h2, h3", body);
    const toc = $("#articleToc");

    if (toc && headings.length) {
      const list = document.createElement("ul");
      list.className = "toc-list";
      headings.forEach((heading, index) => {
        if (!heading.id) heading.id = "section-" + (index + 1);
        const li = document.createElement("li");
        if (heading.tagName === "H3") li.className = "toc-sub";
        const a = document.createElement("a");
        a.href = "#" + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
      toc.appendChild(list);

      const links = $$("a", list);
      const linkById = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
      if (links[0]) links[0].classList.add("active");
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(a => a.classList.remove("active"));
            const active = linkById.get(entry.target.id);
            if (active) active.classList.add("active");
          });
        }, { rootMargin: "-12% 0px -75% 0px", threshold: 0 });
        headings.forEach(h => io.observe(h));
      }
    }

    if (!bar) return;
    let ticking = false;
    function updateProgress() {
      ticking = false;
      const rect = body.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const total = Math.max(1, rect.height - window.innerHeight * .45);
      const progress = Math.max(0, Math.min(1, (window.scrollY - start + 120) / total));
      bar.style.width = (progress * 100).toFixed(2) + "%";
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- footer ---------- */
  function initFooter() {
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- boot ---------- */
  initTheme();
  initHeader();
  initReveal();
  initNotesFilter();
  initArticle();
  initFooter();
})();
