---
name: why-it-exists
description: Writes the "Why it exists" field of an Epic, Feature or User Story so a product manager can read the card and explain it aloud without opening the spec or asking an engineer. Starts from the consequence of the item not existing, in plain business language, and sweeps jargon from fields that are not meant for developers. Use when a card is described as unclear or too technical, when writing new cards, and before loading any batch into the tracker.
---

# Why it exists

Most unclear cards are correct and traceable. They fail on communication: the text says what the thing is, in engineering vocabulary, and never says why it must exist. A card only its author understands creates clarification meetings, tickets and rework. A good backlog does not have more text. It has the reason in the first line.

## The acceptance bar

> A product manager, reading only the card, can explain the item aloud to a business director.

No opening the source document. No opening the technical spec. No asking the tech lead. If any of the three is needed, the card fails.

## The model

Register: sober, precise, professional. Read it aloud in a leadership meeting without changing the tone.

> **Why it exists:** without one shared reading of the customer record, each sub-agent would query the CRM on its own and reach a different interpretation of the same deal. The rep would receive conflicting guidance, and no sub-agent could warn the others about a change.

Every "Why it exists" does five things.

1. **Starts from the consequence of not existing**, not from a description of what the item is.
2. **Names the affected role** and what happens to them: the sales rep, the sales director, the pre-sales engineer. Not "the user", not "the system".
3. **Uses business vocabulary.** Nothing that needs translation, no engineering metaphor.
4. **Runs two or three complete sentences.** The second adds a new effect and does not restate the first.
5. **Survives being read aloud** in a leadership meeting.

## Tone rules

- Professional register. No colloquialisms: "by hand", "off the top of the head", "goes cold", "eats hours", "whoever shouted loudest", "we".
- No drama and no hyperbole. State the consequence as a fact, once.
- Complete sentences with subject and verb, ending in a period. This applies to every block of text in the card, including list items in other sections.
- Complete does not mean long. The target stays at 8 to 22 words.

## What changes by level

The three "Why it exists" fields in one lineage must not say the same thing.

| Level | Answers |
|---|---|
| Epic | What business result does not happen if this whole block is not built? |
| Feature | What capability is missing from someone's day, and what do they do manually meanwhile? |
| User Story | What concrete behavior fails, or what specific error occurs, without this slice? |

**Repetition test.** Cover the Epic and read the Feature's field. If it stays true for any Feature under that Epic, it is too generic. Go down to the concrete.

## Jargon sweep

These terms block reading. Use the plain wording on the right.

| Instead of | Write |
|---|---|
| rail, bus, signal bus | the path through which one sub-agent notifies another |
| shell | the screen the person uses day to day |
| single write port, write-back | the only place that writes to the CRM |
| signal envelope | the notice, with its origin and evidence |
| materiality, material signal | when the difference changes the rep's decision |
| idempotent, idempotency | processing twice does not duplicate |
| output contract | the agreed format of the delivery |
| delta | what changed |
| validation queue | the list of items waiting for the rep's approval |
| gate | the point where someone must approve |
| orchestration layer | whatever decides which sub-agent responds |

Engineering metaphors do not work as concepts. Rail, conveyor, pipeline, bridge, glue and engine explain things to people who already know and hide them from people who do not. Say what the thing does.

**Where jargon stays.** Technical notes and Technical details are written for developers and keep the exact term. Everywhere else, write for the product manager.

**Domain terms stay.** Terms the reader uses daily, such as pipeline, forecast, handoff and aging, are not translated. Do not explain forecasting to someone who has sold for ten years.

## Vocabulary of the levels

Say Epic, Feature and User Story. These are the names on the board and in conversation with the team.

## Procedure

1. Read the item and answer aloud: what breaks in someone's day if this does not exist?
2. Write the answer as one sentence naming the person who is affected.
3. Add a second sentence with the other effect, if there is one. Stop at three.
4. Sweep jargon with the table above.
5. Apply the direct-order rules: 8 to 22 words, no cleft, no colon joining ideas, no em dash.
6. Read it aloud. If you stumble, go back, or use a word you would translate for someone else, rewrite.

## Before and after

**Epic.**
Weak: "Deliver the single read per account and the rail through which signals circulate between sub-agents." (describes, and uses "rail")
Better: "Each sub-agent reads the CRM in its own way, so the rep receives two different recommendations for the same deal. The same gap lets someone see another rep's accounts."

**Feature.**
Weak: "Centralize CRM writes, human validation, the channel and the day shell in one place."
Better: "Today five sub-agents could write to the CRM on their own. With no single place that writes, the sales director cannot tell who changed what, or undo it."

**User Story.**
Weak: "As a rep, I want context per account, so I do not see data from another." (correct, but does not say what fails)
Better: "The agent currently shows reps deals that are not theirs. Besides the confidentiality problem, the daily list fills with opportunities the rep is not allowed to touch."

## Common errors

- The card **describes** instead of explaining. "Performs intent routing" is not a reason.
- **Abstract consequence:** "improves traceability", "increases efficiency". Say who loses what.
- **Missing subject:** "it is ensured that", "they are handled". Say who acts and who suffers.
- **The same why at three levels**, with only the words changed.
- **Translating what needs no translation**, such as explaining forecast to a sales director.
- **Cold block:** six telegraphic bullets with no sentence tying them together. Write sentences.

## Checklist

- [ ] The field starts with a consequence, not a description.
- [ ] A role is named, not "the user" or "the system".
- [ ] Two or three complete sentences, each 8 to 22 words.
- [ ] No term from the jargon table outside Technical notes.
- [ ] No engineering metaphor.
- [ ] The field would not be true for a sibling item (repetition test).
- [ ] Read aloud without stumbling.

## Definition of done

The product manager explains the item aloud from the card alone, and a developer reading the same card knows what behavior is at risk.
