// JH Math — Warm-Up & Review. Generated daily-practice drills for weak foundational skills.
// 5 topics × 3 tasks × 10 questions, randomized & difficulty-scaled. Progress/history in localStorage.
(function () {
  "use strict";

  var STORE_KEY = "jhmath_g5_warmup_v1";

  // ---------- small helpers ----------
  function ri(r, min, max) { return Math.floor(r() * (max - min + 1)) + min; }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function fmtMoney(cents) { return Math.floor(cents / 100) + "." + pad(cents % 100); }
  function moneyCents(s) {
    var str = String(s).replace(/[$\s,]/g, "");
    if (str === "") return NaN;
    var f = parseFloat(str);
    return isNaN(f) ? NaN : Math.round(f * 100);
  }
  function tminutes(s) {
    var m = String(s).trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return NaN;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }
  function clock(h, m) { return h + ":" + pad(m); }
  function fmtDate(iso) { try { return new Date(iso).toLocaleString(); } catch (e) { return iso; } }
  function addMin(sh, sm, add) {
    var total = sm + add, em = total % 60, addH = Math.floor(total / 60);
    var eh = ((sh - 1 + addH) % 12) + 1;
    return [eh, em];
  }
  // seeded RNG (mulberry32) for the daily mix
  function makeRng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var RND = Math.random;

  // ---------- generators: each returns {prompt, answer, type, placeholder, hint} ----------
  function gFactsBasic(r, i) {
    var a = pick(r, [6, 7, 8, 9]), b = ri(r, 2, 9);
    return { prompt: a + " × " + b + " = ?", answer: String(a * b), type: "int", placeholder: "number" };
  }
  function gFactsMixed(r, i) {
    if (r() < 0.5) {
      var a = pick(r, [6, 7, 8, 9]), b = ri(r, 2, 9);
      return { prompt: a + " × " + b + " = ?", answer: String(a * b), type: "int", placeholder: "number" };
    }
    var x = pick(r, [6, 7, 8, 9]), y = ri(r, 2, 9), p = x * y;
    if (r() < 0.5) return { prompt: p + " ÷ " + x + " = ?", answer: String(y), type: "int", placeholder: "number" };
    return { prompt: p + " ÷ " + y + " = ?", answer: String(x), type: "int", placeholder: "number" };
  }
  function gFactsTimed(r, i) {
    if (r() < 0.5) {
      var a = pick(r, [6, 7, 8, 9]), b = ri(r, 3, 12);
      return { prompt: a + " × " + b + " = ?", answer: String(a * b), type: "int", placeholder: "number" };
    }
    var x = pick(r, [6, 7, 8, 9]), y = ri(r, 3, 12), p = x * y;
    return { prompt: p + " ÷ " + x + " = ?", answer: String(y), type: "int", placeholder: "number" };
  }

  function gRegroupSimple(r, i) {
    if (r() < 0.5) { // addition with carry
      var a = ri(r, 14, 79), b = ri(r, 14, 79);
      if ((a % 10) + (b % 10) < 10) b += (10 - ((a % 10) + (b % 10))); // force a carry
      if (b > 95) b = 95;
      return { prompt: a + " + " + b + " = ?", answer: String(a + b), type: "int", placeholder: "number" };
    }
    var aT = ri(r, 3, 9), aO = ri(r, 0, 4), A = aT * 10 + aO;          // subtraction with borrow
    var bO = ri(r, aO + 1, 9), bT = ri(r, 1, aT - 1), B = bT * 10 + bO;
    return { prompt: A + " − " + B + " = ?", answer: String(A - B), type: "int", placeholder: "number" };
  }
  function gRegroupMulti(r, i) {
    if (r() < 0.5) {
      var a = ri(r, 250, 799), b = ri(r, 250, 799);
      return { prompt: a + " + " + b + " = ?", answer: String(a + b), type: "int", placeholder: "number" };
    }
    var aH = ri(r, 4, 9), aT = ri(r, 0, 8), aO = ri(r, 0, 8), A = aH * 100 + aT * 10 + aO;
    var bH = ri(r, 1, aH - 1), bT = ri(r, aT + 1, 9), bO = ri(r, aO + 1, 9), B = bH * 100 + bT * 10 + bO;
    return { prompt: A + " − " + B + " = ?", answer: String(A - B), type: "int", placeholder: "number" };
  }
  function gCompensation(r, i) {
    if (r() < 0.5) {
      var a = ri(r, 120, 480), b = pick(r, [19, 29, 49, 98, 99, 198, 199]);
      return { prompt: a + " + " + b + " = ?", answer: String(a + b), type: "int", placeholder: "number", hint: "Tip: round up to a friendly number, then take the extra back." };
    }
    var x = ri(r, 220, 600), y = pick(r, [99, 98, 199, 49]);
    return { prompt: x + " − " + y + " = ?", answer: String(x - y), type: "int", placeholder: "number", hint: "Tip: subtract a friendly number, then adjust." };
  }

  function gRounding(r, i) {
    if (r() < 0.5) {
      var n = ri(r, 12, 989);
      return { prompt: "Round " + n + " to the nearest 10.", answer: String(Math.round(n / 10) * 10), type: "int", placeholder: "number" };
    }
    var m = ri(r, 150, 4950);
    return { prompt: "Round " + m + " to the nearest 100.", answer: String(Math.round(m / 100) * 100), type: "int", placeholder: "number" };
  }
  function gCompensation2(r, i) {
    var a = ri(r, 23, 78), b = pick(r, [9, 18, 19, 28, 29, 39]);
    if (r() < 0.5) return { prompt: a + " + " + b + " = ?", answer: String(a + b), type: "int", placeholder: "number", hint: "Try adding the next ten, then subtracting the extra." };
    var big = ri(r, 52, 98);
    return { prompt: big + " − " + b + " = ?", answer: String(big - b), type: "int", placeholder: "number", hint: "Subtract a friendly number first, then adjust." };
  }
  function gMentalMixed(r, i) {
    var roll = r();
    if (roll < 0.4) return gRounding(r, i);
    if (roll < 0.8) return gCompensation2(r, i);
    if (r() < 0.5) { var d = ri(r, 13, 49); return { prompt: "Double " + d + " = ?", answer: String(d * 2), type: "int", placeholder: "number" }; }
    var h = ri(r, 11, 49) * 2; return { prompt: "Half of " + h + " = ?", answer: String(h / 2), type: "int", placeholder: "number" };
  }

  function gTimeRead(r, i) {
    var mode = ri(r, 0, 2);
    if (mode === 0) { var h = ri(r, 2, 6); return { prompt: "How many minutes are in " + h + " hours?", answer: String(h * 60), type: "int", placeholder: "minutes" }; }
    if (mode === 1) { var m = ri(r, 2, 6); return { prompt: "How many seconds are in " + m + " minutes?", answer: String(m * 60), type: "int", placeholder: "seconds" }; }
    var phrase = pick(r, ["quarter past", "half past", "quarter to", "o'clock"]);
    var hr = ri(r, 1, 11);
    var ans;
    if (phrase === "quarter past") ans = clock(hr, 15);
    else if (phrase === "half past") ans = clock(hr, 30);
    else if (phrase === "quarter to") ans = clock(hr === 1 ? 12 : hr - 1, 45);
    else ans = clock(hr, 0);
    return { prompt: "Write “" + phrase + " " + hr + "” as a time (H:MM).", answer: ans, type: "time", placeholder: "e.g. 7:15" };
  }
  function gElapsed(r, i) {
    var sh = ri(r, 1, 10), sm = pick(r, [0, 5, 10, 15, 20, 30, 40, 45]);
    var add = pick(r, [10, 15, 20, 25, 30, 40, 45, 50, 60]);
    var e = addMin(sh, sm, add);
    if (r() < 0.5) return { prompt: "It is " + clock(sh, sm) + ". What time is it " + add + " minutes later?", answer: clock(e[0], e[1]), type: "time", placeholder: "e.g. 3:55" };
    return { prompt: "How many minutes from " + clock(sh, sm) + " to " + clock(e[0], e[1]) + "?", answer: String(add), type: "int", placeholder: "minutes" };
  }
  function gTimeWord(r, i) {
    var mode = ri(r, 0, 2);
    var sh = ri(r, 1, 9), sm = pick(r, [0, 15, 30, 45]);
    if (mode === 0) {
      var dur = pick(r, [30, 45, 60, 90, 120]);
      var e = addMin(sh, sm, dur);
      return { prompt: "A movie starts at " + clock(sh, sm) + " and lasts " + dur + " minutes. What time does it end?", answer: clock(e[0], e[1]), type: "time", placeholder: "e.g. 8:15" };
    }
    if (mode === 1) {
      var dur2 = pick(r, [20, 25, 35, 40, 50]);
      var e2 = addMin(sh, sm, dur2);
      return { prompt: "Recess begins at " + clock(sh, sm) + " and ends at " + clock(e2[0], e2[1]) + ". How many minutes long is it?", answer: String(dur2), type: "int", placeholder: "minutes" };
    }
    var dur3 = pick(r, [60, 90, 120, 150]);
    var e3 = addMin(sh, sm, dur3);
    return { prompt: "Class starts at " + clock(sh, sm) + " and runs for " + dur3 + " minutes. What time does it finish?", answer: clock(e3[0], e3[1]), type: "time", placeholder: "e.g. 11:30" };
  }

  function gChange(r, i) {
    var dollars = ri(r, 1, 18), cents = pick(r, [5, 10, 15, 20, 25, 40, 50, 75, 80, 95]);
    var cost = dollars * 100 + cents;
    var pays = [500, 1000, 2000];
    var pay = pays.filter(function (p) { return p > cost; })[0] || (Math.ceil(cost / 100) * 100 + 100);
    return { prompt: "An item costs $" + fmtMoney(cost) + ". You pay with $" + (pay / 100) + ".00. How much change?", answer: "$" + fmtMoney(pay - cost), type: "money", placeholder: "$0.00" };
  }
  function gMoneyAddSub(r, i) {
    var a = ri(r, 105, 1895), b = ri(r, 105, 1895);
    if (r() < 0.5) return { prompt: "$" + fmtMoney(a) + " + $" + fmtMoney(b) + " = ?", answer: "$" + fmtMoney(a + b), type: "money", placeholder: "$0.00" };
    if (b > a) { var t = a; a = b; b = t; }
    return { prompt: "$" + fmtMoney(a) + " − $" + fmtMoney(b) + " = ?", answer: "$" + fmtMoney(a - b), type: "money", placeholder: "$0.00" };
  }
  function gShopping(r, i) {
    var mode = ri(r, 0, 2);
    if (mode === 0) {
      var a = ri(r, 50, 450), b = ri(r, 50, 450);
      return { prompt: "An apple costs $" + fmtMoney(a) + " and a juice costs $" + fmtMoney(b) + ". How much for both?", answer: "$" + fmtMoney(a + b), type: "money", placeholder: "$0.00" };
    }
    if (mode === 1) {
      var have = ri(r, 10, 20) * 100, spend = ri(r, 320, have - 100);
      return { prompt: "You have $" + (have / 100) + ".00 and spend $" + fmtMoney(spend) + ". How much is left?", answer: "$" + fmtMoney(have - spend), type: "money", placeholder: "$0.00" };
    }
    var each = ri(r, 125, 480), qty = ri(r, 2, 4);
    return { prompt: qty + " notebooks cost $" + fmtMoney(each) + " each. What is the total cost?", answer: "$" + fmtMoney(each * qty), type: "money", placeholder: "$0.00" };
  }

  // ---------- topics ----------
  var TOPICS = [
    { key: "facts", name: "Multiplication & Division Facts", zh: "乘除法事实 (6, 7, 8, 9)", color: "#db2777", icon: "✖️",
      tasks: [
        { name: "Task 1 · Basic fluency", gen: gFactsBasic },
        { name: "Task 2 · Mixed operations", gen: gFactsMixed },
        { name: "Task 3 · Timed challenge", gen: gFactsTimed, timed: true },
      ] },
    { key: "regroup", name: "Addition & Subtraction with Regrouping", zh: "进位 / 退位加减法", color: "#2563eb", icon: "➕",
      tasks: [
        { name: "Task 1 · Simple regrouping", gen: gRegroupSimple },
        { name: "Task 2 · Multi-step regrouping", gen: gRegroupMulti },
        { name: "Task 3 · Compensation strategy", gen: gCompensation },
      ] },
    { key: "mental", name: "Mental Math (Friendly Numbers)", zh: "心算 · 凑整与补偿", color: "#7c3aed", icon: "🧠",
      tasks: [
        { name: "Task 1 · Rounding to friendly numbers", gen: gRounding },
        { name: "Task 2 · Compensation strategy", gen: gCompensation2 },
        { name: "Task 3 · Mixed mental strategies", gen: gMentalMixed },
      ] },
    { key: "time", name: "Time", zh: "时间", color: "#0d9488", icon: "⏰",
      tasks: [
        { name: "Task 1 · Reading clocks & units", gen: gTimeRead },
        { name: "Task 2 · Elapsed time", gen: gElapsed },
        { name: "Task 3 · Schedule word problems", gen: gTimeWord },
      ] },
    { key: "money", name: "Money", zh: "金钱", color: "#16a34a", icon: "💵",
      tasks: [
        { name: "Task 1 · Making change", gen: gChange },
        { name: "Task 2 · Decimal money add / subtract", gen: gMoneyAddSub },
        { name: "Task 3 · Real-life shopping", gen: gShopping },
      ] },
  ];
  var TOPIC_BY_KEY = {}; TOPICS.forEach(function (t) { TOPIC_BY_KEY[t.key] = t; });

  // ---------- grading ----------
  function grade(type, user, answer) {
    user = String(user).trim();
    if (!user) return false;
    if (type === "int") { var u = parseInt(user.replace(/[,\s]/g, ""), 10); return u === parseInt(answer, 10); }
    if (type === "money") { var c = moneyCents(user); return !isNaN(c) && c === moneyCents(answer); }
    if (type === "time") { var t = tminutes(user); return !isNaN(t) && t === tminutes(answer); }
    return user.toLowerCase().replace(/\s+/g, "") === String(answer).toLowerCase().replace(/\s+/g, "");
  }

  // ---------- storage ----------
  function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { tasks: {}, log: [] }; } catch (e) { return { tasks: {}, log: [] }; } }
  function save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch (e) {} }
  function recordResult(id, label, score, total, items) {
    var d = load(), pct = Math.round((score / total) * 100);
    var prev = d.tasks[id] || { bestPct: 0, attempts: 0 };
    d.tasks[id] = { bestPct: Math.max(prev.bestPct, pct), lastPct: pct, attempts: prev.attempts + 1, completed: Math.max(prev.bestPct, pct) >= 80 };
    d.log.push({ date: new Date().toISOString(), id: id, label: label, pct: pct, score: score, total: total, items: items || [] });
    if (d.log.length > 80) d.log = d.log.slice(d.log.length - 80);
    save(d);
  }
  function weakestTopic() {
    var d = load(), sums = {}, counts = {};
    d.log.forEach(function (e) {
      var key = e.id.split(":")[0];
      if (key === "daily") return;
      sums[key] = (sums[key] || 0) + e.pct; counts[key] = (counts[key] || 0) + 1;
    });
    var worst = null, worstAvg = 101;
    Object.keys(counts).forEach(function (k) {
      var avg = sums[k] / counts[k];
      if (avg < worstAvg) { worstAvg = avg; worst = k; }
    });
    if (worst && worstAvg < 75 && TOPIC_BY_KEY[worst]) return { key: worst, avg: Math.round(worstAvg) };
    return null;
  }

  // ---------- views ----------
  var root = document.getElementById("warmup-root");

  function renderMenu() {
    var weak = weakestTopic();
    var weakBanner = weak
      ? '<div class="weak-banner">🔎 Recurring weak area: <strong>' + TOPIC_BY_KEY[weak.key].name +
        "</strong> (avg " + weak.avg + '%). Let\'s practise it today!</div>'
      : "";
    var d = load();
    var today = new Date().toISOString().slice(0, 10);
    var dailyDone = d.log.some(function (e) { return e.id === "daily:" + today; });

    var dailyCard =
      '<div class="daily-card">' +
        '<div class="daily-text"><h2>🌅 Daily Warm-Up</h2>' +
          "<p>A fresh mixed set of 10 questions across all topics — same set all day. " +
          (dailyDone ? "You’ve done today’s set — great start! 🎉" : "Start your day with a quick review.") + "</p></div>" +
        '<button type="button" class="cta-btn" id="daily-btn">' + (dailyDone ? "Redo today’s mix" : "Start today’s mix") + "</button>" +
      "</div>";

    var cards = TOPICS.map(function (t) {
      var isWeak = weak && weak.key === t.key;
      var taskBtns = t.tasks.map(function (task, ti) {
        var id = t.key + ":" + ti;
        var s = load().tasks[id];
        var status = !s ? '<span class="task-status">Not started</span>'
          : s.completed ? '<span class="task-status done">✓ ' + s.bestPct + "%</span>"
          : '<span class="task-status">Best ' + s.bestPct + "%</span>";
        return '<button type="button" class="task-btn" data-topic="' + t.key + '" data-task="' + ti + '">' +
          '<span class="task-name">' + task.name + (task.timed ? ' <span class="timed-tag">⏱</span>' : "") + "</span>" + status + "</button>";
      }).join("");
      return '<section class="wtopic' + (isWeak ? " wtopic-weak" : "") + '" style="--tc:' + t.color + '">' +
        '<div class="wtopic-head"><span class="wtopic-icon">' + t.icon + "</span>" +
          '<div><h2>' + t.name + (isWeak ? ' <span class="focus-badge">Focus</span>' : "") + "</h2>" +
          '<p class="wtopic-zh">' + t.zh + "</p></div></div>" +
        '<div class="task-list">' + taskBtns + "</div></section>";
    }).join("");

    root.innerHTML = weakBanner + dailyCard +
      '<p class="wintro">Pick a topic and a task. Each task has <strong>10 questions</strong> that get a little harder. ' +
      "Your best score is saved on this device, and you can retry the ones you miss. 💪</p>" + cards + renderHistory();

    var db = document.getElementById("daily-btn");
    if (db) db.addEventListener("click", startDaily);
    root.querySelectorAll(".task-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { startTask(btn.dataset.topic, parseInt(btn.dataset.task, 10)); });
    });
    wireClear(root, function () { renderMenu(); });
  }

  // Per-attempt answer history (date/time, score, and every answer given)
  function historyRows(log) {
    return log.slice().reverse().map(function (e) {
      var items = (e.items || []).map(function (it, i) {
        return '<li class="' + (it.ok ? "hd-ok" : "hd-no") + '"><strong>' + (i + 1) + ".</strong> " +
          escapeHtml(it.prompt) + " — " + (it.ok ? "✓" : "✗") + " you: “" + escapeHtml(it.your || "—") + "”" +
          (it.ok ? "" : " · answer: “" + escapeHtml(it.answer) + "”") + "</li>";
      }).join("");
      return '<details class="hist-item"><summary>' +
        '<span class="hist-num">' + escapeHtml(e.label) + "</span>" +
        '<span class="hist-score">' + e.score + "/" + e.total + " · " + e.pct + "%</span>" +
        '<span class="hist-date">' + fmtDate(e.date) + "</span></summary>" +
        (items ? '<ul class="hist-detail">' + items + "</ul>" : "") + "</details>";
    }).join("");
  }
  function historyHtml(filterId, heading) {
    var log = (load().log || []);
    if (filterId) log = log.filter(function (e) { return e.id === filterId; });
    if (!log.length) return '<p class="hist-empty">No attempts saved yet — finish this task and press “Check my answers” to record your first score. 📅</p>';
    return '<div class="history-head"><h2>📊 ' + (heading || "Quiz history") + " (" + log.length + ")</h2>" +
      '<button type="button" class="link-btn" id="wclear">Clear history</button></div>' + historyRows(log);
  }
  function renderHistory() {
    if (!(load().log || []).length) return "";
    return '<section class="history">' + historyHtml(null, "Warm-Up history") + "</section>";
  }
  function wireClear(container, after) {
    var c = container.querySelector("#wclear");
    if (c) c.addEventListener("click", function () {
      if (window.confirm("Delete all Warm-Up answer history on this device? (Your best scores stay.)")) {
        var d = load(); d.log = []; save(d); after();
      }
    });
  }

  function buildQuestions(gen, n) {
    var qs = [], seen = {}, guard = 0;
    while (qs.length < n && guard < n * 12) {
      guard++;
      var q = gen(RND, qs.length);
      if (seen[q.prompt]) continue;
      seen[q.prompt] = 1; qs.push(q);
    }
    return qs;
  }

  function startTask(topicKey, taskIdx) {
    var topic = TOPIC_BY_KEY[topicKey], task = topic.tasks[taskIdx];
    var qs = buildQuestions(task.gen, 10);
    runSet({
      id: topicKey + ":" + taskIdx,
      label: topic.name + " — " + task.name,
      color: topic.color,
      timed: !!task.timed,
      questions: qs,
      regen: function () { return buildQuestions(task.gen, 10); },
    });
  }

  function startDaily() {
    var today = new Date().toISOString().slice(0, 10);
    var seed = parseInt(today.replace(/-/g, ""), 10);
    var r = makeRng(seed);
    var qs = [], seen = {}, guard = 0;
    while (qs.length < 10 && guard < 200) {
      guard++;
      var topic = pick(r, TOPICS), task = pick(r, topic.tasks);
      var q = task.gen(r, qs.length);
      if (seen[q.prompt]) continue;
      seen[q.prompt] = 1; qs.push(q);
    }
    runSet({
      id: "daily:" + today,
      label: "Daily Warm-Up · " + today,
      color: "#f59e0b",
      timed: false,
      questions: qs,
      regen: null,
    });
  }

  function runSet(cfg) {
    var startTime = Date.now();
    var cardsHtml = cfg.questions.map(function (q, i) {
      return '<div class="wq" data-i="' + i + '" style="--tc:' + cfg.color + '">' +
        '<div class="wq-prompt"><span class="wq-num">' + (i + 1) + ".</span> " + escapeHtml(q.prompt) + "</div>" +
        '<div class="wq-answer"><input class="wq-input" type="text" inputmode="' + (q.type === "time" ? "text" : "decimal") +
          '" autocomplete="off" placeholder="' + (q.placeholder || "answer") + '"><span class="wq-mark"></span></div>' +
        '<div class="wq-fix" hidden></div></div>';
    }).join("");

    root.innerHTML =
      '<div class="run-head"><button type="button" class="back-btn" id="back-btn">← Back to Warm-Up</button>' +
        '<h2 class="run-title" style="color:' + cfg.color + '">' + escapeHtml(cfg.label) + "</h2>" +
        (cfg.timed ? '<span class="stopwatch" id="stopwatch">⏱ 0s</span>' : "") + "</div>" +
      '<form id="run-form">' + cardsHtml + "</form>" +
      '<div class="quiz-actions"><p class="progress" id="run-progress">0 of ' + cfg.questions.length + ' answered</p>' +
        '<button type="button" class="cta-btn" id="check-btn">Check my answers</button>' +
        '<div class="hist-row"><button type="button" class="nav-btn" id="hist-btn">📊 Check my answer history</button></div></div>' +
      '<section id="run-history" class="history" hidden aria-live="polite"></section>' +
      '<section id="run-results" class="results" hidden aria-live="polite"></section>';

    var form = document.getElementById("run-form");
    var progress = document.getElementById("run-progress");
    var results = document.getElementById("run-results");
    var N = cfg.questions.length;

    document.getElementById("back-btn").addEventListener("click", function () { renderMenu(); window.scrollTo({ top: 0 }); });

    var histBtn = document.getElementById("hist-btn");
    var histPanel = document.getElementById("run-history");
    function refreshHist() { histPanel.innerHTML = historyHtml(cfg.id, "Quiz history — this task"); wireClear(histPanel, refreshHist); }
    histBtn.addEventListener("click", function () {
      if (histPanel.hidden) {
        refreshHist(); histPanel.hidden = false;
        histBtn.textContent = "Hide answer history";
        histPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        histPanel.hidden = true; histBtn.textContent = "📊 Check my answer history";
      }
    });

    var swTimer = null;
    if (cfg.timed) {
      var sw = document.getElementById("stopwatch");
      swTimer = setInterval(function () { sw.textContent = "⏱ " + Math.round((Date.now() - startTime) / 1000) + "s"; }, 500);
    }

    function answered() { return form.querySelectorAll(".wq-input").length ? Array.prototype.filter.call(form.querySelectorAll(".wq-input"), function (inp) { return inp.value.trim() !== ""; }).length : 0; }
    function updateP() { progress.textContent = answered() + " of " + N + " answered"; }
    form.addEventListener("input", updateP);
    updateP();

    document.getElementById("check-btn").addEventListener("click", function () {
      var inputs = form.querySelectorAll(".wq-input");
      if (answered() < N) {
        progress.textContent = "Please answer all questions — " + (N - answered()) + " left.";
        progress.classList.add("progress-warn");
        for (var k = 0; k < inputs.length; k++) { if (!inputs[k].value.trim()) { inputs[k].focus(); inputs[k].closest(".wq").scrollIntoView({ behavior: "smooth", block: "center" }); break; } }
        return;
      }
      progress.classList.remove("progress-warn");
      if (swTimer) { clearInterval(swTimer); swTimer = null; }

      var score = 0, wrong = [], items = [];
      cfg.questions.forEach(function (q, i) {
        var card = form.children[i], inp = card.querySelector(".wq-input"), mark = card.querySelector(".wq-mark"), fix = card.querySelector(".wq-fix");
        var ok = grade(q.type, inp.value, q.answer);
        items.push({ prompt: q.prompt, your: inp.value.trim(), answer: q.answer, ok: ok });
        inp.disabled = true;
        card.classList.remove("wq-correct", "wq-wrong");
        card.classList.add(ok ? "wq-correct" : "wq-wrong");
        mark.textContent = ok ? "✓" : "✗";
        if (ok) { score++; fix.hidden = true; }
        else {
          wrong.push(q);
          fix.hidden = false;
          fix.innerHTML = '<strong>Answer:</strong> ' + escapeHtml(q.answer) + (q.hint ? ' · <span class="wq-hint">' + escapeHtml(q.hint) + "</span>" : "");
        }
      });

      var pct = Math.round((score / N) * 100);
      var secs = Math.round((Date.now() - startTime) / 1000);
      recordResult(cfg.id, cfg.label, score, N, items);

      var msg = pct === 100 ? "Perfect! 🌟 You nailed every one!"
        : pct >= 80 ? "Great job! 🎉 You're getting strong at this."
        : pct >= 60 ? "Nice work — almost there! Try the ones you missed. 👍"
        : "Keep practising — you've got this! 💪";

      results.innerHTML =
        '<h2 class="res-title">' + (pct >= 80 ? "🎉 " : "") + score + " / " + N + " correct</h2>" +
        '<div class="res-overall"><div class="res-overall-num" style="color:' + cfg.color + '">' + pct + "%</div>" +
          (cfg.timed ? '<div class="res-overall-pct">finished in ' + secs + "s</div>" : "") + "</div>" +
        '<div class="encourage' + (pct >= 80 ? " celebrate" : "") + '">' + msg + "</div>" +
        '<div class="res-actions">' +
          (wrong.length ? '<button type="button" class="cta-btn" id="retry-wrong">Retry ' + wrong.length + " incorrect</button> " : "") +
          (cfg.regen ? '<button type="button" class="nav-btn" id="new-set">New set</button> ' : "") +
          '<button type="button" class="nav-btn" id="to-menu">← All warm-ups</button></div>';
      results.hidden = false;
      results.scrollIntoView({ behavior: "smooth", block: "start" });

      var rw = document.getElementById("retry-wrong");
      if (rw) rw.addEventListener("click", function () { runSet({ id: cfg.id, label: cfg.label + " (retry)", color: cfg.color, timed: cfg.timed, questions: wrong.slice(), regen: cfg.regen }); window.scrollTo({ top: 0 }); });
      var ns = document.getElementById("new-set");
      if (ns) ns.addEventListener("click", function () { runSet({ id: cfg.id, label: cfg.label, color: cfg.color, timed: cfg.timed, questions: cfg.regen(), regen: cfg.regen }); window.scrollTo({ top: 0 }); });
      document.getElementById("to-menu").addEventListener("click", function () { renderMenu(); window.scrollTo({ top: 0 }); });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  renderMenu();
})();
