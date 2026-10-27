# Issue tracker: Local Markdown

Issues and tickets for this repo live as local markdown files. Nothing is published
to GitHub, even though a remote exists — `AGENTS.md` states this loop is local-only
and never pushed.

## Two locations

- **Inside a Factory Job** (the normal path): `factory/jobs/<job-id>/tickets/NN-slug.md`,
  numbered from `01`. The Job's spec is `factory/jobs/<job-id>/spec.md`.
- **Standalone runs** (work outside the loop): `.scratch/<feature-slug>/spec.md` and
  `.scratch/<feature-slug>/issues/NN-slug.md`.

When the work already has a Job folder, use it. Only fall back to `.scratch/` for
ad-hoc work with no Job.

## Ticket file shape

```
# <NN>: <Title>

**What to build:** the end-to-end behaviour, from the user's perspective.

**Blocked by:** <NN>, <NN> — or "None (can start immediately)".

**Status:** pending

- [ ] Acceptance criterion
```

`Status` is `pending | doing | done`, the same values the Factory mirrors into
`job.json`. A ticket is unblocked when every ticket under **Blocked by** is `done`.

## Conventions

- One file per ticket; never a single combined tickets file.
- The Job also carries `tickets.json`, a manifest of ticket filenames the Dashboard drawer reads. The orchestrator writes it from the files; never write it yourself.
- Number from `01` in dependency order, blockers first.
- No file paths or code snippets in ticket bodies — they go stale fast. Inline a
  snippet only when it encodes a decision better than prose (a schema, a type shape).
- Append history under a `## Comments` heading at the bottom of the file.
- Never hand-edit `factory/jobs/<job-id>/job.json` — the orchestrator is its sole
  writer and the Dashboard reads it live.

## When a skill says "publish to the issue tracker"

Write one ticket file per slice into the active Job's `tickets/` directory, or into
`.scratch/<feature-slug>/issues/` when no Job is involved. Do not create GitHub issues.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. A bare number resolves inside the active Job's
`tickets/` directory.
