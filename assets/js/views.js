/* ============================================================
   Argon · 墨語 — Shell + all page views
   ============================================================ */

const TAB_META = {
  overview: { label: "Tổng quan", icon: "book" },
  vocab: { label: "Từ vựng", icon: "layers" },
  writing: { label: "Luyện viết", icon: "pen" },
  listening: { label: "Luyện nghe", icon: "headphones" },
  test: { label: "Bài kiểm tra", icon: "clipboard" }
};

function navItem(href, iconName, label, active, badge = "", badgeClass = "") {
  return `<a class="nav-item ${active ? "active" : ""}" href="${href}">
    ${ico(iconName)}
    <span>${esc(label)}</span>
    ${badge ? `<span class="nav-badge ${badgeClass}">${badge}</span>` : ""}
  </a>`;
}

function sidebarHTML() {
  const r = APP.route;
  const active = {
    dashboard: r.name === "dashboard",
    course: r.name === "course",
    overview: r.name === "lesson" && r.tab === "overview",
    vocab: r.name === "lesson" && r.tab === "vocab",
    writing: r.name === "lesson" && r.tab === "writing",
    listening: r.name === "lesson" && r.tab === "listening",
    test: r.name === "lesson" && r.tab === "test",
    progress: r.name === "progress"
  };
  const days = last7Days();
  return `
    <div class="brand">
      <div class="brand-seal">墨</div>
      <div class="brand-text"><b>Argon · 墨語</b><span>TOCFL Band B · L4</span></div>
      <button class="icon-btn brand-close" data-action="close-sidebar" aria-label="Đóng menu">${ico("x")}</button>
    </div>

    <div class="nav-label">Học tập</div>
    <nav class="nav">
      ${navItem("#/", "home", "Tổng quan", active.dashboard)}
      ${navItem("#/course", "route", "Lộ trình 10 chủ đề", active.course)}
      ${navItem("#/lesson/1-1/overview", "book", "Bài học 1-1", active.overview || active.vocab || active.writing, lessonProgress() + "%")}
      ${navItem("#/lesson/1-1/vocab", "layers", "Từ vựng · 50 từ", active.vocab, "50")}
      ${navItem("#/lesson/1-1/writing", "pen", "Xưởng thư pháp", active.writing)}
    </nav>

    <div class="nav-label">Luyện tập</div>
    <nav class="nav">
      ${navItem("#/lesson/1-1/listening", "headphones", "Luyện nghe", active.listening, state.listenBest ? state.listenBest + "/5" : "")}
      ${navItem("#/lesson/1-1/test", "clipboard", "Bài kiểm tra", active.test, isTestUnlocked() ? "" : ico("lock", "ico"), isTestUnlocked() ? "" : "lock")}
      ${navItem("#/progress", "chart", "Tiến độ & thành tích", active.progress)}
    </nav>

    <div class="sidebar-foot">
      <div class="streak-card">
        <div class="streak-top">
          <div class="flame">${ico("flame")}</div>
          <div><b>${studyStreak()} ngày</b><small>Chuỗi học tập</small></div>
        </div>
        <div class="streak-days">${days.map((d) => `<i class="${d.on ? "on" : ""}" title="${d.label} ${d.on ? "· có học" : "· chưa học"}"></i>`).join("")}</div>
      </div>

      <div class="side-settings">
        <button class="side-row" data-action="theme-toggle">
          ${ico(state.theme === "dark" ? "moon" : "sun")}
          <span>Chế độ tối</span>
          <span class="switch" data-theme-switch role="switch" aria-checked="${state.theme === "dark"}"></span>
        </button>
        <button class="side-row" data-action="open-shortcuts">
          ${ico("keyboard")}<span>Phím tắt</span>
        </button>
      </div>

      <div class="side-user">
        <span class="avatar">AR</span>
        <div class="grow"><b>Học viên Argon</b><small>Band B · Level 4</small></div>
        <a class="icon-btn" href="#/progress" aria-label="Xem tiến độ" data-tip="Tiến độ">${ico("chart")}</a>
      </div>
    </div>`;
}

function crumbsHTML() {
  const r = APP.route;
  const home = `<a href="#/">Argon</a>`;
  if (r.name === "dashboard") return `<span class="current">Tổng quan</span>`;
  if (r.name === "course") return `${home}<span class="sep">/</span><span class="current">Lộ trình</span>`;
  if (r.name === "progress") return `${home}<span class="sep">/</span><span class="current">Tiến độ</span>`;
  if (r.name === "lesson") {
    const tab = TAB_META[r.tab]?.label || "Bài học";
    return `${home}<span class="sep">/</span><a href="#/course">Khóa học</a><span class="sep">/</span><a href="#/lesson/1-1/overview">Unit 1-1</a><span class="sep">/</span><span class="current">${esc(tab)}</span>`;
  }
  return `<span class="current">Argon</span>`;
}

function topbarHTML() {
  return `
    <button class="icon-btn menu-btn" data-action="open-sidebar" aria-label="Mở menu">${ico("menu")}</button>
    <div class="crumbs">${crumbsHTML()}</div>
    <button class="top-search" data-action="open-search" aria-label="Tìm kiếm">
      ${ico("search")}
      <span class="ts-label">Tìm từ vựng, bài học…</span>
      <kbd>⌘K</kbd>
    </button>
    <div class="top-actions">
      <span class="streak-pill" data-tip="Chuỗi ngày học liên tiếp">${ico("flame")}<span>${studyStreak()}</span></span>
      <button class="icon-btn theme-toggle" data-action="theme-toggle" aria-label="Đổi giao diện sáng/tối">
        ${ico("sun", "ico sun")}${ico("moon", "ico moon")}
      </button>
      <a class="avatar" href="#/progress" aria-label="Tiến độ học tập" data-tip="Tiến độ">AR</a>
    </div>`;
}

function mobileNavHTML() {
  const r = APP.route;
  const active = (name, tab = null) => r.name === name && (!tab || r.tab === tab);
  const item = (href, iconName, label, on) => `<a href="${href}" class="${on ? "active" : ""}">${ico(iconName)}<span>${esc(label)}</span></a>`;
  return `<div class="mn-row">
    ${item("#/", "home", "Tổng quan", active("dashboard"))}
    ${item("#/course", "route", "Lộ trình", active("course"))}
    ${item("#/lesson/1-1/vocab", "layers", "Từ vựng", active("lesson", "vocab"))}
    ${item("#/lesson/1-1/listening", "headphones", "Luyện nghe", active("lesson", "listening"))}
    ${item("#/lesson/1-1/test", "clipboard", "Kiểm tra", active("lesson", "test"))}
  </div>`;
}

function footerHTML() {
  return `
    <div class="foot-brand"><span class="seal-mini">墨</span><span>Argon · 墨語 — học chậm, nhớ lâu.</span></div>
    <div class="foot-links">
      <span>Nội dung: TOCFL Band B Level 4</span>
      <a href="#/lesson/1-1/test">Bài kiểm tra</a>
      <button data-action="open-shortcuts" style="color:inherit;font:inherit">Phím tắt</button>
    </div>`;
}

function renderShell() {
  const sidebar = $("#sidebar");
  const topbar = $("#topbar");
  const mobile = $("#mobile-nav");
  const foot = $("#site-foot");
  if (sidebar) sidebar.innerHTML = sidebarHTML();
  if (topbar) topbar.innerHTML = topbarHTML();
  if (mobile) mobile.innerHTML = mobileNavHTML();
  if (foot) foot.innerHTML = footerHTML();
  document.body.classList.toggle("sidebar-open", APP.sidebarOpen);
}

/* ------------------------------------------------------------------ */
/* Small UI helpers                                                    */
/* ------------------------------------------------------------------ */
function miniRingHTML(value, color = "") {
  const p = clamp(Number(value) || 0, 0, 100);
  const r = 16;
  const c = 2 * Math.PI * r;
  return `<span class="mini-ring"><svg viewBox="0 0 40 40" aria-hidden="true">
    <circle class="track" cx="20" cy="20" r="${r}"></circle>
    <circle class="fill" cx="20" cy="20" r="${r}" stroke="${color || "var(--accent)"}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - p / 100)).toFixed(1)}"></circle>
  </svg></span>`;
}

function sparkHTML(seed = 7) {
  return `<span class="stat-spark" aria-hidden="true">${Array.from({ length: 13 }, (_, i) => {
    const h = 20 + ((i * seed * 7 + 13) % 80);
    return `<i style="height:${h}%"></i>`;
  }).join("")}</span>`;
}

function goalItem(done, title, sub, value, target) {
  return `<div class="goal-item ${done ? "done" : ""}">
    <span class="goal-check">${ico("check")}</span>
    <div class="goal-text"><b>${esc(title)}</b><small>${esc(sub)}</small></div>
    <span class="goal-count">${value}/${target}</span>
  </div>`;
}

function themeRowHTML(theme) {
  const isOpen = theme.n === 1;
  const p = isOpen ? lessonProgress() : 0;
  const unitCount = theme.units.length;
  return `<a class="theme-row ${isOpen ? "active" : ""} ${p === 100 ? "done" : ""}" href="#/course">
    <span class="theme-num">${pad2(theme.n)}</span>
    <span class="theme-name"><b>${esc(theme.zh)}</b><small>${esc(theme.vi)} · ${unitCount} unit</small></span>
    <span class="theme-progress">
      <span class="progress"><i style="width:${p}%"></i></span>
      <span>${p}%</span>
    </span>
  </a>`;
}

function activityIcon(type) {
  return { word: "book", writing: "pen", listen: "headphones", exam: "trophy", quiz: "zap" }[type] || "sparkles";
}

function activityHTML(limit = 5) {
  if (!state.activity.length) {
    return `<div class="empty"><div class="empty-ico">${ico("sparkles")}</div><h4>Chưa có hoạt động</h4><p>Học từ đầu tiên, luyện một chữ Hán hoặc nghe một hội thoại — nhật ký sẽ xuất hiện ở đây.</p></div>`;
  }
  return `<div class="activity">${state.activity.slice(0, limit).map((a) => `
    <div class="activity-item">
      <span class="activity-dot ${a.type === "exam" ? "amber" : a.type === "word" || a.type === "writing" ? "jade" : "sky"}">${ico(activityIcon(a.type))}</span>
      <div class="activity-body"><b>${esc(a.title)}</b><small>${esc(a.detail || "")}</small></div>
      <span class="activity-time">${relativeTime(a.at)}</span>
    </div>`).join("")}</div>`;
}

function transcriptHTML({ compact = false } = {}) {
  return `<div class="transcript-card">
    <div class="transcript-head">${ico("file-text")}<b>Transcript gốc</b><small>Answer Keys · tr. 224</small></div>
    <div class="transcript-body">
      ${TRANSCRIPTS.map((t) => `<div class="transcript-dialog">
        <div class="td-title">${esc(t.title)}</div>
        ${t.lines.map((l) => `<div class="transcript-line">
          <span class="sp ${l.sp === "女" ? "f" : ""}">${esc(l.sp)}</span>
          <div><div class="tx">${esc(l.zh)}</div></div>
        </div>`).join("")}
        ${compact ? "" : `<div class="td-vi">${esc(t.vi)}</div>`}
      </div>`).join("")}
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
function renderDashboard(main) {
  const core = coreLearned();
  const coreTotal = coreWords().length;
  const progress = lessonProgress();
  const streak = studyStreak();
  const daily = state.daily;
  const goalWords = Math.min(daily.words, 5);
  const goalMinutes = Math.min(daily.seconds, 600);
  const goalWrite = Math.min(daily.writing, 1);
  const goalListen = Math.min(daily.listen, 1);
  const w = wordOfDay();
  const examLabel = state.examBest ? `${state.examBest}/30` : "—";
  const examNote = state.examBest ? "bài thi gần nhất" : "chưa có bài thi";
  const nextHref = core < coreTotal ? "#/lesson/1-1/vocab" : !state.quizPassed ? "#/lesson/1-1/test" : "#/lesson/1-1/test";
  const nextLabel = core < coreTotal ? "Học từ vựng" : !state.quizPassed ? "Làm quiz mở khóa" : "Vào bài kiểm tra";

  main.innerHTML = `<div class="page dash">
    <section class="hero">
      <div class="hero-copy">
        <div class="hero-eyebrow">
          <span class="badge sky"><span class="dot"></span> TOCFL Band B · Level 4</span>
          <span class="badge ghost">Bài mẫu · Unit 1-1</span>
        </div>
        <h1>Học <span class="brush">個人資料</span> bằng <span class="accent">thư pháp</span> và đề thi thật.</h1>
        <p class="hero-lead">25 từ cốt lõi, 25 từ mở rộng, luyện viết từng nét, nghe audio gốc và làm trọn 30 câu của Unit 1-1 — tất cả trong một không gian học tập.</p>
        <div class="hero-actions">
          <a class="btn primary lg" href="${nextHref}">${ico(core < coreTotal ? "layers" : "clipboard")} ${nextLabel}</a>
          <a class="btn secondary lg" href="#/lesson/1-1/writing">${ico("pen")} Luyện chữ Hán</a>
        </div>
        <div class="hero-meta">
          <span class="pill">${ico("layers")} 50 từ vựng</span>
          <span class="pill">${ico("headphones")} Audio gốc 01-1</span>
          <span class="pill">${ico("clipboard")} 30 câu thật</span>
          <span class="pill">${ico("clock")} 30 phút</span>
        </div>
      </div>
      <div class="hero-3d-wrap">
        <canvas id="hero-3d" class="hero-3d" aria-hidden="true"></canvas>
        <div class="hero-3d-hint">${ico("mouse-pointer")} Kéo để xoay · 3D</div>
      </div>
      <div class="hero-orbit" aria-hidden="true">
        <div class="orbit-ring"></div><div class="orbit-ring r2"></div>
        <div class="orbit-chip" style="left:14%;top:20%">語</div>
        <div class="orbit-chip" style="right:14%;top:16%;animation-delay:-2s">齡</div>
        <div class="orbit-chip" style="left:18%;bottom:16%;animation-delay:-4s">婚</div>
        <div class="orbit-chip" style="right:18%;bottom:20%;animation-delay:-1s">姓</div>
      </div>
      <div class="hero-watermark">學</div>
    </section>

    <section class="stat-grid">
      <article class="stat-card">
        <span class="stat-ico">${ico("book-open")}</span>
        <div class="stat-body"><div class="stat-label">Từ cốt lõi</div><div class="stat-value">${core}<small>/${coreTotal}</small></div><div class="stat-note">${coreTotal - core} từ còn lại để mở khóa</div></div>
        ${miniRingHTML(pct(core, coreTotal))}
      </article>
      <article class="stat-card">
        <span class="stat-ico jade">${ico("clock")}</span>
        <div class="stat-body"><div class="stat-label">Thời gian học</div><div class="stat-value">${formatStudyTime(state.stats.seconds)}</div><div class="stat-note">tổng thời gian tích lũy</div></div>
        ${sparkHTML(3)}
      </article>
      <article class="stat-card">
        <span class="stat-ico amber">${ico("flame")}</span>
        <div class="stat-body"><div class="stat-label">Chuỗi ngày</div><div class="stat-value">${streak}<small> ngày</small></div><div class="stat-note">giữ nhịp mỗi ngày</div></div>
        ${sparkHTML(9)}
      </article>
      <article class="stat-card">
        <span class="stat-ico violet">${ico("trophy")}</span>
        <div class="stat-body"><div class="stat-label">Điểm gần nhất</div><div class="stat-value">${examLabel}</div><div class="stat-note">${examNote}</div></div>
        ${miniRingHTML(state.examBest ? pct(state.examBest, 30) : 0, "var(--violet)")}
      </article>
    </section>

    <section class="feature-lesson">
      <div>
        <span class="feature-badge">${ico("sparkles")} Bài học nổi bật · Theme 01</span>
        <h2>Unit 1-1 · 個人資料</h2>
        <p>Họ tên, quốc tịch, ngày sinh, tuổi, giới tính và hôn nhân — chủ đề nền tảng của Band B, được dạy qua 50 từ vựng, thư pháp và đề thi gốc.</p>
        <div class="feature-meta">
          <span>${ico("layers")} 25 từ cốt lõi</span>
          <span>${ico("headphones")} 5 hội thoại</span>
          <span>${ico("file-text")} 30 câu hỏi</span>
          <span>${ico("pen")} 田字格</span>
        </div>
      </div>
      <div class="feature-cta">
        ${ringHTML(progress)}
        <a class="btn" href="#/lesson/1-1/overview">Vào bài học ${ico("arrow-right")}</a>
        <small>${core}/${coreTotal} từ cốt lõi · ${state.quizPassed ? "đã mở khóa thi" : "thi đang khóa"}</small>
      </div>
    </section>

    <div class="dash-grid">
      <div class="dash-col">
        <section class="panel">
          <div class="panel-head pb">
            <div><div class="panel-title">${ico("route")} Lộ trình 10 chủ đề</div><div class="panel-sub">30 unit · TOCFL Band B Level 4</div></div>
            <a class="btn sm ghost" href="#/course">Xem tất cả ${ico("arrow-right")}</a>
          </div>
          <div class="panel-body" style="padding-top:0">
            <div class="theme-list">${COURSE.themes.map(themeRowHTML).join("")}</div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head pb">
            <div><div class="panel-title">${ico("sparkles")} Hoạt động gần đây</div><div class="panel-sub">Nhật ký học tập của bạn</div></div>
            <a class="btn sm ghost" href="#/progress">Chi tiết</a>
          </div>
          <div class="panel-body" style="padding-top:0">${activityHTML(5)}</div>
        </section>
      </div>

      <div class="dash-col">
        <section class="panel pad goal-card">
          <div class="row between">
            <div><div class="panel-title">${ico("target")} Mục tiêu hôm nay</div><div class="panel-sub">${todayLabel()}</div></div>
            <span class="badge ${daily.seconds >= 600 && daily.words >= 5 ? "jade" : "sky"}">${daily.seconds >= 600 && daily.words >= 5 ? "Đạt mục tiêu" : "Đang học"}</span>
          </div>
          <div class="goal-list mt-2">
            ${goalItem(goalMinutes >= 600, "Học 10 phút", "Thời gian tập trung", goalMinutes, 600)}
            ${goalItem(goalWords >= 5, "5 từ mới", "Đánh dấu đã học", goalWords, 5)}
            ${goalItem(goalWrite >= 1, "1 chữ Hán", "Hoàn thành bài viết", goalWrite, 1)}
            ${goalItem(goalListen >= 1, "1 phiên nghe", "5 hội thoại Unit 1-1", goalListen, 1)}
          </div>
        </section>

        <button class="panel pad wotd" data-action="open-word" data-zh="${esc(w.zh)}" style="text-align:left;width:100%">
          <div class="row between">
            <span class="eyebrow">Từ của ngày</span>
            <span class="badge ${w.core ? "sky" : "ghost"}">${w.core ? "Cốt lõi" : "Mở rộng"}</span>
          </div>
          <div class="wotd-big">${esc(w.zh)}</div>
          <div class="wotd-py">${esc(w.py)}</div>
          <div class="wotd-vi">${esc(w.vi)}</div>
          <div class="wotd-ex">${esc(w.ex[0].zh)}<small>${esc(w.ex[0].vi)}</small></div>
        </button>

        <section class="panel pad">
          <div class="tip-card">
            <span class="tip-ico">${ico("info")}</span>
            <div><b>Vì sao có 實歲 và 虛歲?</b><p>Người Hoa thường có hai cách tính tuổi. 實歲 tính từ ngày sinh; 虛歲 tính từ lúc sinh là 1 tuổi, qua Tết thêm 1. Đây là điểm văn hóa rất dễ xuất hiện trong đề nghe.</p></div>
          </div>
          <div class="row between mt-3">
            <a class="btn sm secondary" href="#/lesson/1-1/overview">${ico("book-open")} Xem bài học</a>
            <a class="btn sm ghost" href="#/lesson/1-1/listening">${ico("headphones")} Nghe thử</a>
          </div>
        </section>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Course map                                                          */
/* ------------------------------------------------------------------ */
function renderCourse(main) {
  const p = lessonProgress();
  const totalUnits = COURSE.themes.reduce((n, t) => n + t.units.length, 0);
  main.innerHTML = `<div class="page">
    <div class="page-head">
      <div><span class="eyebrow">Lộ trình học</span><h1 class="page-title">10 chủ đề · 30 unit</h1><p class="page-sub">Toàn bộ khung chương trình TOCFL Band B Level 4. Unit 1-1 đã mở đầy đủ; các unit còn lại sẽ lần lượt được bổ sung.</p></div>
      <div class="page-head-actions"><a class="btn secondary" href="#/lesson/1-1/overview">${ico("play")} Học Unit 1-1</a></div>
    </div>

    <section class="course-hero">
      <span class="eyebrow">The Ultimate Guide to Chinese Vocabulary & TOCFL</span>
      <h1 class="mt-1">Band B · Level 4</h1>
      <p>Khóa học kết hợp từ vựng theo chủ đề, thư pháp, audio gốc và đề thi thật. Mỗi unit gồm 5 phần: nghe hội thoại, hoàn thành câu, chọn từ điền vào đoạn văn, đọc thiệp và đọc hiểu đoạn văn.</p>
      <div class="course-stats">
        <div class="course-stat"><b>${COURSE.totalThemes}</b><small>chủ đề</small></div>
        <div class="course-stat"><b>${totalUnits}</b><small>unit</small></div>
        <div class="course-stat"><b>50</b><small>từ đã biên soạn</small></div>
        <div class="course-stat"><b>30</b><small>câu hỏi thật</small></div>
        <div class="course-stat"><b>${p}%</b><small>tiến độ Unit 1-1</small></div>
      </div>
      <div class="course-watermark">路</div>
    </section>

    <div class="stack lg">
      ${COURSE.themes.map((theme) => {
        const isOpen = theme.n === 1;
        const tp = isOpen ? p : 0;
        return `<section class="theme-block ${isOpen ? "open" : ""}">
          <div class="theme-block-head">
            <span class="num">${pad2(theme.n)}</span>
            <div><h2><span class="zh">${esc(theme.zh)}</span></h2><small>${esc(theme.vi)} · ${theme.units.length} unit</small></div>
            <div class="theme-block-progress">${progressHTML(tp)}<span class="pct">${tp}%</span></div>
          </div>
          <div class="unit-grid">
            ${theme.units.map((u) => {
              if (u.available) {
                return `<a class="unit-card active" href="#/lesson/${u.id}/overview">
                  <div class="unit-top"><span class="unit-id">Unit ${u.id}</span><span class="badge jade">Đang mở</span></div>
                  <h3>${esc(u.zh)}</h3>
                  <p>${esc(u.vi)}</p>
                  <div class="unit-progress"><i style="width:${p}%"></i></div>
                  <div class="unit-foot"><small>Trang ${u.page} · ${p}%</small><span class="row" style="gap:4px"><small>Vào học</small>${ico("arrow-right")}</span></div>
                </a>`;
              }
              return `<div class="unit-card locked" data-action="locked-unit" role="button" tabindex="0">
                <div class="unit-top"><span class="unit-id">Unit ${u.id}</span><span class="unit-lock">${ico("lock")}</span></div>
                <h3>${esc(u.zh)}</h3>
                <p>${esc(u.vi)}</p>
                <div class="unit-foot"><small>Trang ${u.page} · Sắp mở</small>${ico("lock")}</div>
              </div>`;
            }).join("")}
          </div>
        </section>`;
      }).join("")}
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Progress page                                                       */
/* ------------------------------------------------------------------ */
function renderProgress(main) {
  const core = coreLearned();
  const coreTotal = coreWords().length;
  const p = lessonProgress();
  const events = [
    ...state.examHistory.map((e) => ({ ...e, kind: "exam" })),
    ...state.listenHistory.map((e) => ({ ...e, kind: "listen" }))
  ].sort((a, b) => b.at - a.at).slice(0, 8);

  const achievements = [
    { icon: "star", title: "Nét bút đầu tiên", desc: "Học từ vựng đầu tiên", done: learnedCount() > 0 },
    { icon: "book-open", title: "25 từ cốt lõi", desc: "Hoàn thành bộ từ khóa", done: core === coreTotal },
    { icon: "pen", title: "Thư pháp gia", desc: "Viết đúng 10 chữ Hán", done: writtenChars() >= 10 },
    { icon: "headphones", title: "Tai nghe sắc bén", desc: "Đúng 4/5 câu nghe", done: state.listenBest >= 4 },
    { icon: "unlock", title: "Mở khóa bài thi", desc: "Đạt quiz từ vựng ≥ 8/10", done: state.quizPassed },
    { icon: "trophy", title: "Chinh phục Band B", desc: "Đạt 24/30 bài kiểm tra", done: state.examBest >= 24 },
    { icon: "flame", title: "Bền bỉ 7 ngày", desc: "Chuỗi học 7 ngày", done: studyStreak() >= 7 },
    { icon: "award", title: "Điểm tuyệt đối", desc: "30/30 câu đúng", done: state.examBest === 30 }
  ];

  main.innerHTML = `<div class="page">
    <div class="page-head">
      <div><span class="eyebrow">Tiến độ</span><h1 class="page-title">Hành trình của bạn</h1><p class="page-sub">Mọi nét viết, mỗi câu nghe và từng bài thi đều được ghi lại tại đây.</p></div>
      <div class="page-head-actions"><a class="btn secondary" href="#/lesson/1-1/overview">${ico("book-open")} Tiếp tục học</a></div>
    </div>

    <section class="stat-grid">
      <article class="stat-card"><span class="stat-ico">${ico("chart")}</span><div class="stat-body"><div class="stat-label">Tiến độ tổng thể</div><div class="stat-value">${p}<small>%</small></div><div class="stat-note">Unit 1-1</div></div>${miniRingHTML(p)}</article>
      <article class="stat-card"><span class="stat-ico jade">${ico("book-open")}</span><div class="stat-body"><div class="stat-label">Từ đã học</div><div class="stat-value">${learnedCount()}<small>/50</small></div><div class="stat-note">${core}/${coreTotal} từ cốt lõi</div></div>${miniRingHTML(pct(learnedCount(), 50))}</article>
      <article class="stat-card"><span class="stat-ico amber">${ico("pen")}</span><div class="stat-body"><div class="stat-label">Chữ Hán đã viết</div><div class="stat-value">${writtenChars()}</div><div class="stat-note">chữ khác nhau</div></div>${sparkHTML(5)}</article>
      <article class="stat-card"><span class="stat-ico violet">${ico("trophy")}</span><div class="stat-body"><div class="stat-label">Kỷ lục bài thi</div><div class="stat-value">${state.examBest || 0}<small>/30</small></div><div class="stat-note">${state.examHistory.length} lần làm bài</div></div>${miniRingHTML(pct(state.examBest, 30), "var(--violet)")}</article>
    </section>

    <div class="progress-grid">
      <div class="stack">
        <section class="panel pad">
          <div class="row between">
            <div><div class="panel-title">${ico("target")} Bức tranh tổng thể</div><div class="panel-sub">Tiến độ từng kỹ năng của Unit 1-1</div></div>
            ${ringHTML(p, "lg")}
          </div>
          <div class="mt-3">
            <div class="metric-row"><span class="metric-label">Từ vựng cốt lõi</span><span class="metric-value">${core}/${coreTotal}</span>${progressHTML(pct(core, coreTotal))}</div>
            <div class="metric-row"><span class="metric-label">Luyện viết chữ Hán</span><span class="metric-value">${writtenChars()} chữ</span>${progressHTML(Math.min(100, pct(writtenChars(), 12)))}</div>
            <div class="metric-row"><span class="metric-label">Luyện nghe</span><span class="metric-value">${state.listenBest}/5 câu</span>${progressHTML(pct(state.listenBest, 5), "jade")}</div>
            <div class="metric-row"><span class="metric-label">Quiz từ vựng</span><span class="metric-value">${state.quizBest}/10 · ${state.quizPassed ? "đã đạt" : "chưa đạt"}</span>${progressHTML(pct(state.quizBest, 10), state.quizPassed ? "jade" : "amber")}</div>
            <div class="metric-row"><span class="metric-label">Bài kiểm tra</span><span class="metric-value">${state.examBest}/30</span>${progressHTML(pct(state.examBest, 30))}</div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head pb"><div><div class="panel-title">${ico("clock")} Lịch sử gần đây</div><div class="panel-sub">Bài nghe và bài thi đã hoàn thành</div></div></div>
          <div class="panel-body" style="padding-top:0">
            ${events.length ? `<div class="history-list">${events.map((e) => `<div class="history-item">
              <span class="hi-ico">${ico(e.kind === "exam" ? "trophy" : "headphones")}</span>
              <div class="hi-body"><b>${e.kind === "exam" ? "Bài kiểm tra Unit 1-1" : "Luyện nghe Unit 1-1"}</b><small>${formatDateTime(e.at)} · ${e.kind === "exam" ? formatStudyTime(e.duration || 0) : "5 hội thoại"}</small></div>
              <span class="hi-score">${e.correct ?? e.score}/${e.total}</span>
            </div>`).join("")}</div>` : `<div class="empty"><div class="empty-ico">${ico("headphones")}</div><h4>Chưa có lịch sử</h4><p>Hoàn thành một phiên luyện nghe hoặc bài kiểm tra để bắt đầu theo dõi.</p></div>`}
          </div>
        </section>
      </div>

      <div class="stack">
        <section class="panel">
          <div class="panel-head pb"><div><div class="panel-title">${ico("award")} Thành tích</div><div class="panel-sub">Mở khóa khi đạt cột mốc</div></div><span class="badge sky">${achievements.filter((a) => a.done).length}/${achievements.length}</span></div>
          <div class="panel-body" style="padding-top:0">
            <div class="progress-checklist">
              ${achievements.map((a) => `<div class="check-row ${a.done ? "done" : ""}">
                <span class="check-ico">${ico(a.done ? "check" : a.icon)}</span>
                <div class="check-body"><b>${esc(a.title)}</b><small>${esc(a.desc)}</small></div>
                <span class="check-val">${a.done ? "Đạt" : "—"}</span>
              </div>`).join("")}
            </div>
          </div>
        </section>

        <section class="panel pad">
          <div class="panel-title">${ico("info")} Ghi chú</div>
          <p class="panel-sub mt-1">Dữ liệu tiến độ được lưu cục bộ trong trình duyệt. Bạn có thể đặt lại bất cứ lúc nào.</p>
          <button class="btn secondary block mt-3" data-action="bulk-complete">${ico("check-circle")} Tích tất cả từ &amp; chữ</button>
          <button class="btn danger block mt-2" data-action="reset-progress">${ico("trash")} Đặt lại toàn bộ tiến độ</button>
        </section>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Lesson shell                                                        */
/* ------------------------------------------------------------------ */
function lessonHeaderHTML() {
  const p = lessonProgress();
  const unlocked = isTestUnlocked();
  return `<section class="lesson-hero">
    <div class="lesson-hero-top">
      <div>
        <div class="lesson-badge-row">
          <span class="badge sky">Theme 01 · 個人資料</span>
          <span class="badge">Unit 1-1</span>
          <span class="badge jade">${ico("headphones")} Audio gốc</span>
        </div>
        <h1>姓名、國籍、出生、年齡、性別、婚姻</h1>
        <p class="lesson-vi">Họ tên, quốc tịch, ngày sinh, tuổi, giới tính, hôn nhân — bài học nền tảng của TOCFL Band B Level 4.</p>
        <div class="lesson-meta">
          <span class="pill">${ico("layers")} 50 từ vựng</span>
          <span class="pill">${ico("clipboard")} 30 câu thật</span>
          <span class="pill">${ico("clock")} 30 phút</span>
          <span class="pill">${ico("file-text")} Trang 10</span>
        </div>
      </div>
      <div class="lesson-hero-side">
        <div class="side-label"><b>Tiến độ bài học</b><small>${coreLearned()}/25 từ cốt lõi</small></div>
        ${ringHTML(p)}
      </div>
    </div>
    <div class="lesson-hero-actions">
      <a class="btn primary" href="#/lesson/1-1/vocab">${ico("layers")} Học từ vựng</a>
      <a class="btn secondary" href="#/lesson/1-1/writing">${ico("pen")} Luyện viết</a>
      <a class="btn secondary" href="#/lesson/1-1/listening">${ico("headphones")} Luyện nghe</a>
      <a class="btn ${unlocked ? "soft" : "ghost"}" href="#/lesson/1-1/test">${ico(unlocked ? "clipboard" : "lock")} Bài kiểm tra ${unlocked ? "" : "đang khóa"}</a>
    </div>
  </section>`;
}

function lessonTabsHTML(tab) {
  const unlocked = isTestUnlocked();
  return `<div class="lesson-tabs-wrap"><div class="lesson-tabs">
    ${Object.entries(TAB_META).map(([id, meta]) => `<a class="tab-btn ${tab === id ? "active" : ""}" href="#/lesson/1-1/${id}">
      ${ico(meta.icon)}
      <span>${esc(meta.label)}</span>
      ${id === "vocab" ? `<span class="tab-count">50</span>` : ""}
      ${id === "test" && !unlocked ? ico("lock", "tab-lock") : ""}
    </a>`).join("")}
  </div></div>`;
}

function renderLesson(main, tab) {
  const safeTab = TAB_META[tab] ? tab : "overview";
  let body = "";
  if (safeTab === "overview") body = overviewHTML();
  else if (safeTab === "vocab") body = vocabHTML();
  else if (safeTab === "writing") body = writingHTML();
  else if (safeTab === "listening") body = listeningHTML();
  else body = testHTML();
  main.innerHTML = `<div class="page">
    ${lessonHeaderHTML()}
    ${lessonTabsHTML(safeTab)}
    <div class="lesson-body">${body}</div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Lesson overview                                                     */
/* ------------------------------------------------------------------ */
function overviewHTML() {
  const core = coreWords();
  const preview = core.slice(0, 8);
  const checklist = [
    { title: "Học 25 từ cốt lõi", sub: "Đánh dấu từng từ đã nắm", done: coreLearned() === 25, val: `${coreLearned()}/25` },
    { title: "Luyện viết chữ Hán", sub: "Hoàn thành ít nhất 1 chữ", done: writtenChars() > 0, val: `${writtenChars()} chữ` },
    { title: "Luyện nghe 5 hội thoại", sub: "Nghe và trả lời 5 câu", done: state.listenBest > 0, val: `${state.listenBest}/5` },
    { title: "Quiz từ vựng ≥ 8/10", sub: "Điều kiện mở khóa bài thi", done: state.quizPassed, val: `${state.quizBest}/10` },
    { title: "Hoàn thành bài kiểm tra", sub: "30 câu · 30 phút", done: state.examBest > 0, val: state.examBest ? `${state.examBest}/30` : "—" }
  ];
  return `<div class="overview-grid">
    <div class="overview-col">
      <section class="panel">
        <div class="panel-head pb"><div><div class="panel-title">${ico("target")} Mục tiêu bài học</div><div class="panel-sub">Sau Unit 1-1, bạn có thể…</div></div></div>
        <div class="panel-body" style="padding-top:0">
          <div class="goals">${LESSON.goals.map((g) => `<div class="goal-row"><span class="goal-ico">${ico("check")}</span><p>${esc(g)}</p></div>`).join("")}</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head pb"><div><div class="panel-title">${ico("list")} Cấu trúc đề Unit 1-1</div><div class="panel-sub">5 phần · 30 câu · theo đúng sách gốc</div></div><span class="badge sky">30 câu</span></div>
        <div class="panel-body" style="padding-top:0">
          <div class="structure-list">${LESSON.structure.map((s, i) => `<a class="structure-row" href="${i === 0 ? "#/lesson/1-1/listening" : "#/lesson/1-1/test"}">
            <span class="st-ico">${ico(s.icon)}</span>
            <div class="st-body"><b>${esc(s.zh)}</b><small>${esc(s.vi)}</small></div>
            <span class="st-count">${s.count} câu</span>
          </a>`).join("")}</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head pb"><div><div class="panel-title">${ico("layers")} Từ vựng cốt lõi</div><div class="panel-sub">8 trong 25 từ quan trọng nhất</div></div><a class="btn sm ghost" href="#/lesson/1-1/vocab">Tất cả 50 từ ${ico("arrow-right")}</a></div>
        <div class="panel-body" style="padding-top:0">
          <div class="vocab-preview">${preview.map((w) => `<button class="vocab-mini" data-action="open-word" data-zh="${esc(w.zh)}">
            <span class="vm-zh">${esc(w.zh)}</span><span class="vm-py">${esc(w.py)}</span><span class="vm-vi">${esc(w.vi)}</span>
          </button>`).join("")}</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head pb"><div><div class="panel-title">${ico("sparkles")} Cụm từ đáng nhớ</div><div class="panel-sub">Collocations xuất hiện trong đề</div></div></div>
        <div class="panel-body" style="padding-top:0">
          <div class="phrase-grid">${PHRASES.map((p) => `<button class="phrase-card" data-action="open-phrase" data-zh="${esc(p.zh)}">
            <span class="pc-zh">${esc(p.zh)}</span><span class="pc-py">${esc(p.py)}</span><span class="pc-vi">${esc(p.vi)}</span>
            <span class="pc-ex">${esc(p.ex.zh)}</span>
          </button>`).join("")}</div>
        </div>
      </section>
    </div>

    <div class="overview-col">
      <section class="panel pad">
        <div class="panel-title">${ico("check-circle")} Tiến độ bài học</div>
        <div class="progress-checklist mt-2">
          ${checklist.map((c) => `<div class="check-row ${c.done ? "done" : ""}">
            <span class="check-ico">${ico(c.done ? "check" : "circle-dot")}</span>
            <div class="check-body"><b>${esc(c.title)}</b><small>${esc(c.sub)}</small></div>
            <span class="check-val">${c.val}</span>
          </div>`).join("")}
        </div>
        <a class="btn ${isTestUnlocked() ? "primary" : "secondary"} block mt-3" href="#/lesson/1-1/test">${ico(isTestUnlocked() ? "clipboard" : "lock")} ${isTestUnlocked() ? "Vào bài kiểm tra" : "Xem điều kiện mở khóa"}</a>
      </section>

      <section class="panel pad">
        <div class="tip-card">
          <span class="tip-ico">${ico("languages")}</span>
          <div><b>實歲 và 虛歲 — hai cách tính tuổi</b><p>Đây là câu hỏi nghe số 1. 實歲 (tuổi thật) tính từ ngày sinh; 虛歲 (tuổi mụ) tính từ lúc sinh là 1 tuổi và qua Tết thêm 1 tuổi.</p></div>
        </div>
        <div class="tip-card mt-2">
          <span class="tip-ico">${ico("pen")}</span>
          <div><b>Viết đúng thứ tự nét</b><p>Mở xưởng thư pháp, xem từng nét mẫu rồi tự viết. Hanzi Writer sẽ chấm từng nét theo dữ liệu chuẩn.</p></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head pb"><div><div class="panel-title">${ico("headphones")} Audio gốc</div><div class="panel-sub">01-1.mp3 · 5 hội thoại</div></div></div>
        <div class="panel-body" style="padding-top:0">
          <div class="audio-mini">
            ${audioPlayerHTML({ src: LESSON.audio, title: "Unit 1-1 · 01-1.mp3", sub: "Audio gốc từ sách TOCFL Band B", compact: true })}
            <div class="audio-mini-note">${ico("alert")} <span>Audio dùng cho phần I. Transcript và đáp án chỉ mở sau khi nộp bài luyện nghe hoặc bài kiểm tra.</span></div>
          </div>
        </div>
      </section>

      <section class="panel pad">
        <div class="panel-title">${ico("file-text")} Nguồn học liệu</div>
        <div class="metric-row"><span class="metric-label">Sách</span><span class="metric-value">TOCFL Band B · tr. 10–14</span></div>
        <div class="metric-row"><span class="metric-label">Answer key</span><span class="metric-value">tr. 224–225</span></div>
        <div class="metric-row"><span class="metric-label">Audio</span><span class="metric-value">B2-audio/01-1.mp3</span></div>
        <div class="metric-row"><span class="metric-label">Trình độ</span><span class="metric-value">Band B · Level 4</span></div>
      </section>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Vocabulary                                                          */
/* ------------------------------------------------------------------ */
function filteredVocab() {
  let list = VOCAB.slice();
  if (APP.vocabFilter === "core") list = list.filter((w) => w.core);
  else if (APP.vocabFilter === "ext") list = list.filter((w) => !w.core);
  else if (APP.vocabFilter === "learned") list = list.filter((w) => state.learned.includes(w.zh));
  else if (APP.vocabFilter === "new") list = list.filter((w) => !state.learned.includes(w.zh));
  const q = APP.vocabQuery.trim().toLowerCase();
  if (q) {
    list = list.filter((w) => `${w.zh} ${w.py} ${w.vi} ${w.pos} ${(w.colloc || []).join(" ")} ${(w.ex || []).map((e) => e.zh + " " + e.vi).join(" ")}`.toLowerCase().includes(q));
  }
  return list;
}

function vocabRowHTML(w) {
  const learned = state.learned.includes(w.zh);
  return `<div class="vocab-row ${w.core ? "core" : "ext"} ${learned ? "learned" : ""}" data-action="open-word" data-zh="${esc(w.zh)}" role="button" tabindex="0" aria-label="${esc(w.zh)} · ${esc(w.vi)}">
    <div class="word-cell">
      <span class="wc-star ${w.core ? "" : "ext"}"></span>
      <div><div class="wc-zh">${esc(w.zh)}</div><div class="wc-py">${esc(w.py)}</div></div>
    </div>
    <div class="meaning-cell">
      <div class="mc-vi">${esc(w.vi)}</div>
      <div class="mc-tags"><span class="mc-tag">${esc(w.pos)}</span><span class="mc-tag">${w.core ? "cốt lõi" : "mở rộng"}</span>${(w.colloc || []).slice(0, 1).map((c) => `<span class="mc-tag">${esc(c)}</span>`).join("")}</div>
    </div>
    <button class="status-cell" data-action="mark-learned" data-zh="${esc(w.zh)}" aria-label="${learned ? "Bỏ đánh dấu đã học" : "Đánh dấu đã học"} ${esc(w.zh)}">
      <span class="status-dot">${ico("check")}</span><span>${learned ? "Đã học" : "Chưa học"}</span>
    </button>
    <span class="vr-arrow">${ico("chevron-right")}</span>
  </div>`;
}

function vocabRowsHTML(list = filteredVocab()) {
  if (!list.length) {
    return `<div class="empty"><div class="empty-ico">${ico("search")}</div><h4>Không tìm thấy từ phù hợp</h4><p>Thử từ khóa khác hoặc bỏ bộ lọc để xem toàn bộ 50 từ.</p></div>`;
  }
  return list.map(vocabRowHTML).join("");
}

function vocabCountHTML(list = filteredVocab()) {
  return `Hiển thị <b>${list.length}</b> / 50 từ · ${coreLearned()}/25 từ cốt lõi đã học`;
}

function vocabHTML() {
  const filters = [
    { id: "all", label: "Tất cả", count: 50 },
    { id: "core", label: "Cốt lõi", count: 25 },
    { id: "ext", label: "Mở rộng", count: 25 },
    { id: "learned", label: "Đã học", count: learnedCount() },
    { id: "new", label: "Chưa học", count: 50 - learnedCount() }
  ];
  const list = filteredVocab();
  const coreDone = coreLearned() === 25;
  return `<div class="stack">
    <div class="vocab-head">
      <div><div class="vocab-title">50 từ vựng Unit 1-1</div><div class="vocab-sub">25 từ cốt lõi bắt buộc + 25 từ mở rộng. Nhấn vào từ để xem nghĩa, nét viết và ví dụ.</div></div>
      <div class="vocab-progress">
        <div style="min-width:140px">${progressHTML(pct(coreLearned(), 25))}</div>
        <div><b>${coreLearned()}/25</b><small> cốt lõi</small></div>
      </div>
    </div>

    ${coreDone && !state.quizPassed ? `<div class="tip-card">
      <span class="tip-ico">${ico("unlock")}</span>
      <div class="grow"><b>Bạn đã học đủ 25 từ cốt lõi!</b><p>Làm quiz 10 câu và đạt ít nhất 8/10 để mở khóa bài kiểm tra 30 câu.</p></div>
      <button class="btn primary sm" data-action="open-quiz">${ico("zap")} Làm quiz mở khóa</button>
    </div>` : ""}

    <div class="vocab-toolbar">
      <div class="search-field">${ico("search")}<input class="input" id="vocab-search" type="search" placeholder="Tìm chữ Hán, pinyin hoặc nghĩa…" value="${esc(APP.vocabQuery)}" autocomplete="off"></div>
      <div class="vocab-filters">${filters.map((f) => `<button class="chip ${APP.vocabFilter === f.id ? "active" : ""}" data-action="vocab-filter" data-filter="${f.id}">${esc(f.label)} <span class="count">${f.count}</span></button>`).join("")}</div>
      <div class="toolbar-right">
        <button class="btn sm secondary" data-action="bulk-complete">${ico("check-circle")} Tích tất cả</button>
        <a class="btn sm secondary" href="#/lesson/1-1/writing">${ico("pen")} Luyện viết</a>
        ${coreDone && !state.quizPassed ? `<button class="btn sm soft" data-action="open-quiz">${ico("zap")} Quiz</button>` : ""}
      </div>
    </div>

    <div class="vocab-table-wrap">
      <div class="vocab-table-head"><span>Từ</span><span>Nghĩa &amp; cách dùng</span><span>Trạng thái</span><span></span></div>
      <div class="vocab-table" id="vocab-rows">${vocabRowsHTML(list)}</div>
      <div class="vocab-table-foot">
        <span id="vocab-count">${vocabCountHTML(list)}</span>
        <div class="legend"><span><i></i> cốt lõi</span><span><i class="ext"></i> mở rộng</span><span><i class="jade"></i> đã học</span></div>
      </div>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Writing studio                                                      */
/* ------------------------------------------------------------------ */
function currentWritingWord() {
  let w = VOCAB.find((x) => x.zh === APP.writingZh);
  if (!w) w = coreWords().find((x) => !state.learned.includes(x.zh)) || VOCAB[0];
  APP.writingZh = w.zh;
  return w;
}

function writingListItemsHTML(list, activeZh) {
  return list.map((w) => `<button class="word-list-item ${w.zh === activeZh ? "active" : ""} ${state.learned.includes(w.zh) ? "learned" : ""}" data-action="writing-select" data-zh="${esc(w.zh)}">
    <span class="wli-dot"></span>
    <span class="wli-zh">${esc(w.zh)}</span>
    <span class="wli-body"><span class="wli-py">${esc(w.py)}</span></span>
    ${w.core ? "" : `<span class="wli-ext">mở</span>`}
  </button>`).join("") || `<div class="empty" style="padding:20px 10px"><p>Không tìm thấy từ.</p></div>`;
}

function writingHTML() {
  const word = currentWritingWord();
  const chars = Array.from(word.zh);
  if (!APP.writingChar || !chars.includes(APP.writingChar)) APP.writingChar = chars[0];
  const char = APP.writingChar;
  const strokeCount = HANZI_DATA?.[char]?.strokes?.length || 0;
  const done = state.written[char] > 0;
  const q = APP.writingQuery.trim().toLowerCase();
  const list = VOCAB.filter((w) => !q || `${w.zh} ${w.py} ${w.vi}`.toLowerCase().includes(q));
  const learned = state.learned.includes(word.zh);
  return `<div class="stack">
    <div class="writing-head">
      <div><div class="vocab-title">Xưởng thư pháp</div><div class="vocab-sub">Xem thứ tự nét, viết theo mẫu và để Hanzi Writer chấm từng nét.</div></div>
      <div class="row"><span class="badge sky">${ico("pen")} 田字格</span><span class="badge jade">${writtenChars()} chữ đã viết</span></div>
    </div>

    <div class="writing-layout">
      <aside class="writing-side">
        <div class="side-card">
          <div class="side-head"><b>Danh sách từ</b><small>${VOCAB.length} từ · chọn để luyện</small></div>
          <div class="side-search"><div class="search-field">${ico("search")}<input class="input" id="writing-search" type="search" placeholder="Tìm từ…" value="${esc(APP.writingQuery)}"></div></div>
          <div class="word-list" id="writing-word-list">
            ${writingListItemsHTML(list, word.zh)}
          </div>
        </div>
        <div class="side-card" style="padding:12px 13px">
          <div class="writing-hint">${ico("info")} <span>Dùng chuột hoặc ngón tay để viết. Nếu sai nét, bấm <b>Luyện viết</b> để làm lại.</span></div>
        </div>
      </aside>

      <section class="writing-stage">
        <div class="writing-stage-head">
          <div>
            <div class="wsh-word"><span class="wsh-zh">${esc(word.zh)}</span><span class="wsh-py">${esc(word.py)}</span></div>
            <div class="wsh-vi">${esc(word.vi)}</div>
          </div>
          <span class="badge ${learned ? "jade" : "sky"} wsh-badge">${learned ? ico("check") + " Đã học" : word.core ? "Từ cốt lõi" : "Từ mở rộng"}</span>
        </div>

        <div class="char-tabs">${chars.map((ch) => {
          const chDone = state.written[ch] > 0;
          return `<button class="char-tab ${ch === char ? "active" : ""} ${chDone ? "done" : ""}" data-action="char-select" data-char="${esc(ch)}">
            <span class="ct-zh">${esc(ch)}</span>
            <span>${(HANZI_DATA?.[ch]?.strokes?.length || 0)} nét</span>
            ${chDone ? ico("check", "ct-check") : ""}
          </button>`;
        }).join("")}</div>

        <div class="writing-board-wrap">
          <div class="writing-board" id="writing-board">
            <span class="badge ${done ? "jade" : "sky"} board-badge">${done ? "Đã hoàn thành" : strokeCount + " nét"}</span>
            <div class="board-calligraphy">${esc(char)}</div>
            <div class="writer-host" id="writer-host"></div>
            <span class="board-label">Ô vuông · 田字格</span>
          </div>
        </div>

        <div class="writing-controls">
          <button class="btn primary sm" data-action="writer-animate">${ico("play")} Xem nét</button>
          <button class="btn secondary sm" data-action="writer-quiz">${ico("pencil")} Luyện viết</button>
          <span class="wc-sep"></span>
          <label class="toggle-mini"><span class="switch" id="writer-outline" role="switch" aria-checked="${APP.writingOutline !== false}" data-action="writer-outline"></span> Nét mờ</label>
          <select class="select" id="writer-speed" aria-label="Tốc độ vẽ nét">
            <option value="0.5" ${(APP.writingSpeed || 1) === 0.5 ? "selected" : ""}>0.5×</option>
            <option value="1" ${(APP.writingSpeed || 1) === 1 ? "selected" : ""}>1×</option>
            <option value="1.5" ${(APP.writingSpeed || 1) === 1.5 ? "selected" : ""}>1.5×</option>
            <option value="2" ${(APP.writingSpeed || 1) === 2 ? "selected" : ""}>2×</option>
          </select>
          <button class="btn ghost sm" data-action="writer-reset">${ico("refresh")} Làm lại</button>
          <span class="grow"></span>
          <button class="icon-btn" data-action="speak" data-text="${esc(word.zh)}" data-tip="Nghe từ">${ico("volume")}</button>
        </div>
      </section>

      <aside class="writing-info">
        <div class="wi-card">
          <div class="wi-label">Nghĩa &amp; cách dùng</div>
          <div class="wi-meaning">${esc(word.vi)}</div>
          <div class="wi-note">${esc(word.note)}</div>
        </div>
        <div class="wi-card">
          <div class="wi-label">Ví dụ</div>
          ${word.ex.slice(0, 2).map((e) => `<div class="wi-ex">${esc(e.zh)}<small>${esc(e.vi)}</small></div>`).join("")}
        </div>
        <div class="wi-card">
          <div class="wi-label">Tiến độ chữ</div>
          <div class="wi-progress">${progressHTML(done ? 100 : 0)}<b>${done ? "Đã viết" : "Chưa viết"}</b></div>
          <div class="wi-actions mt-2">
            <button class="btn ${learned ? "secondary" : "primary"} block" data-action="mark-learned" data-zh="${esc(word.zh)}">${ico(learned ? "check-circle" : "check")} ${learned ? "Đã đánh dấu đã học" : "Đánh dấu đã học"}</button>
            <button class="btn secondary block" data-action="open-word" data-zh="${esc(word.zh)}">${ico("book-open")} Xem chi tiết từ</button>
          </div>
        </div>
        <div class="wi-card">
          <div class="wi-label">Mẹo viết</div>
          <div class="writing-hint">${ico("sparkles")} <span>Viết theo thứ tự: trái → phải, trên → dưới, ngang trước sổ sau. Bật “Nét mờ” để thấy mẫu chìm.</span></div>
        </div>
      </aside>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Listening practice                                                  */
/* ------------------------------------------------------------------ */
function listenTimeLeft() {
  if (!APP.listen) return EXAM_META.listeningDuration;
  return Math.max(0, Math.round((APP.listen.deadline - Date.now()) / 1000));
}

function listenQuestions() {
  return QUESTIONS.filter((q) => q.section === "listening");
}

function listenOptionHTML(q, i, submitted) {
  const selected = APP.listen?.answers?.[q.n] === i;
  const correct = q.answer === i;
  let cls = "";
  if (submitted) {
    if (correct) cls = "correct";
    else if (selected) cls = "wrong";
  } else if (selected) cls = "selected";
  const mark = submitted && correct ? "✓" : submitted && selected && !correct ? "✕" : "";
  return `<button class="listen-option ${cls}" data-action="listen-answer" data-n="${q.n}" data-i="${i}" ${submitted ? "disabled" : ""}>
    <span class="opt-letter">${"ABCD"[i]}</span>
    <span class="grow">${esc(q.options[i])}</span>
    ${mark ? `<span class="opt-mark">${mark}</span>` : ""}
  </button>`;
}

function listenQuestionHTML(q, submitted) {
  const selected = APP.listen?.answers?.[q.n];
  return `<article class="listen-q ${submitted ? "revealed" : ""}" id="listen-q-${q.n}">
    <div class="listen-q-head">
      <span class="q-num">${q.n}</span>
      <span class="q-stem">${esc(q.q)}</span>
      ${selected != null ? `<span class="badge sky q-flag">Đã chọn ${"ABCD"[selected]}</span>` : ""}
    </div>
    <div class="q-vi">${esc(q.qVi)}</div>
    <div class="listen-options">${q.options.map((_, i) => listenOptionHTML(q, i, submitted)).join("")}</div>
    ${submitted ? `<div class="listen-explanation"><b>Đáp án ${"ABCD"[q.answer]}.</b> ${esc(q.explain)}</div>` : ""}
  </article>`;
}

function listenResultHTML(score, total) {
  return `<div class="listen-result">
    <div class="lr-top">
      <span class="lr-score">${score}<small>/${total}</small></span>
      <div class="lr-body"><b>${score >= 4 ? "Nghe rất tốt!" : score >= 3 ? "Khá ổn, cần nghe lại" : "Hãy luyện thêm nhé"}</b><small>${score >= 4 ? "Bạn đã nắm được các chi tiết chính." : "Đọc transcript và nghe lại từng đoạn để bắt từ khóa."}</small></div>
      <span class="grow"></span>
      <span class="badge ${score >= 4 ? "jade" : "amber"}">${score * 20}%</span>
    </div>
  </div>`;
}

function listenTranscriptLockedHTML() {
  return `<div class="transcript-card">
    <div class="transcript-head">${ico("lock")}<b>Transcript đang khóa</b><small>Chỉ mở sau khi nộp</small></div>
    <div class="transcript-locked"><div class="lock-big">${ico("lock")}</div><b>Không hiển thị trong lúc làm bài</b><p>Transcript và đáp án sẽ xuất hiện ngay sau khi bạn nộp bài hoặc hết giờ.</p></div>
  </div>`;
}

function listenIntroHTML() {
  const last = state.listenBest;
  return `<div class="listen-layout">
    <div class="listen-main">
      <section class="listen-hero">
        <span class="eyebrow">Luyện nghe · Phần I</span>
        <h2 class="mt-1">5 hội thoại · 10 phút</h2>
        <p>Nghe audio gốc <b>01-1.mp3</b> và trả lời 5 câu hỏi trắc nghiệm. Transcript bị khóa cho đến khi bạn nộp bài — giống trải nghiệm thi thật.</p>
        <div class="listen-badges">
          <span class="badge sky">${ico("headphones")} Audio gốc</span>
          <span class="badge">${ico("clock")} 10 phút</span>
          <span class="badge amber">${ico("lock")} Transcript ẩn</span>
          <span class="badge jade">${ico("check-circle")} Chấm tự động</span>
        </div>
      </section>

      <section class="panel pad">
        <div class="panel-title">${ico("list")} Cách luyện</div>
        <div class="progress-checklist mt-2">
          <div class="check-row"><span class="check-ico">${ico("play")}</span><div class="check-body"><b>Bắt đầu và nghe audio</b><small>Audio phát trong trình phát phía trên danh sách câu hỏi.</small></div></div>
          <div class="check-row"><span class="check-ico">${ico("pencil")}</span><div class="check-body"><b>Chọn đáp án cho 5 câu</b><small>Có thể nghe lại, tua và đổi tốc độ trong lúc luyện.</small></div></div>
          <div class="check-row"><span class="check-ico">${ico("clipboard")}</span><div class="check-body"><b>Nộp bài trước khi hết 10 phút</b><small>Hết giờ hệ thống tự nộp và mở transcript.</small></div></div>
        </div>
        <div class="row wrap mt-3">
          <button class="btn primary lg" data-action="start-listening">${ico("headphones")} Bắt đầu luyện nghe</button>
          ${last ? `<span class="pill">${ico("trophy")} Kỷ lục: ${last}/5</span>` : ""}
        </div>
      </section>
    </div>

    <aside class="listen-aside">
      ${listenTranscriptLockedHTML()}
      <div class="panel pad">
        <div class="panel-title">${ico("target")} Mục tiêu</div>
        <p class="panel-sub mt-1">Đạt ít nhất 4/5 câu đúng. Chú ý các từ khóa về tuổi, giấy tờ, hôn nhân và thông tin cá nhân.</p>
        <div class="mt-2">${progressHTML(last ? last * 20 : 0, "jade")}</div>
        <div class="row between mt-1"><small class="muted">Kỷ lục hiện tại</small><b>${last}/5</b></div>
      </div>
      <div class="tip-card">
        <span class="tip-ico">${ico("info")}</span>
        <div><b>Mẹo nghe</b><p>Đọc nhanh câu hỏi trước, gạch chân từ khóa. Với câu hỏi về tuổi, phân biệt 實歲 và 虛歲.</p></div>
      </div>
    </aside>
  </div>`;
}

function listenActiveHTML() {
  const submitted = !!APP.listen?.submitted;
  const qs = listenQuestions();
  const left = listenTimeLeft();
  const answered = Object.keys(APP.listen.answers || {}).length;
  const score = submitted ? qs.reduce((n, q) => n + (APP.listen.answers[q.n] === q.answer ? 1 : 0), 0) : 0;
  return `<div class="listen-layout">
    <div class="listen-main">
      <div class="listen-timerbar">
        <span class="lt-label">Thời gian còn lại</span>
        <span class="lt-timer ${left <= 60 ? "danger" : left <= 180 ? "warn" : ""}" id="listen-timer">${formatClock(left)}</span>
        <div class="lt-progress" id="listen-timer-progress">${progressHTML((left / EXAM_META.listeningDuration) * 100, left <= 60 ? "rose" : "jade")}</div>
        ${submitted ? `<button class="btn secondary sm" data-action="retry-listening">${ico("refresh")} Luyện lại</button>` : `<button class="btn primary sm" data-action="submit-listening">${ico("check-circle")} Nộp bài</button>`}
      </div>

      <section class="listen-hero">
        <span class="eyebrow">Đang luyện nghe · Unit 1-1</span>
        <h2 class="mt-1">${submitted ? "Kết quả luyện nghe" : "Nghe và chọn đáp án"}</h2>
        <p>${submitted ? "Transcript và giải thích đã được mở. Đọc lại từng đoạn và nghe lại các chỗ bạn bỏ lỡ." : "Audio gốc 01-1.mp3 · 5 hội thoại. Bạn có thể nghe lại và tua trong lúc luyện."}</p>
        <div class="listen-badges">
          <span class="badge ${submitted ? "jade" : "sky"}" id="listen-answered-badge">${ico("check-circle")} ${answered}/5 câu đã chọn</span>
          <span class="badge">${ico("clock")} ${formatClock(left)} còn lại</span>
          <span class="badge ${submitted ? "jade" : "amber"}">${ico(submitted ? "unlock" : "lock")} ${submitted ? "Transcript đã mở" : "Transcript đang khóa"}</span>
        </div>
      </section>

      ${submitted ? listenResultHTML(score, 5) : ""}

      ${audioPlayerHTML({ src: EXAM_META.audio, title: "Unit 1-1 · 01-1.mp3", sub: "Audio gốc · 5 hội thoại" })}

      <div class="listen-question-list">${qs.map((q) => listenQuestionHTML(q, submitted)).join("")}</div>

      ${submitted ? `<div class="row between">
        <button class="btn secondary" data-action="retry-listening">${ico("refresh")} Luyện lại</button>
        <a class="btn primary" href="#/lesson/1-1/test">${ico("clipboard")} Vào bài kiểm tra</a>
      </div>` : `<div class="row between">
        <span class="muted" style="font-size:12px" id="listen-answered-note">${answered < 5 ? `Còn ${5 - answered} câu chưa chọn.` : "Đã chọn đủ 5 câu."}</span>
        <button class="btn primary" data-action="submit-listening">${ico("check-circle")} Nộp bài nghe</button>
      </div>`}
    </div>

    <aside class="listen-aside">
      ${submitted ? transcriptHTML() : listenTranscriptLockedHTML()}
      <div class="panel pad">
        <div class="panel-title">${ico("target")} Tiến độ</div>
        <div class="row between mt-1"><span class="muted" style="font-size:12px">Đã chọn</span><b>${answered}/5</b></div>
        ${progressHTML((answered / 5) * 100)}
        <div class="row between mt-2"><span class="muted" style="font-size:12px">Kỷ lục</span><b>${state.listenBest}/5</b></div>
        <div class="audio-mini-note mt-2">${ico("alert")} <span>Không mở transcript trước khi nộp. Hệ thống tự nộp khi hết 10 phút.</span></div>
      </div>
    </aside>
  </div>`;
}

function listeningHTML() {
  if (!APP.listen) return listenIntroHTML();
  return listenActiveHTML();
}

/* ------------------------------------------------------------------ */
/* Test tab                                                            */
/* ------------------------------------------------------------------ */
function lockScreenHTML() {
  const core = coreLearned();
  const coreDone = core === 25;
  const quizDone = state.quizPassed;
  const unlocked = isTestUnlocked();
  return `<div class="lock-screen">
    <div class="lock-seal">${ico(unlocked ? "unlock" : "lock")}</div>
    <h2>${unlocked ? "Bài kiểm tra đã mở khóa" : "Bài kiểm tra đang được khóa"}</h2>
    <p>${unlocked ? "Bạn đã hoàn thành điều kiện. Sẵn sàng làm 30 câu trong 30 phút?" : "Hoàn thành 25 từ cốt lõi và quiz từ vựng ≥ 8/10 để mở khóa đề thi thật của Unit 1-1."}</p>
    <div class="lock-checklist">
      <div class="lock-check ${coreDone ? "done" : ""}">
        <span class="lc-ico">${ico(coreDone ? "check" : "book-open")}</span>
        <div class="lc-body"><b>Học 25 từ cốt lõi</b><small>Mỗi từ có nghĩa, nét viết và ví dụ</small></div>
        <span class="lc-val">${core}/25</span>
        <div class="lc-bar">${progressHTML(pct(core, 25), coreDone ? "jade" : "")}</div>
      </div>
      <div class="lock-check ${quizDone ? "done" : ""}">
        <span class="lc-ico">${ico(quizDone ? "check" : "zap")}</span>
        <div class="lc-body"><b>Quiz từ vựng ≥ 8/10</b><small>Kỷ lục hiện tại: ${state.quizBest}/10</small></div>
        <span class="lc-val">${quizDone ? "Đạt" : "Chưa"}</span>
        <div class="lc-bar">${progressHTML(pct(state.quizBest, 10), quizDone ? "jade" : "amber")}</div>
      </div>
      <div class="lock-check ${unlocked ? "done" : ""}">
        <span class="lc-ico">${ico(unlocked ? "unlock" : "lock")}</span>
        <div class="lc-body"><b>Mở khóa bài kiểm tra</b><small>30 câu · 30 phút · chấm tự động</small></div>
        <span class="lc-val">${unlocked ? "Sẵn sàng" : "Đang khóa"}</span>
      </div>
    </div>
    <div class="lock-actions">
      ${!coreDone ? `<a class="btn primary" href="#/lesson/1-1/vocab">${ico("layers")} Ôn 25 từ cốt lõi</a>` : !quizDone ? `<button class="btn primary pulse" data-action="open-quiz">${ico("zap")} Làm quiz mở khóa</button>` : `<button class="btn primary" data-action="start-exam">${ico("clipboard")} Bắt đầu bài kiểm tra</button>`}
      <a class="btn secondary" href="#/lesson/1-1/vocab">${ico("book-open")} Xem lại từ vựng</a>
    </div>
    <div class="lock-note">${ico("lock")} <span>Transcript, đáp án và giải thích chỉ được hiển thị sau khi nộp bài hoặc hết giờ.</span></div>
  </div>`;
}

function examIntroHTML() {
  const last = state.lastExam;
  return `<div class="exam-intro">
    <div class="exam-intro-head">
      <div>
        <span class="eyebrow">Bài kiểm tra thật · Unit 1-1</span>
        <h2 class="mt-1">30 câu · 30 phút</h2>
        <p class="exam-intro-sub">Toàn bộ câu hỏi và đáp án được biên soạn từ sách TOCFL Band B Level 4, trang 10–14. Audio gốc 01-1.mp3.</p>
        <div class="exam-intro-meta">
          <span class="badge sky">${ico("headphones")} 5 câu nghe</span>
          <span class="badge">${ico("pencil")} 8 câu điền từ</span>
          <span class="badge">${ico("file-text")} 10 câu cloze</span>
          <span class="badge">${ico("mail")} 4 câu thiệp cưới</span>
          <span class="badge">${ico("book-open")} 3 câu đọc hiểu</span>
        </div>
      </div>
      <div class="row">${ringHTML(state.examBest ? pct(state.examBest, 30) : 0, "lg")}</div>
    </div>
    <div class="exam-sections">
      ${EXAM_SECTIONS.map((s) => `<div class="exam-section-card">
        <span class="es-no">PHẦN ${esc(s.no)}</span>
        <b>${esc(s.zh)}</b>
        <small>${esc(s.vi)}</small>
        <span class="es-count">${s.to - s.from + 1} câu</span>
      </div>`).join("")}
    </div>
    <div class="exam-intro-actions">
      <button class="btn primary lg" data-action="start-exam">${ico("clipboard")} Bắt đầu làm bài</button>
      <a class="btn secondary lg" href="#/lesson/1-1/listening">${ico("headphones")} Luyện nghe trước</a>
      ${last ? `<button class="btn ghost" data-action="view-last-result">${ico("chart")} Xem kết quả gần nhất</button>` : ""}
    </div>
    ${last ? `<div class="exam-last-result">
      <span class="elr-score">${last.correct}<small>/${last.total}</small></span>
      <div class="elr-body"><b>Lần làm gần nhất · ${last.score}%</b><small>${formatDateTime(last.at)} · ${formatStudyTime(last.duration || 0)}</small></div>
      <button class="btn sm secondary" data-action="view-last-result">${ico("eye")} Xem lại</button>
    </div>` : ""}
    <div class="exam-intro-note">${ico("alert")} <span>Bài làm được tính giờ 30 phút. Transcript, đáp án và giải thích chỉ mở sau khi nộp hoặc hết giờ. Bạn có thể đánh dấu câu để xem lại.</span></div>
  </div>`;
}

function testHTML() {
  if (!isTestUnlocked()) return lockScreenHTML();
  return `<div class="stack">${examIntroHTML()}</div>`;
}

/* ------------------------------------------------------------------ */
/* Vocabulary drawer                                                   */
/* ------------------------------------------------------------------ */
function openWordDrawer(zh) {
  const word = VOCAB.find((w) => w.zh === zh);
  if (!word) return;
  APP.drawerZh = zh;
  closeDrawer();
  const learned = state.learned.includes(zh);
  const chars = Array.from(word.zh);
  const idx = VOCAB.findIndex((w) => w.zh === zh);
  const prev = VOCAB[(idx - 1 + VOCAB.length) % VOCAB.length];
  const next = VOCAB[(idx + 1) % VOCAB.length];
  const wrap = document.createElement("div");
  wrap.className = "drawer";
  wrap.dataset.drawer = "1";
  wrap.innerHTML = `<div class="drawer-panel" role="dialog" aria-modal="true" aria-label="${esc(word.zh)}">
    <div class="drawer-head">
      <div><div class="drawer-kicker">Từ vựng · Unit 1-1</div><div class="drawer-title">${word.core ? "Từ cốt lõi" : "Từ mở rộng"} · ${idx + 1}/50</div></div>
      <div class="drawer-actions">
        <button class="icon-btn" data-action="speak" data-text="${esc(word.zh)}" data-tip="Nghe">${ico("volume")}</button>
        <button class="icon-btn" data-action="close-drawer" aria-label="Đóng">${ico("x")}</button>
      </div>
    </div>
    <div class="drawer-body">
      <div class="drawer-word-hero">
        <div class="dwh-main">
          <div class="dwh-zh">${esc(word.zh)}</div>
          <div class="dwh-py">${esc(word.py)}</div>
          <div class="dwh-vi">${esc(word.vi)}</div>
          <span class="badge ${word.core ? "sky" : "ghost"} dwh-pos">${esc(word.pos)} · ${word.core ? "cốt lõi" : "mở rộng"}</span>
        </div>
        <div class="dwh-audio"><button class="audio-play" data-action="speak" data-text="${esc(word.zh)}" aria-label="Nghe từ">${ico("volume")}</button></div>
      </div>

      <div class="drawer-section">
        <div class="ds-label">${ico("pen")} Luyện viết · ${chars.length} chữ</div>
        <div class="char-strip">${chars.map((ch) => {
          const strokes = HANZI_DATA?.[ch]?.strokes?.length || 0;
          const done = state.written[ch] > 0;
          return `<button class="char-tile ${done ? "done" : ""}" data-action="open-writing" data-zh="${esc(word.zh)}" data-char="${esc(ch)}">
            <span class="ct-zh">${esc(ch)}</span><span class="ct-strokes">${done ? "đã viết" : strokes + " nét"}</span>
          </button>`;
        }).join("")}</div>
      </div>

      <div class="drawer-section">
        <div class="ds-label">${ico("info")} Ghi chú</div>
        <div class="drawer-note">${esc(word.note)}</div>
      </div>

      <div class="drawer-section">
        <div class="ds-label">${ico("layers")} Cụm từ thường gặp</div>
        <div class="colloc-chips">${(word.colloc || []).map((c) => `<span class="colloc-chip">${esc(c)}</span>`).join("")}</div>
      </div>

      <div class="drawer-section">
        <div class="ds-label">${ico("book-open")} Ví dụ</div>
        <div class="examples">${word.ex.map((e) => `<div class="example">
          <div class="ex-top">
            <div class="grow"><div class="ex-zh">${esc(e.zh)}</div><div class="ex-py">${esc(e.py)}</div><div class="ex-vi">${esc(e.vi)}</div></div>
            <button class="ex-audio" data-action="speak" data-text="${esc(e.zh)}" aria-label="Nghe ví dụ">${ico("volume")}</button>
          </div>
        </div>`).join("")}</div>
      </div>
    </div>
    <div class="drawer-foot">
      <button class="btn ${learned ? "learned" : "primary"}" data-action="mark-learned" data-zh="${esc(word.zh)}">${ico(learned ? "check-circle" : "check")} ${learned ? "Đã học" : "Đánh dấu đã học"}</button>
      <div class="drawer-nav">
        <button class="icon-btn" data-action="open-word" data-zh="${esc(prev.zh)}" aria-label="Từ trước">${ico("chevron-left")}</button>
        <button class="icon-btn" data-action="open-word" data-zh="${esc(next.zh)}" aria-label="Từ tiếp">${ico("chevron-right")}</button>
      </div>
    </div>
  </div>`;
  wrap.addEventListener("click", (e) => { if (e.target === wrap) closeDrawer(); });
  $("#layers").appendChild(wrap);
}

function closeDrawer() {
  $$("[data-drawer]").forEach((el) => el.remove());
  APP.drawerZh = null;
}

/* ------------------------------------------------------------------ */
/* Search modal                                                        */
/* ------------------------------------------------------------------ */
function searchResultsHTML() {
  const q = APP.search.query.trim().toLowerCase();
  let results;
  if (!q) {
    const all = getSearchIndex();
    results = [
      ...all.filter((i) => i.type === "Bài học" || i.type === "Trang").slice(0, 6),
      ...all.filter((i) => i.type === "Từ vựng" && VOCAB.find((w) => w.zh === i.go.zh)?.core).slice(0, 4)
    ];
  } else {
    results = getSearchIndex().filter((i) => `${i.title} ${i.sub} ${i.keywords}`.toLowerCase().includes(q)).slice(0, 24);
  }
  APP.search.results = results;
  if (APP.search.active >= results.length) APP.search.active = 0;
  if (!results.length) {
    return `<div class="search-empty">${ico("search")}<div>Không tìm thấy “${esc(APP.search.query)}”.</div><div style="margin-top:4px">Thử “年齡”, “婚姻”, “thư pháp” hoặc “thi”.</div></div>`;
  }
  let html = "";
  let lastType = "";
  results.forEach((item, i) => {
    if (item.type !== lastType) {
      html += `<div class="search-group-label">${esc(item.type)}</div>`;
      lastType = item.type;
    }
    html += `<button class="search-item ${i === APP.search.active ? "active" : ""}" data-action="search-go" data-index="${i}">
      <span class="si-ico ${item.type === "Từ vựng" || item.type === "Cụm từ" ? "zh" : ""}">${item.type === "Từ vựng" || item.type === "Cụm từ" ? esc(item.icon) : ico(item.icon)}</span>
      <span class="si-body"><b>${esc(item.title)}</b><small>${esc(item.sub)}</small></span>
      <span class="si-type">${esc(item.type)}</span>
    </button>`;
  });
  return html;
}

function renderSearch() {
  const box = $("#search-results");
  if (!box) return;
  box.innerHTML = searchResultsHTML();
}

function openSearch() {
  if (document.querySelector("[data-search]")) return;
  APP.search = { open: true, query: "", results: [], active: 0 };
  const wrap = document.createElement("div");
  wrap.className = "search-modal";
  wrap.dataset.search = "1";
  wrap.innerHTML = `<div class="search-panel" role="dialog" aria-modal="true" aria-label="Tìm kiếm">
    <div class="search-input-wrap">
      ${ico("search")}
      <input class="search-input" id="search-input" type="text" placeholder="Tìm từ vựng, bài học, cụm từ…" autocomplete="off" spellcheck="false">
      <kbd>ESC</kbd>
    </div>
    <div class="search-results" id="search-results"></div>
    <div class="search-foot">
      <span><kbd>↑</kbd><kbd>↓</kbd> di chuyển</span>
      <span><kbd>↵</kbd> chọn</span>
      <span><kbd>ESC</kbd> đóng</span>
      <span style="margin-left:auto">${VOCAB.length} từ · ${COURSE.totalUnits} unit</span>
    </div>
  </div>`;
  wrap.addEventListener("click", (e) => { if (e.target === wrap) closeSearch(); });
  $("#layers").appendChild(wrap);
  renderSearch();
  setTimeout(() => $("#search-input")?.focus(), 30);
}

function closeSearch() {
  $$("[data-search]").forEach((el) => el.remove());
  APP.search.open = false;
}

function selectSearchResult(index) {
  const item = APP.search.results[index];
  if (!item) return;
  closeSearch();
  if (item.go.type === "word") {
    if (APP.route.name === "lesson") openWordDrawer(item.go.zh);
    else {
      APP.pendingWord = item.go.zh;
      navigate("/lesson/1-1/vocab");
    }
  } else if (item.go.type === "route") {
    navigate(item.go.path);
  } else if (item.go.type === "phrase") {
    const p = PHRASES.find((x) => x.zh === item.go.phrase);
    if (p) openPhraseModal(p);
  }
}

function openPhraseModal(p) {
  openModal({
    title: p.zh,
    subtitle: `${p.py} · ${p.vi}`,
    iconName: "sparkles",
    body: `<div class="drawer-note" style="font-size:14px">${esc(p.ex.zh)}</div>
      <div class="mt-2" style="font-size:12px;color:var(--muted)">${esc(p.ex.py)}</div>
      <div class="mt-1" style="font-size:12.5px;color:var(--ink-2)">${esc(p.ex.vi)}</div>`,
    footer: `<button class="btn secondary" data-action="speak" data-text="${esc(p.ex.zh)}">${ico("volume")} Nghe ví dụ</button><button class="btn primary" data-action="close-modal">Đóng</button>`
  });
}

/* ------------------------------------------------------------------ */
/* Shortcuts                                                           */
/* ------------------------------------------------------------------ */
function openShortcuts() {
  openModal({
    title: "Phím tắt",
    subtitle: "Điều hướng nhanh hơn",
    iconName: "keyboard",
    body: `<div class="confirm-list">
      <div class="confirm-row"><span>Tìm kiếm</span><b>⌘K / Ctrl K</b></div>
      <div class="confirm-row"><span>Đóng lớp đang mở</span><b>Esc</b></div>
      <div class="confirm-row"><span>Câu trước / sau (bài thi)</span><b>← →</b></div>
      <div class="confirm-row"><span>Chọn đáp án A–D</span><b>1 2 3 4</b></div>
      <div class="confirm-row"><span>Đổi sáng / tối</span><b>T</b></div>
      <div class="confirm-row"><span>Mở tìm kiếm nhanh</span><b>/</b></div>
    </div>`,
    footer: `<button class="btn primary" data-action="close-modal">Đã hiểu</button>`
  });
}
