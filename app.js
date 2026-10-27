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
    iqIntroTitle: "ส่วนที่ 2: การคิดเชิงเหตุผล (IQ Test)",
    iqIntroDesc: "จำนวน 20 ข้อ (เวลา 25 นาที) • วัดทักษะรูปแบบตัวเลข การคำนวณ ตรรกะ และการวิเคราะห์เงื่อนไขข้อมูล\n* ทำด้วยตนเอง สามารถใช้กระดาษทดได้ (ไม่ใช้เครื่องคิดเลข)",
    btnStartIq: "เริ่มทำแบบทดสอบ IQ (20 ข้อ)",
    iqProgressPrefix: "ข้อที่ ",
    // EQ Intro & Assessment
    eqIntroTitle: "ส่วนที่ 3: สถานการณ์ EQ ในที่ทำงาน (EQ Test)",
    eqIntroDesc: "จำนวน 12 ข้อ (เวลา 20 นาที) • ประเมินการตัดสินใจ วุฒิภาวะทางอารมณ์ และการทำงานร่วมกับผู้อื่น\n* เลือกวิธีตอบสนองที่เหมาะสมที่สุดตามข้อมูลที่ให้ในแต่ละสถานการณ์",
    btnStartEq: "เริ่มทำแบบทดสอบ EQ (12 ข้อ)",
    eqProgressPrefix: "ข้อที่ ",
    // Results
    resultHeading: "เตรียมตัวให้พร้อม!",
    // Exam Picker
    examSaved: "บันทึกข้อมูลทัศนคติเรียบร้อยแล้ว",
    iqSaved: "บันทึกผลทดสอบการคิดเชิงเหตุผล (IQ) เรียบร้อยแล้ว",
    eqSaved: "บันทึกผลทดสอบสถานการณ์ EQ เรียบร้อยแล้ว",
    examPickTitle: "กรุณาเลือกชุดข้อสอบประจำตำแหน่ง",
    examPickDesc: "โปรดเลือกชุดข้อสอบที่ตรงกับตำแหน่งที่คุณสมัคร เพื่อเข้าสู่ขั้นตอนการทำแบบทดสอบเฉพาะทาง",
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
    iqIntroTitle: "Part 2: Cognitive & Logical Reasoning (IQ Test)",
    iqIntroDesc: "20 Questions (25 Mins) • Number series, work calculation, logic & spatial direction, and data conditions.\n* Complete on your own; scratch paper allowed (no calculator).",
    btnStartIq: "Start IQ Test (20 Questions)",
    iqProgressPrefix: "Question ",
    // EQ Intro & Assessment
    eqIntroTitle: "Part 3: Workplace Situational EQ Assessment (EQ Test)",
    eqIntroDesc: "12 Situations (20 Mins) • Evaluates decision-making, emotional regulation, teamwork, and feedback adaptability.\n* Choose the most appropriate response for each given workplace scenario.",
    btnStartEq: "Start EQ Test (12 Questions)",
    eqProgressPrefix: "Question ",
    // Results
    resultHeading: "Get Ready!",
    // Exam Picker
    examSaved: "Attitude assessment data saved successfully",
    iqSaved: "Cognitive reasoning (IQ) test data saved successfully",
    eqSaved: "Workplace EQ situational data saved successfully",
    examPickTitle: "Please select the examination set for the position",
    examPickDesc: "Please choose the examination set that matches your applied position to continue.",
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
  const iqDesc = $("iqIntroDesc");
  if (iqDesc && t.iqIntroDesc) iqDesc.innerHTML = t.iqIntroDesc.replace(/\n/g, "<br/>");
  const btnStartIq = $("btnStartIq");
  if (btnStartIq) btnStartIq.textContent = t.btnStartIq;

  // EQ Intro
  const eqTitle = $("eqIntroTitle");
  if (eqTitle) eqTitle.textContent = t.eqIntroTitle;
  const eqDesc = $("eqIntroDesc");
  if (eqDesc && t.eqIntroDesc) eqDesc.innerHTML = t.eqIntroDesc.replace(/\n/g, "<br/>");
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

/* ===== Part 2: Cognitive & Logic Assessment (IQ Test - 20 questions) ===== */
const iqQuestions = [
  {
    category: "รูปแบบตัวเลข",
    categoryEn: "Number Series",
    q: "1. จำนวนถัดไปของ 3, 7, 11, 15, ... คือข้อใด",
    qEn: "1. What is the next number in the sequence 3, 7, 11, 15, ...?",
    options: ["ก. 17", "ข. 19", "ค. 20", "ง. 23"],
    optionsEn: ["A. 17", "B. 19", "C. 20", "D. 23"],
    ans: 1,
    reason: "เพิ่มครั้งละ 4 จึงได้ 15 + 4 = 19",
    reasonEn: "Increases by 4 each step: 15 + 4 = 19.",
  },
  {
    category: "รูปแบบตัวเลข",
    categoryEn: "Number Series",
    q: "2. จำนวนถัดไปของ 2, 6, 12, 20, 30, ... คือข้อใด",
    qEn: "2. What is the next number in the sequence 2, 6, 12, 20, 30, ...?",
    options: ["ก. 36", "ข. 38", "ค. 40", "ง. 42"],
    optionsEn: ["A. 36", "B. 38", "C. 40", "D. 42"],
    ans: 3,
    reason: "ผลต่างคือ 4, 6, 8, 10 และ 12 จึงได้ 30 + 12 = 42",
    reasonEn: "Differences are +4, +6, +8, +10, and +12; therefore, 30 + 12 = 42.",
  },
  {
    category: "รูปแบบตัวเลข",
    categoryEn: "Number Series",
    q: "3. จำนวนถัดไปของ 1, 2, 4, 7, 11, ... คือข้อใด",
    qEn: "3. What is the next number in the sequence 1, 2, 4, 7, 11, ...?",
    options: ["ก. 16", "ข. 15", "ค. 17", "ง. 22"],
    optionsEn: ["A. 16", "B. 15", "C. 17", "D. 22"],
    ans: 0,
    reason: "เพิ่ม 1, 2, 3, 4 และ 5 จึงได้ 11 + 5 = 16",
    reasonEn: "Increments are +1, +2, +3, +4, and +5; therefore, 11 + 5 = 16.",
  },
  {
    category: "รูปแบบตัวเลข",
    categoryEn: "Number Series",
    q: "4. จำนวนถัดไปของ 81, 27, 9, 3, ... คือข้อใด",
    qEn: "4. What is the next number in the sequence 81, 27, 9, 3, ...?",
    options: ["ก. 0", "ข. 2", "ค. 1", "ง. 6"],
    optionsEn: ["A. 0", "B. 2", "C. 1", "D. 6"],
    ans: 2,
    reason: "หารด้วย 3 ทุกครั้ง จึงได้ 3 ÷ 3 = 1",
    reasonEn: "Divided by 3 each step: 3 ÷ 3 = 1.",
  },
  {
    category: "รูปแบบตัวเลข",
    categoryEn: "Number Series",
    q: "5. จำนวนถัดไปของ 4, 9, 19, 39, ... คือข้อใด",
    qEn: "5. What is the next number in the sequence 4, 9, 19, 39, ...?",
    options: ["ก. 69", "ข. 79", "ค. 78", "ง. 89"],
    optionsEn: ["A. 69", "B. 79", "C. 78", "D. 89"],
    ans: 1,
    reason: "คูณ 2 แล้วบวก 1 ทุกครั้ง (หรือผลต่างเพิ่มเป็นสองเท่า: +5, +10, +20, +40) จึงได้ 39 + 40 = 79",
    reasonEn: "Multiply by 2 and add 1 at each step (or difference doubles: +5, +10, +20, +40), giving 39 + 40 = 79.",
  },
  {
    category: "คำนวณจากโจทย์งาน",
    categoryEn: "Work Calculation",
    q: "6. พนักงานแผนก ก ต่อแผนก ข มีอัตราส่วน 3 ต่อ 5 หากรวมกัน 64 คน แผนก ก มีกี่คน",
    qEn: "6. The ratio of staff in Department A to Department B is 3:5. If there are 64 staff in total, how many are in Department A?",
    options: ["ก. 20 คน", "ข. 32 คน", "ค. 24 คน", "ง. 40 คน"],
    optionsEn: ["A. 20 people", "B. 32 people", "C. 24 people", "D. 40 people"],
    ans: 2,
    reason: "64 ÷ 8 = 8 คนต่อส่วน แผนก ก มี 3 × 8 = 24 คน",
    reasonEn: "64 ÷ (3 + 5) = 8 people per part. Department A has 3 × 8 = 24 people.",
  },
  {
    category: "คำนวณจากโจทย์งาน",
    categoryEn: "Work Calculation",
    q: "7. สินค้าราคา 480 บาท ลดราคา 15% ต้องจ่ายกี่บาท โดยไม่มีค่าใช้จ่ายอื่น",
    qEn: "7. An item is priced at 480 THB and discounted by 15%. How much must be paid with no other expenses?",
    options: ["ก. 408 บาท", "ข. 420 บาท", "ค. 432 บาท", "ง. 465 บาท"],
    optionsEn: ["A. 408 THB", "B. 420 THB", "C. 432 THB", "D. 465 THB"],
    ans: 0,
    reason: "ส่วนลด 72 บาท จ่าย 480 - 72 = 408 บาท",
    reasonEn: "Discount is 480 × 0.15 = 72 THB. Final price = 480 - 72 = 408 THB.",
  },
  {
    category: "คำนวณจากโจทย์งาน",
    categoryEn: "Work Calculation",
    q: "8. เครื่องจักรเหมือนกัน 3 เครื่อง ผลิตได้รวม 90 ชิ้นใน 6 ชั่วโมง หากทุกเครื่องทำงานด้วยอัตราคงที่เท่ากัน 5 เครื่องใน 4 ชั่วโมงจะผลิตได้กี่ชิ้น",
    qEn: "8. 3 identical machines produce 90 pieces in 6 hours. At the same constant rate, how many pieces will 5 machines produce in 4 hours?",
    options: ["ก. 90 ชิ้น", "ข. 100 ชิ้น", "ค. 120 ชิ้น", "ง. 150 ชิ้น"],
    optionsEn: ["A. 90 pieces", "B. 100 pieces", "C. 120 pieces", "D. 150 pieces"],
    ans: 1,
    reason: "หนึ่งเครื่องผลิตได้ 90 ÷ (3 × 6) = 5 ชิ้นต่อชั่วโมง ดังนั้น 5 เครื่องใน 4 ชั่วโมง = 5 × 4 × 5 = 100 ชิ้น",
    reasonEn: "One machine produces 90 ÷ (3 × 6) = 5 pieces/hr. Therefore, 5 machines in 4 hours = 5 × 4 × 5 = 100 pieces.",
  },
  {
    category: "คำนวณจากโจทย์งาน",
    categoryEn: "Work Calculation",
    q: "9. วันแรกตรวจเอกสารได้ 12 ฉบับ วันที่สอง 18 ฉบับ หากต้องการค่าเฉลี่ย 3 วันเท่ากับวันละ 20 ฉบับ วันที่สามต้องตรวจได้กี่ฉบับ",
    qEn: "9. Day 1 reviewed 12 documents, Day 2 reviewed 18 documents. To achieve an average of 20 documents/day over 3 days, how many must be reviewed on Day 3?",
    options: ["ก. 20 ฉบับ", "ข. 24 ฉบับ", "ค. 28 ฉบับ", "ง. 30 ฉบับ"],
    optionsEn: ["A. 20 documents", "B. 24 documents", "C. 28 documents", "D. 30 documents"],
    ans: 3,
    reason: "ผลรวม 3 วันต้องได้ 3 × 20 = 60 ฉบับ วันที่สามคือ 60 - 12 - 18 = 30 ฉบับ",
    reasonEn: "Total required for 3 days = 3 × 20 = 60 documents. Day 3 = 60 - 12 - 18 = 30 documents.",
  },
  {
    category: "คำนวณจากโจทย์งาน",
    categoryEn: "Work Calculation",
    q: "10. สินค้ามีราคา 120 บาท เพิ่มราคา 25% แล้วลดจากราคาใหม่ 20% ราคาสุดท้ายเท่าใด",
    qEn: "10. An item is priced at 120 THB. The price is raised by 25%, and then discounted by 20% from the new price. What is the final price?",
    options: ["ก. 114 บาท", "ข. 118 บาท", "ค. 120 บาท", "ง. 126 บาท"],
    optionsEn: ["A. 114 THB", "B. 118 THB", "C. 120 THB", "D. 126 THB"],
    ans: 2,
    reason: "120 × 1.25 = 150 บาท จากนั้นลด 20% คือ 150 × 0.8 = 120 บาท",
    reasonEn: "120 × 1.25 = 150 THB. Then discounted 20%: 150 × 0.8 = 120 THB.",
  },
  {
    category: "ตรรกะและทิศทาง",
    categoryEn: "Logic & Direction",
    q: "11. กำหนดว่าเอกสารที่ติดป้ายด่วนทุกฉบับได้รับอนุมัติแล้ว และเอกสาร P ติดป้ายด่วน ข้อใดสรุปได้แน่นอน",
    qEn: "11. Given that all urgent-tagged documents are approved, and document P is tagged urgent, which conclusion is definitely true?",
    options: [
      "ก. เอกสารที่อนุมัติทุกฉบับติดป้ายด่วน",
      "ข. เอกสาร P ส่งถึงลูกค้าแล้ว",
      "ค. เอกสาร P ได้รับอนุมัติแล้ว",
      "ง. เอกสาร P เป็นฉบับเดียวที่ได้รับอนุมัติ",
    ],
    optionsEn: [
      "A. All approved documents are tagged urgent.",
      "B. Document P has been sent to the client.",
      "C. Document P is approved.",
      "D. Document P is the only approved document.",
    ],
    ans: 2,
    reason: "P อยู่ในกลุ่มเอกสารด่วน จึงได้รับอนุมัติตามเงื่อนไขที่ให้",
    reasonEn: "P is tagged urgent, so it is definitely approved according to the rule.",
  },
  {
    category: "ตรรกะและทิศทาง",
    categoryEn: "Logic & Direction",
    q: "12. ผู้ที่ผ่านหลักสูตร A ทุกคนผ่านหลักสูตร B คุณนิดไม่ผ่านหลักสูตร B ข้อใดสรุปได้แน่นอน",
    qEn: "12. Everyone who passes Course A passes Course B. Khun Nid did not pass Course B. Which conclusion is definitely true?",
    options: [
      "ก. คุณนิดไม่ผ่านหลักสูตร A",
      "ข. คุณนิดผ่านหลักสูตร A",
      "ค. ทุกคนที่ผ่าน B ต้องผ่าน A",
      "ง. ไม่มีใครผ่านทั้งสองหลักสูตร",
    ],
    optionsEn: [
      "A. Khun Nid did not pass Course A.",
      "B. Khun Nid passed Course A.",
      "C. Everyone who passes B must pass A.",
      "D. Nobody passed both courses.",
    ],
    ans: 0,
    reason: "ถ้าคุณนิดผ่าน A ต้องผ่าน B จึงขัดกับข้อมูลที่ไม่ผ่าน B (สรุปได้ว่าคุณนิดไม่ผ่านหลักสูตร A)",
    reasonEn: "If Khun Nid passed A she must pass B, which contradicts her not passing B; thus she did not pass A.",
  },
  {
    category: "ตรรกะและทิศทาง",
    categoryEn: "Logic & Direction",
    q: "13. ต้องทำงาน K ก่อน L ทำ M หลัง L และทำ N ก่อน K ลำดับใดทำได้ตามเงื่อนไขทั้งหมด",
    qEn: "13. Task K must precede L, task M comes after L, and task N comes before K. Which sequence satisfies all conditions?",
    options: ["ก. K, N, L, M", "ข. N, L, K, M", "ค. N, K, M, L", "ง. N, K, L, M"],
    optionsEn: ["A. K, N, L, M", "B. N, L, K, M", "C. N, K, M, L", "D. N, K, L, M"],
    ans: 3,
    reason: "ต้องเรียง N ก่อน K ก่อน L ก่อน M (N -> K -> L -> M)",
    reasonEn: "Order must satisfy N before K, K before L, and L before M (N -> K -> L -> M).",
  },
  {
    category: "ตรรกะและทิศทาง",
    categoryEn: "Logic & Direction",
    q: "14. กำหนดว่า ก สูงกว่า ข และ ข สูงกว่า ค ส่วน ง สูงกว่า ก ใครเตี้ยที่สุด",
    qEn: "14. Given that A is taller than B, B is taller than C, and D is taller than A. Who is the shortest?",
    options: ["ก. ก", "ข. ค", "ค. ข", "ง. ง"],
    optionsEn: ["A. A", "B. C", "C. B", "D. D"],
    ans: 1,
    reason: "เรียงจากสูงไปต่ำได้ ง > ก > ข > ค ดังนั้น ค เตี้ยที่สุด",
    reasonEn: "Ranking from tallest to shortest: D > A > B > C. Therefore, C is the shortest.",
  },
  {
    category: "ตรรกะและทิศทาง",
    categoryEn: "Logic & Direction",
    q: "15. เริ่มต้นที่จุดหนึ่ง หันหน้าไปทางเหนือ เลี้ยวขวาแล้วเดิน 10 เมตร จากนั้นเลี้ยวซ้ายเดิน 5 เมตร แล้วเลี้ยวซ้ายเดิน 10 เมตร จุดสุดท้ายอยู่ทิศใดจากจุดเริ่มต้น",
    qEn: "15. Starting facing North: turn right and walk 10 m, turn left and walk 5 m, then turn left and walk 10 m. In which direction is the final point from the start?",
    options: ["ก. ตะวันออก", "ข. ตะวันตก", "ค. เหนือ", "ง. ใต้"],
    optionsEn: ["A. East", "B. West", "C. North", "D. South"],
    ans: 2,
    reason: "การเดินตะวันออก 10 ม. และตะวันตก 10 ม. หักล้างกัน เหลืออยู่ทางทิศเหนือ 5 เมตร",
    reasonEn: "Walking 10m East and 10m West cancel out, leaving the final point 5m to the North.",
  },
  {
    category: "เงื่อนไขและข้อมูล",
    categoryEn: "Conditions & Data",
    q: "16. ส่งสินค้าได้ก็ต่อเมื่อจำนวนครบ รหัสถูก และปิดผนึกแล้ว กล่องหนึ่งจำนวนครบและรหัสถูก แต่ยังไม่ปิดผนึก ข้อใดถูกต้อง",
    qEn: "16. Goods can be dispatched only when quantity is complete, code is correct, and sealed. A box has complete quantity and correct code, but is not sealed. Which statement is correct?",
    options: [
      "ก. ส่งได้เพราะจำนวนครบ",
      "ข. ส่งได้เพราะรหัสถูก",
      "ค. ส่งได้หากใกล้หมดเวลางาน",
      "ง. ยังส่งไม่ได้ตามเงื่อนไข",
    ],
    optionsEn: [
      "A. Can be dispatched because quantity is complete.",
      "B. Can be dispatched because code is correct.",
      "C. Can be dispatched if work hours are almost over.",
      "D. Cannot be dispatched yet according to conditions.",
    ],
    ans: 3,
    reason: "ต้องครบทั้งสามเงื่อนไข แต่ยังขาดการปิดผนึก จึงยังส่งไม่ได้ตามเงื่อนไข",
    reasonEn: "All three conditions must be satisfied, but sealing is missing. It cannot be dispatched yet.",
  },
  {
    category: "เงื่อนไขและข้อมูล",
    categoryEn: "Conditions & Data",
    q: "17. รหัสต้นฉบับคือ TP-6408-K9 ตัวเลือกใดตรงกับต้นฉบับทุกตัว",
    qEn: "17. The original code is TP-6408-K9. Which option matches the original exactly in every character?",
    options: ["ก. TP-6408-K9", "ข. TP-640B-K9", "ค. TP-6048-K9", "ง. TP-6408-K6"],
    optionsEn: ["A. TP-6408-K9", "B. TP-640B-K9", "C. TP-6048-K9", "D. TP-6408-K6"],
    ans: 0,
    reason: "ก ตรงทุกตำแหน่ง ตัวเลือกอื่นเปลี่ยนตัวเลขหรือตัวอักษร",
    reasonEn: "Option A matches every character; other options modify digits or letters.",
  },
  {
    category: "เงื่อนไขและข้อมูล",
    categoryEn: "Conditions & Data",
    q: "18. จากข้อมูลด้านล่าง ทีมใดมีอัตรางานเสร็จต่อจำนวนงานที่ได้รับสูงที่สุด\n(ทีม ก: ได้รับ 24 เสร็จ 18 | ทีม ข: ได้รับ 40 เสร็จ 24 | ทีม ค: ได้รับ 28 เสร็จ 21 | ทีม ง: ได้รับ 20 เสร็จ 16)",
    qEn: "18. Based on the data below, which team has the highest completion rate (completed / received)?\n(Team A: Received 24, Completed 18 | Team B: Received 40, Completed 24 | Team C: Received 28, Completed 21 | Team D: Received 20, Completed 16)",
    options: ["ก. ทีม ก", "ข. ทีม ข", "ค. ทีม ค", "ง. ทีม ง"],
    optionsEn: ["A. Team A", "B. Team B", "C. Team C", "D. Team D"],
    ans: 3,
    reason: "อัตราคือ ทีม ก 75%, ข 60%, ค 75% และ ง 80% ตามลำดับ ทีม ง มีอัตราสูงสุด",
    reasonEn: "Completion rates: A = 75%, B = 60%, C = 75%, D = 80%. Team D is highest.",
  },
  {
    category: "เงื่อนไขและข้อมูล",
    categoryEn: "Conditions & Data",
    q: "19. กล่องหนึ่งใส่แฟ้มได้ไม่เกิน 8 แฟ้ม มีแฟ้ม 53 แฟ้ม ต้องใช้กล่องอย่างน้อยกี่กล่อง",
    qEn: "19. A box can hold at most 8 folders. With 53 folders, what is the minimum number of boxes needed?",
    options: ["ก. 6 กล่อง", "ข. 7 กล่อง", "ค. 8 กล่อง", "ง. 9 กล่อง"],
    optionsEn: ["A. 6 boxes", "B. 7 boxes", "C. 8 boxes", "D. 9 boxes"],
    ans: 1,
    reason: "6 กล่องใส่ได้เพียง 48 แฟ้ม จึงต้องใช้กล่องที่ 7 (53 ÷ 8 = 6.625 จึงต้องใช้ 7 กล่อง)",
    reasonEn: "6 boxes can hold at most 48 folders, so 7 boxes are required (ceil(53/8) = 7).",
  },
  {
    category: "เงื่อนไขและข้อมูล",
    categoryEn: "Conditions & Data",
    q: "20. ข้อมูล 4 จำนวนมีค่าเฉลี่ย 25 เมื่อตัดจำนวน 40 ออก ค่าเฉลี่ยของ 3 จำนวนที่เหลือเท่าใด",
    qEn: "20. The average of 4 numbers is 25. If the number 40 is removed, what is the average of the remaining 3 numbers?",
    options: ["ก. 20", "ข. 22", "ค. 25", "ง. 30"],
    optionsEn: ["A. 20", "B. 22", "C. 25", "D. 30"],
    ans: 0,
    reason: "ผลรวมเดิม 4 × 25 = 100 เมื่อตัด 40 เหลือ 60 หาร 3 = 20",
    reasonEn: "Original sum = 4 × 25 = 100. Removing 40 leaves 60. 60 ÷ 3 = 20.",
  },
];

/* ===== Part 3: Emotional Intelligence Assessment (EQ Test - 12 questions) ===== */
const eqQuestions = [
  {
    category: "ควบคุมอารมณ์และจัดการความกังวล",
    categoryEn: "Emotional Control & Anxiety Management",
    q: "1. เพื่อนร่วมงานวิจารณ์งานของคุณในกลุ่มแชต คุณเริ่มโกรธ แต่เรื่องนี้ไม่มีเหตุฉุกเฉิน คุณควรทำอย่างไร?",
    qEn: "1. A colleague criticises your work in a group chat. You start to feel angry, but there is no emergency. What should you do?",
    options: [
      "ก. ชี้แจงทุกประเด็นในกลุ่มทันทีเพื่อให้คนอื่นเข้าใจมุมของคุณ",
      "ข. พักตั้งสติ ตรวจข้อเท็จจริง แล้วคุยกับผู้เกี่ยวข้องเพื่อหาทางแก้",
      "ค. ขอหัวหน้าช่วยประสานการพูดคุย เพราะคุณยังคุยโดยสงบไม่ได้",
      "ง. หยุดตอบเรื่องงานกับเพื่อนคนนั้นตลอดวันโดยไม่แจ้งเหตุผล",
    ],
    optionsEn: [
      "A. Clarify every point in the group chat immediately so others understand your perspective.",
      "B. Pause to regain composure, check facts, and then talk with the relevant person to find a solution.",
      "C. Ask your manager to mediate because you cannot yet discuss it calmly.",
      "D. Stop responding to that colleague on work matters for the rest of the day without giving a reason.",
    ],
    scores: [1, 3, 2, 0],
    bestChoice: 1,
    ans: 1,
    reason: "หยุดปฏิกิริยาทันทีและกลับไปแก้ปัญหาด้วยข้อเท็จจริง (คำถามสัมภาษณ์ต่อ: ขอให้ยกตัวอย่างวิธีตั้งสติก่อนตอบข้อความที่ทำให้โกรธ)",
    reasonEn: "Pause reactive impulses and return to problem-solving with facts. (Follow-up: Ask for an example of how you compose yourself before responding to an angering message).",
  },
  {
    category: "ควบคุมอารมณ์และจัดการความกังวล",
    categoryEn: "Emotional Control & Anxiety Management",
    q: "2. ลูกค้าพูดด้วยน้ำเสียงรุนแรงระหว่างโทรศัพท์ คุณรู้สึกว่ากำลังจะขึ้นเสียง และมีเพื่อนร่วมงานพร้อมช่วย คุณควรทำอย่างไร?",
    qEn: "2. A customer speaks in an aggressive tone during a phone call. You feel you are about to raise your voice, and a colleague is available to help. What should you do?",
    options: [
      "ก. คุยต่อด้วยน้ำเสียงแข็งขึ้นเพื่อให้ลูกค้าหยุดพูดแทรก",
      "ข. จบสายทันที แล้วรอให้ลูกค้าติดต่อกลับมาเองเมื่อใจเย็น",
      "ค. ขอส่งต่อให้เพื่อนช่วยรับสาย แล้วติดตามปัญหากับเพื่อนภายหลัง",
      "ง. ขอพักสายสั้น ๆ ตั้งสติ แล้วกลับมาทวนปัญหาและขั้นตอนช่วยเหลือ",
    ],
    optionsEn: [
      "A. Continue talking in a firmer tone to make the customer stop interrupting.",
      "B. End the call immediately and wait for the customer to call back when calm.",
      "C. Ask to hand the call over to your colleague and follow up on the issue with them later.",
      "D. Ask to place the call on a brief hold to compose yourself, then return to review the issue and steps to assist.",
    ],
    scores: [0, 1, 2, 3],
    bestChoice: 3,
    ans: 3,
    reason: "จัดการอารมณ์ตนเองและดูแลความต่อเนื่องของการช่วยลูกค้า (คำถามสัมภาษณ์ต่อ: ถามว่าหากยังควบคุมน้ำเสียงไม่ได้ จะส่งต่องานอย่างไร)",
    reasonEn: "Manage your own emotions while maintaining continuity in helping the customer. (Follow-up: Ask how they would hand over the task if they still could not regulate their tone).",
  },
  {
    category: "ควบคุมอารมณ์และจัดการความกังวล",
    categoryEn: "Emotional Control & Anxiety Management",
    q: "3. คุณพบตัวเลขผิดในเอกสารที่ส่งให้ลูกค้าแล้ว แต่ลูกค้ายังไม่ได้ใช้งาน คุณรู้สึกกังวลว่าจะถูกตำหนิ คุณควรทำอย่างไร?",
    qEn: "3. You discover incorrect numbers in a document already sent to a client, but the client has not used it yet. You feel anxious about being blamed. What should you do?",
    options: [
      "ก. รีบแจ้งจุดผิด ส่งฉบับแก้ไข และทบทวนขั้นตอนตรวจเพื่อป้องกันซ้ำ",
      "ข. แก้ไฟล์ที่แชร์ไว้เงียบ ๆ โดยไม่แจ้งผู้ที่ได้รับฉบับเดิม",
      "ค. ขอหัวหน้าช่วยแจ้งและแก้ไขกับลูกค้า แต่ยังไม่ทบทวนสาเหตุ",
      "ง. รอให้ลูกค้าถามก่อน แล้วจึงอธิบายว่าข้อมูลผิดตรงไหน",
    ],
    optionsEn: [
      "A. Promptly notify them of the error, send the revised version, and review checking procedures to prevent recurrence.",
      "B. Quietly edit the shared file without informing those who received the original version.",
      "C. Ask your manager to notify and correct it with the client, but not yet review the root cause.",
      "D. Wait until the client asks, and only then explain where the data was incorrect.",
    ],
    scores: [3, 1, 2, 0],
    bestChoice: 0,
    ans: 0,
    reason: "ยอมรับความกังวลแต่ยังจัดการผลกระทบและป้องกันความผิดซ้ำ (คำถามสัมภาษณ์ต่อ: ถามถึงเหตุการณ์ที่ยอมรับความผิดพลาดและสิ่งที่เปลี่ยนหลังจากนั้น)",
    reasonEn: "Acknowledge anxiety while actively mitigating impact and preventing recurring mistakes. (Follow-up: Ask for an incident where they admitted a mistake and what changed afterwards).",
  },
  {
    category: "เข้าใจผู้อื่นและสื่อสาร",
    categoryEn: "Empathy & Communication",
    q: "4. ลูกค้าร้องเรียนว่าสินค้ามาช้า คุณยังไม่ทราบเวลาส่งที่ยืนยันได้ และไม่มีอำนาจรับปากวันส่งใหม่ คุณควรทำอย่างไร?",
    qEn: "4. A customer complains that an order is delayed. You do not yet have a confirmed delivery time and lack authority to promise a new date. What should you do?",
    options: [
      "ก. รับปากว่าจะส่งพรุ่งนี้ เพื่อให้ลูกค้ารู้สึกสบายใจก่อน",
      "ข. ส่งเบอร์คลังสินค้าให้ลูกค้าตามเรื่องเอง โดยไม่ติดตามต่อ",
      "ค. รับฟังผลกระทบ ตรวจสถานะ และตกลงเวลาที่จะกลับมาอัปเดต",
      "ง. ขอโทษและเริ่มตรวจสถานะ แต่ยังไม่บอกว่าจะอัปเดตเมื่อใด",
    ],
    optionsEn: [
      "A. Promise that it will be delivered tomorrow just to make the customer feel reassured first.",
      "B. Give the warehouse phone number to the customer to follow up on their own, without further tracking.",
      "C. Listen to their impact, check the status, and agree on a specific time to follow up with an update.",
      "D. Apologise and start checking status, but without stating when you will provide an update.",
    ],
    scores: [0, 1, 3, 2],
    bestChoice: 2,
    ans: 2,
    reason: "รับฟังความเดือดร้อนและให้ความคืบหน้าที่ทำได้จริง (คำถามสัมภาษณ์ต่อ: ถามว่าจะสื่อสารอย่างไรเมื่อยังตอบวันส่งที่แน่นอนไม่ได้)",
    reasonEn: "Listen empathetically to their hardship and provide actionable, realistic progress. (Follow-up: Ask how they communicate when a definite delivery date cannot yet be given).",
  },
  {
    category: "เข้าใจผู้อื่นและสื่อสาร",
    categoryEn: "Empathy & Communication",
    q: "5. เพื่อนร่วมงานเงียบลงและส่งงานช้ากว่าปกติหนึ่งครั้ง คุณยังไม่รู้สาเหตุ และงานส่วนถัดไปต้องรอเขา คุณควรเริ่มอย่างไร?",
    qEn: "5. A colleague becomes quiet and submits work later than usual once. You don't know the cause, and the next step depends on them. How should you begin?",
    options: [
      "ก. คุยเป็นการส่วนตัว ถามอุปสรรค รับฟัง และตกลงเวลาติดตามงาน",
      "ข. ขอหัวหน้าช่วยตรวจภาระงานของเพื่อน โดยยังไม่ได้คุยกับเพื่อน",
      "ค. ส่งข้อความเร่งให้ส่งตามกำหนด โดยยังไม่ถามว่าติดขัดอะไร",
      "ง. บอกทีมว่าเพื่อนไม่รับผิดชอบ เพื่อให้ทุกคนช่วยกันกดดัน",
    ],
    optionsEn: [
      "A. Speak privately, inquire about obstacles, listen actively, and agree on a follow-up time.",
      "B. Ask the manager to check the colleague's workload without speaking to the colleague first.",
      "C. Send an urgent reminder to submit on time without asking what difficulties they face.",
      "D. Tell the team that the colleague is irresponsible so everyone can apply pressure together.",
    ],
    scores: [3, 2, 1, 0],
    bestChoice: 0,
    ans: 0,
    reason: "ตรวจสอบสาเหตุโดยไม่ด่วนตัดสิน พร้อมคงความชัดเจนเรื่องงาน (คำถามสัมภาษณ์ต่อ: ถามว่าจะทำอย่างไรหากรับฟังแล้วแต่เพื่อนยังส่งงานล่าช้า)",
    reasonEn: "Investigate root causes without jumping to conclusions while maintaining work clarity. (Follow-up: Ask what they would do if after listening, the colleague still delays submission).",
  },
  {
    category: "เข้าใจผู้อื่นและสื่อสาร",
    categoryEn: "Empathy & Communication",
    q: "6. หัวหน้าสั่งงานที่ยังไม่ชัดเรื่องผลลัพธ์และวันส่ง หัวหน้าพร้อมให้ถาม คุณควรทำอย่างไร?",
    qEn: "6. Your manager assigns a task where deliverables and deadlines are unclear, but the manager is open to questions. What should you do?",
    options: [
      "ก. ตีความเองและเริ่มทำทั้งหมดทันที เพื่อไม่เสียเวลาถาม",
      "ข. ปฏิเสธการเริ่มงานจนกว่าจะได้คำสั่งเป็นเอกสารครบทุกเรื่อง",
      "ค. ถามเพื่อนที่เคยทำแล้วเริ่มตามคำแนะนำ โดยยังไม่ยืนยันกับหัวหน้า",
      "ง. ทวนเป้าหมาย ถามข้อมูลที่ขาด และยืนยันสิ่งส่งมอบกับกำหนดเวลา",
    ],
    optionsEn: [
      "A. Interpret it yourself and start doing everything immediately to avoid wasting time asking.",
      "B. Refuse to begin until complete written instructions are received for all aspects.",
      "C. Ask a colleague who previously did it and follow their advice without confirming with the manager.",
      "D. Clarify the goals, ask for missing information, and confirm deliverables and timeline.",
    ],
    scores: [1, 0, 2, 3],
    bestChoice: 3,
    ans: 3,
    reason: "ตรวจสอบความเข้าใจร่วมก่อนลงแรงทำงานที่อาจคลาดเคลื่อน (คำถามสัมภาษณ์ต่อ: ขอให้สาธิตประโยคทวนงานเมื่อคำสั่งยังไม่ชัดเจน)",
    reasonEn: "Align shared understanding before investing effort into misaligned work. (Follow-up: Request a demonstration of how they clarify requirements when instructions are vague).",
  },
  {
    category: "ร่วมงานและรับผิดชอบผลกระทบ",
    categoryEn: "Collaboration & Accountability",
    q: "7. คุณกับเพื่อนเสนอวิธีทำงานคนละแบบ ทั้งคู่ต้องการให้งานสำเร็จและยังมีเวลาตกลงกัน คุณควรทำอย่างไร?",
    qEn: "7. You and a colleague propose different approaches to a task. Both want the project to succeed and there is still time to reach an agreement. What should you do?",
    options: [
      "ก. ให้ทีมโหวตเลือกวิธีหนึ่งทันที โดยไม่ต้องคุยเหตุผลเพิ่มเติม",
      "ข. เปรียบเทียบข้อมูลตามเกณฑ์เดียวกัน แล้วตกลงวิธีหรือทดลองสั้น ๆ",
      "ค. สรุปทางเลือกและเหตุผลให้หัวหน้าช่วยตัดสินแทนทั้งสองฝ่าย",
      "ง. ยืนยันใช้วิธีของคุณต่อไป เพราะคุณเป็นคนเริ่มงานชิ้นนี้",
    ],
    optionsEn: [
      "A. Have the team vote immediately to choose one method without further discussing rationale.",
      "B. Compare data against shared criteria, then agree on a method or run a brief trial.",
      "C. Summarize options and rationale for the manager to decide on behalf of both sides.",
      "D. Insist on using your method because you initiated this task.",
    ],
    scores: [1, 3, 2, 0],
    bestChoice: 1,
    ans: 1,
    reason: "ใช้เกณฑ์งานร่วมกันแทนการเอาชนะ และเปิดพื้นที่ให้ตรวจสอบวิธี (คำถามสัมภาษณ์ต่อ: ถามว่าจะทำอย่างไรหากข้อมูลทดลองสนับสนุนวิธีของเพื่อน)",
    reasonEn: "Use objective work criteria rather than competing to win, allowing methods to be tested. (Follow-up: Ask what they would do if trial data supported their colleague's method).",
  },
  {
    category: "ร่วมงานและรับผิดชอบผลกระทบ",
    categoryEn: "Collaboration & Accountability",
    q: "8. คุณรับช่วงงานที่ข้อมูลไม่ครบ ต้องส่งให้ลูกค้าในอีก 2 ชั่วโมง และเจ้าของงานเดิมยังติดต่อได้ คุณควรเริ่มอย่างไร?",
    qEn: "8. You take over a task with incomplete information that must be delivered to a client in 2 hours, and the original owner is still reachable. How should you begin?",
    options: [
      "ก. รับไปทำให้เสร็จคนเดียวโดยไม่แจ้งข้อมูลที่ขาดหรือความเสี่ยง",
      "ข. ส่งงานกลับทันที แล้วรอเจ้าของเดิมแก้ทั้งหมดก่อนจึงเริ่ม",
      "ค. ระบุข้อมูลที่ขาด ติดต่อเจ้าของเดิม และตกลงผู้รับผิดชอบกับเวลา",
      "ง. สรุปข้อมูลที่ขาดให้หัวหน้าช่วยประสาน โดยยังไม่คุยกับเจ้าของเดิม",
    ],
    optionsEn: [
      "A. Take on completing it alone without highlighting missing details or risks.",
      "B. Reject and send the task back immediately, waiting for the original owner to fix everything before starting.",
      "C. Identify missing information, contact the original owner, and agree on responsibilities and timeline.",
      "D. Summarize missing information for the manager to coordinate without speaking to the original owner first.",
    ],
    scores: [1, 0, 3, 2],
    bestChoice: 2,
    ans: 2,
    reason: "ประสานกับผู้มีข้อมูลโดยตรงและกำหนดการส่งต่องานให้ชัด (คำถามสัมภาษณ์ต่อ: ถามถึงวิธีส่งต่องานที่ทำให้ผู้รับคนถัดไปเริ่มต่อได้จริง)",
    reasonEn: "Coordinate directly with the source of information and establish clear handover agreements. (Follow-up: Ask how they ensure work handovers enable the next recipient to execute smoothly).",
  },
  {
    category: "ร่วมงานและรับผิดชอบผลกระทบ",
    categoryEn: "Collaboration & Accountability",
    q: "9. คุณประเมินแล้วว่างานที่ครบกำหนดพรุ่งนี้มีโอกาสไม่ทัน และจะกระทบทีมอื่น คุณควรทำอย่างไร?",
    qEn: "9. You evaluate that a task due tomorrow is likely to miss the deadline and will impact other teams. What should you do?",
    options: [
      "ก. ทำต่อก่อนจนใกล้กำหนด แล้วค่อยแจ้งหากยังไม่เสร็จ",
      "ข. บอกว่าทีมอื่นส่งข้อมูลช้า ทั้งที่ยังไม่ได้ตรวจสอบสาเหตุ",
      "ค. แจ้งหัวหน้าถึงความเสี่ยงและขอความช่วยเหลือ แต่ยังไม่เสนอทางเลือก",
      "ง. แจ้งล่วงหน้า อธิบายผลกระทบ เสนอทางเลือก และตกลงจุดติดตาม",
    ],
    optionsEn: [
      "A. Continue working until close to the deadline, and only notify if it is not done.",
      "B. Claim that other teams provided delayed inputs without having verified the cause.",
      "C. Alert the manager to the risk and ask for help, but without proposing any alternatives.",
      "D. Give advance notice, explain impacts, propose solution options, and agree on checkpoints.",
    ],
    scores: [1, 0, 2, 3],
    bestChoice: 3,
    ans: 3,
    reason: "รับผิดชอบต่อผลกระทบและช่วยให้ทีมเลือกทางแก้ได้ทัน (คำถามสัมภาษณ์ต่อ: ถามว่าตอนแจ้งความล่าช้าจะนำข้อมูลและทางเลือกใดไปด้วย)",
    reasonEn: "Take ownership of consequences and enable the team to select viable recovery plans in time. (Follow-up: Ask what specific data and alternatives they would bring when flagging a delay).",
  },
  {
    category: "ปรับตัวและรับข้อเสนอแนะ",
    categoryEn: "Adaptability & Feedback Receptiveness",
    q: "10. หน่วยงานเปลี่ยนขั้นตอนทำงานและกำหนดให้เริ่มใช้สัปดาห์นี้ คุณยังไม่เข้าใจบางจุด และมีผู้สอนพร้อมช่วย คุณควรทำอย่างไร?",
    qEn: "10. The company introduces new operating procedures effective this week. You don't understand certain steps, and a trainer is available to assist. What should you do?",
    options: [
      "ก. ทำตามที่พอจำได้โดยไม่ถาม เพื่อไม่ให้ดูว่าเรียนรู้ช้า",
      "ข. ถามจุดที่ไม่เข้าใจ ฝึกกับตัวอย่าง และตรวจความถูกต้องก่อนใช้จริง",
      "ค. ใช้ขั้นตอนเดิมต่อไป โดยยังไม่แจ้งว่าคุณทำขั้นตอนใหม่ไม่ได้",
      "ง. ขอเพื่อนช่วยทำครั้งแรกให้เสร็จก่อน แล้วค่อยเรียนรู้ภายหลัง",
    ],
    optionsEn: [
      "A. Follow what you remember without asking to avoid looking like a slow learner.",
      "B. Ask about unclear points, practice with examples, and verify accuracy before live execution.",
      "C. Continue using the legacy workflow without notifying anyone that you cannot perform the new one.",
      "D. Ask a colleague to do it for you the first time and learn later.",
    ],
    scores: [1, 3, 0, 2],
    bestChoice: 1,
    ans: 1,
    reason: "เรียนรู้เชิงรุกและตรวจความเข้าใจให้ใช้ขั้นตอนใหม่ได้ถูกต้อง (คำถามสัมภาษณ์ต่อ: ถามถึงตัวอย่างการเรียนรู้งานหรือระบบใหม่และวิธีตรวจว่าทำถูก)",
    reasonEn: "Learn proactively and validate comprehension to execute new workflows accurately. (Follow-up: Ask for an example of learning a new system and how they verified they did it correctly).",
  },
  {
    category: "ปรับตัวและรับข้อเสนอแนะ",
    categoryEn: "Adaptability & Feedback Receptiveness",
    q: "11. หัวหน้าให้ข้อเสนอแนะว่ารายงานของคุณอ่านยาก และพร้อมอธิบายเพิ่มเติม คุณควรตอบอย่างไร?",
    qEn: "11. Your manager feedback states that your report is difficult to read and is ready to explain further. How should you respond?",
    options: [
      "ก. รีบปรับรูปแบบตามที่คาดว่าหัวหน้าชอบ โดยยังไม่ถามจุดที่มีปัญหา",
      "ข. โต้แย้งว่ารูปแบบเดิมดีอยู่แล้ว โดยไม่อ่านข้อเสนอแนะให้ครบ",
      "ค. ขอตัวอย่างจุดที่ควรแก้ ทวนความเข้าใจ แล้วปรับและตรวจผล",
      "ง. รับฟังและขอบคุณ แต่ยังไม่วางแผนว่าจะเปลี่ยนส่วนใดของงาน",
    ],
    optionsEn: [
      "A. Quickly adjust formatting to what you guess the manager likes without asking where the issues are.",
      "B. Argue that the existing format is already good without reading the full feedback.",
      "C. Request examples of areas needing improvement, clarify understanding, adjust, and review results.",
      "D. Listen and say thank you, but without planning which parts of the report to change.",
    ],
    scores: [2, 0, 3, 1],
    bestChoice: 2,
    ans: 2,
    reason: "เปลี่ยนข้อเสนอแนะเป็นการปรับงานที่ตรวจสอบผลได้ (คำถามสัมภาษณ์ต่อ: ถามถึงข้อเสนอแนะที่เคยนำไปใช้และหลักฐานว่างานดีขึ้น)",
    reasonEn: "Transform constructive feedback into measurable work enhancements. (Follow-up: Ask about feedback they incorporated in the past and evidence that work improved).",
  },
  {
    category: "ปรับตัวและรับข้อเสนอแนะ",
    categoryEn: "Adaptability & Feedback Receptiveness",
    q: "12. หัวหน้าสองคนมอบหมายงานที่ต้องเสร็จเวลาเดียวกัน คุณตรวจแล้วว่าทำทั้งสองงานไม่ทัน และยังติดต่อหัวหน้าทั้งคู่ได้ คุณควรทำอย่างไร?",
    qEn: "12. Two managers assign tasks due at the same time. You assess that you cannot complete both simultaneously, and both managers are reachable. What should you do?",
    options: [
      "ก. สรุปเวลาและผลกระทบ ขอให้ตกลงลำดับความสำคัญ แล้วแจ้งแผนร่วมกัน",
      "ข. เลือกงานของหัวหน้าที่อาวุโสกว่า โดยยังไม่แจ้งอีกคน",
      "ค. รับปากว่าทำทันทั้งคู่ แล้วพยายามเร่งโดยไม่แจ้งข้อจำกัด",
      "ง. แจ้งทั้งคู่ว่าทำไม่ทันและรอคำสั่ง โดยยังไม่เสนอทางเลือก",
    ],
    optionsEn: [
      "A. Summarize time constraints and impacts, request alignment on priority, and communicate the shared plan.",
      "B. Prioritize the senior manager's task without informing the other manager.",
      "C. Promise to finish both on time and rush without disclosing limitations.",
      "D. Tell both you cannot finish on time and wait for orders without offering options.",
    ],
    scores: [3, 1, 0, 2],
    bestChoice: 0,
    ans: 0,
    reason: "ทำข้อจำกัดให้ชัดและร่วมจัดลำดับงานแทนการรับปากเกินจริง (คำถามสัมภาษณ์ต่อ: ขอให้ยกตัวอย่างทางเลือกเมื่องานเร่งสองงานชนกัน)",
    reasonEn: "Clarify constraints and collaboratively prioritize rather than making unrealistic promises. (Follow-up: Ask for an example of alternatives proposed when two urgent tasks conflicted).",
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
  if (qText) qText.innerHTML = formatQuestionText_(isEn ? (q.qEn || q.q) : q.q);

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

  let hrStatus = "ต้องพัฒนา (คะแนนต่ำกว่า 8 ข้อ)";
  if (totalIq >= 16) {
    hrStatus = "ยอดเยี่ยม (16-20 ข้อ - ตรรกะและเหตุผลระดับสูง)";
  } else if (totalIq >= 12) {
    hrStatus = "ดีมาก (12-15 ข้อ - ทักษะตรรกะและการคำนวณดี)";
  } else if (totalIq >= 8) {
    hrStatus = "ปานกลาง (8-11 ข้อ - พอใช้)";
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
  if (qText) qText.innerHTML = formatQuestionText_(isEn ? (q.qEn || q.q) : q.q);

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

  const score = Array.isArray(q.scores) ? (q.scores[idx] ?? 0) : (idx === q.ans ? 1 : 0);
  const isBest = (q.bestChoice !== undefined) ? (idx === q.bestChoice) : (idx === q.ans);
  const isEn = currentLang === "en";
  const selectedText = isEn ? (q.optionsEn[idx] || q.options[idx]) : q.options[idx];

  appData.eqAnswers.push({
    category: q.category,
    question: q.q,
    selectedIndex: idx,
    text: selectedText,
    score: score,
    isCorrect: isBest,
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
  const totalEq = appData.eqAnswers.reduce((sum, a) => sum + Number(a.score || 0), 0);
  appData.eqScore = totalEq;

  try {
    sessionStorage.setItem("tera_eqScore", String(totalEq));
  } catch (e) {}

  let hrStatus = "ต่ำกว่า 18 คะแนน (ควรสอบถามพฤติกรรมเพิ่มเติมในการสัมภาษณ์)";
  if (totalEq >= 30) {
    hrStatus = "30-36 คะแนน (จัดการปัญหาและผลกระทบได้ดี วุฒิภาวะการทำงานสูง)";
  } else if (totalEq >= 24) {
    hrStatus = "24-29 คะแนน (ตอบสนองเหมาะสม มีวุฒิภาวะ มีบางด้านที่พัฒนาต่อได้)";
  } else if (totalEq >= 18) {
    hrStatus = "18-23 คะแนน (ระดับปานกลาง มีแนวทางแก้เฉพาะหน้า)";
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
  { label: "เจ้าหน้าที่ธุรการทั่วไป", labelEn: "General Admin Officer", url: "exam-general-admin.html" },
  { label: "แอดมินสาขา/ธุรการต่างจังหวัด", labelEn: "Upcountry Branch Admin", url: "exam-branch-admin.html" },
  { label: "ผู้จัดการสาขา", labelEn: "Branch Manager", url: "exam-branch-manager.html" },
  { label: "BD / Developer", labelEn: "BD / Developer", url: "exam-bd.html" },
  { label: "Telesales / โทรขาย", labelEn: "Telesales", url: "exam-telesales.html" },
  { label: "หัวหน้าทีม Telesales", labelEn: "Telesales Team Leader", url: "exam-telesales-team-leader.html" },
  { label: "Sales / AE / ฝ่ายขาย", labelEn: "Sales / AE", url: "exam-sales.html" },
  { label: "จัดซื้อ", labelEn: "Purchasing", url: "exam-purchasing.html" },
  { label: "หัวหน้าฝ่ายจัดซื้อต่างประเทศ", labelEn: "International Procurement Manager", url: "exam-international-procurement-manager.html" },
  { label: "ธุรการประสานงานโครงการ", labelEn: "Project Coordinator", url: "exam_coordinator.html" },
  { label: "วิศวกรไฟฟ้า", labelEn: "Electrical Engineer", url: "exam_electrical_engineer.html" },
  { label: "วิศวกรเครื่องกล", labelEn: "Mechanical Engineer", url: "exam_Mechanical_engineer.html" },
  { label: "ช่างไฟฟ้า", labelEn: "Electrician", url: "exam-electrician.html" },
  { label: "ผู้ช่วยช่างไฟฟ้า", labelEn: "Assistant Electrician", url: "exam-assistant-electrician.html" },
  { label: "วิศวกร", labelEn: "Engineer", url: "exam-engineer.html" },
  { label: "บริการ / Service", labelEn: "Service", url: "exam-service.html" },
  { label: "คลังสินค้า / Logistic", labelEn: "Warehouse / Logistics", url: "exam-warehouse-logistics.html" },
  { label: "หัวหน้าคลังสินค้าและขนส่ง", labelEn: "Warehouse & Logistics Manager", url: "exam-warehouse-logistics-manager.html" },
  { label: "โฟร์แมน / หัวหน้างาน", labelEn: "Foreman / Site Supervisor", url: "exam_foreman.html" },
  { label: "เจ้าหน้าที่การเงิน", labelEn: "Finance Officer", url: "exam-finance-officer.html" },
  { label: "ผู้จัดการฝ่ายขาย (Solar Roof)", labelEn: "Sales Manager (Solar Roof)", url: "exam-sales-solar-roof.html" },
  { label: "ผู้จัดการฝ่ายขาย (Solar Pump)", labelEn: "Sales Manager (Solar Pump)", url: "exam-sales-solar-pump.html" },
  { label: "ผู้ช่วยผู้จัดการฝ่ายขาย (Automation & Inverter)", labelEn: "Asst. Sales Manager (Automation & Inverter)", url: "exam-asst-sales-manager-automation.html" },
  { label: "พนักงานขับรถผู้บริหาร", labelEn: "Executive Driver", url: "exam_executive_driver.html" },
  { label: "ผู้จัดการฝ่ายบุคคล", labelEn: "HR Manager", url: "exam_hr_manager.html" },
  { label: "เจ้าหน้าที่ HR", labelEn: "HR Officer", url: "exam_hr_officer.html" },
  { label: "ผู้จัดการฝ่ายการตลาด", labelEn: "Marketing Manager", url: "exam-marketing-manager.html" },
  { label: "เจ้าหน้าที่การตลาด", labelEn: "Marketing Officer", url: "exam-marketing-officer.html" },
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

  const doneBadge = `
    <span class="status-badge-done">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${currentLang === "en" ? "Completed" : "เรียบร้อย"}</span>
    </span>
  `;

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
        ${doneBadge}
      </div>
      <div class="status-row">
        <div class="status-left">
          ${brainIconSvg}
          <span style="color:#f1c40f;">${t.iqSaved}</span>
        </div>
        ${doneBadge}
      </div>
      <div class="status-row">
        <div class="status-left">
          ${eqIconSvg}
          <span style="color:#5dade2;">${t.eqSaved}</span>
        </div>
        ${doneBadge}
      </div>
    </div>

    <div style="margin: 22px 0 16px 0; text-align: center;">
      <div class="next-step-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span>${currentLang === "en" ? "Next Step" : "ขั้นตอนถัดไป"}</span>
      </div>
      <h3 style="font-size:1.25rem; font-weight:700; color:#fff; margin:4px 0 6px 0; letter-spacing:-0.2px;">
        ${t.examPickTitle}
      </h3>
      <p style="opacity:.85; font-size:0.92rem; margin:0; color:#cbd5e1; line-height:1.5;">
        ${t.examPickDesc}
      </p>
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

function formatQuestionText_(raw) {
  if (!raw) return "";
  const parts = String(raw).split("\n");
  if (parts.length <= 1) {
    return escapeHtml_(raw);
  }
  const main = escapeHtml_(parts[0]);
  const sub = escapeHtml_(parts.slice(1).join("\n"));
  return `${main}<span class="question-subdata">${sub}</span>`;
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
      answersCount: String(iqQuestions.length),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
    };

    for (let i = 1; i <= iqQuestions.length; i++) {
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
      answersCount: String(eqQuestions.length),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href,
    };

    for (let i = 1; i <= eqQuestions.length; i++) {
      const ans = appData.eqAnswers[i - 1];
      const q = eqQuestions[i - 1];
      payload[`q${i}_title`] = q ? q.q : "";
      payload[`q${i}_category`] = q ? q.category : "";
      payload[`q${i}_text`] = ans ? ans.text : "";
      payload[`q${i}_score`] = ans ? String(ans.score !== undefined ? ans.score : (ans.isCorrect ? "1" : "0")) : "0";
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
const pageParam = params.get("page");
const iqQuestionParam = params.get("iqQuestion") || params.get("q");
const eqQuestionParam = params.get("eqQuestion");

if (pageParam === "iqAssessment" || iqQuestionParam) {
  const qNum = parseInt(iqQuestionParam || "18", 10);
  appData.currentIqQuestion = Math.max(0, Math.min(iqQuestions.length - 1, (isNaN(qNum) ? 18 : qNum) - 1));
  showPage("iqAssessment");
  renderIqQuestion();
} else if (pageParam === "eqAssessment" || eqQuestionParam) {
  const qNum = parseInt(eqQuestionParam || "1", 10);
  appData.currentEqQuestion = Math.max(0, Math.min(eqQuestions.length - 1, (isNaN(qNum) ? 1 : qNum) - 1));
  showPage("eqAssessment");
  renderEqQuestion();
} else if (uuidParam) {
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

