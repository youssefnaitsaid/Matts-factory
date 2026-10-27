---
name: factory
description: Run the project agent factory. Use when the user types /factory <spec-path>, /factory accept <job-id>, /factory rework <job-id> <note>, /factory resume <job-id>, /factory amend <job-id> <note>, or /factory cleanup <job-id>. The session that runs it becomes the orchestrator of the tickets → implement-spec → review → needs-human → pr → retro loop (entry is always a complete spec file).
---

# Factory

You are the orchestrator for one Job. You run the loop below, spawn every Agent, and write the Job's state files: `job.json` (`stage`, `round`, `resumes`, `review`, `openItems`, `openSummary`, `decision`), the `tickets.json` and `rework.json` manifests, `log.md` (stage lines; the implement stage appends its ticket-spawn and merge lines), and the gate files (`decision.md`, `decision-<N>.md`, `amend-<k>.md`), plus the Job's `factory/jobs/index.json` entry. The implement-stage Agent owns the `tickets` map and the ticket files' `Status` lines and acceptance boxes while a round runs, and reopens then re-ticks any already-`done` ticket whose code a CHANGES or resume round changes; you seed and reset those at stage boundaries (creation, rework, amend). All writers use read-modify-write (read the file, change owned fields, rewrite whole; append only for `log.md`) so none clobbers another. You never write code, specs, tickets, reviews, pr, or retro yourself. Agents do the work; you move the Job along and keep the Job files current.

Factory canon lives in `factory/GLOSSARY.md` (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human/Round/Resume/Amend/Integration branch). The host project's vocabulary (its glossary, if it has one) binds all spec/ticket/pr copy; its design contract (if any) binds UI work. The host `AGENTS.md` provides setup, dev-server, check, test, and base-branch commands. Git root is `<repo>` (defined below); factory runtime is `<workspace>/factory/` (never pushed). Shell conventions follow the host `AGENTS.md` (this factory was built under Windows PowerShell 5.1).

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
| implement | `implementer.md` (uses `merger.md` inside the stage) | `implement-spec-factory` skill | `build.md`, ticket `Status` lines + acceptance boxes (reopened when a CHANGES/resume round touches them), the `tickets` map, ticket-spawn/merge lines appended to `log.md`, commits on `factory/<job-id>` |
| review | `reviewer-code.md` | `code-review` approach, single reviewer | `round-N/review-code.md` (`VERDICT: PASS`/`CHANGES` first line + `smell:` open items) |
| gate | (orchestrator) | — | `decision.md` (`ESCALATE` first line + `Open:` items) |
| pr | `pr.md` | `pr` skill template | `pr.md` (Summary/Evidence/Merge Danger) — only after `/factory accept` |
| retro | `retro.md` | `retro` + `writing-for-agents` | `retro.md` + a `factory/BACKLOG.md` entry — only after `/factory accept` |

`MAX_RESUMES = 2`: after round 1 the implement stage can be re-entered at most twice per cycle (max 3 review rounds). The count lives in `job.json.resumes`; `/factory rework` resets it. To change the factory, edit this file and the agent files.

Every Agent reads the host `AGENTS.md`, its project glossary and design contract (if they exist — glossary for all copy, design contract for UI work), and its Job folder files. Nothing host-specific lives in agent files beyond those pointers.

## Files

`<workspace>` is the folder holding `factory/`. `<repo>` is the host project's git root. `<name>` is the repo folder name. `<job-id>` is `NNN-kebab-slug`.

```
<workspace>/factory/GLOSSARY.md                 canon (Factory/Job/Stage/Agent/Dashboard/Frontier/Needs-human/Round/Resume/Amend/Integration branch)
<workspace>/factory/BACKLOG.md                   retro candidates; the retro Agent appends, a human promotes to a spec
<workspace>/factory/.lock                       session lock (you create and remove; one orchestrator per workspace)
<workspace>/factory/dashboard.html              static board (npx serve factory -l 8000)
<workspace>/factory/jobs/index.json             manifest: ["001-slug", ...] (you maintain it; Dashboard fetches it)
<workspace>/factory/jobs/<job-id>/job.json      the Job state (you write it, Dashboard reads it)
<workspace>/factory/jobs/<job-id>/spec.md
<workspace>/factory/jobs/<job-id>/tickets/NN-slug.md
<workspace>/factory/jobs/<job-id>/tickets.json  manifest: ["01-slug.md", ...] (you write it; Dashboard drawer reads it)
<workspace>/factory/jobs/<job-id>/build.md      STATUS first line (current round) + per-round logs + Unverified: when UI evidence is structural
<workspace>/factory/jobs/<job-id>/log.md        append-only transitions, stage + ticket spawns, merges, SHAs, failures (you write stage lines; the implement stage appends ticket lines)
<workspace>/factory/jobs/<job-id>/rework-<k>.md verbatim human notes from /factory rework
<workspace>/factory/jobs/<job-id>/rework.json   note manifest: ["rework-1.md", "amend-1.md", ...] (you write it; Dashboard drawer reads it)
<workspace>/factory/jobs/<job-id>/amend-<k>.md  spec amendment, old + new specSha
<workspace>/factory/jobs/<job-id>/round-<N>/review-code.md   VERDICT first line
<workspace>/factory/jobs/<job-id>/decision.md   always ESCALATE (live gate file, rewritten each gate)
<workspace>/factory/jobs/<job-id>/decision-<N>.md  archived gate from round N (one per rework/amend)
<workspace>/factory/jobs/<job-id>/pr.md         only after /factory accept
<workspace>/factory/jobs/<job-id>/retro.md      only after /factory accept
<repo>/../<name>-factory/<job-id>/              integration worktree on factory/<job-id>
<repo>/../<name>-factory/<job-id>-<ticket>/     per-ticket worktree on factory/<job-id>-<ticket>
```

### job.json

```json
{ "id": "003-tidy-scope", "feature": "short label from the spec title",
  "branch": "factory/003-tidy-scope", "base": "main",
  "worktree": "C:/path/to/<workspace>/<name>-factory/003-tidy-scope",
  "specSha": "<output of git hash-object --no-filters spec.md>",
  "ports": { "base": 4230, "span": 10 },
  "stage": "review", "round": 2, "resumes": 1,
  "tickets": { "01-slug": "done", "02-slug": "doing" },
  "review": "pending", "openItems": 0, "openSummary": "",
  "decision": "pending" }
```

- `stage` is one of `tickets|implement|review|needs-human|pr|retro|done`. Worktree setup counts as `tickets`.
- `round` is the current implement→review cycle (0 until implement starts). `review` is `pending|PASS|CHANGES` for the current round only. `decision` is `pending|ESCALATE`.
- `openItems` counts the `smell:` lines in the current round's review; `openSummary` is the first of them. Both are `0` / `""` when the review reports `none`, and both reset when a new round starts or a rework/amend resets the cycle. A `PASS` with `openItems > 0` means "accepted with debt", not "clean".
- `resumes` counts CHANGES-driven re-entries of the implement stage in the current cycle: 0 at round 1, +1 per re-entry, reset to 0 by `/factory rework`. It is the CHANGES re-entry budget, not a crash counter: a crash re-entry is not counted here — it appears only as a `Resume` log line.
- `base` is the branch the Job branched from: `main` unless the host `AGENTS.md` names a base branch.
- `specSha` is the git blob hash of `spec.md` at creation. Verify it before every review round and again at accept.
- `ports.base` goes to the integration worktree; ticket worker `i` (1-based, in ticket order) gets `ports.base + i`. `ports.span` consecutive ports are reserved per Job, so at most `span - 1` ticket workers run concurrently. Allocate `base = 4200 + 10 * <1-based ordinal in index.json>` unless the host `AGENTS.md` defines a port scheme, which wins and is still recorded here.
- `tickets` mirrors `tickets/*.md` Status values (`pending|doing|done`) so the Dashboard renders per-ticket chips.
- Rewrite the whole file on every change. `worktree` is always an absolute path with forward slashes.

### Prompts

Every Agent prompt starts with absolute paths:
`Job folder: <workspace>/factory/jobs/<job-id>/. Worktree: <worktree>. Branch: factory/<job-id>.`
Below, `<paths>` stands for that sentence.

Reviewer prompts add the fixed point explicitly: `Integration branch: factory/<job-id>. Base: <base>. Fixed point: <base>` (the diff is `<base>...factory/<job-id>`). Never make the reviewer infer it.

Agents opening pages get ports from `job.json.ports` — never from arithmetic in the prompt. Append as ` Port: <port>.` Serve from the worktree per the host `AGENTS.md` dev-server command.

## Failure handling

Every spawn has an expected artifact with a first-line contract (table above). Validate immediately after each spawn:
file exists, its first line matches, and a review artifact also carries an `Open items` block (`none` or one `smell:` line per judgement call). On a missing or malformed artifact, append the failure (stage, round, spawn, what was observed) to `log.md`, retry the same spawn once, then write `decision.md` (`ESCALATE` + `Stage failed: ...`) and go to **Needs human**. A spawn that returns without its artifact counts as failed: never wait indefinitely and never infer success from a report alone. Never hand-edit `job.json` to recover — `/factory resume <job-id>` resumes from disk.

## /factory <path-to-spec.md>

1. **Lock.** Create `factory/.lock` containing the job id. If it already exists, stop and tell the user (delete it only when no other `/factory` session is running). Release the lock at every gate (needs-human), at `done`, and after cleanup. One orchestrator per workspace: parallel Jobs stay out of scope until the serial loop is proven on the host.
2. **Create the Job.** Pick next 3-digit number after highest in `factory/jobs/` (`001` if none) + 2–4 word kebab slug: `004-tidy-scope`. Claim with `mkdir factory/jobs/<job-id>` (no `-p`; retry next number if taken). Worktree path is `<workspace>/<name>-factory/<job-id>`. Copy the given spec to `spec.md` as-is (it arrives complete — no normalization step) and record `specSha` from `git hash-object --no-filters spec.md`. Write `job.json` (`feature` = short label from the spec title, `base`, `ports`, `specSha`, `stage: tickets`, `round: 0`, `resumes: 0`, `tickets: {}`, `review: pending`, `decision: pending`), append id to `factory/jobs/index.json`, and write the first `log.md` line.
3. **Worktree.** From `<repo>`: `git worktree add -b factory/<job-id> <worktree> <base>`. Then run the host `AGENTS.md` fresh-checkout setup in the worktree. On failure stop, log, and tell the user.
4. **Tickets.** Set `stage: tickets`. Spawn `tickets` Agent: `<paths> Slice spec.md into tickets/NN-*.md.` Check ≥1 ticket file. Validate the breakdown before accepting it: every `Blocked by` reference resolves to a ticket number, the graph is acyclic, and at least one ticket has no blockers. On a defect, log it and re-spawn the tickets Agent once with the specific defects; if it fails again, write `decision.md` (`Tickets invalid: ...`) → **Needs human**. Then write `tickets.json` (filenames in number order) and seed `tickets` map in `job.json` with all `pending`.
5. **Implement.** Set `stage: implement`, `round: 1`, `resumes: 0`. Spawn the implement-stage Agent (`agents/implementer.md`, Task `general`): `<paths> Run the implement stage for round 1.` It streams the `tickets` map live (`doing` on implementer spawn, `done` on merge). Wait for it to finish, verify the map against `tickets/` files, then go to **Build check**.

### Build check

Verify `specSha` first: a mismatch is a **Spec changed** gate, not a build failure. Then read the first line of `build.md`. Missing or unreadable → failure handling. Note any `Unverified:` line in the current round's section — the gate quotes it. `STATUS: READY` → **Review round N**. `STATUS: BLOCKED` → one bounded self-repair: if `log.md` has no `self-repair round <N>` entry, append one, keep `stage: implement` at the same round, and spawn the implement stage again with `<paths> Self-repair round <N>: read the blocked reason in build.md and fix it; do not rebuild done tickets.` then re-check. A second BLOCKED in the same round → **Needs human** with the blocked reason.

### Review round N

1. Set `stage: review`, `review: pending`, `openItems: 0`, `openSummary: ""`. Create `round-<N>/`.
2. Spawn `reviewer-code`: `<paths> Integration branch: factory/<job-id>. Base: <base>. Fixed point: <base>. Review round N against spec.md + tickets/. End with the Open items block.`
3. Wait for `round-<N>/review-code.md`. Read first line (`VERDICT: PASS|CHANGES`) and the `Open items` block. Count its `smell:` lines into `job.json.openItems`, take the first into `openSummary`, write both with the verdict immediately for live chips, and append to `log.md`. Invalid verdict or missing block → failure handling.
4. Decide: all PASS → **Needs human** (write `decision.md` from the gate template). Any CHANGES + `resumes < MAX_RESUMES` → increment `resumes`, set `stage: implement`, `round: N+1`, log the transition as `review round N: CHANGES → implement round N+1 (changes <resumes>/<MAX_RESUMES>)`, then spawn the implement-stage Agent for the CHANGES scope. Any CHANGES + `resumes == MAX_RESUMES` → write `decision.md` (`Review rounds exhausted`) → **Needs human**.

### Gate template

`decision.md` first line is exactly `ESCALATE` (the Dashboard parses it), then:

```markdown
ESCALATE

**Why:** <review passed | review rounds exhausted | build blocked | stage failed | spec changed | tickets invalid>

**Open:**
- smell: <line quoted verbatim from the review>
- Unverified: <line quoted from this round's build.md>

**For the human:**
- Inspect: `<worktree>` on `factory/<job-id>`
- Then run: `/factory accept <job-id>` or `/factory rework <job-id> <note>`
```

`**Open:** none` when the review reported no smells and `build.md` has no `Unverified:` line. Never summarise or rerank the quoted lines — the human is accepting exactly what is listed.

For a build block, add the blocked reason. For a stage failure, name the stage and the missing/malformed artifact.

### Needs human

Set `stage: needs-human`, write `decision.md`, release the lock. Branch and worktrees stay. Tell the user the job id, worktree path, and quote `decision.md`. Dashboard card sits in Needs-human with `pr`/`retro` chips pending. Human runs `/factory accept`, `/factory rework`, or `/factory amend`.

## /factory accept <job-id>

Job must be `needs-human`. Acquire the lock. Verify `specSha` (mismatch → stop and tell the user to `/factory amend`). Set `stage: pr`. Spawn `pr` Agent: `<paths> Write pr.md from branch diff + build.md evidence.` Check `pr.md` exists. Set `stage: retro`. Spawn `retro` Agent: `<paths> Write retro.md.` Check exists. Set `stage: done`, release the lock, log, and report Done + drawer files. Never merge, never push — human merges `factory/<job-id>` by hand, then runs `/factory cleanup`.

## /factory rework <job-id> <note>

Job must be `needs-human`. Acquire the lock.

1. Archive the gate: rename `decision.md` → `decision-<N>.md` (N = the round just gated). History preserved; the live file is rewritten at the next gate.
2. Write the note verbatim to `rework-<k>.md` (next unused `k`), ending with `Targets: <openItems> open items from round <N>.` (`0` when the gate listed none), and append the path to `rework.json`.
3. Map the note to affected tickets: set each to `pending` in the `tickets` map, reset its file `**Status:**` to `pending`, untick every acceptance box (`- [x]` → `- [ ]`), and add a `Rework <k>` pointer. Untouched tickets stay `done` and are never rebuilt.
4. Set `stage: implement`, `round: <last+1>`, `resumes: 0`, `review: pending`, `openItems: 0`, `openSummary: ""`, `decision: pending` (gated files retained as history).
5. Spawn the implement-stage Agent: `<paths> Rework round N: read rework-<k>.md and address it across affected tickets, updating build.md.` Continue from **Build check**.

## /factory amend <job-id> <note>

Job must be `needs-human`. Use when the spec itself changed. Acquire the lock.

1. Archive the gate: `decision.md` → `decision-<N>.md`.
2. Write `amend-<k>.md`: the note verbatim, the old `specSha` and the new one (from `git hash-object --no-filters spec.md`), and the spec diff summary. Append the path to `rework.json`.
3. Update `specSha` in `job.json`.
4. Reset **every** ticket to `pending` (file and map), unticking every acceptance box: an amendment moves the target, so prior review evidence no longer covers any ticket.
5. Set `stage: implement`, `round: <last+1>`, `resumes: 0`, `review: pending`, `openItems: 0`, `openSummary: ""`, `decision: pending`.
6. Spawn the implement-stage Agent: `<paths> Amend round N: read amend-<k>.md, reconcile tickets with the updated spec.md, and update build.md.` Continue from **Build check**.

## /factory resume <job-id>

Job must not be `done`. Use after a crash, a hung spawn, or a closed session. Acquire the lock if it is not held. Append `Resume` to `log.md`, then resume from disk only — never from memory:

- `tickets`: if `tickets.json` and its files exist, seed the map and go to **Implement**; otherwise re-spawn the `tickets` Agent.
- `implement`: if `build.md` has a `## Round <current>` section and a valid first line, go to **Build check** (which self-repairs a BLOCKED round once); otherwise re-spawn the implement stage for the current round.
- `review`: if `round-<N>/review-code.md` has a valid verdict, apply the review decision (re-derive `openItems`/`openSummary` from the file if they are absent from `job.json`); otherwise re-spawn the reviewer.
- `needs-human`: re-quote `decision.md` and stop.
- `pr`: if `pr.md` exists, go to retro; otherwise spawn `pr`.
- `retro`: if `retro.md` exists, set `stage: done`; otherwise spawn `retro`.

## /factory cleanup <job-id>

Job must be `done`. Acquire the lock. Verify the human integrated the branch: `git merge-base --is-ancestor factory/<job-id> <base>`. If that fails, accept a squash merge only when `git diff --quiet <base> factory/<job-id>` exits 0 (trees identical) and log `squash merge accepted`; otherwise stop and tell the user to merge first.

1. Remove every worktree under `<workspace>/<name>-factory/<job-id>*` with `git worktree remove`. Never force; a dirty worktree is the user's call.
2. Delete each ticket branch with `git branch -d factory/<job-id>-<ticket>`, then `git branch -d factory/<job-id>` (safe delete refuses unmerged work).
3. Keep the Job folder: it is the Job's history.

Release the lock, log, and report what was removed.

## Logging

Every `log.md` entry is one action on one line, written as a bullet beginning `- HH:MM:SS `; the Job's first line carries the full ISO date instead (`- 2026-10-27T15:55:12 created: ...`). Every orchestrator spawn writes two lines — the first immediately before the spawn, the second immediately after its artifact is validated:

```
- spawn <agent> round <N> → started
- spawn <agent> round <N> → <artifact> ok|failed
```

The implement stage appends the ticket-level lines the orchestrator cannot see — one pair around each ticket implementer, plus the merge that lands it:

```
- spawn implementer <ticket> round <N> → started
- spawn implementer <ticket> round <N> → <sha> ok | failed: <reason>
- merge <ticket> → <sha>
```

Stage transitions name their round; a CHANGES re-entry carries its budget label:

```
- review round <N>: CHANGES → implement round <N+1> (changes <resumes>/<MAX_RESUMES>)
```

All writers append; never rewrite `log.md`. Retries and the bounded self-repair are spawns too. A failed spawn still gets its closing line, with what was observed. The times and the pairs are what let a retro answer where a round's time and attempts went.

## Reporting

One short bullet per transition, e.g. `- 15:57:02 tickets: 01 done, 02 doing → implement`, timestamped and appended to `log.md`. On gate: needs-human with the decision quote. On accept: done with pr/retro paths. On resume: the stage resumed from. On cleanup: worktrees and branches removed.
