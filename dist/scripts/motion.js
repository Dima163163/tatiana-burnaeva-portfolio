import { all, one } from './dom.js';

export function setupMotion() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = one('.hero');
  const progressBar = one('.scroll-progress');
  let scrollFrame = 0;

  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = `${height > 0 ? Math.min(100, window.scrollY / height * 100) : 0}%`;
    scrollFrame = 0;
  };

  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (hero && !reducedMotion.matches) {
    requestAnimationFrame(() => hero.classList.add('motion-ready'));
  }

  const revealItems = all('.section-heading, .approach-grid article, .about-heading, [data-reveal="item"]');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.05 });

  revealItems.forEach((item) => {
    item.classList.add('reveal-ready');
    observer.observe(item);
  });
}
