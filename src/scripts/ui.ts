// Shared behaviours. Everything is an enhancement: with no JS the page is fully visible and readable.
import Lenis from 'lenis';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const headerH = () => parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 68;

/* ---- smooth scroll (off under reduced motion) ---- */
let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -headerH() - 8 } });
}
window.addEventListener('smooth-scroll', (e) => {
  const y = (e as CustomEvent<{ y: number }>).detail.y;
  if (lenis) lenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y });
});

/* ---- entrances: each group's parts arrive in reading order, once ---- */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const groups = [...document.querySelectorAll<HTMLElement>('[data-reveal-group]')];
  // Anything already on screen is never hidden, so there is no flash on load.
  groups.forEach((g) => {
    const top = g.getBoundingClientRect().top;
    if (top < innerHeight * 0.92) g.classList.add('in');
  });
  root.classList.add('reveal-ready');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  groups.filter((g) => !g.classList.contains('in')).forEach((g) => io.observe(g));
}

/* ---- counters: the final value is in the HTML; count up once on view ---- */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        animateCounter(e.target as HTMLElement);
      });
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
}

function animateCounter(el: HTMLElement) {
  const final = el.dataset.count ?? el.textContent ?? '';
  const m = final.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return;
  const [, prefix, num, suffix] = m;
  const target = parseFloat(num);
  const decimals = (num.split('.')[1] ?? '').length;
  const start = performance.now();
  const duration = 1100;
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

/* ---- copy email ---- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  let timer: number | undefined;
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* nothing else to try */
      }
      ta.remove();
    }
    if (label) {
      label.textContent = 'Copied';
      clearTimeout(timer);
      timer = window.setTimeout(() => (label.textContent = 'Copy'), 2000);
    }
  });
});

/* ---- the one-field contact: build a clean mailto (the plain form still works without JS) ---- */
document.querySelectorAll<HTMLFormElement>('[data-mail]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = form.action.replace(/^mailto:/, '').split('?')[0];
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get('subject') ?? ''));
    const body = encodeURIComponent(String(data.get('body') ?? ''));
    location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});

/* ---- live local time in the footer ---- */
document.querySelectorAll<HTMLElement>('[data-clock]').forEach((el) => {
  const fmt = new Intl.DateTimeFormat('en-IN', {
    timeZone: el.dataset.zone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const render = () => (el.textContent = `${el.dataset.city}, ${fmt.format(new Date()).toLowerCase()}`);
  render();
  window.setInterval(render, 30_000);
});

/* ---- mobile menu: close on link click or Escape ---- */
const menu = document.querySelector<HTMLDetailsElement>('[data-menu]');
if (menu) {
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
}
