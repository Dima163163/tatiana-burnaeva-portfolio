import { all, one } from './dom.js';
import { openDialog } from './dialogs.js';

export function setupGallery() {
  const dialog = one('#gallery-dialog');
  const image = one('#gallery-image');
  const title = one('#gallery-title');
  const description = one('#gallery-description');
  const count = one('#gallery-count');
  const figures = all('.source-gallery figure');

  if (!dialog || !image || !title || !description || !count || !figures.length) return;

  let activeFigures = [];
  let activeIndex = 0;

  const render = (index, nextFigures = activeFigures) => {
    activeFigures = nextFigures;
    if (!activeFigures.length) return;

    activeIndex = (index + activeFigures.length) % activeFigures.length;
    const figure = activeFigures[activeIndex];
    const source = figure.querySelector('img');
    if (!source) return;

    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    title.textContent = source.alt;
    description.textContent = figure.querySelector('figcaption')?.textContent || '';
    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeFigures.length).padStart(2, '0')}`;
  };

  const openFigure = (figure) => {
    const group = figure.closest('.source-gallery');
    const groupFigures = group ? all('figure', group) : [figure];
    render(groupFigures.indexOf(figure), groupFigures);
    openDialog(dialog, figure);
  };

  figures.forEach((figure) => {
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Открыть экран: ${figure.querySelector('img')?.alt || 'скриншот проекта'}`);
    figure.addEventListener('click', () => openFigure(figure));
    figure.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openFigure(figure);
    });
  });

  dialog.querySelector('.gallery-prev')?.addEventListener('click', () => render(activeIndex - 1));
  dialog.querySelector('.gallery-next')?.addEventListener('click', () => render(activeIndex + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') render(activeIndex - 1);
    if (event.key === 'ArrowRight') render(activeIndex + 1);
  });
}
