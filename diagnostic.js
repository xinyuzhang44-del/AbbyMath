// AbbyMath — Grade 5 diagnostic test.
// Builds a multiple-choice quiz, grades it, and reports strengths/weaknesses per strand.
(function () {
  "use strict";

  // Strand metadata (keys map to question.strand)
  var STRANDS = {
    B: { name: "Number", color: "#2563eb" },
    C: { name: "Algebra", color: "#7c3aed" },
    D: { name: "Data", color: "#0d9488" },
    E: { name: "Spatial Sense", color: "#ea580c" },
    F: { name: "Financial Literacy", color: "#16a34a" },
  };

  // answer = index of the correct option
  var QUESTIONS = [
    // ---- B · Number ----
    { strand: "B", q: "Write 47 205 in expanded form.", options: ["40 000 + 7 000 + 200 + 5", "4 000 + 700 + 20 + 5", "40 000 + 7 000 + 250", "47 + 205"], answer: 0 },
    { strand: "B", q: "Which is greater, 3/4 or 5/8?", options: ["3/4", "5/8", "They are equal", "You can't tell"], answer: 0 },
    { strand: "B", q: "Round 6.47 to the nearest tenth.", options: ["6.4", "6.5", "6.0", "7.0"], answer: 1 },
    { strand: "B", q: "What is 24 × 36?", options: ["864", "144", "720", "854"], answer: 0 },

    // ---- C · Algebra ----
    { strand: "C", q: "A pattern begins 4, 7, 10, 13, … What is the next term?", options: ["15", "16", "17", "14"], answer: 1 },
    { strand: "C", q: "Solve for n:  n + 8 = 21.", options: ["13", "29", "14", "12"], answer: 0 },
    { strand: "C", q: "Is 5 × 4 greater than 3 × 7?", options: ["Yes", "No"], answer: 1 },
    { strand: "C", q: "Which code draws a square?", options: ["repeat 4 [ forward 50, turn right 90° ]", "repeat 3 [ forward 50, turn right 120° ]", "forward 50, turn right 90°", "repeat 4 [ forward 50 ]"], answer: 0 },

    // ---- D · Data ----
    { strand: "D", q: "Find the mean of 4, 8, 6, 10, 7.", options: ["7", "8", "6", "35"], answer: 0 },
    { strand: "D", q: "A spinner has 4 equal sections. What is the probability of landing on green?", options: ["1/4", "1/2", "1/3", "1"], answer: 0 },
    { strand: "D", q: "A bag has 3 red and 2 blue marbles. What is the probability of drawing red?", options: ["3/5", "2/5", "3/2", "1/2"], answer: 0 },
    { strand: "D", q: "Which graph best compares the heights of two different classes?", options: ["Double bar graph", "Single number line", "One pictograph", "A single dot"], answer: 0 },

    // ---- E · Spatial Sense ----
    { strand: "E", q: "A rectangle is 8 cm by 5 cm. What is its area?", options: ["40 cm²", "26 cm²", "13 cm²", "80 cm²"], answer: 0 },
    { strand: "E", q: "What is the perimeter of an 8 cm by 5 cm rectangle?", options: ["26 cm", "40 cm", "13 cm", "18 cm"], answer: 0 },
    { strand: "E", q: "How many faces does a rectangular prism have?", options: ["6", "8", "12", "4"], answer: 0 },
    { strand: "E", q: "Convert 3 m to centimetres.", options: ["30 cm", "300 cm", "3 000 cm", "3 cm"], answer: 1 },

    // ---- F · Financial Literacy ----
    { strand: "F", q: "You buy snacks for $4.75 and pay with $10. How much change?", options: ["$5.25", "$6.25", "$5.75", "$4.25"], answer: 0 },
    { strand: "F", q: "You want to save $60 in 5 weeks. How much per week?", options: ["$12", "$10", "$15", "$6"], answer: 0 },
    { strand: "F", q: "A $18 toy is $3 off. What is the sale price?", options: ["$15", "$21", "$18", "$12"], answer: 0 },
    { strand: "F", q: "Which of these is a method of payment?", options: ["Debit card", "A ruler", "A protractor", "A fraction"], answer: 0 },
  ];

  var form = document.getElementById("quiz");
  var submitBtn = document.getElementById("submit-btn");
  var progressEl = document.getElementById("progress");
  var resultsEl = document.getElementById("results");
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

  // ---- Progress tracking ----
  function answeredCount() {
    var n = 0;
    for (var i = 0; i < TOTAL; i++) {
      if (form.querySelector('input[name="q' + i + '"]:checked')) n++;
    }
    return n;
  }
  function updateProgress() {
    var n = answeredCount();
    progressEl.textContent = n + " of " + TOTAL + " answered";
  }
  form.addEventListener("change", updateProgress);
  updateProgress();

  // ---- Grade & report ----
  submitBtn.addEventListener("click", function () {
    var n = answeredCount();
    if (n < TOTAL) {
      progressEl.textContent = "Please answer all questions — " + (TOTAL - n) + " left.";
      progressEl.classList.add("progress-warn");
      var firstUnanswered = null;
      for (var i = 0; i < TOTAL; i++) {
        if (!form.querySelector('input[name="q' + i + '"]:checked')) {
          firstUnanswered = form.children[i];
          break;
        }
      }
      if (firstUnanswered) {
        firstUnanswered.classList.add("qcard-missing");
        firstUnanswered.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(function () { firstUnanswered.classList.remove("qcard-missing"); }, 1800);
      }
      return;
    }
    progressEl.classList.remove("progress-warn");

    // Tally per strand
    var tally = {};
    Object.keys(STRANDS).forEach(function (k) { tally[k] = { correct: 0, total: 0 }; });
    var overall = 0;

    QUESTIONS.forEach(function (item, qi) {
      tally[item.strand].total++;
      var chosen = form.querySelector('input[name="q' + qi + '"]:checked');
      var ok = chosen && parseInt(chosen.value, 10) === item.answer;
      if (ok) { tally[item.strand].correct++; overall++; }
      // mark the option visually
      var card = form.children[qi];
      card.classList.add(ok ? "qcard-correct" : "qcard-wrong");
    });

    renderResults(tally, overall);
  });

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
      var s = STRANDS[k];
      var t = tally[k];
      var pct = Math.round((t.correct / t.total) * 100);
      var lvl = levelFor(pct);
      if (pct < 60) focus.push(s.name);
      rows +=
        '<div class="res-row">' +
          '<div class="res-label"><span class="badge badge-' + k.toLowerCase() + ' q-badge">' + k + '</span>' +
            '<span>' + s.name + '</span></div>' +
          '<div class="res-bar"><div class="res-fill" style="width:' + pct + '%;background:' + lvl.color + '"></div></div>' +
          '<div class="res-score">' + t.correct + '/' + t.total +
            ' <span class="res-pill ' + lvl.cls + '">' + lvl.label + '</span></div>' +
        "</div>";
    });

    var summary;
    if (focus.length === 0) {
      summary = '<div class="res-summary res-good">🎉 Great work! No weak areas — every strand is at 60% or higher. Keep practising to stay sharp.</div>';
    } else {
      summary = '<div class="res-summary res-focus"><strong>Focus areas:</strong> ' + focus.join(", ") +
        '. These strands scored below 60% — head to the <a href="index.html">Curriculum</a> page to review them.</div>';
    }

    resultsEl.innerHTML =
      '<h2 class="res-title">Your Results</h2>' +
      '<div class="res-overall"><div class="res-overall-num">' + overall + '/' + TOTAL + '</div>' +
        '<div class="res-overall-pct">' + overallPct + '% overall</div></div>' +
      '<div class="res-table">' + rows + "</div>" +
      summary +
      '<div class="res-actions">' +
        '<button type="button" id="retake" class="cta-btn">Retake test</button> ' +
        '<a class="nav-btn" href="index.html">📚 Review the curriculum</a>' +
      "</div>";

    resultsEl.hidden = false;
    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });

    document.getElementById("retake").addEventListener("click", function () {
      form.reset();
      Array.prototype.forEach.call(form.children, function (c) {
        c.classList.remove("qcard-correct", "qcard-wrong");
      });
      resultsEl.hidden = true;
      resultsEl.innerHTML = "";
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
