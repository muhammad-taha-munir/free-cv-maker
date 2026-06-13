# CV Maker 🤖

> **Vibe-coded with Claude (Anthropic) in Antigravity IDE.** The entire frontend — component architecture, state management, drag/drop, PDF export, and multi-template preview — was built through AI-assisted development, with me steering the product decisions and UX.

---

## Why I Built This

I was making my CV on one of those popular online CV builder websites. Spent time filling everything in, got it looking good — then hit a **paywall just to export my own CV as a PDF.**

So I closed the tab and built my own.

This is a fully functional, free, offline CV builder that runs in your browser and exports to PDF without asking for your credit card. No backend, no database, no subscription — just a React app that does exactly what those websites charge you for.

Frontend only — intentionally. It covers everything I needed. I *could* vibe-code a backend too, but why add complexity when localStorage gets the job done?

---

## Features

- Edit CV content (personal info + sections)
- Edit layout/design (templates + settings)
- **Live preview** as you type
- Drag/drop section reordering
- Rich text editing inside sections
- Multiple CV templates (Modern / Classic / Creative)
- Export options:
  - 💾 **Save CV as JSON** — portable, reloadable
  - 📂 **Load CV from JSON** — resume where you left off
  - 📄 **Export as PDF** — via `html2canvas` + `jspdf`, no paywall

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **React** + **Vite** | Frontend framework + dev server |
| **Tailwind CSS** | Styling |
| **lucide-react** | Icons |
| **html2canvas** + **jspdf** | PDF generation from DOM |
| **react-quill** | Rich text editor |
| **@hello-pangea/dnd** | Drag/drop section reordering |

> No backend. No database. CV state persists to `localStorage`.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

> If you hit a dependency resolution error:
> ```bash
> npm install --legacy-peer-deps
> ```

### 2. Start the dev server

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`)

---

## Project Structure

```
src/
├── main.jsx                  # App entry + mounts CVProvider
├── App.jsx                   # Header + Layout + PDF export logic
├── context/
│   └── CVContext.jsx         # CV state management (localStorage)
└── components/
    ├── Layout.jsx            # Editor/preview split view
    ├── Header.jsx            # JSON load/save + PDF export button
    ├── editor/               # Personal info, sections, design editors
    └── preview/              # CV templates + preview panel
```

---

## Exporting PDF

The **Export PDF** button captures the Preview panel as a DOM snapshot and converts it to a PDF using `html2canvas` + `jspdf`.

- Preview rendered by `src/components/preview/PreviewPanel.jsx`
- Export logic lives in `src/App.jsx`

---

## What's Not Included (gitignored)

- `node_modules/`
- `dist/` (build output)
- Local logs and debug files
- IDE/editor config files

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.