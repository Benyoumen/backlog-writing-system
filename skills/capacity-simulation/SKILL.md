---
name: capacity-simulation
description: Runs a live sprint simulation from the team by name, each person's weekly capacity in points, and the stories with their Fibonacci points and relations, and returns the week each story, Feature and Epic lands, the points per person per week, the idle weeks and the critical path. Supports what-if moves (add a person, change a capacity, move a story, cut a Feature) so the delta can be read with the sponsor. Use at sprint planning, when a sponsor asks when the Epic lands, when a capacity changes, or when a Feature is cut or added.
license: MIT
metadata:
  version: "1.1"
  author: Benjamin Tayar
  method: backlog-writing-system
---

# Capacity simulation

> The simulation is the conversation. The tracker is the record. Move a story, change a person's capacity, add a developer, and the landing date moves in front of everyone, before anyone writes a promise down.

## When to use

- Sprint planning: who takes what, and what lands when.
- A sponsor asks "when does the Epic land?" and wants to see what changes the answer.
- A person's capacity changes, a Feature is cut or added, or the chain changes.
- Checking that the Now band fits the appetite before the cycle starts.

## Inputs

- The team by name, with each person's weekly capacity in points. Starting reference: 5 points per person per week, which is 10 points per two-week sprint, one point per working day minus ceremonies. Replace it with measured velocity as soon as the team has at least 8 closed comparable items.
- The stories of the Now band: Fibonacci points (1, 2, 3, 5, 8, 13), owner if already chosen, band and wave, Predecessor / Successor relations (`prioritize-now-next-later`, `decompose-spec`).
- The reserve share of each sprint for enabling and platform work. Default one third.
- The start date. The only date typed.

Output: the capacity plan (`templates/capacity-plan.md`): the schedule, the landing dates, the load per person per week, the idle weeks, the critical path, and the what-ifs with their deltas. The interactive version of this skill runs in the browser at https://benyoumen.github.io/backlog-writing-system/capacity.html.

## Procedure

1. Load the team: names and weekly capacity. Label each capacity `measured` (velocity from 20 or more closed items), `partial` (8 to 19) or `reference` (the starting rule). Below 8 closed items, say "no history" and use the reference.
2. Load the stories of the Now band with points, relations and wave. A Feature with an unestimated story goes to "to refine" and leaves the simulation. An estimate of 0 is a value and is shown, not skipped.
3. Set the reserve: the share of each sprint held for Enabler and platform stories. They are allocated first inside their reserve, so the foundation never waits for the product to finish.
4. Allocate, week by week, in dependency order: a story starts only when every predecessor is finished; the riskiest unblocked story starts first where the order is free; a person works one story at a time; a Feature's stories stay inside one sprint, never split across two.
5. Read the outputs: the week each story, each Feature and the Epic land; points used per person per week against capacity; idle weeks (a person with less than half their capacity used); the critical path (the chain of dependent stories that sets the landing date).
6. Run the what-ifs the sponsor will ask for anyway: add a person, change a capacity, move a story to the next wave, cut a Feature. Show each as a delta on the landing date and on the idle weeks. Say which constraint moved the date: capacity, or the chain.
7. Write the result into the plan, then into the tracker through `sprint-planning` (dry run, one item, then the batch). The simulation never writes to the tracker by itself.
8. Re-run at every weekly review from the tracker's current state, so the landing date on the board is the derived one, not the one promised three weeks ago.

## Rules

- The tracker is the record. The simulation never replaces it and never writes to it on its own.
- Only the start date is typed. Every other date is derived from points, capacity and relations.
- A story starts only when its predecessors are done. The chain is not negotiable; the capacity is.
- A Feature never splits across two sprints. A Feature that does not fit moves whole to the next sprint.
- The reserve is allocated first. Enablers scheduled "when there is time" never get built.
- Small samples do not become numbers: `measured` needs 20 or more closed comparable items, `partial` 8 to 19, below that the plan says "no history" and uses the reference capacity, labeled as such.
- Points per person per week are read as load, not as judgment. An idle week is a slicing or chain problem to fix, never a person to blame.
- When capacity and the chain disagree on the landing date, the chain wins, and the fix is in the decomposition, not in overtime.

## Checklist

- [ ] Every capacity carries a label: measured, partial or reference.
- [ ] Every story in the simulation has points, a wave and its relations; unestimated Features are out, listed under "to refine".
- [ ] The reserve share is set and allocated first.
- [ ] No story starts before its predecessors finish; no Feature splits across sprints.
- [ ] Landing week shown per story, per Feature and for the Epic.
- [ ] Load per person per week and idle weeks shown.
- [ ] The critical path is named, and the constraint that sets the date (capacity or chain) is stated.
- [ ] At least one what-if with its delta.
- [ ] Nothing was written to the tracker by the simulation.

## Example

Weak plan: "31 points, four developers at 5 points a week, so two weeks." The team is idle for most of week 1 and the Epic lands in week 3, because the first story gates everything after it.

Corrected: "Team of four, 17 points a week (reference capacity, no history). Ten stories, 31 points, in dependency order. Week 1 uses 11.6 of 17 points: only the meeting list and the CRM write path can start. The Epic lands on day 15, 2026-03-27. Critical path: the email chain, five stories on one person. What-if, Diego from 3 to 5 points and the fact view moved to him: day 14. The chain sets the date, not the capacity." (Illustrative; the full plan is in `../../examples/acme-sales-assistant/capacity-plan.md`.)

## Definition of done

The plan is done when the sponsor can see which week the Epic lands and why, when every person's load per week is visible with its label, when at least one what-if shows what would change the date, and when the tracker still holds nothing the team did not approve.

## Related

- Before: [`prioritize-now-next-later`](../prioritize-now-next-later/SKILL.md) for the Now band, the waves and the chain; [`decompose-spec`](../decompose-spec/SKILL.md) for points and relations. After: [`sprint-planning`](../sprint-planning/SKILL.md) to write owner, points and sprint to the tracker; [`roadmap-status`](../roadmap-status/SKILL.md) for the derived dates on the roadmap.
- Why: [the prioritization method](../../docs/prioritization.md); [principle 5, sequence by the chain, not by the score](../../docs/principles.md#5-sequence-by-the-chain-not-by-the-score); [principle 10, a roadmap is a dated photo](../../docs/principles.md#10-a-roadmap-is-a-dated-photo-not-a-promise).
- Template: [`capacity-plan.md`](../../templates/capacity-plan.md). Example: [`capacity-plan.md`](../../examples/acme-sales-assistant/capacity-plan.md). Interactive: [capacity simulator](https://benyoumen.github.io/backlog-writing-system/capacity.html).
