# Instructions for coding agents using this repository

This file is the standing context for an agent (Claude Code, Codex, Cursor, Kiro or similar) that is asked to write, review or maintain backlog items with these skills. It follows principle 11 of this method: write for the agent in the room.

## What this repository is

A method for writing a product backlog: a spec, vertical slices, Epic / Feature / User Story items, eval cases for AI behavior, bug cards, and a weekly cadence. Each skill is a folder under `skills/` with a `SKILL.md`. Templates are in `templates/`, a complete fictional example in `examples/acme-sales-assistant/`, and the reasoning in `docs/`.

## How to pick a skill

| The request sounds like | Use |
|---|---|
| "Is this worth doing?", "frame this", "what's the number?" | `frame-the-problem` |
| "We prototyped X, what goes in the spec?" | `prototype-to-spec` |
| "Write the PRD / spec for X" | `write-prd` |
| "Break this spec into tasks / slices" | `decompose-spec`, then `execution-plan` |
| "Write the epic / feature / story for X" | `backlog-standard`, `epic-feature-story-templates`, `why-it-exists`, `user-story-writing` |
| "Write acceptance criteria for an AI feature", "what's the eval?" | `eval-cases` |
| "Prepare this story so an agent can build it" | `agent-brief` |
| "File this bug" | `bug-report` |
| "Plan the sprint" | `sprint-planning` |
| "Weekly snapshot", "what changed this week" | `weekly-backlog-snapshot` |
| "Prepare the review with the sponsor" | `backlog-review-meeting` |
| "Roadmap status", "publish the roadmap" | `roadmap-status`, `publish-roadmap` |
| "Write a task card" | `work-item-card` |

## Order of operations for "write the backlog for X"

1. Read the frame or ask for the number and the appetite. Do not invent them.
2. Read the spec. If there is none, run `write-prd` first and stop at the end of its first phase for approval.
3. Run `decompose-spec`. Present the slices, sizes and dependencies before writing any item.
4. Write items with `backlog-standard`. One fixed parent: a Story belongs to a Feature, never to an Epic.
5. Run `why-it-exists` on every item, then `user-story-writing` on every Story.
6. For every probabilistic behavior, run `eval-cases`. An AI item without eval cases is not Ready.
7. For every item an agent will execute, run `agent-brief`.
8. Apply the four-reader test to each item: can an engineer, a designer, an executive and a coding agent act on it without a meeting? If not, rewrite; do not add a comment.

## Never

- Never invent a number, a date, a customer, a metric or a dependency. Mark the gap `[TO CONFIRM]` and ask.
- Never assert the cause of a bug in a bug card.
- Never write a persona for Enabler work.
- Never mark an AI item Ready without a golden set, a scoring method and a threshold.
- Never raise an agent's autonomy tier in a backlog item. Tier changes are decisions recorded with evidence, see [agent-design-principles](https://github.com/Benyoumen/agent-design-principles).
- Never use figurative language, jargon the executive cannot read, or a rule nested inside another rule.

## Verification before you return

- Every item passes the checklist in its skill.
- Every Story has a Feature parent, Story Points, and declared Predecessor / Successor relations where they exist.
- Every acceptance criterion is verifiable by a person or a check, and every eval case names its scoring method.
- Items you removed are listed, with the reason, so the weekly snapshot can report them.

## Output format

Markdown, using the templates in `templates/`. One file per item when writing to disk, named `<type>-<short-slug>.md`. When writing into a tracker, keep the section headings so the item stays readable in the tracker's rich-text field.
