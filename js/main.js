
(function () {
  const root   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const STORED = localStorage.getItem('ib-theme');

  // default dark
  const theme = STORED || 'dark';
  root.setAttribute('data-theme', theme);

  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ib-theme', next);
  });
})();

/* ── CUSTOM CURSOR ── */
(function () {
  const dot  = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!dot) return;
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function raf() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll('a, button, .card, .tag, .filter-btn, .social-link, .explore-card, .blog-card, .blog-featured').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();


(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

(function () {
  const el = document.getElementById('roleText');
  if (!el) return;
  const roles = [
    'Computational Linguist',
    'NLP Researcher',
    'CS + Linguistics Dual',
    'Language Technologist',
    'Creative Technologist',
  ];
  let ri = 0, ci = 0, del = false;
  function tick() {
    const cur = roles[ri];
    if (!del) {
      el.textContent = cur.slice(0, ci + 1);
      ci++;
      if (ci === cur.length) { del = true; setTimeout(tick, 1900); return; }
    } else {
      el.textContent = cur.slice(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, del ? 48 : 82);
  }
  setTimeout(tick, 1200);
})();

/* ── PROJECT FILTER ── */
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat.includes(cat)) ? '' : 'none';
  });
}

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const n = document.getElementById('fname').value;
  const em = document.getElementById('femail').value;
  const s  = document.getElementById('fsubject').value || 'Portfolio Contact';
  const m  = document.getElementById('fmsg').value;
  window.location.href = `mailto:ishitab1310@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent('From: ' + n + ' (' + em + ')\n\n' + m)}`;
}
