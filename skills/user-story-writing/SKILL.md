---
name: user-story-writing
description: Writes and reviews User Stories so a developer understands them on first read and the product does not ship with rules inside rules. Seven writing rules (concrete why, direct-order sentences, no figurative language, translated jargon, one main function, acceptance as verifiable cases, no filler stories) plus a cut rule for exceptions of exceptions. Use when writing, reviewing or pruning User Stories, rewriting acceptance criteria, or when someone says "this story is confusing" or "should we keep this story?".
---

# User Story writing

Complements `backlog-standard` (structure and sections) and `why-it-exists` (the first section). This skill covers the language specific to a User Story and the rule for what to cut.

## Rule 1. The "Why it exists" names what fails and does not open with a formula

Do not open with "Without this slice,". A formula repeated in every story gets skipped. Start with the fact: what the person does today, or what stops happening.

> Weak: Without this slice, what the rep learns by phone only reaches the CRM if they open it and edit field by field.
>
> Better: Today the rep updates an opportunity only by opening the CRM and editing field by field. After a call they rarely do, and the new information never reaches the CRM.

Two to four sentences. The last states the business consequence as a concrete effect, never as an adjective.

## Rule 2. One idea per sentence, direct order, no chained references

A sentence that joins two facts and points at another story is deciphered, not read.

> Weak: Automatic resolution by the company named in the text comes in the next slice, and audio comes after it.
>
> Better: This story covers text input. Audio input is the next story.

Practical limits: 8 to 22 words per sentence; subject before verb; at most one reference to another card per sentence; no "it is X, not Y, that"; no colon joining two ideas.

## Rule 3. No colloquial, familiar or figurative terms

Cards are where these escape most. Keep a living list in your team's style checklist and review against it before delivery. State the effect, not the feeling.

| Weak | Better |
|---|---|
| hallway chat | unscheduled in-person conversation |
| the information gets lost | the information never reaches the CRM |
| the rep mutes the agent | the rep turns off the agent's notifications |
| it becomes noise | the rep starts ignoring it |
| it drops off the radar | it stops appearing in any of the rep's lists |
| it dies on the vine | it stays inactive until closed as lost |
| it burns trust | it lowers the rep's trust in the agent |
| back door | a path that bypasses the configured permission |
| floods the inbox | creates repeated messages for the rep |
| throws the conversation away | discards the meeting content |
| from scratch | with no earlier information |
| by hand | manually |
| from memory | without checking the record |

## Rule 4. Tool jargon is translated at first mention

Cards are read by people who do not use the tool daily. If a technical term is needed, use the common word in the body and keep the technical term in Technical notes. This applies to card, payload, webhook, stream, thread, polling and fallback.

> Weak: The rep receives a card in the chat tool with what changed.
>
> Better: The rep receives a message in the chat tool with what changed.

## Rule 5. One main function, sayable in one sentence

Before writing, complete: "This User Story exists to ..." If the answer needs "and also", you have two stories. If you cannot complete the sentence, the story should not exist.

The title is that sentence, shortened. A title that lists three topics ("Audit trail, restricted access and retention of the recording") shows three subjects stacked so none is left without a home.

## Rule 6. Acceptance criteria are verifiable cases, not a list of statements

The acceptance section answers one question: how does a person check this story is done? It is not the place for motive, Feature context, technical notes or out-of-scope items.

**Required model for each case:**

```
Case: [name of the behavior this case proves]
Given [initial state]
And [indispensable initial condition]
When [a single event]
Then [observable result]
And [indispensable complementary result]
```

Seven rules follow from the model.

1. **The case name is the identification.** It states a business result. "Scenario 1" is not accepted.
2. **One When and one Then.** If the original text joined two actions in one block, split them: the initial state goes to Given, the trigger to When.
3. **"And" only completes the same Given or the same Then.** It never adds a second event.
4. **Then must be observable:** what opens, what appears, what is saved, what is not saved, what enters or does not enter a list. Banned: "works correctly", "the system handles it", "appropriately", "as expected".
5. **A permanent rule is not a case.** A statement that always holds and depends on no event ("The action is available on every screen", "Every save records user and time") belongs in Expected behavior. When rewriting old acceptance text, move those lines there first, after checking they are not already declared.
6. **Three to six cases.** More usually means the story covers an exception of an exception. If the original has fewer than three flows, do not pad with invention.
7. **The case ends at the edge of the slice.** If the preview belongs to another story, acceptance here is "the preview opens and nothing is saved". Do not detail confirm or cancel.

Write in business language, with no button identifiers, database fields or endpoints. Each case must be understandable alone.

Do not create cases for errors, timeouts, access permission or other input channels unless the source already decided that behavior.

## Rule 7. Do not invent stories to fill the Feature

A Feature with two good stories beats one with five, of which three are administrative spin-offs. Logging, counting and audit trails are not stories. They are non-functional requirements or acceptance criteria of the story that produces the data.

## The cut for exceptions of exceptions

This is the rule that matters most. An agent that is born with a rule inside a rule is expensive to build, impossible to test and unpredictable for its user. The backlog is where that complexity enters, one line at a time, almost always with good intentions: the card covers the main case, then the rare case, then the rare case of the rare case.

### How to recognize one

An item is an exception of an exception when at least two of these hold:

1. It happens only after another exception has already happened.
2. Describing when it applies needs two chained conditions ("when A fails and then B").
3. The user takes no different action because of it.
4. It exists to keep the system consistent, not for someone to decide something.
5. Only the card's author can explain why it is there.

### What is not an exception of an exception, and stays

- **The alternative the product promises.** If capture fails, the rep records the meeting another way. That is the main path for whoever lands there.
- **The legal or permission lock.** Consent, approval limit, a field the agent never writes.
- **The rule that changes the user's decision.** If they act differently, it is behavior, not an exception.

### What to do when you find one

In this order: **absorb** the essential into one sentence of Expected behavior or into an acceptance case of the sibling story; **move** it to Non-functional requirements when it is logging, retention or security; **cut** it when neither fits.

Do not silence the decision. Tell the product owner what was cut and where the essential content went.

### When in doubt, stop and show

List the doubtful items with the main function of each in one sentence, and ask. Do not decide alone and deliver a backlog bigger than it needs to be.

## Gate before delivering

Three layers, in this order. A script checks **structure**, a style checker checks **register**, and the rest is **human reading**, because no tool decides whether a story should exist.

1. No "Why it exists" opens with "Without this slice" or "Without this capability".
2. No term from the Rule 3 list appears in the text.
3. No jargon from Rule 4 appears outside Technical notes.
4. Every story completes "This User Story exists to ..." without "and also".
5. No title lists three topics.
6. No story scores two or more marks on the exception-of-exception test.
7. No criterion describes system behavior after two chained failures.
8. Every criterion starts with `Case:` and the name states behavior, not a number.
9. Each case has one When and one Then; "And" only completes Given or Then.
10. No Then uses "works correctly", "the system handles it", "appropriately" or "as expected".
11. Every permanent rule that was in the acceptance section moved to Expected behavior and did not disappear.
12. Each story has 3 to 6 cases.

A useful calibration: measure the sentence length of an approved batch and use that profile as the target. Sentences of about 15 words in direct order are what make a card understood on first read.

## Definition of done

A developer reads the story once, repeats its main function in one sentence, and writes tests directly from the cases without asking the author a question.
