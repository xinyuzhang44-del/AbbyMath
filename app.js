// AbbyMath — tab switching (Curriculum | Assignments) + scroll-reveal.
(function () {
  "use strict";

  /* ---------- Tabs ---------- */
  var buttons = document.querySelectorAll(".tab-btn");
  var panels = {
    curriculum: document.getElementById("panel-curriculum"),
    assignments: document.getElementById("panel-assignments"),
  };

  function activate(name) {
    if (!panels[name]) name = "curriculum";
    buttons.forEach(function (btn) {
      var on = btn.dataset.tab === name;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    Object.keys(panels).forEach(function (key) {
      var on = key === name;
      var panel = panels[key];
      if (!panel) return;
      panel.classList.toggle("active", on);
      if (on) { panel.removeAttribute("hidden"); }
      else { panel.setAttribute("hidden", ""); }
    });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
    // scroll the panel into view (just below the sticky tab bar)
    window.scrollTo({ top: document.querySelector(".tabs").offsetTop, behavior: "smooth" });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { activate(btn.dataset.tab); });
  });

  // Honor a deep link like #assignments on load.
  var initial = (location.hash || "").replace("#", "");
  if (initial === "assignments") activate("assignments");

  /* ---------- Scroll-reveal (progressive enhancement) ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var els = document.querySelectorAll(".intro, .strand, .questions");
  els.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
