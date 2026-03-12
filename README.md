# 日本語 Nihongo — Japanese Learning App

A full-featured PWA (Progressive Web App) for learning Japanese.
Works as a **website on desktop/laptop** and installs as a **native-feel app on mobile**.

---

## Features
- 📱 **Mobile app** — installs via "Add to Home Screen" (iOS & Android)
- 💻 **Desktop website** — fully responsive for all screen sizes
- 🔊 **Audio pronunciation** — Japanese text-to-speech on all platforms
- 📶 **Offline capable** — works without internet after first load
- 💾 **Progress saved** — localStorage keeps your learned items between sessions
- **Hiragana & Katakana** — 46 characters each, tap to mark as learned
- **Vocabulary flashcards** — 18 words across N5–N2 JLPT levels
- **Grammar lessons** — Beginner → Intermediate → Advanced
- **Rōmaji toggle** — show/hide romanization globally

---

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:5173

### Build for production
```bash
npm install
npm run build
```
This creates a `dist/` folder ready to deploy.

---

## Deployment Options

### Option 1 — Vercel (Recommended, free)
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — done! Your app is live with HTTPS ✅

### Option 2 — Netlify (Free)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually
3. Drag & drop the `dist/` folder into Netlify → done!

### Option 3 — GitHub Pages
1. In `vite.config.js`, add `base: '/your-repo-name/'` inside `defineConfig`
2. Run `npm run build`
3. Push the `dist/` folder contents to the `gh-pages` branch

---

## Installing as a Mobile App

### Android (Chrome)
1. Open the website in Chrome
2. Tap the ⋮ menu → "Add to Home screen"
3. The app installs with a native icon — no app store needed!

### iOS (Safari)
1. Open the website in Safari
2. Tap the Share button → "Add to Home Screen"
3. Tap Add — the app appears on your home screen

---

## Tech Stack
- **React 18** + **Vite 5**
- **vite-plugin-pwa** → Service Worker + Web App Manifest
- **Web Speech API** → Japanese TTS (no API key needed)
- **CSS custom properties** → Dark theme with CSS variables
- **localStorage** → Persistent progress without a backend
