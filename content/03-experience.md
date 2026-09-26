<!-- Feeds: the Experience section. To add a role, copy one item's shape under roles. -->
---
heading: Experience
roles:
  - company: Paystride
    role: Senior Software Engineer
    period: 2024 to now
    place: Fintech · remote
    summary: Own the payout reconciliation service. Failed payouts down 38% in the first quarter.
    highlights:
      - Rebuilt payout reconciliation in TypeScript and PostgreSQL. Failed payouts dropped 38%.
      - Cut p95 latency on the transfers endpoint from 420 ms to 140 ms with one indexed query.
      - Added idempotency keys to 11 payment endpoints and ended duplicate charges on mobile retries.
    stack: [TypeScript, Node.js, PostgreSQL, Redis, AWS]
  - company: Classbase
    role: Software Engineer
    period: 2022 to 2023
    place: Edtech · Lagos
    summary: Built the offline-first attendance app now used by 1,200 schools.
    highlights:
      - Built the React Native attendance app used by 1,200 schools.
      - Wrote the sync engine that merged 3.4M offline edits with zero lost records.
      - Shrank the Android bundle from 38 MB to 17 MB for low-storage phones.
    stack: [React Native, TypeScript, SQLite, Go]
  - company: Freelance
    role: Web Developer
    period: 2020 to 2022
    place: Small businesses · remote
    summary: Shipped 14 sites and dashboards, every one launched above 90 on Lighthouse.
    highlights:
      - Shipped 14 marketing sites and dashboards with Next.js and Vercel.
      - Automated Lighthouse checks so every launch scored above 90 on performance.
    stack: [Next.js, React, Vercel, Tailwind CSS]
---
