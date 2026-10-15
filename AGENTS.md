# Factory — Project Agent Factory

Local-only loop that turns a complete spec file into Done through Matt Pocock skills, with a static Dashboard for live status. Never pushed; the host repo (`<repo>`) is untouched except by Job branches. Canon lives in `GLOSSARY.md` (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human); orchestrator + agents live in `.agents/skills/factory/`.

## Dashboard

```powershell
npx serve factory -l 8000
# → http://localhost:8000/dashboard.html
```

Static page, 5 columns (Tickets/Implement/Review/Needs-human/Done). Polls `jobs/index.json` + each `job.json` every 2s: ticket chips flip `pending → doing → done` with a `done/total` count, review/gate chips fill from first lines, cards in Needs-human stand out. Click a card for the file drawer (`spec.md` → tickets → `build.md` → reviews → `decision.md` → `pr.md` → `retro.md`).

## Layout

```
factory/
  GLOSSARY.md          factory canon (host project vocabulary untouched)
  dashboard.html       static board (dark, factory-owned theme)
  jobs/index.json      manifest of job ids (orchestrator-maintained)
  jobs/<job-id>/
    job.json           live state (orchestrator sole writer — Dashboard reads it)
    spec.md            input spec, copied as-is
    tickets/NN-slug.md tracer tickets with blocking edges
    build.md           STATUS: READY|BLOCKED first line + validation + log
    round-N/review-code.md   VERDICT: PASS|CHANGES first line
    decision.md        always ESCALATE first line + why + for-the-human (live gate file)
    decision-N.md      archived gate from round N (one per rework)
    rework-k.md        verbatim human notes from /factory rework
    pr.md / retro.md   only after /factory accept
```