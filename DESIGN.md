---
name: Factory Dashboard
description: Light and dark operations console for the local agent factory loop.
colors:
  ground: "#f6f6f2"
  surface: "#ffffff"
  surface-raised: "#fafaf6"
  ink: "#17171a"
  ink-secondary: "#3c3c42"
  muted: "#55555c"
  faint: "#6d6d74"
  line: "#e5e5de"
  line-strong: "#d0d0c7"
  accent: "#2563eb"
  accent-ink: "#1d4ed8"
  accent-wash: "#eef2ff"
  pass: "#176b43"
  pass-wash: "#e9f5ee"
  gate: "#7a4a00"
  gate-wash: "#fff3d9"
  gate-surface: "#fffdf7"
  gate-field: "#fff8e9"
  gate-line-strong: "#dcbf7d"
  danger: "#b42318"
  danger-wash: "#fdecea"
  danger-line: "#f2c6c1"
  terminal: "#17171a"
  terminal-ink: "#f2f2ec"
  terminal-hover: "#2a2a26"
  dark-ground: "#141412"
  dark-surface: "#1b1b18"
  dark-surface-raised: "#23231f"
  dark-ink: "#f1f1ea"
  dark-ink-secondary: "#d2d2c9"
  dark-muted: "#a6a69c"
  dark-faint: "#8c8c82"
  dark-line: "#34342e"
  dark-line-strong: "#4d4d44"
  dark-accent: "#7aa2ff"
  dark-accent-ink: "#a8c1ff"
  dark-accent-wash: "#1b2742"
  dark-accent-edge: "#334f82"
  dark-pass: "#6fd6a0"
  dark-pass-wash: "#14271d"
  dark-pass-edge: "#2b553b"
  dark-gate: "#eec06a"
  dark-gate-wash: "#2a2212"
  dark-gate-edge: "#5e4a24"
  dark-gate-surface: "#201b12"
  dark-gate-field: "#282113"
  dark-gate-line-strong: "#7c5f2c"
  dark-danger: "#ff9b92"
  dark-danger-wash: "#2c1715"
  dark-danger-edge: "#5b2b27"
typography:
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.45
  masthead:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  label:
    fontFamily: "ui-monospace, Cascadia Mono, Segoe UI Mono, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  folio:
    fontFamily: "ui-monospace, Cascadia Mono, Segoe UI Mono, Menlo, Consolas, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1
  title-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "14.5px"
    fontWeight: 600
    lineHeight: 1.35
  interface-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
  doc-heading:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.35
  drawer-title-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 650
    lineHeight: 1.25
  drawer-title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 650
    lineHeight: 1.25
  masthead-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.05
rounded:
  card: "12px"
  field: "10px"
  control: "8px"
  small: "6px"
  micro: "4px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "13px"
  lg: "18px"
  xl: "28px"
components:
  job-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.card}"
    padding: "13px"
  state-running:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-ink}"
    borderColor: "{colors.accent-wash}"
    rounded: "{rounded.pill}"
    padding: "4px 7px"
  state-done:
    backgroundColor: "{colors.pass-wash}"
    textColor: "{colors.pass}"
    rounded: "{rounded.pill}"
    padding: "4px 7px"
  gate-box:
    backgroundColor: "{colors.gate-surface}"
    textColor: "{colors.gate}"
    borderColor: "{colors.gate-surface}"
    padding: "11px 13px 13px"
  command:
    backgroundColor: "{colors.terminal}"
    textColor: "{colors.terminal-ink}"
    rounded: "{rounded.control}"
    padding: "7px 7px 7px 9px"
  search:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.line-strong}"
    rounded: "{rounded.field}"
    padding: "0 6px 0 11px"
---

# Design System: Factory Dashboard

## Overview

**Creative North Star: "The Bench Console"**

The Dashboard is a clean instrument panel on a warm workbench: a soft off-white ground, white work surfaces, ink-black type, and one live blue signal. It is calm enough to run all day and dense enough to read a whole portfolio at a glance. The needs-human gate is the one warm interruption — an amber callout with the two commands that move the Job forward.

The console metaphor is literal: a sticky status bar, ruled lane heads with instrument counts, compact job cards, and a full-height file drawer. Nothing is decorative; every surface earns its place by holding state. The earlier "Night Ledger" direction is retired as a separate look — the console now carries its own dark bench theme from the same tokens, so the board reads as the same instrument with the lights down.

**Key Characteristics:**
- Warm neutral ground, white surfaces, one blue accent; no glass, no gradients, no glow.
- One palette, two grounds: the dark theme swaps ground, surfaces, ink, and hairlines, never meaning or motion.
- Blue means in flight; green means done or PASS; amber is reserved for the human gate and attention states; red means the connection is broken or the Job escalated.
- Motion carries state: spinning icons and a pulsing pill for running work, a filling meter, a sliding drawer.
- Every functional label is at least 11px; identifiers and figures use tabular mono.
- The drawer is the only elevated surface; elevation exists to separate it from the board, not to decorate cards.

## Colors

### Primary
- **Signal Blue** (#2563eb, ink #1d4ed8, wash #eef2ff): in-flight stages, active file in the drawer, focus rings, and the one accent on links. Never used for the gate or for done work.

### Secondary
- **Gate Amber** (#7a4a00 on #fff3d9; card surface #fffdf7, field #fff8e9, strong rule #dcbf7d): the needs-human gate — gate card, stamp, open-item count, and gate commands. The wash also carries partial-read banners and `CHANGES` / `BLOCKED` verdicts.
- **Pass Green** (#176b43 on #e9f5ee): done tickets, PASS verdicts, and completed meters.
- **Danger Red** (#b42318 on #fdecea, edge #f2c6c1): offline or partial data failures and the `ESCALATE` verdict stamp. Never used for ordinary review changes.

### Neutral
- **Bench Ground** (#f6f6f2): page ground. Warm enough to feel like a surface, never gray.
- **Work Surface** (#ffffff): cards, fields, drawer, header; **Raised** (#fafaf6) for inset chrome and empty marks.
- **Ink** (#17171a): titles and primary text; **Ink Secondary** (#3c3c42) for document prose.
- **Muted** (#55555c): secondary text and state labels; **Faint** (#6d6d74): metadata, hints, and disabled text.
- **Hairline** (#e5e5de) and **Strong Hairline** (#d0d0c7): borders and separators.

### Dark Bench
The dark theme is the same console with the lights down: **ground** #141412, **surface** #1b1b18, **raised** #23231f, **ink** #f1f1ea, **ink secondary** #d2d2c9, **muted** #a6a69c, **faint** #8c8c82, **hairline** #34342e, **strong hairline** #4d4d44. Semantic hues lift for contrast rather than change meaning: Signal Blue #7aa2ff on #1b2742, Pass Green #6fd6a0 on #14271d, Gate Amber #eec06a on #2a2212 with gate surface #201b12 and field #282113, Danger Red #ff9b92 on #2c1715. Command strips and code blocks keep the terminal ground (#17171a, text #f2f2ec) in both themes; the theme changes the bench, not the terminals. The scrim deepens to 55% black and the drawer shadow to 50% black.

### Named Rules
**The One Blue Rule.** Signal Blue belongs to live work and interaction. If a static, completed, or destructive thing is blue, the signal is lying.
**The Amber Gate Rule.** Gate Amber belongs to the human gate and to honest attention states (partial reads, `CHANGES`, `BLOCKED`). It never marks done or live work.
**The Theme Parity Rule.** Dark mode swaps ground, surfaces, ink, hairlines, scrim, and shadow only. Pass green, gate amber, danger red, and live blue keep their meaning, terminal strips stay dark, and every animation is unchanged.

## Typography

**Body Font:** system sans stack — job titles, prose, controls.
**Label Font:** ui-monospace stack — IDs, branches, counts, ticket states, commands, file names, timestamps.

### Hierarchy
- **Masthead** (700, 38px, -0.035em; 30px below 620px): the single "Dashboard" title.
- **Drawer title** (650, 22px; 18px below 620px): the open file's subject.
- **Document heading** (650, 16px, 1.35): `h3` sections inside whitepaper-style markdown.
- **Job title** (600, 14.5px, 1.35): the feature name on a card and the brand line.
- **Body/document** (400, 14px, 1.65 max 70ch): drawer markdown.
- **Interface** (400–600, 12.5–13.5px): controls, banners, ticket rows, gate summaries, empty-state copy, commands.
- **Label** (mono 400, 11px floor for functional text): lane heads, state pills, ticket rows, footer commands.
- **Folio** (mono, 10.5px, tabular): job numbers, rounds, counts, timestamps.

### Named Rules
**The Tabular Rule.** Every numeral on the board — ticket fractions, counts, rounds, clock — uses tabular figures.
**The Eleven Floor.** Functional text below 11px is a defect. Code and command surfaces are exempt; decorative micro-labels are still functional text.

## Layout

The page is capped at 1560px with 28px gutters. A 56px sticky header holds the brand, `local-only`, the live status, and the theme toggle; the masthead pairs a 38px "Dashboard" title with a 400px search field and a counts line. Below it, five equal lanes — Tickets / Implement / Review / Needs-human / Done — each with a sticky lane head under the header. Cards stack in the lane body with 10px gaps.

At 1280px the board becomes 3 columns, at 920px 2, at 620px 1. Lane hints hide on small screens, the search becomes full width, and the drawer file rail turns into a horizontal scroller above the document. The footer commands wrap into a compact strip.

## Elevation & Depth

The board is flat: cards are separated by a 1px hairline and a hover tint, never a resting shadow. The drawer is the only elevated surface, with a soft left shadow and a scrim that separates it from the board. Focus is its own layer: a 3px blue ring on inputs and a 2px offset outline on controls.

**The Drawer Exception Rule.** Shadows exist only on the drawer and scrim. A shadow on a lane or job card is a defect.

## Shapes

Rounded work surfaces: 12px cards, 10px search fields, 8px command strips and buttons, 6px small chips, 4px inline code and skeleton bars, and fully rounded state pills and count badges. The geometry is friendly, not playful; nothing is square or ornamental.

## Components

### Header
Sticky, translucent ground with a blur, hairline bottom border. Brand mark is an ink tile with the factory glyph; status is a mono line with a colored dot. Offline turns the dot red and adds a retry label. At the right edge, a 30px icon button (36px on coarse pointers) switches themes: a moon in light, a sun in dark, with the accessible label naming the theme it will switch to. The choice persists in `localStorage` under `factory.theme`; with no saved choice the console follows `prefers-color-scheme`.

### Masthead and Search
The title is the loudest element on the page. Search is a 40px field with a leading icon, `/` keyboard hint, and a clear control; focus adds a blue border and a 3px wash ring. The counts line below states jobs, in-flight, gate count, and polling target.

### Lanes
Lane heads are sticky under the header: title, mono hint (`to-tickets`, `implement-spec`, …), and a pill count. The Needs-human lane head is the only amber lane surface.

### Job Card
White surface, 12px radius, hairline border; hover raises the border and warms the ground. The open affordance is a full-width button with a folio, slug, state pill, title, and branch. Below it: a ticket meter, a ticket list with state icons, a review row, and — for needs-human — the gate box. Press scales the card to .995.

### States and Meters
State pills: `running` blue with a pulse, `done` green, `gate` amber, neutral ink. The meter fill animates its width over .4s; a full meter turns green. Ticket rows are hairline-bordered chips: a spinner for `doing`, a green check with green label/status for `done`, and an empty square for `pending`.

### Gate Box
A full-bleed amber callout at the bottom of a needs-human card: `YOUR CALL` stamp, open-item count, the summary (truncated with a tooltip), and two terminal command strips — `/factory accept …` and `/factory rework … <note>` — each with a copy button. Copying confirms in place and in a live region.

### Drawer
A 720px right-hand dialog: header with kicker, serif-free title, branch, and close; a file rail grouped by Job / Tickets / Build / Round / Gate; and a markdown document with verdict stamps. The active file uses a blue wash and inset line. Escape closes, Tab is trapped, and focus returns to the card that opened it.

### Empty, No-match, and Offline
Centered cards on the bench ground. Empty shows the start command with copy; no-match offers Clear search; offline shows the manifest error and the serve command while polling continues. All three are honest about what the Dashboard can and cannot do.

### Skeleton and Footer
Lanes render shimmer skeletons while the first read is in flight. The footer lists the canonical commands in mono strips and states `static · polling every 2s`.

## Motion

One motion language, all state-carrying:
- **Running** stage icons and `doing` ticket icons rotate at 1.1s linear; the running state pill pulses at 1.8s.
- **Meters** fill over .4s with `cubic-bezier(.2, .7, .3, 1)`; cards press to .995.
- **Drawer** slides in and out over .22s with `cubic-bezier(.32, .72, 0, 1)`; the scrim fades over .18s. Closing is animated, not cut.
- **Skeletons** shimmer across a 200% gradient over 1.4s.
- Reduced motion disables all of the above; the interface remains fully legible without animation.

## Do's and Don'ts

### Do:
- **Do** use one blue accent for live work and interaction.
- **Do** keep the gate amber, rare, and actionable: summary plus accept/rework.
- **Do** use canonical words: Dashboard, Job, Tickets, Implement, Review, Needs-human, Done.
- **Do** set identifiers, figures, and commands in tabular mono.
- **Do** preserve focus, announce copying, and keep every target at least 44px on coarse pointers.
- **Do** keep terminal strips dark and semantic hues fixed across themes.

### Don't:
- **Don't** fabricate production, pipelines, deployments, or approval language; this is a local read-only board.
- **Don't** use Signal Blue for done or gate states, or Danger Red for ordinary review changes.
- **Don't** recolor pass, gate, danger, or live states when the theme flips.
- **Don't** add resting shadows, gradients, glass panels, or colored left-border callouts.
- **Don't** animate anything that does not carry state.
- **Don't** let functional text fall below 11px.
