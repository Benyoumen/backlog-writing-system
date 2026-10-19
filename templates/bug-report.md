# Bug report template

## Title

```
[BUG] <Product> - <Feature id> - <Story id> - BUG<nn> - <observed symptom>
```

The symptom says what looks wrong. It never names a fix or a cause.

## Description

<One line saying what happened, subject first.>

- **<Who> saw** <the fact> on [<record name>](<link to the record>), on <date>.
- **The source holds** <the fact>.

**Why it matters.** <What this value feeds.> <What the error shifts.> <How it reaches the person who receives it.>

## Repro steps

**What happened**

<Factual description with the link. Source reading with date. A neutral observation, if any.>

**Before fixing, find where the value came from**

1. **Data origin.** Which source did the run read to produce <the value>: <A>, <B> or another? Record what it read, not what it should have read.
2. **Field read.** <The source holds these values for the same record.> Find which one entered, or which combination.
3. **Value on the day.** <If the record changed after the event.> Check the value that held that day, not only today's.
4. **Reach.** Only this case, or other items of the same run too?

**Source reading on <date>** (<ids>): <raw fields separated by dots>.

**Not verified.** <What could not be checked.> <Why.>

**Done when**

- The origin of <the value> is identified and recorded on this item.
- <The symptom no longer appears.>
- <The same run shows the same value on every screen that consumes it.>

## System info

<Where it runs, since when, and which source of truth applies there.>

## Fields

| Field | Value |
|---|---|
| Parent | <the story where the symptom appears> |
| Related | <other affected stories, each with a comment saying why> |
| Severity | <damage: how bad is it in front of the user> |
| Priority | <queue position> |
| Iteration | <current sprint> |

## Pre-save checklist

- [ ] No sentence states a cause
- [ ] The first verification item asks which source the run read
- [ ] Every record named is a hyperlink
- [ ] A "Not verified" line exists if anything could not be checked
- [ ] Duplicate search done
