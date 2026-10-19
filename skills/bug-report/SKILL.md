---
name: bug-report
description: Writes a lean, didactic bug card that describes what happened without asserting a cause, is always linked to the User Story where the symptom appears, and always asks the investigator to verify where the consumed data came from. Checks the live source before writing and records what could not be checked. Use when someone says "log a bug", "this number is wrong", "this email, report or dashboard is off", or brings a value that does not match its source.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Bug report

> A bug card that does not hand the investigator a guess. It says what was seen, what the source holds, what to verify first, and what done looks like.

## When to use

- Someone reports a wrong number, a wrong email, a wrong screen, or a value that does not match its source.
- A production failure of a probabilistic behavior needs to be recorded before it is fixed.
- A delivered rule is being questioned. If the rule was delivered as specified, open a new story instead; if the PM decides it is a bug, add a scope note to the description.

## Inputs

- The reporter's statement, in their words.
- Read-only access to the source of truth (the CRM, the data source) to capture fields, values and the last-updated timestamp now.
- The backlog, to find the story where the symptom appears.
- The numbering file and the decision log.
- For a probabilistic behavior, the eval cases file.

## Procedure

1. Check the source live before writing. A bug about a number is not written from memory. Read the CRM or data source read-only and capture the fields, the values and the last-updated timestamp. The timestamp matters: if the record changed after the reported event, that is an item to verify. If a source cannot be reached, do not invent; write a "Not verified" line with the reason. If the live reading contradicts the reporter's statement, say so in your reply, write the item from what is observable, and keep both readings as items to verify without choosing one.
2. Find the matching User Story. A bug without a story does not enter a sprint. The parent is the story where the symptom appears, not the Epic and not the Feature. Other affected stories are linked as `related`, each with a comment saying why. If two stories are plausible, ask once, and batch every question of the session into one.
3. Check for duplicates. Reuse an existing stub (rename it, fill it in, re-parent it) instead of creating a sibling.
4. Write the card with `templates/bug-report.md`. Title: `[BUG] <Product> - <Feature id> - <Story id> - BUG<nn> - <observed symptom>`. The symptom says what looks wrong, never the fix. `BUG<nn>` is sequential per Feature and comes from your numbering file. Description: what happened in 3 to 6 lines (what the person saw versus what the source holds), then a short "Why it matters". Repro steps: what happened (with link), the To verify list, the raw evidence with date, the Not verified line, and Done when. System info: where it runs, since when, and which source of truth applies there. Severity is the damage (a wrong number in front of a user is high). Priority is the queue. They are different fields; do not copy one into the other.
5. For a probabilistic behavior (a draft, an extracted value, an agent action), add the failing input to the eval cases as a new case before the fix starts, and name the case id on the card. The fix is accepted when that case passes and every other case still passes.
6. Link and place: set the parent (unlink any other parent first; most trackers accept only one), add `related` links with comments, put the item in the current iteration.
7. Record: a line in the numbering table; a line in the decision log only when a real decision was made (item type, change of rule, a finding that changes the original statement). A routine bug needs no decision entry.

## Rules

1. Do not assert a cause. The bug describes what happened and asks to verify. Never write "the cause is X", "most likely" or "the agent reads A instead of B". Even a good hypothesis becomes a question in the verification list, not a conclusion. Whoever investigates must not inherit your guess as a fact.
2. Keep it lean. A few lines of description. Repro steps without an essay. If a sentence does not change what the developer will do, delete it.
3. Always ask for the data origin. Every bug about a number opens its verification with the same question: which source did the run read to produce this number? Record what it read, not what it should have read.
4. Be didactic. Someone who does not know the system can open the card and understand the problem. Plain language, the business rule stated in full, jargon only when it is a field name.
5. Be clear on first read. Run a plain-language edit before saving. A bug is read in a hurry, by someone who was not in the conversation.
6. Link to the source, always. When citing a deal, record or work item, the name is a markdown hyperlink to the real record, never a bare id in running text: `[Northwind renewal](https://crm.acme.example/deals/1042)`, not `deal 1042`. The raw id appears only on the technical evidence line.
7. A production failure of a probabilistic behavior becomes an eval case before it becomes a fix.
8. If your tracker escapes raw quote and angle-bracket characters, avoid them in text fields. Use typographic quotes or rephrase.

What the plain-language edit usually cuts:

| Pattern | Replace with |
|---|---|
| "It is the CRM value, not the billing value, that enters the draft" | Direct order, subject named: "The draft shows the CRM value." |
| "The central question is where the number came from:" | An imperative heading: "Before fixing, find where the number came from" |
| "For context: the value is double" | "The displayed value is double the source value." |
| Verbs in the infinitive: "to identify, to check" | Imperative to the investigator: "Identify", "Check", "Record" |
| "A is ready; B is ready; and C also" | Bullets, one criterion per line |
| A sentence with three nested clauses | Two sentences of 8 to 22 words |

Errors this skill exists to prevent:

| Error | What to do |
|---|---|
| Writing the cause as if it were fact | Make it an item in the To verify list |
| Bug hung on the Epic or Feature | The parent is the story where the symptom appears |
| Naming a deal without a link | The name becomes a hyperlink to the source record |
| Writing from what the reporter remembers | Pull the source live first |
| Staying silent about what could not be checked | Add a Not verified line with the reason |
| Fixing a model's output without a case | Add the input to the eval cases first |
| Filing a bug to change a rule that was delivered as specified | Open a new story; if the PM decides it is a bug, add a scope note |

## Checklist

- [ ] Source checked live, or a "Not verified" line explains why not.
- [ ] No sentence asserts a cause.
- [ ] The first verification item asks which source the run read.
- [ ] The parent is the story where the symptom appears.
- [ ] Every record cited is a hyperlink.
- [ ] The title follows the naming convention and describes a symptom.
- [ ] "Done when" lists observable results, not a fix.
- [ ] For a probabilistic behavior, an eval case id is named on the card.
- [ ] Duplicate search done.

## Example

Weak: "Draft shows wrong deal value. The agent is obviously reading the recurring amount instead of the total, fix the field mapping. Deal 1042."

Corrected: "[BUG] Acme Field Sales Assistant - F02 - US01 - BUG03 - Follow-up draft shows a deal value twice the CRM value. The rep saw 48,000 in the draft for the [Northwind renewal](https://crm.acme.example/deals/1042) on 2026-04-08; the CRM holds 24,000. Before fixing, find where the value came from: which source did the run read? The CRM holds three value fields; find which one entered. The record was updated at 16:40, after the meeting; check the value that held at generation time. Not verified: the generation log, unreachable from here. Done when: the origin is recorded on this item, the draft shows the CRM value, and eval case E03 passes." (Fictional; the full card is in `../../examples/acme-sales-assistant/bug-report.md`.)

## Definition of done

The card is done when an investigator who was not in the conversation can recognize the symptom, knows exactly what to verify first, has not been told what the answer is, and can find the eval case that will prove the fix.

## Related

- The story the bug hangs on: [`backlog-standard`](../backlog-standard/SKILL.md), [`user-story-writing`](../user-story-writing/SKILL.md). The case that proves the fix: [`eval-cases`](../eval-cases/SKILL.md).
- Why: [principle 9, bugs describe, they do not diagnose](../../docs/principles.md#9-bugs-describe-they-do-not-diagnose); [principle 7, the eval loop](../../docs/principles.md#7-for-ai-behavior-the-acceptance-criterion-is-an-eval); [the delivery flow](../../docs/delivery-flow.md).
- Template: [`bug-report.md`](../../templates/bug-report.md). Example: [`bug-report.md`](../../examples/acme-sales-assistant/bug-report.md).
