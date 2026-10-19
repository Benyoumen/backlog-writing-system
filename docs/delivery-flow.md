# Delivery flow

How the process skills connect, from an idea to a closed bug.

```mermaid
flowchart TD
    A[Confirmed intent from stakeholder interviews] --> B{Does the request bundle<br/>separately testable capabilities?}
    B -- yes --> C[Capability map<br/>skills/write-prd, phase 0]
    B -- no --> D
    C --> G1{{PM reviews the map}}
    G1 --> D[Specify<br/>goal, numeric success criterion,<br/>Always / Ask first / Never,<br/>sources, verification, scope]
    D --> G2{{PM reviews the spec}}
    G2 --> E[Decompose into vertical slices<br/>skills/decompose-spec]
    E --> G3{{Checkpoint review}}
    G3 --> F[Execution plan<br/>phases, schedule, cadence, open decisions<br/>skills/execution-plan]
    F --> H[Backlog in the tracker<br/>Epic, Feature, Story, dependency links]
    H --> I[Build and verify each slice]
    I --> J{Symptom found?}
    J -- no --> K[Phase exit gate and demo]
    J -- yes --> L[Bug report<br/>skills/bug-report<br/>parent is the story where it appears]
    L --> M[Investigate: first question is<br/>which source did the run read?]
    M --> N{Spec or plan wrong?}
    N -- yes --> D
    N -- no --> I
    K --> O{More phases?}
    O -- yes --> I
    O -- no --> P[Success criterion measured<br/>against the spec]
```

## Where each artifact lives

| Artifact | Owner | Rule |
|---|---|---|
| Spec | `write-prd` | One owner per fact, updated the day a decision changes |
| Plan with the dependency graph | `decompose-spec` | Holds an index of card ids, never a second task list |
| Execution plan | `execution-plan` | Only the start date is typed, every other date is derived |
| Cards | Your backlog standard | The tracker is the list of record |
| Bugs | `bug-report` | Describe, never assert a cause |

## Feedback loops

- A changed decision goes back to the spec the same day, then the plan is re-derived.
- A bug that shows the spec was wrong returns to Specify, not straight to a fix.
- Closed items feed the time measurement used by `decompose-spec`. With fewer than 8 comparable items, a duration stays `declared`.

## Worked example

The files in `examples/acme-sales-assistant/` follow this flow end to end: `prd.md`, then `decomposition.md`, then `execution-plan.md`, then `bug-report.md` for a defect found while US02 was being verified.
