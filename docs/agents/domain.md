# Domain Docs

How the engineering skills consume this repo's domain documentation when exploring.

## Before exploring, read these

- **`factory/GLOSSARY.md`** — the Factory canon (Factory, Job, Stage, Agent, Dashboard,
  Frontier, Needs-human). This is the only glossary in the repo; there is no root
  `GLOSSARY.md`.
- **`docs/adr/`** — read ADRs that touch the area you're about to work in. None exist yet.

If a file doesn't exist, **proceed silently**. Don't flag its absence or suggest
creating it upfront; `/domain-modeling` creates ADRs lazily when decisions get resolved.

## Two vocabularies, kept apart

`factory/GLOSSARY.md` describes the Factory itself. `dummy-app/` is the host project
where features are built, and its vocabulary is deliberately untouched by the Factory
canon: don't call an app concept a "Job" or a "Stage". Use the Factory terms only when
the output is about the loop, and the app's own terms in tickets and code.

## File structure (single-context)

```
/
├── factory/GLOSSARY.md
├── docs/adr/
├── factory/jobs/<job-id>/
└── dummy-app/
```

## Use the glossary's vocabulary

When your output names a domain concept — an issue title, a refactor proposal, a test
name — use the term as the glossary defines it and avoid the synonyms it lists under
`_Avoid_`.

If the concept you need isn't in the glossary, that's a signal: either you're inventing
language the project doesn't use (reconsider), or there's a real gap (note it for
`/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently
overriding:

> _Contradicts ADR-0007 (…), but worth reopening because…_
