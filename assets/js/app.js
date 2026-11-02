/* ============================================================
   Argon · 墨語 — Router, events, writing, listening, exam, quiz
   ============================================================ */

const PAGE_TITLES = {
  dashboard: "Argon · 墨語 — Luyện thi TOCFL Band B",
  course: "Lộ trình 10 chủ đề — Argon · 墨語",
  progress: "Tiến độ & thành tích — Argon · 墨語"
};

function parseRoute() {
  const raw = decodeURIComponent((location.hash || "").replace(/^#/, "")) || "/";
  const parts = raw.split("/").filter(Boolean);
  if (!parts.length) return { name: "dashboard", path: "/" };
  if (parts[0] === "course") return { name: "course", path: "/course" };
  if (parts[0] === "progress") return { name: "progress", path: "/progress" };
  if (parts[0] === "lesson") {
    const id = parts[1] || "1-1";
    if (id !== "1-1") return { name: "course", path: "/course" };
    const tab = TAB_META[parts[2]] ? parts[2] : "overview";
    return { name: "lesson", id, tab, path: `/lesson/${id}/${tab}` };
  }
  return { name: "dashboard", path: "/" };
}

function navigate(path) {
  const target = "#" + path;
  if (location.hash === target) renderRoute();
  else location.hash = target;
}

function renderRoute({ keepScroll = false } = {}) {
  ensureDaily();
  const route = parseRoute();
  APP.route = route;
  closeSearch();
  closeDrawer();
  closeSidebar();
  stopAllAudio();
  if (APP.listenTimer) {
    clearInterval(APP.listenTimer);
    APP.listenTimer = null;
  }
  renderShell();
  const main = $("#main");
  if (!main) return;
  if (route.name === "dashboard") renderDashboard(main);
  else if (route.name === "course") renderCourse(main);
  else if (route.name === "progress") renderProgress(main);
  else renderLesson(main, route.tab);
  mountAudioPlayers(main);
  afterRender(route);
  document.title = route.name === "lesson"
    ? `Unit 1-1 · ${TAB_META[route.tab]?.label || "Bài học"} — Argon · 墨語`
    : PAGE_TITLES[route.name] || PAGE_TITLES.dashboard;
  if (!keepScroll) window.scrollTo(0, 0);
}

function afterRender(route) {
  if (route.name === "dashboard") {
    if (window.ArgonScene?.mount) window.ArgonScene.mount($("#hero-3d"));
    else $(".hero")?.classList.add("no-webgl");
  } else if (window.ArgonScene?.destroy) {
    window.ArgonScene.destroy();
  }

  if (route.name === "lesson" && route.tab === "writing") initWriting();
  if (route.name === "lesson" && route.tab === "listening" && APP.listen && !APP.listen.submitted) ensureListenTimer();

  if (APP.pendingWord) {
    const zh = APP.pendingWord;
    APP.pendingWord = null;
    openWordDrawer(zh);
  }
}

function refreshRoute({ keepScroll = true, reopenDrawer = false } = {}) {
  const y = window.scrollY;
  const drawer = APP.drawerZh;
  renderShell();
  renderRoute({ keepScroll: true });
  if (keepScroll) window.scrollTo(0, y);
  if (reopenDrawer && drawer) openWordDrawer(drawer);
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
function openSidebar() {
  APP.sidebarOpen = true;
  $("#sidebar")?.classList.add("open");
  document.body.classList.add("sidebar-open");
  if (!document.querySelector("[data-sidebar-scrim]")) {
    const s = document.createElement("div");
    s.className = "scrim";
    s.dataset.sidebarScrim = "1";
    s.dataset.action = "close-sidebar";
    $("#layers").appendChild(s);
  }
}

function closeSidebar() {
  APP.sidebarOpen = false;
  $("#sidebar")?.classList.remove("open");
  document.body.classList.remove("sidebar-open");
  $$("[data-sidebar-scrim]").forEach((el) => el.remove());
}

/* ------------------------------------------------------------------ */
/* Writing studio                                                      */
/* ------------------------------------------------------------------ */
function initWriting() {
  const host = $("#writer-host");
  if (!host || !window.HanziWriter) return;
  const board = $("#writing-board");
  const size = Math.max(220, Math.min(344, Math.round(board?.clientWidth || 320)));
  const dark = state.theme === "dark";
  host.innerHTML = "";
  APP.writingWriter = null;
  try {
    APP.writingWriter = HanziWriter.create(host, APP.writingChar, {
      width: size,
      height: size,
      padding: 14,
      showOutline: APP.writingOutline !== false,
      showCharacter: false,
      strokeColor: dark ? "#e8f4fb" : "#0b1f2e",
      radicalColor: dark ? "#7dd3fc" : "#0284c7",
      outlineColor: dark ? "#28506a" : "#c8dce9",
      drawingColor: dark ? "#38bdf8" : "#0284c7",
      highlightColor: dark ? "#7dd3fc" : "#0ea5e9",
      strokeAnimationSpeed: APP.writingSpeed || 1,
      delayBetweenStrokes: 120,
      charDataLoader: (char, onComplete, onError) => {
        const data = HANZI_DATA?.[char];
        if (data) onComplete(data);
        else onError(char);
      }
    });
    APP.writingWriter.animateCharacter();
  } catch (err) {
    host.innerHTML = `<div class="empty" style="padding:20px"><p>Không tải được dữ liệu nét cho chữ này.</p></div>`;
  }
}

function refreshWritingProgressUI() {
  const headBadge = $(".writing-head .badge.jade");
  if (headBadge) headBadge.textContent = `${writtenChars()} chữ đã viết`;
  const prog = $(".wi-progress");
  if (prog) prog.innerHTML = `${progressHTML(100)}<b>Đã viết</b>`;
  const boardBadge = $("#writing-board .board-badge");
  if (boardBadge) {
    boardBadge.className = "badge jade board-badge";
    boardBadge.textContent = "Đã hoàn thành";
  }
  const tab = document.querySelector(`.char-tab[data-char="${APP.writingChar}"]`);
  if (tab) tab.classList.add("done");
}

function writerAnimate() {
  if (!APP.writingWriter) return;
  try {
    APP.writingWriter.cancelQuiz();
    APP.writingWriter.animateCharacter();
  } catch { /* noop */ }
}

function writerQuiz() {
  if (!APP.writingWriter) return;
  try {
    APP.writingWriter.cancelQuiz();
    APP.writingWriter.quiz({
      onComplete: () => {
        markCharWritten(APP.writingChar);
        burstConfetti();
        toast(`Viết đúng “${APP.writingChar}”! Một nét nữa đã thành.`, "jade");
        refreshWritingProgressUI();
        renderShell();
      }
    });
  } catch {
    toast("Không thể bắt đầu chế độ luyện viết. Hãy tải lại trang.", "rose");
  }
}

/* ------------------------------------------------------------------ */
/* Listening practice                                                  */
/* ------------------------------------------------------------------ */
function startListening() {
  APP.listen = {
    started: true,
    submitted: false,
    answers: {},
    startedAt: Date.now(),
    deadline: Date.now() + EXAM_META.listeningDuration * 1000,
    score: null
  };
  refreshRoute({ keepScroll: true });
  setTimeout(() => {
    const play = $(".listen-main [data-audio-toggle]");
    if (play) play.click();
  }, 180);
  toast("Bắt đầu luyện nghe · 10 phút", "jade");
}

function listenTimeLeft() {
  if (!APP.listen) return EXAM_META.listeningDuration;
  return Math.max(0, Math.round((APP.listen.deadline - Date.now()) / 1000));
}

function ensureListenTimer() {
  if (!APP.listen || APP.listen.submitted) return;
  if (listenTimeLeft() <= 0) {
    submitListening(true);
    return;
  }
  if (APP.listenTimer) clearInterval(APP.listenTimer);
  APP.listenTimer = setInterval(() => {
    if (!APP.listen || APP.listen.submitted) {
      clearInterval(APP.listenTimer);
      APP.listenTimer = null;
      return;
    }
    const left = listenTimeLeft();
    const el = $("#listen-timer");
    if (el) {
      el.textContent = formatClock(left);
      el.classList.toggle("warn", left <= 180 && left > 60);
      el.classList.toggle("danger", left <= 60);
    }
    const bar = $("#listen-timer-progress .progress > i");
    if (bar) bar.style.width = clamp((left / EXAM_META.listeningDuration) * 100, 0, 100) + "%";
    if (left <= 0) submitListening(true);
  }, 1000);
}

function listenAnswer(n, i) {
  if (!APP.listen || APP.listen.submitted) return;
  APP.listen.answers[n] = i;
  const q = QUESTIONS.find((x) => x.n === n);
  const qEl = document.getElementById("listen-q-" + n);
  if (qEl) {
    $$(".listen-option", qEl).forEach((btn, idx) => btn.classList.toggle("selected", idx === i));
    let flag = $(".q-flag", qEl);
    if (!flag) {
      flag = document.createElement("span");
      flag.className = "badge sky q-flag";
      $(".listen-q-head", qEl)?.appendChild(flag);
    }
    flag.textContent = `Đã chọn ${"ABCD"[i]}`;
  }
  const answered = Object.keys(APP.listen.answers).length;
  const badge = $("#listen-answered-badge");
  if (badge) badge.innerHTML = `${ico("check-circle")} ${answered}/5 câu đã chọn`;
  const note = $("#listen-answered-note");
  if (note) note.textContent = answered < 5 ? `Còn ${5 - answered} câu chưa chọn.` : "Đã chọn đủ 5 câu.";
  const asideBar = $(".listen-aside .panel .progress > i");
  if (asideBar) asideBar.style.width = (answered / 5) * 100 + "%";
  if (q) { /* keep data in sync */ }
}

function submitListening(auto = false) {
  if (!APP.listen || APP.listen.submitted) return;
  const qs = listenQuestions();
  const score = qs.reduce((n, q) => n + (APP.listen.answers[q.n] === q.answer ? 1 : 0), 0);
  APP.listen.submitted = true;
  APP.listen.score = score;
  if (APP.listenTimer) {
    clearInterval(APP.listenTimer);
    APP.listenTimer = null;
  }
  recordListening(score, 5);
  refreshRoute({ keepScroll: true });
  if (score >= 4) burstConfetti();
  toast(auto ? `Hết giờ! Bạn đúng ${score}/5 câu. Transcript đã mở.` : `Đã nộp bài nghe · ${score}/5 câu đúng`, score >= 4 ? "jade" : "amber");
}

function retryListening() {
  APP.listen = null;
  if (APP.listenTimer) {
    clearInterval(APP.listenTimer);
    APP.listenTimer = null;
  }
  refreshRoute({ keepScroll: true });
  toast("Đã đặt lại phiên luyện nghe.");
}

/* ------------------------------------------------------------------ */
/* Exam engine                                                         */
/* ------------------------------------------------------------------ */
function currentQuestion() {
  return QUESTIONS.find((q) => q.n === APP.exam?.current) || QUESTIONS[0];
}

function examSectionFor(n) {
  return EXAM_SECTIONS.find((s) => n >= s.from && n <= s.to) || EXAM_SECTIONS[0];
}

function examAnsweredCount() {
  return APP.exam ? Object.keys(APP.exam.answers).length : 0;
}

function saveExamSession() {
  if (!APP.exam) return;
  try {
    localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify({
      startedAt: APP.exam.startedAt,
      deadline: APP.exam.deadline,
      answers: APP.exam.answers,
      flags: APP.exam.flags,
      current: APP.exam.current
    }));
  } catch { /* noop */ }
}

function clearExamSession() {
  try { localStorage.removeItem(EXAM_SESSION_KEY); } catch { /* noop */ }
}

function startExam() {
  if (!isTestUnlocked()) {
    toast("Bài kiểm tra chưa mở khóa. Hoàn thành 25 từ và quiz trước.", "amber");
    return;
  }
  if (APP.exam) {
    toast("Một bài kiểm tra đang mở. Hãy nộp hoặc thoát bài hiện tại trước.", "amber");
    return;
  }
  closeModal();
  closeResults();
  closeDrawer();
  closeSearch();
  stopAllAudio();
  APP.exam = {
    active: true,
    submitted: false,
    answers: {},
    flags: [],
    current: 1,
    startedAt: Date.now(),
    deadline: Date.now() + EXAM_META.duration * 1000
  };
  saveExamSession();
  document.body.classList.add("no-scroll");
  buildExamOverlay();
  startExamTimer();
  toast("Bắt đầu bài kiểm tra · 30 phút", "jade");
}

function buildExamOverlay() {
  $$("[data-exam]").forEach((el) => el.remove());
  const overlay = document.createElement("div");
  overlay.className = "exam-overlay";
  overlay.dataset.exam = "1";
  overlay.innerHTML = `
    <header class="exam-header">
      <button class="icon-btn exam-back" data-action="exam-exit" aria-label="Thoát bài thi">${ico("chevron-left")}</button>
      <div class="exam-header-title"><b>Unit 1-1 · 個人資料</b><small>30 câu · 30 phút · TOCFL Band B</small></div>
      <div class="exam-progress">
        ${progressHTML(0)}
        <span id="exam-progress-label">0/30</span>
      </div>
      <div class="exam-timer" id="exam-timer">${ico("clock")}<span>30:00</span></div>
      <div class="exam-header-actions">
        <button class="icon-btn exam-palette-toggle" data-action="exam-palette-open" aria-label="Bảng câu hỏi">${ico("grid")}</button>
        <button class="btn primary" data-action="exam-submit">${ico("check-circle")}<span>Nộp bài</span></button>
      </div>
    </header>
    <div class="exam-body">
      <aside class="exam-palette" id="exam-palette"></aside>
      <div class="exam-main">
        <div class="exam-main-inner">
          <div class="exam-audio-bar" id="exam-audio-bar" style="display:none">
            ${audioPlayerHTML({ src: EXAM_META.audio, title: "Audio gốc · 01-1.mp3", sub: "Phần I · 5 hội thoại", compact: false })}
            <div class="audio-note">${ico("alert")} Có thể nghe lại và tua trong bản luyện tập này. Transcript chỉ mở sau khi nộp bài.</div>
          </div>
          <div id="exam-question-host"></div>
        </div>
      </div>
    </div>
    <footer class="exam-footer">
      <div class="ef-inner">
        <button class="btn secondary" data-action="exam-prev">${ico("chevron-left")}<span>Trước</span></button>
        <button class="btn ghost ef-flag" data-action="exam-flag" id="exam-flag-btn">${ico("flag")}<span>Đánh dấu</span></button>
        <span class="ef-spacer"></span>
        <span class="ef-pos" id="exam-pos">Câu 1 / 30</span>
        <button class="btn primary" data-action="exam-next">Tiếp ${ico("chevron-right")}</button>
      </div>
    </footer>`;
  $("#layers").appendChild(overlay);
  mountAudioPlayers(overlay);
  updateExamUI();
}

function startExamTimer() {
  if (APP.examTimer) clearInterval(APP.examTimer);
  updateExamTimer();
  APP.examTimer = setInterval(() => {
    if (!APP.exam || APP.exam.submitted) {
      clearInterval(APP.examTimer);
      APP.examTimer = null;
      return;
    }
    const left = Math.max(0, Math.round((APP.exam.deadline - Date.now()) / 1000));
    updateExamTimer(left);
    if (left <= 0) submitExam(true);
  }, 1000);
}

function updateExamTimer(left = null) {
  if (!APP.exam) return;
  const remaining = left == null ? Math.max(0, Math.round((APP.exam.deadline - Date.now()) / 1000)) : left;
  const el = $("#exam-timer");
  if (!el) return;
  el.classList.toggle("warn", remaining <= 300 && remaining > 60);
  el.classList.toggle("danger", remaining <= 60);
  el.innerHTML = `${ico("clock")}<span>${formatClock(remaining)}</span>`;
}

function pauseAllAudio() {
  audioInstances.forEach((a) => { try { a.pause(); } catch { /* noop */ } });
}

function examQuestionCardHTML(q) {
  const sec = examSectionFor(q.n);
  const selected = APP.exam.answers[q.n];
  const flagged = APP.exam.flags.includes(q.n);
  const text = q.q.replace(/\{(\d+)\}/g, "＿＿");
  return `<article class="exam-question">
    <div class="exam-q-head">
      <span class="q-section">${esc(sec.no)} · ${esc(sec.vi)}</span>
      <span class="q-no">Câu ${q.n} / 30</span>
      <button class="icon-btn q-flag ${flagged ? "active" : ""}" data-action="exam-flag" aria-label="Đánh dấu câu ${q.n}" style="${flagged ? "color:var(--amber)" : ""}">${ico("flag")}</button>
    </div>
    <div class="exam-q-text">${esc(text)}</div>
    <div class="exam-q-vi">${esc(q.qVi)}</div>
    <div class="exam-options">
      ${q.options.map((opt, i) => `<button class="exam-option ${selected === i ? "selected" : ""}" data-action="exam-answer" data-n="${q.n}" data-i="${i}">
        <span class="eo-letter">${"ABCD"[i]}</span><span class="eo-text">${esc(opt)}</span>${selected === i ? `<span class="eo-mark">✓</span>` : ""}
      </button>`).join("")}
    </div>
  </article>`;
}

function clozeMaterialHTML() {
  return `<aside class="exam-material">
    <div class="material-head">${ico("file-text")}<b>選詞填空 · Đoạn văn</b><small>10 chỗ trống</small></div>
    <div class="material-body">
      <div class="cloze-passage">${CLOZE_PARAGRAPHS.map((p) => `<p>${p.text.replace(/\{(\d+)\}/g, (_, n) => {
        const ans = APP.exam.answers[n];
        const isCurrent = Number(n) === APP.exam.current;
        return `<button class="cloze-blank ${isCurrent ? "current" : ""} ${ans != null ? "filled" : ""}" data-action="exam-jump" data-n="${n}">${ans != null ? "ABCD"[ans] : n}</button>`;
      })}</p>`).join("")}</div>
      <div class="material-hint">Nhấn vào số trống để chuyển nhanh tới câu hỏi tương ứng.</div>
    </div>
  </aside>`;
}

function invitationMaterialHTML() {
  return `<aside class="exam-material">
    <div class="material-head">${ico("mail")}<b>喜帖 · Thiệp cưới</b><small>Trả lời câu 24–27</small></div>
    <div class="material-body">
      <div class="invitation">
        <div class="inv-seal">${esc(INVITATION.seal)}</div>
        <div class="inv-header">${INVITATION.header.map((x) => `<div>${esc(x)}</div>`).join("")}</div>
        <div class="inv-body">
          <div class="inv-small">${esc(INVITATION.body[0])}</div>
          <div>${esc(INVITATION.body[1])}</div>
          <div>${esc(INVITATION.body[2])}</div>
          <div class="inv-small">${esc(INVITATION.body[3])}</div>
        </div>
        <div class="inv-invite">${INVITATION.invite.map((x) => `<div>${esc(x)}</div>`).join("")}</div>
        <div class="inv-hosts">${INVITATION.hosts.map((x) => `<div>${esc(x)}</div>`).join("")}</div>
        <div class="inv-details">${INVITATION.details.map(([k, v]) => `<div class="inv-detail"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
      </div>
      <div class="material-hint">${esc(INVITATION.vi)}</div>
    </div>
  </aside>`;
}

function passageMaterialHTML() {
  return `<aside class="exam-material">
    <div class="material-head">${ico("book-open")}<b>${esc(PASSAGE.title)}</b><small>Câu 28–30</small></div>
    <div class="material-body">
      <div class="passage-card"><div class="pc-title">${esc(PASSAGE.title)}</div>${PASSAGE.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <div class="material-hint">${esc(PASSAGE.vi)}</div>
    </div>
  </aside>`;
}

function updateExamUI() {
  if (!APP.exam) return;
  const q = currentQuestion();
  const sec = examSectionFor(q.n);
  const host = $("#exam-question-host");
  if (!host) return;
  let html;
  if (sec.material === "cloze") html = `<div class="exam-split">${clozeMaterialHTML()}<div>${examQuestionCardHTML(q)}</div></div>`;
  else if (sec.material === "invitation") html = `<div class="exam-split">${invitationMaterialHTML()}<div>${examQuestionCardHTML(q)}</div></div>`;
  else if (sec.material === "passage") html = `<div class="exam-split">${passageMaterialHTML()}<div>${examQuestionCardHTML(q)}</div></div>`;
  else html = examQuestionCardHTML(q);
  host.innerHTML = html;

  const audioBar = $("#exam-audio-bar");
  if (audioBar) audioBar.style.display = sec.audio ? "block" : "none";
  if (!sec.audio) pauseAllAudio();

  const answered = examAnsweredCount();
  const progress = $("#exam-progress-label");
  if (progress) progress.textContent = `${answered}/30`;
  const bar = $(".exam-header .exam-progress .progress > i");
  if (bar) bar.style.width = (answered / 30) * 100 + "%";
  const pos = $("#exam-pos");
  if (pos) pos.textContent = `Câu ${q.n} / 30`;
  const flagBtn = $("#exam-flag-btn");
  if (flagBtn) {
    const flagged = APP.exam.flags.includes(q.n);
    flagBtn.classList.toggle("active", flagged);
    flagBtn.innerHTML = `${ico("flag")}<span>${flagged ? "Đã đánh dấu" : "Đánh dấu"}</span>`;
  }
  updateExamPalette();
  updateExamTimer();
}

function examPaletteHTML() {
  return `<div class="exam-palette-inner">
    ${EXAM_SECTIONS.map((s) => {
      const qs = QUESTIONS.filter((q) => q.n >= s.from && q.n <= s.to);
      const answered = qs.filter((q) => APP.exam.answers[q.n] != null).length;
      return `<div class="palette-group">
        <div class="pg-head"><b>${esc(s.no)} · ${esc(s.zh)}</b><small>${answered}/${qs.length}</small></div>
        <div class="palette-grid">${qs.map((q) => {
          const isAnswered = APP.exam.answers[q.n] != null;
          const isFlagged = APP.exam.flags.includes(q.n);
          const isCurrent = APP.exam.current === q.n;
          return `<button class="palette-btn ${isAnswered ? "answered" : ""} ${isFlagged ? "flagged" : ""} ${isCurrent ? "current" : ""}" data-action="exam-jump" data-n="${q.n}" aria-label="Câu ${q.n}${isAnswered ? " đã trả lời" : ""}">${q.n}</button>`;
        }).join("")}</div>
      </div>`;
    }).join("")}
    <div class="palette-legend">
      <span><i class="answered"></i> Đã trả lời</span>
      <span><i class="flagged"></i> Đánh dấu</span>
      <span><i class="current"></i> Đang xem</span>
    </div>
  </div>`;
}

function updateExamPalette() {
  const p = $("#exam-palette");
  if (p) p.innerHTML = examPaletteHTML();
  const sheet = $("#exam-palette-sheet");
  if (sheet) sheet.innerHTML = examPaletteHTML();
}

function examAnswer(n, i) {
  if (!APP.exam || APP.exam.submitted) return;
  APP.exam.answers[n] = i;
  saveExamSession();
  updateExamUI();
}

function examJump(n) {
  if (!APP.exam) return;
  APP.exam.current = clamp(Number(n) || 1, 1, 30);
  saveExamSession();
  closeExamPalette();
  updateExamUI();
}

function examPrev() {
  if (!APP.exam) return;
  examJump(APP.exam.current - 1);
}

function examNext() {
  if (!APP.exam) return;
  if (APP.exam.current >= 30) {
    examSubmit();
    return;
  }
  examJump(APP.exam.current + 1);
}

function examFlag() {
  if (!APP.exam) return;
  const n = APP.exam.current;
  if (APP.exam.flags.includes(n)) APP.exam.flags = APP.exam.flags.filter((x) => x !== n);
  else APP.exam.flags.push(n);
  saveExamSession();
  updateExamUI();
}

function examSubmit() {
  if (!APP.exam || APP.exam.submitted) return;
  const answered = examAnsweredCount();
  const flagged = APP.exam.flags.length;
  const unanswered = 30 - answered;
  openModal({
    title: "Nộp bài kiểm tra?",
    subtitle: "Hãy kiểm tra lần cuối trước khi nộp",
    iconName: "clipboard",
    body: `<p style="font-size:13px;color:var(--ink-2);line-height:1.6">Sau khi nộp, đáp án, giải thích và transcript sẽ được mở. Bạn không thể sửa câu trả lời.</p>
      <div class="confirm-list">
        <div class="confirm-row"><span>Đã trả lời</span><b>${answered}/30</b></div>
        <div class="confirm-row ${unanswered ? "amber" : ""}"><span>Chưa trả lời</span><b>${unanswered}</b></div>
        <div class="confirm-row"><span>Đã đánh dấu</span><b>${flagged}</b></div>
      </div>
      <div class="confirm-note">${unanswered ? `Còn ${unanswered} câu chưa trả lời. Bạn vẫn có thể nộp và xem lại kết quả.` : "Bạn đã trả lời đủ 30 câu."}</div>`,
    footer: `<button class="btn ghost" data-action="close-modal">Tiếp tục làm</button><button class="btn primary" data-action="exam-confirm-submit">${ico("check-circle")} Nộp bài</button>`
  });
}

function submitExam(auto = false) {
  if (!APP.exam || APP.exam.submitted) return;
  closeModal();
  if (APP.examTimer) {
    clearInterval(APP.examTimer);
    APP.examTimer = null;
  }
  pauseAllAudio();
  const correct = QUESTIONS.reduce((n, q) => n + (APP.exam.answers[q.n] === q.answer ? 1 : 0), 0);
  const result = {
    at: Date.now(),
    correct,
    total: 30,
    score: Math.round((correct / 30) * 100),
    duration: Math.min(EXAM_META.duration, Math.round((Date.now() - APP.exam.startedAt) / 1000)),
    answers: { ...APP.exam.answers },
    flags: [...APP.exam.flags],
    auto: !!auto
  };
  APP.exam.submitted = true;
  APP.exam.result = result;
  clearExamSession();
  recordExam(result);
  showResults(result, true);
  if (correct >= 24) burstConfetti();
  toast(auto ? `Hết giờ! Kết quả: ${correct}/30 câu đúng.` : `Đã nộp bài · ${correct}/30 câu đúng`, correct >= 24 ? "jade" : "amber");
}

function examExit() {
  if (!APP.exam) return;
  confirmModal({
    title: "Thoát bài kiểm tra?",
    subtitle: "Tiến trình làm bài sẽ không được lưu",
    iconName: "alert",
    body: `<p style="font-size:13px;color:var(--ink-2);line-height:1.6">Bạn đã trả lời ${examAnsweredCount()}/30 câu. Nếu thoát bây giờ, bài làm hiện tại sẽ bị hủy.</p>`,
    confirmLabel: "Thoát bài thi",
    confirmAction: "confirm-exit-exam",
    danger: true
  });
}

function exitExam() {
  if (APP.examTimer) {
    clearInterval(APP.examTimer);
    APP.examTimer = null;
  }
  closeModal();
  closeResults();
  pauseAllAudio();
  clearExamSession();
  $$("[data-exam]").forEach((el) => el.remove());
  APP.exam = null;
  document.body.classList.remove("no-scroll");
  if (APP.route.name === "lesson" && APP.route.tab === "test") renderRoute();
  else navigate("/lesson/1-1/test");
}

function openExamPalette() {
  if (document.querySelector("[data-exam-sheet]")) return;
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  scrim.dataset.examSheetScrim = "1";
  scrim.style.zIndex = "329";
  scrim.dataset.action = "close-exam-palette";
  const sheet = document.createElement("div");
  sheet.className = "exam-palette-sheet";
  sheet.dataset.examSheet = "1";
  sheet.innerHTML = `<div class="sheet-head"><b>Bảng câu hỏi</b><span class="badge sky">${examAnsweredCount()}/30</span><button class="icon-btn" data-action="close-exam-palette">${ico("x")}</button></div><div id="exam-palette-sheet">${examPaletteHTML()}</div>`;
  $("#layers").appendChild(scrim);
  $("#layers").appendChild(sheet);
}

function closeExamPalette() {
  $$("[data-exam-sheet]").forEach((el) => el.remove());
  $$("[data-exam-sheet-scrim]").forEach((el) => el.remove());
}

/* ------------------------------------------------------------------ */
/* Results panel                                                       */
/* ------------------------------------------------------------------ */
function resultsOverviewHTML(result) {
  const wrong = 30 - result.correct;
  const title = result.score >= 90 ? "Xuất sắc!" : result.score >= 80 ? "Rất tốt!" : result.score >= 60 ? "Khá ổn" : "Cần ôn thêm";
  const desc = result.score >= 80
    ? "Bạn đã nắm rất tốt nội dung Unit 1-1. Hãy xem lại các câu sai để giữ điểm cao."
    : result.score >= 60
      ? "Nền tảng đã có. Tập trung vào các phần còn yếu và nghe lại transcript."
      : "Đừng lo — hãy đọc transcript, xem giải thích và luyện lại từng phần trước khi thi lại.";
  return `<div class="results-score-card">
      ${scoreRingHTML(result.correct, 30, "câu đúng")}
      <div><h3>${title}</h3><p>${desc}</p>
        <div class="rs-meta">
          <span class="badge ${result.correct >= 24 ? "jade" : "sky"}">${result.score}%</span>
          <span class="badge">${ico("clock")} ${formatStudyTime(result.duration || 0)}</span>
          <span class="badge">${wrong} câu sai</span>
          ${result.auto ? `<span class="badge amber">${ico("alert")} Hết giờ</span>` : ""}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div class="section-title" style="font-size:14px;margin-bottom:8px">Kết quả từng phần</div>
      <div class="section-breakdown">${EXAM_SECTIONS.map((s) => {
        const qs = QUESTIONS.filter((q) => q.n >= s.from && q.n <= s.to);
        const correct = qs.filter((q) => result.answers[q.n] === q.answer).length;
        return `<div class="section-breakdown-row">
          <span class="sbr-name">${esc(s.no)} · ${esc(s.zh)} <span class="muted" style="font-weight:500">— ${esc(s.vi)}</span></span>
          <span class="sbr-score">${correct}/${qs.length}</span>
          ${progressHTML((correct / qs.length) * 100, correct / qs.length >= 0.8 ? "jade" : correct / qs.length >= 0.5 ? "amber" : "rose")}
        </div>`;
      }).join("")}</div>
    </div>
    <div class="row wrap mt-3">
      <button class="btn primary" data-action="retry-exam">${ico("refresh")} Làm lại</button>
      <button class="btn secondary" data-action="results-review-wrong">${ico("x-circle")} Xem câu sai</button>
      <button class="btn ghost" data-action="exit-exam">${ico("arrow-left")} Về bài học</button>
    </div>`;
}

function resultsReviewHTML(result) {
  let list = QUESTIONS.slice();
  if (APP.resultsFilter === "wrong") list = list.filter((q) => result.answers[q.n] !== q.answer);
  else if (APP.resultsFilter === "flagged") list = list.filter((q) => (result.flags || []).includes(q.n));
  const wrongCount = QUESTIONS.filter((q) => result.answers[q.n] !== q.answer).length;
  return `<div class="review-toolbar">
      <button class="chip ${APP.resultsFilter === "all" ? "active" : ""}" data-action="results-filter" data-filter="all">Tất cả <span class="count">30</span></button>
      <button class="chip ${APP.resultsFilter === "wrong" ? "active" : ""}" data-action="results-filter" data-filter="wrong">Câu sai <span class="count">${wrongCount}</span></button>
      <button class="chip ${APP.resultsFilter === "flagged" ? "active" : ""}" data-action="results-filter" data-filter="flagged">Đánh dấu <span class="count">${(result.flags || []).length}</span></button>
    </div>
    ${list.length ? `<div class="review-list">${list.map((q) => {
      const user = result.answers[q.n];
      const ok = user === q.answer;
      const sec = examSectionFor(q.n);
      return `<div class="review-item">
        <div class="review-item-head">
          <span class="ri-num">${q.n}</span>
          <span class="ri-section">${esc(sec.vi)}</span>
          <span class="ri-status ${ok ? "ok" : "bad"}">${ok ? "Đúng" : "Sai"}</span>
        </div>
        <div class="review-item-body">
          <div class="review-q">${esc(q.q.replace(/\{(\d+)\}/g, "＿＿"))}</div>
          <div class="review-answers">
            <div class="review-answer ${ok ? "correct" : "wrong"}"><b>Bạn chọn</b><span>${user != null ? "ABCD"[user] + ". " + esc(q.options[user]) : "Chưa trả lời"}</span></div>
            ${!ok ? `<div class="review-answer correct"><b>Đáp án</b><span>${"ABCD"[q.answer]}. ${esc(q.options[q.answer])}</span></div>` : ""}
          </div>
          <div class="review-explain">${esc(q.explain)}</div>
        </div>
      </div>`;
    }).join("")}</div>` : `<div class="empty"><div class="empty-ico">${ico("check-circle")}</div><h4>${APP.resultsFilter === "wrong" ? "Không có câu sai" : "Không có câu đánh dấu"}</h4><p>${APP.resultsFilter === "wrong" ? "Tuyệt vời! Bạn đã trả lời đúng toàn bộ 30 câu." : "Bạn chưa đánh dấu câu nào trong bài thi này."}</p></div>`}`;
}

function resultsTranscriptHTML() {
  return `<div class="transcript-review">
      ${TRANSCRIPTS.map((t) => `<div class="tr-dialog">
        <div class="tr-title">${esc(t.title)}<span class="badge jade">Đáp án ${t.answer}</span></div>
        ${t.lines.map((l) => `<div class="tr-line"><span class="sp ${l.sp === "女" ? "f" : ""}">${esc(l.sp)}</span><div class="tx">${esc(l.zh)}</div></div>`).join("")}
        <div class="tr-vi">${esc(t.vi)}</div>
      </div>`).join("")}
      <div class="panel pad" style="box-shadow:none">
        <div class="panel-title">${ico("mail")} Thiệp cưới · bản dịch</div>
        <p class="panel-sub mt-1" style="line-height:1.65">${esc(INVITATION.vi)}</p>
      </div>
      <div class="panel pad" style="box-shadow:none">
        <div class="panel-title">${ico("book-open")} ${esc(PASSAGE.title)} · bản dịch</div>
        <p class="panel-sub mt-1" style="line-height:1.65">${esc(PASSAGE.vi)}</p>
      </div>
    </div>`;
}

function renderResultsBody() {
  const result = APP.results;
  if (!result) return;
  const body = $("#results-body");
  if (!body) return;
  if (APP.resultsTab === "overview") body.innerHTML = resultsOverviewHTML(result);
  else if (APP.resultsTab === "review") body.innerHTML = resultsReviewHTML(result);
  else body.innerHTML = resultsTranscriptHTML();
  $$(".results-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === APP.resultsTab));
}

function showResults(result, fromExam = false) {
  APP.results = result;
  APP.resultsTab = "overview";
  APP.resultsFilter = "all";
  $$("[data-results]").forEach((el) => el.remove());
  $$("[data-results-scrim]").forEach((el) => el.remove());
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  scrim.dataset.resultsScrim = "1";
  scrim.style.zIndex = "319";
  scrim.dataset.action = "close-results";
  const panel = document.createElement("div");
  panel.className = "results-panel";
  panel.dataset.results = "1";
  panel.innerHTML = `<div class="results-head">
      <div><div class="results-kicker">${fromExam ? "Bài kiểm tra đã nộp" : "Kết quả gần nhất"}</div><div class="results-title">Unit 1-1 · 個人資料</div></div>
      <div class="results-actions">
        <button class="icon-btn" data-action="close-results" aria-label="Đóng kết quả">${ico("x")}</button>
      </div>
    </div>
    <div class="results-tabs bar" role="tablist" aria-label="Kết quả bài kiểm tra">
      <button class="results-tab active" data-action="results-tab" data-tab="overview" role="tab">Tổng quan</button>
      <button class="results-tab" data-action="results-tab" data-tab="review" role="tab">Xem lại <span class="rt-count">30</span></button>
      <button class="results-tab" data-action="results-tab" data-tab="transcript" role="tab">Transcript</button>
    </div>
    <div class="results-scroll"><div class="results-body" id="results-body"></div></div>`;
  $("#layers").appendChild(scrim);
  $("#layers").appendChild(panel);
  document.body.classList.add("no-scroll");
  renderResultsBody();
  setTimeout(() => {
    const fill = panel.querySelector(".results-score-ring .fill");
    if (fill) fill.style.strokeDashoffset = fill.getAttribute("stroke-dashoffset") || "0";
  }, 40);
}

function closeResults() {
  $$("[data-results]").forEach((el) => el.remove());
  $$("[data-results-scrim]").forEach((el) => el.remove());
  APP.results = null;
  if (!APP.exam) document.body.classList.remove("no-scroll");
}

function retryExam() {
  closeResults();
  if (APP.examTimer) {
    clearInterval(APP.examTimer);
    APP.examTimer = null;
  }
  $$("[data-exam]").forEach((el) => el.remove());
  APP.exam = null;
  clearExamSession();
  document.body.classList.remove("no-scroll");
  startExam();
}

function viewLastResult() {
  if (!state.lastExam) {
    toast("Chưa có kết quả bài kiểm tra nào.", "amber");
    return;
  }
  showResults(state.lastExam, false);
}

/* ------------------------------------------------------------------ */
/* Exam session resume                                                 */
/* ------------------------------------------------------------------ */
function checkExamSession() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(EXAM_SESSION_KEY) || "null"); } catch { raw = null; }
  if (!raw) return;
  if (!isTestUnlocked() || !raw.deadline || raw.deadline <= Date.now()) {
    clearExamSession();
    if (raw?.deadline && raw.deadline <= Date.now()) toast("Phiên làm bài trước đã hết giờ và không thể tiếp tục.", "amber");
    return;
  }
  APP.resumeSession = raw;
  const left = Math.max(0, Math.round((raw.deadline - Date.now()) / 1000));
  setTimeout(() => {
    if (!APP.resumeSession) return;
    openModal({
      title: "Bài kiểm tra chưa hoàn thành",
      subtitle: "Bạn có thể tiếp tục đúng thời gian còn lại",
      iconName: "clock",
      actions: false,
      body: `<p style="font-size:13px;color:var(--ink-2);line-height:1.6">Hệ thống tìm thấy một bài làm đang dang dở. Thời gian vẫn đang chạy.</p>
        <div class="confirm-list">
          <div class="confirm-row"><span>Thời gian còn lại</span><b>${formatClock(left)}</b></div>
          <div class="confirm-row"><span>Đã trả lời</span><b>${Object.keys(raw.answers || {}).length}/30</b></div>
          <div class="confirm-row"><span>Câu đang xem</span><b>Câu ${raw.current || 1}</b></div>
        </div>`,
      footer: `<button class="btn ghost" data-action="discard-exam">Bỏ bài</button><button class="btn primary" data-action="resume-exam">${ico("play")} Tiếp tục</button>`
    });
  }, 900);
}

function resumeExam() {
  const raw = APP.resumeSession;
  if (!raw) return;
  closeModal();
  APP.exam = {
    active: true,
    submitted: false,
    answers: raw.answers || {},
    flags: Array.isArray(raw.flags) ? raw.flags : [],
    current: raw.current || 1,
    startedAt: raw.startedAt,
    deadline: raw.deadline
  };
  APP.resumeSession = null;
  document.body.classList.add("no-scroll");
  buildExamOverlay();
  startExamTimer();
  toast("Đã tiếp tục bài làm", "jade");
}

function discardExam() {
  closeModal();
  APP.resumeSession = null;
  clearExamSession();
  toast("Đã bỏ bài làm dang dở.");
}

/* ------------------------------------------------------------------ */
/* Vocabulary quiz                                                     */
/* ------------------------------------------------------------------ */
function openVocabQuiz() {
  if (coreLearned() < 25) {
    toast("Cần học đủ 25 từ cốt lõi trước khi làm quiz mở khóa.", "amber");
    navigate("/lesson/1-1/vocab");
    return;
  }
  closeModal();
  closeSearch();
  const pool = shuffle(coreWords()).slice(0, 10);
  const questions = pool.map((word) => {
    const others = shuffle(coreWords().filter((w) => w.zh !== word.zh)).slice(0, 3);
    const options = shuffle([word, ...others]);
    return { word, options, answer: options.findIndex((w) => w.zh === word.zh) };
  });
  APP.quiz = { questions, index: 0, answers: Array(10).fill(null), locked: false, finished: false, score: 0, passed: false };
  const wrap = document.createElement("div");
  wrap.className = "modal";
  wrap.dataset.modal = "1";
  wrap.dataset.quizModal = "1";
  wrap.innerHTML = `<div class="modal-panel vq-panel" role="dialog" aria-modal="true" aria-label="Quiz từ vựng">
    <div class="modal-head">
      <div class="modal-ico">${ico("zap")}</div>
      <div><h3>Quiz mở khóa bài thi</h3><small>10 câu · đạt ≥ 8/10</small></div>
      <button class="icon-btn" data-action="close-quiz" aria-label="Đóng">${ico("x")}</button>
    </div>
    <div class="modal-body" id="vq-body"></div>
    <div class="modal-foot" id="vq-foot"></div>
  </div>`;
  wrap.addEventListener("click", (e) => { if (e.target === wrap) closeQuiz(); });
  $("#layers").appendChild(wrap);
  renderQuiz();
}

function quizOptionClass(q, i) {
  if (!APP.quiz.locked) return "";
  if (i === q.answer) return "correct";
  if (i === APP.quiz.answers[APP.quiz.index]) return "wrong";
  return "";
}

function renderQuiz() {
  const body = $("#vq-body");
  const foot = $("#vq-foot");
  if (!body || !foot || !APP.quiz) return;
  if (APP.quiz.finished) {
    const passed = APP.quiz.passed;
    body.innerHTML = `<div class="vq-result">
      <div class="vq-score">${APP.quiz.score}<small>/10</small></div>
      <h3>${passed ? "Đã mở khóa bài kiểm tra!" : "Chưa đạt 8/10"}</h3>
      <p>${passed ? "Bạn đã nắm đủ 25 từ cốt lõi và vượt qua quiz. Bài kiểm tra 30 câu đã sẵn sàng." : "Ôn lại các từ còn nhầm và thử lại. Bạn cần ít nhất 8 câu đúng để mở khóa."}</p>
      <span class="badge ${passed ? "jade" : "amber"} vq-badge">${passed ? ico("unlock") + " Đã mở khóa" : ico("refresh") + " Thử lại nhé"}</span>
      <a class="vq-review-link" href="#/lesson/1-1/vocab" data-action="close-quiz">${ico("layers")} Ôn lại từ vựng</a>
    </div>`;
    foot.innerHTML = passed
      ? `<button class="btn ghost" data-action="close-quiz">Đóng</button><button class="btn primary" data-action="quiz-go-test">${ico("clipboard")} Xem bài kiểm tra</button>`
      : `<button class="btn ghost" data-action="close-quiz">Đóng</button><button class="btn primary" data-action="quiz-retry">${ico("refresh")} Làm lại</button>`;
    return;
  }
  const q = APP.quiz.questions[APP.quiz.index];
  const selected = APP.quiz.answers[APP.quiz.index];
  const locked = APP.quiz.locked;
  body.innerHTML = `<div class="vq-progress-row">${progressHTML((APP.quiz.index / 10) * 100)}<span>Câu ${APP.quiz.index + 1}/10</span></div>
    <div class="vq-word">
      <div class="vq-zh">${esc(q.word.zh)}</div>
      <div class="vq-py">${esc(q.word.py)}</div>
      <div class="vq-prompt">Chọn nghĩa đúng của từ trên</div>
    </div>
    <div class="vq-options">${q.options.map((opt, i) => `<button class="vq-option ${selected === i && !locked ? "selected" : ""} ${quizOptionClass(q, i)}" data-action="quiz-answer" data-i="${i}" ${locked ? "disabled" : ""}>
      <span class="vq-letter">${"ABCD"[i]}</span><span>${esc(opt.vi)}</span>
    </button>`).join("")}</div>
    <div class="vq-feedback ${locked ? "show" : ""} ${locked && selected === q.answer ? "ok" : "bad"}">${locked ? (selected === q.answer ? "Chính xác! " : `Chưa đúng. Đáp án là ${"ABCD"[q.answer]}. `) + esc(q.word.vi) : ""}</div>`;
  foot.innerHTML = locked
    ? `<span class="muted" style="margin-right:auto;font-size:11px">${selected === q.answer ? "Tiếp tục phát huy!" : "Ghi nhớ từ này nhé."}</span><button class="btn primary" data-action="quiz-next">${APP.quiz.index === 9 ? "Xem kết quả" : "Câu tiếp"} ${ico("chevron-right")}</button>`
    : `<span class="muted" style="margin-right:auto;font-size:11px">Chọn một đáp án để xem phản hồi</span><button class="btn ghost" data-action="close-quiz">Đóng</button>`;
}

function quizAnswer(i) {
  if (!APP.quiz || APP.quiz.locked || APP.quiz.finished) return;
  APP.quiz.answers[APP.quiz.index] = i;
  APP.quiz.locked = true;
  renderQuiz();
}

function quizNext() {
  if (!APP.quiz) return;
  if (APP.quiz.index < 9) {
    APP.quiz.index += 1;
    APP.quiz.locked = false;
    renderQuiz();
    return;
  }
  const score = APP.quiz.questions.reduce((n, q, idx) => n + (APP.quiz.answers[idx] === q.answer ? 1 : 0), 0);
  APP.quiz.score = score;
  APP.quiz.finished = true;
  APP.quiz.passed = score >= 8;
  state.quizBest = Math.max(state.quizBest, score);
  if (APP.quiz.passed) {
    state.quizPassed = true;
    recordActivity("quiz", "Mở khóa bài kiểm tra", `Quiz từ vựng ${score}/10`);
    burstConfetti();
    toast("Quiz đạt! Bài kiểm tra 30 câu đã được mở khóa.", "jade");
  } else {
    recordActivity("quiz", "Làm quiz từ vựng", `${score}/10 · chưa đạt`);
    toast(`Quiz đạt ${score}/10. Cần ít nhất 8 để mở khóa.`, "amber");
  }
  saveState();
  renderQuiz();
}

function quizRetry() {
  if (!APP.quiz) return;
  const pool = shuffle(coreWords()).slice(0, 10);
  APP.quiz = {
    questions: pool.map((word) => {
      const others = shuffle(coreWords().filter((w) => w.zh !== word.zh)).slice(0, 3);
      const options = shuffle([word, ...others]);
      return { word, options, answer: options.findIndex((w) => w.zh === word.zh) };
    }),
    index: 0,
    answers: Array(10).fill(null),
    locked: false,
    finished: false,
    score: 0,
    passed: false
  };
  renderQuiz();
}

function closeQuiz() {
  closeModal();
  APP.quiz = null;
  refreshRoute({ keepScroll: true });
}

function quizGoTest() {
  APP.quiz = null;
  closeModal();
  navigate("/lesson/1-1/test");
  toast("Bài kiểm tra 30 câu đã sẵn sàng.", "jade");
}

/* ------------------------------------------------------------------ */
/* Vocabulary interactions                                             */
/* ------------------------------------------------------------------ */
function applyVocabFilter(filter) {
  APP.vocabFilter = filter;
  $$("[data-action='vocab-filter']").forEach((el) => el.classList.toggle("active", el.dataset.filter === filter));
  const list = filteredVocab();
  const rows = $("#vocab-rows");
  if (rows) rows.innerHTML = vocabRowsHTML(list);
  const count = $("#vocab-count");
  if (count) count.innerHTML = vocabCountHTML(list);
}

function updateVocabRows() {
  const list = filteredVocab();
  const rows = $("#vocab-rows");
  if (rows) rows.innerHTML = vocabRowsHTML(list);
  const count = $("#vocab-count");
  if (count) count.innerHTML = vocabCountHTML(list);
}

function resetProgressFlow() {
  confirmModal({
    title: "Đặt lại toàn bộ tiến độ?",
    subtitle: "Hành động này không thể hoàn tác",
    iconName: "trash",
    body: `<p style="font-size:13px;color:var(--ink-2);line-height:1.6">Toàn bộ từ đã học, chữ đã viết, kết quả luyện nghe, quiz và bài kiểm tra sẽ bị xóa khỏi trình duyệt này.</p>
      <div class="confirm-list"><div class="confirm-row rose"><span>Từ đã học</span><b>${learnedCount()}/50</b></div><div class="confirm-row rose"><span>Lịch sử bài thi</span><b>${state.examHistory.length}</b></div><div class="confirm-row rose"><span>Chữ đã viết</span><b>${writtenChars()}</b></div></div>`,
    confirmLabel: "Xóa tất cả",
    confirmAction: "confirm-reset",
    danger: true
  });
}

function bulkCompleteFlow() {
  const chars = new Set();
  VOCAB.forEach((w) => Array.from(w.zh).forEach((ch) => chars.add(ch)));
  const newWords = VOCAB.filter((w) => !state.learned.includes(w.zh)).length;
  const newChars = [...chars].filter((ch) => !(state.written[ch] > 0)).length;
  if (!newWords && !newChars) {
    toast("Toàn bộ từ vựng và chữ Hán đã được tích sẵn.", "jade");
    return;
  }
  confirmModal({
    title: "Tích hoàn tất toàn bộ?",
    subtitle: "Đánh dấu tất cả từ đã học và chữ đã viết",
    iconName: "check-circle",
    body: `<p style="font-size:13px;color:var(--ink-2);line-height:1.6">Một lần tích sẽ đánh dấu toàn bộ <b>${VOCAB.length} từ vựng</b> là đã học và <b>${chars.size} chữ Hán</b> là đã viết. Bạn vẫn cần làm quiz 10 câu đạt ≥ 8/10 để mở khóa bài kiểm tra.</p>
      <div class="confirm-list">
        <div class="confirm-row"><span>Từ sẽ tích thêm</span><b>${newWords}</b></div>
        <div class="confirm-row"><span>Chữ sẽ tích thêm</span><b>${newChars}</b></div>
      </div>`,
    confirmLabel: "Tích tất cả",
    confirmAction: "confirm-bulk-complete"
  });
}

function confirmBulkComplete() {
  const chars = new Set();
  VOCAB.forEach((w) => Array.from(w.zh).forEach((ch) => chars.add(ch)));
  const newWords = VOCAB.filter((w) => !state.learned.includes(w.zh)).length;
  const newChars = [...chars].filter((ch) => !(state.written[ch] > 0)).length;
  ensureDaily();
  state.learned = [...new Set([...state.learned, ...VOCAB.map((w) => w.zh)])];
  chars.forEach((ch) => { state.written[ch] = Math.max(1, state.written[ch] || 0); });
  state.daily.words += newWords;
  state.daily.writing += newChars;
  touchStudyDay();
  saveState();
  recordActivity("word", "Tích hoàn tất toàn bộ Unit 1-1", `${VOCAB.length} từ đã học · ${chars.size} chữ đã viết`);
  closeModal();
  refreshRoute({ keepScroll: true });
  toast(`Đã tích ${VOCAB.length} từ và ${chars.size} chữ Hán.`, "jade");
  if (coreLearned() === coreWords().length && !state.quizPassed) {
    setTimeout(() => toast("Đủ 25 từ cốt lõi! Làm quiz từ vựng để mở khóa bài thi.", "amber"), 700);
  }
}

function confirmReset() {
  try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(EXAM_SESSION_KEY); } catch { /* noop */ }
  state = loadState();
  APP.listen = null;
  APP.exam = null;
  APP.quiz = null;
  closeModal();
  closeResults();
  $$("[data-exam]").forEach((el) => el.remove());
  document.body.classList.remove("no-scroll");
  applyTheme(state.theme, false);
  refreshRoute({ keepScroll: false });
  toast("Đã đặt lại toàn bộ tiến độ.", "jade");
}

/* ------------------------------------------------------------------ */
/* Global events                                                       */
/* ------------------------------------------------------------------ */
document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;

  switch (action) {
    case "theme-toggle":
      toggleTheme();
      if (APP.route.name === "lesson" && APP.route.tab === "writing") {
        setTimeout(() => { if (APP.route.tab === "writing") initWriting(); }, 60);
      }
      break;
    case "open-sidebar":
      openSidebar();
      break;
    case "close-sidebar":
      closeSidebar();
      break;
    case "open-search":
      openSearch();
      break;
    case "close-search":
      closeSearch();
      break;
    case "open-shortcuts":
      openShortcuts();
      break;
    case "close-modal":
      closeModal();
      break;
    case "open-word":
      openWordDrawer(el.dataset.zh);
      break;
    case "open-phrase": {
      const phrase = PHRASES.find((p) => p.zh === el.dataset.zh);
      if (phrase) openPhraseModal(phrase);
      break;
    }
    case "close-drawer":
      closeDrawer();
      break;
    case "mark-learned": {
      event.stopPropagation();
      const zh = el.dataset.zh;
      const was = state.learned.includes(zh);
      toggleLearned(zh);
      const now = state.learned.includes(zh);
      if (was !== now) refreshRoute({ keepScroll: true, reopenDrawer: !!APP.drawerZh });
      break;
    }
    case "speak":
      speak(el.dataset.text || "");
      break;
    case "open-writing":
      APP.writingZh = el.dataset.zh;
      APP.writingChar = el.dataset.char || null;
      closeDrawer();
      closeModal();
      navigate("/lesson/1-1/writing");
      break;
    case "writing-select":
      APP.writingZh = el.dataset.zh;
      APP.writingChar = null;
      refreshRoute({ keepScroll: true });
      break;
    case "char-select":
      APP.writingChar = el.dataset.char;
      refreshRoute({ keepScroll: true });
      break;
    case "writer-animate":
      writerAnimate();
      break;
    case "writer-quiz":
      writerQuiz();
      break;
    case "writer-outline": {
      APP.writingOutline = APP.writingOutline === false;
      el.setAttribute("aria-checked", String(APP.writingOutline));
      if (APP.writingWriter) {
        try { APP.writingOutline ? APP.writingWriter.showOutline() : APP.writingWriter.hideOutline(); } catch { /* noop */ }
      }
      break;
    }
    case "writer-reset":
      initWriting();
      toast("Đã làm mới bảng viết.");
      break;
    case "vocab-filter":
      applyVocabFilter(el.dataset.filter);
      break;
    case "start-listening":
      startListening();
      break;
    case "listen-answer":
      listenAnswer(Number(el.dataset.n), Number(el.dataset.i));
      break;
    case "submit-listening":
      submitListening(false);
      break;
    case "retry-listening":
      retryListening();
      break;
    case "open-quiz":
      openVocabQuiz();
      break;
    case "close-quiz":
      closeQuiz();
      break;
    case "quiz-answer":
      quizAnswer(Number(el.dataset.i));
      break;
    case "quiz-next":
      quizNext();
      break;
    case "quiz-retry":
      quizRetry();
      break;
    case "quiz-go-test":
      quizGoTest();
      break;
    case "start-exam":
      startExam();
      break;
    case "resume-exam":
      resumeExam();
      break;
    case "discard-exam":
      discardExam();
      break;
    case "exam-exit":
      examExit();
      break;
    case "confirm-exit-exam":
      exitExam();
      break;
    case "exam-answer":
      examAnswer(Number(el.dataset.n), Number(el.dataset.i));
      break;
    case "exam-jump":
      examJump(Number(el.dataset.n));
      break;
    case "exam-prev":
      examPrev();
      break;
    case "exam-next":
      examNext();
      break;
    case "exam-flag":
      examFlag();
      break;
    case "exam-submit":
      examSubmit();
      break;
    case "exam-confirm-submit":
      submitExam(false);
      break;
    case "exam-palette-open":
      openExamPalette();
      break;
    case "close-exam-palette":
      closeExamPalette();
      break;
    case "view-last-result":
      viewLastResult();
      break;
    case "close-results":
      closeResults();
      if (APP.exam) exitExam();
      break;
    case "results-tab":
      APP.resultsTab = el.dataset.tab;
      renderResultsBody();
      break;
    case "results-filter":
      APP.resultsFilter = el.dataset.filter;
      renderResultsBody();
      break;
    case "results-review-wrong":
      APP.resultsTab = "review";
      APP.resultsFilter = "wrong";
      renderResultsBody();
      break;
    case "retry-exam":
      retryExam();
      break;
    case "exit-exam":
      exitExam();
      break;
    case "bulk-complete":
      bulkCompleteFlow();
      break;
    case "confirm-bulk-complete":
      confirmBulkComplete();
      break;
    case "reset-progress":
      resetProgressFlow();
      break;
    case "confirm-reset":
      confirmReset();
      break;
    case "locked-unit":
      toast("Unit này sẽ được mở trong bản cập nhật tiếp theo. Hiện tại hãy hoàn thành Unit 1-1 nhé.", "amber");
      break;
    case "search-go":
      selectSearchResult(Number(el.dataset.index));
      break;
    default:
      break;
  }
});

document.addEventListener("input", (event) => {
  const t = event.target;
  if (t.id === "vocab-search") {
    APP.vocabQuery = t.value;
    updateVocabRows();
  } else if (t.id === "writing-search") {
    APP.writingQuery = t.value;
    const q = t.value.trim().toLowerCase();
    const list = VOCAB.filter((w) => !q || `${w.zh} ${w.py} ${w.vi}`.toLowerCase().includes(q));
    const box = $("#writing-word-list");
    if (box) box.innerHTML = writingListItemsHTML(list, currentWritingWord().zh);
  } else if (t.id === "search-input") {
    APP.search.query = t.value;
    APP.search.active = 0;
    renderSearch();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "writer-speed") {
    APP.writingSpeed = Number(event.target.value) || 1;
    initWriting();
  }
});

document.addEventListener("keydown", (event) => {
  const tag = (event.target.tagName || "").toLowerCase();
  const typing = tag === "input" || tag === "textarea" || tag === "select" || event.target.isContentEditable;

  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
    return;
  }
  if (!typing && event.key === "/" && !APP.search.open) {
    event.preventDefault();
    openSearch();
    return;
  }
  if (!typing && event.key.toLowerCase() === "t" && !APP.exam && !APP.search.open && !document.querySelector("[data-modal]")) {
    toggleTheme();
    return;
  }

  if (APP.search.open) {
    if (event.key === "Escape") { event.preventDefault(); closeSearch(); return; }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      APP.search.active = Math.min(APP.search.active + 1, Math.max(0, APP.search.results.length - 1));
      renderSearch();
      $(".search-item.active")?.scrollIntoView({ block: "nearest" });
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      APP.search.active = Math.max(0, APP.search.active - 1);
      renderSearch();
      $(".search-item.active")?.scrollIntoView({ block: "nearest" });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      selectSearchResult(APP.search.active);
      return;
    }
  }

  if (event.key === "Escape") {
    if (document.querySelector("[data-quiz-modal]")) { closeQuiz(); return; }
    if (document.querySelector("[data-modal]")) { closeModal(); return; }
    if (document.querySelector("[data-exam-sheet]")) { closeExamPalette(); return; }
    if (document.querySelector("[data-results]")) {
      closeResults();
      if (APP.exam) exitExam();
      return;
    }
    if (APP.drawerZh) { closeDrawer(); return; }
    if (APP.sidebarOpen) { closeSidebar(); return; }
    if (APP.exam && !APP.exam.submitted) { examExit(); return; }
  }

  if (APP.exam && !APP.exam.submitted && !typing && !document.querySelector("[data-modal]")) {
    if (event.key === "ArrowLeft") { event.preventDefault(); examPrev(); return; }
    if (event.key === "ArrowRight") { event.preventDefault(); examNext(); return; }
    if (["1", "2", "3", "4"].includes(event.key)) {
      event.preventDefault();
      examAnswer(APP.exam.current, Number(event.key) - 1);
      return;
    }
    if (event.key.toLowerCase() === "f") { event.preventDefault(); examFlag(); return; }
  }

  if (APP.quiz && !APP.quiz.finished && !typing) {
    if (["1", "2", "3", "4"].includes(event.key) && !APP.quiz.locked) {
      event.preventDefault();
      quizAnswer(Number(event.key) - 1);
    } else if (event.key === "Enter" && APP.quiz.locked) {
      event.preventDefault();
      quizNext();
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest?.("[data-action='open-word'][role='button'], [data-action='locked-unit'][role='button']");
  if (row && event.target === row) {
    event.preventDefault();
    row.click();
  }
});

window.addEventListener("hashchange", () => renderRoute());

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */
function init() {
  applyTheme(state.theme, false);
  ensureDaily();
  saveState();
  renderShell();
  renderRoute();
  checkExamSession();
  if (!state.activity.length) {
    setTimeout(() => toast("Chào mừng đến Argon · 墨語. Bắt đầu với 25 từ cốt lõi của Unit 1-1 nhé!", "jade"), 900);
  }
}

init();
