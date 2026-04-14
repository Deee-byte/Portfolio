/**
 * typing.ts
 * Typing effect for the hero subtitle
 */

const phrases: string[] = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Laravel Engineer',
  'Flutter Developer',
  'Open-Source Contributor',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

const TYPING_SPEED   = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER    = 1800;

export function initTyping(targetId: string): void {
  const el = document.getElementById(targetId);
  if (!el) return;

  function tick(): void {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el!.textContent = current.slice(0, --charIndex);
    } else {
      el!.textContent = current.slice(0, ++charIndex);
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause then start deleting
      setTimeout(() => { isDeleting = true; tick(); }, PAUSE_AFTER);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  // Start after a short delay so the hero fade-in completes
  setTimeout(tick, 1200);
}
