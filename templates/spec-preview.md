# Spec preview: <capability>

Generated from `<data file>` by `<generator>` on <date>. Do not edit this page; edit the data file and regenerate.

## Chapter skeleton

| # | Chapter | Contents |
|---|---|---|
| 1 | Summary | Version, sources, status in the tracker, six metrics (epics, features, stories, effort, critical path, phases), "In 30 seconds", pending decisions by phase |
| 2 | Delivery phases | Per phase: what reaches production, why this order, the story cards, the exit gate, the decisions it needs. Then the weekly cadence |
| 3 | Schedule | One track per Epic, phase bands, a deliveries and checkpoints row, assumptions |
| 4 | Items by Epic | Each item: plain summary visible, numbered sections collapsible |
| 5 | What already exists | Material ready before kickoff, what it saves |
| 6 | Where it appears | Touchpoint, who sees it, channel, built here or elsewhere |
| 7 | Glossary | Every term, one line, where it appears |
| 8 | Open decisions | Decisions not taken, artifact-check findings, who answers, already decided |
| 9 | Board order | Order of creation in the tracker |

## The plain sentence, per item

One sentence. Subject: the person or the system. Says what starts to happen. No acronym, no table name, no library name.

| Item | Plain summary | Test |
|---|---|---|
| <Epic> | | A person outside the team reads it and knows what changes in someone's work |
| <Feature> | | Same |
| <Story> | | Same |

Good, Acme domain:

- "After a customer meeting, the rep finds a drafted follow-up email with the facts it used listed beside it."
- "An approved CRM update is applied once, and if the record changed in the meantime the update stops and says so."
- "The sales manager sees, per rep and per week, how many suggestions were sent, applied or ignored."

Bad:

- "Implements the draft-generation contract consumable by the CRM writer through a versioned payload." (a developer understands, the sponsor does not)
- "Improves the follow-up experience for reps." (nobody learns anything)

## Glossary

| Term | Definition (one line) | Appears in |
|---|---|---|
| | | |

Rule: every acronym, artifact name, system name and method term on the page is here. An undefined term fails the page.

## Gates in the generator

| Gate | Refuses when |
|---|---|
| Phase order | a dependency points to a later phase |
| Cycle | two items wait for each other |
| Numbering | story ids have a hole or a duplicate |
| Phase | a story has no phase |
| Budget | the sum of story effort does not match the Epic budget |
| Vocabulary | a term appears and is not in the glossary |
| Dates | any date other than the start date is typed |
