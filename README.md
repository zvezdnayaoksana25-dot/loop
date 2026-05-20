# 📚 English Learning PWA

Приложение для изучения английского языка уровня A1. Работает как PWA (Progressive Web App) — можно установить на iPhone и использовать офлайн.

## 🚀 Деплой на GitHub Pages

1. Создай новый репозиторий на GitHub (например, `english-app`)
2. Запуши код:
```bash
cd english-learning-pwa
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

3. Включи GitHub Pages: Settings → Pages → Source: `main` branch, folder: `/ (root)`
4. Если используешь кастомный домен — настрой его в Settings → Pages

**Важно:** Если приложение не на корневом домене (например `username.github.io/repo-name`), измени `base` в `vite.config.ts`:
```ts
base: '/repo-name/'
```

## 📱 Установка на iPhone

1. Открой приложение в Safari
2. Нажми "Поделиться" (квадрат со стрелкой)
3. Выбери "На экран «Домой»"
4. Приложение появится на домашнем экране как нативное

## 🤖 Настройка AI-преподавателя

1. Получи бесплатный API ключ на [console.groq.com](https://console.groq.com)
2. Открой приложение → Настройки → вставь ключ
3. Готово! AI-преподаватель доступен в разделе "AI"

## 📖 Структура курса A1 (50 уроков)

| Уроки | Тема | Грамматика |
|-------|------|------------|
| 1-5 | Основы: приветствия, знакомство, семья, числа, цвета | To Be, местоимения, притяжательные |
| 6-10 | Артикли, дни недели, время, еда, дом | Articles, There is/are |
| 11-15 | Профессии, распорядок, Present Simple | Present Simple (+, ?, -) |
| 16-20 | Хобби, can/can't, спорт, музыка, одежда | Modal verbs |
| 21-25 | Погода, Past Simple (was/were, правильные, неправильные) | Past Simple |
| 26-30 | Выходные, путешествия, транспорт, город, магазины | Various |
| 31-35 | Деньги, ресторан, Future (will, going to), планы | Future tenses |
| 36-40 | Планы, предлоги места/времени, район, направления | Prepositions |
| 41-45 | Здоровье, врач, животные, природа, технологии | Various |
| 46-50 | Телефон, праздники, сравнения, наречия, повторение | Comparisons, Adverbs |

## 🛠 Технологии

- **Vite + React + TypeScript** — фреймворк
- **Tailwind CSS** — стили
- **Framer Motion** — анимации
- **vite-plugin-pwa** — PWA (офлайн, установка)
- **idb-keyval** — IndexedDB (сохранение прогресса)
- **Web Speech API** — озвучка слов и диалогов
- **Groq API** — AI-преподаватель (Llama 3.3 70B)

## 📝 Каждый урок содержит

1. **📖 Теория** — грамматика на русском с примерами
2. **🔤 Слова** — 20 слов с транскрипцией и озвучкой
3. **💬 Диалоги** — реалистичные ситуации
4. **🏋️ Упражнения** — 5 типов:
   - Multiple Choice (выбери ответ)
   - Fill in the Blank (заполни пропуск)
   - Match Pairs (соедини пары)
   - Translate (переведи)
   - Listen & Type (слушай и пиши)
5. **📝 Домашка** — письменное задание с проверкой через AI
