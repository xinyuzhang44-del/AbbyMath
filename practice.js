// JH Math — Grade 5 targeted practice. practice.html?topic=KEY renders 10 questions.
// No topic (or invalid) -> shows a topic menu. All questions align to the Ontario Grade 5 curriculum.
(function () {
  "use strict";
  var TOPICS = window.ABBY_TOPICS || {};
  var ORDER = window.ABBY_TOPIC_ORDER || Object.keys(TOPICS);

  // 10 questions per topic. answer = index of correct option.
  var BANKS = {
    "number-sense": [
      { q: "What is the value of the digit 8 in 38 472?", options: ["8 000", "800", "80", "8"], answer: 0, explain: "The 8 sits in the thousands place, so its value is 8 000." },
      { q: "Which number is the greatest?", options: ["45 678", "45 768", "45 687", "45 876"], answer: 3, explain: "Compare digit by digit from the left; 45 876 has the largest hundreds/tens." },
      { q: "Round 67 432 to the nearest thousand.", options: ["67 000", "68 000", "67 400", "70 000"], answer: 0, explain: "The hundreds digit is 4 (< 5), so round down: 67 000." },
      { q: "What is 10 000 more than 84 250?", options: ["94 250", "85 250", "84 350", "84 260"], answer: 0, explain: "Add one ten-thousand: 84 250 + 10 000 = 94 250." },
      { q: "Write 60 000 + 3 000 + 400 + 20 + 9 in standard form.", options: ["63 429", "6 429", "603 429", "63 249"], answer: 0, explain: "Combine the place values: 63 429." },
      { q: "How many ten-thousands are in 70 000?", options: ["7", "70", "700", "7 000"], answer: 0, explain: "70 000 = 7 × 10 000, so there are 7 ten-thousands." },
      { q: "Which number is between 32 000 and 33 000?", options: ["31 900", "32 500", "33 500", "30 200"], answer: 1, explain: "32 500 lies between 32 000 and 33 000." },
      { q: "Order from least to greatest: 12 050, 12 500, 12 005.", options: ["12 005, 12 050, 12 500", "12 500, 12 050, 12 005", "12 050, 12 005, 12 500", "12 005, 12 500, 12 050"], answer: 0, explain: "Compare the hundreds: 005 < 050 < 500." },
      { q: "Round 4 950 to the nearest hundred.", options: ["5 000", "4 900", "4 000", "4 950"], answer: 0, explain: "The tens digit is 5, so round up: 4 950 → 5 000." },
      { q: "In 25 091, which digit is in the hundreds place?", options: ["0", "2", "5", "9"], answer: 0, explain: "From the right: 1 ones, 9 tens, 0 hundreds, 5 thousands, 2 ten-thousands." },
    ],
    "fractions": [
      { q: "Which fraction is equivalent to 1/2?", options: ["4/8", "2/3", "3/4", "5/9"], answer: 0, explain: "4/8 simplifies to 1/2 (divide top and bottom by 4)." },
      { q: "Which is greater, 2/3 or 3/5?", options: ["2/3", "3/5", "They are equal", "Can't tell"], answer: 0, explain: "2/3 = 10/15 and 3/5 = 9/15, so 2/3 is greater." },
      { q: "Simplify 4/8 to lowest terms.", options: ["1/2", "2/4", "4/8", "1/4"], answer: 0, explain: "Divide both parts by 4: 4/8 = 1/2." },
      { q: "2/5 + 1/5 = ?", options: ["3/5", "3/10", "2/10", "1/5"], answer: 0, explain: "Same denominator: add the numerators, keep the denominator: 3/5." },
      { q: "3/4 − 1/4 = ?", options: ["1/2", "2/8", "4/4", "1/4"], answer: 0, explain: "3/4 − 1/4 = 2/4 = 1/2." },
      { q: "Which fraction equals 6/8?", options: ["3/4", "2/3", "5/6", "1/2"], answer: 0, explain: "Divide both parts by 2: 6/8 = 3/4." },
      { q: "Order from least to greatest: 1/2, 1/4, 3/4.", options: ["1/4, 1/2, 3/4", "1/2, 1/4, 3/4", "3/4, 1/2, 1/4", "1/4, 3/4, 1/2"], answer: 0, explain: "With denominator 4: 1/4, 2/4, 3/4." },
      { q: "How many fourths make one whole?", options: ["4", "2", "8", "1"], answer: 0, explain: "4/4 = 1 whole, so four fourths." },
      { q: "What is 2/3 of 9?", options: ["6", "3", "9", "18"], answer: 0, explain: "9 ÷ 3 = 3, then × 2 = 6." },
      { q: "Write 7/4 as a mixed number.", options: ["1 3/4", "7 1/4", "3/4", "1 1/4"], answer: 0, explain: "7 ÷ 4 = 1 remainder 3, so 1 3/4." },
    ],
    "decimals": [
      { q: "Write 0.7 as a fraction.", options: ["7/10", "7/100", "1/7", "70/10"], answer: 0, explain: "0.7 is 7 tenths = 7/10." },
      { q: "Round 3.86 to the nearest tenth.", options: ["3.9", "3.8", "4.0", "3.86"], answer: 0, explain: "Hundredths digit is 6 (≥ 5), so round the tenths up: 3.9." },
      { q: "0.5 + 0.25 = ?", options: ["0.75", "0.30", "0.7", "0.255"], answer: 0, explain: "Line up the decimals: 0.50 + 0.25 = 0.75." },
      { q: "Which is larger, 0.6 or 0.06?", options: ["0.6", "0.06", "Equal", "Can't tell"], answer: 0, explain: "0.6 = 6 tenths; 0.06 = 6 hundredths. 0.6 is bigger." },
      { q: "2.4 + 1.35 = ?", options: ["3.75", "3.39", "3.7", "2.75"], answer: 0, explain: "2.40 + 1.35 = 3.75." },
      { q: "Write 3/10 as a decimal.", options: ["0.3", "0.03", "3.0", "0.13"], answer: 0, explain: "3 tenths = 0.3." },
      { q: "What is 0.25 as a fraction in lowest terms?", options: ["1/4", "25/10", "1/2", "2/5"], answer: 0, explain: "0.25 = 25/100 = 1/4." },
      { q: "Round 12.49 to the nearest whole number.", options: ["12", "13", "12.5", "12.4"], answer: 0, explain: "Tenths digit is 4 (< 5), so round down to 12." },
      { q: "5.6 − 2.3 = ?", options: ["3.3", "3.9", "2.3", "7.9"], answer: 0, explain: "5.6 − 2.3 = 3.3." },
      { q: "In 4.07, the digit 7 stands for…", options: ["7 hundredths", "7 tenths", "7 ones", "7 thousandths"], answer: 0, explain: "The 7 is in the hundredths place (4 ones, 0 tenths, 7 hundredths)." },
    ],
    "operations": [
      { q: "24 × 36 = ?", options: ["864", "720", "144", "854"], answer: 0, explain: "24 × 30 + 24 × 6 = 720 + 144 = 864." },
      { q: "144 ÷ 12 = ?", options: ["12", "14", "11", "24"], answer: 0, explain: "12 × 12 = 144, so 144 ÷ 12 = 12." },
      { q: "3 + 4 × 2 = ?", options: ["11", "14", "10", "24"], answer: 0, explain: "Order of operations: multiply first (4 × 2 = 8), then 3 + 8 = 11." },
      { q: "528 ÷ 4 = ?", options: ["132", "124", "152", "131"], answer: 0, explain: "4 × 132 = 528." },
      { q: "7 × 8 = ?", options: ["56", "54", "49", "64"], answer: 0, explain: "A basic fact: 7 × 8 = 56." },
      { q: "132 × 3 = ?", options: ["396", "369", "336", "393"], answer: 0, explain: "100×3 + 30×3 + 2×3 = 300 + 90 + 6 = 396." },
      { q: "Estimate 412 × 5.", options: ["about 2 000", "about 200", "about 20 000", "about 600"], answer: 0, explain: "412 ≈ 400, and 400 × 5 = 2 000." },
      { q: "1 000 − 367 = ?", options: ["633", "743", "667", "733"], answer: 0, explain: "1 000 − 367 = 633." },
      { q: "(6 + 4) × 2 = ?", options: ["20", "14", "16", "12"], answer: 0, explain: "Brackets first: 6 + 4 = 10, then × 2 = 20." },
      { q: "81 ÷ 9 = ?", options: ["9", "8", "7", "18"], answer: 0, explain: "9 × 9 = 81, so 81 ÷ 9 = 9." },
    ],
    "algebra": [
      { q: "Pattern: 5, 10, 15, 20, … What is next?", options: ["25", "30", "21", "24"], answer: 0, explain: "The rule is “add 5”: 20 + 5 = 25." },
      { q: "Solve x + 7 = 15.", options: ["8", "22", "7", "9"], answer: 0, explain: "x = 15 − 7 = 8." },
      { q: "What is the pattern rule for 3, 6, 9, 12?", options: ["Add 3", "Multiply by 2", "Add 2", "Subtract 3"], answer: 0, explain: "Each term increases by 3." },
      { q: "If 4 × n = 20, what is n?", options: ["5", "16", "80", "4"], answer: 0, explain: "n = 20 ÷ 4 = 5." },
      { q: "True or false: 12 = 3 × 4?", options: ["True", "False"], answer: 0, explain: "3 × 4 = 12, so the equation is true." },
      { q: "What comes next: 100, 90, 80, …?", options: ["70", "75", "60", "85"], answer: 0, explain: "The rule is “subtract 10”: 80 − 10 = 70." },
      { q: "Solve y − 5 = 9.", options: ["14", "4", "45", "9"], answer: 0, explain: "y = 9 + 5 = 14." },
      { q: "What number makes 8 + ___ = 13?", options: ["5", "21", "6", "4"], answer: 0, explain: "13 − 8 = 5." },
      { q: "Doubling pattern: 1, 2, 4, 8, … What is next?", options: ["16", "10", "12", "32"], answer: 0, explain: "Each term doubles: 8 × 2 = 16." },
      { q: "If a = 3, what is a + 6?", options: ["9", "18", "36", "3"], answer: 0, explain: "Substitute: 3 + 6 = 9." },
    ],
    "coding": [
      { q: "What does a loop do in code?", options: ["Repeats instructions", "Deletes code", "Slows the computer", "Changes colours"], answer: 0, explain: "A loop repeats a set of instructions." },
      { q: "repeat 4 [ forward 50, turn right 90° ] draws a…", options: ["Square", "Triangle", "Circle", "Line"], answer: 0, explain: "4 sides with 90° turns make a square." },
      { q: "In a sequence, instructions run…", options: ["One after another, in order", "All at random", "Backwards", "Never"], answer: 0, explain: "Sequential code runs step by step, in order." },
      { q: "A loop inside another loop is called a…", options: ["Nested loop", "Broken loop", "Sequence", "Variable"], answer: 0, explain: "A loop placed inside another loop is “nested.”" },
      { q: "To draw an equilateral triangle, you turn… each time.", options: ["120°", "90°", "60°", "45°"], answer: 0, explain: "The outside turn is 360° ÷ 3 = 120°." },
      { q: "repeat 3 [ forward 5 ] moves forward a total of…", options: ["15", "5", "8", "3"], answer: 0, explain: "3 × 5 = 15 steps forward." },
      { q: "“Concurrent events” in code happen…", options: ["At the same time", "One year apart", "Only once", "In reverse"], answer: 0, explain: "Concurrent means at the same time." },
      { q: "Debugging means…", options: ["Finding and fixing mistakes", "Adding bugs", "Turning off the screen", "Printing paper"], answer: 0, explain: "Debugging is finding and fixing errors in code." },
      { q: "Which repeats an action until a condition is met?", options: ["A loop", "A title", "A colour", "A number"], answer: 0, explain: "Loops repeat actions, often until a condition is true." },
      { q: "forward 10, then forward 10 — total distance forward?", options: ["20", "10", "2", "100"], answer: 0, explain: "10 + 10 = 20." },
    ],
    "data": [
      { q: "Find the mean of 4, 8, 6, 10, 7.", options: ["7", "8", "6", "35"], answer: 0, explain: "Sum = 35; 35 ÷ 5 = 7." },
      { q: "What is the mode of 2, 3, 3, 5?", options: ["3", "2", "5", "13"], answer: 0, explain: "The mode is the most frequent value: 3." },
      { q: "The median (middle) of 3, 5, 7 is…", options: ["5", "3", "7", "15"], answer: 0, explain: "Ordered, the middle value is 5." },
      { q: "A bag has 3 red and 2 blue marbles. P(red)?", options: ["3/5", "2/5", "1/2", "3/2"], answer: 0, explain: "3 red of 5 total = 3/5." },
      { q: "A spinner has 4 equal sections. P(one colour)?", options: ["1/4", "1/2", "1", "1/3"], answer: 0, explain: "1 of 4 equal outcomes = 1/4." },
      { q: "A double bar graph is best for…", options: ["Comparing two groups", "Showing one number", "Telling time", "Measuring length"], answer: 0, explain: "It places two bars side-by-side to compare groups." },
      { q: "The probability of a certain event is…", options: ["1", "0", "1/2", "10"], answer: 0, explain: "Certain = probability 1; impossible = 0." },
      { q: "Which is impossible?", options: ["Rolling a 7 on a 6-sided die", "Rolling a 3", "Rolling an even number", "Rolling a 1"], answer: 0, explain: "A 6-sided die has no 7, so it is impossible." },
      { q: "A stem-and-leaf plot organizes data by…", options: ["Place value", "Colour", "Shape", "Time"], answer: 0, explain: "Stems and leaves group numbers by place value." },
      { q: "The mean of 10 and 20 is…", options: ["15", "30", "10", "25"], answer: 0, explain: "(10 + 20) ÷ 2 = 15." },
    ],
    "geometry": [
      { q: "How many faces does a rectangular prism have?", options: ["6", "8", "12", "4"], answer: 0, explain: "A rectangular prism has 6 faces." },
      { q: "How many edges does a cube have?", options: ["12", "8", "6", "4"], answer: 0, explain: "A cube has 12 edges." },
      { q: "A quadrilateral with 4 equal sides and 4 right angles is a…", options: ["Square", "Triangle", "Pentagon", "Rhombus"], answer: 0, explain: "Equal sides + right angles = square." },
      { q: "A triangle with all three sides equal is…", options: ["Equilateral", "Scalene", "Right", "Obtuse"], answer: 0, explain: "All sides equal = equilateral." },
      { q: "Parallel lines…", options: ["Never meet", "Always cross", "Make a circle", "Are curved"], answer: 0, explain: "Parallel lines stay the same distance apart and never meet." },
      { q: "How many vertices does a triangle have?", options: ["3", "4", "2", "6"], answer: 0, explain: "A triangle has 3 corners (vertices)." },
      { q: "A polygon with 5 sides is a…", options: ["Pentagon", "Hexagon", "Square", "Octagon"], answer: 0, explain: "Penta- means five: pentagon." },
      { q: "A trapezoid has…", options: ["One pair of parallel sides", "No sides", "Five right angles", "Curved sides"], answer: 0, explain: "A trapezoid has exactly one pair of parallel sides." },
      { q: "How many vertices does a cube have?", options: ["8", "6", "12", "4"], answer: 0, explain: "A cube has 8 vertices (corners)." },
      { q: "A right angle measures…", options: ["90°", "180°", "45°", "60°"], answer: 0, explain: "A right angle is exactly 90°." },
    ],
    "measurement": [
      { q: "Area of an 8 cm by 5 cm rectangle?", options: ["40 cm²", "26 cm²", "13 cm²", "80 cm²"], answer: 0, explain: "Area = length × width = 8 × 5 = 40 cm²." },
      { q: "Perimeter of an 8 cm by 5 cm rectangle?", options: ["26 cm", "40 cm", "13 cm", "18 cm"], answer: 0, explain: "Perimeter = 2 × (8 + 5) = 26 cm." },
      { q: "3 m = ___ cm.", options: ["300", "30", "3 000", "3"], answer: 0, explain: "1 m = 100 cm, so 3 m = 300 cm." },
      { q: "1 km = ___ m.", options: ["1 000", "100", "10 000", "10"], answer: 0, explain: "1 kilometre = 1 000 metres." },
      { q: "Area of a square with side 6 cm?", options: ["36 cm²", "24 cm²", "12 cm²", "30 cm²"], answer: 0, explain: "Area = side × side = 6 × 6 = 36 cm²." },
      { q: "2 L = ___ mL.", options: ["2 000", "200", "20", "2"], answer: 0, explain: "1 L = 1 000 mL, so 2 L = 2 000 mL." },
      { q: "Perimeter of a square with side 7 cm?", options: ["28 cm", "14 cm", "49 cm", "21 cm"], answer: 0, explain: "Perimeter = 4 × 7 = 28 cm." },
      { q: "1 hour = ___ minutes.", options: ["60", "100", "30", "24"], answer: 0, explain: "1 hour = 60 minutes." },
      { q: "5 000 g = ___ kg.", options: ["5", "50", "500", "0.5"], answer: 0, explain: "1 kg = 1 000 g, so 5 000 g = 5 kg." },
      { q: "The best unit to measure a pencil's length is…", options: ["Centimetres", "Kilometres", "Litres", "Grams"], answer: 0, explain: "Small lengths are measured in centimetres." },
    ],
    "financial": [
      { q: "You buy a $4.75 snack and pay with $10. Change?", options: ["$5.25", "$6.25", "$5.75", "$4.25"], answer: 0, explain: "$10.00 − $4.75 = $5.25." },
      { q: "Save $60 in 5 weeks. How much per week?", options: ["$12", "$10", "$15", "$6"], answer: 0, explain: "$60 ÷ 5 = $12." },
      { q: "An $18 toy is $3 off. Sale price?", options: ["$15", "$21", "$12", "$18"], answer: 0, explain: "$18 − $3 = $15." },
      { q: "Which is a method of payment?", options: ["Debit card", "A ruler", "A clock", "A triangle"], answer: 0, explain: "Cash, debit, and credit are ways to pay." },
      { q: "How many quarters make $1.00?", options: ["4", "2", "10", "5"], answer: 0, explain: "4 × 25¢ = 100¢ = $1.00." },
      { q: "Three notebooks cost $2 each. Total?", options: ["$6", "$5", "$9", "$23"], answer: 0, explain: "3 × $2 = $6." },
      { q: "You earn $20 and spend $12. How much is left?", options: ["$8", "$32", "$12", "$10"], answer: 0, explain: "$20 − $12 = $8." },
      { q: "$5.00 − $3.50 = ?", options: ["$1.50", "$2.50", "$1.00", "$2.00"], answer: 0, explain: "$5.00 − $3.50 = $1.50." },
      { q: "You want a $100 game and have $40. How much more?", options: ["$60", "$140", "$40", "$100"], answer: 0, explain: "$100 − $40 = $60." },
      { q: "Which costs the least?", options: ["$3.49", "$3.94", "$4.39", "$4.93"], answer: 0, explain: "$3.49 is the smallest amount." },
    ],
  };

  var root = document.getElementById("practice-root");
  var titleEl = document.getElementById("practice-title");
  var subEl = document.getElementById("practice-sub");
  var topic = new URLSearchParams(window.location.search).get("topic");

  if (!topic || !BANKS[topic] || !TOPICS[topic]) {
    renderMenu();
  } else {
    renderPractice(topic);
  }

  function renderMenu() {
    titleEl.textContent = "Targeted Practice";
    subEl.textContent = "Pick a topic — 10 questions each, aligned to the Ontario Grade 5 curriculum.";
    var cards = ORDER.map(function (k) {
      var t = TOPICS[k];
      return '<a class="topic-card" href="practice.html?topic=' + k + '">' +
        '<span class="topic-dot" style="background:' + t.color + '"></span>' +
        '<span class="topic-name">' + t.name + ' <span class="legend-zh">' + t.zh + "</span></span>" +
        '<span class="topic-go">10 questions →</span></a>';
    }).join("");
    root.innerHTML = '<div class="intro"><p>Choose a topic to practise. Each set has 10 questions with an explained answer key. ' +
      'Tip: take the <a href="diagnostic.html">Diagnostic Test</a> first — your results will point you to the topics to work on.</p></div>' +
      '<div class="topic-grid">' + cards + "</div>";
  }

  function renderPractice(key) {
    var t = TOPICS[key];
    var bank = BANKS[key];
    titleEl.textContent = t.name + " — Practice";
    subEl.innerHTML = "10 questions · " + t.zh + " · Ontario Grade 5 (" + t.strand + ")";

    var cardsHtml = bank.map(function (item, qi) {
      var opts = shuffledIndices(item.options.length).map(function (oi) {
        var id = "p" + qi + "o" + oi;
        return '<label class="qopt" for="' + id + '"><input type="radio" id="' + id + '" name="p' + qi + '" value="' + oi + '">' +
          '<span class="qopt-text">' + escapeHtml(item.options[oi]) + "</span></label>";
      }).join("");
      return '<div class="qcard" style="--accent:' + t.color + '">' +
        '<div class="qcard-head"><span class="qnum">Q' + (qi + 1) + '</span>' +
          '<span class="qstrand" style="background:' + t.color + '">' + t.name + "</span></div>" +
        '<p class="qtext">' + escapeHtml(item.q) + "</p>" +
        '<div class="qopts">' + opts + "</div></div>";
    }).join("");

    root.innerHTML =
      '<div class="intro"><p><a href="practice.html">← All topics</a> · Aligned to the Ontario Grade 5 curriculum. ' +
        'Answer the questions, then press <strong>Check my answers</strong> for your score and explanations.</p></div>' +
      '<form id="practice-form">' + cardsHtml + "</form>" +
      '<div class="quiz-actions"><p class="progress" id="p-progress">0 of ' + bank.length + ' answered</p>' +
        '<button type="button" id="p-check" class="cta-btn">Check my answers</button></div>' +
      '<section id="p-results" class="results" hidden aria-live="polite"></section>';

    var form = document.getElementById("practice-form");
    var progress = document.getElementById("p-progress");
    var results = document.getElementById("p-results");
    var TOTAL = bank.length;

    function answered() { var n = 0; for (var i = 0; i < TOTAL; i++) if (form.querySelector('input[name="p' + i + '"]:checked')) n++; return n; }
    function updateP() { progress.textContent = answered() + " of " + TOTAL + " answered"; }
    form.addEventListener("change", updateP);
    updateP();

    document.getElementById("p-check").addEventListener("click", function () {
      var n = answered();
      if (n < TOTAL) {
        progress.textContent = "Please answer all questions — " + (TOTAL - n) + " left.";
        progress.classList.add("progress-warn");
        for (var i = 0; i < TOTAL; i++) {
          if (!form.querySelector('input[name="p' + i + '"]:checked')) {
            var fu = form.children[i]; fu.classList.add("qcard-missing");
            fu.scrollIntoView({ behavior: "smooth", block: "center" });
            (function (el) { setTimeout(function () { el.classList.remove("qcard-missing"); }, 1800); })(fu);
            break;
          }
        }
        return;
      }
      progress.classList.remove("progress-warn");
      var score = 0;
      bank.forEach(function (item, qi) {
        var chosen = form.querySelector('input[name="p' + qi + '"]:checked');
        var ci = chosen ? parseInt(chosen.value, 10) : -1;
        var ok = ci === item.answer;
        if (ok) score++;
        var card = form.children[qi];
        card.classList.add(ok ? "qcard-correct" : "qcard-wrong");
        card.querySelectorAll(".qopt").forEach(function (label) {
          var input = label.querySelector("input");
          input.disabled = true;
          var oi = parseInt(input.value, 10);
          if (oi === item.answer) label.classList.add("opt-correct");
          if (oi === ci && !ok) label.classList.add("opt-wrong");
        });
        if (!card.querySelector(".explain")) {
          var ex = document.createElement("div"); ex.className = "explain";
          var verdict = ok ? '<span class="ex-correct">✓ Correct!</span> '
            : '<span class="ex-wrong">✗ Not quite.</span> The correct answer is <strong>' + escapeHtml(item.options[item.answer]) + "</strong>. ";
          ex.innerHTML = verdict + '<span class="ex-note">' + escapeHtml(item.explain) + "</span>";
          card.appendChild(ex);
        }
      });
      var pct = Math.round((score / TOTAL) * 100);
      results.innerHTML = '<h2 class="res-title">' + t.name + " — Score</h2>" +
        '<div class="res-overall"><div class="res-overall-num">' + score + "/" + TOTAL + "</div>" +
        '<div class="res-overall-pct">' + pct + "% correct</div></div>" +
        '<p class="res-hint">📖 Explanations now appear under each question above.</p>' +
        '<div class="res-actions"><button type="button" id="p-retry" class="cta-btn">Try again</button> ' +
          '<a class="nav-btn" href="practice.html">🎯 Other topics</a> ' +
          '<a class="nav-btn" href="diagnostic.html">📝 Diagnostic</a></div>';
      results.hidden = false;
      results.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("p-retry").addEventListener("click", function () {
        form.reset();
        Array.prototype.forEach.call(form.children, function (c) {
          c.classList.remove("qcard-correct", "qcard-wrong");
          c.querySelectorAll(".qopt").forEach(function (l) { l.classList.remove("opt-correct", "opt-wrong"); l.querySelector("input").disabled = false; });
          var ex = c.querySelector(".explain"); if (ex) ex.remove();
        });
        results.hidden = true; results.innerHTML = ""; updateP();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function shuffledIndices(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    for (var j = n - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = a[j]; a[j] = a[k]; a[k] = t;
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
