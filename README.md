# Second Brain — AI Agent PWA

Your personal AI assistant that remembers everything. A "second brain" that runs entirely in the browser.

## Features

- **Persistent Memory** — Automatically extracts and stores facts, events, preferences from conversations
- **3-Layer Memory** — Episodic (events), Semantic (facts), Procedural (patterns)
- **8 Life Domains** — Work, Learning, Health, Personal, Finance, Goals, Tech, General
- **Memory Graph** — Visualize connections between memories
- **Auto-Merge** — Agent automatically consolidates similar memories
- **Insight Analysis** — Cross-domain pattern detection
- **Backup & Export** — JSON export, Markdown export (Obsidian-compatible)
- **PWA** — Installable on iPhone, works offline

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Dexie.js (IndexedDB)
- Groq API (Llama 3.3 70B)
- react-force-graph-2d

## Setup

1. Get a free Groq API key at [console.groq.com](https://console.groq.com)
2. Open the app → Settings (⚙️) → paste your API key
3. Start chatting — the agent builds your knowledge base automatically

## Local Development

```bash
npm install
npm run dev
```

## Deploy

Push to `main` branch — GitHub Actions auto-deploys to GitHub Pages.
