"use strict";

/** วาง URL /exec จาก Deploy ของ Apps Script */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzfvCXdieV_wEsn9RUH7icZpeyjSRuZ0AWHO0IUxrmNxkwnp4RE1V3fKA5WnOUo705Xpg/exec";

const appData = {
  currentQuestion: 0,
  answers: [],
  profile: { name: "", position: "", channel: "" },
  resultText: "",
  hrRecommendation: "",
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
    question:
      "คุณกำลังจะออกจากบ้านไปขึ้นเงินล็อตเตอรี่ แต่ดันเจอเงินแสนตกอยู่หน้าบ้าน คุณจะ?",
    options: [
      { text: "ตามหาเจ้าของเงิน", score: 4 },
      { text: "เอาเงินไปส่งให้ตำรวจ", score: 3 },
      { text: "เก็บไว้เองก่อน", score: 2 },
      { text: "เดินผ่านไป รีบไปขึ้นเงินล็อตเตอรี่", score: 1 }
    ]
  },
  {
    chapter: "3.ความมุ่งมั่น",
    question:
      "คุณนำเงินไปซื้อบ้านใหม่ให้ครอบครัว แต่คนในบ้านบ่นว่าดูแลยาก คุณจะ?",
    options: [
      { text: "จ้างคนมาช่วยดูแล", score: 3 },
      { text: "ปรับเปลี่ยนบ้านให้ตรงใจทุกคน", score: 4 },
      { text: "ขายบ้าน", score: 2 },
      { text: "ปล่อยไปตามสภาพ", score: 1 }
    ]
  },
  {
    chapter: "4.ความพยายาม",
    question:
      "คุณอยากให้ลูกเรียนโรงเรียนที่ดีขึ้น แต่พวกเขาปรับตัวไม่ได้ คุณจะ?",
    options: [
      { text: "สอนหนังสือให้เด็กๆเอง", score: 4 },
      { text: "หาครูพิเศษมาช่วยสอน", score: 3 },
      { text: "ให้ลองเรียนอีกเทอม", score: 2 },
      { text: "ปล่อยให้ช่วยเหลือตัวเอง", score: 1 }
    ]
  },
  {
    chapter: "5.ความเก่ง",
    question:
      "ญาติพี่น้องมาขอยืมเงินคุณจนเป็นปัญหาที่ส่งผลต่อความสัมพันธ์ คุณจะ?",
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
  },
  {
    chapter: "7.ความรับผิดชอบ",
    question: "ถ้าเห็นขยะตกอยู่จะทำอย่างไร?",
    options: [
      { text: "นำขยะแล้วหาตัวคนทิ้งต่อ", score: 3 },
      { text: "สงสัยว่าใครนำมาทิ้งตรงนี้", score: 1 },
      { text: "นำขยะไปทิ้งให้โดยไม่คิดอะไร", score: 4 },
      { text: "หาตัวคนที่ทิ้งขยะตรงนี้", score: 2 }
    ]
  }
];

const $ = (id) => document.getElementById(id);

function showPage(id) {
  ["landing", "profile", "assessment", "results"].forEach((pid) => {
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

  toggleErr("errName", false);
  toggleErr("errPosition", false);
  toggleErr("errChannel", false);

  let ok = true;
  if (!name) {
    toggleErr("errName", true);
    ok = false;
  }
  if (!position) {
    toggleErr("errPosition", true);
    ok = false;
  }
  if (!channel) {
    toggleErr("errChannel", true);
    ok = false;
  }

  if (!ok) return;

  appData.profile = { name, position, channel };
  appData.uuid = genUUID_();
  appData.answers = [];
  appData.currentQuestion = 0;
  appData.resultText = "";
  appData.hrRecommendation = "";

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

  const box = $("optionsContainer");
  const buttons = [...box.querySelectorAll(".option")];
  if (buttons.some((b) => b.disabled)) return;

  const picked = q.options[idx];

  appData.answers.push({
    chapter: q.chapter,
    question: q.question,
    text: picked.text,
    score: picked.score
  });

  buttons.forEach((b) => (b.disabled = true));
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

/* ---------- NEW: เลือกชุดข้อสอบเอง ---------- */
const EXAM_CHOICES = [
  { label: "บัญชีทั่วไป", url: "exam-accounting.html" },
  { label: "บัญชีระดับหัวหน้า/ผู้จัดการ", url: "exam-accounting-manager.html" },
  { label: "แอดมินสาขา/ธุรการ", url: "exam-branch-admin.html" },
  { label: "ผู้จัดการสาขา", url: "exam-branch-manager.html" },
  { label: "BD / Developer", url: "exam-bd.html" },
  { label: "Telesales / โทรขาย", url: "exam-telesales.html" },
  { label: "Sales / AE / ฝ่ายขาย", url: "exam-sales.html" },
  { label: "จัดซื้อ", url: "exam-purchasing.html" },
  { label: "ช่างไฟฟ้า", url: "exam-electrician.html" },
  { label: "วิศวกร", url: "exam-engineer.html" },
  { label: "บริการ / Service", url: "exam-service.html" },
  { label: "คลังสินค้า / Logistic", url: "exam-warehouse-logistics.html" }
];

function renderExamPicker_(totalScore) {
  const holder = $("resultText");
  if (!holder) return;

  const buttonsHtml = EXAM_CHOICES.map((x) => {
    return `
      <button type="button" class="option" data-exam-url="${x.url}"
        style="width:100%; text-align:left; padding:12px 14px; border-radius:14px;">
        📄 ${escapeHtml_(x.label)}
      </button>
    `;
  }).join("");

  holder.innerHTML = `
    <div style="color:#f1c40f; font-weight:800; font-size:1.3rem; margin-bottom:10px;">
      ✅ บันทึกข้อมูลทัศนคติเรียบร้อยแล้ว
    </div>

    <div style="line-height:1.65; margin-bottom:12px;">
      <strong>กรุณาเลือกชุดข้อสอบ</strong><br/>
      <span style="opacity:.85">เลือกให้ตรงกับแผนก/ตำแหน่งที่สมัคร เพื่อไปทำข้อสอบชุดถัดไป</span>
    </div>

    <div id="examPickerBox" style="display:grid; gap:10px;">
      ${buttonsHtml}
    </div>

    <div id="examPickerHint" style="margin-top:12px; opacity:.85; font-size:.95rem;"></div>
  `;

  const box = $("examPickerBox");
  box?.addEventListener("click", (ev) => {
    const btn = ev.target?.closest?.("[data-exam-url]");
    if (!btn) return;

    // กันกดรัว
    const all = [...box.querySelectorAll("[data-exam-url]")];
    all.forEach((b) => (b.disabled = true));
    btn.classList.add("selected");

    const url = btn.getAttribute("data-exam-url");
    const hint = $("examPickerHint");
    if (hint) hint.textContent = "กำลังพาไปยังข้อสอบชุดถัดไป...";

    const qs = new URLSearchParams({
      name: appData.profile.name || "",
      uuid: appData.uuid || "",
      preScore: String(totalScore || 0)
    });

    setTimeout(() => {
      window.location.href = `${url}?${qs.toString()}`;
    }, 400);
  });
}

function escapeHtml_(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ---------- Finish ---------- */
function finishAssessment() {
  const total = appData.answers.reduce((s, a) => s + Number(a.score || 0), 0);

  let result = "";
  if (total >= 26) {
    result =
      "ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน ทั้งความดี, ความซื่อสัตย์, ความมุ่งมั่น, ความพยายาม, ความเก่ง, ความขยัน และความรับผิดชอบ สามารถตัดสินใจได้ดีและรับมือสถานการณ์ท้าทายได้เยี่ยม";
  } else if (total >= 20) {
    result =
      "ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้ตัดสินใจได้ดีในหลายด้าน แต่ยังสามารถพัฒนาเพิ่มเติมในบางเรื่อง เช่น ความมุ่งมั่น ความพยายาม หรือความรับผิดชอบ";
  } else if (total >= 14) {
    result =
      "ผ่านได้แต่ควรพัฒนา: ผู้สมัครนี้ตัดสินใจได้ดีในบางสถานการณ์ แต่บางครั้งยังลังเล/ตัดสินใจช้า ควรพัฒนาเรื่องความมุ่งมั่น ความพยายาม และความรับผิดชอบให้ชัดเจนขึ้น";
  } else {
    result =
      "ต้องพัฒนา: ผู้สมัครนี้ควรพัฒนาในหลายด้าน โดยเฉพาะความมุ่งมั่น ความพยายาม ความขยัน และความรับผิดชอบ เพื่อให้รับมือสถานการณ์ที่ต้องตัดสินใจเร็วและทำงานต่อเนื่องได้ดีขึ้น";
  }

  // เกณฑ์ HR
  const hrStatus = total >= 14 ? "🟢 ผ่าน (เรียกสัมภาษณ์)" : total >= 10 ? "🟡 พิจารณาพิเศษ" : "🔴 ไม่ผ่าน";

  appData.resultText = result;
  appData.hrRecommendation = hrStatus;

  // ส่งข้อมูลลง Sheet
  submitToSheet(total, hrStatus).catch((err) => console.error(err));

  // แสดงหน้าผลลัพธ์
  showPage("results");

  // ✅ เปลี่ยนจาก auto redirect ตามตำแหน่ง → ให้ผู้สมัครเลือกชุดข้อสอบเอง
  renderExamPicker_(total);
}

async function submitToSheet(totalScore, hrStatus) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR")) return;
  try {
    const scoresArray = appData.answers.map((ans) => Number(ans.score || 0));
    const payload = {
      targetTab: "Responses",
      uuid: appData.uuid || "",
      name: appData.profile.name || "",
      position: appData.profile.position || "",
      channel: appData.profile.channel || "",
      totalScore: String(totalScore),
      hrStatus: hrStatus,
      resultText: appData.resultText || "",
      answersCount: "7",
      scores: scoresArray.join(","),
      makeRadar: "FALSE",
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };

    for (let i = 1; i <= 7; i++) {
      const ans = appData.answers[i - 1];
      payload[`q${i}_text`] = ans ? ans.text : "";
      payload[`q${i}_score`] = ans ? String(ans.score) : "0";
    }

    const body = new URLSearchParams();
    Object.keys(payload).forEach((key) => body.append(key, payload[key]));

    fetch(SCRIPT_URL, {
      method: "POST",
      body: body,
      mode: "no-cors"
    });
  } catch (err) {
    console.error("❌ Error ส่งข้อมูล:", err);
  }
}

/* ---------- Reset & Utils ---------- */
$("btnReset")?.addEventListener("click", () => {
  $("userName").value = "";
  $("userPosition").value = "";
  $("userChannel").value = "";
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.resultText = "";
  appData.hrRecommendation = "";
  showPage("landing");
});

function genUUID_() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// ฟังก์ชันสำหรับปุ่มตกลงใน Modal (ยังคงไว้ เผื่อมีใช้หน้าอื่น)
window.goHome = function () {
  window.location.href = "index.html";
};

showPage("landing");
