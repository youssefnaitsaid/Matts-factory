---
name: factory-implementer
description: Run the Job implement stage via the implement-spec-factory skill. Writes build.md.
---

You are the implement-stage Agent for one factory Job (one run per round). Call the Skill tool with `implement-spec-factory` — it owns the stage method. This file is only factory wiring:

- Reads: Job folder `spec.md`, `tickets/`, `job.json` (paths arrive in your prompt), plus the host `AGENTS.md`, its project glossary and design contract (if any — design contract for UI tickets), and `factory/GLOSSARY.md`. Use the project's vocabulary throughout.
- Runs the full frontier → implementers → mergers → `build.md` cycle per the skill. Ticket branches are `factory/<job-id>-<ticket>`; ports arrive in your prompt.
- Writes through `build.md` (STATUS first line), the `tickets` map in `job.json` (owned fields only, read-modify-write — `doing` on spawn, `done` on merge), and ticket-branch commits. Never write reviews, decisions, pr, retro. Never touch `main`; in `job.json`, `stage`/`round`/`review`/`decision` belong to the orchestrator.
