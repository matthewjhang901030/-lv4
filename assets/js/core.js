/* ============================================================
   Argon · 墨語 — Core: state, icons, helpers, audio, search, fx
   ============================================================ */

const STORAGE_KEY = "argon.tocfl.v1";
const EXAM_SESSION_KEY = "argon.tocfl.exam-session.v1";
const DAY_MS = 86400000;

const DEFAULT_STATE = {
  theme: "light",
  learned: [],
  written: {},
  quizPassed: false,
  quizBest: 0,
  listenBest: 0,
  listenHistory: [],
  examBest: 0,
  examHistory: [],
  lastExam: null,
  studyDays: [],
  stats: { seconds: 0 },
  daily: { date: "", seconds: 0, words: 0, writing: 0, listen: 0, exam: 0 },
  activity: []
};

let state = loadState();
const APP = {
  route: { name: "dashboard", path: "/" },
  vocabFilter: "all",
  vocabQuery: "",
  writingZh: null,
  writingChar: null,
  writingQuery: "",
  writingWriter: null,
  writingMode: "animate",
  drawerZh: null,
  pendingWord: null,
  listen: null,
  listenTimer: null,
  exam: null,
  examTimer: null,
  quiz: null,
  search: { open: false, query: "", results: [], active: 0 },
  results: null,
  resultsTab: "overview",
  resultsFilter: "all",
  sidebarOpen: false
};

/* ------------------------------------------------------------------ */
/* Icons (Lucide-style inline SVG)                                     */
/* ------------------------------------------------------------------ */
const ICONS = {
  home: '<path d="M3 10.2 12 3l9 7.2V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V9a4 4 0 0 1 4-4h5"/><path d="m12 2 3 3-3 3"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  "book-open": '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  pencil: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v3"/><path d="M12 10v8"/><path d="M17 6v12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-up": '<path d="m18 15-6-6-6 6"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  "x-circle": '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
  play: '<polygon points="7 4 20 12 7 20" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  sparkles: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="m5 14 .7 1.8L7.5 16l-1.8.7L5 18.5l-.7-1.8L2.5 16l1.8-.7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.3-1.7 8L12 19l5.5 2.3-1.7-8"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 9h6M9 13h6M9 17h4"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  zap: '<path d="M13 2 3 14h8l-1 8 10-12h-8z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  "eye-off": '<path d="m3 3 18 18"/><path d="M10.6 6.2A10.9 10.9 0 0 1 12 6c6.5 0 10 6 10 6a17.7 17.7 0 0 1-3.3 4.1"/><path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.4-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  flag: '<path d="M4 22V4c4-2 8 2 12 0v10c-4 2-8-2-12 0"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
  "mouse-pointer": '<path d="m4 4 7.5 17 2.2-6.3L20 12.5z"/>',
  "refresh": '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  "external": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
  "arrow-up": '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  "minus": '<path d="M5 12h14"/>',
  "plus": '<path d="M12 5v14M5 12h14"/>',
  "coffee": '<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
  "graduation": '<path d="m22 9-10-5L2 9l10 5z"/><path d="M6 11.5V16c3 2 9 2 12 0v-4.5"/><path d="M22 9v6"/>',
  "star": '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  "circle-dot": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>'
};

function ico(name, cls = "ico") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
}

/* ------------------------------------------------------------------ */
/* Generic helpers                                                     */
/* ------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

function pad2(n) { return String(n).padStart(2, "0"); }

function todayISO(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function dateOffsetISO(offset) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return todayISO(d);
}

function formatClock(seconds) {
  const s = Math.max(0, Math.round(Number(seconds) || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(sec)}` : `${pad2(m)}:${pad2(sec)}`;
}

function formatStudyTime(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  if (s < 60) return `${Math.round(s)} giây`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} phút`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h}h ${rest}m` : `${h} giờ`;
}

function formatDate(ts) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ts));
}

function formatDateTime(ts) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(ts));
}

function relativeTime(ts) {
  const diff = Date.now() - Number(ts || 0);
  if (diff < 60000) return "vừa xong";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
  if (diff < DAY_MS) return `${Math.floor(diff / 3600000)} giờ trước`;
  if (diff < 7 * DAY_MS) return `${Math.floor(diff / DAY_MS)} ngày trước`;
  return formatDate(ts);
}

function todayLabel() {
  const label = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "long" }).format(new Date());
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Chào buổi sáng";
  if (h < 14) return "Chào buổi trưa";
  if (h < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function debounce(fn, wait = 200) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function pct(n, d) { return d > 0 ? Math.round((n / d) * 100) : 0; }

/* ------------------------------------------------------------------ */
/* State & progress                                                    */
/* ------------------------------------------------------------------ */
function loadState() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { raw = null; }
  // Clone defaults so in-place edits (written, activity, studyDays…) never leak into DEFAULT_STATE.
  const base = JSON.parse(JSON.stringify(DEFAULT_STATE));
  const merged = {
    ...base,
    ...(raw || {}),
    stats: { ...base.stats, ...(raw?.stats || {}) },
    daily: { ...base.daily, ...(raw?.daily || {}) }
  };
  merged.learned = Array.isArray(merged.learned) ? merged.learned : [];
  merged.studyDays = Array.isArray(merged.studyDays) ? merged.studyDays : [];
  merged.listenHistory = Array.isArray(merged.listenHistory) ? merged.listenHistory : [];
  merged.examHistory = Array.isArray(merged.examHistory) ? merged.examHistory : [];
  merged.activity = Array.isArray(merged.activity) ? merged.activity : [];
  merged.written = merged.written && typeof merged.written === "object" ? merged.written : {};
  merged.theme = merged.theme === "dark" ? "dark" : "light";
  return merged;
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage may be full */ }
}

function ensureDaily() {
  const t = todayISO();
  if (state.daily.date !== t) {
    state.daily = { date: t, seconds: 0, words: 0, writing: 0, listen: 0, exam: 0 };
  }
}

function touchStudyDay() {
  const t = todayISO();
  if (!state.studyDays.includes(t)) {
    state.studyDays.push(t);
    state.studyDays = state.studyDays.slice(-120);
  }
}

function studyStreak() {
  const set = new Set(state.studyDays);
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  if (!set.has(todayISO(d))) d.setDate(d.getDate() - 1);
  let count = 0;
  while (set.has(todayISO(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const iso = dateOffsetISO(i - 6);
    const date = new Date(iso + "T12:00:00");
    return {
      iso,
      label: new Intl.DateTimeFormat("vi-VN", { weekday: "short" }).format(date),
      on: state.studyDays.includes(iso)
    };
  });
}

function coreWords() { return VOCAB.filter((w) => w.core); }
function extWords() { return VOCAB.filter((w) => !w.core); }
function coreLearned() { return coreWords().filter((w) => state.learned.includes(w.zh)).length; }
function extLearned() { return extWords().filter((w) => state.learned.includes(w.zh)).length; }
function learnedCount() { return VOCAB.filter((w) => state.learned.includes(w.zh)).length; }
function isTestUnlocked() { return coreLearned() === coreWords().length && !!state.quizPassed; }

function writtenChars() {
  const chars = new Set();
  VOCAB.forEach((w) => Array.from(w.zh).forEach((ch) => { if (state.written[ch] > 0) chars.add(ch); }));
  return chars.size;
}

function lessonProgress() {
  const core = coreLearned() / Math.max(1, coreWords().length);
  const write = Math.min(1, writtenChars() / 12);
  const listen = state.listenBest > 0 ? state.listenBest / 5 : 0;
  const quiz = state.quizPassed ? 1 : Math.min(1, state.quizBest / 10) * 0.6;
  const exam = state.examBest > 0 ? state.examBest / 30 : 0;
  return Math.round(core * 48 + write * 12 + listen * 15 + quiz * 10 + exam * 15);
}

function wordOfDay() {
  const list = coreWords();
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / DAY_MS);
  return list[day % list.length];
}

function recordActivity(type, title, detail) {
  ensureDaily();
  touchStudyDay();
  state.activity.unshift({ type, title, detail, at: Date.now() });
  state.activity = state.activity.slice(0, 40);
  saveState();
}

function addStudyTime(seconds) {
  ensureDaily();
  touchStudyDay();
  state.daily.seconds += seconds;
  state.stats.seconds += seconds;
  saveState();
}

function toggleLearned(zh, force) {
  const word = VOCAB.find((w) => w.zh === zh);
  if (!word) return;
  ensureDaily();
  const has = state.learned.includes(zh);
  const learn = typeof force === "boolean" ? force : !has;
  if (learn && !has) {
    state.learned.push(zh);
    state.daily.words += 1;
    touchStudyDay();
    recordActivity("word", "Đã học từ mới", `${word.zh} · ${word.vi}`);
    toast(`Đã đánh dấu “${word.zh}” là đã học`, "jade");
    if (word.core && coreLearned() === coreWords().length && !state.quizPassed) {
      setTimeout(() => toast("Đủ 25 từ cốt lõi! Làm quiz từ vựng để mở khóa bài thi.", "amber"), 700);
    }
  } else if (!learn && has) {
    state.learned = state.learned.filter((x) => x !== zh);
    toast(`Đã bỏ đánh dấu “${word.zh}”`, "");
  }
  saveState();
}

function markCharWritten(char) {
  ensureDaily();
  state.written[char] = (state.written[char] || 0) + 1;
  state.daily.writing += 1;
  touchStudyDay();
  recordActivity("writing", "Hoàn thành một chữ Hán", `${char} · viết đúng nét`);
  saveState();
}

function recordListening(score, total) {
  ensureDaily();
  state.listenBest = Math.max(state.listenBest, score);
  state.listenHistory.unshift({ at: Date.now(), score, total });
  state.listenHistory = state.listenHistory.slice(0, 20);
  state.daily.listen += 1;
  touchStudyDay();
  recordActivity("listen", "Hoàn thành luyện nghe", `Đúng ${score}/${total} câu`);
  saveState();
}

function recordExam(result) {
  ensureDaily();
  state.examBest = Math.max(state.examBest, result.correct);
  state.examHistory.unshift({
    at: result.at,
    correct: result.correct,
    total: result.total,
    score: result.score,
    duration: result.duration
  });
  state.examHistory = state.examHistory.slice(0, 15);
  state.lastExam = result;
  state.daily.exam += 1;
  touchStudyDay();
  recordActivity("exam", "Hoàn thành bài kiểm tra", `${result.correct}/${result.total} câu đúng · ${result.score}%`);
  saveState();
}

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */
function applyTheme(theme, persist = true) {
  const next = theme === "dark" ? "dark" : "light";
  state.theme = next;
  document.documentElement.setAttribute("data-theme", next);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#06121d" : "#f5f9fc");
  $$("[data-theme-switch]").forEach((el) => el.setAttribute("aria-checked", String(next === "dark")));
  if (persist) saveState();
  if (window.ArgonScene?.refresh) window.ArgonScene.refresh();
}

function toggleTheme() {
  applyTheme(state.theme === "dark" ? "light" : "dark");
}

/* ------------------------------------------------------------------ */
/* Toasts, modal, confetti                                             */
/* ------------------------------------------------------------------ */
function toast(message, tone = "", iconName) {
  const root = $("#toast-root");
  if (!root) return;
  const el = document.createElement("div");
  el.className = `toast ${tone}`.trim();
  el.innerHTML = `${ico(iconName || (tone === "rose" ? "alert" : tone === "jade" ? "check-circle" : "info"))}<span>${esc(message)}</span>`;
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 280);
  }, 3400);
}

function closeModal() {
  $$("[data-modal]").forEach((el) => el.remove());
}

function openModal({ title, subtitle = "", iconName = "info", body = "", footer = "", size = "", actions = true }) {
  closeModal();
  const wrap = document.createElement("div");
  wrap.className = "modal";
  wrap.dataset.modal = "1";
  wrap.innerHTML = `
    <div class="modal-panel ${size}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head">
        <div class="modal-ico">${ico(iconName)}</div>
        <div><h3>${esc(title)}</h3>${subtitle ? `<small>${esc(subtitle)}</small>` : ""}</div>
        ${actions ? `<button class="icon-btn" data-action="close-modal" aria-label="Đóng">${ico("x")}</button>` : ""}
      </div>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-foot">${footer}</div>` : ""}
    </div>`;
  wrap.addEventListener("click", (e) => { if (e.target === wrap) closeModal(); });
  $("#layers").appendChild(wrap);
  return wrap;
}

function confirmModal({ title, subtitle, iconName = "alert", body, confirmLabel = "Xác nhận", confirmAction, danger = false, extra = "" }) {
  return openModal({
    title, subtitle, iconName,
    body,
    footer: `
      <button class="btn ghost" data-action="close-modal">Hủy</button>
      ${extra}
      <button class="btn ${danger ? "danger" : "primary"}" data-action="${confirmAction}">${esc(confirmLabel)}</button>`
  });
}

function burstConfetti() {
  const canvas = $("#confetti");
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ["#0284c7", "#38bdf8", "#0f766e", "#2dd4bf", "#fbbf24", "#fb7185", "#c4b5fd"];
  const parts = Array.from({ length: 150 }, () => ({
    x: w / 2 + (Math.random() - 0.5) * 240,
    y: h * 0.32 + (Math.random() - 0.5) * 80,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 11 - 3,
    size: 4 + Math.random() * 7,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0.7 + Math.random() * 0.5
  }));
  const start = performance.now();
  const tick = (now) => {
    const elapsed = (now - start) / 1000;
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p) => {
      p.vy += 0.26;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (elapsed > p.life) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / 2.4);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (elapsed < 2.5) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, w, h);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ */
/* Progress ring helpers                                               */
/* ------------------------------------------------------------------ */
function ringHTML(value, cls = "", val = null) {
  const p = clamp(Number(value) || 0, 0, 100);
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c * (1 - p / 100);
  return `<div class="ring ${cls}">
    <svg viewBox="0 0 62 62" aria-hidden="true">
      <circle class="track" cx="31" cy="31" r="${r}"></circle>
      <circle class="fill" cx="31" cy="31" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"></circle>
    </svg>
    <span class="val">${val == null ? p + "%" : val}</span>
  </div>`;
}

function progressHTML(value, cls = "") {
  return `<div class="progress ${cls}"><i style="width:${clamp(Number(value) || 0, 0, 100)}%"></i></div>`;
}

function scoreRingHTML(value, total, label = "điểm") {
  const p = clamp((value / Math.max(1, total)) * 100, 0, 100);
  const r = 52;
  const c = 2 * Math.PI * r;
  return `<div class="results-score-ring">
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle class="track" cx="60" cy="60" r="${r}"></circle>
      <circle class="fill" cx="60" cy="60" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - p / 100)).toFixed(1)}"></circle>
    </svg>
    <span class="val">${value}<small>/${total} ${label}</small></span>
  </div>`;
}

/* ------------------------------------------------------------------ */
/* Text to speech                                                      */
/* ------------------------------------------------------------------ */
let ttsVoice = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => /^zh[-_]TW/i.test(v.lang)) ||
    voices.find((v) => /^zh[-_]/i.test(v.lang)) ||
    voices.find((v) => /chinese|中文|國語/i.test(v.name + " " + v.lang)) || null;
}
if ("speechSynthesis" in window) {
  ttsVoice = pickVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", () => { ttsVoice = pickVoice(); });
}
function speak(text) {
  if (!("speechSynthesis" in window)) {
    toast("Trình duyệt này không hỗ trợ đọc tiếng Trung.", "rose");
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-TW";
  u.rate = 0.82;
  u.pitch = 1;
  if (!ttsVoice) ttsVoice = pickVoice();
  if (ttsVoice) u.voice = ttsVoice;
  window.speechSynthesis.speak(u);
}

/* ------------------------------------------------------------------ */
/* Audio player                                                        */
/* ------------------------------------------------------------------ */
let audioInstances = [];
let activeAudio = null;
const AUDIO_POS = {};

function waveHTML() {
  return Array.from({ length: 42 }, (_, i) => {
    const h = 22 + Math.round(Math.abs(Math.sin(i * 0.73)) * 66) + (i % 5) * 2;
    return `<i style="--h:${h};--d:${i % 9}"></i>`;
  }).join("");
}

function audioPlayerHTML({ src, title, sub = "", compact = false }) {
  return `<div class="audio-card ${compact ? "compact" : ""}" data-audio-player data-src="${esc(src)}">
    <button class="audio-play" data-audio-toggle aria-label="Phát audio">${ico("play", "ico play-ico")}${ico("pause", "ico pause-ico")}</button>
    <div class="audio-main">
      <div class="audio-top">
        <span class="audio-title">${esc(title)}</span>
        <span class="audio-time" data-audio-time>00:00 / 00:00</span>
      </div>
      <div class="audio-wave" data-audio-wave aria-hidden="true">${waveHTML()}</div>
      <input class="audio-range" type="range" min="0" max="1000" value="0" step="1" aria-label="Tiến trình audio">
      ${sub ? `<div style="font-size:10px;color:var(--muted);margin-top:2px">${esc(sub)}</div>` : ""}
    </div>
    <div class="audio-tools">
      <button class="audio-skip" data-skip="-10" title="Lùi 10 giây">−10s</button>
      <button class="audio-skip" data-skip="10" title="Tới 10 giây">+10s</button>
      <select class="audio-speed" aria-label="Tốc độ phát">
        <option value="0.75">0.75×</option>
        <option value="1" selected>1×</option>
        <option value="1.25">1.25×</option>
        <option value="1.5">1.5×</option>
      </select>
    </div>
    <div class="audio-error">Không tải được audio. Hãy kiểm tra file <b>${esc(src)}</b>.</div>
  </div>`;
}

function mountAudioPlayers(root = document) {
  $$("[data-audio-player]", root).forEach((card) => {
    if (card.dataset.audioReady) return;
    card.dataset.audioReady = "1";
    const src = card.dataset.src;
    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = src;
    const playBtn = $("[data-audio-toggle]", card);
    const range = $(".audio-range", card);
    const time = $("[data-audio-time]", card);
    const wave = $("[data-audio-wave]", card);
    const bars = $$("i", wave);
    const speed = $(".audio-speed", card);
    const fmt = (n) => formatClock(n);
    let duration = 0;

    const renderTime = () => {
      duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(duration)}`;
      if (duration > 0) {
        range.value = String(Math.round((audio.currentTime / duration) * 1000));
        const ratio = audio.currentTime / duration;
        const lit = Math.round(ratio * bars.length);
        bars.forEach((b, i) => b.classList.toggle("on", i < lit));
      }
    };

    audio.addEventListener("loadedmetadata", () => {
      duration = audio.duration;
      if (AUDIO_POS[src] && AUDIO_POS[src] < audio.duration - 1) audio.currentTime = AUDIO_POS[src];
      renderTime();
    });
    audio.addEventListener("timeupdate", () => {
      AUDIO_POS[src] = audio.currentTime;
      renderTime();
    });
    audio.addEventListener("play", () => {
      card.classList.add("playing");
      playBtn.setAttribute("aria-label", "Tạm dừng audio");
      if (activeAudio && activeAudio !== audio) activeAudio.pause();
      activeAudio = audio;
    });
    audio.addEventListener("pause", () => {
      card.classList.remove("playing");
      playBtn.setAttribute("aria-label", "Phát audio");
    });
    audio.addEventListener("ended", () => {
      card.classList.remove("playing");
      AUDIO_POS[src] = 0;
    });
    audio.addEventListener("error", () => {
      card.classList.add("has-error");
    });

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => card.classList.add("has-error"));
      } else audio.pause();
    });
    range.addEventListener("input", () => {
      if (duration > 0) audio.currentTime = (Number(range.value) / 1000) * duration;
    });
    wave.addEventListener("click", (e) => {
      const rect = wave.getBoundingClientRect();
      if (rect.width && duration > 0) audio.currentTime = clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration;
    });
    $$("[data-skip]", card).forEach((btn) => {
      btn.addEventListener("click", () => {
        audio.currentTime = clamp(audio.currentTime + Number(btn.dataset.skip), 0, duration || 0);
      });
    });
    speed.addEventListener("change", () => { audio.playbackRate = Number(speed.value); });
    audioInstances.push(audio);
  });
}

function stopAllAudio() {
  // Never tear down the exam player while a test is still in progress.
  if (typeof APP !== "undefined" && APP.exam && !APP.exam.submitted) return;
  audioInstances.forEach((a) => { try { a.pause(); } catch { /* noop */ } });
  audioInstances = [];
  activeAudio = null;
}

/* ------------------------------------------------------------------ */
/* Search index                                                        */
/* ------------------------------------------------------------------ */
function searchIndex() {
  const items = [];
  VOCAB.forEach((w) => {
    items.push({
      type: "Từ vựng",
      icon: w.zh.slice(0, 1),
      title: `${w.zh} · ${w.py}`,
      sub: `${w.vi}${w.core ? " · cốt lõi" : " · mở rộng"}`,
      keywords: `${w.zh} ${w.py} ${w.vi} ${w.pos} ${(w.colloc || []).join(" ")} ${(w.ex || []).map((e) => e.zh + " " + e.vi).join(" ")}`,
      go: { type: "word", zh: w.zh }
    });
  });
  items.push(
    { type: "Trang", icon: "home", title: "Tổng quan", sub: "Bảng điều khiển học tập", keywords: "dashboard tổng quan home", go: { type: "route", path: "/" } },
    { type: "Trang", icon: "route", title: "Lộ trình 10 chủ đề", sub: "30 unit · TOCFL Band B", keywords: "course lộ trình khóa học chủ đề unit", go: { type: "route", path: "/course" } },
    { type: "Trang", icon: "chart", title: "Tiến độ học tập", sub: "Thống kê, lịch sử, thành tích", keywords: "progress tiến độ thống kê thành tích", go: { type: "route", path: "/progress" } },
    { type: "Bài học", icon: "book", title: "Unit 1-1 · 個人資料", sub: "Tổng quan bài học", keywords: "1-1 個人資料 thông tin cá nhân", go: { type: "route", path: "/lesson/1-1/overview" } },
    { type: "Bài học", icon: "layers", title: "Từ vựng Unit 1-1", sub: "50 từ · 25 cốt lõi", keywords: "vocab từ vựng 50", go: { type: "route", path: "/lesson/1-1/vocab" } },
    { type: "Bài học", icon: "pen", title: "Xưởng thư pháp", sub: "Luyện viết từng nét", keywords: "writing viết thư pháp nét bút", go: { type: "route", path: "/lesson/1-1/writing" } },
    { type: "Bài học", icon: "headphones", title: "Luyện nghe Unit 1-1", sub: "5 hội thoại · 10 phút", keywords: "listening nghe audio 01-1", go: { type: "route", path: "/lesson/1-1/listening" } },
    { type: "Bài học", icon: "clipboard", title: "Bài kiểm tra Unit 1-1", sub: "30 câu · 30 phút", keywords: "exam test thi kiểm tra 30 câu", go: { type: "route", path: "/lesson/1-1/test" } }
  );
  PHRASES.forEach((p) => {
    items.push({
      type: "Cụm từ",
      icon: p.zh.slice(0, 1),
      title: `${p.zh} · ${p.py}`,
      sub: p.vi,
      keywords: `${p.zh} ${p.py} ${p.vi} ${p.ex.zh} ${p.ex.vi}`,
      go: { type: "phrase", phrase: p.zh }
    });
  });
  return items;
}

let SEARCH_INDEX = null;
function getSearchIndex() {
  if (!SEARCH_INDEX) SEARCH_INDEX = searchIndex();
  return SEARCH_INDEX;
}

/* ------------------------------------------------------------------ */
/* Global clock                                                        */
/* ------------------------------------------------------------------ */
setInterval(() => {
  if (document.visibilityState === "visible") addStudyTime(30);
}, 30000);

window.addEventListener("beforeunload", saveState);
