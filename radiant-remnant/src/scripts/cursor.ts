import { gsap } from 'gsap';

const initCustomCursor = () => {
  const pointerFine = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!pointerFine || prefersReducedMotion) {
    return;
  }

  const cursor = document.querySelector<HTMLElement>('.cursor');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');

  if (!cursor || !ring) {
    return;
  }

  document.documentElement.classList.add('has-custom-cursor', 'cursor-ready');

  const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' });
  const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

  window.addEventListener('mousemove', (event) => {
    cursorX(event.clientX);
    cursorY(event.clientY);
    ringX(event.clientX);
    ringY(event.clientY);
  });

  const setActive = (active: boolean) => {
    ring.classList.toggle('cursor-ring--active', active);
  };

  const interactive = document.querySelectorAll<HTMLElement>('a, button, [data-cursor="hover"]');
  interactive.forEach((element) => {
    element.addEventListener('mouseenter', () => setActive(true));
    element.addEventListener('mouseleave', () => setActive(false));
  });

  window.addEventListener('mouseleave', () => {
    cursor.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });

  window.addEventListener('mouseenter', () => {
    cursor.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });
};

if (typeof window !== 'undefined') {
  initCustomCursor();
}
