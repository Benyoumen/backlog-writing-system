# Backlog hierarchy

A three-level backlog, with one fixed parent rule and clear places for effort, dependencies and acceptance.

```mermaid
flowchart TD
    E["Epic<br/>Business outcome<br/>11 sections"]
    F1["Feature<br/>Deliverable capability<br/>15 sections"]
    F2["Feature<br/>Deliverable capability<br/>15 sections"]
    S1["User Story<br/>Testable behavior<br/>9 sections"]
    S2["User Story<br/>Testable behavior<br/>9 sections"]
    S3["User Story (Enabler)<br/>No persona<br/>9 sections"]

    E --> F1
    E --> F2
    F1 --> S1
    F1 --> S2
    F2 --> S3

    S3 -. "Predecessor / Successor" .-> S2
```

## Rules the diagram shows

- A User Story is always the child of a Feature. Never of an Epic.
- Dependencies are relations (dotted line), not sentences in a description.
- A parent does not close while a child is open.

## Where each piece of information lives

```mermaid
flowchart LR
    A["Why it exists, scope, rules"] --> D["Description"]
    B["Effort"] --> P["Story Points field<br/>(Epic, Feature: effort field)"]
    C["Dependencies"] --> R["Predecessor / Successor relation"]
    G["Acceptance criteria<br/>(Story)"] --> N["Native Acceptance Criteria field"]
    H["Acceptance criteria<br/>(Epic, Feature)"] --> D
    I["Definition of Done"] --> T["Team standard, inherited"]
```

## What each level answers

| Level | Question | Section "Why it exists" says |
|---|---|---|
| Epic | What changes for the business? | The business result that does not happen without this block |
| Feature | What can a person do that they could not before? | The missing capability and the manual work meanwhile |
| User Story | What exactly happens, and how do we check it? | The concrete behavior that fails without this slice |

## Flow of a new batch

```mermaid
flowchart LR
    A["Read the source"] --> B["Draw the tree"]
    B --> C["Reserve codes"]
    C --> D["Write one family at a time"]
    D --> E["Harmonize across families"]
    E --> F["Validate structure and register"]
    F --> G["Human review, item by item"]
    G --> H["Upload one card, check render"]
    H --> I["Upload the batch, record decisions"]
```
