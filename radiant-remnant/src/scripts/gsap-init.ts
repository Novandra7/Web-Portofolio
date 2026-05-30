import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".card-stack", { perspective: 1200 });

    gsap.from(".nav-link", {
      y: -10,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
    });

    // ── Hero entrance ─────────────────────────────────────────────────────
    const heroLines = gsap.utils.toArray<HTMLElement>(".hero-title span");
    if (heroLines.length) {
      gsap.from(heroLines, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
      });
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const cardSections = gsap.utils.toArray<HTMLElement>(".card-section");
      if (cardSections.length === 0) return;

      cardSections.forEach((section, index) => {
        gsap.set(section, {
          zIndex: index + 1,
          transformOrigin: "center top",
        });

        const layer = section.querySelector<HTMLElement>(".card-content");
        if (layer) {
          gsap.set(layer, {
            transformOrigin: "center top",
            willChange: "transform",
          });
        }
      });

      cardSections.slice(1).forEach((section, index) => {
        const previousSection = cardSections[index];
        const previousLayer =
          previousSection.querySelector<HTMLElement>(".card-content") ??
          previousSection;

        gsap.to(previousLayer, {
          y: -18,
          scale: 0.94,
          rotateX: -4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "top top+=64",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      cardSections.forEach((section) => {
        const revealItems = [
          section.querySelector<HTMLElement>(".section-title"),
          ...gsap.utils.toArray<HTMLElement>(".about-line", section),
          ...gsap.utils.toArray<HTMLElement>(".project-card", section),
          ...gsap.utils.toArray<HTMLElement>(".contact-field", section),
        ].filter(Boolean) as HTMLElement[];

        if (revealItems.length) {
          gsap.from(revealItems, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              once: true,
            },
          });
        }
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());
    });
  }
}
