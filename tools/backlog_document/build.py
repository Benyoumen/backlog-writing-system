#!/usr/bin/env python3
"""Build the backlog document from acme_realty_backlog.json.

The HTML is generated. Change the JSON, run this script, never edit the output.
Standard library only.

    python tools/backlog_document/build.py            # writes site/backlog-document.html
    python tools/backlog_document/build.py --check    # validates the data and stops
"""
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
DATA = os.path.join(HERE, "acme_realty_backlog.json")
OUT = os.path.join(ROOT, "site", "backlog-document.html")

FIB = {0, 1, 2, 3, 5, 8, 13}
KPI_GROUP = {"res": "g-res", "exe": "g-exe", "mar": "g-mar", "sen": "g-sen"}
KPI_GROUP_NAME = {"res": "Result", "exe": "Execution", "mar": "Market", "sen": "Sensor"}
EPIC_SECTIONS = [
    ("why", "Why it exists"), ("problem", "Problem"), ("objective", "Objective"),
    ("metrics", "Success metrics"), ("scope", "First-release scope"), ("rules", "Business rules"),
    ("dependencies", "Dependencies"), ("risks", "Risks and mitigation"),
    ("governance", "Governance and operation"), ("technical", "Technical details"), ("estimate", "Estimate"),
]
FEATURE_SECTIONS = [
    ("why", "Why it exists"), ("problem", "Problem and context"), ("objective", "Objective"),
    ("value", "Business value"), ("behavior", "Expected behavior"), ("acceptance", "Acceptance criteria"),
    ("scope", "Scope and limits"), ("rules", "Business rules"), ("data", "Data and sources"),
    ("dependencies", "Dependencies"), ("nfr", "Non-functional requirements"),
    ("evaluation", "Evaluation criteria"), ("open", "Open items and decisions"),
    ("trace", "Traceability"), ("estimate", "Estimate"),
]
STORY_SECTIONS = [
    ("why", "Why it exists"), ("context", "Context"), ("type", "Type"), ("story", "User Story"),
    ("expected", "Expected behavior"), ("out", "Out of scope"), ("tech", "Technical notes"),
    ("trace", "Traceability"), ("cases", "Acceptance criteria"),
]


def e(s):
    return html.escape(str(s if s is not None else ""), quote=True)


def slug(code):
    return code.lower()


# ---------------------------------------------------------------- validation
def validate(d):
    errors = []
    waves = {w["id"]: w for w in d["waves"]}
    order = {w["id"]: w["order"] for w in d["waves"]}
    feats, stories = {}, {}
    queue = []
    for ep in d["epics"]:
        for f in ep["features"]:
            if not f["code"].startswith(ep["code"] + "-"):
                errors.append(f"{f['code']} does not start with its Epic code {ep['code']}")
            if f["wave"] not in waves:
                errors.append(f"{f['code']} has unknown wave {f['wave']}")
            feats[f["code"]] = f
            f["_epic"] = ep["code"]
            queue.append(f["queue"])
            n = 0
            for s in f["stories"]:
                n += 1
                if not s["code"].startswith(f["code"] + "-"):
                    errors.append(f"{s['code']} does not start with its Feature code {f['code']}")
                if not s["code"].endswith("US%02d" % n):
                    errors.append(f"{s['code']} breaks the sequence (expected US{n:02d})")
                stories[s["code"]] = s
                s["_feat"] = f["code"]
                p = s["tracker"].get("points")
                if p is not None and p not in FIB:
                    errors.append(f"{s['code']} has points {p}, not a Fibonacci value")
    expected = list(range(1, len(feats) + 1))
    if sorted(queue) != expected:
        errors.append(f"queue has holes or ties: {sorted(queue)}")
    for code, f in feats.items():
        for dep in f["depends_on"]:
            if dep not in feats:
                errors.append(f"{code} depends on unknown Feature {dep}")
            elif order[feats[dep]["wave"]] > order[f["wave"]]:
                errors.append(f"{code} (wave {f['wave']}) depends on {dep} in a later wave {feats[dep]['wave']}")
    for code, s in stories.items():
        for dep in s["depends_on"]:
            if dep not in stories:
                errors.append(f"{code} depends on unknown story {dep}")
            else:
                fw = feats[s["_feat"]]["wave"]
                dw = feats[stories[dep]["_feat"]]["wave"]
                if order[dw] > order[fw]:
                    errors.append(f"{code} (wave {fw}) depends on {dep} in a later wave {dw}")

    def cycles(graph, label):
        state = {}

        def visit(n, path):
            state[n] = 1
            for m in graph.get(n, []):
                if m not in graph:
                    continue
                if state.get(m) == 1:
                    errors.append(f"{label} cycle: {' > '.join(path + [m])}")
                    return
                if not state.get(m):
                    visit(m, path + [m])
            state[n] = 2

        for n in graph:
            if not state.get(n):
                visit(n, [n])

    cycles({c: f["depends_on"] for c, f in feats.items()}, "Feature")
    cycles({c: s["depends_on"] for c, s in stories.items()}, "Story")
    return errors, feats, stories


# ---------------------------------------------------------------- rendering helpers
def tag_wave(w):
    cls = "wave-pt" if w["parallel"] else "wave-%d" % w["order"]
    label = "Parallel track" if w["parallel"] else "Wave %d · %s" % (w["order"], w["name"])
    return '<span class="tag %s">%s</span>' % (cls, e(label))


def kpi_badge(k):
    if not k:
        return ""
    lvl = int(k.get("level", 1))
    bars = "".join('<i class="%s"></i>' % ("makes" if (k.get("gera") and i == 3) else ("on" if i <= lvl else "")) for i in (1, 2, 3))
    verb = "Produces the data for" if k.get("gera") else ("Moves" if lvl == 3 else "Supports")
    tip = ('<span class="ktip" role="tooltip"><b>%s · %s</b><span class="kg">%s · read weekly</span>'
           '<span class="kc">%s</span><span class="kp">%s this number.</span><span class="kb"><b>Today:</b> %s</span>'
           '<span class="kb"><b>Target:</b> %s</span><span class="kn"><b>Why it matters:</b> %s</span>'
           '<span class="kf"><b>Source:</b> %s</span></span>'
           % (e(k["code"]), e(k["name"]), e(KPI_GROUP_NAME.get(k["group"], "")), e(k["definition"]), e(verb),
              e(k["today"]), e(k["target"]), e(k["impact"]), e(k["source"])))
    return ('<span class="kpic %s min" tabindex="0" aria-label="%s, %s. %s this number.">'
            '<span class="kmt">%s</span><code>%s</code>%s</span>'
            % (KPI_GROUP.get(k["group"], ""), e(k["code"]), e(k["name"]), e(verb), bars, e(k["code"]), tip))


def dep_chips(codes, kind):
    if not codes:
        return '<span class="na">none</span>'
    return " ".join('<a class="dep" href="#%s">%s</a>' % (slug(c), e(c)) for c in codes)


def sec(n, title, body, extra_cls=""):
    return '<div class="sec %s"><b><i>%d</i>%s</b>%s</div>' % (extra_cls, n, e(title), body)


def para_or_list(v):
    if isinstance(v, list):
        return "<ul>" + "".join("<li>%s</li>" % e(x) for x in v) + "</ul>"
    return "<p>%s</p>" % e(v)


def cases_html(cases):
    out = ['<ul class="cases">']
    for c in cases:
        out.append('<li><b class="case"><i>Case</i> %s</b>'
                   '<span class="scene"><b>Given</b> %s</span>'
                   '<span class="scene"><b>When</b> %s</span>'
                   '<span class="scene"><b>Then</b> %s</span></li>'
                   % (e(c["case"]), e(c["given"]), e(c["when"]), e(c["then"])))
    out.append("</ul>")
    return "".join(out)


def feature_card(f, w, people):
    mvp = ' <span class="tag t-mvp">MVP</span>' if f["mvp"] else ""
    return ('<div class="card" data-cod="%s" id="card-%s"><span class="queue-no">queue %d</span>'
            '<a href="#%s">%s</a> %s%s<em>%s</em>%s'
            '<button type="button" class="pl-fx" data-cod="%s" aria-label="plan %s"></button></div>'
            % (e(f["code"]), slug(f["code"]), f["queue"], slug(f["code"]), e(f["code"]), tag_wave(w), mvp,
               e(f["summary"]), kpi_badge(f.get("kpi")), e(f["code"]), e(f["code"])))


def story_card(s, people):
    sx = s["sections"]
    t = s["tracker"]
    state = ""
    if t.get("state") == "Done":
        state = ' <span class="tag t-done">done · %s</span>' % e(t.get("sprint") or "")
    elif t.get("sprint"):
        state = ' <span class="tag t-sp">%s</span>' % e(t["sprint"])
    deps = dep_chips(s["depends_on"], "story")
    secs = [
        sec(1, "Why it exists", para_or_list(sx["why"]), "why wide"),
        sec(2, "Context", para_or_list(sx["context"])),
        sec(3, "Type", para_or_list(sx["type"] + (". No persona: an Enabler builds what the other stories need." if sx["type"] == "Enabler" else ""))),
        sec(4, "User Story", para_or_list(sx["story"])),
        sec(5, "Expected behavior", para_or_list(sx["expected"])),
        sec(6, "Out of scope", para_or_list(sx["out"])),
        sec(7, "Technical notes", para_or_list(sx["tech"])),
        sec(8, "Traceability", para_or_list(sx["trace"]) + '<span class="sub">Depends on</span><div class="deps">%s</div>' % deps),
        sec(9, "Acceptance criteria", cases_html(sx["cases"]), "accept wide"),
    ]
    return ('<details class="story" id="%s"><summary><p class="story-h"><strong>%s</strong> · %s%s</p>'
            '<p class="story-role">%s</p></summary><p class="story-line">%s</p><div class="secs">%s</div></details>'
            % (slug(s["code"]), e(s["code"]), e(s["name"]), state, e(s["summary"]), e(sx["story"]), "".join(secs)))


def epic_block(ep):
    sx = ep["sections"]
    secs = []
    for n, (k, title) in enumerate(EPIC_SECTIONS, 1):
        cls = "why wide" if k == "why" else ("wide" if k in ("metrics", "risks") else "")
        secs.append(sec(n, title, para_or_list(sx[k]), cls))
    return ('<details class="item" id="%s" open><summary><p class="item-h"><span class="queue-no">Epic</span><strong>%s</strong> · %s</p>'
            '<p class="item-role">%s</p><span class="meta">%d Features · %d User Stories</span></summary><div class="secs">%s</div></details>'
            % (slug(ep["code"]), e(ep["code"]), e(ep["name"]), e(ep["summary"]), len(ep["features"]),
               sum(len(f["stories"]) for f in ep["features"]), "".join(secs)))


def feature_block(f, w):
    sx = f["sections"]
    secs = []
    for n, (k, title) in enumerate(FEATURE_SECTIONS, 1):
        if k == "dependencies":
            body = "<p>%s</p>" % e(sx[k]) + '<div class="deps">%s</div>' % dep_chips(f["depends_on"], "feature")
        else:
            body = para_or_list(sx[k])
        cls = "why wide" if k == "why" else ("wide" if k in ("behavior", "acceptance") else "")
        secs.append(sec(n, title, body, cls))
    mvp = ' <span class="tag t-mvp">MVP</span>' if f["mvp"] else ""
    pts = sum((s["tracker"].get("points") or 0) for s in f["stories"])
    est = sum(1 for s in f["stories"] if s["tracker"].get("points"))
    return ('<details class="item" id="%s"><summary><p class="item-h"><span class="queue-no">queue %d</span><strong>%s</strong> · %s %s%s</p>'
            '<p class="item-role">%s</p><span class="meta">%d User Stories · %d of them estimated · %d points known</span></summary>'
            '<div class="secs">%s</div></details>'
            % (slug(f["code"]), f["queue"], e(f["code"]), e(f["name"]), tag_wave(w), mvp, e(f["summary"]),
               len(f["stories"]), est, pts, "".join(secs)))


def planning_data(d, feats):
    people = d["team"]
    sprints = []
    for sp in d["sprints"]:
        cap = None
        if sp["state"] in ("current", "next"):
            cap = {p["id"]: p["weekly"] * d["meta"]["sprint_weeks"] for p in people}
        sprints.append({"id": sp["id"], "name": sp["name"], "state": sp["state"], "range": sp["range"], "capacity": cap})
    out_feats = []
    for ep in d["epics"]:
        for f in ep["features"]:
            us = []
            for s in f["stories"]:
                t = s["tracker"]
                us.append({"cod": s["code"], "name": s["name"], "id": t.get("id"),
                           "done": ("%s in %s" % (t["state"], t["sprint"])) if t.get("state") == "Done" else None,
                           "sprint": t.get("sprint"), "owner": t.get("owner"), "points": t.get("points")})
            out_feats.append({"cod": f["code"], "name": f["name"], "summary": f["summary"], "wave": f["wave"],
                              "mvp": f["mvp"], "queue": f["queue"], "sprint": None, "us": us})
    for it in d["improvements"]:
        out_feats.append({"cod": it["code"], "name": it["name"], "summary": it["summary"], "wave": it["wave"],
                          "mvp": False, "queue": None, "sprint": it.get("sprint"), "single": True,
                          "us": [{"cod": it["code"], "name": it["name"], "id": None,
                                  "done": ("Done in %s" % it["sprint"]) if it.get("state") == "Done" else None,
                                  "sprint": it.get("sprint"), "owner": None, "points": it.get("points")}]})
    next_sprint = next((sp["id"] for sp in d["sprints"] if sp["state"] == "next"), d["sprints"][-1]["id"])
    return {"program": d["meta"]["program"], "key": d["meta"]["storage_key"], "fib": d["meta"]["fib"],
            "limit": d["meta"]["default_limit"], "warning": d["meta"]["warning_level"],
            "sprint_weeks": d["meta"]["sprint_weeks"], "sprint_default": next_sprint, "sprints": sprints,
            "people": [{"id": p["id"], "name": p["name"], "short": p["short"], "initials": p["initials"], "weekly": p["weekly"]} for p in people],
            "features": out_feats, "export_note": d["meta"]["export_note"]}


# ---------------------------------------------------------------- page
def build(d, feats, stories):
    m = d["meta"]
    waves = {w["id"]: w for w in d["waves"]}
    people = {p["id"]: p for p in d["team"]}
    n_feats = len(feats)
    n_stories = len(stories)
    n_mvp = sum(1 for f in feats.values() if f["mvp"])
    pts_known = sum((s["tracker"].get("points") or 0) for s in stories.values())
    n_est = sum(1 for s in stories.values() if s["tracker"].get("points"))
    feats_by_queue = sorted(feats.values(), key=lambda f: f["queue"])

    nav = [("#why", "Why a document"), ("#summary", "Summary"), ("#tree", "Tree")]
    nav += [("#sprint-%s" % sp["id"], sp["name"]) for sp in d["sprints"]]
    nav += [("#waves", "Waves"), ("#planning", "Planning"), ("#queue", "Queue"), ("#epics", "Epics and Features"),
            ("#stories", "User Stories"), ("#improvements", "Improvements and bugs"), ("#wishlist", "Wishlist"),
            ("#sources", "Sources"), ("#tracker", "Into the tracker")]

    h = []
    h.append('<!doctype html><html lang="en"><head><meta charset="utf-8">'
             '<meta name="viewport" content="width=device-width,initial-scale=1">'
             '<title>Backlog document: %s</title>'
             '<meta name="description" content="A generated backlog document, reviewed wave by wave, with the sprint planning inside it: owners, Fibonacci points, live capacity per person and per team. Fictional example.">'
             '<link rel="canonical" href="https://benyoumen.github.io/backlog-writing-system/backlog-document.html">'
             '<meta property="og:type" content="website"><meta property="og:title" content="Backlog document: review before the tracker">'
             '<meta property="og:description" content="Epics, Features and User Stories in plain language, waves of delivery, and the planning layer with live capacity alerts. Fictional example.">'
             '<meta property="og:url" content="https://benyoumen.github.io/backlog-writing-system/backlog-document.html">'
             '<meta property="og:image" content="https://benyoumen.github.io/backlog-writing-system/workflow-map.svg">'
             '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
             '<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">'
             '<link rel="stylesheet" href="backlog-document.css"></head><body>' % e(m["program"]))
    h.append('<a class="skip" href="#why">Skip to the content</a>')
    # hero
    h.append('<div class="wrap"><div class="hero"><div class="eye">%s</div><h1>%s</h1>'
             '<p class="sub">%s</p><p class="sub"><strong>How to read:</strong> %s</p>'
             '<p class="sub back"><a href="index.html">Back to the field guide</a> · <a href="https://github.com/Benyoumen/backlog-writing-system/tree/main/tools/backlog_document">Generator and data on GitHub</a> · version %s, %s</p>'
             '<div class="nav">%s</div></div>'
             % (e(m["eyebrow"]), e(m["title"]), e(m["lede"]), e(m["how_to_read"]), e(m["version"]), e(m["date"]),
                "".join('<a href="%s">%s</a>' % (a, e(t)) for a, t in nav)))
    h.append("<main>")
    # why
    h.append('<h1 id="why">Why a document and not only the board</h1>'
             '<p class="tldr">A tracker board is compact: one card at a time, in a column, without the why, the wave or the team\'s capacity in view. '
             'This document reads top to bottom, with the plain sentence, the chain of dependencies and the points in one place. '
             'The planning happens here, in the review meeting, with the whole backlog open: the product manager opens a Feature, assigns each User Story to a developer and sets its Fibonacci points. '
             'The bar at the bottom recalculates the load per person and for the team on every click, and turns amber at 80 percent and red the moment someone is above their capacity. '
             'The tracker stays the system of record; it is loaded only after the review, from the plan this document exports.</p>'
             '<div class="legend"><b>How the planning works.</b> Open any Feature card in <a href="#waves">Waves of delivery</a> or in a <a href="#sprint-S5">Sprint</a> chapter, mark the stories that enter the target sprint, pick the owner, set the points. Watch the bar. Then close the meeting in <a href="#planning">Planning</a>, where the plan is listed as it would be written to the tracker, and export it.</div>')
    # summary
    h.append('<h1 id="summary">Summary</h1><div class="metric">'
             '<div class="m"><b>%d</b><span>Epics</span></div><div class="m"><b>%d</b><span>Features</span></div>'
             '<div class="m"><b>%d</b><span>User Stories</span></div><div class="m"><b>%d</b><span>Features in the MVP</span></div>'
             '<div class="m"><b>4+1</b><span>Waves + parallel track</span></div><div class="m"><b>%d</b><span>Points known, %d of %d stories estimated</span></div>'
             '<div class="m"><b>%d</b><span>Developers, %d points a sprint</span></div></div>'
             % (len(d["epics"]), n_feats, n_stories, n_mvp, pts_known, n_est, n_stories, len(d["team"]),
                sum(p["weekly"] for p in d["team"]) * m["sprint_weeks"]))
    h.append('<p class="tldr"><b>In 30 seconds.</b> An AI assistant for the brokers of a fictional brokerage. Wave 1 answers portal leads and makes every CRM write approved and reversible; wave 2 prepares visits and records their outcome; wave 3 keeps proposals from going silent; wave 4 makes the forecast read the evidence. A parallel track syncs the developers\' answers. Sprint 3 closed the MVP of wave 1; Sprint 4 is finishing wave 1 and opening wave 2; Sprint 5 is planned in this document.</p>')
    h.append('<h2>Short glossary</h2><table class="mini"><tr><th>Term</th><th>Meaning</th></tr>%s</table>'
             % "".join("<tr><td><b>%s</b></td><td>%s</td></tr>" % (e(g["term"]), e(g["def"])) for g in d["glossary"][:6]))
    # tree
    h.append('<h1 id="tree">Tree: %d Epics, %d Features</h1><table class="tree"><tr><th>Queue</th><th>Code</th><th>Name</th><th>Wave</th><th class="c">Stories</th><th class="c">Points known</th></tr>' % (len(d["epics"]), n_feats))
    for ep in d["epics"]:
        h.append('<tr class="ep"><td></td><td><a href="#%s"><code>%s</code></a></td><td colspan="4">%s <span class="muted">· %s</span></td></tr>'
                 % (slug(ep["code"]), e(ep["code"]), e(ep["name"]), e(ep["summary"])))
        for f in sorted(ep["features"], key=lambda x: x["queue"]):
            pts = sum((s["tracker"].get("points") or 0) for s in f["stories"])
            h.append('<tr><td class="c">%d</td><td><a href="#%s"><code>%s</code></a></td><td>%s%s</td><td>%s</td><td class="c">%d</td><td class="c">%s</td></tr>'
                     % (f["queue"], slug(f["code"]), e(f["code"]), e(f["name"]), ' <span class="tag t-mvp">MVP</span>' if f["mvp"] else "",
                        tag_wave(waves[f["wave"]]), len(f["stories"]), pts or '<span class="muted">none</span>'))
    h.append("</table>")
    # sprints
    for sp in d["sprints"]:
        h.append('<h1 id="sprint-%s">%s · %s, %s</h1><p class="tldr">%s</p>' % (e(sp["id"]), e(sp["name"]), e(sp["range"]), e(sp["state"]), e(sp["note"])))
        items = [(f, s) for f in feats_by_queue for s in f["stories"] if s["tracker"].get("sprint") == sp["id"]]
        imps = [it for it in d["improvements"] if it.get("sprint") == sp["id"]]
        if sp["state"] == "next":
            h.append('<div class="wave-block sp sp-next" id="sprint-next-block"><div class="wave-head"><h3>What enters, as planned in this document</h3><span class="wave-meta" id="sprint-next-count">nothing marked yet</span></div>'
                     '<p>This chapter fills itself from the planning layer. Open a Feature card in <a href="#waves">Waves of delivery</a>, mark the stories, pick owners and points; the list below is what the <a href="#planning">Planning</a> chapter exports.</p>'
                     '<div class="wave-cards" id="sprint-next-cards"><p class="no-stories">No story marked for %s yet.</p></div></div>' % e(sp["name"]))
            continue
        pts = sum((s["tracker"].get("points") or 0) for f, s in items) + sum(it.get("points") or 0 for it in imps)
        h.append('<div class="wave-block sp"><div class="wave-head"><h3>What %s</h3><span class="wave-meta">%d stories · %d items · %d points</span></div><div class="wave-cards">'
                 % ("entered" if sp["state"] == "closed" else "is in progress", len(items), len(imps), pts))
        for f, s in items:
            t = s["tracker"]
            check = '<span class="sp-check" title="done">&#10003;</span> ' if t.get("state") == "Done" else ""
            owner = people.get(t.get("owner"))
            h.append('<div class="card sp-it" data-cod="%s"><span class="queue-no">%s%d pts</span><a href="#%s">%s</a> %s'
                     '<em>%s</em><span class="sp-parent">%s · %s</span>%s</div>'
                     % (e(s["code"]), check, t.get("points") or 0, slug(s["code"]), e(s["code"]),
                        ('<span class="sp-owner">%s</span>' % e(owner["short"])) if owner else "",
                        e(s["name"]), e(f["code"]), e(f["name"]),
                        '<button type="button" class="pl-fx" data-cod="%s" aria-label="plan %s"></button>' % (e(f["code"]), e(f["code"]))))
        for it in imps:
            cls = "bug" if it["kind"] == "bug" else "mel"
            h.append('<div class="card sp-it" data-cod="%s"><span class="queue-no">%d pts</span><a href="#imp-%s">%s</a> <span class="tag t-%s">%s</span><em>%s</em>'
                     '<button type="button" class="pl-fx" data-cod="%s" aria-label="plan %s"></button></div>'
                     % (e(it["code"]), it.get("points") or 0, slug(it["code"]), e(it["code"]), cls, e(it["kind"]), e(it["name"]), e(it["code"]), e(it["code"])))
        h.append("</div></div>")
    # waves
    h.append('<h1 id="waves">Waves of delivery</h1><p class="tldr">Four waves and a parallel track. Each wave ends with something a broker uses in production, a short validation with real brokers, and a release. A dependency never points to a later wave; the generator refuses the document otherwise. Features marked MVP are the smallest usable delivery and depend on no outside access.</p>')
    for w in d["waves"]:
        wf = [f for f in feats_by_queue if f["wave"] == w["id"]]
        cls = "wpt" if w["parallel"] else "w%d" % w["order"]
        h.append('<div class="wave-block %s" id="wave-%s"><div class="wave-head"><h3>%s</h3><span class="wave-meta">%d Features · %d stories</span></div>'
                 '<p><b>What becomes usable.</b> %s</p><p><b>What it does not cover.</b> %s</p><div class="wave-cards">%s</div></div>'
                 % (cls, e(w["id"]), e(w["title"]), len(wf), sum(len(f["stories"]) for f in wf), e(w["usable"]), e(w["not_covered"]),
                    "".join(feature_card(f, w, people) for f in wf)))
    # planning chapter
    sprint_opts = "".join('<option value="%s"%s>%s · %s</option>' % (e(sp["id"]), ' selected' if sp["state"] == "next" else "", e(sp["name"]), e(sp["state"])) for sp in d["sprints"] if sp["state"] != "closed")
    h.append('<h1 id="planning">Planning: owner and points</h1>'
             '<p class="tldr">The meeting closes here. Everything marked in the cards is listed as it would be written to the tracker: story, owner, points, sprint, and what changes against the tracker\'s current values. The bar at the bottom keeps the load per person in view while you decide who takes the next story.</p>'
             '<div id="pl-panel">'
             '<div class="pl-line"><span class="pl-light"></span><span class="pl-hint pl-export-note">%s</span></div>'
             '<div class="pl-line"><label for="pl-sprint">Target sprint</label><select id="pl-sprint" class="pl-s">%s</select><span class="pl-hint" id="pl-sprint-hint"></span></div>'
             '<div class="pl-line"><label for="pl-limit">Limit per person</label><input type="number" id="pl-limit" min="0" max="80" step="1" class="pl-n">'
             '<span class="pl-hint">points per person in this sprint. The reference of %d for a two-week sprint is one point per working day with ceremonies discounted; replace it with the team\'s measured velocity as soon as there are closed sprints to measure. When the sprint declares a capacity per person, this number applies only to people without one.</span></div>'
             '<div class="pl-line" id="pl-cap-line" hidden><label>Capacity declared</label><span class="pl-hint" id="pl-cap-hint"></span></div>'
             '<div id="pl-empty" class="pl-empty">No User Story marked yet. Open a card in <a href="#waves">Waves of delivery</a> or in a Sprint chapter and mark what enters this sprint.</div>'
             '<div id="pl-table"></div>'
             '<div class="pl-actions" id="pl-actions" hidden><button type="button" class="pl-b pl-b1" id="pl-copy">Copy plan as text</button>'
             '<button type="button" class="pl-b" id="pl-export">Export JSON</button>'
             '<button type="button" class="pl-b pl-bq" id="pl-clear">Clear plan</button>'
             '<button type="button" class="pl-b" id="pl-reset">Reset to the example</button></div>'
             '<div id="pl-output"></div></div>'
             % (e(m["export_note"]), sprint_opts, m["default_limit"]))
    h.append('<div id="pl-modal" class="pl-modal" hidden><div class="pl-mbox" role="dialog" aria-modal="true" aria-label="Feature planning"><div id="pl-mcontent"></div></div></div>'
             '<div id="pl-card" class="pl-card" hidden><div class="pl-cbox" role="dialog" aria-modal="true" aria-labelledby="pl-ctitle"><div class="pl-ch"><span id="pl-ctitle"></span>'
             '<button type="button" class="pl-b" id="pl-cback">back</button><button type="button" class="pl-x" id="pl-cclose" aria-label="close">&times;</button></div>'
             '<div id="pl-ccontent" class="pl-ccontent"></div></div></div>'
             '<div id="pl-toast" class="pl-toast" aria-live="assertive"></div><div id="pl-bar" class="pl-bar" hidden></div>')
    # queue
    h.append('<h1 id="queue">Development queue</h1><p class="tldr">The number answers "what comes now". It replaces a schedule and an estimate at this level: points are set by the developer who pulls each User Story, in the planning above.</p><div class="queue">')
    for f in feats_by_queue:
        w = waves[f["wave"]]
        cls = "wpt" if w["parallel"] else "w%d" % w["order"]
        h.append('<div class="q %s"><div class="n">%d</div><div class="b"><h4><a href="#%s">%s · %s</a>%s%s</h4><p>%s</p><span class="meta">%s · depends on %s</span></div></div>'
                 % (cls, f["queue"], slug(f["code"]), e(f["code"]), e(f["name"]), tag_wave(w), ' <span class="tag t-mvp">MVP</span>' if f["mvp"] else "",
                    e(f["sections"]["value"]), e(f["_epic"]), ", ".join(f["depends_on"]) if f["depends_on"] else "nothing"))
    h.append("</div>")
    # epics and features
    h.append('<h1 id="epics">Epics and Features</h1><p class="tldr">One chapter per Epic: the Epic card with its eleven sections, then each Feature with its fifteen. Cards open and close; inside the planning pop-up they open already expanded.</p>')
    for ep in d["epics"]:
        h.append('<h1 id="%s-chapter"><code>%s</code> %s</h1>' % (slug(ep["code"]), e(ep["code"]), e(ep["name"])))
        h.append(epic_block(ep))
        h.append('<h2>The Features of %s</h2>' % e(ep["code"]))
        for f in sorted(ep["features"], key=lambda x: x["queue"]):
            h.append(feature_block(f, waves[f["wave"]]))
    # stories
    h.append('<h1 id="stories">User Stories</h1><p class="tldr">Every story with its nine sections and its acceptance cases in the Case / Given / When / Then form. A story in a closed sprint keeps its card for the record.</p>')
    for ep in d["epics"]:
        h.append('<h2 id="%s-stories"><code>%s</code> %s<span class="cnt">%d User Stories</span></h2>'
                 % (slug(ep["code"]), e(ep["code"]), e(ep["name"]), sum(len(f["stories"]) for f in ep["features"])))
        for f in sorted(ep["features"], key=lambda x: x["queue"]):
            h.append('<h3 class="feat-head"><span class="queue-no">queue %d</span><code>%s</code> %s<span class="cnt">%d stories</span></h3><div class="story-block">%s</div>'
                     % (f["queue"], e(f["code"]), e(f["name"]), len(f["stories"]), "".join(story_card(s, people) for s in f["stories"])))
    # improvements
    h.append('<h1 id="improvements">Improvements and bugs</h1><p class="tldr">Items that came from the pilot. A bug card describes what was seen and what was expected, and asks for the origin of the data to be verified; it never asserts the cause.</p>'
             '<p class="mb-legend"><b class="t-imp">improvement</b> asked by a broker or the manager · <b class="t-bug">bug</b> seen in the pilot</p>')
    for it in d["improvements"]:
        cls = "bug" if it["kind"] == "bug" else ""
        st = ('<span class="tag t-done">done · %s</span>' % e(it["sprint"])) if it.get("state") == "Done" else (('<span class="tag t-sp">%s</span>' % e(it["sprint"])) if it.get("sprint") else '<span class="tag t-not">not scheduled</span>')
        h.append('<details class="story extra %s" id="imp-%s"><summary><p class="story-h"><strong>%s</strong> · %s %s</p><p class="story-role">%s · Feature %s · %d points</p></summary>'
                 '<p class="story-line">%s</p></details>' % (cls, slug(it["code"]), e(it["code"]), e(it["name"]), st, e(it["kind"]), e(it["feature"]), it.get("points") or 0, e(it["summary"])))
    # wishlist
    h.append('<h1 id="wishlist">Brokers\' wishlist</h1><p class="tldr">What brokers and the manager asked for, with its status. A wish is not a backlog item until it has a why, a scope and an estimate.</p>')
    for th in d["wishlist"]:
        h.append('<h2>%s</h2>' % e(th["theme"]))
        for a in th["asks"]:
            h.append('<details class="story wl"><summary><p class="story-h"><strong>%s</strong> <span class="tag wl-st st-%s">%s</span></p><p class="story-role">%s</p></summary><p class="story-line">%s</p></details>'
                     % (e(a["ask"]), e(a["status"].replace(" ", "-")), e(a["status"]), e(a["who"]), e(a["note"])))
    # sources
    h.append('<h1 id="sources">Sources</h1><ul class="src">%s</ul>' % "".join("<li><b>%s.</b> %s</li>" % (e(s["name"]), e(s["what"])) for s in d["sources"]))
    h.append('<h2>Glossary</h2><table class="mini"><tr><th>Term</th><th>Meaning</th><th>Where</th></tr>%s</table>'
             % "".join("<tr><td><b>%s</b></td><td>%s</td><td class=\"muted\">%s</td></tr>" % (e(g["term"]), e(g["def"]), e(g["where"])) for g in d["glossary"]))
    # tracker
    order = []
    for ep in d["epics"]:
        order.append(ep["code"])
        for f in sorted(ep["features"], key=lambda x: x["queue"]):
            order.append(f["code"])
            order.extend(s["code"] for s in f["stories"])
    h.append('<h1 id="tracker">How this backlog loads into the tracker</h1>'
             '<p class="tldr">The tracker is the system of record and this document is the review. Loading happens after the review, in this order: the Epic, then its Features in queue order, then each Feature\'s stories, so every parent exists before its children and the Story Points field is filled from the plan exported above. Load one item first, check how it renders on the board, then the batch. %s</p>'
             '<details class="item"><summary><p class="item-h"><strong>Creation order</strong> · %d items</p></summary><ol class="dec">%s</ol></details>'
             % (e(m["export_note"]), len(order), "".join("<li><code>%s</code></li>" % e(c) for c in order)))
    h.append('<p class="footer-note">%s</p></main></div>' % e(m["footer"]))
    h.append('<script type="application/json" id="pl-data">%s</script>' % json.dumps(planning_data(d, feats), ensure_ascii=False).replace("</", "<\\/"))
    h.append('<script src="backlog-document.js"></script></body></html>')
    return "".join(h)


def main():
    with open(DATA, encoding="utf-8") as fh:
        d = json.load(fh)
    errors, feats, stories = validate(d)
    if errors:
        print("REFUSED: %d problem(s)" % len(errors))
        for x in errors:
            print("  " + x)
        sys.exit(1)
    print("data ok: %d epics, %d features, %d stories" % (len(d["epics"]), len(feats), len(stories)))
    if "--check" in sys.argv:
        return
    page = build(d, feats, stories)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(page)
    print("wrote %s (%d KB)" % (os.path.relpath(OUT, ROOT), len(page.encode("utf-8")) // 1024))


if __name__ == "__main__":
    main()
