# 🌟 Solyaniu Portfolio

Современное портфолио с анимированными партиклами, тёмной/светлой темой и интерактивным дизайном.

## 🎨 Особенности

- **Две темы** - Переключение между тёмной и светлой темой
- **Живые партиклы** - Анимированный фон с настраиваемыми эффектами:
  - ⭐ Звёзды
  - 💖 Сердечки (glow эффект)
  - ✝️ Готические кресты
  - ⚫ Круги
- **Адаптивный дизайн** - Полная поддержка мобильных устройств
- **Секция проектов** - Карточки проектов с кнопками скачивания
- **Модальное окно** - Выбор между исходным кодом и готовой сборкой

## 🚀 Быстрый старт

### Вариант 1: Открыть в браузере
Просто откройте `index.html` в любом современном браузере.

### Вариант 2: Локальный сервер (рекомендуется)
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## 📁 Структура

```
portfolio/
├── index.html          # Главная страница
├── styles.css          # Стили с двумя темами
├── script.js           # Логика партиклов и интерактивы
├── logo.svg            # Логотип
└── README.md           # Документация
```

## ⚙️ Настройка

### Изменение контактной информации

Откройте `index.html` и найдите секции:

```html
<!-- GitHub ссылка -->
<a href="https://github.com/ВАШ_НИК" target="_blank" class="btn btn-primary btn-github">

<!-- Telegram ссылка -->
<a href="https://t.me/ВАШ_НИК" target="_blank" class="btn btn-secondary btn-telegram">
```

### Добавление проектов

Найдите секцию `projects-grid` и добавьте новую карточку:

```html
<div class="project-card">
    <div class="project-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- Ваша иконка -->
        </svg>
    </div>
    <h3 class="project-title">Название проекта</h3>
    <p class="project-description">Описание проекта</p>
    <div class="project-tags">
        <span class="tag">Тег 1</span>
        <span class="tag">Тег 2</span>
    </div>
    <div class="project-actions">
        <a href="#" class="btn btn-small btn-download" data-project="unique-id">
            Скачать
        </a>
        <a href="https://github.com/..." target="_blank" class="btn btn-small btn-outline">
            Код
        </a>
    </div>
</div>
```

Затем добавьте проект в `script.js`:

```javascript
const projects = {
    'unique-id': {
        name: 'Название проекта',
        source: 'https://github.com/...',
        build: 'ссылка-на-скачивание'
    }
};
```

### Настройка цветов темы

В `styles.css` измените CSS переменные:

```css
:root {
    --accent-primary: #7c4dff;      /* Основной акцент */
    --accent-secondary: #946dff;    /* Вторичный акцент */
}
```

## 🎯 Настройка партиклов

Партиклы настраиваются через панель (кнопка ⚙️ в шапке):

- **Тип** - Звёзды / Сердечки / Кресты / Круги
- **Количество** - 20-300 частиц
- **Скорость** - Скорость движения
- **Размер** - Размер частиц
- **Свечение** - Включить/выключить glow эффект
- **Цвет** - Выбор цвета или пресеты

## 📱 Поддерживаемые браузеры

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🎨 Кастомизация

### Изменение логотипа

Замените `logo.svg` на свой файл или используйте PNG:

```html
<div class="logo">
    <img src="ваш-лого.png" alt="Logo" class="logo-img">
</div>
```

### Добавление аватара

В секции `.avatar` замените placeholder на изображение:

```html
<div class="avatar">
    <img src="ваше-фото.jpg" alt="Solyaniu" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Изменение текста

Все текстовые элементы находятся в `index.html`:
- `.hero-greeting` - Приветствие
- `.hero-title` - Заголовок
- `.hero-subtitle` - Подзаголовок
- `.hero-description` - Описание
- `.about-text` - Текст "Обо мне"
- `.skill-tag` - Навыки

## 🌐 Хостинг

### GitHub Pages
1. Создайте репозиторий `username.github.io`
2. Загрузите файлы из `portfolio/`
3. Сайт доступен по адресу `https://username.github.io`

### Netlify
1. Перетащите папку `portfolio` на netlify.com
2. Готово!

### Vercel
```bash
npm i -g vercel
vercel
```

## 📊 Производительность

- ✅ Lazy loading для анимаций
- ✅ CSS containment для карточек
- ✅ RequestAnimationFrame для партиклов
- ✅ Минимальный reflow/repaint

## 🔧 Решение проблем

### Партиклы не отображаются
Проверьте консоль браузера (F12). Убедитесь, что `script.js` загружен.

### Тема не сохраняется
Очистите localStorage: `localStorage.clear()`

### Модальное окно не закрывается
Убедитесь, что jQuery не конфликтует с vanilla JS.

## 📝 Лицензия

MIT - Используйте как угодно.

## 👤 Автор

**Solyaniu**

- GitHub: [@Solyaniu](https://github.com/Solyaniu)
- Telegram: [@Solyaniu](https://t.me/Solyaniu)

---

**Создано с 💜 для сообщества**
