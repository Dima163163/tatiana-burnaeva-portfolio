"use strict";
let opener = null;
function openDialog(dialog, button) {
  opener = button;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus();
  });
});
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryTitle = document.querySelector('#gallery-title');
const galleryDescription = document.querySelector('#gallery-description');
const galleryCount = document.querySelector('#gallery-count');
const galleryAllFigures = [...document.querySelectorAll('.source-gallery figure')];
let galleryFigures = [];
let galleryIndex = 0;

function renderGallery(index, figures = galleryFigures) {
  galleryFigures = figures;
  if (!galleryFigures.length || !galleryImage || !galleryTitle || !galleryDescription || !galleryCount) return;
  galleryIndex = (index + galleryFigures.length) % galleryFigures.length;
  const figure = galleryFigures[galleryIndex];
  const image = figure.querySelector('img');
  const caption = figure.querySelector('figcaption');
  if (!image) return;
  galleryImage.src = image.currentSrc || image.src;
  galleryImage.alt = image.alt;
  galleryTitle.textContent = image.alt;
  galleryDescription.textContent = caption?.textContent || '';
  galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryFigures.length).padStart(2, '0')}`;
}

if (galleryDialog && galleryAllFigures.length) {
  galleryAllFigures.forEach((figure) => {
    const group = figure.closest('.source-gallery');
    const groupFigures = group ? [...group.querySelectorAll('figure')] : [figure];
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Открыть экран: ${figure.querySelector('img')?.alt || 'скриншот проекта'}`);
    figure.addEventListener('click', () => {
      renderGallery(groupFigures.indexOf(figure), groupFigures);
      openDialog(galleryDialog, figure);
    });
    figure.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      renderGallery(groupFigures.indexOf(figure), groupFigures);
      openDialog(galleryDialog, figure);
    });
  });
  galleryDialog.querySelector('.gallery-prev')?.addEventListener('click', () => renderGallery(galleryIndex - 1));
  galleryDialog.querySelector('.gallery-next')?.addEventListener('click', () => renderGallery(galleryIndex + 1));
  galleryDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') renderGallery(galleryIndex - 1);
    if (event.key === 'ArrowRight') renderGallery(galleryIndex + 1);
  });
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const filterCards = [...document.querySelectorAll('[data-category]')];
const filterRows = [...document.querySelectorAll('[data-case-row]')];

function applyCaseFilter(filter) {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  filterCards.forEach((card) => {
    const hidden = filter !== 'all' && card.dataset.category !== filter;
    card.classList.toggle('is-filtered', hidden);
  });
  filterRows.forEach((row) => {
    const hasVisibleCard = row.querySelectorAll('[data-category]:not(.is-filtered)').length > 0;
    row.classList.toggle('is-empty', !hasVisibleCard);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => applyCaseFilter(button.dataset.filter || 'all'));
});
if (filterButtons.length) applyCaseFilter('all');


const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const progressBar = document.querySelector('.scroll-progress');
let scrollFrame = 0;
function updateProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = `${height > 0 ? Math.min(100, window.scrollY / height * 100) : 0}%`;
  scrollFrame = 0;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, {passive: true});
window.addEventListener('resize', updateProgress);
updateProgress();
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.05});
  document.querySelectorAll('.section-heading, .approach-grid article, .about-heading, [data-reveal="item"]').forEach((item) => {
    item.classList.add('reveal-ready');
    observer.observe(item);
  });
}
