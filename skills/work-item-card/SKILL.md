---
name: work-item-card
description: A short helper for writing a task or follow-up card that can be scanned in five seconds, with a bullet summary, a checklist of steps, dated comments and visual cues. Use when creating or updating a card on a personal or team board.
---

# Work item card

A card must be scannable in five seconds and easy to act on. Short text, no filler, no long dashes.

## Four layers

### 1. Description: a bullet summary

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

Rules: 3 to 5 points, no long paragraphs, Next step always filled.

### 2. Checklist named "Steps"

3 to 6 short actions in the imperative ("Align with the data owner", "Map the CRM fields", "Validate with the sponsor"). The owner ticks them as they go, which gives a visible progress badge.

### 3. Dated comment: the critical analysis

One comment per advance: `YYYY-MM-DD: <what changed, the decision, the contrast with before>`. This is the dated history that feeds the weekly review. Never delete one, always add a new one.

### 4. Visual cues

- One label per card for the category. Color is for quick reading on the board. Reserve one color for blockers.
- Due date by effort: simple 7 days, medium 14, high 21. A concrete date wins.
- Start date when it adds information.

## Creating a card

1. Create it with title, description, due date and label.
2. Add the Steps checklist and its items.
3. Add the first dated comment with context and analysis.

Updating a card: edit description, label or due date in place, add a dated comment for the note, add checklist items for new steps.

## Rules

- Ignore archived cards. Do not rewrite or recreate them.
- Names of people can appear on a personal board. They do not appear in sponsor decks.
- Keep it light. A trivial card gets a one-line summary and one or two bullets.

## Good and bad

Good title: "Confirm CRM field mapping for follow-up drafts". Good next step: "Share the field list with the CRM admin by Thursday."
Bad title: "CRM stuff". Bad next step: "Follow up."

## Definition of done

- Summary, points and next step present, and the next step has an owner role.
- Steps checklist created.
- First dated comment added.
- Label and due date set.
