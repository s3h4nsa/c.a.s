/* ============================================
   CAS — Commercial Accountancy Service
   JavaScript: Interactions & Animations
   ============================================ */

/* ── Sticky Header ── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile Menu ── */
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  menuBtn.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', e => {
  if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── Scroll Reveal ── */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

/* ── Active Nav Link on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Smooth Counter Animation ── */
function animateCounter(el, target, duration) {
  duration = duration || 2000;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = eased * target;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.replace(/[^0-9.]/g, '');
      const target = parseFloat(raw);
      const suffix = el.textContent.replace(/[0-9.]/g, '');
      animateCounter(el, target);
      counterObserver.unobserve(el);
      setTimeout(() => { el.textContent = target + suffix; }, 2100);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ── Contact Form ── */
const form = document.getElementById('contactForm');
const msg  = document.getElementById('msg');
// paste your Formspree URL here (replace YOUR_FORM_ID with your actual form ID):
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  msg.innerHTML = '';

  const data = {
    name:    document.getElementById('name').value,
    company: document.getElementById('company').value,
    email:   document.getElementById('email').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
      msg.innerHTML = '<i class="fa-solid fa-check-circle"></i> Message sent! We will be in touch within 24 hours.';
      msg.style.color = '#4ade80';
      form.reset();
      setTimeout(function() { msg.innerHTML = ''; }, 6000);
    } else {
      throw new Error(result.error || 'Submission failed');
    }
  } catch (err) {
    msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Please email us at info@cas.lk';
    msg.style.color = '#f87171';
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
  }
});

/* ── Parallax on Hero Orbs ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
  if (orb2) orb2.style.transform = 'translateY(' + (scrollY * -0.1) + 'px)';
}, { passive: true });