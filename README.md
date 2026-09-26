# Sample developer portfolio, five variants

A class demo. One set of content files, five different designs, deployed on Vercel.

Kemi Adler is a fictional full-stack engineer. Every company, project, and number on the
site is invented for teaching.

## The five variants

| Route | Variant | Idea borrowed from |
|---|---|---|
| `/split` | Sticky sidebar, dark charcoal, coral accent | brittanychiang.com, antfu.me |
| `/terminal` | Interactive command line, amber phosphor | yuriytkach.com |
| `/swiss` | International grid, white, signal red | lelandjansen.com, tomweightman.com |
| `/bento` | Tile grid, cobalt and lime, live Lagos clock | om.dev, tamalsen.dev |
| `/poster` | Drenched tomato red, one project per screen | julianozen.com, christinemunar.com |

`/` lists all five with screenshots.

## How the words get onto the page

```
content/*.md  ->  lib/content.ts  ->  every variant page
```

Edit a file in `content/`, and all five designs change. See `content/README.md`.

## Run it on your laptop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The dev script uses `--webpack` on purpose. This project lives in a folder with spaces in its
name (DEMO PROJECT FOR CLASS), and the default Turbopack dev server fails to load Google fonts
from such paths. Production builds are unaffected.

## Branches

- `main` is the live site.
- `staging` is where changes land first for a preview.
- Feature branches merge into `staging` by pull request, then `staging` merges into `main`.

## Stack

Next.js 16 (App Router, static pages), React 19, Tailwind CSS 4, TypeScript, gray-matter.
Fonts load through `next/font/google`. Project images are drawn SVG in `components/ProjectArt.tsx`.
