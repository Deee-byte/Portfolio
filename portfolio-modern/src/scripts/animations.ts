/**
 * animations.ts
 * Intersection Observer-based scroll reveal & skill-bar animator
 */

// ─── Scroll Reveal ─────────────────────────────────────────────────────────

export function initScrollReveal(): void {
  const revealClasses = ['.reveal-up', '.reveal-left', '.reveal-right'];
  const elements      = document.querySelectorAll<HTMLElement>(revealClasses.join(','));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after first reveal for performance
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ─── Skill Bar Animation ────────────────────────────────────────────────────

export function initSkillBars(): void {
  const bars = document.querySelectorAll<HTMLElement>('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el    = entry.target as HTMLElement;
          const width = el.dataset.width ?? '0';
          el.style.width = `${width}%`;
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

// ─── Hero entrance animations ───────────────────────────────────────────────

export function initHeroAnimations(): void {
  // Stagger heading, sub, desc, buttons, social
  const heading = document.querySelector<HTMLElement>('.hero-heading');
  const sub     = document.querySelector<HTMLElement>('.hero-sub');
  const desc    = document.querySelector<HTMLElement>('.hero-desc');
  const btns    = document.querySelector<HTMLElement>('.hero-btns');
  const social  = document.querySelector<HTMLElement>('.hero-social');
  const img     = document.querySelector<HTMLElement>('#profile-img');

  const items = [
    { el: heading, delay: 100 },
    { el: sub,     delay: 300 },
    { el: desc,    delay: 500 },
    { el: btns,    delay: 650 },
    { el: social,  delay: 800 },
    { el: img,     delay: 200 },
  ];

  items.forEach(({ el, delay }) => {
    if (!el) return;
    setTimeout(() => el.classList.add('visible'), delay);
  });
}
