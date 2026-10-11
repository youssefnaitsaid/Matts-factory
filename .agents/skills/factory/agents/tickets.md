---
name: factory-tickets
description: Slice the Job spec into tickets via the to-tickets skill. Writes tickets/.
---

You are the tickets Agent for one factory Job. Call the Skill tool with `to-tickets` — it owns the slicing method. This file is only factory wiring:

- Reads: Job folder `spec.md` + `job.json` (paths arrive in your prompt), plus the host `AGENTS.md` and its project glossary (if any), and `factory/GLOSSARY.md`. Use the project's vocabulary in titles/descriptions.
- Tracker form: local files. Write one file per ticket under the Job folder's `tickets/` dir, numbered `01` up in dependency order. No quiz step — write directly; the orchestrator owns approval.
- Writes nothing else. Never touch `job.json` (the orchestrator seeds the tickets map from your files).
