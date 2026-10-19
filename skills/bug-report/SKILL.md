---
name: bug-report
description: Write a lean, didactic bug card that describes what happened without asserting a cause, is always linked to the user story where the symptom appears, and always asks the investigator to verify where the consumed data came from. Checks the live source before writing and records what could not be checked. Use when someone says "log a bug", "this number is wrong", "this email, report or dashboard is off", or brings a value that does not match its source.
---

# bug-report: a bug card that does not hand the investigator a guess

## The writing rules, in order of importance

1. **Do not assert a cause.** The bug describes what happened and asks to verify. Never write "the cause is X", "most likely" or "the agent reads A instead of B". Even a good hypothesis becomes a question in the verification list, not a conclusion. Whoever investigates must not inherit your guess as a fact.
2. **Keep it lean.** A few lines of description. Repro steps without an essay. If a sentence does not change what the developer will do, delete it.
3. **Always ask for the data origin.** Every bug about a number opens its verification with the same question: which source did the run read to produce this number? Record what it read, not what it should have read. Without it the team fixes the symptom and never learns whether the origin was right.
4. **Be didactic.** Someone who does not know the system can open the card and understand the problem. Plain language, the business rule stated in full, jargon only when it is a field name.
5. **Be clear on first read.** Run a plain-language edit before saving. A bug is read in a hurry, by someone who was not in the conversation.

### What the edit usually cuts

| Pattern | Replace with |
|---|---|
| "It is the CRM value, not the billing value, that enters the draft" | Direct order, subject named: "The draft shows the CRM value." |
| "The central question is where the number came from:" | An imperative heading: "Before fixing, find where the number came from" |
| "For context: the value is double" | "The displayed value is double the source value." |
| Verbs in the infinitive: "to identify, to check" | Imperative to the investigator: "Identify", "Check", "Record" |
| "A is ready; B is ready; and C also" | Bullets, one criterion per line |
| A sentence with three nested clauses | Two sentences of 8 to 22 words |

## Link to the source, always

When citing a deal, record or work item, the name is a markdown hyperlink to the real record. Never a bare id in running text.

Write `[Northwind renewal](https://crm.acme.example/deals/1042)`, not `deal 1042`. The raw id appears only on the technical evidence line, next to the field that was read.

## Step by step

### 1. Check the source live before writing

A bug about a number is not written from memory. Pull the source now.

- Read the CRM or data source read-only and capture the fields, the values and the last-updated timestamp. The timestamp matters: if the record changed after the reported event, that is an item to verify.
- If a source cannot be reached, do not invent. Write a "Not verified" line with the reason.
- Anything you could not check becomes an explicit line in the bug. Without it, someone closes the bug believing the source was checked.

If the live reading contradicts the reporter's statement, say so in your reply. Write the item from what is observable (the symptom) and keep both readings as items to verify, without choosing one.

### 2. Find the matching user story (mandatory)

A bug without a story does not enter a sprint. The parent is the story **where the symptom appears**, not the epic and not the feature. Other affected stories are linked as `related`, each with a comment saying why. If two stories are plausible, ask once, and batch every question of the session into one.

### 3. Check for duplicates

Before creating, search for an existing bug or stub on the same subject. Reuse the stub (rename it, fill it in, re-parent it) instead of creating a sibling.

### 4. Write

**Naming convention:**

```
[BUG] <Product> - <Feature id> - <Story id> - BUG<nn> - <observed symptom>
```

The symptom says what looks wrong, never the fix. `BUG<nn>` is sequential per feature and comes from your numbering file.

**Fields:**

- Description: what happened in 3 to 6 lines (what the person saw versus what the source holds), then a short "Why it matters".
- Repro steps: what happened (with link), the **To verify** list, the raw evidence with date, the **Not verified** line, and **Done when**.
- System info: where it runs, since when, and which source of truth applies there.
- Severity is the damage (a wrong number in front of a user is high). Priority is the queue. They are different fields, so do not copy one into the other.

If your tracker escapes raw quote and angle-bracket characters, avoid them in text fields, since the card becomes unreadable. Use typographic quotes or rephrase.

### 5. Link and place

- The parent is the story from step 2. If the item already has another parent, unlink it first, since most trackers accept only one parent.
- Add `related` links for stories that share the broken rule, each with a comment.
- Put the item in the current iteration.

### 6. Record

Add a line to the numbering table. Add a line to the decision log only when a real decision was made (item type, change of rule, a finding that changes the original statement). A routine bug needs no decision entry.

## Template

Use `templates/bug-report.md`. A filled example is in `examples/acme-sales-assistant/bug-report.md`.

## Errors this skill exists to prevent

| Error | What to do |
|---|---|
| Writing the cause as if it were fact | Make it an item in the **To verify** list |
| Bug hung on the epic or feature | The parent is the story where the symptom appears |
| Naming a deal without a link | The name becomes a hyperlink to the source record |
| Writing from what the reporter remembers | Pull the source live first |
| Staying silent about what could not be checked | Add a **Not verified** line with the reason |
| Filing a bug to change a rule that was delivered as specified | Open a new story. If the PM decides it is a bug, add a scope note to the description |

## Checklist

- [ ] Source checked live, or a "Not verified" line explains why not
- [ ] No sentence asserts a cause
- [ ] The first verification item asks which source the run read
- [ ] The parent is the story where the symptom appears
- [ ] Every record cited is a hyperlink
- [ ] The title follows the naming convention and describes a symptom
- [ ] "Done when" lists observable results, not a fix
- [ ] Duplicate search done

## Definition of done

The card is done when an investigator who was not in the conversation can recognize the symptom, knows exactly what to verify first, and has not been told what the answer is.
