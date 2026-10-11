---
name: Factory Dashboard
description: Night-shift job ledger for the local agent factory loop.
colors:
  ink-ground: "#0e1013"
  ink-panel: "#0a0c0f"
  ink-code: "#060708"
  ledger-line: "rgba(236, 231, 216, 0.14)"
  paper-pale: "#ece7d8"
  paper-dim: "#c9c4b2"
  paper-faint: "#8f8b7c"
  signal-pass: "#4fc07f"
  signal-warn: "#d99a35"
  signal-warn-ink: "#e8b45f"
  signal-gate: "#ff8ad8"
  signal-done: "#7fc9d6"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
  folio:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 700
rounded:
  row: "0px"
  chip: "3px"
  control: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  ticket-chip:
    backgroundColor: "transparent"
    textColor: "{colors.paper-faint}"
    rounded: "{rounded.chip}"
    padding: "4px 9px"
  ticket-chip-pass:
    backgroundColor: "rgba(79, 192, 127, 0.07)"
    textColor: "{colors.signal-pass}"
    rounded: "{rounded.chip}"
    padding: "4px 9px"
  ticket-chip-warn:
    backgroundColor: "rgba(217, 154, 53, 0.07)"
    textColor: "{colors.signal-warn-ink}"
    rounded: "{rounded.chip}"
    padding: "4px 9px"
  gate-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.signal-gate}"
    rounded: "2px"
    padding: "2px 7px"
  folio-count:
    backgroundColor: "transparent"
    textColor: "{colors.paper-pale}"
    rounded: "{rounded.chip}"
    padding: "1px 9px"
  file-row:
    backgroundColor: "transparent"
    textColor: "{colors.paper-faint}"
    padding: "7px 8px"
  verdict-stop:
    backgroundColor: "transparent"
    textColor: "{colors.signal-gate}"
    rounded: "2px"
    padding: "5px 12px"
---

# Design System: Factory Dashboard

## Overview

**Creative North Star: "The Night Ledger"**

The board is the factory's shift ledger after dark: ink-black paper, hairline rules, folio numerals, and a rubber stamp reserved for the one moment that needs a human. It replaces the previous charcoal console look with something that belongs to the product's own metaphor — jobs are ledger entries, stages are ruled columns, and the needs-human gate is literally stamped.

Density is the point. Five ruled columns hold every job at a glance; each job is a ruled entry, not a floating card; each ticket is its own ledger chip line. Nothing floats, nothing glows, nothing performs. The only ornaments are the ones a real ledger would have: double rules under mastheads, dashed perforation around the gate, and tabular figures everywhere.

**Key Characteristics:**
- Ruled, not floated: hairlines separate everything; shadows do not exist.
- Tabular mono for all data; system sans for prose only.
- One stamp, one owner: the double-rule gate stamp belongs to needs-human states exclusively.
- Dark because the scene is a dim room mid-run, not because dashboards are dark.

## Colors

Warm paper inks on near-black grounds; four signal colors with fixed meanings carried across board, chips, drawer, and verdicts.

### Primary
- **Ledger Amber** (#d99a35, bright ink #e8b45f): selection and warning. The current file, the doing chip border, CHANGES/BLOCKED states.

### Secondary
- **Gate Rose** (#ff8ad8): the human gate. Needs-human flags, ESCALATE chips, gate perforation, error banner. Never used for decoration elsewhere.

### Tertiary
- **Pass Green** (#4fc07f): done, PASS, READY, and the live pulse.
- **Done Cyan** (#7fc9d6): the Done column head. Marks completion as a place, not just a state.

### Neutral
- **Ink Ground** (#0e1013): page ground.
- **Ink Panel** (#0a0c0f): drawer ground, slightly deeper than the page.
- **Ink Code** (#060708): code block ground, deepest of the three.
- **Ledger Line** (rgba(236, 231, 216, 0.14)): every rule, border, and chip edge.
- **Paper Pale** (#ece7d8): primary text and folio numerals.
- **Paper Dim** (#c9c4b2): secondary text, command hints.
- **Paper Faint** (#8f8b7c): labels, branches, pending states. Tinted from the paper hue, never gray.

### Named Rules (optional, powerful)
**The Stamp Ownership Rule.** Gate Rose appears only on needs-human states, gate verdicts, and error surfaces. If it marks anything else, the gate stops meaning anything.
**The Warm-Only Rule.** Every neutral is tinted from the paper hue. A neutral gray text, border, or fill is a defect, not a variation.

## Typography

**Body Font:** system sans stack (-apple-system, Inter, Segoe UI) — prose, job titles, UI chrome.
**Label/Mono Font:** ui-monospace stack — every number, branch, command, chip, filename, and heading that behaves like a label.

**Character:** One workhorse sans plus one tabular mono. No display face; the ledger's voice is its figures and rules, and headings set in tracked mono capitals read as section marks, not brand type.

### Hierarchy
- **Folio** (mono 700, 13px, tabular): job numbers, drawer job id. The loudest thing on the board is a number.
- **Title** (sans 600, 13–13.5px): job feature line; drawer headline at 17px.
- **Body** (sans 400, 14px/1.5, max 68ch): ledger document prose.
- **Label** (mono 400, 10–12px, tabular; uppercase + 0.08–0.1em tracking for stamps and heads): column heads, chip rows, file groups, verdicts, footer commands.
- **Code** (mono, 12.5px in blocks, boxed inline): fenced blocks and inline references.

### Named Rules (optional)
**The Tabular Rule.** Every numeral on the board — counts, folios, rounds, timestamps — sets with tabular figures. A proportional numeral in data is a defect.
**The Stamp Case Rule.** Uppercase with tracking is reserved for stamps, column heads, and verdicts. Body copy and job titles never shout.

## Layout

Five ruled columns (Tickets / Implement / Review / Needs human / Done) separated by vertical hairlines on a 1600px-capped page; 28px gutters, entries stacked full-bleed within each column. Jobs are flush ledger rows divided by bottom hairlines; tickets inside a job are full-width chip lines under their own count label. The masthead is sticky with a double rule; the drawer is a 960px ledger page with a ruled file index beside the document.

Responsive is structural: 3 columns at 1100px, single column with rules removed at 640px, drawer index stacking above the document. Spacing rhythm is tight groups (4–6px chip gaps), entries at 12–13px padding, generous section separation (22–44px board padding).

## Elevation & Depth

Flat by construction. No shadows anywhere in the system; depth is conveyed by three ink grounds (page, drawer, code block) and hairline rules.

### Named Rules (optional)
**The Ledger Line Rule.** Separation is always a hairline rule or a deeper ground, never a shadow or a floating card. A drop shadow on this surface is a defect.

## Shapes

Rectilinear ledger geometry: rows are flush with square corners, chips and counts are 3px boxes, controls are 4px, stamps are 2px double-ruled boxes (border plus 2px-offset outline in the same color). Perforation is a dashed hairline and belongs to the gate: gate rows, gate command strips, and nothing else.

## Components

### Chips
- **Style:** transparent ground, 1px ledger-line border, 3px radius, 11px tabular mono, one ticket per full-width line under its count label.
- **State:** pending is faint on hairline; doing is pale with a stronger edge and breathes; PASS/done/READY are green-edged on green tint; CHANGES/BLOCKED are amber-edged on amber tint; ESCALATE is rose-edged on rose tint.

### Counts
- **Style:** boxed folio figure — transparent, 1px ledger-line border, 3px radius, 12px tabular mono in paper pale. Sits at the head of its column like a ledger total.

### Gate Stamp
- **Style:** rose 10px tracked capitals in a double-rule 2px box (border + 2px-offset outline). Used for the needs-human flag, gate verdicts, and the error banner.
- **Rule:** the double rule is the stamp's signature; no other component may use border-plus-offset-outline.

### Job Rows
- **Corner Style:** square, flush, full-bleed.
- **Background:** transparent at rest, paper tint on hover, deeper tint on press.
- **Border:** bottom hairline; gate rows trade it for rose dashed perforation top and bottom on a rose wash.
- **Internal Padding:** 13px top, 12px bottom, 6px sides.

### Navigation
- **Style:** the drawer file index — ruled rows of 12px mono filenames with verdict dots, amber wash for the open file, group heads in tracked capitals.
- **States:** default faint, hover pale on wash, open pale on amber wash. Minimum 32px touch targets.

### Verdicts
- **Style:** tracked uppercase mono stamps in state colors with double rules, 2px radius. Code blocks sit on the deepest ground with hairline borders and boxed inline code.

## Do's and Don'ts

### Do:
- **Do** separate with hairlines and grounds; reach for a rule before any other device.
- **Do** set every number in tabular mono, including timestamps and counts.
- **Do** reserve Gate Rose and the double rule for the human gate and errors.
- **Do** keep one ticket per full-width chip line so scan order matches ticket order.

### Don't:
- **Don't** float anything: no shadows, no lifted cards, no glow halos.
- **Don't** use neutral gray text or borders; all neutrals tint from the paper hue.
- **Don't** set body copy, job titles, or prose in uppercase or tracked capitals.
- **Don't** add perforation, stamps, or double rules outside gate and error states.
