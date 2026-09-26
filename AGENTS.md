# AGENTS.md

Sample developer portfolio for a class demo. Next.js 16 App Router, Tailwind 4, TypeScript.

- Words live only in `content/*.md`. Never hardcode copy in components.
- Each variant lives in `app/<variant>/` with its own scoped CSS file (`.sp`, `.tm`, `.sw`, `.bt`, `.ps`).
- Shared pieces: `lib/content.ts`, `lib/variants.ts`, `components/ProjectArt.tsx`, `components/VariantSwitcher.tsx`.
- No em dashes or en dashes anywhere, including comments.
- Verify with `npm run build`, then screenshots at 320, 375, 390, 428, and 1440 px.
- Branch flow: feature branch, PR to `staging`, then PR from `staging` to `main`.
