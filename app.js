// AbbyMath — scroll-reveal animations (progressive enhancement).
// If JS is off, all content shows normally; nothing is hidden by CSS alone.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".intro, .strand, .questions");

  if (reduce || !("IntersectionObserver" in window)) {
    // Honor reduced-motion (and old browsers): show everything immediately.
    return;
  }

  // Mark elements for the reveal animation.
  els.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
