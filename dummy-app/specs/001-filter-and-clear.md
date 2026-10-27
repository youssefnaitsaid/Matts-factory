# Filter todos and clear completed

## Context

`dummy-app` is a small todo app: add a todo, toggle it done, remove it. The list
always shows every todo, so completed items pile up. This spec adds a filter so the
user can focus on active work, and a one-click clear for finished items.

## Requirements

- Three filter controls — All, Active, Completed — are always visible. The current
  filter is visibly selected, and All is the default.
- The list shows only the todos matching the current filter. When nothing matches,
  the list area shows the text `Nothing here.` instead of an empty list.
- The active count keeps counting every open todo, regardless of the current filter.
- A `Clear completed` button removes every done todo in one action. It is disabled
  when no todo is done.
- Adding, toggling, and removing a todo keep the current filter applied.
- Unit tests cover filtering, clearing, and the empty-result case.

## Out of scope

- Persistence across reloads.
- Editing a todo's text.
- URL or route state for the filter.

## Acceptance

- [ ] All / Active / Completed each show the correct subset over the same data.
- [ ] `Nothing here.` appears when the active filter matches nothing.
- [ ] The active count ignores the filter.
- [ ] Clear completed removes only done todos and is disabled when none are done.
- [ ] `node --test "dummy-app/test/**/*.test.js"` passes.
