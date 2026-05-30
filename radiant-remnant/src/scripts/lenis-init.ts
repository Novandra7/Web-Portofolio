import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link][href^="#"]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.card-section[id]'));

    const setActiveNav = () => {
      if (!sections.length || !navLinks.length) return;

      const currentY = window.scrollY + window.innerHeight * 0.45;
      const activeSection =
        [...sections].reverse().find((section) => currentY >= section.offsetTop) ?? sections[0];
      const activeHref = `#${activeSection.id}`;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === activeHref;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    lenis.on('scroll', setActiveNav);
    window.addEventListener('resize', setActiveNav);
    requestAnimationFrame(setActiveNav);

    const getAnchorTarget = (href: string) => {
      if (href === '#hero') return 0;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return null;

      return Math.max(0, target.offsetTop);
    };

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const targetScroll = getAnchorTarget(href);
        if (targetScroll !== null) {
          event.preventDefault();

          lenis.scrollTo(targetScroll, {
            duration: 1.1,
            lock: true,
            force: true,
            onComplete: () => {
              history.replaceState(null, '', href);
              setActiveNav();
            },
          });

          const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
          const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
          if (toggle && menu && toggle.getAttribute('aria-expanded') === 'true') {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('is-open');
          }
        }
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}
