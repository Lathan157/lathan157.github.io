// Year
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});

// Scroll progress bar
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.width = (scrolled * 100).toFixed(2) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Magnetic-ish hover (for fun)
document.querySelectorAll('.cta-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
  });
  btn.addEventListener('mouseleave', () => (btn.style.transform = 'translate(0,0)'));
});

// Job title scramble/typing
(function () {
  const el = document.getElementById('position');
  if (!el) return;

  const titles = [
    'Software Developer','Web Developer','Mobile App Developer','Data Scientist',
    'Network Engineer','UI/UX Designer','DevOps Engineer','Cybersecurity Analyst',
    'Machine Learning Engineer','Game Developer'
  ];
  let i = 0, busy = false;

  function scramble(text) {
    return text.split('').map(() =>
      String.fromCharCode(33 + Math.floor(Math.random() * 94))
    ).join('');
  }

  function animateTo(text) {
    let idx = 0; busy = true; el.style.filter = 'blur(0)';
    const id = setInterval(() => {
      if (idx >= text.length) {
        clearInterval(id); setTimeout(() => { busy = false; el.style.color = '#fff'; }, 1200);
      } else { el.textContent = text.slice(0, ++idx); }
    }, 120);
  }

  function cycle() {
    if (busy) return;
    busy = true;
    const target = titles[i];
    const scrambleId = setInterval(() => {
      el.textContent = scramble(target);
      el.style.color = `hsl(${Math.random()*360},100%,60%)`;
      el.style.filter = `blur(${(Math.random()*3).toFixed(1)}px)`;
    }, 80);
    setTimeout(() => { clearInterval(scrambleId); animateTo(target); }, 1400);
    i = (i + 1) % titles.length;
  }

  cycle();
  setInterval(cycle, 5200);
})();


// Reveal-on-scroll (IntersectionObserver + fallback)
(function () {
  const targetSel = '.reveal, .content-card, .project';
  const els = Array.from(document.querySelectorAll(targetSel));

  // Ensure hero is visible without reveal class
  // Add reveal class to section contents programmatically
  document.querySelectorAll('.section').forEach(sec => {
    if (!sec.classList.contains('alt')) sec.classList.add('reveal');
  });

  function makeVisible(el){ el.classList.add('visible'); }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          makeVisible(e.target);
          io.unobserve(e.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    // Fallback
    const check = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 80) makeVisible(el);
      });
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }
})();
