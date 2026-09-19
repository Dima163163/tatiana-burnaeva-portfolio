import { all } from './dom.js';

let opener = null;

export function openDialog(dialog, trigger) {
  if (!dialog) return;

  opener = trigger;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

export function setupDialogs() {
  all('dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
      const box = dialog.getBoundingClientRect();
      const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
      if (event.target === dialog && outside) dialog.close();
    });

    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      opener?.focus();
      opener = null;
    });
  });
}
