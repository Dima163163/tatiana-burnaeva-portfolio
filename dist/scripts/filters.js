import { all } from './dom.js';

export function setupFilters() {
  const buttons = all('[data-filter]');
  const cards = all('[data-category]');
  const rows = all('[data-case-row]');

  if (!buttons.length || !cards.length) return;

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    cards.forEach((card) => {
      const hidden = filter !== 'all' && card.dataset.category !== filter;
      card.classList.toggle('is-filtered', hidden);
    });

    rows.forEach((row) => {
      const hasVisibleCard = row.querySelectorAll('[data-category]:not(.is-filtered)').length > 0;
      row.classList.toggle('is-empty', !hasVisibleCard);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
  });

  applyFilter('all');
}
