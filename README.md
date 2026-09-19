# Портфолио Татьяны Бурнаевой

Статический сайт на HTML, CSS и JavaScript. Главная — `dist/index.html`, каталог — `dist/cases/index.html`. Четыре подробных кейса: МТС ID, МТС Профиль, интернет-магазин МегаФон и внутренние сервисы.

## Локальный запуск

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Откройте http://127.0.0.1:4173/.

Светлая визуальная система находится в `dist/light-design.css`. Старые CSS-файлы не подключаются. `dist/script.js` управляет фильтрами, галереями, индикатором прокрутки и появлением элементов. Учитывается prefers-reduced-motion.

Контактные ссылки ведут в Telegram и Behance из исходного профиля. Портрет сохранён в `dist/assets/temporary-designer-portrait.png`, скриншоты — в `dist/assets/cases/`.

Описание дизайна и выполненных проверок — в `design-notes.md`. Предыдущая главная и JavaScript сохранены в `output/design-backup/`.
