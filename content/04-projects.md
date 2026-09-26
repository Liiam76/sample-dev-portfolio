<!-- Feeds: the Projects section. Each project: name, one-line pitch, the result, and the stack. -->
---
heading: Selected projects
projects:
  - slug: ledgerline
    name: Ledgerline
    kind: API
    year: 2025
    pitch: A double-entry ledger API that refuses to lose a cent.
    result: 2.1M test transactions reconciled at a 99.98% match rate.
    body: Every transfer writes two balanced entries inside one database transaction. Idempotency keys make retries safe, and a nightly job proves the books still balance.
    stack: [TypeScript, PostgreSQL, Docker]
  - slug: offgrid-sync
    name: Offgrid Sync
    kind: Library
    year: 2024
    pitch: Offline sync for React Native apps that work without a signal.
    result: Powers the Classbase sync engine, 3.4M edits merged, zero lost.
    body: Each edit is stored locally as an operation. When the phone reconnects, operations merge with a CRDT so two teachers editing the same register never overwrite each other.
    stack: [TypeScript, React Native, SQLite]
  - slug: shipnote
    name: Shipnote
    kind: CLI
    year: 2025
    pitch: Turns a week of git commits into release notes people read.
    result: Cut our release-notes time from about an hour to 5 minutes.
    body: Shipnote groups commits by pull request, asks the Claude API for a plain-English summary, and writes a markdown changelog you edit before publishing.
    stack: [Go, Claude API, GitHub Actions]
  - slug: busstop
    name: Busstop
    kind: Web app
    year: 2023
    pitch: Live bus arrivals for 60 Lagos routes, on any phone.
    result: Loads in under 1 second on a 3G connection.
    body: A progressive web app that caches the route map, polls a small arrivals API, and keeps working from cache when the connection drops.
    stack: [Next.js, Service Workers, Vercel]
---
