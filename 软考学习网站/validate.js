const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, 'data');
const sandbox = { window: {} };
vm.createContext(sandbox);

const files = fs.readdirSync(dir).filter(f => f.startsWith('lesson-') && f.endsWith('.js')).sort();
let totalErrors = 0;

// load days-meta
vm.runInContext(fs.readFileSync(path.join(dir, 'days-meta.js'), 'utf8'), sandbox);
const meta = sandbox.window.DAYS_META;
const metaDates = new Set(meta.map(d => d.date));
console.log('days-meta: ' + meta.length + ' days loaded');

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    vm.runInContext(code, sandbox);
  } catch (e) {
    console.log('[SYNTAX ERROR] ' + f + ' -> ' + e.message);
    totalErrors++;
    continue;
  }
  const m = f.match(/lesson-(\d{4}-\d{2}-\d{2})\.js/);
  const date = m ? m[1] : null;
  if (date && !metaDates.has(date)) {
    console.log('[WARN] ' + f + ': date not in days-meta');
  }
  const L = sandbox.window.LESSONS[date];
  if (!L) { console.log('[ERROR] ' + f + ': window.LESSONS[date] missing'); totalErrors++; continue; }
  let errs = [];
  if (!L.topic) errs.push('missing topic');
  if (!L.lecture || L.lecture.length < 200) errs.push('lecture too short/missing');
  if (L.quiz === null || L.quiz === undefined) {
    if (!L.noQuizNote) errs.push('no quiz but no noQuizNote');
  } else {
    const q = L.quiz;
    if (!Array.isArray(q.questions) || q.questions.length === 0) errs.push('no questions');
    else {
      const ids = new Set();
      q.questions.forEach((it, i) => {
        const ref = 'Q' + (it.id || i);
        if (ids.has(it.id)) errs.push(ref + ' duplicate id');
        ids.add(it.id);
        if (!it.section) errs.push(ref + ' missing section');
        if (!it.question) errs.push(ref + ' missing question');
        if (!it.analysis) errs.push(ref + ' missing analysis');
        if (it.type === 'blank') {
          if (!it.answer) errs.push(ref + ' blank missing answer');
          if (!it.hint) errs.push(ref + ' blank missing hint');
        } else {
          if (!Array.isArray(it.options) || it.options.length !== 4) errs.push(ref + ' options != 4');
          if (!it.answer || !/^[A-D]$/.test(it.answer)) errs.push(ref + ' answer invalid: ' + it.answer);
          else if (!it.options) {} else {
            const idx = it.answer.charCodeAt(0) - 65;
            if (idx >= it.options.length) errs.push(ref + ' answer out of range');
          }
        }
      });
      // answer distribution
      const dist = { A: 0, B: 0, C: 0, D: 0 };
      q.questions.forEach(it => { if (!it.type && it.answer && /^[A-D]$/.test(it.answer)) dist[it.answer]++; });
      console.log('  ' + f + ' -> ' + q.questions.length + ' questions, answers: A' + dist.A + ' B' + dist.B + ' C' + dist.C + ' D' + dist.D + (q.kind ? ', kind=' + q.kind : ''));
    }
  }
  if (errs.length) { console.log('[ERROR] ' + f + ': ' + errs.join('; ')); totalErrors += errs.length; }
}

// check all meta dates within lesson range have lesson files (except done-before-9/17)
const lessonDates = new Set(files.map(f => f.match(/(\d{4}-\d{2}-\d{2})/)[1]));
const missing = [];
meta.forEach(d => {
  if (d.date >= '2026-09-17' && d.date <= '2026-10-13' && !lessonDates.has(d.date)) missing.push(d.date);
});
if (missing.length) { console.log('[WARN] days without lesson file: ' + missing.join(', ')); }

console.log(totalErrors === 0 ? '\nALL CHECKS PASSED' : '\nTOTAL ERRORS: ' + totalErrors);
