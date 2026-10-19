# Capacity plan: <Epic>

Version: <n> | Start date: <the only date typed> | Sprint length: <weeks> | Reserve for enabling work: <share> | Source: Now / Next / Later board v<n>

## 1. Team

| Person | Weekly capacity (points) | Label | Basis |
|---|---|---|---|
| <name> | | measured / partial / reference | <velocity from n closed items, or "no history, reference rule: 5 points a week"> |

Team capacity per week: <sum> points.

## 2. Stories in the simulation

Now band only. A Feature with an unestimated story is out, listed under "to refine".

| Story | Feature | Points (Fibonacci) | Type | Wave | Depends on | Owner |
|---|---|---|---|---|---|---|
| | | | Functional / Enabler | | | |

To refine: <Features out of the simulation and why>

## 3. Schedule, derived

A story starts only when its predecessors are done. One story per person at a time. A Feature never splits across sprints. Enablers are allocated first inside the reserve.

| Story | Owner | Start (day) | End (day) | Lands (date) |
|---|---|---|---|---|
| | | | | |

## 4. Landing

| Item | Lands on day | Date |
|---|---|---|
| <Feature> | | |
| Epic | | |

## 5. Load per person per week

Points used / capacity. An idle week is less than half the capacity used; it is a chain or slicing problem, never a judgment about a person.

| Week | <person> | <person> | <person> | Team | Idle |
|---|---|---|---|---|---|
| 1 | | | | | |

## 6. Critical path

<The chain of dependent stories that sets the landing date, and which constraint sets it: capacity or the chain.>

## 7. What-ifs

| Move | Epic lands | Delta | What moved the date |
|---|---|---|---|
| Base | | | |
| <add a person / change a capacity / move a story / cut a Feature> | | | capacity / chain |

## Gates before sharing

- [ ] Every capacity labeled
- [ ] Every story has points, a wave and its relations
- [ ] No story before its predecessors, no Feature split across sprints
- [ ] Reserve allocated first
- [ ] Only the start date typed
- [ ] Nothing written to the tracker by this plan
