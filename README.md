# JH Math — Grade 5

A Grade 5 mathematics site aligned to **The Ontario Curriculum, Grades 1–8: Mathematics (2020)**.

> Note: the GitHub repo / live URL remain `AbbyMath` (renaming the repo would change the published
> URL). The site is branded **JH Math**.

## Pages

- **`index.html`** — the Grade 5 curriculum by strand (A–F).
- **`diagnostic.html`** — a 20-question diagnostic test. Scores each strand, shows an explained
  answer key, saves answer history (localStorage), and renders a clickable **knowledge-gap pie
  chart** linking to topic practice.
- **`practice.html?topic=KEY`** — 10 targeted practice questions per topic (10 topics / 100 Qs),
  with an explained answer key. No topic → a topic menu.
- **`warmup.html`** — **Warm-Up & Review**: generated daily-practice drills for foundational skills.

## Warm-Up & Review

Five weak-skill topics, each with **3 tasks × 10 generated questions** (randomized, difficulty-scaled):

1. **Multiplication & Division Facts (6, 7, 8, 9)** — basic fluency → mixed operations → timed challenge
2. **Addition & Subtraction with Regrouping** — simple → multi-step → compensation strategy
3. **Mental Math (Friendly Numbers)** — rounding → compensation → mixed strategies
4. **Time** — reading clocks & units → elapsed time → schedule word problems
5. **Money** — making change → decimal money add/subtract → real-life shopping

Features: progress/completion saved per task, retry-incorrect, encouraging feedback + animations,
a recurring-weak-area highlight, and a seeded **Daily Warm-Up** mixed set.

## Files

`styles.css` · `app.js` (curriculum reveal animations) · `topics.js` (diagnostic/practice topic
taxonomy) · `diagnostic.js` · `practice.js` · `warmup.js` (generators + engine).

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Static HTML/CSS/JS — no build step. Hosted with GitHub Pages.
