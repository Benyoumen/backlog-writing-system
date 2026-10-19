---
name: frame-the-problem
description: Writes the one-page frame that decides whether an idea is worth time at all: the problem in the person's words, who has it and how often, the evidence held and missing, the outcome with its number, the appetite, and what is not being done. Use before any prototype, spec or ticket, when someone asks "is this worth doing?", or when a request arrives already shaped as a solution.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Frame the problem

> One page, written before anyone opens a design tool, that names the number and the appetite so the prototype and the spec have something to be judged against.

## When to use

- A request arrives as a solution ("build a bot that...") and nobody has said what breaks today.
- Someone asks whether an idea is worth doing.
- Before a prototype, a spec or a ticket exists.
- When the number read at the end of a cycle (stage 6 of the workflow) opens the next initiative.

Do not use it for a one-line fix or for work whose frame is already approved.

## Inputs

- What the person who has the problem said, in their words: interview notes, support tickets, a recorded complaint.
- Any number you already hold: how often, how long, how much, and where it came from.
- The sponsor's appetite, or a meeting with the sponsor to set it.
- The list of things the team has already decided not to do.

## Procedure

1. Write the problem in the words of the person who has it. Quote them when you can. Do not translate the complaint into a feature.
2. Name who has it and how often: a role, a count, a frequency. "Account executives, after every customer meeting, three to five times a day."
3. Separate evidence held from evidence missing. Held: a number you measured, with its source and date. Missing: what you would need to believe the problem is worth the appetite, and how you will get it in discovery.
4. Write the outcome and the number: the result that would prove it, with a baseline (or "to measure"), a target, a date and the source that will measure it. No number, no initiative. Write the question to investigate instead.
5. Set the appetite with the sponsor: how much time this is worth, decided now, before anyone estimates. Scope bends to the appetite later; the appetite does not bend to scope.
6. Write the not-doing list: three to five things a reader could assume are included and are not.
7. Say the gate sentence aloud: "We want <number> by <date>, and we will spend <appetite> to find out." If it does not fit in one sentence, the frame is not done.
8. Record the decision: proceed to discovery, investigate the missing evidence first, or stop.

## Rules

- The number is an outcome for the business or for the person, never a machine metric.
- The appetite is set by the sponsor before the estimate exists, never derived from the estimate.
- A frame does not propose a solution. If a solution arrived with the request, record it under "What was proposed" and frame the problem anyway.
- Evidence missing is listed, not hidden. A frame with nothing missing is suspicious.
- One page. A frame that runs long is a spec written too early.
- Plain language. An executive reads it in two minutes and can repeat the number.

## Checklist

- [ ] The problem is in the person's words, not the team's.
- [ ] Who and how often are stated as a role, a count and a frequency.
- [ ] Evidence held names its source and date; evidence missing names how it will be obtained.
- [ ] The outcome has a number, a baseline or "to measure", a target, a date and a measuring source.
- [ ] The appetite was decided with the sponsor before any estimate.
- [ ] The not-doing list has three to five lines.
- [ ] The gate sentence fits in one breath.
- [ ] A decision is recorded.

## Example

Weak: "Build an AI assistant that automates post-meeting admin for sales. It will save a lot of time and improve data quality. Timeline: as soon as possible."

Corrected: "Reps say: I get back at seven and still have four follow-ups to write. 38 account executives, three to five meetings a day (illustrative). Evidence held: 41 percent of opportunities are updated within a day of the last meeting (CRM timestamps, January, illustrative). Evidence missing: how long a follow-up takes to write; ask five reps this week. Outcome: 80 percent of follow-ups sent within 2 hours of the meeting, within 60 days of launch, measured from the assistant's trail. Appetite: six weeks of two people for the first usable release. Not doing: customer success, scheduling, quotes. Gate sentence: we want 80 percent of follow-ups out within 2 hours, and we will spend six weeks of two people to find out."

## Definition of done

A sponsor who was not in the room reads the page, repeats the number and the appetite, and either approves discovery or names the missing evidence that stops it.

## Related

- Next: [`prototype-to-spec`](../prototype-to-spec/SKILL.md) for discovery, [`write-prd`](../write-prd/SKILL.md) for the spec, which reads the frame's number.
- The weekly read of the number: [`weekly-backlog-snapshot`](../weekly-backlog-snapshot/SKILL.md), [`backlog-review-meeting`](../backlog-review-meeting/SKILL.md).
- Why: [principle 1, start from the number](../../docs/principles.md#1-start-from-the-number); [principle 5, sequence by the chain, not by the score](../../docs/principles.md#5-sequence-by-the-chain-not-by-the-score); [the workflow, stage 0](../../docs/workflow.md).
- Template: [`templates/frame.md`](../../templates/frame.md). Example: [`examples/acme-sales-assistant/frame.md`](../../examples/acme-sales-assistant/frame.md).
