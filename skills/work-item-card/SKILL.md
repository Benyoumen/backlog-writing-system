---
name: work-item-card
description: A short helper for writing a task or follow-up card that can be scanned in five seconds, with a bullet summary, a checklist of steps, dated comments and visual cues. Use when creating or updating a card on a personal or team board.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Work item card

> A card must be scannable in five seconds and easy to act on. Short text, no filler, a next step with an owner, and a dated history.

## When to use

- A commitment from the weekly review needs a card someone will act on.
- A task or follow-up goes on a personal or team board.
- An existing card needs an update.

Do not use it for a User Story. Stories follow `backlog-standard`.

## Inputs

- The commitment, decision or feedback the card comes from, with a link or path.
- The board's labels and the category convention.
- The owner role and the effort size.

## Procedure

1. Create the card with title, description, due date and label.
2. Write the description as a bullet summary:

```
Summary: <one line: what it is and why it matters>

Points:
- <key point 1>
- <key point 2>
- <key point 3>   (3 to 5 at most)

Next step: <concrete action and owner role>
Depends on / risk: <only if there is one>
Category: <one label>
Source: <meeting, decision or feedback, with a link or path>
```

3. Add a checklist named "Steps": 3 to 6 short actions in the imperative ("Align with the data owner", "Map the CRM fields", "Validate with the sponsor"). The owner ticks them as they go, which gives a visible progress badge.
4. Add the first dated comment with context and analysis: `YYYY-MM-DD: <what changed, the decision, the contrast with before>`.
5. Set the visual cues: one label for the category, a reserved color for blockers; a due date by effort (simple 7 days, medium 14, high 21; a concrete date wins); a start date when it adds information.
6. To update a card: edit description, label or due date in place; add a dated comment for the note; add checklist items for new steps. Never delete a dated comment; always add a new one. This is the history that feeds the weekly review.

## Rules

- 3 to 5 points, no long paragraphs, Next step always filled with an owner role.
- Ignore archived cards. Do not rewrite or recreate them.
- Names of people can appear on a personal board. They do not appear in sponsor decks.
- Keep it light. A trivial card gets a one-line summary and one or two bullets.
- No long dashes, no filler.

## Checklist

- [ ] Title says the action, not the topic.
- [ ] Summary, points and next step present; the next step has an owner role.
- [ ] Steps checklist created, 3 to 6 imperative items.
- [ ] First dated comment added.
- [ ] Label and due date set; blocker color used only for blockers.
- [ ] Source linked.

## Example

Weak: title "CRM stuff"; next step "Follow up."

Corrected: title "Confirm CRM field mapping for follow-up drafts"; next step "Share the field list with the CRM admin by Thursday (product manager)"; Steps: "List the 14 fields", "Mark the 9 already mapped", "Book the CRM admin slot", "Confirm the deal-value field (finding A1)"; first comment "2026-04-13: 9 of 14 mapped; the CRM admin slot moved to 20 Apr, which moves Phase 2 end to 28 Apr." (Illustrative.)

## Definition of done

Summary, points and next step present with an owner role; Steps checklist created; first dated comment added; label and due date set.

## Related

- Where the commitments come from: [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md). Where the dated comments go: [`weekly-backlog-snapshot`](../weekly-backlog-snapshot/SKILL.md).
- Why: [the operating cadence](../../docs/operating-cadence.md).
