"use strict";

/** วาง URL /exec จาก Deploy ของ Apps Script */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfvCXdieV_wEsn9RUH7icZpeyjSRuZ0AWHO0IUxrmNxkwnp4RE1V3fKA5WnOUo705Xpg/exec";

const appData = {
  currentQuestion: 0,
  answers: [],
  profile: { name: "", position: "", channel: "" },
  resultText: "",
  uuid: ""
};

const questions = [
  {
    chapter: "1.ความดี",
    question: "เมื่อถูกล็อตเตอรี่รางวัลที่ 1 สิ่งแรกที่คุณจะทำคือ?",
    options: [
      { text: "ใช้หนี้", score: 4 },
      { text: "ลงทุน", score: 3 },
      { text: "ให้ครอบครัว", score: 2 },
      { text: "ทำบุญ", score: 1 }
    ]
  },
  {
    chapter: "2.ความซื่อสัตย์",
    question: "คุณกำลังจะออกจากบ้านไปขึ้นเงินล็อตเตอรี่ แต่ดันเจอเงินแสนตกอยู่หน้าบ้าน คุณจะ?",
    options: [
      { text: "ตามหาเจ้าของเงิน", score: 4 },
      { text: "เอาเงินไปส่งให้ตำรวจ", score: 3 },
      { text: "เก็บไว้เองก่อน", score: 2 },
      { text: "เดินผ่านไป รีบไปขึ้นเงินล็อตเตอรี่", score: 1 }
    ]
  },
  {
    chapter: "3.ความมุ่งมั่น",
    question: "คุณนำเงินไปซื้อบ้านใหม่ให้ครอบครัว แต่คนในบ้านบ่นว่าดูแลยาก คุณจะ?",
    options: [
      { text: "จ้างคนมาช่วยดูแล", score: 3 },
      { text: "ปรับเปลี่ยนบ้านให้ตรงใจทุกคน", score: 4 },
      { text: "ขายบ้าน", score: 2 },
      { text: "ปล่อยไปตามสภาพ", score: 1 }
    ]
  },
  {
    chapter: "4.ความพยายาม",
    question: "คุณอยากให้ลูกเรียนโรงเรียนที่ดีขึ้น แต่พวกเขาปรับตัวไม่ได้ คุณจะ?",
    options: [
      { text: "สอนหนังสือให้เด็กๆเอง", score: 4 },
      { text: "หาครูพิเศษมาช่วยสอน", score: 3 },
      { text: "ให้ลองเรียนอีกเทอม", score: 2 },
      { text: "ปล่อยให้ช่วยเหลือตัวเอง", score: 1 }
    ]
  },
  {
    chapter: "5.ความเก่ง",
    question: "ญาติพี่น้องมาขอยืมเงินคุณจนเป็นปัญหาที่ส่งผลต่อความสัมพันธ์ คุณจะ?",
    options: [
      { text: "ให้ยืมครั้งสุดท้าย", score: 3 },
      { text: "ไม่ให้ยืม", score: 4 },
      { text: "ให้ยืมแต่ทำสัญญาเป็นลายลักษณ์อักษร", score: 2 },
      { text: "เลี่ยงการพบเจอ", score: 1 }
    ]
  },
  {
    chapter: "6.ความขยัน",
    question: "เมื่อคุณประสบความสำเร็จในธุรกิจจนรวยมากแล้ว คุณจะ?",
    options: [
      { text: "หาธุรกิจใหม่ทำ", score: 4 },
      { text: "อยู่ดูแลธุรกิจ", score: 3 },
      { text: "ออกเดินทางไปเที่ยว", score: 2 },
      { text: "เกษียณตัวเอง", score: 1 }
    ]
  }
];

const $ = (id) => document.getElementById(id);

function showPage(id) {
  ["landing","profile","assessment","results"].forEach(pid => {
    const el = $(pid);
    if (!el) return;
    el.classList.remove("is-active");
  });
  $(id)?.classList.add("is-active");
}

/* ---------- Landing ---------- */
$("btnStart")?.addEventListener("click", () => showPage("profile"));

/* ---------- Profile validation ---------- */
$("profileForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = ($("userName")?.value || "").trim();
  const position = ($("userPosition")?.value || "").trim();
  const channel = ($("userChannel")?.value || "").trim();

  // reset errors
  toggleErr("errName", false);
  toggleErr("errPosition", false);
  toggleErr("errChannel", false);

  let ok = true;
  if (!name) { toggleErr("errName", true); ok = false; }
  if (!position) { toggleErr("errPosition", true); ok = false; }
  if (!channel) { toggleErr("errChannel", true); ok = false; }

  if (!ok) return;

  appData.profile = { name, position, channel };
  appData.uuid = genUUID_();
  appData.answers = [];
  appData.currentQuestion = 0;
  appData.resultText = "";

  showPage("assessment");
  renderQuestion();
});

function toggleErr(id, show) {
  const el = $(id);
  if (!el) return;
  el.classList.toggle("show", !!show);
}

/* ---------- Assessment ---------- */
function renderQuestion() {
  const q = questions[appData.currentQuestion];
  if (!q) return;

  $("progressPill").textContent = `${appData.currentQuestion + 1}/${questions.length}`;
  $("questionText").textContent = q.question;

  const box = $("optionsContainer");
  box.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => pickAnswer(idx));
    box.appendChild(btn);
  });
}

function pickAnswer(idx) {
  const q = questions[appData.currentQuestion];
  if (!q || !q.options[idx]) return;

  // กันกดซ้ำ
  const box = $("optionsContainer");
  const buttons = [...box.querySelectorAll(".option")];
  if (buttons.some(b => b.disabled)) return;

  const picked = q.options[idx];
  appData.answers.push({ text: picked.text, score: picked.score });

  buttons.forEach(b => b.disabled = true);
  buttons[idx].classList.add("selected");

  setTimeout(() => {
    if (appData.currentQuestion < questions.length - 1) {
      appData.currentQuestion++;
      renderQuestion();
    } else {
      finishAssessment();
    }
  }, 220);
}

function finishAssessment() {
  const total = appData.answers.reduce((s,a) => s + Number(a.score || 0), 0);

  let result = "";
  if (total >= 24) result = "ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน ทั้งความดี, ความซื่อสัตย์, ความมุ่งมั่น, ความพยายาม, ความเก่ง และความขยัน พวกเขามีการตัดสินใจที่ดีและสามารถรับมือกับสถานการณ์ที่ท้าทายได้ดีเยี่ยม";
  else if (total >= 18) result = "ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้มีความสามารถในการตัดสินใจที่ดีในหลายๆ ด้าน แต่บางครั้งอาจจะต้องพัฒนาในบางเรื่อง เช่น ความมุ่งมั่นและความพยายาม";
  else if (total >= 12) result = "ผ่านการทดสอบแต่ต้องพัฒนาค่อนข้างเยอะ: ผู้สมัครนี้มีการตัดสินใจที่ดีในบางสถานการณ์ แต่บางครั้งยังลังเลหรือตัดสินใจช้าเกินไปในสถานการณ์ที่ต้องการความรวดเร็ว";
  else result = "ไม่ผ่านการทดสอบต้องพัฒนา: ผู้สมัครนี้ต้องพัฒนาในบางด้าน เช่น ความมุ่งมั่น ความพยายาม หรือความขยัน โดยเฉพาะเมื่อเผชิญกับสถานการณ์ที่ต้องการการตัดสินใจที่รวดเร็วและแน่วแน่";

  // ✅ เก็บผลจริงไว้ส่งชีตเหมือนเดิม
  appData.resultText = result;

  // ✅ ส่งเข้า Google Sheet (หลังบ้าน)
  submitToSheet(total).catch(console.error);

  // ✅ หน้าเว็บโชว์แค่ข้อความนี้
  $("resultText").textContent = "ขอให้คุณโชคดีในการสัมภาษณ์";
  showPage("results");
}

/* ---------- Submit (no preflight) ---------- */
async function submitToSheet(totalScore) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR")) {
    console.warn("SCRIPT_URL ยังไม่ถูกตั้งค่า");
    return;
  }

  const payload = {
    uuid: appData.uuid,
    name: appData.profile.name,
    position: appData.profile.position,
    channel: appData.profile.channel,
    totalScore: String(totalScore),
    resultText: appData.resultText,
    answersCount: String(appData.answers.length),
    answers: JSON.stringify(appData.answers),
    userAgent: navigator.userAgent,
    pageUrl: location.href
  };

  const body = new URLSearchParams(payload);

  // สำคัญ: ไม่ตั้ง header เอง → เป็น simple request → ไม่ preflight
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body
  });

  // ถ้าเปิดจาก local บางทีอ่าน response อาจไม่จำเป็น
  // แต่โดยทั่วไปจะอ่านได้เมื่อ GAS อนุญาต Anyone
  try {
    const txt = await res.text();
    console.log("Sheet response:", txt);
  } catch (_) {}
}

/* ---------- Reset ---------- */
$("btnReset")?.addEventListener("click", () => {
  // reset form
  $("userName").value = "";
  $("userPosition").value = "";
  $("userChannel").value = "";

  // reset app
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.profile = { name: "", position: "", channel: "" };
  appData.resultText = "";
  appData.uuid = "";

  showPage("landing");
});

/* ---------- UUID ---------- */
function genUUID_() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* Start */
showPage("landing");
