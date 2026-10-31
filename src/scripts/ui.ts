// Small shared behaviors: reveal-on-scroll, hero counters, copy button, mobile menu.
// Everything is an enhancement: with no JS the page is fully visible and readable.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* ---- reveal on scroll ---- */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const items = [...document.querySelectorAll<HTMLElement>('.reveal')];
  // Anything already on screen is never hidden, so there is no flash on load.
  const docTop = (el: HTMLElement) => {
    let y = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
    return y;
  };
  items.forEach((el) => {
    if (docTop(el) < scrollY + innerHeight * 0.9) el.classList.add('in');
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
    { threshold: 0.12 },
  );
  items.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));
}

/* ---- counters: final value is in the HTML; animate once on view ---- */
if (!reduceMotion && 'IntersectionObserver' in window) {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
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
  counters.forEach((el) => io.observe(el));
}

function animateCounter(el: HTMLElement) {
  const final = el.dataset.count ?? el.textContent ?? '';
  const m = final.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return;
  const [, prefix, num, suffix] = m;
  const target = parseFloat(num);
  const decimals = (num.split('.')[1] ?? '').length;
  const start = performance.now();
  const duration = 900;
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
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
      // Older browsers / insecure context: fall back to a hidden textarea.
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
