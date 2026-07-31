# FinChain DaNang — Prototype (Vite + React)

This repository contains a minimal React + TypeScript prototype implementing the MVP user stories from `user-story.md`.

Design reference (Figma):
https://www.figma.com/design/GznWnnuChGBXwFhlqQhmVV/Figma-work?node-id=0-1&p=f&t=cjc8BEYRyPFYQor6-0

Quick start

```bash
cd d:/code/DUE
npm install
npm run dev
```

What is included

- Pages for Payment, Lending, Risk Control and Ledger (see `src/pages`).
- Simple SHA-256 transaction hash generation on the Payment page.
- LTV calculation and approval rule on the Lending page.
- Risk simulation slider on the Risk Control page.
- Sample ledger view with expandable blocks.

Next steps (suggested)

- Run `npm install` then `npm run dev` to start the app.
- Wire Payment submissions to append blocks to the ledger (local or backend).
- Export visual assets from the Figma link and implement styles/components to match.
