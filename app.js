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
  ["landing", "profile", "assessment", "results"].forEach(pid => {
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

  const box = $("optionsContainer");
  const buttons = [...box.querySelectorAll(".option")];
  if (buttons.some(b => b.disabled)) return;

  const picked = q.options[idx];

  appData.answers.push({
    chapter: q.chapter,
    question: q.question,
    text: picked.text,
    score: picked.score
  });

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
  const total = appData.answers.reduce((s, a) => s + Number(a.score || 0), 0);

  let result = "";
  if (total >= 26) {
    result = "ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน ทั้งความดี, ความซื่อสัตย์, ความมุ่งมั่น, ความพยายาม, ความเก่ง, ความขยัน และความรับผิดชอบ สามารถตัดสินใจได้ดีและรับมือสถานการณ์ท้าทายได้เยี่ยม";
  } else if (total >= 20) {
    result = "ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้ตัดสินใจได้ดีในหลายด้าน แต่ยังสามารถพัฒนาเพิ่มเติมในบางเรื่อง เช่น ความมุ่งมั่น ความพยายาม หรือความรับผิดชอบ";
  } else if (total >= 14) {
    result = "ผ่านได้แต่ควรพัฒนา: ผู้สมัครนี้ตัดสินใจได้ดีในบางสถานการณ์ แต่บางครั้งยังลังเล/ตัดสินใจช้า ควรพัฒนาเรื่องความมุ่งมั่น ความพยายาม และความรับผิดชอบให้ชัดเจนขึ้น";
  } else {
    result = "ต้องพัฒนา: ผู้สมัครนี้ควรพัฒนาในหลายด้าน โดยเฉพาะความมุ่งมั่น ความพยายาม ความขยัน และความรับผิดชอบ เพื่อให้รับมือสถานการณ์ที่ต้องตัดสินใจเร็วและทำงานต่อเนื่องได้ดีขึ้น";
  }

  // 2. เกณฑ์ HR
  let hrStatus = total >= 14 ? "🟢 ผ่าน (เรียกสัมภาษณ์)" : total >= 10 ? "🟡 พิจารณาพิเศษ" : "🔴 ไม่ผ่าน";

  appData.resultText = result;
  appData.hrRecommendation = hrStatus;

  // ส่งข้อมูลลง Sheet
  submitToSheet(total, hrStatus).catch(err => console.error(err));

  // แสดงหน้าผลลัพธ์เบื้องต้น
  showPage("results");

  // 3. Logic การคัดกรองตำแหน่ง (Redirect Logic)
  const pos = (appData.profile.position || "").toLowerCase();
  let targetURL = "";

  // กลุ่มบัญชี
  if (pos.match(/บัญชี|บช|acc|fin|audit|เงิน|ap|ar/)) {
    targetURL = pos.match(/accounting manager|ผู้จัดการบัญชี|หัวหน้าบัญชี|ผู้จัดการการเงิน|ผู้จัดการบัญชี/การเงิน/) ? "exam-accounting-manager.html" : "exam-accounting.html";
  }
  // กลุ่มสาขา
  else if (pos.match(/แอดมิน|admin|ธุการ|ธุรการประสานงาน|ประสานงาน|/)) {
    targetURL = pos.match(/manager|ผู้จัดการสาขา|หัวหน้าสาขา/) ? "exam-branch-manager.html" : "exam-branch-admin.html";
  }
  // กลุ่ม IT/BD
  else if (pos.match(/developer|dev|bd/)) {
    targetURL = "exam-bd.html";
  }
  // กลุ่มขาย
  else if (pos.match(/tele|โทรขาย|telesales|พนักงานขายทางโทรศัพท์/)) {
    targetURL = "exam-telesales.html";
  }
  else if (pos.match(/sale|พนักงานขาย|ae|เซลล์|ฝ่ายขาย/)) {
    targetURL = "exam-sales.html";
  }
  // กลุ่มจัดซื้อ
  else if (pos.match(/จัดซื้อ|purchase/)) {
    targetURL = "exam-purchasing.html";
  }
  // กลุ่มช่าง/วิศวกร
  else if (pos.match(/ช่าง|ไฟ|electric|ช่างไฟฟ้า/)) {
    targetURL = "exam-electrician.html";
  }
  else if (pos.match(/วิศวกร|engineer/)) {
    targetURL = "exam-engineer.html";
  }
  // กลุ่มบริการ
  else if (pos.match(/บริการ|service|เซอร์วิส/)) {
    targetURL = "exam-service.html";
  }
  // กลุ่มคลังสินค้า
  else if (pos.match(/คลัง|wh|log|stock|ship/)) {
    targetURL = "exam-warehouse-logistics.html";
  }

  // 4. การตัดสินใจเปลี่ยนหน้าหรือโชว์ Modal
  if (targetURL !== "") {
    $("resultText").innerHTML = `
      <div style="color: #f1c40f; font-weight: bold; font-size: 1.3rem; margin-bottom: 10px;">⚠️ โปรดอย่าพึ่งปิดหน้าจอนี้! ⚠️</div>
      <div style="line-height: 1.6;">บันทึกข้อมูลทัศนคติเรียบร้อยแล้ว<br><strong>กำลังพาคุณไปสู่ข้อสอบชุดถัดไป</strong></div>`;

    setTimeout(() => {
      window.location.href = `${targetURL}?name=${encodeURIComponent(appData.profile.name)}&uuid=${appData.uuid}&preScore=${total}`;
    }, 2500);
  } else {
    // หากไม่พบตำแหน่งที่ตรงกัน ให้โชว์ Modal
    setTimeout(() => {
      const modal = $("customModal");
      if (modal) {
        modal.style.display = "block";
      } else {
        alert("ขอบคุณสำหรับคำตอบ! ขอให้คุณโชคดีในการสัมภาษณ์");
        window.location.href = "index.html";
      }
    }, 1000);
  }
}

async function submitToSheet(totalScore, hrStatus) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR")) return;
  try {
    const scoresArray = appData.answers.map(ans => Number(ans.score || 0));
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
      scores: scoresArray.join(','),
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
    Object.keys(payload).forEach(key => body.append(key, payload[key]));

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
  showPage("landing");
});

function genUUID_() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// ฟังก์ชันสำหรับปุ่มตกลงใน Modal
window.goHome = function () {
  window.location.href = "index.html";
};

showPage("landing");







