/**
 * main.ts
 * Portfolio entry point — orchestrates all features:
 *  - Navbar scroll + sticky behavior
 *  - Mobile menu toggle
 *  - Smooth scroll navigation
 *  - Hero entrance animations
 *  - Scroll reveal (sections)
 *  - Skill bars
 *  - Typing effect
 *  - Contact form feedback
 */

import { initTyping        } from './typing.ts';
import { initScrollReveal, initSkillBars, initHeroAnimations } from './animations.ts';

// ─── DOM Ready ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initHeroAnimations();
  initScrollReveal();
  initSkillBars();
  initTyping('typing-target');
  initContactForm();
  initActiveNavHighlight();
});

// ─── Navbar scroll behavior ─────────────────────────────────────────────────
function initNavbar(): void {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = (): void => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ─── Active nav highlight on scroll ────────────────────────────────────────
function initActiveNavHighlight(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────
function initMobileMenu(): void {
  const hamburger   = document.getElementById('hamburger');
  const closeBtn    = document.getElementById('close-menu');
  const mobileMenu  = document.getElementById('mobile-menu');
  const overlay     = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link, #mnl-hire');

  const open = (): void => {
    mobileMenu?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = (): void => {
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  mobileLinks.forEach((link) => link.addEventListener('click', close));
}

// ─── Smooth scroll ──────────────────────────────────────────────────────────
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();
      const offset = 70; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── Contact form ────────────────────────────────────────────────────────────
function initContactForm(): void {
  const form    = document.getElementById('contact-form')   as HTMLFormElement | null;
  const success = document.getElementById('form-success');
  const submit  = document.getElementById('contact-submit') as HTMLButtonElement | null;

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name    = (document.getElementById('contact-name')         as HTMLInputElement).value.trim();
    const email   = (document.getElementById('contact-email-input')  as HTMLInputElement).value.trim();
    const message = (document.getElementById('contact-message')      as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) return;

    // Simulate send
    if (submit) {
      submit.textContent = 'Sending…';
      submit.disabled = true;
    }

    setTimeout(() => {
      success?.classList.remove('hidden');
      form.reset();
      if (submit) {
        submit.textContent = 'Send Message 🚀';
        submit.disabled = false;
      }
      setTimeout(() => success?.classList.add('hidden'), 4000);
    }, 1400);
  });
}
