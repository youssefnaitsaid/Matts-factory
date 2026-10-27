# Factory — Project Agent Factory

Local-only loop that turns a complete spec file into Done through Matt Pocock skills, with a static Dashboard for live status. Never pushed; the host repo (`<repo>`) is untouched except by Job branches. Canon lives in `GLOSSARY.md` (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human); orchestrator + agents live in `.agents/skills/factory/`.

## Dashboard

```powershell
npx serve factory -l 8000
# → http://localhost:8000/dashboard.html
```

Static page, 5 columns (Tickets/Implement/Review/Needs-human/Done). Polls `jobs/index.json` + each `job.json` every 2s: ticket chips flip `pending → doing → done` with a `done/total` count, review/gate chips fill from first lines (review shows `PASS · N` when N judgement-call smells were accepted), cards in Needs-human stand out with the first open item above the commands. Click a card for the file drawer (`spec.md` → tickets → `build.md` → reviews → `decision.md` → `pr.md` → `retro.md`).

## Layout

```
factory/
  GLOSSARY.md          factory canon (host project vocabulary untouched)
  BACKLOG.md           retro candidates a human promotes into specs
  dashboard.html       static board (dark, factory-owned theme)
  .lock                one-orchestrator-per-workspace lock (created/removed by the orchestrator)
  jobs/index.json      manifest of job ids (orchestrator-maintained)
  jobs/<job-id>/
    job.json           live state + base, specSha, ports, resumes, open items (orchestrator writes; Dashboard reads)
    spec.md            input spec, copied as-is and hashed at creation
    tickets/NN-slug.md tracer tickets with blocking edges
    tickets.json       ticket filename manifest (orchestrator writes; drawer reads)
    build.md           STATUS: READY|BLOCKED first line for the current round + per-round logs + Unverified: when UI evidence is structural
    log.md             append-only transitions, spawns, SHAs, failures
    round-N/review-code.md   VERDICT: PASS|CHANGES first line
    decision.md        always ESCALATE first line + why + for-the-human (live gate file)
    decision-N.md      archived gate from round N (one per rework/amend)
    rework-k.md        verbatim human notes from /factory rework
    rework.json        rework + amend note manifest (orchestrator writes; drawer reads)
    amend-k.md         spec amendment + old/new specSha
    pr.md / retro.md   only after /factory accept
```

## Commands

`/factory <spec.md>` starts a Job; `/factory accept|rework|amend|resume|cleanup <job-id>` handle the gate, spec changes, crash recovery, and post-merge cleanup. Job folders are gitignored; the harness core is tracked.

## Host: dummy-app

The app the factory builds features into. Zero dependencies, no install step.

- Specs: `dummy-app/specs/NNN-slug.md` (complete before `/factory <spec>`)
- Test: `node --test "dummy-app/test/**/*.test.js"`
- Check: `node --check` on every file under `dummy-app/src/`, plus `dummy-app/serve.js`
- Dev server: `node dummy-app/serve.js <port>`
- Formatter: none
- Base branch: `main`

## Agent skills

### Issue tracker

Tickets live as local markdown — `factory/jobs/<job-id>/tickets/NN-slug.md` inside a Job, `.scratch/<feature-slug>/issues/NN-slug.md` standalone. No GitHub issues. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `factory/GLOSSARY.md` plus `docs/adr/`. See `docs/agents/domain.md`.
