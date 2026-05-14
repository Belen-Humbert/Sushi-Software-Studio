/* ── THEME TOGGLE ── */
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('sss-theme', html.dataset.theme);
}
// Restore saved theme
const saved = localStorage.getItem('sss-theme');
if (saved) document.documentElement.dataset.theme = saved;

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ── NAV ACTIVE ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cosmos)' : '';
  });
});

function csGo(id, idx) {
  var el = document.getElementById('cs-' + id);
  if (!el) return;
  var total = parseInt(el.getAttribute('data-total'));
  idx = ((idx % total) + total) % total;
  el.setAttribute('data-current', idx);
  el.querySelector('.cs-track').style.transform = 'translateX(-' + (idx * 100) + '%)';
  var dots = el.querySelectorAll('.cs-dot');
  dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
}
function csMove(id, dir) {
  var el = document.getElementById('cs-' + id);
  if (!el) return;
  csGo(id, parseInt(el.getAttribute('data-current')) + dir);
}
var _ap = {};
function startAP(id) { _ap[id] = setInterval(function(){ csMove(id, 1); }, 3200); }
function stopAP(id) { clearInterval(_ap[id]); }
document.addEventListener('DOMContentLoaded', function() {
  ['sll','lll','mol','gym','bib'].forEach(function(id) {
    var el = document.getElementById('cs-' + id);
    if (!el) return;
    startAP(id);
    el.addEventListener('mouseenter', function(){ stopAP(id); });
    el.addEventListener('mouseleave', function(){ startAP(id); });
  });
});