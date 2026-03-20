/* =============================================
   MATH COURSE — APP.JS
   Mobile Education App
============================================= */

// ── DOM References ──
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');
const menuBtn   = document.getElementById('menuBtn');
const closeBtn  = document.getElementById('closeBtn');
const startBtn  = document.getElementById('startBtn');
const darkToggle = document.getElementById('darkToggle');

// ── Sidebar ──
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Swipe to close sidebar
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.addEventListener('touchend', (e) => {
  const dx = touchStartX - e.changedTouches[0].clientX;
  if (dx > 60 && sidebar.classList.contains('open')) closeSidebar();
}, { passive: true });

// ── Page Navigation ──
const pages = {};
document.querySelectorAll('.page').forEach(p => {
  const id = p.id.replace('page-', '');
  pages[id] = p;
});

function navigateTo(pageId) {
  // Check if page exists, fallback to home
  const target = pages[pageId] || pages['home'];

  // Deactivate all pages
  Object.values(pages).forEach(p => p.classList.remove('active'));

  // Activate target
  target.classList.add('active');

  // Update sidebar nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });

  // Update bottom nav items
  document.querySelectorAll('.bottom-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });

  // Close sidebar after navigation
  closeSidebar();

  // Scroll to top
  if (target) target.scrollTop = 0;
}

// Sidebar nav click events
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = item.dataset.page;
    if (pageId) navigateTo(pageId);
  });
});

// Bottom nav click events
document.querySelectorAll('.bottom-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = item.dataset.page;
    if (pageId) navigateTo(pageId);
  });
});

// CTA Button on home
if (startBtn) {
  startBtn.addEventListener('click', () => navigateTo('level'));
}

// ── Dark Mode ──
const savedTheme = localStorage.getItem('mathcourse-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (darkToggle) darkToggle.checked = true;
}

if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkToggle.checked);
    localStorage.setItem('mathcourse-theme', darkToggle.checked ? 'dark' : 'light');
  });
}

// ── Level Selection ──
document.querySelectorAll('.level-card').forEach(card => {
  card.addEventListener('click', () => {
    // Remove selected from all
    document.querySelectorAll('.level-card').forEach(c => {
      c.classList.remove('selected');
      const badge = c.querySelector('.level-badge');
      if (badge) badge.remove();
    });

    // Select clicked card
    card.classList.add('selected');
    const levelName = card.querySelector('h3').textContent;

    // Add badge
    const badge = document.createElement('div');
    badge.className = 'level-badge';
    badge.textContent = 'Actuel';
    card.appendChild(badge);

    // Update profile level in sidebar
    const profileLevel = document.querySelector('.profile-level');
    if (profileLevel) {
      profileLevel.textContent = `Niveau : ${levelName}`;
    }

    // Show toast
    showToast(`Niveau "${levelName}" sélectionné !`, '✅');
  });
});

// ── Toast Notification ──
function showToast(message, icon = 'ℹ️') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> ${message}`;

  // Toast styles
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '90px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#1e293b',
    color: '#f1f5f9',
    padding: '12px 20px',
    borderRadius: '50px',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: '500',
    border: '1px solid rgba(249,115,22,0.4)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Remove after 2.5s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ── Support Form ──
const supportTextarea = document.querySelector('#page-support textarea');
const supportBtn = document.querySelector('#page-support .cta-btn');
if (supportBtn && supportTextarea) {
  supportBtn.addEventListener('click', () => {
    const msg = supportTextarea.value.trim();
    if (!msg) {
      showToast('Veuillez écrire votre message.', '⚠️');
      return;
    }
    supportTextarea.value = '';
    showToast('Message envoyé avec succès !', '✅');
  });
}

// ── Support Cards ──
document.querySelectorAll('.support-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h4').textContent;
    showToast(`${title} sélectionné`, '📞');
  });
});

// ── Notification Bell ──
document.querySelector('.notif-btn').addEventListener('click', () => {
  showToast('Aucune nouvelle notification', '🔔');
});

// ── Progress Bars Animation on load ──
function animateProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 300);
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Start on home
  navigateTo('home');
  animateProgressBars();
  console.log('📚 MathCourse App chargée avec succès !');
});
