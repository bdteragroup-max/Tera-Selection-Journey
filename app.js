"use strict";
const $ = (id) => document.getElementById(id);

/** วาง URL /exec จาก Deploy ของ Apps Script */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzfvCXdieV_wEsn9RUH7icZpeyjSRuZ0AWHO0IUxrmNxkwnp4RE1V3fKA5WnOUo705Xpg/exec";

/* ===== i18n / Language Toggle ===== */
let currentLang = "th";

const i18n = {
  th: {
    langBtn: "🇬🇧 EN",
    // Landing
    landingTitle: "บริษัท เทอรา กรุ้ป จำกัด\nขอยินดีต้อนรับผู้สมัครทุกท่าน",
    landingDesc1: "ตอบคำถามที่เป็นตัวคุณมากที่สุด",
    landingDesc2: "ไม่มีถูกผิด",
    btnStart: "เริ่ม",
    // Profile
    profileTitle: "ก่อนจะเดินต่อไป",
    profileDesc: "ขอทราบข้อมูลพื้นฐานเล็กน้อย เพื่อให้การประเมินต่อเนื่องสำหรับคุณ",
    labelName: "ชื่อ-นามสกุล",
    placeholderName: "ชื่อของคุณ",
    errName: "กรุณากรอกชื่อ-นามสกุล",
    labelPosition: "ตำแหน่งงานที่สมัคร",
    placeholderPosition: "ตำแหน่งงานที่สมัคร",
    errPosition: "กรุณากรอกตำแหน่งงานที่สมัคร",
    labelChannel: "ทราบจากช่องทาง",
    placeholderChannel: "-- เลือกช่องทาง --",
    errChannel: "กรุณาเลือกช่องทางที่ทราบข่าว",
    channelOther: "อื่น ๆ",
    btnNext: "ไปต่อ",
    // Results
    resultHeading: "เตรียมตัวให้พร้อม!",
    resultIcon: "📝",
    // Exam Picker
    examSaved: "✅ บันทึกข้อมูลทัศนคติเรียบร้อยแล้ว",
    examPickTitle: "กรุณาเลือกชุดข้อสอบ",
    examPickDesc: "เลือกให้ตรงกับแผนก/ตำแหน่งที่สมัคร เพื่อไปทำข้อสอบชุดถัดไป",
    examRedirecting: "กำลังพาไปยังข้อสอบชุดถัดไป...",
  },
  en: {
    langBtn: "🇹🇭 TH",
    // Landing
    landingTitle: "Tera Group Co., Ltd.\nWelcome to all applicants",
    landingDesc1: "Answer as honestly as you can",
    landingDesc2: "There are no right or wrong answers",
    btnStart: "Start",
    // Profile
    profileTitle: "Before We Continue",
    profileDesc: "Please provide some basic information so we can personalise your assessment.",
    labelName: "Full Name",
    placeholderName: "Your name",
    errName: "Please enter your full name",
    labelPosition: "Position Applied For",
    placeholderPosition: "Position applied for",
    errPosition: "Please enter the position you are applying for",
    labelChannel: "How Did You Hear About Us?",
    placeholderChannel: "-- Select channel --",
    errChannel: "Please select how you heard about us",
    channelOther: "Other",
    btnNext: "Next",
    // Results
    resultHeading: "Get Ready!",
    resultIcon: "📝",
    // Exam Picker
    examSaved: "✅ Attitude data saved successfully",
    examPickTitle: "Please select an exam set",
    examPickDesc: "Choose the one that matches your department / position to proceed.",
    examRedirecting: "Redirecting to the next exam...",
  },
};

function applyLang(lang) {
  currentLang = lang;
  const t = i18n[lang];

  // Toggle button label
  const btn = $("langToggle");
  if (btn) btn.textContent = t.langBtn;

  // Landing
  const landingTitle = document.querySelector("#landing h1");
  if (landingTitle) landingTitle.innerHTML = t.landingTitle.replace("\n", "<br/>");
  const landingPs = document.querySelectorAll("#landing .hero p");
  if (landingPs[0]) landingPs[0].textContent = t.landingDesc1;
  if (landingPs[1]) landingPs[1].textContent = t.landingDesc2;
  const btnStartEl = $("btnStart");
  if (btnStartEl) btnStartEl.textContent = t.btnStart;

  // Profile headings
  const profileH2 = document.querySelector("#profile .profile-head h2");
  if (profileH2) profileH2.textContent = t.profileTitle;
  const profileP = document.querySelector("#profile .profile-head p");
  if (profileP) profileP.textContent = t.profileDesc;

  // Profile form labels
  const labels = document.querySelectorAll("#profile .label");
  if (labels[0]) labels[0].textContent = t.labelName;
  if (labels[1]) labels[1].textContent = t.labelPosition;
  if (labels[2]) labels[2].textContent = t.labelChannel;

  // Inputs / placeholders
  const nameInput = $("userName");
  if (nameInput) nameInput.placeholder = t.placeholderName;
  const posInput = $("userPosition");
  if (posInput) posInput.placeholder = t.placeholderPosition;

  // Channel select placeholder
  const chanSel = $("userChannel");
  if (chanSel) {
    chanSel.options[0].text = t.placeholderChannel;
    // "อื่น ๆ" is the last option
    chanSel.options[chanSel.options.length - 1].text = t.channelOther;
  }

  // Errors
  const errName = $("errName");
  if (errName) errName.textContent = t.errName;
  const errPos = $("errPosition");
  if (errPos) errPos.textContent = t.errPosition;
  const errChan = $("errChannel");
  if (errChan) errChan.textContent = t.errChannel;

  // Submit button
  const btnNextEl = document.querySelector("#profileForm .btn-full");
  if (btnNextEl) btnNextEl.textContent = t.btnNext;

  // Results page static text
  const resH2 = document.querySelector("#results h2");
  if (resH2) resH2.textContent = t.resultHeading;
  const resIcon = $("finishIcon");
  if (resIcon) resIcon.textContent = t.resultIcon;
}

// Wire up toggle button (runs after DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  $("langToggle")?.addEventListener("click", () => {
    applyLang(currentLang === "th" ? "en" : "th");
  });
});

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
    chapter: "1.ความพร้อมและการวางแผน",
    chapterEn: "1. Readiness & Planning",
    question: "ตื่นเช้ามาในวันที่อากาศสดใส คุณคิดไว้ตั้งแต่เมื่อคืนแล้วว่าวันนี้จะไปซื้อของที่ตลาด ก่อนจะออกจากบ้านสิ่งแรกที่คุณทำคืออะไร?",
    questionEn: "It's a bright morning. You planned the night before to head to the market. What's the first thing you do before leaving the house?",
    options: [
      { text: "ตรวจเช็กรายการของที่ต้องซื้อ", textEn: "Check the shopping list I made ahead of time.", score: 4 },
      { text: "โทรหาเพื่อนหรือคนในครอบครัวเพื่อถามว่ามีใครเอาอะไรไหม", textEn: "Call a friend or family member to ask if they need anything.", score: 3 },
      { text: "หยิบกระเป๋าแล้วเดินออกไปเลย ไปลุ้นหน้างาน", textEn: "Grab my bag and head out — I'll figure it out once I'm there.", score: 2 },
      { text: "ดื่มกาแฟเงียบๆ หรือนั่งพักให้สมองโล่ง", textEn: "Sit quietly with a coffee to clear my head first.", score: 1 }
    ]
  },
  {
    chapter: "2.เป้าหมายในการทำงาน",
    chapterEn: "2. Work Goals",
    question: "อะไรคือสิ่งที่คุณให้ความสำคัญที่สุดในการมาตลาดวันนี้?",
    questionEn: "What is most important to you about going to the market today?",
    options: [
      { text: "การได้ของที่สด สะอาด และราคาคุ้มค่าที่สุด", textEn: "Getting everything on the list — fresh, clean, and best value.", score: 4 },
      { text: "การได้ของครบตามที่ตั้งใจในเวลาที่รวดเร็ว", textEn: "Finishing everything quickly and efficiently.", score: 3 },
      { text: "การได้ทักทายแม่ค้าที่คุ้นเคยและสัมผัสบรรยากาศผู้คน", textEn: "Greeting familiar vendors and soaking up the atmosphere.", score: 2 },
      { text: "การได้เดินดูของแปลกๆ ใหม่ๆ ที่ไม่ได้วางแผนซื้อ", textEn: "Wandering and discovering something new I hadn't planned to buy.", score: 1 }
    ]
  },
  {
    chapter: "3.การตัดสินใจ",
    chapterEn: "3. Decision Making",
    question: "ในการเดินทางไปตลาด มีเส้นทางไปหลายเส้นทาง คิดว่าควรเลือกไปทางไหนดี?",
    questionEn: "There are several routes to the market. Which do you choose?",
    options: [
      { text: "เลือกทางที่ประหยัดเวลาที่สุดโดยดูจากระยะทาง", textEn: "The most time-efficient path based on distance.", score: 4 },
      { text: "เลือกทางที่เคยเดินประจำ เพราะคุ้นชิน", textEn: "The familiar route I always use.", score: 3 },
      { text: "ถามคนที่เดินมาด้วยกันว่าเขาอยากไปทางไหน", textEn: "I ask whoever's with me which way they prefer.", score: 2 },
      { text: "เลือกจากความรู้สึกว่าวันนี้อยากเดินผ่านที่ไหน", textEn: "Whichever path feels right this morning.", score: 1 }
    ]
  },
  {
    chapter: "4.การแก้ปัญหาเฉพาะหน้า",
    chapterEn: "4. Problem Solving",
    question: "ระหว่างทางที่เดินไปตลาดคุณเจอรถบรรทุกจอดเสียขวางซอยแคบๆ จนผ่านไม่ได้ คุณจะทำอย่างไร?",
    questionEn: "On the way, a broken-down truck blocks a narrow alley and you can't pass. What do you do?",
    options: [
      { text: "พยายามแทรกตัวผ่านไป หรือหาทางลัดที่เร็วที่สุด", textEn: "Find a way through or the quickest detour possible.", score: 4 },
      { text: "หยุดรอสักพักดูว่ารถจะเคลื่อนไหม แล้วค่อยหาทางอ้อม", textEn: "Wait briefly to see if it moves, then find a workaround.", score: 3 },
      { text: "เข้าไปถามคนแถวนั้นหรือคนขับรถว่าช่วยอะไรได้ไหม", textEn: "Ask nearby people or the driver if there's anything I can help with.", score: 2 },
      { text: "คิดว่าวันนี้ดวงไม่ดี เดินกลับบ้านหาอย่างอื่นทำแทน", textEn: "Take it as a bad sign and head back home to do something else.", score: 1 }
    ]
  },
  {
    chapter: "5.ความรับผิดชอบต่อส่วนรวม",
    chapterEn: "5. Social Responsibility",
    question: "หลังจากที่คุณเดินผ่านจากจุดที่มีรถขวางอยู่มาสักระยะ คุณเจอขยะถูกทิ้งไว้กลางทางเดิน คุณจะทำอย่างไร?",
    questionEn: "Further down the path, you spot litter left in the middle of the walkway. What do you do?",
    options: [
      { text: "เก็บไปทิ้งให้เรียบร้อย แล้วตามหาคนทิ้งเพื่อตักเตือน", textEn: "Pick it up, bin it, then find whoever dropped it to say something.", score: 4 },
      { text: "เก็บไปทิ้งให้เงียบๆ แล้วเดินต่อโดยไม่หาความ", textEn: "Quietly pick it up and toss it without making a fuss.", score: 3 },
      { text: "หยุดมองหาคนทิ้ง และมองหาป้ายประกาศเตือน", textEn: "Stop and look around for the culprit or a reminder sign nearby.", score: 2 },
      { text: "เดินผ่านไปพลางบ่น แต่มุ่งหน้าไปตลาดต่อ", textEn: "Walk past muttering to myself and keep heading to the market.", score: 1 }
    ]
  },
  {
    chapter: "6.การบริหารสถานการณ์กดดัน",
    chapterEn: "6. Handling Pressure",
    question: "หลังจากเดินมาสักพัก ก็มาถึงตลาด คุณพบว่าตลาดคนเยอะมาก เสียงดังเบียดเสียดจนน่าปวดหัว จัดการอย่างไร?",
    questionEn: "You arrive at the market — it's packed, loud, and overwhelming. How do you handle it?",
    options: [
      { text: "ประมวลผลว่าควรไปร้านไหนก่อนที่คนจะน้อยกว่า", textEn: "Assess which stalls will be less crowded and plan the route.", score: 4 },
      { text: "รีบเดินฝ่าฝูงชนไปซื้อของให้เสร็จไวที่สุด", textEn: "Push through the crowd and get my shopping done as fast as possible.", score: 3 },
      { text: "มองหาแม่ค้าที่คุ้นหน้าเพื่อคุยเล่นคลายความอึดอัด", textEn: "Look for a familiar vendor to chat with and ease into the chaos.", score: 2 },
      { text: "ถอยออกไปยืนที่โล่งๆ สูดหายใจลึกๆ ก่อนกลับเข้าไป", textEn: "Step out to an open space, breathe deeply, then re-enter.", score: 1 }
    ]
  },
  {
    chapter: "7.ความซื่อสัตย์และความโปร่งใส",
    chapterEn: "7. Honesty & Transparency",
    question: "ขณะที่คุณกำลังเดินถือของพะรุงพะรัง จู่ๆ กระเป๋าของคุณก็ไปเกี่ยวเข้ากับกองลังขนม จนมันเอียงและทำท่าจะถล่มลงมา แต่ตอนนั้นแม่ค้ามุ่งอยู่หลังร้านและไม่มีใครเห็นเหตุการณ์เลย คุณจะจัดการอย่างไร?",
    questionEn: "While carrying lots of bags, you accidentally brush against a stack of snack boxes — it tilts and nearly topples. The vendor is in the back and no one saw. What do you do?",
    options: [
      { text: "เดินไปบอกเจ้าของร้านทันทีว่าเราเผลอชนจนกองสินค้าเอียง และช่วยจัดสินค้าคืนที่เดิม", textEn: "Go directly to the vendor, explain what happened, and help re-stack.", score: 4 },
      { text: "รีบประคองและจัดเรียงให้เข้าที่เดิมอย่างรวดเร็วด้วยตัวเอง แล้วเดินต่อไปเหมือนไม่มีอะไรเกิดขึ้น", textEn: "Quickly straighten the stack myself and move on without a word.", score: 3 },
      { text: "ช่วยจัดคืนที่เดิมเท่าที่ทำได้ แต่จะจดจำไว้เป็นบทเรียนว่าคราวหน้าต้องระวังพื้นที่แคบๆ มากกว่านี้", textEn: "Re-stack as best I can and note it as a lesson to be more careful next time.", score: 2 },
      { text: "ตกใจและกังวลมากจนไม่กล้าเข้าไปแตะต้อง รีบเดินเลี่ยงออกมาเพราะกลัวจะโดนตำหนิหรือทำพังกว่าเดิม", textEn: "Panic and walk away quickly — I'm too afraid of making it worse.", score: 1 }
    ]
  },
  {
    chapter: "8.การรับคำติชม",
    chapterEn: "8. Receiving Feedback",
    question: "แม่ค้าต่อว่าว่าเลือกนาน ทั้งที่คุณเพิ่งหยิบดู คุณจะ...?",
    questionEn: "A vendor snaps at you for \"taking too long to choose\" even though you just started looking. You…",
    options: [
      { text: "พิจารณาว่านานจริงไหม ถ้าจริงรีบสรุป ถ้าไม่ก็เฉยๆ", textEn: "Genuinely consider if it's true — adjust if so, let it go if not.", score: 4 },
      { text: "รู้สึกเสียใจแต่ก็พยายามเข้าใจว่าแม่ค้าคงเหนื่อย", textEn: "Feel a little hurt but try to understand they're probably exhausted.", score: 3 },
      { text: "โต้กลับไปว่าเราเป็นลูกค้า มีสิทธิ์เลือกของที่ดีที่สุด", textEn: "Push back calmly — as a customer, I have the right to browse.", score: 2 },
      { text: "เก็บมาคิดมากจนหมดสนุก และอาจไม่มาร้านนี้อีก", textEn: "Overthink it for the rest of the trip and probably don't return.", score: 1 }
    ]
  },
  {
    chapter: "9.มาตรฐานและคุณภาพงาน",
    chapterEn: "9. Standards & Quality",
    question: "เวลาเลือกซื้อของ คุณให้ความสำคัญกับสิ่งใดมากที่สุด?",
    questionEn: "When selecting what to buy, what matters most to you?",
    options: [
      { text: "แม่ค้าต้องซื่อสัตย์ ไม่โกงน้ำหนักหรือยัดไส้ของเสีย", textEn: "The vendor is honest — no short-changing or hiding bad produce.", score: 4 },
      { text: "สินค้าต้องมีคุณภาพดีเยี่ยมและได้มาตรฐาน", textEn: "The products are top quality and meet a clear standard.", score: 3 },
      { text: "การพูดจาสุภาพและการดูแลเอาใจใส่ลูกค้า", textEn: "The vendor is polite and genuinely attentive to customers.", score: 2 },
      { text: "ร้านมีของที่หลากหลายและมีความคิดสร้างสรรค์", textEn: "The stall has variety and surprising, creative offerings.", score: 1 }
    ]
  }
];

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
  const isEn = currentLang === "en";
  $("questionText").textContent = isEn ? (q.questionEn || q.question) : q.question;

  const box = $("optionsContainer");
  box.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = isEn ? (opt.textEn || opt.text) : opt.text;
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
  { label: "บัญชีทั่วไป", labelEn: "General Accounting", url: "exam-accounting.html" },
  { label: "บัญชีระดับหัวหน้า/ผู้จัดการ", labelEn: "Accounting Manager", url: "exam-accounting-manager.html" },
  { label: "แอดมินสาขา/ธุรการ", labelEn: "Branch Admin", url: "exam-branch-admin.html" },
  { label: "ผู้จัดการสาขา", labelEn: "Branch Manager", url: "exam-branch-manager.html" },
  { label: "BD / Developer", labelEn: "BD / Developer", url: "exam-bd.html" },
  { label: "Telesales / โทรขาย", labelEn: "Telesales", url: "exam-telesales.html" },
  { label: "Sales / AE / ฝ่ายขาย", labelEn: "Sales / AE", url: "exam-sales.html" },
  { label: "จัดซื้อ", labelEn: "Purchasing", url: "exam-purchasing.html" },
  { label: "ธุรการประสานงานโครงการ", labelEn: "Project Coordinator", url: "exam_coordinator.html" },
  { label: "วิศวกรไฟฟ้า", labelEn: "Electrical Engineer", url: "exam_electrical_engineer.html" },
  { label: "วิศวกรเครื่องกล", labelEn: "Mechanical Engineer", url: "exam_Mechanical_engineer.html" }, // ✅ เพิ่มใหม่
  { label: "ช่างไฟฟ้า", labelEn: "Electrician", url: "exam-electrician.html" },
  { label: "วิศวกร", labelEn: "Engineer", url: "exam-engineer.html" },
  { label: "บริการ / Service", labelEn: "Service", url: "exam-service.html" },
  { label: "คลังสินค้า / Logistic", labelEn: "Warehouse / Logistics", url: "exam-warehouse-logistics.html" },
];


function renderExamPicker_(totalScore) {
  const holder = $("resultText");
  if (!holder) return;

  const t = i18n[currentLang]; // ← เพิ่มบรรทัดนี้

  const buttonsHtml = EXAM_CHOICES.map((x) => {
    // label ภาษาอังกฤษ (ถ้ามี) หรือใช้ label เดิม
    const displayLabel = (currentLang === "en" && x.labelEn) ? x.labelEn : x.label;
    return `
      <button type="button" class="option" data-exam-url="${x.url}"
        style="width:100%; text-align:left; padding:12px 14px; border-radius:14px;">
        📄 ${escapeHtml_(displayLabel)}
      </button>
    `;
  }).join("");

  holder.innerHTML = `
    <div style="color:#f1c40f; font-weight:800; font-size:1.3rem; margin-bottom:10px;">
      ${t.examSaved}
    </div>
    <div style="line-height:1.65; margin-bottom:12px;">
      <strong>${t.examPickTitle}</strong><br/>
      <span style="opacity:.85">${t.examPickDesc}</span>
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
    [...box.querySelectorAll("[data-exam-url]")].forEach((b) => (b.disabled = true));
    btn.classList.add("selected");
    const url = btn.getAttribute("data-exam-url");
    const hint = $("examPickerHint");
    if (hint) hint.textContent = t.examRedirecting; // ← ใช้ i18n
    const qs = new URLSearchParams({
      name: appData.profile.name || "",
      uuid: appData.uuid || "",
      preScore: String(totalScore || 0)
    });
    setTimeout(() => { window.location.href = `${url}?${qs.toString()}`; }, 400);
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
  if (total >= 32) {
    result =
      "ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน ทั้งความดี, ความซื่อสัตย์, ความมุ่งมั่น, ความพยายาม, ความเก่ง, ความขยัน และความรับผิดชอบ สามารถตัดสินใจได้ดีและรับมือสถานการณ์ท้าทายได้เยี่ยม";
  } else if (total >= 26) {
    result =
      "ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้ตัดสินใจได้ดีในหลายด้าน แต่ยังสามารถพัฒนาเพิ่มเติมในบางเรื่อง เช่น ความมุ่งมั่น ความพยายาม หรือความรับผิดชอบ";
  } else if (total >= 18) {
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
      answersCount: "9",
      scores: scoresArray.join(","),
      makeRadar: "FALSE",
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };

    for (let i = 1; i <= 9; i++) {
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
