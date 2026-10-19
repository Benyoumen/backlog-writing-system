---
name: why-it-exists
description: Writes the "Why it exists" field of an Epic, Feature or User Story so a product manager can read the card and explain it aloud without opening the spec or asking an engineer. Starts from the consequence of the item not existing, in plain business language, and sweeps jargon from fields that are not meant for developers. Use when a card is described as unclear or too technical, when writing new cards, and before loading any batch into the tracker.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Why it exists

> Most unclear cards are correct and traceable. They fail on communication: the text says what the thing is, in engineering vocabulary, and never says why it must exist. This skill puts the reason in the first line.

## When to use

- Writing the first section of any new Epic, Feature or User Story.
- A card is described as unclear, too technical, or "only the author understands it".
- Before loading any batch into the tracker.
- A card only describes what the item is and never says what happens without it.

## Inputs

- The item and its parent.
- The source document, read once to find the consequence, then closed.
- The role who is affected: the sales rep, the sales director, the pre-sales engineer. Not "the user", not "the system".
- The jargon table below, extended with your product's own terms.

## Procedure

1. Read the item and answer aloud: what breaks in someone's day if this does not exist?
2. Write the answer as one sentence naming the person who is affected.
3. Add a second sentence with the other effect, if there is one. Stop at three.
4. Sweep jargon with the table in the Rules.
5. Apply the direct-order rules: 8 to 22 words per sentence, no cleft sentence, no colon joining two ideas, no long dash.
6. Run the repetition test: cover the parent and read the field. If it stays true for a sibling, it is too generic. Go down to the concrete.
7. Read it aloud. If you stumble, go back, or use a word you would translate for someone else, rewrite.

## Rules

### The acceptance bar

> A product manager, reading only the card, can explain the item aloud to a business director.

No opening the source document. No opening the technical spec. No asking the tech lead. If any of the three is needed, the card fails.

### The model

Register: sober, precise, professional. Read it aloud in a leadership meeting without changing the tone.

> **Why it exists:** without one shared reading of the customer record, each sub-agent would query the CRM on its own and reach a different interpretation of the same deal. The rep would receive conflicting guidance, and no sub-agent could warn the others about a change.

Every "Why it exists" does five things.

1. Starts from the consequence of not existing, not from a description of what the item is.
2. Names the affected role and what happens to them.
3. Uses business vocabulary. Nothing that needs translation, no engineering metaphor.
4. Runs two or three complete sentences. The second adds a new effect and does not restate the first.
5. Survives being read aloud in a leadership meeting.

### Tone

- Professional register. No colloquialisms: "by hand", "off the top of the head", "goes cold", "eats hours", "whoever shouted loudest", "we".
- No drama and no hyperbole. State the consequence as a fact, once.
- Complete sentences with subject and verb, ending in a period. This applies to every block of text in the card, including list items in other sections.
- Complete does not mean long. The target stays at 8 to 22 words.

### What changes by level

The three "Why it exists" fields in one lineage must not say the same thing.

| Level | Answers |
|---|---|
| Epic | What business result does not happen if this whole block is not built? |
| Feature | What capability is missing from someone's day, and what do they do manually meanwhile? |
| User Story | What concrete behavior fails, or what specific error occurs, without this slice? |

### Jargon sweep

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

Where jargon stays: Technical notes and Technical details are written for developers and keep the exact term. Everywhere else, write for the product manager.

Domain terms stay: terms the reader uses daily, such as pipeline, forecast, handoff and aging, are not translated. Do not explain forecasting to someone who has sold for ten years.

### Vocabulary of the levels

Say Epic, Feature and User Story. These are the names on the board and in conversation with the team.

### Common errors

- The card describes instead of explaining. "Performs intent routing" is not a reason.
- Abstract consequence: "improves traceability", "increases efficiency". Say who loses what.
- Missing subject: "it is ensured that", "they are handled". Say who acts and who suffers.
- The same why at three levels, with only the words changed.
- Translating what needs no translation, such as explaining forecast to a sales director.
- Cold block: six telegraphic bullets with no sentence tying them together. Write sentences.

## Checklist

- [ ] The field starts with a consequence, not a description.
- [ ] A role is named, not "the user" or "the system".
- [ ] Two or three complete sentences, each 8 to 22 words.
- [ ] No term from the jargon table outside Technical notes.
- [ ] No engineering metaphor.
- [ ] The field would not be true for a sibling item (repetition test).
- [ ] Read aloud without stumbling.

## Example

Epic. Weak: "Deliver the single read per account and the rail through which signals circulate between sub-agents." (describes, and uses "rail") Corrected: "Each sub-agent reads the CRM in its own way, so the rep receives two different recommendations for the same deal. The same gap lets someone see another rep's accounts."

Feature. Weak: "Centralize CRM writes, human validation, the channel and the day shell in one place." Corrected: "Today five sub-agents could write to the CRM on their own. With no single place that writes, the sales director cannot tell who changed what, or undo it."

User Story. Weak: "As a rep, I want context per account, so I do not see data from another." (correct, but does not say what fails) Corrected: "The agent currently shows reps deals that are not theirs. Besides the confidentiality problem, the daily list fills with opportunities the rep is not allowed to touch."

## Definition of done

The product manager explains the item aloud from the card alone, and a developer reading the same card knows what behavior is at risk.

## Related

- Companions: [`backlog-standard`](../backlog-standard/SKILL.md), [`user-story-writing`](../user-story-writing/SKILL.md), [`epic-feature-story-templates`](../epic-feature-story-templates/SKILL.md).
- Why: [principle 3, write the why from the consequence of absence](../../docs/principles.md#3-write-the-why-from-the-consequence-of-absence); [principle 4, the four-reader test](../../docs/principles.md#4-pass-the-four-reader-test).
- Examples: [`before-after.md`](../../examples/before-after.md), [`epic.md`](../../examples/acme-sales-assistant/epic.md), [`feature.md`](../../examples/acme-sales-assistant/feature.md).
