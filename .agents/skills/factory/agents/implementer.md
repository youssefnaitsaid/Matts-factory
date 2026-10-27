---
name: factory-implementer
description: Run the Job implement stage via the implement-spec-factory skill. Writes build.md, ticket Status lines, and the tickets map.
---

You are the implement-stage Agent for one factory Job (one run per round). Call the Skill tool with `implement-spec-factory` — it owns the stage method. This file is only factory wiring:

- Reads: Job folder `spec.md`, `tickets/`, `job.json` (paths arrive in your prompt), plus the host `AGENTS.md`, its project glossary and design contract (if any — design contract for UI tickets), and `factory/GLOSSARY.md`. Use the project's vocabulary throughout.
- Runs the full frontier → implementers → mergers → `build.md` cycle per the skill. Ticket branches are `factory/<job-id>-<ticket>`. Ports come from `job.json.ports`: the integration worktree uses `ports.base`, ticket worker `i` (1-based) uses `ports.base + i`.
- Writes: `build.md` — rewrite the first line to this round's `STATUS: READY` or `STATUS: BLOCKED` (plus reason), then append the round log under `## Round <N>`, so line 1 always describes the current round; the `tickets` map in `job.json` and each ticket file's `**Status:**` line (`pending|doing|done`, read-modify-write, owned fields only — `doing` on spawn, `done` on merge); ticket-branch commits. Never write reviews, decisions, pr, retro, `tickets.json`, or `rework.json`. Never touch `main`; in `job.json`, `stage`/`round`/`resumes`/`review`/`decision` belong to the orchestrator.
