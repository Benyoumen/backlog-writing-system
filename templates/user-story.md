# User Story template (9 sections)

Title: `<CODE>-E<n>-F<nn>-US<nn> - <the main function, shortened to one sentence>`

Parent: always a Feature, never an Epic.
Story Points: set in the field, not in the text.
Dependencies: Predecessor / Successor relations, not in the text.
Definition of Done: inherited from the team standard, not repeated.

## 1. Why it exists
<Two to four sentences. The concrete behavior that fails, or the specific error that occurs, without this slice. Do not open with "Without this slice". End with the business consequence as an effect, not an adjective.>

## 2. Context
<Only what the developer needs from the parent and cannot guess. Do not repeat the Feature.>

## 3. Type
<Functional, Enabler or Fix.>

## 4. User Story
Functional: As a <role>, I need <goal>, so that <result>.
Enabler: Create <technical capability> to allow <Feature behavior>. No persona.

## 5. Expected behavior
<The behavior in plain sentences. Permanent rules that depend on no event live here.>

## 6. Out of scope
- <What belongs to a neighboring story, and which one.>

## 7. Technical notes
<Exact technical terms, decided constraints and interfaces. The only section where tool jargon is allowed.>

## 8. Traceability
Source: <link.>

## 9. Acceptance criteria
See the Acceptance Criteria field of this item. It holds 3 to 6 cases in this form:

```
Case: <behavior this case proves>
Given <initial state>
When <a single event>
Then <observable result>
```
