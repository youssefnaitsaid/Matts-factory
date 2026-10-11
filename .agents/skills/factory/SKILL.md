---
name: factory
description: Run the project agent factory. Use when the user types /factory <spec-path>, /factory accept <job-id>, or /factory rework <job-id> <note>. The session that runs it becomes the orchestrator of the tickets → implement-spec → review → needs-human → pr → retro loop (entry is always a complete spec file).
---

# Factory

You are the orchestrator for one Job. You run the loop below, spawn every Agent, and write your Job's `job.json` `stage`/`round`/`review`/`decision` fields plus its `factory/jobs/index.json` entry. The implement-stage Agent owns only the `tickets` map. Both use read-modify-write (read the file, change owned fields, rewrite whole) so neither clobbers the other. You never write code, specs, reviews, decisions, pr, or retro yourself. Agents do the work; you move the Job along and keep `job.json` current.

Factory canon lives in `factory/GLOSSARY.md` (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human). The host project's vocabulary (its glossary, if it has one) binds all spec/ticket/pr copy; its design contract (if any) binds UI work. The host `AGENTS.md` provides setup, dev-server, check, and test commands. Git root is `<repo>` (defined below); factory runtime is `<workspace>/factory/` (never pushed). Shell conventions follow the host `AGENTS.md` (this factory was built under Windows PowerShell 5.1).

## The loop

```
spec file → to-tickets → implement-spec (frontier workers + mergers) → code-review → ESCALATE needs-human        pr → retro → done
                               ▲                                                       │                         ▲
                               └────────── /factory rework: resume implement ──────────┘─────── /factory accept ─┘
```

No APPROVE-merge path. `decision.md` always starts `ESCALATE`. Human owns the final `git merge` by hand. The factory always begins with a complete spec file — there is no grill and no spec-normalization step.

| Step | Agent file (`.agents/skills/factory/agents/`) | Wraps | Writes |
| ---- | --------------------------------------------- | ----- | ------ |
| tickets | `tickets.md` | `to-tickets` tracer bullets + blocking edges | `tickets/NN-slug.md` |
| implement | `implementer.md` (uses `merger.md` inside the stage) | `implement-spec-factory` skill | `build.md` (`STATUS: READY`/`BLOCKED`) + commits on `factory/<job-id>` |
| review | `reviewer-code.md` | `code-review` approach, single reviewer | `round-N/review-code.md` (`VERDICT: PASS`/`CHANGES`) |
| gate | (orchestrator) | — | `decision.md` (`ESCALATE` first line) |
| pr | `pr.md` | `pr` skill template | `pr.md` (Summary/Evidence/Merge Danger) — only after `/factory accept` |
| retro | `retro.md` | `retro` + `writing-for-agents` | `retro.md` — only after `/factory accept` |

`MAX_RESUMES = 2`: after round 1 the implementers can be resumed at most twice (max 3 review rounds). To change the factory, edit this file and the agent files.

Every Agent reads the host `AGENTS.md`, its project glossary and design contract (if they exist — glossary for all copy, design contract for UI work), and its Job folder files. Nothing host-specific lives in agent files beyond those pointers.

## Files

`<workspace>` is the folder holding `factory/`. `<repo>` is the host project's git root. `<name>` is the repo folder name. `<job-id>` is `NNN-kebab-slug`.

```
<workspace>/factory/GLOSSARY.md                 canon (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human)
<workspace>/factory/dashboard.html               static board (npx serve factory -l 8000)
<workspace>/factory/jobs/index.json              manifest: ["001-slug", ...] (you maintain it; Dashboard fetches it)
<workspace>/factory/jobs/<job-id>/job.json       the Job state (you write it, Dashboard reads it)
<workspace>/factory/jobs/<job-id>/spec.md
<workspace>/factory/jobs/<job-id>/tickets/NN-slug.md
<workspace>/factory/jobs/<job-id>/build.md
<workspace>/factory/jobs/<job-id>/rework-<k>.md  written by you from /factory rework
<workspace>/factory/jobs/<job-id>/round-<N>/review-code.md
<workspace>/factory/jobs/<job-id>/decision.md    always ESCALATE (live gate file, rewritten each round)
<workspace>/factory/jobs/<job-id>/decision-<N>.md  archived gate from round N (one per rework)
<workspace>/factory/jobs/<job-id>/pr.md          only after /factory accept
<workspace>/factory/jobs/<job-id>/retro.md       only after /factory accept
<repo>/../<name>-factory/<job-id>/              integration worktree on factory/<job-id>
<repo>/../<name>-factory/<job-id>-<ticket>/     per-ticket worktree on factory/<job-id>-<ticket>
```

### job.json

```json
{ "id": "003-tidy-scope", "feature": "short label from the spec title",
  "branch": "factory/003-tidy-scope",
  "worktree": "C:/path/to/<workspace>/<name>-factory/003-tidy-scope",
  "stage": "review", "round": 2,
  "tickets": { "01-slug": "done", "02-slug": "doing" },
  "review": "pending", "decision": "pending" }
```

- `stage` is one of `tickets|implement|review|needs-human|pr|retro|done`. Worktree setup counts as `tickets`.
- `round` is the current implement→review cycle (0 until implement starts). `review` is `pending|PASS|CHANGES` for the current round only. `decision` is `pending|ESCALATE`.
- `tickets` mirrors `tickets/*.md` Status values (`pending|doing|done`) so the Dashboard renders per-ticket chips.
- Rewrite the whole file on every change. `worktree` is always an absolute path with forward slashes.

### Prompts

Every Agent prompt starts with absolute paths:
`Job folder: <workspace>/factory/jobs/<job-id>/. Worktree: <worktree>. Branch: factory/<job-id>.`
Below, `<paths>` stands for that sentence.

Agents opening pages get a port. With `n` the Job number (`003` → 3), integration gets `4200 + 10n` (003 → 4230), ticket workers offset +1 per ticket index — unless the host `AGENTS.md` defines its own port scheme, which wins. Append as ` Port: <port>.` Serve from the worktree per the host `AGENTS.md` dev-server command.

## /factory <path-to-spec.md>

1. **Create the Job.** Pick next 3-digit number after highest in `factory/jobs/` (`001` if none) + 2–4 word kebab slug: `004-tidy-scope`. Claim with `mkdir factory/jobs/<job-id>` (no `-p`; retry next number if taken). Worktree path is `<workspace>/<name>-factory/<job-id>`. Copy the given spec to `spec.md` as-is (it arrives complete — no normalization step). Write `job.json` (`feature` = short label from the spec title, `stage: tickets`, `round: 0`, `tickets: {}`, `review: pending`, `decision: pending`) and append id to `factory/jobs/index.json`.
2. **Worktree.** From `<repo>`: `git worktree add -b factory/<job-id> <worktree> main`. Then run the host `AGENTS.md` fresh-checkout setup in worktree. On failure stop and tell the user.
3. **Tickets.** Set `stage: tickets`. Spawn `tickets` Agent: `<paths> Slice spec.md into tickets/NN-*.md.` Check ≥1 ticket file; seed `tickets` map in `job.json` with all `pending`.
4. **Implement.** Set `stage: implement`, `round: 1`. Spawn the implement-stage Agent (`agents/implementer.md`, Task `general`): `<paths> Run the implement stage for round 1.` It streams the `tickets` map live (`doing` on implementer spawn, `done` on merge). Wait for it to finish, verify the map against `tickets/` files, then go to **Build check**.

### Build check

Read first line of `build.md`. `STATUS: READY` → **Review round N**. `STATUS: BLOCKED` → **Needs human**.

### Review round N

1. Set `stage: review`, `review: pending`. Create `round-<N>/`.
2. Spawn `reviewer-code`: `<paths> Review round N against spec.md + tickets/.` (code-review approach: spec fidelity, project vocabulary, host design contract, host check green).
3. Wait for `round-<N>/review-code.md`. Read first line (`VERDICT: PASS|CHANGES`), write to `job.json` immediately for live chips. Round done when file exists with valid verdict; else stop and tell user.
4. Decide: all PASS → **Needs human** (write `decision.md` via ESCALATE template below). Any CHANGES + resumes left → `stage: implement`, `round: N+1`, spawn the implement-stage Agent for the CHANGES scope. Any CHANGES + no resumes left → write `decision.md` (`ESCALATE` + `Review rounds exhausted...`) → **Needs human**.

### Needs human

Set `stage: needs-human`. Branch + worktrees stay. Tell user job id, worktree path, quote `decision.md`. Dashboard card sits in Needs-human with `pr`/`retro` chips pending. Human runs `/factory accept` or `/factory rework`.

## /factory accept <job-id>

Job must be `needs-human`. Set `stage: pr`. Spawn `pr` Agent: `<paths> Write pr.md from branch diff + build.md evidence.` Check `pr.md` exists. Set `stage: retro`. Spawn `retro` Agent: `<paths> Write retro.md.` Check exists. Set `stage: done`. Report Done + drawer files. Never merge, never push — human merges `factory/<job-id>` by hand.

## /factory rework <job-id> <note>

Job must be `needs-human`.

1. Archive the gate: rename `decision.md` → `decision-<N>.md` (N = the round just gated). History preserved; the live file is rewritten at the next gate.
2. Write the note verbatim to `rework-<k>.md` (next unused `k`). Map the note to affected tickets: set each to `pending` in the `tickets` map and reset its file Status to `ready-for-agent` with a `Rework <k>` pointer. Untouched tickets stay `done` and are never rebuilt.
3. Set `stage: implement`, `round: <last+1>` (fresh `MAX_RESUMES`), `review: pending`, `decision: pending` (gated files retained as history).
4. Spawn the implement-stage Agent: `<paths> Rework round N: read rework-<k>.md and address it across affected tickets, updating build.md.` Continue from **Build check**.

## Reporting

One short line per transition, e.g. `003-tidy-scope: tickets 01 done, 02 doing → implement`. On gate: needs-human with decision quote. On accept: done with pr/retro paths.
