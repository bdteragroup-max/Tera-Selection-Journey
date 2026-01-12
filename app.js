'use strict';

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfvCXdieV_wEsn9RUH7icZpeyjSRuZ0AWHO0IUxrmNxkwnp4RE1V3fKA5WnOUo705Xpg/exec";
var appData = { currentQuestion: 0, answers: [], profile: {}, results: null };

var questions = [
  {
    chapter: '1.ความดี',
    question: 'เมื่อถูกล็อตเตอรี่รางวัลที่ 1 สิ่งแรกที่คุณจะทำคือ?',
    options: [
      { text: 'ใช้หนี้', score: 4 },
      { text: 'ลงทุน', score: 3 },
      { text: 'ให้ครอบครัว', score: 2 },
      { text: 'ทำบุญ', score: 1 }
    ]
  },
  {
    chapter: '2.ความซื่อสัตย์',
    question: 'คุณกำลังจะออกจากบ้านไปขึ้นเงินล็อตเตอรี่ แต่ดันเจอเงินแสนตกอยู่หน้าบ้าน คุณจะ?',
    options: [
      { text: 'ตามหาเจ้าของเงิน', score: 4 },
      { text: 'เอาเงินไปส่งให้ตำรวจ', score: 3 },
      { text: 'เก็บไว้เองก่อน', score: 2 },
      { text: 'เดินผ่านไป รีบไปขึ้นเงินล็อตเตอรี่', score: 1 }
    ]
  },
  {
    chapter: '3.ความมุ่งมั่น',
    question: 'คุณนำเงินไปซื้อบ้านใหม่ให้ครอบครัว แต่คนในบ้านบ่นว่าดูแลยากคุณจะ?',
    options: [
      { text: 'จ้างคนมาช่วยดูแล', score: 3 },
      { text: 'ปรับเปลี่ยนบ้านให้ตรงใจทุกคน', score: 4 },
      { text: 'ขายบ้าน', score: 2 },
      { text: 'ปล่อยไปตามสภาพ', score: 1 }
    ]
  },
  {
    chapter: '4.ความพยายาม',
    question: 'คุณอยากให้ลูกเรียนโรงเรียนที่ดีขึ้น แต่พวกเขาดันปรับตัวไม่ได้คุณจะ?',
    options: [
      { text: 'สอนหนังสือให้เด็กๆเอง', score: 4 },
      { text: 'หาครูพิเศษมาช่วยสอน', score: 3 },
      { text: 'ให้ลองเรียนอีกเทอม', score: 2 },
      { text: 'ปล่อยให้ช่วยเหลือตัวเอง', score: 1 }
    ]
  },
  {
    chapter: '5.ความเก่ง',
    question: 'ญาติพี่น้องมาขอยืมเงินคุณจนเป็นปัญหาที่ส่งผลต่อความสัมพันธ์คุณจะ?',
    options: [
      { text: 'ให้ยืมครั้งสุดท้าย', score: 3 },
      { text: 'ไม่ให้ยืม', score: 4 },
      { text: 'ให้ยืมแต่ทำสัญญาเป็นลายลักษณ์อักษร', score: 2 },
      { text: 'เลี่ยงการพบเจอ', score: 1 }
    ]
  },
  {
    chapter: '6.ความขยัน',
    question: 'เมื่อคุณประสบความสำเร็จในธุรกิจจนรวยมากแล้ว คุณจะ?',
    options: [
      { text: 'หาธุรกิจใหม่ทำ', score: 4 },
      { text: 'อยู่ดูแลธุรกิจ', score: 3 },
      { text: 'ออกเดินทางไปเที่ยว', score: 2 },
      { text: 'เกษียณตัวเอง', score: 1 }
    ]
  }
];

function $(id) { return document.getElementById(id); }

function showPage(pageId) {
  const pages = ['landing', 'profile', 'assessment', 'results'];
  pages.forEach(id => $(id)?.classList.add('hidden'));
  $(pageId)?.classList.remove('hidden');
}

function goToProfile() {
  showPage('profile');
}

function validateProfileForm() {
  const userName = document.getElementById("userName").value;
  const userPosition = document.getElementById("userPosition").value;
  const userChannel = document.getElementById("userChannel").value;

  if (!userName || !userPosition || !userChannel) {
    alert("กรุณากรอกข้อมูลทั้งหมด");
    return false; // ไม่ส่งฟอร์ม
  }

  // ถ้าผ่านการตรวจสอบข้อมูลทั้งหมด
  return true;
}

function startAssessment() {
  const userName = document.getElementById("userName").value.trim();
  const userPosition = document.getElementById("userPosition").value.trim();
  const userChannel = document.getElementById("userChannel").value.trim();

  if (!userName || !userPosition || !userChannel) {
    alert("กรุณากรอกข้อมูลทั้งหมด");
    return;
  }

  // ถ้าผ่านการตรวจสอบข้อมูลทั้งหมด
  appData.profile = { name: userName, position: userPosition, channel: userChannel };
  showPage('assessment');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[appData.currentQuestion];
  if (!q) return;

  // progress
  const pill = $('progressPill');
  if (pill) pill.textContent = (appData.currentQuestion + 1) + '/' + questions.length;

  // text
  if ($('questionText')) $('questionText').textContent = q.question || '';

  const box = $('optionsContainer');
  if (!box) return;

  box.innerHTML = '';

  (q.options || []).forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-card';
    btn.setAttribute('data-idx', String(idx));
    btn.textContent = opt.text || ('ตัวเลือก ' + (idx + 1));
    btn.addEventListener('click', handleAnswerClick);
    box.appendChild(btn);
  });
}

function handleAnswerClick(ev) {
  const btn = ev.currentTarget;
  const idx = parseInt(btn.getAttribute('data-idx'), 10);

  const q = questions[appData.currentQuestion];
  if (!q || !q.options || !q.options[idx]) return;

  const box = $('optionsContainer');
  const buttons = box ? box.querySelectorAll('button.option-card') : [];

  // กันกดซ้ำ
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].disabled) return;
  }

  // ✅ บันทึกคำตอบ
  const picked = q.options[idx];
  appData.answers.push(picked);

  // UI selected
  btn.classList.add('is-selected');

  const oldCheck = btn.querySelector('.option-check');
  if (oldCheck) oldCheck.remove();

  const check = document.createElement('span');
  check.className = 'option-check';
  check.textContent = '✓';
  btn.appendChild(check);

  // disable all
  for (let i = 0; i < buttons.length; i++) buttons[i].disabled = true;

  setTimeout(() => {
    if (appData.currentQuestion < questions.length - 1) {
      appData.currentQuestion++;
      renderQuestion();
    } else {
      calculateResults();
    }
  }, 300);
}

function calculateResults() {
  const totalScore = appData.answers.reduce((sum, ans) => sum + ans.score, 0);

  let result = '';
  if (totalScore >= 24 && totalScore <= 26) {
    result = 'ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน';
  } else if (totalScore >= 18 && totalScore <= 23) {
    result = 'ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้มีความสามารถในการตัดสินใจที่ดีในหลายๆ ด้าน';
  } else if (totalScore >= 12 && totalScore <= 17) {
    result = 'ผ่านการทดสอบแต่ต้องพัฒนาค่อนข้างเยอะ: ผู้สมัครนี้มีการตัดสินใจที่ดีในบางสถานการณ์';
  } else if (totalScore >= 6 && totalScore <= 11) {
    result = 'ไม่ผ่านการทดสอบต้องพัฒนา: ผู้สมัครนี้ต้องพัฒนาในบางด้าน';
  }

  appData.results = result;

  // ส่งข้อมูลขึ้นชีต (ไม่บล็อก UI)
  submitToGoogleSheet().catch(err => console.error("❌ submit error", err));

  showResults(result);
}

function showResults(result) {
  if ($('resultText')) $('resultText').textContent = result;

  // ซ่อนปุ่มแชร์และทำใหม่
  const resultsActions = document.querySelector('.results-actions');
  if (resultsActions) {
    // ลบปุ่มแชร์ผลลัพธ์ออก
    const shareButton = resultsActions.querySelector('.btn-tera.primary');
    if (shareButton) {
      shareButton.style.display = 'none';
    }

    // เปลี่ยนปุ่ม "ทำใหม่" ให้ทำการรีเซ็ตเมื่อคลิก
    const resetButton = resultsActions.querySelector('.btn-tera.ghost');
    if (resetButton) {
      resetButton.textContent = "ทำใหม่";
      resetButton.onclick = function () {
        resetAssessment();
      };
    }
  }

  // ปิดการแก้ไขข้อมูลในฟอร์ม
  const profileInputs = document.querySelectorAll('.form-input');
  profileInputs.forEach(input => input.disabled = true);

  // ซ่อนคำอธิบายของการประเมิน
  const primaryCard = $('primaryCard');
  const secondaryCard = $('secondaryCard');
  const insightCards = document.querySelectorAll('.insight-card');

  if (primaryCard) primaryCard.style.display = 'none';
  if (secondaryCard) secondaryCard.style.display = 'none';
  insightCards.forEach(card => card.style.display = 'none');

  // แสดงผลหน้า "ขอบคุณ" และคำแนะนำ
  showPage('results');
}

async function submitToGoogleSheet() {
  if (!SCRIPT_URL) {
    console.error("SCRIPT_URL ว่าง");
    return;
  }

  const uuid = genUUID_();
  const payload = {
    uuid: uuid,
    ts: new Date().toISOString(),
    name: appData.profile?.name || '',
    position: appData.profile?.position || '',
    results: appData.results,
    answersCount: (appData.answers || []).length
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "cors",  // ใช้ "cors" แทน "no-cors"
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Error sending data to Google Sheets: " + response.statusText);
    }

    console.log("✅ Sent to Google Sheets successfully!");
  } catch (err) {
    console.error("❌ Error sending data:", err);
  }
}

// Function to generate a unique identifier
function genUUID_() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

// Initialization to start the quiz
function startAssessment() {
  const name = ($('userName')?.value || '').trim();
  const position = ($('userPosition')?.value || '').trim();

  appData.profile = { name, position };
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.results = null;

  showPage('assessment');
  renderQuestion();
}

function resetAssessment() {
  // รีเซ็ตคำตอบทั้งหมด
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.profile = {};
  appData.results = null;

  // รีเซ็ตข้อมูลในฟอร์ม
  if ($('userName')) $('userName').value = '';
  if ($('userPosition')) $('userPosition').value = '';
  if ($('userChannel')) $('userChannel').value = '';

  // แสดงหน้า Landing
  showPage('landing');
}

// ต้องมีการประกาศฟังก์ชัน goToProfile เพื่อให้เรียกใช้งานได้
window.goToProfile = goToProfile;
window.startAssessment = startAssessment;
window.resetAssessment = resetAssessment;
