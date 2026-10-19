# Feature template (15 sections)

Title: `<CODE>-E<n>-F<nn> - <name that states the capability>`

Type: Feature. Parent: an Epic. Children: User Stories only.

## 1. Why it exists
<Two or three sentences. The capability missing from someone's day, and what they do manually meanwhile. Must not be true for a sibling Feature.>

## 2. Problem and context
<The situation this Feature responds to.>

## 3. Objective
<What the capability achieves, in one or two sentences.>

## 4. Business value
<The result for the business, tied to a metric of the parent Epic.>

## 5. Expected behavior
<What the capability does, in plain sentences. Rules that always hold live here.>

## 6. Acceptance criteria
<4 to 8 criteria. Given / When / Then where there is a rule, decision, exception or state change. Placed in the Description if the tracker hides the native field on Features.>

## 7. Scope and limits
In: <what is included.>
Out: <what belongs elsewhere, and where.>

## 8. Business rules
- <Rules specific to this Feature.>

## 9. Data and sources
| Data | Source system | Source of truth? |
|---|---|---|
| <data item> | <system> | <yes or no> |

## 10. Dependencies
Predecessors: <items that must finish first, as relations.>
Successors: <items waiting on this one, as relations.>

## 11. Non-functional requirements
<Performance, security, retention, audit, availability. Logging and audit trails belong here, not in stories.>

## 12. Evaluation criteria
<Quality of the capability as a whole, with a number and a window. Name the method and the owner. If the Feature involves AI, cover quality, fallback, autonomy guardrail, auditability and evaluation method, and link the eval cases file (templates/eval-cases.md): golden set, scoring, threshold per risk tier, never-cases.>

## 13. Open items and decisions
| Question | Owner | Decide by |
|---|---|---|
| <open question> | <role> | <date> |

## 14. Traceability
Source: <link to the brief, spec, interview or decision. A link, not a loose reference.>

## 15. Estimate
Effort: <value in the effort field>
Basis: <how it was estimated.>
