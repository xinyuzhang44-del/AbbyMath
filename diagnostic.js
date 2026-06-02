// AbbyMath — Grade 5 diagnostic test.
// Builds a multiple-choice quiz, grades it, shows an explained answer key,
// and saves an answer history to localStorage.
(function () {
  "use strict";

  var HISTORY_KEY = "abbymath_g5_history_v1";

  var STRANDS = {
    B: { name: "Number", color: "#2563eb" },
    C: { name: "Algebra", color: "#7c3aed" },
    D: { name: "Data", color: "#0d9488" },
    E: { name: "Spatial Sense", color: "#ea580c" },
    F: { name: "Financial Literacy", color: "#16a34a" },
  };

  // answer = index of correct option; explain = the concept to review
  var QUESTIONS = [
    // ---- B · Number ----
    { strand: "B", q: "Write 47 205 in expanded form.", options: ["40 000 + 7 000 + 200 + 5", "4 000 + 700 + 20 + 5", "40 000 + 7 000 + 250", "47 + 205"], answer: 0,
      explain: "Expanded form shows the value of each digit by its place. In 47 205: the 4 is ten-thousands (40 000), 7 is thousands (7 000), 2 is hundreds (200), 0 tens, and 5 ones. (B1 Number Sense — place value to 100 000.)" },
    { strand: "B", q: "Which is greater, 3/4 or 5/8?", options: ["3/4", "5/8", "They are equal", "You can't tell"], answer: 0,
      explain: "Use a common denominator. 3/4 = 6/8. Now compare 6/8 and 5/8 — same denominator, so 6/8 is bigger. Therefore 3/4 > 5/8. (B1 — equivalent fractions & comparing.)" },
    { strand: "B", q: "Round 6.47 to the nearest tenth.", options: ["6.4", "6.5", "6.0", "7.0"], answer: 1,
      explain: "The tenths digit is 4. Look one place to the right (hundredths = 7). Since 7 ≥ 5, round the tenths up: 6.47 → 6.5. (B1 — rounding decimals.)" },
    { strand: "B", q: "What is 24 × 36?", options: ["864", "144", "720", "854"], answer: 0,
      explain: "Use partial products: 24 × 36 = 24 × 30 + 24 × 6 = 720 + 144 = 864. (B2 — multi-digit multiplication.)" },

    // ---- C · Algebra ----
    { strand: "C", q: "A pattern begins 4, 7, 10, 13, … What is the next term?", options: ["15", "16", "17", "14"], answer: 1,
      explain: "The pattern rule is “add 3 each time.” 13 + 3 = 16. (C1 — patterns and pattern rules.)" },
    { strand: "C", q: "Solve for n:  n + 8 = 21.", options: ["13", "29", "14", "12"], answer: 0,
      explain: "To undo “+ 8,” subtract 8 from both sides: n = 21 − 8 = 13. (C2 — solving for a variable.)" },
    { strand: "C", q: "Is 5 × 4 greater than 3 × 7?", options: ["Yes", "No"], answer: 1,
      explain: "Work out both sides first: 5 × 4 = 20 and 3 × 7 = 21. Since 20 < 21, 5 × 4 is NOT greater. (C2 — inequalities: compare both sides.)" },
    { strand: "C", q: "Which code draws a square?", options: ["repeat 4 [ forward 50, turn right 90° ]", "repeat 3 [ forward 50, turn right 120° ]", "forward 50, turn right 90°", "repeat 4 [ forward 50 ]"], answer: 0,
      explain: "A square has 4 equal sides and 4 right angles (90°). Repeating “forward, turn 90°” four times traces all four sides. (C3 — coding with repeating events.)" },

    // ---- D · Data ----
    { strand: "D", q: "Find the mean of 4, 8, 6, 10, 7.", options: ["7", "8", "6", "35"], answer: 0,
      explain: "Mean = sum ÷ how many. 4 + 8 + 6 + 10 + 7 = 35, and 35 ÷ 5 = 7. (D1 — mean as a measure of centre.)" },
    { strand: "D", q: "A spinner has 4 equal sections. What is the probability of landing on green?", options: ["1/4", "1/2", "1/3", "1"], answer: 0,
      explain: "Theoretical probability = favourable outcomes ÷ total equally-likely outcomes = 1 green ÷ 4 sections = 1/4. (D2 — probability.)" },
    { strand: "D", q: "A bag has 3 red and 2 blue marbles. What is the probability of drawing red?", options: ["3/5", "2/5", "3/2", "1/2"], answer: 0,
      explain: "There are 3 red out of 5 marbles in total, so P(red) = 3/5. (D2 — probability.)" },
    { strand: "D", q: "Which graph best compares the heights of two different classes?", options: ["Double bar graph", "Single number line", "One pictograph", "A single dot"], answer: 0,
      explain: "A double bar graph shows two bars side-by-side for each category, which makes comparing two groups easy. (D1 — data representations.)" },

    // ---- E · Spatial Sense ----
    { strand: "E", q: "A rectangle is 8 cm by 5 cm. What is its area?", options: ["40 cm²", "26 cm²", "13 cm²", "80 cm²"], answer: 0,
      explain: "Area of a rectangle = length × width = 8 × 5 = 40 square centimetres. (E2 — area.)" },
    { strand: "E", q: "What is the perimeter of an 8 cm by 5 cm rectangle?", options: ["26 cm", "40 cm", "13 cm", "18 cm"], answer: 0,
      explain: "Perimeter is the distance around: 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm. (E2 — perimeter.)" },
    { strand: "E", q: "How many faces does a rectangular prism have?", options: ["6", "8", "12", "4"], answer: 0,
      explain: "A rectangular prism (a box shape) has 6 flat faces, 12 edges, and 8 vertices. (E1 — properties of 3-D objects.)" },
    { strand: "E", q: "Convert 3 m to centimetres.", options: ["30 cm", "300 cm", "3 000 cm", "3 cm"], answer: 1,
      explain: "There are 100 cm in 1 metre, so 3 m = 3 × 100 = 300 cm. (E2 — metric conversion.)" },

    // ---- F · Financial Literacy ----
    { strand: "F", q: "You buy snacks for $4.75 and pay with $10. How much change?", options: ["$5.25", "$6.25", "$5.75", "$4.25"], answer: 0,
      explain: "Subtract the cost from what you paid: $10.00 − $4.75 = $5.25. (F1 — making change.)" },
    { strand: "F", q: "You want to save $60 in 5 weeks. How much per week?", options: ["$12", "$10", "$15", "$6"], answer: 0,
      explain: "Divide the goal by the number of weeks: $60 ÷ 5 = $12 each week. (F1 — financial goals & budgeting.)" },
    { strand: "F", q: "A $18 toy is $3 off. What is the sale price?", options: ["$15", "$21", "$18", "$12"], answer: 0,
      explain: "Subtract the discount: $18 − $3 = $15. (You saved 3/18 = 1/6 of the price.) (F1 — cost and value.)" },
    { strand: "F", q: "Which of these is a method of payment?", options: ["Debit card", "A ruler", "A protractor", "A fraction"], answer: 0,
      explain: "Cash, debit, and credit are methods of payment. A ruler, protractor, and fraction are math tools/ideas, not ways to pay. (F1 — methods of payment.)" },
  ];

  var form = document.getElementById("quiz");
  var submitBtn = document.getElementById("submit-btn");
  var progressEl = document.getElementById("progress");
  var resultsEl = document.getElementById("results");
  var historyEl = document.getElementById("history");
  var TOTAL = QUESTIONS.length;

  // ---- Build the quiz ----
  QUESTIONS.forEach(function (item, qi) {
    var s = STRANDS[item.strand];
    var card = document.createElement("div");
    card.className = "qcard";
    card.style.setProperty("--accent", s.color);

    var head = document.createElement("div");
    head.className = "qcard-head";
    head.innerHTML =
      '<span class="qnum">Q' + (qi + 1) + '</span>' +
      '<span class="qstrand" style="background:' + s.color + '">' + item.strand + ' · ' + s.name + "</span>";
    card.appendChild(head);

    var qtext = document.createElement("p");
    qtext.className = "qtext";
    qtext.textContent = item.q;
    card.appendChild(qtext);

    var opts = document.createElement("div");
    opts.className = "qopts";
    item.options.forEach(function (opt, oi) {
      var id = "q" + qi + "o" + oi;
      var label = document.createElement("label");
      label.className = "qopt";
      label.setAttribute("for", id);
      label.innerHTML =
        '<input type="radio" id="' + id + '" name="q' + qi + '" value="' + oi + '">' +
        '<span class="qopt-text"></span>';
      label.querySelector(".qopt-text").textContent = opt;
      opts.appendChild(label);
    });
    card.appendChild(opts);
    form.appendChild(card);
  });

  // ---- Progress ----
  function answeredCount() {
    var n = 0;
    for (var i = 0; i < TOTAL; i++) {
      if (form.querySelector('input[name="q' + i + '"]:checked')) n++;
    }
    return n;
  }
  function updateProgress() {
    progressEl.textContent = answeredCount() + " of " + TOTAL + " answered";
  }
  form.addEventListener("change", updateProgress);
  updateProgress();

  // ---- Submit / grade ----
  submitBtn.addEventListener("click", function () {
    var n = answeredCount();
    if (n < TOTAL) {
      progressEl.textContent = "Please answer all questions — " + (TOTAL - n) + " left.";
      progressEl.classList.add("progress-warn");
      for (var i = 0; i < TOTAL; i++) {
        if (!form.querySelector('input[name="q' + i + '"]:checked')) {
          var fu = form.children[i];
          fu.classList.add("qcard-missing");
          fu.scrollIntoView({ behavior: "smooth", block: "center" });
          (function (el) { setTimeout(function () { el.classList.remove("qcard-missing"); }, 1800); })(fu);
          break;
        }
      }
      return;
    }
    progressEl.classList.remove("progress-warn");

    var tally = {};
    Object.keys(STRANDS).forEach(function (k) { tally[k] = { correct: 0, total: 0 }; });
    var overall = 0;
    var choices = [];

    QUESTIONS.forEach(function (item, qi) {
      tally[item.strand].total++;
      var chosen = form.querySelector('input[name="q' + qi + '"]:checked');
      var chosenIdx = chosen ? parseInt(chosen.value, 10) : -1;
      choices.push(chosenIdx);
      var ok = chosenIdx === item.answer;
      if (ok) { tally[item.strand].correct++; overall++; }
      annotateCard(qi, item, chosenIdx, ok);
    });

    saveAttempt(buildRecord(tally, overall, choices));
    renderHistory();
    renderResults(tally, overall);
  });

  // ---- Answer key: mark options + show explanation on each card ----
  function annotateCard(qi, item, chosenIdx, ok) {
    var card = form.children[qi];
    card.classList.add(ok ? "qcard-correct" : "qcard-wrong");
    var labels = card.querySelectorAll(".qopt");
    labels.forEach(function (label, oi) {
      var input = label.querySelector("input");
      input.disabled = true;
      if (oi === item.answer) label.classList.add("opt-correct");
      if (oi === chosenIdx && !ok) label.classList.add("opt-wrong");
    });
    if (card.querySelector(".explain")) return; // avoid duplicates on re-grade
    var ex = document.createElement("div");
    ex.className = "explain";
    var verdict = ok
      ? '<span class="ex-correct">✓ Correct!</span> '
      : '<span class="ex-wrong">✗ Not quite.</span> The correct answer is <strong>' +
        item.options[item.answer] + "</strong>. ";
    ex.innerHTML = verdict + '<span class="ex-note"></span>';
    ex.querySelector(".ex-note").textContent = item.explain;
    card.appendChild(ex);
  }

  function levelFor(pct) {
    if (pct >= 80) return { label: "Strong", cls: "lvl-strong", color: "#16a34a" };
    if (pct >= 60) return { label: "Developing", cls: "lvl-dev", color: "#d97706" };
    return { label: "Needs focus", cls: "lvl-weak", color: "#dc2626" };
  }

  function renderResults(tally, overall) {
    var overallPct = Math.round((overall / TOTAL) * 100);
    var focus = [];
    var rows = "";
    Object.keys(STRANDS).forEach(function (k) {
      var s = STRANDS[k], t = tally[k];
      var pct = Math.round((t.correct / t.total) * 100);
      var lvl = levelFor(pct);
      if (pct < 60) focus.push(s.name);
      rows +=
        '<div class="res-row">' +
          '<div class="res-label"><span class="badge badge-' + k.toLowerCase() + ' q-badge">' + k + '</span><span>' + s.name + "</span></div>" +
          '<div class="res-bar"><div class="res-fill" style="width:' + pct + '%;background:' + lvl.color + '"></div></div>' +
          '<div class="res-score">' + t.correct + "/" + t.total + ' <span class="res-pill ' + lvl.cls + '">' + lvl.label + "</span></div>" +
        "</div>";
    });
    var summary = focus.length === 0
      ? '<div class="res-summary res-good">🎉 Great work! Every strand is at 60% or higher. Scroll up to read the answer key and keep practising.</div>'
      : '<div class="res-summary res-focus"><strong>Focus areas:</strong> ' + focus.join(", ") +
        '. These scored below 60%. Scroll up to read each <strong>answer key</strong>, then review on the <a href="index.html">Curriculum</a> page.</div>';

    resultsEl.innerHTML =
      '<h2 class="res-title">Your Results</h2>' +
      '<div class="res-overall"><div class="res-overall-num">' + overall + "/" + TOTAL + "</div>" +
        '<div class="res-overall-pct">' + overallPct + "% overall</div></div>" +
      '<div class="res-table">' + rows + "</div>" +
      summary +
      '<p class="res-hint">📖 An explained <strong>answer key</strong> now appears under every question above.</p>' +
      '<div class="res-actions"><button type="button" id="retake" class="cta-btn">Retake test</button> ' +
        '<a class="nav-btn" href="index.html">📚 Review the curriculum</a></div>';

    resultsEl.hidden = false;
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("retake").addEventListener("click", resetQuiz);
  }

  function resetQuiz() {
    form.reset();
    Array.prototype.forEach.call(form.children, function (c) {
      c.classList.remove("qcard-correct", "qcard-wrong");
      c.querySelectorAll(".qopt").forEach(function (l) {
        l.classList.remove("opt-correct", "opt-wrong");
        l.querySelector("input").disabled = false;
      });
      var ex = c.querySelector(".explain");
      if (ex) ex.remove();
    });
    resultsEl.hidden = true;
    resultsEl.innerHTML = "";
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- History (localStorage) ----
  function buildRecord(tally, overall, choices) {
    var per = {};
    Object.keys(tally).forEach(function (k) { per[k] = [tally[k].correct, tally[k].total]; });
    var focus = Object.keys(STRANDS).filter(function (k) {
      return (tally[k].correct / tally[k].total) < 0.6;
    }).map(function (k) { return STRANDS[k].name; });
    return { date: new Date().toISOString(), overall: overall, total: TOTAL, per: per, focus: focus, choices: choices };
  }
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveAttempt(rec) {
    var h = loadHistory();
    h.push(rec);
    if (h.length > 50) h = h.slice(h.length - 50); // cap
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) {}
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString(); } catch (e) { return iso; }
  }
  function renderHistory() {
    if (!historyEl) return;
    var h = loadHistory();
    if (h.length === 0) { historyEl.hidden = true; historyEl.innerHTML = ""; return; }

    var items = h.slice().reverse().map(function (rec, idx) {
      var num = h.length - idx;
      var detail = QUESTIONS.map(function (item, qi) {
        var ci = rec.choices[qi];
        var ok = ci === item.answer;
        var your = (ci >= 0 && item.options[ci] != null) ? item.options[ci] : "—";
        return '<li class="' + (ok ? "hd-ok" : "hd-no") + '"><strong>Q' + (qi + 1) + "</strong> (" + item.strand + "): " +
          (ok ? "✓ " : "✗ ") + 'you chose “' + your + '”' +
          (ok ? "" : ' · correct: “' + item.options[item.answer] + '”') + "</li>";
      }).join("");
      var focusTxt = rec.focus.length ? rec.focus.join(", ") : "none 🎉";
      return '<details class="hist-item">' +
        '<summary><span class="hist-num">Attempt ' + num + "</span>" +
          '<span class="hist-score">' + rec.overall + "/" + rec.total + "</span>" +
          '<span class="hist-date">' + fmtDate(rec.date) + "</span></summary>" +
        '<p class="hist-focus"><strong>Focus areas:</strong> ' + focusTxt + "</p>" +
        '<ul class="hist-detail">' + detail + "</ul></details>";
    }).join("");

    historyEl.innerHTML =
      '<div class="history-head"><h2>📊 Your past attempts (' + h.length + ")</h2>" +
        '<button type="button" id="clear-history" class="link-btn">Clear history</button></div>' + items;
    historyEl.hidden = false;
    var clr = document.getElementById("clear-history");
    if (clr) clr.addEventListener("click", function () {
      if (window.confirm("Delete all saved attempts on this device?")) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
      }
    });
  }

  // show any saved history on load
  renderHistory();
})();
