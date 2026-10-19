# Operating cadence

How the operations skills fit into one week. The goal is that the sponsor review, the snapshot, the roadmap and the tracker always tell the same story.

```mermaid
flowchart LR
    A["Monday: freeze the week"] --> B["Read the roadmap from the tracker"]
    B --> C["Build the review deck"]
    C --> D["Review with the sponsor"]
    D --> E["Email the commitments"]
    E --> F["Plan the sprint from the simulation"]
    F -. "next Monday" .-> A
```

*One week, six steps, the same every week. The snapshot shows what changed, including what was removed; the review opens with last week's commitments; the email is the contract of the week; the sprint is planned from the capacity simulation, re-run from the tracker's current state, and written back only after a dry run.*

## Weekly rhythm

| Step | Skill | Input | Output |
|---|---|---|---|
| 1 | `weekly-backlog-snapshot` | Living backlog, feedback, KPI values, items removed | Updated living document and snapshot w NN, with what was added and what was removed |
| 2 | `roadmap-status` | Tracker, registry | Dated snapshot, diff, optional delay events |
| 3 | `backlog-review-meeting` | Last week's deck, sponsor email, meeting notes, snapshot, roadmap | Review deck and PDF for week NN |
| 4 | Meeting | Deck | Decisions and commitments |
| 5 | Follow-up email | Meeting | Input file for week NN+1 |
| 6 | `capacity-simulation`, then `sprint-planning` | Now band, team by name with weekly capacity, points and relations from the tracker | The landing week per story and for the Epic, the what-ifs; then owners, points and sprint written to the tracker |
| 7 | `work-item-card` | Commitments | Cards with next step and dated comments |
| As needed | `publish-roadmap` | Roadmap source | Document, deck, PDF, PPTX, diff |

## Consistency rules across the cadence

- One source per fact. The tracker owns state. The backlog owns scope. The registry owns the roadmap mapping.
- A shared fact changes everywhere in the same pass.
- The previous week's folder and snapshots are never edited. Corrections go into the living document and show up in the next snapshot.
- The follow-up email wins over memory when they disagree.
- Names of people stay out of sponsor-facing material. Sources of feedback are anonymous.
- What was removed is reported with the same care as what was added: in the snapshot's Removed this week section and in the review's one-line What we cut.
