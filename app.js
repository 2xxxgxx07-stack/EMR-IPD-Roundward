/**
 * IPD Tablet EMR - Smart Roundward Application Logic
 * Featuring Animated 3D Nurse Character & Realtime Dashboard
 */

const STORAGE_KEY = 'ipd_roundward_todos_v1';

// Initial Master Sample Data
const INITIAL_TASKS = [
  {
    id: 'task-1',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: 'วัดและลงบันทึก Vital Signs + Pain Score + MEWS ตามรอบ',
    completed: false,
    details: `เตียง 09: เคสเฝ้าระวังวิกฤต (Severe Sepsis secondary to CAP)
• ผู้ป่วย: นายสมศักดิ์ สุขสวัสดิ์ (อายุ 68 ปี) | HN: 67-041923 | สิทธิ: บัตรทอง
• แพทย์เจ้าของไข้: นพ. ธีรภัทร (อายุรกรรม)
• เวลาบันทึก: 23 ก.ย. 2569 | 10:30 น. (เวรเช้า)
• Focus: ภาวะไข้สูงและหายใจเหนื่อย (Hyperthermia & Dyspnea)
D (Data):
ผู้ป่วยนอนบนเตียง ซึมลงเล็กน้อย บ่นหนาวสั่น หายใจหอบเหนื่อย อัตราการหายใจ 26 ครั้ง/นาที, BT 38.8°C, PR 108 bpm, BP 98/62 mmHg, SpO2 91% (Room Air), ปอดสองข้างได้ยินเสียง Crepitation ชัดเจนข้างขวา, คำนวณ MEWS Score = 4 (ระดับส้ม: เฝ้าระวังวิกฤต)
A (Action):
1. รายงาน นพ. ธีรภัทร ทราบค่า MEWS และอาการหอบเหนื่อย
2. On O2 Cannula 3 LPM ตาม Order stat (SpO2 ขยับขึ้นเป็น 97%)
3. เช็ดตัวลดไข้ด้วยน้ำอุ่น (Tepid sponge)
4. เจาะเลือด Hemoculture 2 ขวด และส่ง CBC, Lactate stat
5. บริหารยา Ceftriaxone 2g IV drip in NSS 100 mL over 30 min
6. ปรับเพิ่มรอบวัด V/S เป็น q 1h
R (Response):
11:30 น. อาการหนาวสั่นลดลง ไข้ลดเหลือ BT 37.6°C, หายใจ 20 ครั้ง/นาที, BP 106/68 mmHg, SpO2 98% on O2, ผู้ป่วยลืมตาตอบคำถามตรงคำถาม ผล CBC: WBC 16,800/μL แจ้งแพทย์รับทราบแล้ว อยู่ระหว่างรอผลเพาะเชื้อเลือด
ลงชื่อ: พว. นภาพร แก้วมณี (Senior RN)

เตียง 02: เคสหลังผ่าตัดและประเมินความปวด (Post-Op Care & Acute Pain)
• ผู้ป่วย: นางสุดาพร บุญมี (อายุ 45 ปี) | HN: 67-038812 | สิทธิ: ข้าราชการ
• แพทย์เจ้าของไข้: พญ. สุพรรษา (ศัลยกรรม)
• เวลาบันทึก: 23 ก.ย. 2569 | 14:15 น. (เวรเช้า)
• Focus: ความปวดแผลผ่าตัด (Acute Post-op Pain)
D (Data):
Post-Op Laparoscopic Cholecystectomy Day 1, ผู้ป่วยหน้าตานิ่วตึง เอามือกุมแผลหน้าท้อง ปฏิเสธการพลิกตัวและลุกขยับ ประเมิน Pain Score = 7/10 (ปวดตื้อๆ ตลอดเวลา), BP 138/85 mmHg, PR 94 bpm, RR 20 bpm, แผลผ่าตัดติดแน่น ไม่มี active bleeding ซึมลอดผ้าก๊อซ
A (Action):
1. แนะนำเทคนิคการหายใจผ่อนคลาย และการประคองแผลเวลาไอ/ขยับตัว
2. บริหารยา Tramadol 50 mg IV push ช้าๆ ตาม Order PRN q 6h (ทำ Double-check ร่วมกับ พว. จุฑามาศ)
3. กำหนดเวลาประเมินซ้ำ (Pain Re-assessment) ภายใน 30 นาที
R (Response):
14:45 น. (Re-assessment 30 นาทีหลังได้ยา) ผู้ป่วยสีหน้าผ่อนคลายลง ปวดลดลงเหลือ Pain Score = 2/10 พลิกตะแคงตัวได้ ไม่มีอาการคลื่นไส้อาเจียน หรือเวียนศีรษะ สัญญาณชีพปกติ BP 122/76 mmHg, PR 78 bpm`
  },
  {
    id: 'task-2',
    date: '01/09/2569',
    time: '08:30',
    priority: 'สูง',
    title: 'เจาะ DTX ปลายนิ้วก่อนอาหาร (เช้า 06:30 / เที่ยง 11:30 / เย็น 16:30 / ก่อนนอน 20:00)',
    completed: false,
    details: `รายการตรวจระดับน้ำตาลปลายนิ้ว (DTX / Point-of-Care Glucose)
• เตียง 03: นายบุญส่ง (DM Type 2 on Sliding Scale Insulin) - เป้าหมาย DTX < 180 mg/dL
• เตียง 07: นางรัตนา (DKA recovery stage) - ตรวจ DTX q 2h พร้อมประเมินภาวะ Hypoglycemia
• เตียง 12: นายประสิทธิ์ (Pre-op elective surgery) - DTX ก่อนมื้ออาหารเช้า

แนวปฏิบัติการพยาบาล:
1. หาก DTX < 70 mg/dL ให้ปฏิบัติตาม Hypoglycemia Protocol ดื่มน้ำหวาน 1 แก้ว หรือ 50% Glucose 50 mL IV stat แล้วรีเช็คใน 15 นาที
2. หาก DTX > 250 mg/dL ให้รายงานแพทย์เพื่อพิจารณา RI sliding scale IV/SC
3. บันทึกผลลงระบบ EMR e-Sugar Chart ทันทีหลังตรวจ`
  },
  {
    id: 'task-3',
    date: '01/09/2569',
    time: '08:30',
    priority: 'สูง',
    title: 'แจกยาและบริหารยาตามรอบ (e-MAR)',
    completed: false,
    details: `บริหารยาตามรอบ 08:30 น. (e-MAR Verification 6 Rights):
• เตียง 01: Meropenem 1g IV drip in NSS 100 ml over 3h (Extended infusion)
• เตียง 04: Enoxaparin (Clexane) 0.6 ml SC stat
• เตียง 08: Furosemide (Lasix) 40 mg IV push stat - พร้อมติดตามปัสสาวะ (Strict I/O)
• เตียง 15: ยาเม็ดรับประทานหลังอาหารเช้า 5 รายการ (Amlodipine, Losartan, Atorvastatin, Omeprazole, Vit B Complex)

หมายเหตุสำคัญ: ทำ Barcode Scanning สายรัดข้อมือผู้ป่วยและซองยาทุกครั้งก่อนบริหารยา`
  },
  {
    id: 'task-4',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: 'ทำแผลผ่าตัด / แผลกดทับ (Wound Dressing)',
    completed: true,
    details: `รายการทำแผลเวรเช้า (Aseptic Technique):
• เตียง 05: แผลผ่าตัด Explor Laparotomy with Ileostomy - เช็ค Stoma pink color, ปิดแผล gauzeแห้ง สะอาดดี
• เตียง 11: แผลกดทับ Sacral Bedsore Stage 3 - ทำแผลด้วย Normal Saline ชะล้าง, ใส่ Hydrogel dressing ปิดด้วย Mepilex Border
• เตียง 14: แผลผ่าตัดข้อสะโพกเทียม (Total Hip Arthroplasty) - เช็ค drainage tube ออก 30 mL serosanguinous`
  },
  {
    id: 'task-5',
    date: '01/09/2569',
    time: '08:30',
    priority: 'สูง',
    title: 'พ่นยาขยายหลอดลม (Nebulizer) / Suction ดูดเสมหะ',
    completed: true,
    details: `รอบการรักษาทางระบบทางเดินหายใจ:
• เตียง 06: Berodual 1 neb + NSS 3 ml q 4h (ประเมิน Lung sound และ SpO2 ก่อน-หลังพ่นยาทุกครั้ง)
• เตียง 10: ผู้ป่วย On Tracheostomy Tube - Suction ดูดเสมหะสีขาวเหนียวปานกลาง, ทำ Tracheostomy dressing, เปลี่ยนเชือกผูกท่อ`
  },
  {
    id: 'task-6',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: 'พลิกตัวผู้ป่วยติดเตียงทุก 2 ชั่วโมง (Turn Patient q 2h) พร้อมตรวจดูรอยกดทับ',
    completed: false,
    details: `รอบการพลิกตะแคงตัว: 08:30 น. (ตะแคงซ้าย 30 องศา สอดหมอนรองก้นกบและข้อพับ)
• ผู้ป่วย High Risk Braden Scale: เตียง 05, 08, 10, 11, 16
• สังเกตผิวหนังบริเวณ Sacrum, Greater trochanter, ส้นเท้าทั้งสองข้าง หากมี Non-blanchable erythema ให้รายงานหัวหน้าเวร`
  },
  {
    id: 'task-7',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: '[ตามผลตรวจ] เช็คผลฟิล์ม Portable Chest X-Ray / CT Scan ในระบบ PACS',
    completed: false,
    details: `รายการติดตามผลภาพถ่ายทางรังสี (PACS):
• เตียง 09: Portable CXR Follow-up RLL pneumonia
• เตียง 13: Non-contrast CT Brain เพื่อ Rule out acute ischemic stroke vs ICH`
  },
  {
    id: 'task-8',
    date: '01/09/2569',
    time: '08:30',
    priority: 'วิกฤต/ด่วนมาก',
    title: 'แจ้งแพทย์เจ้าของไข้/แพทย์เวร เมื่อพบสัญญาณชีพผิดปกติ (เช่น BP ตก, SBP < 90 หรือ MEWS ≥ 4)',
    completed: false,
    details: `Critical Notification Protocol:
• หากพบ SBP < 90 mmHg หรือ MAP < 65 mmHg
• HR > 120 bpm หรือ < 45 bpm
• SpO2 < 92% on Oxygen therapy
• Urine output < 0.5 mL/kg/h ติดต่อกันเกิน 2 ชั่วโมง
ให้ติดต่อแพทย์เวรทันที พร้อมเตรียมอุปกรณ์เปิดเส้น IV และถุง Ambu bag ข้างเตียง`
  },
  {
    id: 'task-9',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: 'ประสานงานเวรเปลและแผนกตรวจพิเศษ (เช่น ส่งคนไข้ไปทำ Echo, ส่งตรวจ Ultrasound)',
    completed: false,
    details: `รายการเดินทางตรวจนอกวอร์ด:
• 10:00 น. เตียง 04 ส่งทำ Echocardiogram ตึกหัวใจ ชั้น 3 (พร้อมชาร์ตและเอกสารส่งตรวจ)
• 11:15 น. เตียง 07 ส่งทำ Ultrasound Upper Abdomen (งดน้ำงดอาหาร NPO เรียบร้อย)`
  },
  {
    id: 'task-10',
    date: '01/09/2569',
    time: '08:30',
    priority: 'สูง',
    title: 'เตรียมผู้ป่วยก่อนผ่าตัด (Pre-op Checklist): งดน้ำ-อาหาร, ตรวจสอบหมู่เลือด, ติดป้ายระบุตัวตน',
    completed: false,
    details: `Pre-op Patient: เตียง 12 (นายประสิทธิ์ - OR คิวบ่าย 13:00 น.)
Checklist:
[x] NPO ตั้งแต่เที่ยงคืน
[x] ผล Lab Pre-op ครบ (CBC, Coag, Electrolyte, CXR, EKG)
[x] Informed Consent เซ็นยินยอมถูกต้อง
[x] ถอดฟันปลอม แว่นตา เครื่องประดับ
[x] เปิดเส้น IV NSS 1,000 mL rate 80 mL/h ข้างซ้าย เข็มเบอร์ 18`
  },
  {
    id: 'task-11',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ทั่วไป/ต่ำ',
    title: 'เช็ดตัวผู้ป่วย (Bed Bath) / ดูแลความสะอาดปากและฟัน (Oral Care) ในเคสติดเตียง',
    completed: false,
    details: `Morning Routine Hygiene:
• ช่วยเหลือผู้ป่วยเตียง 05, 08, 10, 11
• เปลี่ยนผ้าปูที่นอน ปลอกหมอน เสื้อผ้าผู้ป่วย
• บ้วนปากด้วย 0.12% Chlorhexidine gluconate ในเคส on endotracheal tube เพื่อป้องกัน VAP`
  },
  {
    id: 'task-12',
    date: '01/09/2569',
    time: '08:30',
    priority: 'ปานกลาง',
    title: 'ฟีดอาหารทางสายยาง (NG Tube Feeding) ตามมื้อ พร้อมเช็คเศษอาหารตกค้าง (Residual Volume)',
    completed: false,
    details: `รอบให้อาหารสายยาง 08:00 น. & 12:00 น.:
• เตียง 10: BD (1:1) 350 mL + น้ำตาม 50 mL
• เตียง 16: Glucerna SR 250 mL
ข้อปฏิบัติ:
- ทดสอบตำแหน่งสาย NG ก่อนฟีดทุกครั้ง
- ดูด Residual หากเกิน 100 mL หรือเกินครึ่งหนึ่งของมื้อก่อนหน้า ให้ Hold อาหารและแจ้งแพทย์`
  }
];

// App State
let tasks = [];
let currentPage = 'dashboard'; // 'dashboard' | 'todo'
let currentFilter = 'all'; // 'all' | 'pending' | 'completed'
let searchQuery = '';
let timeFilter = 'all';
let currentlyViewedTaskId = null;

// Nurse Voice/Speech quotes
const NURSE_SPEECHES = [
  "สวัสดีค่ะพว.สมเจต วันนี้สู้ๆ นะคะ! 🩺",
  "อย่าลืมประเมิน MEWS เตียง 09 ด้วยนะคะ ✨",
  "รอบวัด V/S 08:30 น. เตรียมพร้อมแล้วค่ะ 😊",
  "คนไข้ในวอร์ดอาการคงที่ ขอให้เป็นวันที่ราบรื่นนะคะ! 💖",
  "Order ใหม่จากแพทย์เวรเข้ามาแล้ว ตรวจสอบได้เลยค่ะ 📋",
  "ดื่มน้ำพักผ่อนบ้างนะคะ พว.สมเจตคนเก่ง! 🫖"
];
let currentSpeechIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  initClock();
  initEventListeners();
  initAnimatedNurse();
  render();
});

// Load Tasks
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      tasks = JSON.parse(saved);
    } else {
      tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
      saveTasks();
    }
  } catch (e) {
    console.error('Error loading tasks:', e);
    tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
}

function resetToSampleData() {
  if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นทางการแพทย์ตามตัวอย่างใช่หรือไม่?')) {
    tasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
    saveTasks();
    render();
    showToast('รีเซ็ตข้อมูลเริ่มต้นเรียบร้อยแล้ว', 'success');
  }
}

// Page Navigation
function switchPage(page) {
  currentPage = page;
  
  const viewDashboard = document.getElementById('viewDashboard');
  const viewTodo = document.getElementById('viewTodoList');
  const pageTitle = document.getElementById('pageTitle');
  const headerBackBtn = document.getElementById('headerBackBtn');
  const blueAccentBar = document.getElementById('blueAccentBar');
  const drawerDash = document.getElementById('drawerDashboardLink');
  const drawerTodo = document.getElementById('drawerTodoLink');

  if (page === 'dashboard') {
    if (viewDashboard) viewDashboard.classList.add('active');
    if (viewTodo) viewTodo.classList.remove('active');
    if (pageTitle) pageTitle.textContent = 'หน้าหลัก';
    if (headerBackBtn) headerBackBtn.style.display = 'none';
    if (blueAccentBar) blueAccentBar.style.display = 'inline-block';
    if (drawerDash) drawerDash.classList.add('active');
    if (drawerTodo) drawerTodo.classList.remove('active');
  } else {
    if (viewDashboard) viewDashboard.classList.remove('active');
    if (viewTodo) viewTodo.classList.add('active');
    if (pageTitle) pageTitle.textContent = 'To Do List';
    if (headerBackBtn) headerBackBtn.style.display = 'inline-flex';
    if (blueAccentBar) blueAccentBar.style.display = 'none';
    if (drawerDash) drawerDash.classList.remove('active');
    if (drawerTodo) drawerTodo.classList.add('active');
  }

  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateBack() {
  if (currentPage === 'todo') {
    switchPage('dashboard');
  } else {
    switchPage('todo');
  }
}

// Live Clock & Date
function initClock() {
  const clockEl = document.getElementById('liveClock');
  const dateEl = document.getElementById('liveDate');
  const heroDate = document.getElementById('heroCalendarDate');

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (dateEl) dateEl.textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`;

    // Thai Date for Hero Banner
    const thaiDays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    if (heroDate) {
      heroDate.textContent = `${thaiDays[now.getDay()]}ที่ ${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543}`;
    }
  }

  update();
  setInterval(update, 10000);
}

// Setup Event Listeners
function initEventListeners() {
  const profileWidget = document.getElementById('userProfileWidget');
  const profileMenu = document.getElementById('profileDropdownMenu');
  if (profileWidget && profileMenu) {
    profileWidget.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!profileWidget.contains(e.target)) {
        profileMenu.classList.remove('show');
      }
    });
  }

  const menuBtn = document.getElementById('menuToggleBtn');
  const browserSidebarBtn = document.getElementById('btnBrowserSidebar');
  if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
  if (browserSidebarBtn) browserSidebarBtn.addEventListener('click', toggleSidebar);

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeSidebar();
    }
  });
}

function toggleSidebar() {
  const drawer = document.getElementById('sidebarDrawer');
  const overlay = document.getElementById('sidebarOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

function closeSidebar() {
  const drawer = document.getElementById('sidebarDrawer');
  const overlay = document.getElementById('sidebarOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// Animated Nurse Speech & Interaction
function initAnimatedNurse() {
  const container = document.querySelector('.nurse-avatar-container');
  if (container) {
    container.addEventListener('click', () => {
      playGentleChime();
      triggerNurseSpeech(true);
    });
  }

  // Periodic greeting rotation every 8 seconds
  setInterval(() => {
    triggerNurseSpeech(false);
  }, 8000);
}

// Gentle audio chime using browser Web Audio API
function playGentleChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    // Audio context not allowed until interaction
  }
}

// Trigger Nurse Speech Bubble
function triggerNurseSpeech(isManualClick = false) {
  const bubble = document.getElementById('nurseSpeechBubble');
  const textEl = document.getElementById('nurseSpeechText');
  const charWrapper = document.getElementById('nurseCharacter');
  if (!bubble || !textEl) return;

  if (isManualClick) {
    currentSpeechIndex = (currentSpeechIndex + 1) % NURSE_SPEECHES.length;
    // Cheerful bounce animation on click
    if (charWrapper) {
      charWrapper.style.animation = 'none';
      setTimeout(() => {
        charWrapper.style.animation = 'nurseBreathe 3.6s ease-in-out infinite';
      }, 50);
    }
  } else {
    currentSpeechIndex = Math.floor(Math.random() * NURSE_SPEECHES.length);
  }

  textEl.textContent = NURSE_SPEECHES[currentSpeechIndex];
  bubble.style.transform = 'scale(1.08)';
  setTimeout(() => {
    bubble.style.transform = 'scale(1)';
  }, 250);
}

// ==========================================================
// DASHBOARD & TO-DO RENDERING
// ==========================================================

function updateDashboardMetrics() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const totalBadge = document.getElementById('dashTotalBadge');
  const remNum = document.getElementById('dashRemainingNum');
  const compNum = document.getElementById('dashCompletedNum');
  const pBar = document.getElementById('dashProgressBar');
  const pLabel = document.getElementById('dashProgressLabel');

  if (totalBadge) totalBadge.textContent = `รวม ${total} รายการ`;
  if (remNum) remNum.textContent = remaining;
  if (compNum) compNum.textContent = completed;
  if (pBar) pBar.style.width = `${percent}%`;
  if (pLabel) pLabel.textContent = `เป้าหมายรอบเช้า ${percent}% สำเร็จ`;
}

// Status Counters
function renderCounters() {
  const remainingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const remEl = document.getElementById('remainingCount');
  const compEl = document.getElementById('completedCount');

  if (remEl) remEl.textContent = remainingCount;
  if (compEl) compEl.textContent = completedCount;

  updateDashboardMetrics();
}

function updateSelectAllCheckbox() {
  const selectAllCb = document.getElementById('selectAllCheckbox');
  if (!selectAllCb) return;

  const visibleTasks = getFilteredTasks();
  if (visibleTasks.length === 0) {
    selectAllCb.checked = false;
    selectAllCb.indeterminate = false;
    return;
  }

  const allChecked = visibleTasks.every(t => t.completed);
  const someChecked = visibleTasks.some(t => t.completed);

  selectAllCb.checked = allChecked;
  selectAllCb.indeterminate = !allChecked && someChecked;
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'วิกฤต/ด่วนมาก': return 'priority-critical';
    case 'สูง': return 'priority-high';
    case 'ปานกลาง': return 'priority-medium';
    default: return 'priority-low';
  }
}

function getFilteredTasks() {
  return tasks.filter(task => {
    if (currentFilter === 'pending' && task.completed) return false;
    if (currentFilter === 'completed' && !task.completed) return false;
    if (timeFilter !== 'all' && task.time !== timeFilter) return false;

    if (searchQuery) {
      const matchTitle = task.title.toLowerCase().includes(searchQuery);
      const matchDetails = (task.details || '').toLowerCase().includes(searchQuery);
      if (!matchTitle && !matchDetails) return false;
    }

    return true;
  });
}

function render() {
  renderCounters();
  updateSelectAllCheckbox();

  const container = document.getElementById('todoListContainer');
  if (!container) return;

  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:12px">
          <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
        </svg>
        <h3>ไม่พบรายการ To-Do</h3>
        <p>ไม่มีงานที่ตรงกับเงื่อนไขการค้นหาหรือตัวกรองในขณะนี้</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(task => {
    const priorityClass = getPriorityClass(task.priority);
    const completedClass = task.completed ? 'is-completed' : '';
    const isChecked = task.completed ? 'checked' : '';

    return `
      <div class="todo-item-card ${completedClass}" id="task-card-${task.id}">
        
        <div class="todo-left-content">
          <label class="custom-checkbox-wrapper todo-checkbox-wrapper" onclick="event.stopPropagation()">
            <input type="checkbox" class="task-checkbox-input" ${isChecked} onchange="toggleTaskCompletion('${task.id}', this.checked)">
            <span class="custom-checkbox"></span>
          </label>

          <span class="todo-time-tag">${escapeHtml(task.time)}</span>

          <span class="todo-priority-mini-dot ${priorityClass}" title="ระดับความสำคัญ: ${task.priority}"></span>

          <div class="task-title" onclick="openViewModal('${task.id}')" title="คลิกเพื่อดูรายละเอียด: ${escapeHtml(task.title)}">
            ${escapeHtml(task.title)}
          </div>
        </div>

        <div class="todo-action-group">
          <button class="action-circle-btn btn-view-eye" onclick="openViewModal('${task.id}')" title="ดูรายละเอียด" aria-label="ดูรายละเอียด">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>

          <button class="action-circle-btn btn-delete-trash" onclick="deleteTask('${task.id}', event)" title="ลบรายการ" aria-label="ลบรายการ">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

// Handlers for Filters
function applyStatusFilter(filterType, element) {
  currentFilter = filterType;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filterType);
  });
  render();
}

function handleSearch(val) {
  searchQuery = val.trim().toLowerCase();
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) clearBtn.style.display = searchQuery ? 'inline-block' : 'none';
  render();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  handleSearch('');
}

function handleTimeFilter(val) {
  timeFilter = val;
  render();
}

function toggleSelectAll(isChecked) {
  const visibleTasks = getFilteredTasks();
  visibleTasks.forEach(task => task.completed = isChecked);
  saveTasks();
  render();
  showToast(isChecked ? 'ทำเครื่องหมายเสร็จสิ้นทุกรายการที่แสดง' : 'ยกเลิกการเลือกทุกรายการ', 'info');
}

function toggleTaskCompletion(id, isChecked) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = isChecked;
    saveTasks();
    renderCounters();
    updateCardAppearance(id, isChecked);
    updateSelectAllCheckbox();
  }
}

function updateCardAppearance(id, isCompleted) {
  const card = document.getElementById(`task-card-${id}`);
  if (card) {
    card.classList.toggle('is-completed', isCompleted);
    const cb = card.querySelector('.task-checkbox-input');
    if (cb) cb.checked = isCompleted;
  }
}

function deleteTask(id, event) {
  if (event) event.stopPropagation();
  const task = tasks.find(t => t.id === id);
  const taskTitle = task ? task.title : 'รายการ';

  if (confirm(`คุณต้องการลบ "${taskTitle.substring(0, 40)}..." ใช่หรือไม่?`)) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
    showToast('ลบรายการงานเรียบร้อยแล้ว', 'danger');
  }
}

// Modal Handlers
function openAddModal() {
  const form = document.getElementById('addTaskForm');
  if (form) form.reset();

  const dateInput = document.getElementById('addDate');
  const timeInput = document.getElementById('addTime');
  const priorityInput = document.getElementById('addPriority');

  if (dateInput) dateInput.value = '01/09/2569';
  if (timeInput) timeInput.value = '17:30';
  if (priorityInput) priorityInput.value = 'ปานกลาง';

  document.getElementById('addModal').classList.add('active');
}

function handleAddTask(e) {
  e.preventDefault();

  const date = document.getElementById('addDate').value.trim();
  const time = document.getElementById('addTime').value.trim();
  const priority = document.getElementById('addPriority').value;
  const title = document.getElementById('addTitle').value.trim();
  const details = document.getElementById('addDetails').value.trim();

  if (!title) {
    alert('กรุณากรอกหัวข้อ');
    return;
  }

  const newTask = {
    id: 'task-' + Date.now(),
    date: date || '01/09/2569',
    time: time || '08:30',
    priority: priority || 'ปานกลาง',
    title: title,
    completed: false,
    details: details
  };

  tasks.unshift(newTask);
  saveTasks();
  closeModal('addModal');
  render();
  showToast('เพิ่มรายการงานใหม่สำเร็จแล้ว', 'success');
}

function openViewModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  currentlyViewedTaskId = id;

  document.getElementById('viewDateValue').textContent = task.date || '01/09/2569';
  document.getElementById('viewTimeValue').textContent = task.time || '08:30';
  
  const priorityBadge = document.getElementById('viewPriorityBadge');
  const priorityText = document.getElementById('viewPriorityText');
  priorityText.textContent = task.priority || 'ปานกลาง';

  priorityBadge.className = 'priority-pill-badge';
  if (task.priority === 'วิกฤต/ด่วนมาก') priorityBadge.classList.add('p-critical');
  else if (task.priority === 'สูง') priorityBadge.classList.add('p-high');
  else if (task.priority === 'ทั่วไป/ต่ำ') priorityBadge.classList.add('p-low');

  document.getElementById('viewTitleValue').textContent = task.title;

  const detailsContainer = document.getElementById('viewDetailsValue');
  detailsContainer.innerHTML = formatClinicalNote(task.details);

  document.getElementById('viewModal').classList.add('active');
}

function formatClinicalNote(text) {
  if (!text) return '<span style="color:#94a3b8; font-style:italic;">ไม่มีรายละเอียดเพิ่มเติม</span>';

  const safeText = escapeHtml(text);
  let formatted = safeText
    .replace(/(เตียง \d+:.*?)(?=\n|$)/g, '<strong style="color:#1d4ed8; font-size:15px; display:block; margin-top:8px; margin-bottom:4px;">$1</strong>')
    .replace(/(D \(Data\):|A \(Action\):|R \(Response\):|Focus:)/g, '<strong style="color:#0f172a; margin-top:4px; display:inline-block;">$1</strong>')
    .replace(/(ลงชื่อ:.*?)(?=\n|$)/g, '<span style="color:#64748b; font-style:italic; display:block; margin-top:6px;">$1</span>');

  return formatted;
}

function switchToEditFromView() {
  if (!currentlyViewedTaskId) return;
  closeModal('viewModal');
  openEditModal(currentlyViewedTaskId);
}

function openEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById('editTaskId').value = task.id;
  document.getElementById('editDate').value = task.date || '01/09/2569';
  document.getElementById('editTime').value = task.time || '08:30';
  document.getElementById('editPriority').value = task.priority || 'ปานกลาง';
  document.getElementById('editTitle').value = task.title || '';
  document.getElementById('editDetails').value = task.details || '';

  document.getElementById('editModal').classList.add('active');
}

function handleSaveEdit(e) {
  e.preventDefault();

  const id = document.getElementById('editTaskId').value;
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.date = document.getElementById('editDate').value.trim();
  task.time = document.getElementById('editTime').value.trim();
  task.priority = document.getElementById('editPriority').value;
  task.title = document.getElementById('editTitle').value.trim();
  task.details = document.getElementById('editDetails').value.trim();

  saveTasks();
  closeModal('editModal');
  render();
  showToast('บันทึกการแก้ไขรายการเรียบร้อย', 'success');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '🗑️';

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
