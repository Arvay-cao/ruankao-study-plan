(function () {
  'use strict';

  var STORE_KEY = 'rkStudySiteV1';
  var EXAM_DATE = '2026-10-24';
  var DAYS = window.DAYS_META || [];
  var LESSONS = window.LESSONS || {};
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  var store = loadStore();
  var openWeeks = {};
  var curPractice = null; // {date, onlyWrong, scope, answers, startTs}
  var timerInt = null;
  var modalCb = null;

  /* ---------------- utils ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function todayStr() {
    var t = new Date();
    var m = ('0' + (t.getMonth() + 1)).slice(-2);
    var d = ('0' + t.getDate()).slice(-2);
    return t.getFullYear() + '-' + m + '-' + d;
  }
  function daysLeft(ds) {
    var t = new Date(todayStr() + 'T00:00:00');
    var e = new Date(ds + 'T00:00:00');
    return Math.round((e - t) / 86400000);
  }
  function fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    function p(x) { return ('0' + x).slice(-2); }
    return (h > 0 ? h + ':' : '') + p(m) + ':' + p(s);
  }
  function fmtDateCN(iso) {
    if (!iso) return '';
    return iso.slice(5, 10).replace('-', '/') + ' ' + iso.slice(11, 16);
  }
  function normAns(s) {
    var out = '';
    s = String(s == null ? '' : s);
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 0xFF01 && c <= 0xFF5E) c -= 0xFEE0;
      else if (c === 0x3000) c = 32;
      out += String.fromCharCode(c);
    }
    return out.replace(/\s+/g, '').toUpperCase();
  }
  function isCorrect(q, a) {
    if (!a) return false;
    if (q.type === 'blank') {
      if (normAns(a) === normAns(q.answer)) return true;
      if (q.accept) {
        for (var i = 0; i < q.accept.length; i++) if (normAns(a) === normAns(q.accept[i])) return true;
      }
      return false;
    }
    return a === q.answer;
  }
  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { }
  }
  function recOf(date) {
    store.lessons = store.lessons || {};
    if (!store.lessons[date]) store.lessons[date] = { answers: {}, attempts: 0, history: [] };
    return store.lessons[date];
  }
  function hasLesson(date) {
    var l = LESSONS[date];
    return !!(l && (l.lecture || (l.quiz && l.quiz.questions && l.quiz.questions.length)));
  }
  function metaOf(date) {
    for (var i = 0; i < DAYS.length; i++) if (DAYS[i].date === date) return DAYS[i];
    return null;
  }
  function curDate() {
    var m = (location.hash || '').match(/^#\/day\/(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
  }

  /* ---------------- 侧边栏 ---------------- */
  function groupDays() {
    var groups = [];
    DAYS.forEach(function (d) {
      var g = null;
      for (var i = 0; i < groups.length; i++) if (groups[i].week === d.week) { g = groups[i]; break; }
      if (!g) { g = { week: d.week, days: [] }; groups.push(g); }
      g.days.push(d);
    });
    return groups;
  }
  function dayStatus(date) {
    var meta = metaOf(date);
    var lesson = LESSONS[date];
    var hasQ = !!(lesson && lesson.quiz && lesson.quiz.questions && lesson.quiz.questions.length);
    var rec = store.lessons && store.lessons[date];
    if (rec && rec.score) return { cls: 'done', title: '已练习：' + rec.score.correct + '/' + rec.score.total };
    if (hasQ) return { cls: 'ready', title: '讲义与习题已就绪' };
    if (lesson && (lesson.lecture || lesson.noQuizNote)) return { cls: 'ready', title: '讲义/指南已就绪（本日无在线习题）' };
    if (meta && meta.done) return { cls: 'hist', title: '执行表标记已完成' };
    return { cls: 'pending', title: '讲义待生成' };
  }
  function renderSidebar() {
    var groups = groupDays();
    var today = todayStr();
    var active = curDate();
    var html = '<div class="brand"><div class="t">软考软件设计师</div><div class="s">八周计划 · 讲义与习题</div></div>';
    groups.forEach(function (g) {
      var open = openWeeks[g.week] ? ' open' : '';
      var range = g.days[0].date.slice(5).replace('-', '/') + ' — ' + g.days[g.days.length - 1].date.slice(5).replace('-', '/');
      html += '<div class="week-group' + open + '">' +
        '<div class="week-head" data-act="week" data-week="' + esc(g.week) + '">' +
        '<span>' + esc(g.week) + '（' + range + '）</span><span class="arrow">&#9654;</span></div>' +
        '<div class="week-body">';
      g.days.forEach(function (d) {
        var st = dayStatus(d.date);
        html += '<a class="day-item' + (d.date === active ? ' active' : '') + (d.date === today ? ' is-today' : '') +
          '" href="#/day/' + d.date + '" title="' + esc(st.title) + '">' +
          '<span class="d">' + d.date.slice(5).replace('-', '/') + '</span>' +
          '<span class="tp">' + esc(d.topic) + '</span>' +
          '<span class="dot ' + st.cls + '"></span></a>';
      });
      html += '</div></div>';
    });
    $('#sidebar').innerHTML = html;
  }
  function mNavHTML(sel) {
    var groups = groupDays();
    var html = '<div class="m-nav"><select id="m-select">';
    groups.forEach(function (g) {
      html += '<optgroup label="' + esc(g.week) + '">';
      g.days.forEach(function (d) {
        html += '<option value="' + d.date + '"' + (d.date === sel ? ' selected' : '') + '>' +
          d.date.slice(5).replace('-', '/') + ' ' + esc(d.topic) + '</option>';
      });
      html += '</optgroup>';
    });
    return html + '</select></div>';
  }

  /* ---------------- 首页 ---------------- */
  function renderHome() {
    var today = todayStr();
    var tMeta = null;
    DAYS.forEach(function (d) { if (d.date === today) tMeta = d; });
    var lessonDates = Object.keys(LESSONS).sort();
    var latest = lessonDates[lessonDates.length - 1] || null;
    var practiced = [];
    Object.keys(store.lessons || {}).forEach(function (d) {
      var r = store.lessons[d];
      if (r && r.submittedAt && r.score) practiced.push({ date: d, rec: r });
    });
    practiced.sort(function (a, b) { return a.rec.submittedAt < b.rec.submittedAt ? 1 : -1; });
    var sumC = 0, sumT = 0, attempts = 0;
    practiced.forEach(function (p) { sumC += p.rec.score.correct; sumT += p.rec.score.total; attempts += (p.rec.attempts || 1); });
    var avg = sumT ? (sumC / sumT * 100).toFixed(1) + '%' : '—';
    var examLeft = daysLeft(EXAM_DATE);
    var examTxt = examLeft > 0 ? '距离考试（10/24）还有 ' + examLeft + ' 天' : (examLeft >= -1 ? '考试窗口进行中，稳定心态' : '本轮考试已结束');

    var heroBtn = '';
    if (hasLesson(today)) heroBtn = '<a class="btn btn-primary" href="#/day/' + today + '">进入今日学习</a>';
    else if (latest) heroBtn = '<a class="btn btn-primary" href="#/day/' + latest + '">继续学习：' + latest.slice(5).replace('-', '/') + ' ' + esc((metaOf(latest) || {}).topic || '') + '</a>';

    var todayPlan = tMeta
      ? '<div class="task" style="margin-top:12px"><b>今日计划（' + esc(tMeta.week) + ' · ' + esc(tMeta.topic) + '）：</b>' + esc(tMeta.task) + '（计划 ' + tMeta.hours + ' 小时）' + (hasLesson(today) ? '' : '　<i style="color:#6b7489">— 讲义待生成</i>') + '</div>'
      : '<div class="task" style="margin-top:12px">今天不在计划日程内，可复习已有讲义或休息调整。</div>';

    var recHTML = practiced.length
      ? practiced.slice(0, 8).map(function (p) {
        var m = metaOf(p.date) || {};
        var r = (p.rec.score.correct / p.rec.score.total) * 100;
        var cls = r >= 73 ? 'good' : (r >= 60 ? 'mid' : 'bad');
        return '<div class="record-item"><span><a href="#/day/' + p.date + '">' + p.date.slice(5).replace('-', '/') + ' ' + esc(m.topic || '') + '</a>　<span style="color:#6b7489;font-size:12.5px">' + fmtDateCN(p.rec.submittedAt) + '</span></span>' +
          '<span class="score ' + cls + '">' + p.rec.score.correct + '/' + p.rec.score.total + '（' + r.toFixed(0) + '%）</span></div>';
      }).join('')
      : '<div style="color:#6b7489;font-size:13.5px;padding:6px 0">还没有练习记录，从左侧选择一天开始吧。</div>';

    $('#main').innerHTML = '' +
      '<div class="content-wrap">' +
      mNavHTML(null) +
      '<div class="card hero">' +
      '<div class="hello">今天是 ' + today + '</div>' +
      '<h1>软件设计师 · 学习站</h1>' +
      '<div class="exam-count">' + examTxt + '</div>' +
      todayPlan +
      (heroBtn ? '<div style="margin-top:14px">' + heroBtn + '</div>' : '') +
      '</div>' +
      '<div class="stat-row">' +
      '<div class="stat-card"><div class="num">' + lessonDates.length + '</div><div class="lbl">已上线讲义（天）</div></div>' +
      '<div class="stat-card"><div class="num">' + practiced.length + '</div><div class="lbl">已完成练习（天）</div></div>' +
      '<div class="stat-card"><div class="num">' + avg + '</div><div class="lbl">平均正确率</div></div>' +
      '<div class="stat-card"><div class="num">' + attempts + '</div><div class="lbl">累计整卷练习（次）</div></div>' +
      '</div>' +
      '<div class="home-sec-title">最近练习记录</div>' +
      '<div class="card">' + recHTML + '</div>' +
      '<div class="home-sec-title">使用说明</div>' +
      '<div class="card" style="font-size:13.8px;color:#414a5e">' +
      '<ol style="margin:0;padding-left:20px">' +
      '<li>左侧按周列出全部学习日：<b>灰点</b>=讲义待生成，<b>蓝点</b>=讲义已就绪待练习，<b>绿点</b>=已完成练习。</li>' +
      '<li>每天包含「讲义」与「习题」两个标签页；讲义按考点详解，习题为软考上午题型单选题。</li>' +
      '<li>在线作答后点击「提交批改」自动判分，显示得分、折算上午分、小节掌握度与逐题解析；支持「重做整卷」与「错题重练」。</li>' +
      '<li>作答与成绩保存在本机浏览器（localStorage），刷新或关闭页面不丢失。</li>' +
      '</ol></div>' +
      '</div>';
  }

  /* ---------------- 日页 ---------------- */
  function renderDay(date, tab) {
    var meta = metaOf(date);
    if (!meta) {
      $('#main').innerHTML = '<div class="content-wrap"><div class="card empty-state">未找到该日期的学习计划。</div></div>';
      return;
    }
    var lesson = LESSONS[date];
    var qn = lesson && lesson.quiz && lesson.quiz.questions ? lesson.quiz.questions.length : 0;
    var rec = store.lessons && store.lessons[date];
    var practiceChip;
    if (rec && rec.score) practiceChip = '<span class="chip green">已练习 ' + rec.score.correct + '/' + rec.score.total + '</span>';
    else if (lesson) practiceChip = '<span class="chip">待练习</span>';
    else practiceChip = '<span class="chip gray">内容待生成</span>';

    $('#main').innerHTML = '' +
      '<div class="' + (tab === 'lecture' ? 'content-wrap has-toc' : 'content-wrap') + '">' +
      mNavHTML(date) +
      '<div class="card day-head">' +
      '<div class="top">' +
      '<span class="chip gray">' + date.slice(5).replace('-', '/') + ' ' + esc(meta.weekday) + '</span>' +
      '<span class="chip gray">' + esc(meta.week) + '</span>' +
      '<span class="chip gray">' + esc(meta.phase) + '</span>' +
      (meta.done ? '<span class="chip amber">执行表已完成</span>' : '') +
      practiceChip +
      '</div>' +
      '<h1>' + esc(meta.topic) + '</h1>' +
      '<div class="task"><b>今日任务：</b>' + esc(meta.task) + '（计划 ' + meta.hours + ' 小时）</div>' +
      (meta.output ? '<div class="meta">当天产出：' + esc(meta.output) + '</div>' : '') +
      '</div>' +
      '<div class="tabs">' +
      '<a class="tab' + (tab === 'lecture' ? ' active' : '') + '" href="#/day/' + date + '/lecture">讲义</a>' +
      '<a class="tab' + (tab === 'quiz' ? ' active' : '') + '" href="#/day/' + date + '/quiz">习题' + (qn ? '（' + qn + ' 题）' : '') + '</a>' +
      '</div>' +
      '<div id="tab-body"></div>' +
      '</div>';
    renderTabBody(date, tab);
  }

  function renderTabBody(date, tab) {
    var box = $('#tab-body');
    var lesson = LESSONS[date];
    if (!lesson) {
      var meta = metaOf(date) || {};
      box.innerHTML = '<div class="card empty-state"><div class="icon">&#128235;</div>' +
        '<p>该日的讲义与习题尚未生成。</p>' +
        '<div class="do-task">当日任务：' + esc(meta.task || '') + '</div></div>';
      return;
    }
    if (tab === 'lecture') {
      stopTimer(); curPractice = null;
      box.innerHTML = renderLecture(date);
      window.scrollTo(0, 0);
      tocSpy();
    } else {
      var qz = (lesson.quiz && lesson.quiz.questions) ? lesson.quiz.questions : [];
      if (!qz.length) {
        stopTimer(); curPractice = null;
        box.innerHTML = '<div class="card empty-state"><div class="icon">&#128221;</div><p>' + esc(lesson.noQuizNote || '本日无在线习题，请按讲义指引完成训练。') + '</p></div>';
        window.scrollTo(0, 0);
        return;
      }
      var rec = store.lessons && store.lessons[date];
      if (rec && rec.submittedAt && rec.score) {
        stopTimer(); curPractice = null;
        box.innerHTML = renderResult(date);
      } else {
        box.innerHTML = startPractice(date, false);
        updateToolbar(); startTimer();
      }
      window.scrollTo(0, 0);
    }
  }

  /* ---------------- 讲义 ---------------- */
  function renderLecture(date) {
    var lesson = LESSONS[date];
    var tmp = document.createElement('div');
    tmp.innerHTML = lesson.lecture || '<p>讲义内容待补充。</p>';
    var heads = tmp.querySelectorAll('h2, h3');
    var toc = [];
    Array.prototype.forEach.call(heads, function (h, i) {
      var id = 'lech-' + i;
      h.id = id;
      toc.push({ id: id, sub: h.tagName === 'H3', text: (h.textContent || '').replace(/\s+/g, ' ').trim() });
    });
    if (!toc.length) return '<div class="lecture">' + tmp.innerHTML + '</div>';
    var tocHTML =
      '<aside class="toc-aside" id="toc-aside">' +
      '<div class="toc-title"><span>本讲目录</span><span class="toc-close" data-act="toc-close" title="收起目录">&#215;</span></div>' +
      '<ol class="toc-list">' +
      toc.map(function (t) {
        return '<li' + (t.sub ? ' class="toc-sub"' : '') + '><a data-act="toc" data-target="' + t.id + '">' + esc(t.text) + '</a></li>';
      }).join('') + '</ol></aside>' +
      '<button class="toc-fab" data-act="toc-fab"><span class="fab-ico">&#9776;</span>目录</button>';
    return '<div class="lecture lecture-row">' +
      '<div class="lecture-main">' + tmp.innerHTML + '</div>' +
      tocHTML +
      '</div>';
  }

  /* ---------------- 讲义目录定位（滚动高亮当前小节） ---------------- */
  var tocRaf = false;
  function tocSpy() {
    var aside = $('#toc-aside');
    if (!aside) return;
    var links = aside.querySelectorAll('a[data-act="toc"]');
    if (!links.length) return;
    var docTop = window.scrollY || document.documentElement.scrollTop;
    var line = docTop + 150;
    var pairs = [];
    Array.prototype.forEach.call(links, function (a) {
      var t = document.getElementById(a.getAttribute('data-target'));
      if (t) pairs.push({ a: a, top: t.getBoundingClientRect().top + docTop });
    });
    if (!pairs.length) return;
    var cur = null;
    for (var i = 0; i < pairs.length; i++) if (pairs[i].top <= line) cur = pairs[i].a;
    if (!cur && window.innerHeight + docTop >= document.documentElement.scrollHeight - 4) cur = pairs[pairs.length - 1].a;
    Array.prototype.forEach.call(links, function (a) { a.classList.toggle('active', a === cur); });
  }
  function tocOnScroll() {
    if (tocRaf) return;
    tocRaf = true;
    requestAnimationFrame(tocSpy);
  }

  /* ---------------- 练习 ---------------- */
  function qCardHTML(q, sel) {
    var body;
    if (q.type === 'blank') {
      body = '<div class="blank-row"><input class="blank-input" type="text" data-qid="' + q.id + '" value="' + esc(sel || '') + '" placeholder="' + esc(q.hint || '输入答案，作答自动保存') + '" autocomplete="off"></div>';
    } else {
      body = (q.options || []).map(function (o, i) {
        return '<div class="opt' + (sel === LETTERS[i] ? ' selected' : '') + '" data-act="opt" data-qid="' + q.id + '" data-val="' + LETTERS[i] + '">' +
          '<span class="opt-letter">' + LETTERS[i] + '</span><span class="opt-text">' + esc(o) + '</span></div>';
      }).join('');
    }
    return '<div class="card q-card" id="q-' + q.id + '">' +
      '<div class="q-head"><span class="q-no">第 ' + q.id + ' 题</span>' +
      (q.section ? '<span class="q-sec">' + esc(q.section) + '</span>' : '') + '</div>' +
      '<div class="q-text">' + q.question + '</div>' + body + '</div>';
  }

  function startPractice(date, onlyWrong) {
    var lesson = LESSONS[date];
    if (!lesson || !lesson.quiz || !lesson.quiz.questions || !lesson.quiz.questions.length) {
      return '<div class="card empty-state"><div class="icon">&#128221;</div><p>' + esc((lesson && lesson.noQuizNote) || '本日无在线习题，请按讲义指引完成训练。') + '</p></div>';
    }
    var all = lesson.quiz.questions;
    var scope = all;
    var note = lesson.quiz.note || '请在独立作答完成后再查看解析。';
    if (onlyWrong) {
      var rec = store.lessons && store.lessons[date];
      var wrongIds = (rec && rec.latest && rec.latest.wrongIds) || [];
      scope = all.filter(function (q) { return wrongIds.indexOf(q.id) >= 0; });
      if (!scope.length) return '<div class="card empty-state">没有需要重练的错题。</div>';
      note = '错题重练模式：仅包含上次批改中答错或未作答的题目，本次成绩单独显示，不影响整卷成绩。';
    }
    var prev = {};
    if (!onlyWrong && store.lessons && store.lessons[date] && store.lessons[date].answers) {
      prev = store.lessons[date].answers;
    }
    curPractice = { date: date, onlyWrong: !!onlyWrong, scope: scope, answers: Object.assign({}, prev), startTs: Date.now() };
    var cards = scope.map(function (q) { return qCardHTML(q, curPractice.answers[q.id]); }).join('');
    var min = lesson.quiz.suggestedMinutes || 60;
    return '<div class="quiz-note">' + esc(note) + '（建议 ' + min + ' 分钟内完成）</div>' +
      '<div class="quiz-toolbar">' +
      '<span class="prog">已答 <b id="answered-n">0</b> / ' + scope.length + '</span>' +
      '<span class="timer" id="quiz-timer">00:00</span>' +
      '<span class="spacer"></span>' +
      '<button class="btn btn-primary" data-act="submit">提交批改</button>' +
      '</div>' +
      (lesson.quiz.scenario ? '<div class="card lecture scenario-card">' + lesson.quiz.scenario + '</div>' : '') +
      '<div id="q-list">' + cards + '</div>';
  }

  function updateToolbar() {
    if (!curPractice) return;
    var n = 0;
    curPractice.scope.forEach(function (q) { if (curPractice.answers[q.id]) n++; });
    var el = $('#answered-n');
    if (el) el.textContent = n;
  }

  function startTimer() {
    stopTimer();
    timerInt = setInterval(function () {
      var el = $('#quiz-timer');
      if (el && curPractice) el.textContent = fmtTime((Date.now() - curPractice.startTs) / 1000);
    }, 1000);
  }
  function stopTimer() {
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
  }

  function doSubmit() {
    if (!curPractice) return;
    var date = curPractice.date, onlyWrong = curPractice.onlyWrong;
    var scope = curPractice.scope, answers = curPractice.answers;
    var spent = Math.round((Date.now() - curPractice.startTs) / 1000);
    var correct = 0, wrongIds = [], unanswered = 0;
    scope.forEach(function (q) {
      if (!answers[q.id]) { unanswered++; wrongIds.push(q.id); }
      else if (isCorrect(q, answers[q.id])) correct++;
      else wrongIds.push(q.id);
    });
    var rec = recOf(date);
    var now = new Date().toISOString();
    rec.latest = {
      answers: Object.assign({}, answers), wrongIds: wrongIds,
      correct: correct, total: scope.length, unanswered: unanswered,
      at: now, spentSec: spent, mode: onlyWrong ? 'retry' : 'full'
    };
    if (!onlyWrong) {
      rec.answers = Object.assign({}, answers);
      rec.score = { correct: correct, total: scope.length, unanswered: unanswered };
      rec.spentSec = spent;
      rec.submittedAt = now;
      rec.attempts = (rec.attempts || 0) + 1;
      rec.history = rec.history || [];
      rec.history.push({ at: now, correct: correct, total: scope.length, spentSec: spent });
    } else {
      rec.retryCount = (rec.retryCount || 0) + 1;
    }
    persist();
    curPractice = null;
    stopTimer();
    renderTabBody(date, 'quiz');
    renderSidebar();
  }

  /* ---------------- 批改结果 ---------------- */
  function sectionStats(all, answers) {
    var map = {};
    var order = [];
    all.forEach(function (q) {
      var key = q.section || '未分组';
      if (!map[key]) { map[key] = { total: 0, correct: 0 }; order.push(key); }
      map[key].total++;
      if (isCorrect(q, answers[q.id])) map[key].correct++;
    });
    return order.map(function (k) { return [k, map[k]]; });
  }

  function rCardHTML(q, mine) {
    var ok = isCorrect(q, mine);
    var optsHTML = '';
    if (q.type === 'blank') {
      optsHTML = '<div class="blank-row"><input class="blank-input' + (mine ? (ok ? ' correct' : ' wrong') : ' wrong') + '" type="text" value="' + esc(mine || '') + '" disabled></div>';
    } else {
      optsHTML = (q.options || []).map(function (o, i) {
        var L = LETTERS[i];
        var cls = 'opt disabled';
        var tag = '';
        if (L === q.answer) { cls += ' correct'; tag = '<span class="opt-tag">正确答案</span>'; }
        else if (mine && L === mine) { cls += ' wrong'; tag = '<span class="opt-tag">你的选择</span>'; }
        return '<div class="' + cls + '"><span class="opt-letter">' + L + '</span><span class="opt-text">' + esc(o) + '</span>' + tag + '</div>';
      }).join('');
    }
    var statusTxt = !mine ? '未作答' : (ok ? '回答正确' : '回答错误');
    var mineHTML = mine ? '<b class="' + (ok ? 'mine-ok' : 'mine-wrong') + '">' + esc(mine) + '</b>' : '<b class="mine-wrong">未作答</b>';
    var ansHTML;
    if (q.type === 'blank') {
      ansHTML = '<b class="mine-ok">' + esc(q.answer) + (q.accept && q.accept.length ? '（也可接受：' + q.accept.map(esc).join(' / ') + '）' : '') + '</b>';
    } else {
      ansHTML = '<b class="mine-ok">' + q.answer + '</b>';
    }
    return '<div class="card q-card r-card ' + (ok ? 'ok' : 'no') + '" data-ok="' + (ok ? 1 : 0) + '">' +
      '<div class="q-head"><span class="q-no">第 ' + q.id + ' 题</span>' +
      (q.section ? '<span class="q-sec">' + esc(q.section) + '</span>' : '') +
      '<span class="r-status">' + statusTxt + '</span></div>' +
      '<div class="q-text">' + q.question + '</div>' + optsHTML +
      '<div class="r-answers">我的答案：' + mineHTML + '　　正确答案：' + ansHTML + '</div>' +
      '<div class="r-ana"><span class="ana-tag">【解析】</span>' + q.analysis + '</div>' +
      '</div>';
  }

  function renderResult(date) {
    var lesson = LESSONS[date];
    var all = lesson.quiz.questions;
    var rec = store.lessons[date];
    var sc = rec.score;
    var rate = sc.correct / sc.total * 100;
    var s75 = (sc.correct / sc.total * 75).toFixed(1);
    var verdict = s75 >= 55 ? '已高于"两科稳定 55+"目标线，保持状态。'
      : s75 >= 48 ? '折算分达到执行表目标线（48），继续向 55+ 冲刺，错题务必回炉订正。'
        : '折算分未达 48 分目标线，请重点订正错题，并按"知识不会 / 概念混淆 / 计算失误 / 时间不足"四类归档。';
    var retry = (rec.latest && rec.latest.mode === 'retry') ? rec.latest : null;
    var secs = sectionStats(all, rec.answers || {});
    var secsHTML = secs.map(function (pair) {
      var p = pair[1].correct / pair[1].total * 100;
      var cls = p >= 80 ? 'full' : (p < 60 ? 'low' : '');
      return '<div class="sec-stat"><div class="row1"><span>' + esc(pair[0]) + '</span><span>' + pair[1].correct + '/' + pair[1].total + '</span></div>' +
        '<div class="bar"><i class="' + cls + '" style="width:' + p + '%"></i></div></div>';
    }).join('');
    var wrongCount = all.filter(function (q) { return !isCorrect(q, (rec.answers || {})[q.id]); }).length;
    var cards = all.map(function (q) { return rCardHTML(q, (rec.answers || {})[q.id]); }).join('');
    return '<div class="card result-hero">' +
      '<div class="big-score" style="color:' + (rate >= 73 ? 'var(--green)' : rate >= 60 ? 'var(--amber)' : 'var(--red)') + '">' +
      sc.correct + '<span class="sub"> / ' + sc.total + '</span></div>' +
      '<div class="pass-line">正确率 ' + rate.toFixed(1) + '%　·　' + ((lesson.quiz && lesson.quiz.kind === 'afternoon') ? '折算下午分' : '折算上午分') + ' ' + s75 + ' / 75（及格线 45 · 执行表目标 48 · 稳定线 55）</div>' +
      '<div class="result-grid">' +
      '<div class="cell"><div class="v">' + rate.toFixed(1) + '%</div><div class="k">正确率</div></div>' +
      '<div class="cell"><div class="v">' + fmtTime(rec.spentSec) + '</div><div class="k">本次用时</div></div>' +
      '<div class="cell"><div class="v">' + (rec.attempts || 1) + '</div><div class="k">整卷练习次数</div></div>' +
      '</div>' +
      '<div class="verdict">' + verdict + '</div>' +
      '</div>' +
      (retry ? '<div class="card"><b>错题重练：</b>最近一次 ' + retry.correct + '/' + retry.total + ' 正确（' + (retry.total - retry.correct) + ' 题仍错）· ' + fmtDateCN(retry.at) + '</div>' : '') +
      '<div class="card"><h3 style="margin-top:0">小节掌握度</h3>' + secsHTML + '</div>' +
      '<div class="filter-row">' +
      '<span class="flabel">显示：</span>' +
      '<button class="btn btn-outline filter-btn active" data-act="filter" data-mode="all">全部题目（' + all.length + '）</button>' +
      '<button class="btn btn-outline filter-btn" data-act="filter" data-mode="wrong">只看错题（' + wrongCount + '）</button>' +
      '</div>' +
      '<div id="result-list">' + cards + '</div>' +
      '<div class="card" style="display:flex;gap:12px;flex-wrap:wrap">' +
      '<button class="btn btn-outline" data-act="restart-full" data-date="' + date + '">重做整卷</button>' +
      '<button class="btn btn-green" data-act="retry-wrong" data-date="' + date + '"' + (wrongCount ? '' : ' disabled') + '>错题重练（' + wrongCount + '）</button>' +
      '</div>';
  }

  /* ---------------- 弹窗 ---------------- */
  function ensureModal() {
    if ($('#confirm-modal')) return;
    var m = document.createElement('div');
    m.className = 'modal-mask';
    m.id = 'confirm-modal';
    m.innerHTML = '<div class="modal"><h3 id="cm-title"></h3><p id="cm-text"></p>' +
      '<div class="btns"><button class="btn btn-outline" data-act="modal-cancel">取消</button>' +
      '<button class="btn btn-primary" data-act="modal-ok">确定</button></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (e) { if (e.target === m) hideModal(); });
  }
  function showModal(title, text, cb) {
    ensureModal();
    $('#cm-title').textContent = title;
    $('#cm-text').textContent = text;
    modalCb = cb;
    $('#confirm-modal').classList.add('show');
  }
  function hideModal() {
    var m = $('#confirm-modal');
    if (m) m.classList.remove('show');
    modalCb = null;
  }

  /* ---------------- 路由与事件 ---------------- */
  function route() {
    stopTimer();
    curPractice = null;
    var h = location.hash || '#/';
    var m = h.match(/^#\/day\/(\d{4}-\d{2}-\d{2})(?:\/(lecture|quiz))?$/);
    if (m) {
      var date = m[1];
      var tab = m[2] || (hasLesson(date) ? 'lecture' : 'quiz');
      renderDay(date, tab);
    } else {
      renderHome();
    }
    renderSidebar();
  }

  function onDocClick(e) {
    var aside = $('#toc-aside');
    if (aside && aside.classList.contains('open') &&
      !e.target.closest('#toc-aside') && !e.target.closest('.toc-fab')) {
      aside.classList.remove('open');
    }
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');

    if (act === 'opt') {
      if (!curPractice) return;
      var qid = el.getAttribute('data-qid');
      var val = el.getAttribute('data-val');
      curPractice.answers[qid] = val;
      var card = el.closest('.q-card');
      if (card) {
        var opts = card.querySelectorAll('.opt');
        Array.prototype.forEach.call(opts, function (o) {
          o.classList.toggle('selected', o === el);
        });
      }
      updateToolbar();
      if (!curPractice.onlyWrong) {
        var rec = recOf(curPractice.date);
        rec.answers = Object.assign({}, curPractice.answers);
        persist();
      }
      return;
    }
    if (act === 'submit') {
      if (!curPractice) return;
      var un = curPractice.scope.filter(function (q) { return !curPractice.answers[q.id]; }).length;
      showModal('提交批改', un > 0 ? '还有 ' + un + ' 题未作答，未作答按错误计。确定提交？' : '确定提交并查看批改结果？', doSubmit);
      return;
    }
    if (act === 'week') {
      var w = el.getAttribute('data-week');
      openWeeks[w] = !openWeeks[w];
      var g = el.closest('.week-group');
      if (g) g.classList.toggle('open', !!openWeeks[w]);
      return;
    }
    if (act === 'toc') {
      var t = document.getElementById(el.getAttribute('data-target'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (aside && aside.classList.contains('open')) aside.classList.remove('open');
      return;
    }
    if (act === 'toc-fab') {
      if (aside) aside.classList.toggle('open');
      return;
    }
    if (act === 'toc-close') {
      if (aside) aside.classList.remove('open');
      return;
    }
    if (act === 'back-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (act === 'filter') {
      var mode = el.getAttribute('data-mode');
      var list = $('#result-list');
      if (list) list.classList.toggle('only-wrong', mode === 'wrong');
      var btns = document.querySelectorAll('.filter-btn');
      Array.prototype.forEach.call(btns, function (b) { b.classList.toggle('active', b === el); });
      return;
    }
    if (act === 'restart-full') {
      var rdate = el.getAttribute('data-date');
      showModal('重做整卷', '将清空该卷当前作答与成绩（历史记录保留），确定重做？', function () {
        var rec2 = recOf(rdate);
        rec2.answers = {};
        rec2.submittedAt = null;
        rec2.score = null;
        rec2.latest = null;
        rec2.retryCount = 0;
        persist();
        renderSidebar();
        $('#tab-body').innerHTML = startPractice(rdate, false);
        updateToolbar(); startTimer();
        window.scrollTo(0, 0);
      });
      return;
    }
    if (act === 'retry-wrong') {
      var wdate = el.getAttribute('data-date');
      $('#tab-body').innerHTML = startPractice(wdate, true);
      updateToolbar(); startTimer();
      window.scrollTo(0, 0);
      return;
    }
    if (act === 'modal-ok') {
      var cb = modalCb;
      hideModal();
      if (cb) cb();
      return;
    }
    if (act === 'modal-cancel') { hideModal(); return; }
  }

  /* ---------------- 回到顶部按钮显隐 ---------------- */
  function backTopOnScroll() {
    var btn = $('#back-top');
    if (!btn) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle('show', y > 400);
  }

  function init() {
    var today = todayStr();
    DAYS.forEach(function (d) { if (d.date === today) openWeeks[d.week] = true; });
    var dates = Object.keys(LESSONS).sort();
    var latest = dates[dates.length - 1];
    if (latest) {
      DAYS.forEach(function (d) { if (d.date === latest) openWeeks[d.week] = true; });
    }
    renderSidebar();
    route();
    window.addEventListener('hashchange', route);
    window.addEventListener('scroll', tocOnScroll, { passive: true });
    window.addEventListener('scroll', backTopOnScroll, { passive: true });
    backTopOnScroll();
    document.addEventListener('click', onDocClick);
    document.addEventListener('change', function (e) {
      if (e.target && e.target.id === 'm-select' && e.target.value) {
        location.hash = '#/day/' + e.target.value;
      }
    });
    document.addEventListener('input', function (e) {
      var t = e.target;
      if (!t || !t.classList || !t.classList.contains('blank-input') || !curPractice) return;
      curPractice.answers[t.getAttribute('data-qid')] = t.value;
      updateToolbar();
      if (!curPractice.onlyWrong) {
        var rec = recOf(curPractice.date);
        rec.answers = Object.assign({}, curPractice.answers);
        persist();
      }
    });
  }

  init();
})();
