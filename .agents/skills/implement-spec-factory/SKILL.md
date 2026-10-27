---
name: implement-spec-factory
description: "Run a factory Job's implement stage on its integration branch. Factory-only — not for standalone use."
---

You are running the implement stage of one factory Job. The spec is the Job folder's `spec.md`; the tickets are its `tickets/NN-*.md` files. Integration branch, worktrees, and ports arrive in your prompt — the branch already exists, never create it.

There is no issue tracker. "Resolved" means a ticket's acceptance boxes are all complete. Never open or touch PRs — the factory writes its PR only after human accept (`/factory accept`).

The goal is the entire spec implemented on the given **integration branch**, with every ticket resolved.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

**Implementer subagents** should be run in the background where possible for maximum concurrency.

## Steps

1. Read the spec and tickets to understand the task graph.

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible by all future subagents. This lets **implementer subagents** focus on implementation rather than exploration.

3. Confirm the integration branch and worktree from your prompt exist and are current. Create nothing, open no PRs.

4. Use **implementer subagents** to implement each frontier ticket, each in its own worktree on its own ticket branch (`factory/<job-id>-<ticket>`, under `<workspace>/<name>-factory/`, `<name>` = repo folder name). Each implementer subagent:
   - confirms its worktree is based on the integration branch tip before starting, and resets onto it if not;
   - calls the Skill tool with `tdd` to build the ticket;
   - the moment an implementer is spawned, its `job.json` tickets entry and ticket file Status are set to `doing` (read-modify-write, tickets map only);
   - formats per host convention and commits on its ticket branch per host style (check the host `AGENTS.md`; originating host used `npx prettier --check`/`--write` and `feat(scope): Description`);
   - merges the integration branch tip into its own branch before reporting done;
   - on merge, its `job.json` tickets entry is set to `done`, and one read-modify-write on the ticket file sets `**Status:** done` and ticks every acceptance box (`- [ ]` → `- [x]`), immediately, so Dashboard chips and the ticket agree;
   - rewrites the first line of the Job's `build.md` to this round's `STATUS: READY` (or `STATUS: BLOCKED` + reason), then appends its round Log under a `## Round N` heading, so line 1 always describes the current round;
   - for UI tickets: serves its worktree on its assigned port and performs the host's visual-check procedure (originating host: throwaway Playwright script, captures outside versioned assets). When the surface cannot render (no viewport or screenshot), it writes `Unverified: <what could not be checked>` in this round's `build.md` section instead of claiming a visual pass.
   Work runs from `<repo>`; follow the host `AGENTS.md` shell conventions (originating host: Windows PowerShell 5.1 — pass `workdir`, never `cd`).

5. Once an **implementer subagent** completes, merge its work to the integration branch with a **merger subagent**.

6. If this changes the **frontier** of available tickets, kick off more **implementer subagents** to work on the new tickets. This allows for maximum concurrency.

7. Report the integration branch tip SHA and the `build.md` STATUS. Leave review to the factory's review stage — never call `code-review` yourself.

8. Once all tickets are complete, clean up nothing. Branch and worktrees stay for the `needs-human` inspection gate — the orchestrator owns their lifetime.
