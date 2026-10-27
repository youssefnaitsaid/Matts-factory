# Factory — Project Agent Factory

A local-only loop that turns a spec into Done through Matt Pocock skills, with a static Dashboard for live status. Lives at workspace root (`factory/` + `.agents/skills/factory/`), never pushed. The host project's own vocabulary is untouched.

## Language

**Factory**:
The whole loop, board, and agents defined here — spec through retro plus the Dashboard.
_Avoid_: Agent factory (bare), software factory

**Job**:
One spec through the loop, with folder `factory/jobs/<job-id>/` and integration branch `factory/<job-id>`.
_Avoid_: Run, task, ticket (tickets live inside a Job)

**Stage**:
One step of the loop — tickets, implement, review, needs-human, pr, retro, done. The Dashboard column.
_Avoid_: Phase, step, status (bare)

**Agent**:
One skill invocation on a Job (tickets, implementer, merger, reviewer-code, pr, retro). Writes exactly one file.
_Avoid_: Bot, worker (bare), subagent (implementation detail)

**Dashboard**:
Static `factory/dashboard.html` polling `factory/jobs/index.json` + each `job.json` every 2s.
_Avoid_: Board, UI (bare), monitor

**Frontier**:
Tickets whose blockers are all done — the only grabbable work.
_Avoid_: Queue

**Needs-human**:
The gate Stage. Always reached via ESCALATE; branch and worktrees stay for inspection until `/factory accept` or `/factory rework`.
_Avoid_: Blocked (that is `STATUS: BLOCKED`), approval

**Round**:
One implement→review cycle, numbered from 1. A rework or amend starts a new Round with a fresh resume budget.
_Avoid_: Iteration, attempt

**Resume**:
Re-entering a Job's loop from its current on-disk Stage after a crash or interrupted run. Not the same as a Round.
_Avoid_: Retry, restart

**Amend**:
Changing a Job's `spec.md` after it was frozen, recorded with the old and new `specSha`. Resets every ticket because the target moved.
_Avoid_: Edit, update

**Integration branch**:
`factory/<job-id>` — the branch ticket work merges into and review runs against. Never `main`; the human merges it by hand.
_Avoid_: Job branch, feature branch
