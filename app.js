"use strict";
const $ = (id) => document.getElementById(id);

/** วาง URL /exec จาก Deploy ของ Apps Script */
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzyEfYLPui1hVutBVgvKXUV2pUSI5th8A8IAO75QRc_ZK1ia1lgoqNkbDZFwNhyncBj/exec";

/* ===== i18n / Language Toggle ===== */
let currentLang = "th";

const i18n = {
  th: {
    langBtn: "EN",
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
    assessSectionPill: "ส่วนที่ 1: แบบประเมินทัศนคติ",
    // IQ Intro & Assessment
    iqIntroTitle: "ส่วนที่ 2: แบบทดสอบความฉลาดทางเชาวน์ปัญญา (IQ Test)",
    btnStartIq: "เริ่มทำแบบทดสอบ IQ",
    iqProgressPrefix: "ข้อที่ ",
    // EQ Intro & Assessment
    eqIntroTitle: "ส่วนที่ 3: แบบทดสอบความฉลาดทางอารมณ์ในการทำงาน (EQ Test)",
    btnStartEq: "เริ่มทำแบบทดสอบ EQ",
    eqProgressPrefix: "ข้อที่ ",
    // Results
    resultHeading: "เตรียมตัวให้พร้อม!",
    // Exam Picker
    examSaved: "บันทึกข้อมูลทัศนคติเรียบร้อยแล้ว",
    iqSaved: "บันทึกผลทดสอบเชาวน์ปัญญา (IQ) เรียบร้อยแล้ว",
    eqSaved: "บันทึกผลทดสอบความฉลาดทางอารมณ์ (EQ) เรียบร้อยแล้ว",
    examPickTitle: "กรุณาเลือกชุดข้อสอบประจำตำแหน่ง",
    examPickDesc: "เลือกให้ตรงกับแผนก/ตำแหน่งที่สมัคร เพื่อไปทำข้อสอบเฉพาะทาง",
    examRedirecting: "กำลังพาไปยังข้อสอบชุดถัดไป...",
  },
  en: {
    langBtn: "TH",
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
    assessSectionPill: "Part 1: Psychological Assessment",
    // IQ Intro & Assessment
    iqIntroTitle: "Part 2: Cognitive & Logic Assessment (IQ Test)",
    btnStartIq: "Start IQ Test",
    iqProgressPrefix: "Question ",
    // EQ Intro & Assessment
    eqIntroTitle: "Part 3: Workplace Emotional Intelligence Assessment (EQ Test)",
    btnStartEq: "Start EQ Test",
    eqProgressPrefix: "Question ",
    // Results
    resultHeading: "Get Ready!",
    // Exam Picker
    examSaved: "Attitude assessment data saved successfully",
    iqSaved: "Cognitive (IQ) test data saved successfully",
    eqSaved: "Emotional Intelligence (EQ) data saved successfully",
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
  const btnText = $("langBtnText");
  if (btnText) {
    btnText.textContent = t.langBtn;
  } else if (btn) {
    btn.textContent = t.langBtn;
  }

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

  // Section pill
  const aPill = $("assessSectionPill");
  if (aPill) aPill.textContent = t.assessSectionPill;

  // IQ Intro
  const iqTitle = $("iqIntroTitle");
  if (iqTitle) iqTitle.textContent = t.iqIntroTitle;
  const btnStartIq = $("btnStartIq");
  if (btnStartIq) btnStartIq.textContent = t.btnStartIq;

  // EQ Intro
  const eqTitle = $("eqIntroTitle");
  if (eqTitle) eqTitle.textContent = t.eqIntroTitle;
  const btnStartEq = $("btnStartEq");
  if (btnStartEq) btnStartEq.textContent = t.btnStartEq;

  // Results page static text
  const resH2 = $("resultsTitle");
  if (resH2) resH2.textContent = t.resultHeading;

  // Re-render questions if currently active
  const isAssessmentActive = $("assessment")?.classList.contains("is-active");
  if (isAssessmentActive) renderQuestion();

  const isIqActive = $("iqAssessment")?.classList.contains("is-active");
  if (isIqActive) renderIqQuestion();

  const isEqActive = $("eqAssessment")?.classList.contains("is-active");
  if (isEqActive) renderEqQuestion();

  const isResultsActive = $("results")?.classList.contains("is-active");
  if (isResultsActive) renderExamPicker_(appData.preScore, appData.iqScore, appData.eqScore);
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
  currentIqQuestion: 0,
  iqAnswers: [],
  currentEqQuestion: 0,
  eqAnswers: [],
  preScore: 0,
  iqScore: 0,
  eqScore: 0,
  profile: { name: "", position: "", channel: "" },
  resultText: "",
  hrRecommendation: "",
  uuid: "",
};

/* ===== Part 1: Psychological Assessment (9 questions) ===== */
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
      { text: "ดื่มกาแฟเงียบๆ หรือนั่งพักให้สมองโล่ง", textEn: "Sit quietly with a coffee to clear my head first.", score: 1 },
    ],
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
      { text: "การได้เดินดูของแปลกๆ ใหม่ๆ ที่ไม่ได้วางแผนซื้อ", textEn: "Wandering and discovering something new I hadn't planned to buy.", score: 1 },
    ],
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
      { text: "เลือกจากความรู้สึกว่าวันนี้อยากเดินผ่านที่ไหน", textEn: "Whichever path feels right this morning.", score: 1 },
    ],
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
      { text: "คิดว่าวันนี้ดวงไม่ดี เดินกลับบ้านหาอย่างอื่นทำแทน", textEn: "Take it as a bad sign and head back home to do something else.", score: 1 },
    ],
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
      { text: "เดินผ่านไปพลางบ่น แต่มุ่งหน้าไปตลาดต่อ", textEn: "Walk past muttering to myself and keep heading to the market.", score: 1 },
    ],
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
      { text: "ถอยออกไปยืนที่โล่งๆ สูดหายใจลึกๆ ก่อนกลับเข้าไป", textEn: "Step out to an open space, breathe deeply, then re-enter.", score: 1 },
    ],
  },
  {
    chapter: "7.ความซื่อสัตย์และความโปร่งใส",
    chapterEn: "7. Honesty & Transparency",
    question:
      "ขณะที่คุณกำลังเดินถือของพะรุงพะรัง จู่ๆ กระเป๋าของคุณก็ไปเกี่ยวเข้ากับกองลังขนม จนมันเอียงและทำท่าจะถล่มลงมา แต่ตอนนั้นแม่ค้ามุ่งอยู่หลังร้านและไม่มีใครเห็นเหตุการณ์เลย คุณจะจัดการอย่างไร?",
    questionEn:
      "While carrying lots of bags, you accidentally brush against a stack of snack boxes — it tilts and nearly topples. The vendor is in the back and no one saw. What do you do?",
    options: [
      { text: "เดินไปบอกเจ้าของร้านทันทีว่าเราเผลอชนจนกองสินค้าเอียง และช่วยจัดสินค้าคืนที่เดิม", textEn: "Go directly to the vendor, explain what happened, and help re-stack.", score: 4 },
      { text: "รีบประคองและจัดเรียงให้เข้าที่เดิมอย่างรวดเร็วด้วยตัวเอง แล้วเดินต่อไปเหมือนไม่มีอะไรเกิดขึ้น", textEn: "Quickly straighten the stack myself and move on without a word.", score: 3 },
      { text: "ช่วยจัดคืนที่เดิมเท่าที่ทำได้ แต่จะจดจำไว้เป็นบทเรียนว่าคราวหน้าต้องระวังพื้นที่แคบๆ มากกว่านี้", textEn: "Re-stack as best I can and note it as a lesson to be more careful next time.", score: 2 },
      { text: "ตกใจและกังวลมากจนไม่กล้าเข้าไปแตะต้อง รีบเดินเลี่ยงออกมาเพราะกลัวจะโดนตำหนิหรือทำพังกว่าเดิม", textEn: "Panic and walk away quickly — I'm too afraid of making it worse.", score: 1 },
    ],
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
      { text: "เก็บมาคิดมากจนหมดสนุก และอาจไม่มาร้านนี้อีก", textEn: "Overthink it for the rest of the trip and probably don't return.", score: 1 },
    ],
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
      { text: "ร้านมีของที่หลากหลายและมีความคิดสร้างสรรค์", textEn: "The stall has variety and surprising, creative offerings.", score: 1 },
    ],
  },
];

/* ===== Part 2: Cognitive & Logic Assessment (IQ Test - 10 questions) ===== */
const iqQuestions = [
  {
    category: "อนุกรมตัวเลข",
    categoryEn: "Number Series",
    q: "1. ตัวเลขถัดไปในอนุกรม 3, 7, 15, 31, 63, ... คือตัวเลขใด?",
    qEn: "1. What is the next number in the sequence 3, 7, 15, 31, 63, ...?",
    options: ["ก. 95", "ข. 126", "ค. 127", "ง. 129"],
    optionsEn: ["A. 95", "B. 126", "C. 127", "D. 129"],
    ans: 2,
    reason: "คูณ 2 แล้วบวก 1 ในแต่ละขั้น หรือผลต่างเพิ่มขึ้นทีละ 4, 8, 16, 32, 64 ดังนั้น 63 + 64 = 127",
    reasonEn: "Multiply by 2 and add 1 at each step; alternatively, the increments are 4, 8, 16, 32, 64, so 63 + 64 = 127.",
  },
  {
    category: "การคำนวณเชิงธุรกิจ",
    categoryEn: "Business Calculation",
    q: "2. สินค้าชิ้นหนึ่งลดราคา 20% จากราคาป้าย และขายไปในราคา 640 บาท อยากทราบว่าราคาเดิมก่อนลดราคาคือเท่าใด?",
    qEn: "2. An item is marked down by 20% from its original price and sold for 640 THB. What was the original price before the discount?",
    options: ["ก. 768 บาท", "ข. 780 บาท", "ค. 800 บาท", "ง. 840 บาท"],
    optionsEn: ["A. 768 THB", "B. 780 THB", "C. 800 THB", "D. 840 THB"],
    ans: 2,
    reason: "640 บาท คิดเป็น 80% ของราคาเดิม ดังนั้น ราคาเดิม = (640 × 100) / 80 = 800 บาท",
    reasonEn: "640 THB represents 80% of the original price; therefore, the original price = (640 × 100) / 80 = 800 THB.",
  },
  {
    category: "การให้เหตุผลเชิงตรรกะ",
    categoryEn: "Logical Reasoning",
    q: "3. กำหนดให้ \"พนักงานขายทุกคนเป็นคนพูดเก่ง\" และ \"สมชายเป็นคนพูดเก่ง\" ข้อสรุปใดถูกต้องและสมเหตุสมผลที่สุด?",
    qEn: "3. Given that \"all sales staff are articulate\" and \"Somchai is articulate,\" which of the following is the most accurate conclusion?",
    options: [
      "ก. สมชายเป็นพนักงานขายอย่างแน่นอน",
      "ข. สมชายไม่ได้เป็นพนักงานขาย",
      "ค. สมชายต้องทำงานที่บริษัทนี้",
      "ง. ไม่สามารถสรุปได้ว่าสมชายเป็นพนักงานขายหรือไม่",
    ],
    optionsEn: [
      "A. Somchai is definitely a sales employee.",
      "B. Somchai is not a sales employee.",
      "C. Somchai must work at this company.",
      "D. It cannot be concluded whether or not Somchai is a sales employee.",
    ],
    ans: 3,
    reason: "พนักงานขายเป็นเพียงหนึ่งในกลุ่มคนที่พูดเก่ง แต่คนที่พูดเก่งอาจทำอาชีพหรืออยู่แผนกอื่นก็ได้ จึงไม่สามารถสรุปได้",
    reasonEn: "Sales employees are just one group of people who are good at speaking; however, someone who is good at speaking could also work in a different profession or department.",
  },
  {
    category: "การวิเคราะห์ความสัมพันธ์ของคำ",
    categoryEn: "Analyzing Word Relationships",
    q: "4. ข้อใดมีความสัมพันธ์ของคู่คำในลักษณะเดียวกับ \"เข็มทิศ : ทิศทาง\"?",
    qEn: "4. Which option follows the same relationship as \"Compass : Direction\"?",
    options: [
      "ก. นาฬิกา : เวลา",
      "ข. เทอร์โมมิเตอร์ : ความร้อน",
      "ค. แผนที่ : การเดินทาง",
      "ง. ไม้บรรทัด : รูปทรง",
    ],
    optionsEn: [
      "A. Clock : Time",
      "B. Thermometer : Heat",
      "C. Map : Travel",
      "D. Ruler : Shape",
    ],
    ans: 0,
    reason: "เข็มทิศเป็นเครื่องมือสำหรับบอกทิศทาง เช่นเดียวกับนาฬิกาที่เป็นเครื่องมือบอกเวลา ส่วนเทอร์โมมิเตอร์ใช้วัดอุณหภูมิ ไม่ใช่ความร้อน",
    reasonEn: "A compass is a tool used to determine direction, just as a clock is a tool used to determine time. A thermometer, meanwhile, is used to measure \"temperature,\" not heat.",
  },
  {
    category: "การวิเคราะห์อัตราส่วนและเวลา",
    categoryEn: "Analyzing Ratios and Time",
    q: "5. หากเครื่องจักร 5 เครื่อง ผลิตสินค้าได้ 5 ชิ้น ในเวลา 5 นาที แล้วถ้ามีเครื่องจักร 50 เครื่อง จะใช้เวลากี่นาทีในการผลิตสินค้า 50 ชิ้น?",
    qEn: "5. If 5 machines can produce 5 items in 5 minutes, how many minutes will it take for 50 machines to produce 50 items?",
    options: ["ก. 1 นาที", "ข. 5 นาที", "ค. 10 นาที", "ง. 50 นาที"],
    optionsEn: ["A. 1 minute", "B. 5 minutes", "C. 10 minutes", "D. 50 minutes"],
    ans: 1,
    reason: "เครื่องจักร 1 เครื่อง ใช้เวลา 5 นาทีในการผลิต 1 ชิ้น ดังนั้นเมื่อเครื่องจักร 50 เครื่องทำงานพร้อมกันเพื่อผลิต 50 ชิ้น ก็ยังคงใช้เวลา 5 นาทีเท่าเดิม",
    reasonEn: "One machine takes 5 minutes to produce one item; therefore, if 50 machines work simultaneously to produce 50 items, it will still take 5 minutes.",
  },
  {
    category: "การจัดลำดับข้อมูล",
    categoryEn: "Sequencing Information",
    q: "6. ในการส่งงาน \"ก้อง ส่งงานช้ากว่า แพรว\", \"นนท์ ส่งงานเร็วกว่า ก้อง แต่ช้ากว่า ฟ้า\" และ \"แพรว ส่งงานช้ากว่า นนท์\" ใครเป็นผู้ส่งงานเป็นคนแรก?",
    qEn: "6. In a task submission, \"Kong submitted his work later than Praew,\" \"Non submitted his work earlier than Kong but later than Fah,\" and \"Praew submitted her work later than Non.\" Who submitted their work first?",
    options: ["ก. ก้อง", "ข. แพรว", "ค. นนท์", "ง. ฟ้า"],
    optionsEn: ["A. Kong", "B. Praew", "C. Non", "D. Fah"],
    ans: 3,
    reason: "เรียงลำดับการส่งงานจากเร็วที่สุดไปช้าที่สุด: ฟ้า -> นนท์ -> แพรว -> ก้อง ดังนั้น ฟ้า ส่งงานคนแรก",
    reasonEn: "Ordering the individuals by the speed at which they submitted their work—from fastest to slowest—gives: Fah -> Non -> Praew -> Kong.",
  },
  {
    category: "การคิดย้อนกลับ",
    categoryEn: "Reverse Thinking",
    q: "7. พนักงานคนหนึ่งได้รับมอบหมายให้บรรจุสินค้าลงกล่อง ทุกๆ 1 ชั่วโมง ปริมาณสินค้าที่บรรจุจะเพิ่มขึ้นเป็น 2 เท่าของชั่วโมงก่อนหน้า หลังผ่านไป 6 ชั่วโมง กล่องบรรจุเต็มพอดี อยากทราบว่าต้องใช้เวลากี่ชั่วโมงกล่องจึงจะมีสินค้าอยู่ครึ่งกล่อง?",
    qEn: "7. An employee is tasked with packing products into containers. Every hour, the amount packed doubles compared to the previous hour. After 6 hours, the container is completely full. How many hours did it take to fill the container halfway?",
    options: ["ก. 3 ชั่วโมง", "ข. 4 ชั่วโมง", "ค. 5 ชั่วโมง", "ง. 5.5 ชั่วโมง"],
    optionsEn: ["A. 3 hours", "B. 4 hours", "C. 5 hours", "D. 5.5 hours"],
    ans: 2,
    reason: "เนื่องจากปริมาณเพิ่มเป็น 2 เท่าทุกชั่วโมง ถ้าชั่วโมงที่ 6 เต็มกล่อง แสดงว่าชั่วโมงที่ 5 จะต้องมีสินค้าอยู่ครึ่งกล่อง",
    reasonEn: "Since the volume of work doubles every hour, if the container is full at the 6th hour, it must have been half-full at the 5th hour.",
  },
  {
    category: "การจำแนกความแตกต่าง",
    categoryEn: "Identifying Differences",
    q: "8. คำใดต่อไปนี้ ไม่เข้าพวก กับข้ออื่น?",
    qEn: "8. Which term does not fit with the others?",
    options: [
      "ก. กำไรสุทธิ (Net Profit)",
      "ข. รายได้รวม (Total Revenue)",
      "ค. ต้นทุนคงที่ (Fixed Cost)",
      "ง. ทัศนคติองค์กร (Corporate Attitude)",
    ],
    optionsEn: [
      "A. Net Profit",
      "B. Total Revenue",
      "C. Fixed Cost",
      "D. Corporate Attitude",
    ],
    ans: 3,
    reason: "ตัวเลือก A, B และ C เป็นตัวชี้วัดทางการเงินหรือการบัญชี ส่วนตัวเลือก D เกี่ยวข้องกับพฤติกรรมและวัฒนธรรมองค์กร",
    reasonEn: "Options A, B, and C are all financial or accounting metrics, whereas option D relates to behavior and organizational culture.",
  },
  {
    category: "คณิตศาสตร์ประยุกต์",
    categoryEn: "Applied Mathematics",
    q: "9. แผนกหนึ่งมีพนักงานทั้งหมด 30 คน มี 18 คนที่ชำนาญ Excel ขั้นสูง และมี 15 คนที่ชำนาญโปรแกรมตัดต่อวิดีโอ หากมีพนักงาน 5 คนที่ไม่ชำนาญทั้งสองโปรแกรมเลย มีพนักงานกี่คนที่ชำนาญทั้งสองโปรแกรม?",
    qEn: "9. A department has 30 employees in total. 18 employees are proficient in advanced Excel, and 15 are proficient in video editing software. If 5 employees are not proficient in either program, how many employees are proficient in both programs?",
    options: ["ก. 3 คน", "ข. 5 คน", "ค. 8 คน", "ง. 10 คน"],
    optionsEn: ["A. 3 people", "B. 5 people", "C. 8 people", "D. 10 people"],
    ans: 2,
    reason: "มีพนักงานที่ใช้โปรแกรมเป็น 30 - 5 = 25 คน ผลรวมของคนที่ใช้แต่ละโปรแกรมคือ 18 + 15 = 33 ดังนั้น คนที่ใช้เป็นทั้งสองโปรแกรมคือ 33 - 25 = 8 คน",
    reasonEn: "There are 30 - 5 = 25 employees who know how to use the programs. The total number of users for each program combined is 18 + 15 = 33. Therefore, the number of people who overlap—meaning they can use both programs—is 33 - 25 = 8.",
  },
  {
    category: "การจัดลำดับความสำคัญและเงื่อนไข",
    categoryEn: "Prioritization and Conditions",
    q: "10. คุณมี 4 งานที่ต้องทำให้เสร็จในวันนี้: งาน A (ใช้เวลา 2 ชม. ต้องส่งก่อนเที่ยง), งาน B (ใช้เวลา 1 ชม. เริ่มได้หลังจากงาน C เสร็จแล้วเท่านั้น), งาน C (ใช้เวลา 1 ชม. ไม่มีกำหนดส่งเจาะจง) และงาน D (ใช้เวลา 3 ชม. ต้องส่งก่อน 15:00 น.) หากเริ่มงาน 9:00 น. และพักเที่ยง 12:00 - 13:00 น. ลำดับการทำงานใดที่ทำให้ส่งงานได้ทันกำหนดทั้งหมด?",
    qEn: "10. You have 4 tasks to complete today: Task A (takes 2 hours, must be submitted before noon), Task B (takes 1 hour, can only be started after Task C is finished), Task C (takes 1 hour, no specific submission deadline), and Task D (takes 3 hours, must be submitted before 3:00 PM). If you begin working at 9:00 AM and take a lunch break from 12:00 PM to 1:00 PM, which sequence of tasks ensures that everything is submitted on time?",
    options: [
      "ก. A -> C -> พักเที่ยง -> D -> B",
      "ข. C -> B -> พักเที่ยง -> A -> D",
      "ค. A -> B -> พักเที่ยง -> D -> C",
      "ง. D -> พักเที่ยง -> A -> C -> B",
    ],
    optionsEn: [
      "A. A -> C -> Lunch -> D -> B",
      "B. C -> B -> Lunch -> A -> D",
      "C. A -> B -> Lunch -> D -> C",
      "D. D -> Lunch -> A -> C -> B",
    ],
    ans: 0,
    reason: "ช่วงเช้า 9:00 - 12:00 น. มีเวลา 3 ชม. ทำงาน A (2 ชม.) เสร็จก่อนเที่ยง จากนั้นทำงาน C (1 ชม.) จนถึงเที่ยง หลังพักเที่ยง 13:00 - 16:00 น. ทำงาน D (3 ชม.) ซึ่งจะเสร็จทันหรือส่งตามเงื่อนไข และสุดท้ายทำงาน B",
    reasonEn: "In the morning, from 9:00 AM to 12:00 PM, you have 3 hours available; Task A (2 hours) must be completed before noon. Then, move on to Task C (1 hour), which will take you up to noon. Afterward, from 1:00 PM to 4:00 PM, focus on completing Task D (3 hours) by the 3:00 PM/4:00 PM deadline, and finally, wrap things up with Task B.",
  },
];

/* ===== Part 3: Emotional Intelligence Assessment (EQ Test - 10 questions) ===== */
const eqQuestions = [
  {
    category: "การควบคุมอารมณ์และเปิดใจรับฟัง",
    categoryEn: "Self-Regulation & Openness",
    q: "1. หากคุณนำเสนอไอเดียในที่ประชุม แล้วถูกหัวหน้าหรือเพื่อนร่วมงานวิจารณ์อย่างตรงไปตรงมาว่า \"ไอเดียนี้ยังไม่น่าจะใช้ได้จริง\" คุณจะทำอย่างไร?",
    qEn: "1. If you present an idea in a meeting and your manager or colleague criticises it directly, saying \"this idea probably won't work in practice,\" what would you do?",
    options: [
      "ก. อธิบายโต้แย้งทันทีเพื่อปกป้องผลงานและชี้แจงว่าทำไมไอเดียนี้ถึงดีที่สุด",
      "ข. เงียบและยอมรับคำตัดสิน แต่รู้สึกหมดกำลังใจในการนำเสนอครั้งต่อไป",
      "ค. รับฟังด้วยความใจเย็น ขอบคุณสำหรับความคิดเห็น และสอบถามเพิ่มเติมว่าควรปรับปรุงจุดใดบ้าง",
      "ง. เปลี่ยนไปสนับสนุนไอเดียของคนอื่นแทนทันทีเพื่อหลีกเลี่ยงความขัดแย้งในที่ประชุม",
    ],
    optionsEn: [
      "A. Argue back immediately to defend your proposal and explain why it is the best idea.",
      "B. Stay silent and accept the verdict, but feel discouraged from presenting next time.",
      "C. Listen calmly, thank them for the feedback, and ask for specific suggestions on what can be improved.",
      "D. Immediately switch to supporting someone else's idea to avoid any conflict in the meeting.",
    ],
    ans: 2,
    reason: "วัดทักษะการควบคุมอารมณ์และการเปิดใจรับฟังความคิดเห็น (Self-Regulation & Openness)",
    reasonEn: "Measures self-regulation and openness to constructive feedback.",
  },
  {
    category: "การแก้ไขความขัดแย้งอย่างมีวุฒิภาวะ",
    categoryEn: "Conflict Resolution",
    q: "2. เมื่อเกิดความผิดพลาดในโปรเจกต์ที่ทำร่วมกันเป็นทีม แต่เพื่อนร่วมงานกลับโยนความผิดมาที่คุณคนเดียวต่อหน้าหัวหน้า คุณจะจัดการอย่างไร?",
    qEn: "2. When a mistake occurs in a team project, but a colleague shifts all the blame onto you in front of the manager, how do you handle it?",
    options: [
      "ก. โต้กลับทันทีในที่ประชุมเพื่อให้ทุกคนรู้ความจริงว่าเพื่อนร่วมงานคนนั้นก็ทำผิดเช่นกัน",
      "ข. ชี้แจงลำดับเหตุการณ์ตามข้อเท็จจริงอย่างสุภาพโดยไม่ใช้อารมณ์ และเสนอแนวทางแก้ไขปัญหาเฉพาะหน้าก่อน",
      "ค. ยอมรับผิดไปคนเดียวเพื่อให้เรื่องจบเร็วที่สุด แล้วค่อยไปต่อว่าเพื่อนร่วมงานหลังเลิกประชุม",
      "ง. ปฏิเสธความรับผิดชอบทั้งหมดและบอกให้หัวหน้าไปตรวจสอบหาคนผิดเอง",
    ],
    optionsEn: [
      "A. Counter-attack immediately in the meeting so everyone knows that the colleague also made mistakes.",
      "B. Politely clarify the factual timeline without getting emotional, and propose immediate solutions to resolve the issue first.",
      "C. Take all the blame alone just to end the discussion quickly, then confront the colleague after the meeting.",
      "D. Deny all responsibility entirely and tell the manager to investigate who is to blame.",
    ],
    ans: 1,
    reason: "วัดทักษะการแก้ไขความขัดแย้งอย่างมีวุฒิภาวะและการมุ่งเน้นการแก้ปัญหา (Conflict Resolution)",
    reasonEn: "Measures mature conflict resolution and focus on constructive solutions.",
  },
  {
    category: "การปรับตัวและการทำงานเป็นทีม",
    categoryEn: "Adaptability & Teamwork",
    q: "3. หากคุณต้องทำงานร่วมกับเพื่อนร่วมงานที่มีนิสัยและสไตล์การทำงานตรงข้ามกับคุณอย่างสิ้นเชิง คุณจะทำอย่างไรให้งานสำเร็จ?",
    qEn: "3. If you have to work with a colleague whose personality and work style are the exact opposite of yours, how do you ensure the project succeeds?",
    options: [
      "ก. ขอหัวหน้าเปลี่ยนตัวผู้ร่วมงานทันที เพราะทำงานด้วยกันไปก็ไม่มีความสุข",
      "ข. แบ่งงานกันทำแบบแยกขาดจากกัน เพื่อจะได้ไม่ต้องพูดคุยหรือประสานงานกัน",
      "ค. พยายามบังคับให้อีกฝ่ายปรับวิธีการทำงานให้เข้ากับมาตรฐานของคุณ",
      "ง. พูดคุยเพื่อทำความเข้าใจสไตล์การทำงานของกันและกัน และหาข้อตกลงร่วมกันโดยยึดเป้าหมายของงานเป็นหลัก",
    ],
    optionsEn: [
      "A. Immediately ask the manager to replace the partner, because working together would be unhappy.",
      "B. Divide the work strictly into silos so you don't have to talk or coordinate with each other.",
      "C. Try to force the other person to adjust their work method to match your standards.",
      "D. Communicate to understand each other's work styles and reach a shared agreement aligned with the project goals.",
    ],
    ans: 3,
    reason: "วัดทักษะการปรับตัวและการทำงานเป็นทีม (Adaptability & Teamwork)",
    reasonEn: "Measures adaptability and effective teamwork across diverse working styles.",
  },
  {
    category: "ความเห็นอกเห็นใจและการจัดลำดับความสำคัญ",
    categoryEn: "Empathy & Prioritization",
    q: "4. ขณะที่คุณกำลังเร่งทำงานสำคัญที่ต้องส่งภายในเย็นวันนี้ จู่ๆ มีเพื่อนร่วมงานเข้ามาขอความช่วยเหลือด่วนด้วยท่าทางหงุดหงิดและร้อนรน คุณจะรับมืออย่างไร?",
    qEn: "4. While rushing on an important task due this evening, a colleague suddenly approaches you in an agitated and flustered state asking for urgent help. How do you handle it?",
    options: [
      "ก. ปฏิเสธทันทีด้วยน้ำเสียงจริงจัง เพราะงานของตัวเองก็กำลังเร่งด่วนมากเช่นกัน",
      "ข. รับฟังปัญหาอย่างใจเย็น ประเมินความเร่งด่วน หากใช้เวลาไม่นานก็ช่วยชี้แนะทันที หรือหากต้องใช้เวลานานให้แจ้งเวลาที่สะดวกช่วยหลังจากส่งงานด่วนเสร็จ",
      "ค. ทิ้งงานสำคัญของตัวเองทันทีเพื่อไปช่วยงานของเพื่อนให้เสร็จก่อน เพราะกลัวเพื่อนโกรธ",
      "ง. บอกให้เพื่อนไปขอความช่วยเหลือจากคนอื่นแทนโดยไม่อธิบายเหตุผล",
    ],
    optionsEn: [
      "A. Immediately refuse in a stern tone because your own work is also very urgent.",
      "B. Calmly listen and assess urgency; if quick, give immediate guidance, or if time-consuming, specify when you can help after submitting your urgent task.",
      "C. Immediately abandon your own critical task to help your friend first, out of fear that they will be upset.",
      "D. Tell the colleague to ask someone else without providing any explanation.",
    ],
    ans: 1,
    reason: "วัดความเห็นอกเห็นใจผู้อื่นควบคู่กับการจัดลำดับความสำคัญ (Empathy & Prioritization)",
    reasonEn: "Measures empathy balanced with effective time and priority management.",
  },
  {
    category: "การตระหนักรู้ในตนเองและการจัดการความเครียด",
    categoryEn: "Self-Awareness & Stress Management",
    q: "5. เมื่อคุณรู้สึกเครียดสะสมหรือเหนื่อยล้าจากการทำงานหนักติดต่อกันหลายวัน คุณมักจะจัดการกับอารมณ์ของตัวเองอย่างไร?",
    qEn: "5. When experiencing accumulated stress or fatigue from intense work over several days, how do you manage your emotions?",
    options: [
      "ก. ระบายความหงุดหงิดใส่คนรอบข้างเพื่อให้รู้สึกโล่งขึ้น",
      "ข. เก็บกดความรู้สึกไว้คนเดียวและฝืนทำงานหนักต่อไปโดยไม่พัก",
      "ค. สังเกตอารมณ์ตัวเอง หาเวลาพักเบรกสั้นๆ เพื่อผ่อนคลาย และจัดลำดับงานใหม่หรือปรึกษาหัวหน้าหากงานเกินกำลัง",
      "ง. ลางานกะทันหันโดยไม่แจ้งล่วงหน้าเพื่อหนีไปพักผ่อน",
    ],
    optionsEn: [
      "A. Vent frustration onto people around you to relieve tension.",
      "B. Suppress your feelings and force yourself to keep pushing without taking a break.",
      "C. Notice your emotional state, take short relaxation breaks, re-prioritise tasks, and consult your manager if overloaded.",
      "D. Take sudden leave without advance notice to escape and rest.",
    ],
    ans: 2,
    reason: "วัดการตระหนักรู้ในตนเองและการจัดการความเครียด (Self-Awareness & Stress Management)",
    reasonEn: "Measures emotional self-awareness and healthy stress management techniques.",
  },
  {
    category: "ความเห็นอกเห็นใจและทักษะทางสังคม",
    categoryEn: "Empathy & Social Skill",
    q: "6. หากคุณสังเกตเห็นว่าเพื่อนร่วมงานที่เคยนั่งคุยสนุกสนาน ดูซึมเศร้า ทำงานผิดพลาดบ่อยขึ้น และแยกตัวออกจากกลุ่ม คุณจะทำอย่างไร?",
    qEn: "6. If you notice a colleague who used to be cheerful has become withdrawn, makes frequent mistakes, and isolates from the team, what would you do?",
    options: [
      "ก. ไม่เข้าไปยุ่งเพราะเป็นเรื่องส่วนตัว และตั้งใจทำงานของตัวเองต่อไป",
      "ข. นำเรื่องนี้ไปพูดคุยกับเพื่อนคนอื่นๆ ในแผนกว่าเกิดอะไรขึ้นกับเขา",
      "ค. แจ้งหัวหน้างานทันทีว่าเพื่อนคนนี้กำลังทำให้ประสิทธิภาพของทีมลดลง",
      "ง. หาจังหวะที่เหมาะสมเข้าไปถามไถ่ด้วยความห่วงใยเป็นการส่วนตัว และรับฟังโดยไม่ตัดสิน",
    ],
    optionsEn: [
      "A. Mind your own business as it is personal, and focus solely on your own work.",
      "B. Gossip about it with other colleagues in the department to guess what is wrong.",
      "C. Report immediately to the manager that this colleague is dragging down team productivity.",
      "D. Find an appropriate moment to check in privately with genuine care, listening without judgment.",
    ],
    ans: 3,
    reason: "วัดความเห็นอกเห็นใจและทักษะทางสังคม (Empathy & Social Skill)",
    reasonEn: "Measures interpersonal sensitivity, empathy, and constructive social skills.",
  },
  {
    category: "ความรับผิดชอบและการฟื้นตัวจากความผิดพลาด",
    categoryEn: "Accountability & Resilience",
    q: "7. หากคุณตรวจสอบพบว่าตนเองทำงานชิ้นสำคัญผิดพลาด และส่งผลกระทบต่อกำหนดการของทีม คุณจะทำอย่างไรเป็นอันดับแรก?",
    qEn: "7. If you discover that you made a mistake on an important task that affects the team's schedule, what is the very first thing you do?",
    options: [
      "ก. รีบแจ้งหัวหน้าและทีมตามความจริงทันที พร้อมเตรียมแนวทางแก้ไขเบื้องต้นไปเสนอด้วย",
      "ข. พยายามปกปิดความผิดพลาดและแอบแก้ไขด้วยตัวเองเงียบๆ จนกว่าจะมีคนจับได้",
      "ค. หาเหตุผลหรือปัจจัยแวดล้อมอื่นๆ มาอ้างเพื่อลดทอนความผิดของตัวเอง",
      "ง. รอให้หัวหน้าเป็นคนตรวจเจอเอง แล้วค่อยกล่าวคำขอโทษ",
    ],
    optionsEn: [
      "A. Promptly inform your manager and team with full transparency, bringing proposed solutions and recovery steps.",
      "B. Try to cover up the mistake and quietly fix it yourself until someone catches on.",
      "C. Find external excuses or environmental factors to downplay your responsibility.",
      "D. Wait for the manager to spot it themselves, then offer an apology.",
    ],
    ans: 0,
    reason: "วัดความรับผิดชอบและการฟื้นตัวจากความผิดพลาด (Accountability & Resilience)",
    reasonEn: "Measures personal accountability, transparency, and problem recovery resilience.",
  },
  {
    category: "ความยืดหยุ่นและทัศนคติเชิงบวก",
    categoryEn: "Flexibility & Growth Mindset",
    q: "8. เมื่อบริษัทประกาศนำระบบซอฟต์แวร์ใหม่เข้ามาใช้ ซึ่งทำให้คุณต้องเปลี่ยนวิธีการทำงานเดิมที่คุ้นเคยทั้งหมด คุณมีมุมมองและท่าทีอย่างไร?",
    qEn: "8. When the company introduces a new software system that requires completely changing your familiar workflows, what is your mindset and approach?",
    options: [
      "ก. รู้สึกต่อต้านและพยายามใช้วิธีเดิมต่อไปให้นานที่สุดเท่าที่จะทำได้",
      "ข. บ่นกับเพื่อนร่วมงานว่าระบบใหม่ยุ่งยากและเสียเวลาทำงาน",
      "ค. เปิดใจเรียนรู้ระบบใหม่ ตั้งใจฝึกฝน และมองว่าเป็นโอกาสในการพัฒนาทักษะและเพิ่มประสิทธิภาพระยะยาว",
      "ง. รอให้คนอื่นเรียนรู้จนคล่องก่อน แล้วค่อยให้เขามาช่วยทำส่วนของตัวเอง",
    ],
    optionsEn: [
      "A. Resist the change and try to stick with the old method as long as possible.",
      "B. Complain to colleagues that the new system is complicated and wastes working time.",
      "C. Keep an open mind, practice diligently, and view it as an opportunity to upskill and enhance long-term efficiency.",
      "D. Wait until others master it, then rely on them to do your portion.",
    ],
    ans: 2,
    reason: "วัดความยืดหยุ่นและทัศนคติเชิงบวกต่อการเปลี่ยนแปลง (Flexibility & Growth Mindset)",
    reasonEn: "Measures adaptability, willingness to learn, and growth mindset towards organizational change.",
  },
  {
    category: "ทักษะการสื่อสารเชิงบวก",
    categoryEn: "Effective Communication",
    q: "9. หากลูกค้า (หรือผู้ประสานงานต่างแผนก) ขอให้คุณช่วยทำงานบางอย่างที่อยู่นอกเหนือขอบเขตงานและขัดต่อระเบียบของบริษัท คุณจะสื่อสารอย่างไร?",
    qEn: "9. If a customer or a coordinator from another department asks you to perform an out-of-scope task that violates company policy, how do you communicate?",
    options: [
      "ก. ปฏิเสธทันทีอย่างเด็ดขาดว่า \"ทำไม่ได้เพราะผิดกฎบริษัท\" แล้ววางสายหรือเดินหนี",
      "ข. แสดงความเข้าใจในความต้องการของอีกฝ่าย อธิบายเหตุผลด้านระเบียบอย่างสุภาพ และเสนอทางเลือกอื่นที่ถูกต้องตามขั้นตอนให้แทน",
      "ค. ยอมทำให้เป็นกรณีพิเศษเพราะเกรงใจและไม่อยากเสียความสัมพันธ์",
      "ง. รับปากส่งๆ ไปก่อนเพื่อให้เขาสบายใจ แล้วค่อยหาข้ออ้างไม่ทำในภายหลัง",
    ],
    optionsEn: [
      "A. Bluntly refuse saying \"Cannot do that, it violates company policy\" and hang up or walk away.",
      "B. Acknowledge their need with understanding, politely explain policy reasons, and propose compliant alternative solutions.",
      "C. Give in and do it as a special exception out of fear of damaging the relationship.",
      "D. Agree insincerely to placate them in the moment, then find an excuse not to do it later.",
    ],
    ans: 1,
    reason: "วัดทักษะการสื่อสารเชิงบวกและการรักษาน้ำใจ (Effective Communication)",
    reasonEn: "Measures assertive communication, tact, and solution-oriented boundary setting.",
  },
  {
    category: "แรงจูงใจภายในและวุฒิภาวะทางอารมณ์",
    categoryEn: "Intrinsic Motivation & Maturity",
    q: "10. ในวันที่ทีมของคุณทำงานสำเร็จตามเป้าหมายใหญ่ แต่หัวหน้ากลับกล่าวชมเชยภาพรวมของทีมโดยไม่ได้เอ่ยชื่อคุณที่เป็นคนทำส่วนสำคัญ คุณจะรู้สึกและทำอย่างไร?",
    qEn: "10. On the day your team achieves a major milestone, but your manager praises the team as a whole without mentioning you personally despite your key contribution, how do you feel and react?",
    options: [
      "ก. รู้สึกโกรธและพูดแทรกกลางวงประชุมว่าตัวเองเป็นคนทำงานชิ้นนี้เกือบทั้งหมด",
      "ข. ร่วมยินดีกับความสำเร็จของทีมอย่างจริงใจ และภูมิใจในคุณค่าของงานที่ตนเองได้มีส่วนร่วมสร้างขึ้น",
      "ค. หมดไฟในการทำงาน และตั้งใจว่างานหน้าจะทำแค่พอผ่านเพราะทำดีไปก็ไม่มีคนเห็น",
      "ง. นำเรื่องนี้ไปนินทากับเพื่อนร่วมงานว่าหัวหน้าไม่ยุติธรรม",
    ],
    optionsEn: [
      "A. Feel enraged and interrupt the meeting to declare that you did almost all the work.",
      "B. Sincerely celebrate the team's success and take internal pride in the meaningful impact of your contribution.",
      "C. Lose all motivation and resolve to only do the bare minimum next time since effort goes unrecognized.",
      "D. Complain and gossip behind the manager's back that they are unfair.",
    ],
    ans: 1,
    reason: "วัดแรงจูงใจภายในตนเองและวุฒิภาวะทางอารมณ์ (Intrinsic Motivation & Maturity)",
    reasonEn: "Measures intrinsic motivation, maturity, and genuine team spirit over ego gratification.",
  },
];

function showPage(id) {
  ["landing", "profile", "assessment", "iqIntro", "iqAssessment", "eqIntro", "eqAssessment", "results"].forEach((pid) => {
    const el = $(pid);
    if (!el) return;
    el.classList.remove("is-active");
  });
  $(id)?.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  appData.currentIqQuestion = 0;
  appData.iqAnswers = [];
  appData.currentEqQuestion = 0;
  appData.eqAnswers = [];
  appData.preScore = 0;
  appData.iqScore = 0;
  appData.eqScore = 0;
  appData.resultText = "";
  appData.hrRecommendation = "";

  try {
    sessionStorage.setItem("tera_uuid", appData.uuid);
    sessionStorage.setItem("tera_name", name);
    sessionStorage.setItem("tera_position", position);
  } catch (err) {}

  showPage("assessment");
  renderQuestion();
});

function toggleErr(id, show) {
  const el = $(id);
  if (!el) return;
  el.classList.toggle("show", !!show);
}

/* ---------- Part 1: Assessment (Attitude) ---------- */
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
    score: picked.score,
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
  const hrStatus = total >= 14 ? "ผ่าน (เรียกสัมภาษณ์)" : total >= 10 ? "พิจารณาพิเศษ" : "ไม่ผ่าน";

  appData.resultText = result;
  appData.hrRecommendation = hrStatus;
  appData.preScore = total;

  try {
    sessionStorage.setItem("tera_preScore", String(total));
  } catch (e) {}

  // ส่งข้อมูลลง Sheet ส่วนที่ 1
  submitToSheet(total, hrStatus).catch((err) => console.error(err));

  // แสดงหน้าแนะนำแบบทดสอบ IQ
  showPage("iqIntro");
}

/* ---------- Part 2: IQ Test Logic ---------- */
$("btnStartIq")?.addEventListener("click", () => {
  appData.currentIqQuestion = 0;
  appData.iqAnswers = [];
  showPage("iqAssessment");
  renderIqQuestion();
});

function renderIqQuestion() {
  const q = iqQuestions[appData.currentIqQuestion];
  if (!q) return;

  const isEn = currentLang === "en";
  const t = i18n[currentLang];

  const pill = $("iqProgressPill");
  if (pill) pill.textContent = `${t.iqProgressPrefix || (isEn ? "Question " : "ข้อที่ ")}${appData.currentIqQuestion + 1}/${iqQuestions.length}`;

  const catPill = $("iqCategoryPill");
  if (catPill) catPill.textContent = isEn ? (q.categoryEn || q.category) : q.category;

  const qText = $("iqQuestionText");
  if (qText) qText.textContent = isEn ? (q.qEn || q.q) : q.q;

  const box = $("iqOptionsContainer");
  if (!box) return;
  box.innerHTML = "";

  const opts = isEn ? (q.optionsEn || q.options) : q.options;

  opts.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = escapeHtml_(optText);
    btn.addEventListener("click", () => pickIqAnswer(idx));
    box.appendChild(btn);
  });
}

function pickIqAnswer(idx) {
  const q = iqQuestions[appData.currentIqQuestion];
  if (!q) return;

  const box = $("iqOptionsContainer");
  const buttons = [...box.querySelectorAll(".option")];
  if (buttons.some((b) => b.disabled)) return;

  const isCorrect = (idx === q.ans);
  const isEn = currentLang === "en";
  const selectedText = isEn ? (q.optionsEn[idx] || q.options[idx]) : q.options[idx];

  appData.iqAnswers.push({
    category: q.category,
    question: q.q,
    selectedIndex: idx,
    text: selectedText,
    isCorrect: isCorrect,
  });

  buttons.forEach((b) => (b.disabled = true));
  buttons[idx].classList.add("selected");

  setTimeout(() => {
    if (appData.currentIqQuestion < iqQuestions.length - 1) {
      appData.currentIqQuestion++;
      renderIqQuestion();
    } else {
      finishIqAssessment();
    }
  }, 220);
}

function finishIqAssessment() {
  const totalIq = appData.iqAnswers.filter((a) => a.isCorrect).length;
  appData.iqScore = totalIq;

  try {
    sessionStorage.setItem("tera_iqScore", String(totalIq));
  } catch (e) {}

  let hrStatus = "ต้องพัฒนา";
  if (totalIq >= 8) {
    hrStatus = "ยอดเยี่ยม (เชาวน์ปัญญาและตรรกะระดับสูง)";
  } else if (totalIq >= 6) {
    hrStatus = "ดีมาก (ทักษะตรรกะและการวิเคราะห์ดี)";
  } else if (totalIq >= 4) {
    hrStatus = "ปานกลาง (พอใช้)";
  }

  // ส่งผลทดสอบ IQ เข้าสู่ Google Sheets (แท็บ "IQ")
  submitIqToSheet(totalIq, hrStatus).catch((err) => console.error(err));

  // แสดงหน้าแนะนำแบบทดสอบ EQ ต่อเนื่อง
  showPage("eqIntro");
}

/* ---------- Part 3: EQ Test Logic ---------- */
$("btnStartEq")?.addEventListener("click", () => {
  appData.currentEqQuestion = 0;
  appData.eqAnswers = [];
  showPage("eqAssessment");
  renderEqQuestion();
});

function renderEqQuestion() {
  const q = eqQuestions[appData.currentEqQuestion];
  if (!q) return;

  const isEn = currentLang === "en";
  const t = i18n[currentLang];

  const pill = $("eqProgressPill");
  if (pill) pill.textContent = `${t.eqProgressPrefix || (isEn ? "Question " : "ข้อที่ ")}${appData.currentEqQuestion + 1}/${eqQuestions.length}`;

  const catPill = $("eqCategoryPill");
  if (catPill) catPill.textContent = isEn ? (q.categoryEn || q.category) : q.category;

  const qText = $("eqQuestionText");
  if (qText) qText.textContent = isEn ? (q.qEn || q.q) : q.q;

  const box = $("eqOptionsContainer");
  if (!box) return;
  box.innerHTML = "";

  const opts = isEn ? (q.optionsEn || q.options) : q.options;

  opts.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = escapeHtml_(optText);
    btn.addEventListener("click", () => pickEqAnswer(idx));
    box.appendChild(btn);
  });
}

function pickEqAnswer(idx) {
  const q = eqQuestions[appData.currentEqQuestion];
  if (!q) return;

  const box = $("eqOptionsContainer");
  const buttons = [...box.querySelectorAll(".option")];
  if (buttons.some((b) => b.disabled)) return;

  const isCorrect = (idx === q.ans);
  const isEn = currentLang === "en";
  const selectedText = isEn ? (q.optionsEn[idx] || q.options[idx]) : q.options[idx];

  appData.eqAnswers.push({
    category: q.category,
    question: q.q,
    selectedIndex: idx,
    text: selectedText,
    isCorrect: isCorrect,
  });

  buttons.forEach((b) => (b.disabled = true));
  buttons[idx].classList.add("selected");

  setTimeout(() => {
    if (appData.currentEqQuestion < eqQuestions.length - 1) {
      appData.currentEqQuestion++;
      renderEqQuestion();
    } else {
      finishEqAssessment();
    }
  }, 220);
}

function finishEqAssessment() {
  const totalEq = appData.eqAnswers.filter((a) => a.isCorrect).length;
  appData.eqScore = totalEq;

  try {
    sessionStorage.setItem("tera_eqScore", String(totalEq));
  } catch (e) {}

  let hrStatus = "ต่ำกว่า 5 คะแนน (ควรสัมภาษณ์เชิงลึกเพิ่มเติม)";
  if (totalEq >= 8) {
    hrStatus = "8-10 คะแนน (ความฉลาดทางอารมณ์สูงมาก มีวุฒิภาวะในการทำงานเป็นทีม)";
  } else if (totalEq >= 5) {
    hrStatus = "5-7 คะแนน (ความฉลาดทางอารมณ์ปานกลาง ทำงานร่วมกับผู้อื่นได้ตามปกติ)";
  }

  // ส่งผลทดสอบ EQ เข้าสู่ Google Sheets (แท็บ "EQ")
  submitEqToSheet(totalEq, hrStatus).catch((err) => console.error(err));

  // แสดงหน้าผลลัพธ์พร้อมเลือกชุดข้อสอบประจำตำแหน่ง
  showPage("results");
  renderExamPicker_(appData.preScore, appData.iqScore, totalEq);
}

/* ---------- Departmental Exam Choices ---------- */
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
  { label: "วิศวกรเครื่องกล", labelEn: "Mechanical Engineer", url: "exam_Mechanical_engineer.html" },
  { label: "ช่างไฟฟ้า", labelEn: "Electrician", url: "exam-electrician.html" },
  { label: "วิศวกร", labelEn: "Engineer", url: "exam-engineer.html" },
  { label: "บริการ / Service", labelEn: "Service", url: "exam-service.html" },
  { label: "คลังสินค้า / Logistic", labelEn: "Warehouse / Logistics", url: "exam-warehouse-logistics.html" },
  { label: "โฟร์แมน / หัวหน้างาน", labelEn: "Foreman / Site Supervisor", url: "exam_foreman.html" },
  { label: "เจ้าหน้าที่การเงิน", labelEn: "Finance Officer", url: "exam-finance-officer.html" },
  { label: "ผู้จัดการฝ่ายขาย (Solar Roof)", labelEn: "Sales Manager (Solar Roof)", url: "exam-sales-solar-roof.html" },
  { label: "ผู้จัดการฝ่ายขาย (Solar Pump)", labelEn: "Sales Manager (Solar Pump)", url: "exam-sales-solar-pump.html" },
  { label: "พนักงานขับรถผู้บริหาร", labelEn: "Executive Driver", url: "exam_executive_driver.html" },
  { label: "ผู้จัดการฝ่ายบุคคล", labelEn: "HR Manager", url: "exam_hr_manager.html" },
  { label: "เจ้าหน้าที่ HR", labelEn: "HR Officer", url: "exam_hr_officer.html" },
  { label: "ผู้จัดการฝ่ายการตลาด", labelEn: "Marketing Manager", url: "exam-marketing-manager.html" },
  { label: "เจ้าหน้าที่กฎหมาย (In-house Legal)", labelEn: "In-house Legal", url: "exam_inhouse_legal.html" },
  { label: "จป.วิชาชีพ — งานสำนักงานและงานโครงการ", labelEn: "Safety Officer", url: "exam-safety-officer.html" },
];

function renderExamPicker_(preScore, iqScore, eqScore) {
  const holder = $("resultText");
  if (!holder) return;

  const t = i18n[currentLang];
  const finalPreScore = preScore !== undefined ? preScore : (appData.preScore || 0);
  const finalIqScore = iqScore !== undefined ? iqScore : (appData.iqScore || 0);
  const finalEqScore = eqScore !== undefined ? eqScore : (appData.eqScore || 0);

  const checkIconSvg = `<span class="status-icon green"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>`;
  const brainIconSvg = `<span class="status-icon gold"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 .66.15 1.28.4 1.84A5.5 5.5 0 0 0 4 13.5c0 2.2 1.3 4.1 3.2 5 .2 1.9 1.8 3.5 3.8 3.5h2c2 0 3.6-1.6 3.8-3.5 1.9-.9 3.2-2.8 3.2-5a5.5 5.5 0 0 0-3.9-5.16c.25-.56.4-1.18.4-1.84A4.5 4.5 0 0 0 12 2z"/></svg></span>`;
  const eqIconSvg = `<span class="status-icon blue"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></span>`;
  const docIconSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:10px; flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;

  const buttonsHtml = EXAM_CHOICES.map((x) => {
    const displayLabel = (currentLang === "en" && x.labelEn) ? x.labelEn : x.label;
    return `
      <button type="button" class="option" data-exam-url="${x.url}"
        style="width:100%; text-align:left; padding:12px 14px; border-radius:14px; display:flex; align-items:center;">
        ${docIconSvg} <span>${escapeHtml_(displayLabel)}</span>
      </button>
    `;
  }).join("");

  holder.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 16px; padding: 16px 20px; margin-bottom: 20px; text-align: left;">
      <div class="status-row">
        <div class="status-left">
          ${checkIconSvg}
          <span style="color:#2ecc71;">${t.examSaved}</span>
        </div>
      </div>
      <div class="status-row">
        <div class="status-left">
          ${brainIconSvg}
          <span style="color:#f1c40f;">${t.iqSaved}</span>
        </div>
        <span style="color:#fff; background:rgba(241, 196, 15, 0.2); border:1px solid rgba(241, 196, 15, 0.4); padding:2px 10px; border-radius:8px; font-weight:bold; font-size:0.9rem;">${finalIqScore}/10</span>
      </div>
      <div class="status-row">
        <div class="status-left">
          ${eqIconSvg}
          <span style="color:#5dade2;">${t.eqSaved}</span>
        </div>
        <span style="color:#fff; background:rgba(52, 152, 219, 0.2); border:1px solid rgba(52, 152, 219, 0.4); padding:2px 10px; border-radius:8px; font-weight:bold; font-size:0.9rem;">${finalEqScore}/10</span>
      </div>
    </div>
    <div style="line-height:1.65; margin-bottom:14px; text-align:center;">
      <strong style="font-size:1.1rem; color:#fff;">${t.examPickTitle}</strong><br/>
      <span style="opacity:.85; font-size:0.92rem;">${t.examPickDesc}</span>
    </div>
    <div id="examPickerBox" style="display:grid; gap:10px;">
      ${buttonsHtml}
    </div>
    <div id="examPickerHint" style="margin-top:12px; opacity:.85; font-size:.95rem; text-align:center;"></div>
  `;

  const box = $("examPickerBox");
  box?.addEventListener("click", (ev) => {
    const btn = ev.target?.closest?.("[data-exam-url]");
    if (!btn) return;
    [...box.querySelectorAll("[data-exam-url]")].forEach((b) => (b.disabled = true));
    btn.classList.add("selected");
    const url = btn.getAttribute("data-exam-url");
    const hint = $("examPickerHint");
    if (hint) hint.textContent = t.examRedirecting;
    const qs = new URLSearchParams({
      name: appData.profile.name || "",
      uuid: appData.uuid || "",
      preScore: String(finalPreScore || 0),
      iqScore: String(finalIqScore || 0),
      eqScore: String(finalEqScore || 0),
    });
    setTimeout(() => {
      window.location.href = `${url}?${qs.toString()}`;
    }, 400);
  });
}

function escapeHtml_(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ---------- Sheet Submissions ---------- */
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
      pageUrl: window.location.href,
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
      mode: "no-cors",
    });
  } catch (err) {
    console.error("[Error] ส่งข้อมูลทัศนคติ:", err);
  }
}

async function submitIqToSheet(totalScore, hrStatus) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR")) return;
  try {
    const payload = {
      targetTab: "IQ",
      uuid: appData.uuid || "",
      name: appData.profile.name || "",
      position: appData.profile.position || "",
      channel: appData.profile.channel || "",
      totalScore: String(totalScore),
      hrStatus: hrStatus,
      answersCount: "10",
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
    };

    for (let i = 1; i <= 10; i++) {
      const ans = appData.iqAnswers[i - 1];
      const q = iqQuestions[i - 1];
      payload[`q${i}_title`] = q ? q.q : "";
      payload[`q${i}_category`] = q ? q.category : "";
      payload[`q${i}_text`] = ans ? ans.text : "";
      payload[`q${i}_score`] = ans ? (ans.isCorrect ? "1" : "0") : "0";
    }

    const body = new URLSearchParams();
    Object.keys(payload).forEach((key) => body.append(key, payload[key]));

    fetch(SCRIPT_URL, {
      method: "POST",
      body: body,
      mode: "no-cors",
    });
  } catch (err) {
    console.error("[Error] ส่งข้อมูล IQ:", err);
  }
}

async function submitEqToSheet(totalScore, hrStatus) {
  if (!SCRIPT_URL || SCRIPT_URL.includes("PUT_YOUR")) return;
  try {
    const payload = {
      targetTab: "EQ",
      uuid: appData.uuid || "",
      name: appData.profile.name || "",
      position: appData.profile.position || "",
      channel: appData.profile.channel || "",
      totalScore: String(totalScore),
      hrStatus: hrStatus,
      answersCount: "10",
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
    };

    for (let i = 1; i <= 10; i++) {
      const ans = appData.eqAnswers[i - 1];
      const q = eqQuestions[i - 1];
      payload[`q${i}_title`] = q ? q.q : "";
      payload[`q${i}_category`] = q ? q.category : "";
      payload[`q${i}_text`] = ans ? ans.text : "";
      payload[`q${i}_score`] = ans ? (ans.isCorrect ? "1" : "0") : "0";
    }

    const body = new URLSearchParams();
    Object.keys(payload).forEach((key) => body.append(key, payload[key]));

    fetch(SCRIPT_URL, {
      method: "POST",
      body: body,
      mode: "no-cors",
    });
  } catch (err) {
    console.error("[Error] ส่งข้อมูล EQ:", err);
  }
}

/* ---------- Reset & Utils ---------- */
$("btnReset")?.addEventListener("click", () => {
  const nameInput = $("userName");
  if (nameInput) nameInput.value = "";
  const posInput = $("userPosition");
  if (posInput) posInput.value = "";
  const chanInput = $("userChannel");
  if (chanInput) chanInput.value = "";

  appData.currentQuestion = 0;
  appData.answers = [];
  appData.currentIqQuestion = 0;
  appData.iqAnswers = [];
  appData.currentEqQuestion = 0;
  appData.eqAnswers = [];
  appData.preScore = 0;
  appData.iqScore = 0;
  appData.eqScore = 0;
  appData.resultText = "";
  appData.hrRecommendation = "";

  try {
    sessionStorage.removeItem("tera_preScore");
    sessionStorage.removeItem("tera_iqScore");
    sessionStorage.removeItem("tera_eqScore");
    sessionStorage.removeItem("tera_uuid");
    sessionStorage.removeItem("tera_name");
  } catch (e) {}

  showPage("landing");
});

function genUUID_() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

window.goHome = function () {
  window.location.href = "index.html";
};

/* ---------- Initialization on load ---------- */
const params = new URLSearchParams(window.location.search);
const uuidParam = params.get("uuid");
if (uuidParam) {
  appData.uuid = uuidParam;
  appData.profile.name = params.get("name") || sessionStorage.getItem("tera_name") || "";
  const preScore = Number(params.get("preScore") || sessionStorage.getItem("tera_preScore") || 0);
  const iqScore = Number(params.get("iqScore") || sessionStorage.getItem("tera_iqScore") || 0);
  const eqScore = Number(params.get("eqScore") || sessionStorage.getItem("tera_eqScore") || 0);
  appData.preScore = preScore;
  appData.iqScore = iqScore;
  appData.eqScore = eqScore;
  showPage("results");
  renderExamPicker_(preScore, iqScore, eqScore);
} else {
  showPage("landing");
}
