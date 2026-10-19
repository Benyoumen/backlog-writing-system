#!/usr/bin/env python3
"""Readable spec preview: data in, one HTML page out.

Reads acme_spec.json, validates it with the gates of the method, derives the schedule
from the dependencies and the start date, and writes site/spec-preview.html.
Standard library only. Nothing in the output is edited by hand.

    python tools/spec_preview/build.py            # writes site/spec-preview.html
    python tools/spec_preview/build.py --check    # validates and prints the schedule only
"""
import datetime as dt
import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
DATA = os.path.join(HERE, "acme_spec.json")
OUT = os.path.join(ROOT, "site", "spec-preview.html")

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def e(s):
    return html.escape(str(s), quote=True)


# ---------------------------------------------------------------- validation


def validate(d):
    errors = []
    stories = d["stories"]
    ids = [s["id"] for s in stories]
    index = {s["id"]: s for s in stories}
    phases = {p["n"] for p in d["phases"]}
    features = {f["code"] for f in d["features"]}

    # Sequential numbering US01..USn, no holes, no duplicates.
    expected = ["US%02d" % (i + 1) for i in range(len(stories))]
    if ids != expected:
        errors.append("Story ids must be sequential from US01: got %s" % ", ".join(ids))

    for s in stories:
        if s["phase"] not in phases:
            errors.append("%s has no valid phase (%r)" % (s["id"], s["phase"]))
        if s["feature"] not in features:
            errors.append("%s points to an unknown feature %r" % (s["id"], s["feature"]))
        for key in ("title", "plain", "size", "days", "sections"):
            if not s.get(key):
                errors.append("%s is missing %s" % (s["id"], key))
        for dep in s["deps"]:
            if dep not in index:
                errors.append("%s depends on %s, which does not exist" % (s["id"], dep))
            elif index[dep]["phase"] > s["phase"]:
                errors.append("%s (phase %d) depends on %s in a later phase (%d)" % (s["id"], s["phase"], dep, index[dep]["phase"]))

    # Cycles.
    state = {}

    def visit(code, trail):
        if state.get(code) == 1:
            errors.append("Dependency cycle: %s" % " -> ".join(trail + [code]))
            return
        if state.get(code) == 2:
            return
        state[code] = 1
        for dep in index[code]["deps"]:
            if dep in index:
                visit(dep, trail + [code])
        state[code] = 2

    for s in stories:
        visit(s["id"], [])

    # Budget.
    total = sum(s["days"] for s in stories)
    if total != d["meta"]["budget_days"]:
        errors.append("Story days sum to %s, budget is %s" % (total, d["meta"]["budget_days"]))

    # Every feature has a story; every item has a plain sentence.
    for f in d["features"]:
        if not any(s["feature"] == f["code"] for s in stories):
            errors.append("Feature %s has no story" % f["code"])
        if not f.get("plain"):
            errors.append("Feature %s has no plain sentence" % f["code"])
    if not d["epic"].get("plain"):
        errors.append("The epic has no plain sentence")

    # Decisions referenced by phases exist.
    decisions = {x["id"] for x in d["open"]["decisions"]}
    for p in d["phases"]:
        for did in p["decisions"]:
            if did not in decisions:
                errors.append("Phase %d references unknown decision %s" % (p["n"], did))
    return errors


# ---------------------------------------------------------------- schedule


def schedule(d):
    """Derive start and end days per story: dependency order, longest path first,
    earliest free track. Days are working days from 1."""
    stories = d["stories"]
    index = {s["id"]: s for s in stories}
    tracks = int(d["meta"]["tracks"])

    successors = {s["id"]: [] for s in stories}
    for s in stories:
        for dep in s["deps"]:
            successors[dep].append(s["id"])

    memo = {}

    def downstream(code):
        if code in memo:
            return memo[code]
        best = 0
        for n in successors[code]:
            best = max(best, index[n]["days"] + downstream(n))
        memo[code] = best
        return best

    plan = {}
    track_free = [1] * tracks  # first free day per track
    remaining = [s["id"] for s in stories]
    while remaining:
        ready = [c for c in remaining if all(dep in plan for dep in index[c]["deps"])]
        ready.sort(key=lambda c: (-(index[c]["days"] + downstream(c)), c))
        placed = False
        for c in ready:
            earliest = 1
            for dep in index[c]["deps"]:
                earliest = max(earliest, plan[dep]["end"] + 1)
            # earliest free track at or after `earliest`
            best_track, best_start = None, None
            for t in range(tracks):
                start = max(track_free[t], earliest)
                if best_start is None or start < best_start:
                    best_track, best_start = t, start
            end = best_start + index[c]["days"] - 1
            plan[c] = {"track": "AB"[best_track] if tracks <= 2 else str(best_track + 1), "start": best_start, "end": end}
            track_free[best_track] = end + 1
            remaining.remove(c)
            placed = True
            break
        if not placed:
            raise SystemExit("schedule: nothing ready, check dependencies")

    # Critical path by days.
    cp_memo = {}

    def longest(code):
        if code in cp_memo:
            return cp_memo[code]
        best = (index[code]["days"], [code])
        for dep in index[code]["deps"]:
            days, path = longest(dep)
            if days + index[code]["days"] > best[0]:
                best = (days + index[code]["days"], path + [code])
        cp_memo[code] = best
        return best

    critical = max((longest(s["id"]) for s in stories), key=lambda x: x[0])
    return plan, critical


def workday_date(start_iso, day):
    y, m, dd = (int(x) for x in start_iso.split("-"))
    start = dt.date(y, m, dd)
    offset = (day - 1) + 2 * ((day - 1) // 5)
    return start + dt.timedelta(days=offset)


def fmt(date):
    return "%d %s" % (date.day, MONTHS[date.month - 1])


# ---------------------------------------------------------------- rendering


def sections_html(sections):
    out = ['<ol class="sections">']
    for i, (name, body) in enumerate(sections, 1):
        if isinstance(body, list):
            items = "".join("<li>%s</li>" % e(x) for x in body)
            out.append('<li><b>%s.</b><ul class="ac">%s</ul></li>' % (e(name), items))
        else:
            out.append("<li><b>%s.</b> %s</li>" % (e(name), e(body)))
    out.append("</ol>")
    return "".join(out)


def item_html(kind, code, title, plain, sections, facts=None):
    facts_html = ' <span class="facts-inline">%s</span>' % e(facts) if facts else ""
    return (
        '<div class="item %s"><p class="code">%s</p><h3>%s%s</h3>'
        '<p class="plain-line">%s</p>'
        '<details><summary>The numbered sections</summary>%s</details></div>'
        % (kind, e(code), e(title), facts_html, e(plain), sections_html(sections))
    )


def gantt_svg(d, plan, critical, phase_ranges):
    stories = d["stories"]
    total_days = max(p["end"] for p in plan.values())
    label_w, left, top, row_h, day_w = 190, 200, 40, 34, 56
    width = left + total_days * day_w + 30
    rows = d["features"]
    height = top + len(rows) * row_h + 90
    g = []
    g.append('<svg class="gantt" viewBox="0 0 %d %d" role="img" aria-labelledby="gantt-title gantt-desc">' % (width, height))
    g.append('<title id="gantt-title">Schedule: one track per Feature</title>')
    g.append('<desc id="gantt-desc">Story bars per Feature over %d working days, with phase bands and the phase exits on the deliveries line.</desc>' % total_days)
    g.append('<rect x="0" y="0" width="%d" height="%d" fill="var(--paper-2)"/>' % (width, height))
    # Phase bands.
    for n, (ps, pe) in sorted(phase_ranges.items()):
        x = left + (ps - 1) * day_w
        w = (pe - ps + 1) * day_w
        fill = "rgba(27,38,33,0.05)" if n % 2 else "rgba(180,55,47,0.06)"
        g.append('<rect x="%d" y="%d" width="%d" height="%d" fill="%s"/>' % (x, top - 26, w, len(rows) * row_h + 26, fill))
        g.append('<text x="%d" y="%d" font-size="13" font-weight="600" fill="var(--ink-2)">Phase %d</text>' % (x + 6, top - 10, n))
    # Day grid and dates.
    for day in range(1, total_days + 1):
        x = left + (day - 1) * day_w
        g.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="var(--line)"/>' % (x, top, x, top + len(rows) * row_h))
        label = fmt(workday_date(d["meta"]["start"], day)) if (day - 1) % 5 == 0 or day == total_days else str(day)
        g.append('<text x="%d" y="%d" font-size="12" fill="var(--ink-2)" text-anchor="middle">%s</text>' % (x + day_w / 2, top + len(rows) * row_h + 18, e(label)))
    # Rows.
    for i, f in enumerate(rows):
        y = top + i * row_h
        g.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="var(--rule)"/>' % (0, y + row_h, width, y + row_h))
        g.append('<text x="12" y="%d" font-size="14" font-weight="600" fill="var(--ink)">%s %s</text>' % (y + 21, e(f["code"]), e(f["title"])[: max(1, label_w // 8)]))
        for s in stories:
            if s["feature"] != f["code"]:
                continue
            p = plan[s["id"]]
            x = left + (p["start"] - 1) * day_w + 2
            w = (p["end"] - p["start"] + 1) * day_w - 4
            on_cp = s["id"] in critical[1]
            fill = "var(--red)" if on_cp else "var(--ink)"
            g.append('<rect x="%d" y="%d" width="%d" height="%d" rx="2" fill="%s"><title>%s %s, days %d to %d</title></rect>' % (x, y + 7, w, row_h - 14, fill, e(s["id"]), e(s["title"]), p["start"], p["end"]))
            g.append('<text x="%d" y="%d" font-size="13" fill="var(--paper)">%s</text>' % (x + 6, y + 21, e(s["id"])))
    # Deliveries line.
    yd = top + len(rows) * row_h + 44
    g.append('<text x="12" y="%d" font-size="14" font-weight="600" fill="var(--ink)">Deliveries</text>' % (yd + 5))
    g.append('<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="var(--ink)"/>' % (left, yd, left + total_days * day_w, yd))
    for n, (ps, pe) in sorted(phase_ranges.items()):
        x = left + pe * day_w
        g.append('<circle cx="%d" cy="%d" r="6" fill="var(--red)"/>' % (x, yd))
        g.append('<text x="%d" y="%d" font-size="12" fill="var(--ink)" text-anchor="end">Phase %d exit, day %d</text>' % (x - 10, yd + 22, n, pe))
    g.append("</svg>")
    return "".join(g)


def render(d, plan, critical, gates):
    m = d["meta"]
    stories = d["stories"]
    index = {s["id"]: s for s in stories}
    total_days = max(p["end"] for p in plan.values())
    phase_ranges = {}
    for p in d["phases"]:
        own = [plan[s["id"]] for s in stories if s["phase"] == p["n"]]
        phase_ranges[p["n"]] = (min(x["start"] for x in own), max(x["end"] for x in own))
    weeks = (total_days + 4) // 5
    cadence = {c["week"]: c["demonstrable"] for c in d["cadence"]}

    h = []
    h.append("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">")
    h.append("<title>Spec preview, Backlog Writing System</title>")
    h.append('<meta name="description" content="A functional and technical spec rendered as one readable page: a plain sentence per item, numbered sections, phases, a derived schedule, a glossary and the open decisions. Fictional product.">')
    h.append('<link rel="canonical" href="https://benyoumen.github.io/backlog-writing-system/spec-preview.html">')
    h.append('<meta property="og:type" content="website"><meta property="og:title" content="Spec preview, Backlog Writing System"><meta property="og:description" content="One page a developer, a QA and a sponsor can all read: sentence, sections, glossary, schedule."><meta property="og:url" content="https://benyoumen.github.io/backlog-writing-system/spec-preview.html"><meta property="og:image" content="https://benyoumen.github.io/backlog-writing-system/workflow-map.svg"><meta name="twitter:card" content="summary_large_image">')
    h.append("<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F4F7F1'/%3E%3Crect x='7' y='4' width='3' height='24' fill='%23B4372F'/%3E%3Crect x='14' y='9' width='12' height='2.5' fill='%231B2621'/%3E%3Crect x='14' y='15' width='12' height='2.5' fill='%231B2621'/%3E%3Crect x='14' y='21' width='8' height='2.5' fill='%231B2621'/%3E%3C/svg%3E\">")
    h.append('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
    h.append('<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet">')
    h.append('<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="tools.css">')
    h.append("</head>\n<body>")
    h.append('<a class="skip" href="#summary">Skip to the summary</a>')

    h.append('<header class="hero tool"><div class="hero-inner"><div class="hero-text">')
    h.append('<p class="crumb"><a href="./">Backlog Writing System</a> / Spec preview</p>')
    h.append('<h1 class="thesis">One spec, three readers.</h1>')
    h.append('<p class="lede">The functional and technical spec of a fictional product, rendered as one page. A developer reads the numbered sections and starts. A QA reads the acceptance cases and tests. A sponsor reads the plain sentence under each item and the schedule, and knows what lands when, without a meeting.</p>')
    h.append('<p class="actions"><a class="button primary" href="#phases">Read the delivery phases</a><a class="button" href="https://github.com/Benyoumen/backlog-writing-system/tree/main/skills/spec-preview-html">The skill on GitHub</a></p>')
    h.append('<p class="honest">Generated from tools/spec_preview/acme_spec.json. Do not edit by hand.</p>')
    h.append("</div></div></header>")

    h.append('<main class="ledger spec">')
    h.append('<p class="banner">%s Version %s, approved %s. Sources: %s.</p>' % (e(m["fictional"]), e(m["version"]), e(m["approved"]), e(", ".join(m["sources"]))))

    # 1. Summary
    h.append('<section class="block" id="summary" aria-labelledby="h-summary"><div class="margin"><h2 id="h-summary">1. Summary</h2><p>Six numbers, thirty seconds, and the decisions that are still open.</p></div><div class="body">')
    h.append('<ul class="metrics">')
    for k, v in [("Epic", 1), ("Features", len(d["features"])), ("Stories", len(stories)), ("Effort days, declared", sum(s["days"] for s in stories)), ("Critical path, days", critical[0]), ("Phases", len(d["phases"]))]:
        h.append('<li><span class="v">%s</span><span class="k">%s</span></li>' % (e(v), e(k)))
    h.append("</ul>")
    h.append('<p class="thirty">%s</p>' % e(m["in_thirty_seconds"]))
    h.append('<p><strong>Appetite.</strong> %s</p>' % e(m["appetite"]))
    h.append('<p><strong>Pending decisions by phase.</strong> %s</p>' % e("; ".join("Phase %d: %s" % (p["n"], ", ".join(p["decisions"])) for p in d["phases"])))
    h.append('<p class="note">%s</p>' % e(m["method_note"]))
    h.append("</div></section>")

    # 2. Phases
    h.append('<section class="block" id="phases" aria-labelledby="h-phases"><div class="margin"><h2 id="h-phases">2. Delivery phases</h2><p>Each phase ends with something a person uses, a check, and a production release.</p></div><div class="body">')
    for p in d["phases"]:
        ps, pe = phase_ranges[p["n"]]
        h.append('<div class="phase"><h3>Phase %d: %s</h3><p class="days">Days %d to %d, %s to %s</p><dl>' % (p["n"], e(p["name"]), ps, pe, fmt(workday_date(m["start"], ps)), fmt(workday_date(m["start"], pe))))
        h.append("<dt>What goes live</dt><dd>%s</dd>" % e(p["goes_live"]))
        h.append("<dt>Why this order</dt><dd>%s</dd>" % e(p["why"]))
        cards = "".join('<span class="card">%s %s</span>' % (e(s["id"]), e(s["title"])) for s in stories if s["phase"] == p["n"])
        h.append('<dt>Stories</dt><dd><div class="cards">%s</div></dd>' % cards)
        h.append("<dt>Exit gate</dt><dd>%s</dd>" % e(p["exit_gate"]))
        decs = "; ".join("%s: %s" % (x["id"], x["decision"]) for x in d["open"]["decisions"] if x["id"] in p["decisions"])
        h.append("<dt>Decisions it needs</dt><dd>%s</dd>" % e(decs))
        h.append("</dl></div>")
    h.append("<h3>Weekly cadence</h3>")
    h.append('<table class="plain"><thead><tr><th scope="col">Week</th><th scope="col">Demonstrable</th><th scope="col">Stories done</th></tr></thead><tbody>')
    for w in range(1, weeks + 1):
        lo, hi = 5 * (w - 1) + 1, 5 * w
        done = [s["id"] for s in stories if lo <= plan[s["id"]]["end"] <= hi]
        h.append("<tr><td>%d (days %d to %d)</td><td>%s</td><td>%s</td></tr>" % (w, lo, min(hi, total_days), e(cadence.get(w, "Nothing demonstrable: the slicing is wrong.")), e(", ".join(done) or "none")))
    h.append("</tbody></table>")
    h.append("</div></section>")

    # 3. Schedule
    h.append('<section class="block" id="schedule" aria-labelledby="h-schedule"><div class="margin"><h2 id="h-schedule">3. Schedule</h2><p>One track per Feature. Red bars are the critical path. Dates derived from the start date, working days only.</p></div><div class="body">')
    h.append(gantt_svg(d, plan, critical, phase_ranges))
    h.append('<table class="plain"><thead><tr><th scope="col">Story</th><th scope="col">Size</th><th scope="col">Days</th><th scope="col">Depends on</th><th scope="col">Track</th><th scope="col">Start</th><th scope="col">End</th></tr></thead><tbody>')
    for s in sorted(stories, key=lambda s: (plan[s["id"]]["start"], s["id"])):
        p = plan[s["id"]]
        h.append("<tr><td>%s %s</td><td>%s</td><td>%d</td><td>%s</td><td>%s</td><td>day %d, %s</td><td>day %d, %s</td></tr>" % (
            e(s["id"]), e(s["title"]), e(s["size"]), s["days"], e(", ".join(s["deps"]) or "none"), e(p["track"]),
            p["start"], fmt(workday_date(m["start"], p["start"])), p["end"], fmt(workday_date(m["start"], p["end"]))))
    h.append("</tbody></table>")
    h.append("<p><strong>Critical path.</strong> %s: %s days. Total effort %d days over %d tracks.</p>" % (e(", ".join(critical[1])), critical[0], sum(s["days"] for s in stories), m["tracks"]))
    h.append('<p class="note">Assumptions: %d parallel tracks (a schedule assumption, not a staffing promise), five working days per week, checkpoints inside the stories\' last day, no holidays counted. Start date %s.</p>' % (m["tracks"], e(fmt(workday_date(m["start"], 1)) + " " + m["start"][:4])))
    h.append("</div></section>")

    # 4. Items by epic
    h.append('<section class="block" id="items" aria-labelledby="h-items"><div class="margin"><h2 id="h-items">4. Items by epic</h2><p>The plain sentence is always visible. The numbered sections open on demand.</p></div><div class="body">')
    ep = d["epic"]
    h.append(item_html("epic", ep["code"], ep["title"], ep["plain"], ep["sections"]))
    for f in d["features"]:
        h.append(item_html("feature", f["code"], f["title"], f["plain"], f["sections"]))
        for s in stories:
            if s["feature"] != f["code"]:
                continue
            p = plan[s["id"]]
            facts = "Phase %d, size %s, %d days, days %d to %d%s" % (s["phase"], s["size"], s["days"], p["start"], p["end"], (", after " + ", ".join(s["deps"])) if s["deps"] else "")
            h.append(item_html("story", s["id"], s["title"], s["plain"], s["sections"], facts))
    h.append("</div></section>")

    # 5. Exists
    h.append('<section class="block" id="exists" aria-labelledby="h-exists"><div class="margin"><h2 id="h-exists">5. What already exists</h2><p>Material ready before the start, and what each one saves.</p></div><div class="body">')
    h.append('<table class="plain"><thead><tr><th scope="col">Material</th><th scope="col">What it saves</th></tr></thead><tbody>%s</tbody></table>' % "".join("<tr><td>%s</td><td>%s</td></tr>" % (e(x["material"]), e(x["saves"])) for x in d["exists"]))
    h.append("</div></section>")

    # 6. Touchpoints
    h.append('<section class="block" id="touchpoints" aria-labelledby="h-touch"><div class="margin"><h2 id="h-touch">6. Where it appears</h2><p>Who sees it, in which channel, and what depends on another team.</p></div><div class="body">')
    h.append('<table class="plain"><thead><tr><th scope="col">Touchpoint</th><th scope="col">Who sees it</th><th scope="col">Channel</th><th scope="col">Built by this backlog</th><th scope="col">Depends on another team</th></tr></thead><tbody>%s</tbody></table>' % "".join("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" % tuple(e(x[k]) for k in ("touchpoint", "who", "channel", "built_here", "depends")) for x in d["touchpoints"]))
    h.append("</div></section>")

    # 7. Glossary
    h.append('<section class="block" id="glossary" aria-labelledby="h-gloss"><div class="margin"><h2 id="h-gloss">7. Glossary</h2><p>No term appears in this document without being here.</p></div><div class="body">')
    h.append('<table class="plain"><thead><tr><th scope="col">Term</th><th scope="col">Definition</th><th scope="col">Appears in</th></tr></thead><tbody>%s</tbody></table>' % "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (e(x["term"]), e(x["definition"]), e(x["appears"])) for x in d["glossary"]))
    h.append("</div></section>")

    # 8. Open
    h.append('<section class="block" id="open" aria-labelledby="h-open"><div class="margin"><h2 id="h-open">8. Open items</h2><p>What the backlog does not decide: the decisions, the findings from checking the artifacts, and what is already settled.</p></div><div class="body">')
    h.append("<h3>Cross-cutting decisions</h3>")
    h.append('<table class="plain"><thead><tr><th scope="col">Id</th><th scope="col">Decision</th><th scope="col">Who answers</th><th scope="col">Needed by</th></tr></thead><tbody>%s</tbody></table>' % "".join("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" % (e(x["id"]), e(x["decision"]), e(x["who"]), e(x["needed_by"])) for x in d["open"]["decisions"]))
    h.append("<h3>Findings from the artifact check</h3>")
    h.append('<table class="plain"><thead><tr><th scope="col">Id</th><th scope="col">Finding</th><th scope="col">Where it appeared</th><th scope="col">Effect on the plan</th></tr></thead><tbody>%s</tbody></table>' % "".join("<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>" % (e(x["id"]), e(x["finding"]), e(x["where"]), e(x["effect"])) for x in d["open"]["findings"]))
    h.append("<h3>Already decided</h3><ul>%s</ul>" % "".join("<li>%s</li>" % e(x) for x in d["open"]["decided"]))
    h.append("</div></section>")

    # 9. Tracker
    h.append('<section class="block" id="tracker" aria-labelledby="h-tracker"><div class="margin"><h2 id="h-tracker">9. In the tracker</h2><p>The order of creation, so links and iterations exist when the stories do.</p></div><div class="body">')
    h.append("<p>%s</p>" % e(d["tracker_order"]))
    h.append("<h3>Gates run before generating this page</h3><ul>%s</ul>" % "".join("<li>%s</li>" % e(g) for g in gates))
    h.append('<p class="note">Method: <a href="https://github.com/Benyoumen/backlog-writing-system/blob/main/docs/prioritization.md">prioritization and readable specs</a>. Skill: <a href="https://github.com/Benyoumen/backlog-writing-system/tree/main/skills/spec-preview-html"><code>spec-preview-html</code></a>. Back to the <a href="./">field guide</a>.</p>')
    h.append("</div></section>")

    h.append("</main>")
    h.append('<footer class="foot"><p>Benjamin Tayar, 2026. MIT.</p><p><a href="https://github.com/Benyoumen">github.com/Benyoumen</a></p></footer>')
    h.append("</body>\n</html>\n")
    return "\n".join(h)


def main(argv):
    with open(DATA, encoding="utf-8") as fh:
        d = json.load(fh)
    errors = validate(d)
    if errors:
        for err in errors:
            print("GATE FAILED:", err)
        return 1
    plan, critical = schedule(d)
    gates = [
        "Story days per epic match the budget (%d)" % d["meta"]["budget_days"],
        "Story ids sequential from US01 to US%02d" % len(d["stories"]),
        "Every story has a phase, a plain sentence and its sections",
        "No dependency points to a later phase, an unknown id, or a cycle",
        "Every phase has a story and an exit gate",
        "Dates derived from the start date %s, never typed" % d["meta"]["start"],
    ]
    for s in d["stories"]:
        p = plan[s["id"]]
        print("%s track %s days %2d-%2d  %s" % (s["id"], p["track"], p["start"], p["end"], fmt(workday_date(d["meta"]["start"], p["start"]))))
    print("critical path:", " -> ".join(critical[1]), "=", critical[0], "days")
    if "--check" in argv:
        return 0
    out = render(d, plan, critical, gates)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(out)
    print("wrote", os.path.relpath(OUT, ROOT), len(out), "bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
