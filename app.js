'use strict';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfvCXdieV_wEsn9RUH7icZpeyjSRuZ0AWHO0IUxrmNxkwnp4RE1V3fKA5WnOUo705Xpg/exec";

const appData = {
  uuid: "",
  currentQuestion: 0,
  answers: [],
  profile: { name: "", position: "", channel: "" },
  resultText: "",
  totalScore: 0,
  radarUrl: ""
};

const questions = [
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

function genUUID_() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + "-" + Math.random().toString(16).slice(2);
}

/* ----------------- Navigation ----------------- */
function goToProfile() {
  showPage('profile');
}

/* ----------------- Start Assessment ----------------- */
function startAssessment() {
  const name = ($('userName')?.value || '').trim();
  const position = ($('userPosition')?.value || '').trim();
  const channel = ($('userChannel')?.value || '').trim();

  if (!name || !position || !channel) {
    alert("กรุณากรอกข้อมูลทั้งหมด");
    return;
  }

  appData.uuid = genUUID_(); // ✅ สร้างครั้งเดียว
  appData.profile = { name, position, channel };
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.resultText = "";
  appData.totalScore = 0;
  appData.radarUrl = "";

  showPage('assessment');
  renderQuestion();
}

/* ----------------- Render Question ----------------- */
function renderQuestion() {
  const q = questions[appData.currentQuestion];
  if (!q) return;

  const pill = $('progressPill');
  if (pill) pill.textContent = (appData.currentQuestion + 1) + '/' + questions.length;

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

  const picked = q.options[idx];

  // ✅ เก็บแบบเดียวกับ GAS ต้องการ: {text, score}
  appData.answers.push({ text: picked.text, score: picked.score });

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
      finishAssessment();
    }
  }, 260);
}

/* ----------------- Finish & Submit ----------------- */
function finishAssessment() {
  const totalScore = appData.answers.reduce((sum, ans) => sum + Number(ans.score || 0), 0);
  appData.totalScore = totalScore;

  let result = '';
  if (totalScore >= 24) {
    result = 'ผ่านการทดสอบยอดเยี่ยม: ผู้สมัครนี้มีทัศนคติที่ดีในทุกด้าน';
  } else if (totalScore >= 18) {
    result = 'ผ่านการทดสอบและพัฒนาบางทักษะ: ผู้สมัครนี้มีความสามารถในการตัดสินใจที่ดีในหลายๆ ด้าน';
  } else if (totalScore >= 12) {
    result = 'ผ่านการทดสอบแต่ต้องพัฒนาค่อนข้างเยอะ: ผู้สมัครนี้มีการตัดสินใจที่ดีในบางสถานการณ์';
  } else {
    result = 'ไม่ผ่านการทดสอบต้องพัฒนา: ผู้สมัครนี้ต้องพัฒนาในบางด้าน';
  }

  appData.resultText = result;

  // แสดงหน้าผลลัพธ์ก่อน (ไม่บล็อค)
  showResults();

  // ส่งข้อมูล + รอ radarUrl แล้วอัปเดตรูป
  submitToGoogleSheet()
    .then(() => updateRadarUI_())
    .catch(err => console.error("❌ submit error", err));
}

/* ----------------- Results UI ----------------- */
function showResults() {
  // ✅ หน้า Results ให้ขึ้นข้อความนี้ตามที่คุณต้องการ
  if ($('resultText')) $('resultText').textContent = "ขอให้คุณโชคดีในการสัมภาษณ์";

  // (ถ้าคุณอยากโชว์ resultText จริงด้วย เอา comment ออก)
  // if ($('resultText')) $('resultText').textContent = appData.resultText;

  // ซ่อนการ์ดอื่น ๆ ตามเดิม
  const primaryCard = $('primaryCard');
  const secondaryCard = $('secondaryCard');
  const insightCards = document.querySelectorAll('.insight-card');

  if (primaryCard) primaryCard.style.display = 'none';
  if (secondaryCard) secondaryCard.style.display = 'none';
  insightCards.forEach(card => card.style.display = 'none');

  // ปุ่มทำใหม่
  const resultsActions = document.querySelector('.results-actions');
  if (resultsActions) {
    const shareButton = resultsActions.querySelector('.btn-tera.primary');
    if (shareButton) shareButton.style.display = 'none';

    const resetButton = resultsActions.querySelector('.btn-tera.ghost');
    if (resetButton) {
      resetButton.textContent = "ทำใหม่";
      resetButton.onclick = resetAssessment;
    }
  }

  showPage('results');
}

/**
 * ✅ สร้างพื้นที่โชว์เรดาร์ในหน้า results
 * ต้องมี <div id="radarWrap"></div> ในหน้า results (ถ้ายังไม่มี เดี๋ยวผมบอก HTML ให้)
 */
function updateRadarUI_() {
  const wrap = $('radarWrap');
  if (!wrap) return;

  wrap.innerHTML = '';

  if (!appData.radarUrl) {
    wrap.innerHTML = `<div style="color:#fff;opacity:.85;margin-top:12px;">กำลังสร้างเรดาร์ หรือไม่มีลิงก์เรดาร์</div>`;
    return;
  }

  // แสดงภาพเรดาร์
  const img = document.createElement('img');
  img.src = appData.radarUrl;
  img.alt = 'Radar Chart';
  img.style.maxWidth = '760px';
  img.style.width = '100%';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 18px 50px rgba(0,0,0,.35)';
  img.style.marginTop = '14px';

  // ปุ่มเปิดในแท็บใหม่
  const a = document.createElement('a');
  a.href = appData.radarUrl;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = 'เปิดเรดาร์ในแท็บใหม่';
  a.style.display = 'inline-block';
  a.style.marginTop = '10px';
  a.style.color = '#fff';
  a.style.fontWeight = '800';
  a.style.textDecoration = 'underline';

  wrap.appendChild(img);
  wrap.appendChild(a);
}

/* ----------------- Submit to GAS (สำคัญ) ----------------- */
async function submitToGoogleSheet() {
  if (!SCRIPT_URL) throw new Error("SCRIPT_URL ว่าง");

  // ✅ field ต้องตรงกับ doPost ใน GAS
  const payload = {
    uuid: appData.uuid,
    name: appData.profile.name,
    position: appData.profile.position,
    channel: appData.profile.channel,
    totalScore: String(appData.totalScore),
    resultText: appData.resultText,
    answersCount: String(appData.answers.length),
    answers: JSON.stringify(appData.answers),
    userAgent: navigator.userAgent,
    pageUrl: location.href
  };

  // ✅ ใช้ URLSearchParams และไม่ตั้ง headers → ลดปัญหา CORS / preflight
  const body = new URLSearchParams(payload);

  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body
  });

  const txt = await res.text();
  console.log("Sheet response:", txt);

  // ✅ GAS ส่งกลับ { ok:true, status:"ok", radarUrl:"..." }
  try {
    const json = JSON.parse(txt);
    if (json && json.ok) {
      if (json.radarUrl) appData.radarUrl = json.radarUrl;
      return json;
    }
    throw new Error(json?.message || "GAS returned not ok");
  } catch (e) {
    // ถ้า parse ไม่ได้ แสดงว่าไม่ได้คืน JSON จริง
    throw new Error("Invalid response from GAS: " + txt);
  }
}

/* ----------------- Reset ----------------- */
function resetAssessment() {
  appData.uuid = "";
  appData.currentQuestion = 0;
  appData.answers = [];
  appData.profile = { name: "", position: "", channel: "" };
  appData.resultText = "";
  appData.totalScore = 0;
  appData.radarUrl = "";

  if ($('userName')) $('userName').value = '';
  if ($('userPosition')) $('userPosition').value = '';
  if ($('userChannel')) $('userChannel').value = '';

  showPage('landing');
}

/* expose */
window.goToProfile = goToProfile;
window.startAssessment = startAssessment;
window.resetAssessment = resetAssessment;
