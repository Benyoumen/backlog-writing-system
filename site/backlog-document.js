/* Planning layer of the backlog document.
   Reads the JSON in #pl-data, keeps the plan in localStorage, paints the
   strips on the Feature cards, the pop-up per Feature, the capacity bar and
   the Planning chapter. Exports the plan; writes nothing anywhere else. */
(function () {
  "use strict";
  var node = document.getElementById("pl-data");
  if (!node) return;
  var D = JSON.parse(node.textContent);
  var KEY = D.key || "bws-backlog-document";
  var plan = { sprint: D.sprint_default, limit: D.limit, us: {}, feat: {} };
  var FEAT = {}, US = {}, PERSON = {}, SPRINT = {};
  var openFeat = null, stack = [], returnTo = null, undoPlan = null, over = {}, teamOver = false;
  var barSig = "", withBar = false, saveTimer = null;

  D.features.forEach(function (f) {
    FEAT[f.cod] = f;
    f.us.forEach(function (u) { u.feat = f.cod; US[u.cod] = u; });
  });
  D.people.forEach(function (p) { PERSON[p.id] = p; });
  D.sprints.forEach(function (s) { SPRINT[s.id] = s; });

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shortOf(id) { return PERSON[id] ? PERSON[id].short : (id || ""); }
  function nameOf(id) { return PERSON[id] ? PERSON[id].name : (id || ""); }
  function initialsOf(id) { return PERSON[id] ? PERSON[id].initials : "??"; }
  function sprintName(id) { return SPRINT[id] ? SPRINT[id].name : (id || "no sprint"); }
  function fmt(n) { return Math.round(n * 10) / 10; }

  /* ---------------------------------------------------------------- state */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var p = JSON.parse(raw);
      if (!p || !p.us) return;
      plan = { sprint: p.sprint || plan.sprint, limit: typeof p.limit === "number" ? p.limit : D.limit, us: p.us, feat: p.feat || {} };
    } catch (e) { /* private window or blocked storage: plan without remembering */ }
  }
  function saveNow() {
    saveTimer = null;
    try { localStorage.setItem(KEY, JSON.stringify(plan)); } catch (e) { /* ignore */ }
  }
  function save() { if (saveTimer) return; saveTimer = setTimeout(saveNow, 300); }
  function reg(cod) { return plan.us[cod] || (plan.us[cod] = { on: false, owner: "", pts: 0 }); }
  function marked(cod) { var v = plan.us[cod]; return !!(v && v.on); }
  function ptsOf(cod) { var v = plan.us[cod]; return v && typeof v.pts === "number" ? v.pts : 0; }
  function ownerOf(cod) {
    var v = plan.us[cod];
    if (v && v.owner) return v.owner;
    var f = US[cod] && plan.feat[US[cod].feat];
    return (f && f.owner) || "";
  }
  function openStories(f) { return f.us.filter(function (u) { return !u.done; }); }
  function items() {
    var out = [];
    D.features.forEach(function (f) { openStories(f).forEach(function (u) { if (marked(u.cod)) out.push(u); }); });
    return out;
  }
  function featSummary(cod) {
    var f = FEAT[cod], n = 0, pts = 0;
    openStories(f).forEach(function (u) { if (marked(u.cod)) { n++; pts += ptsOf(u.cod); } });
    return { n: n, pts: pts, total: openStories(f).length, done: f.us.length - openStories(f).length };
  }

  /* ---------------------------------------------------------------- capacity */
  function capacity() { var s = SPRINT[plan.sprint]; return s && s.capacity ? s.capacity : null; }
  function limitOf(id) {
    var c = capacity();
    if (c && id && typeof c[id] === "number") return c[id];
    return plan.limit || 0;
  }
  function teamLimit() {
    var t = 0;
    D.people.forEach(function (p) { t += limitOf(p.id); });
    return t;
  }
  function level(pts, lim) {
    if (!lim) return "";
    if (pts > lim) return "over";
    if (pts >= lim * D.warning) return "warn";
    return "";
  }
  function perPerson() {
    var map = {}, free = { n: 0, pts: 0 };
    items().forEach(function (u) {
      var o = ownerOf(u.cod);
      var target = o ? (map[o] = map[o] || { n: 0, pts: 0 }) : free;
      target.n++;
      target.pts += ptsOf(u.cod);
    });
    var list = Object.keys(map).map(function (id) { return { id: id, d: map[id] }; })
      .sort(function (a, b) { return b.d.pts - a.d.pts; });
    return { list: list, free: free };
  }

  /* ---------------------------------------------------------------- painting */
  function strips(cod) { return Array.prototype.slice.call(document.querySelectorAll('.pl-fx[data-cod="' + cod + '"]')); }
  function paintCard(cod) {
    var els = strips(cod), f = FEAT[cod];
    if (!els.length || !f) return;
    var r = featSummary(cod), owner = plan.feat[cod] && plan.feat[cod].owner;
    var h = owner ? '<span class="ini" title="' + esc(nameOf(owner)) + '">' + esc(initialsOf(owner)) + "</span>"
                  : '<span class="ini free">+</span>';
    h += r.n ? '<span class="pt">' + r.pts + " pts</span>" : "<span>plan</span>";
    var qt = f.single ? (r.total ? (r.n ? "in the plan" : "") : "done")
                      : (r.total ? r.n + " of " + r.total + " stories" : (r.done ? "all done" : "no stories"));
    h += '<span class="qt' + (r.n && r.n === r.total ? " full" : "") + '">' + qt + "</span>";
    els.forEach(function (el) { el.innerHTML = h; });
  }
  function paintAllCards() { Object.keys(FEAT).forEach(paintCard); }

  function chip(ini, label, d, cls, extra) {
    return '<span class="p' + (cls ? " " + cls : "") + '"><span class="ini">' + esc(ini) + "</span>" + esc(label) +
      ' <span class="pt">' + d.n + " st · " + d.pts + " pts" + esc(extra || "") + "</span></span>";
  }
  function paintBar() {
    var b = $("pl-bar"), list = items(), n = list.length;
    if (withBar !== !!n) { document.body.classList.toggle("pl-with-bar", !!n); withBar = !!n; }
    if (!n) { b.hidden = true; barSig = ""; return; }
    var pp = perPerson(), tot = 0, tl = teamLimit();
    var h = '<span class="rot">' + esc(sprintName(plan.sprint)) + "</span>";
    pp.list.forEach(function (x) {
      tot += x.d.pts;
      var lim = limitOf(x.id);
      h += chip(initialsOf(x.id), shortOf(x.id), x.d, level(x.d.pts, lim), lim ? " / " + lim : "");
    });
    if (pp.free.n) { tot += pp.free.pts; h += chip("!", "no owner", pp.free, "free"); }
    h += '<span class="p team ' + level(tot, tl) + '"><span class="ini">&#931;</span>team <span class="pt">' + n + " st · " + tot + " / " + tl + " pts</span></span>";
    h += '<button type="button" class="zerar" id="pl-clearbar" title="clears the plan of this meeting; the sprint and the limit stay">clear</button>';
    h += '<a class="ir" href="#planning">close the meeting &rarr;</a>';
    if (h !== barSig) { b.innerHTML = h; barSig = h; }
    b.hidden = false;
    checkLimits(pp, tot, tl);
  }
  function checkLimits(pp, tot, tl) {
    var alive = {};
    pp.list.forEach(function (x) {
      alive[x.id] = true;
      var lim = limitOf(x.id);
      if (!lim) { over[x.id] = false; return; }
      if (x.d.pts > lim) {
        if (!over[x.id]) {
          over[x.id] = true;
          toast("<span><b>" + esc(nameOf(x.id)) + "</b> is <b>" + fmt(x.d.pts - lim) + " points above</b> their capacity in " +
            esc(sprintName(plan.sprint)) + ": " + x.d.pts + " points in " + x.d.n + " stories, limit " + lim + ".</span>", "over");
        }
      } else if (over[x.id]) {
        over[x.id] = false;
      }
    });
    Object.keys(over).forEach(function (id) { if (!alive[id]) over[id] = false; });
    if (tl && tot > tl) {
      if (!teamOver) {
        teamOver = true;
        toast("<span>The <b>team</b> is <b>" + fmt(tot - tl) + " points above</b> its capacity for " + esc(sprintName(plan.sprint)) +
          ": " + tot + " of " + tl + " points.</span>", "over");
      }
    } else { teamOver = false; }
  }
  function paintSprintHint() {
    var s = SPRINT[plan.sprint], el = $("pl-sprint-hint");
    if (el) el.textContent = s ? s.range + " · " + s.state : "";
    var line = $("pl-cap-line"), hint = $("pl-cap-hint"), c = capacity();
    if (!line || !hint) return;
    if (!c) { line.hidden = true; hint.textContent = ""; return; }
    var parts = D.people.map(function (p) { return p.short + " " + c[p.id]; });
    hint.textContent = D.sprint_weeks + " weeks · points per week per person × " + D.sprint_weeks + ": " + parts.join(" · ") +
      " · team " + teamLimit() + ". Reference rule until velocity is measured; the limit above applies only to people without a declared capacity.";
    line.hidden = false;
  }
  function change(u) {
    var o = ownerOf(u.cod), p = ptsOf(u.cod);
    if (!u.id) return { cls: "missing", txt: "no card in the tracker yet" };
    if (p === 0 && typeof u.points === "number" && u.points > 0) return { cls: "clears", txt: "clears the " + u.points + " points in the tracker" };
    var d = [];
    if ((u.owner || "") !== o) d.push(u.owner ? "owner " + shortOf(u.owner) + " to " + (o ? shortOf(o) : "none") : (o ? "gets owner" : ""));
    if (u.points !== p) d.push(u.points != null ? "points " + u.points + " to " + p : "gets points");
    if (u.sprint !== plan.sprint) d.push("enters " + sprintName(plan.sprint));
    d = d.filter(Boolean);
    if (!d.length) return { cls: "same", txt: "already as planned" };
    var swap = d.some(function (x) { return x.indexOf("owner ") === 0 || x.indexOf("points ") === 0; });
    return { cls: swap ? "swap" : "new", txt: d.join(", ") };
  }
  function paintPanel() {
    var list = items();
    $("pl-empty").hidden = list.length > 0;
    $("pl-actions").hidden = list.length === 0;
    if (!list.length) { $("pl-table").innerHTML = ""; return; }
    var h = '<table class="pl-t2"><tr><th>Order</th><th>User Story</th><th>Feature</th><th>Owner</th><th>Points</th><th>What would be written</th></tr>';
    list.forEach(function (u) {
      var f = FEAT[u.feat], o = ownerOf(u.cod), m = change(u);
      h += '<tr><td class="c">' + (f.queue != null ? "queue " + f.queue : esc(f.sprint || "item")) + "</td>" +
        "<td><code>" + esc(u.cod) + "</code><br>" + esc(u.name) + "</td>" +
        "<td><code>" + esc(f.cod) + '</code><span class="fnome">' + esc(f.name) + "</span></td>" +
        '<td class="c">' + (o ? esc(shortOf(o)) : '<span class="pl-change missing">no owner</span>') + "</td>" +
        '<td class="c">' + ptsOf(u.cod) + "</td>" +
        '<td><span class="pl-change ' + m.cls + '">' + esc(m.txt) + "</span></td></tr>";
    });
    h += "</table>";
    var pp = perPerson(), t = '<div class="pl-tot">';
    pp.list.forEach(function (x) {
      var lim = limitOf(x.id);
      t += '<span class="p ' + level(x.d.pts, lim) + '"><span class="ini">' + esc(initialsOf(x.id)) + "</span>" + esc(shortOf(x.id)) +
        ' <span class="pt">' + x.d.n + " st · " + x.d.pts + (lim ? " / " + lim : "") + " pts</span></span>";
    });
    if (pp.free.n) t += '<span class="p free"><span class="ini">!</span>no owner <span class="pt">' + pp.free.n + " st · " + pp.free.pts + " pts</span></span>";
    $("pl-table").innerHTML = h + t + "</div>";
  }
  function paintNextSprint() {
    var box = $("sprint-next-cards"), cnt = $("sprint-next-count");
    if (!box) return;
    var list = items().filter(function () { return SPRINT[plan.sprint] && SPRINT[plan.sprint].state === "next"; });
    if (!list.length) { box.innerHTML = '<p class="no-stories">No story marked yet.</p>'; if (cnt) cnt.textContent = "nothing marked yet"; return; }
    var pts = 0, h = "";
    list.forEach(function (u) {
      var f = FEAT[u.feat], o = ownerOf(u.cod);
      pts += ptsOf(u.cod);
      h += '<div class="card sp-it" data-cod="' + esc(u.cod) + '"><span class="queue-no">' + ptsOf(u.cod) + ' pts</span><a href="#' + esc(u.cod.toLowerCase()) + '">' + esc(u.cod) + "</a> " +
        (o ? '<span class="sp-owner">' + esc(shortOf(o)) + "</span>" : "") + "<em>" + esc(u.name) + '</em><span class="sp-parent">' + esc(f.cod) + " · " + esc(f.name) + "</span></div>";
    });
    box.innerHTML = h;
    if (cnt) cnt.textContent = list.length + " stories · " + pts + " points";
  }
  function paintAll() { paintAllCards(); paintBar(); paintPanel(); paintNextSprint(); paintSprintHint(); }

  /* ---------------------------------------------------------------- pop-up */
  function personOptions(selected, inherited) {
    var h = '<option value="">' + (inherited ? "inherits: " + esc(shortOf(inherited)) : "no owner") + "</option>";
    D.people.forEach(function (p) {
      h += '<option value="' + esc(p.id) + '"' + (selected === p.id ? " selected" : "") + ">" + esc(p.name) + "</option>";
    });
    return h;
  }
  function fibs(cod) {
    var cur = ptsOf(cod), h = '<span class="pl-fibs" role="group" aria-label="points">';
    D.fib.forEach(function (n) {
      h += '<button type="button" class="pl-fib' + (n === 0 ? " z" : "") + '" data-us="' + esc(cod) + '" data-pt="' + n + '" aria-pressed="' + (cur === n) + '">' + n + "</button>";
    });
    return h + "</span>";
  }
  function trackerLine(u) {
    if (!u.id) return '<span class="board">not in the tracker yet</span>';
    return '<span class="board"><b>tracker #' + esc(u.id) + ":</b> " + (u.sprint ? esc(sprintName(u.sprint)) : "no sprint") + " · " +
      (u.owner ? esc(shortOf(u.owner)) : "no owner") + " · " + (u.points != null ? u.points + " pts" : "no points") + "</span>";
  }
  function rowUS(u, featOwner) {
    if (u.done) {
      return '<div class="pl-u done-row" data-us="' + esc(u.cod) + '"><div class="u1"><input type="checkbox" disabled aria-label="done in the tracker">' +
        '<div class="t"><code>' + esc(u.cod) + '</code><span class="n">' + esc(u.name) + "</span></div>" +
        '<button type="button" class="pl-ucard" data-vercard="' + esc(u.cod) + '">see the story</button></div>' +
        '<span class="done-tag">' + esc(u.done) + "</span></div>";
    }
    var on = marked(u.cod), own = (plan.us[u.cod] && plan.us[u.cod].owner) || "";
    return '<div class="pl-u' + (on ? "" : " off") + '" data-us="' + esc(u.cod) + '"><div class="u1">' +
      '<input type="checkbox" data-us="' + esc(u.cod) + '"' + (on ? " checked" : "") + ' aria-label="enters the sprint">' +
      '<div class="t"><code>' + esc(u.cod) + '</code><span class="n">' + esc(u.name) + "</span></div>" +
      '<button type="button" class="pl-ucard" data-vercard="' + esc(u.cod) + '">see the story</button></div>' +
      '<div class="u2"><label class="pl-note" for="own-' + esc(u.cod) + '">owner</label><select class="pl-s' + (own ? "" : " inherits") + '" id="own-' + esc(u.cod) + '" data-us="' + esc(u.cod) + '">' +
      personOptions(own, featOwner) + "</select>" + fibs(u.cod) + "</div>" + trackerLine(u) + "</div>";
  }
  function open(cod) {
    var f = FEAT[cod];
    if (!f) return;
    openFeat = cod;
    var owner = (plan.feat[cod] && plan.feat[cod].owner) || "";
    var h = '<div class="pl-mh"><div class="l1">' + (f.queue != null ? '<span class="queue-no">queue ' + f.queue + "</span>" : "") +
      "<code>" + esc(f.cod) + "</code>" + (f.mvp ? ' <span class="tag t-mvp">MVP</span>' : "") +
      '<button type="button" class="pl-x" id="pl-close" aria-label="close">&times;</button></div>' +
      '<h3 id="pl-mtitle">' + esc(f.name) + "</h3>" +
      '<div class="l3"><span class="pl-note">' + esc(f.summary) + "</span>" +
      (f.single ? "" : '<button type="button" class="pl-b" data-vercard="' + esc(f.cod) + '">see the full card</button>') + "</div></div>";
    h += '<div class="pl-mowner"><label for="pl-fowner">' + (f.single ? "Owner" : "Feature owner") + "</label>" +
      '<select class="pl-s" id="pl-fowner">' + personOptions(owner, "") + "</select>" +
      (openStories(f).length > 1 ? '<button type="button" class="pl-b" id="pl-all">select all</button>' : "") +
      '<span class="pl-note">' + (f.single ? "default for the row below, which is the item" : "default for the stories below; the Feature itself gets no points") + "</span></div>";
    h += '<div class="pl-us">' + (f.us.length ? f.us.map(function (u) { return rowUS(u, owner); }).join("") :
      '<p class="pl-note" style="padding:14px 0">The stories of this Feature are not written yet, so there is nothing to pull into the sprint.</p>') + "</div>";
    h += '<div class="pl-mf"><span class="tot" id="pl-mtot"></span><span class="pl-note">Points are set by the developer who will build the story. Selecting an owner or points marks the story as entering the sprint.</span></div>';
    $("pl-mcontent").innerHTML = h;
    $("pl-modal").hidden = false;
    $("pl-modal").querySelector(".pl-mbox").setAttribute("aria-labelledby", "pl-mtitle");
    totalModal();
    var first = $("pl-mcontent").querySelector("select, input, button");
    if (first) first.focus();
  }
  function totalModal() {
    var el = $("pl-mtot");
    if (!el || !openFeat) return;
    var r = featSummary(openFeat);
    el.textContent = r.total ? r.n + " of " + r.total + " stories in " + sprintName(plan.sprint) + " · " + r.pts + " points" : "";
  }
  function close() {
    $("pl-modal").hidden = true;
    openFeat = null;
    if (returnTo && document.body.contains(returnTo)) { returnTo.focus(); }
    returnTo = null;
  }
  function paintRowState(cod) {
    var row = $("pl-mcontent").querySelector('.pl-u[data-us="' + cod + '"]');
    if (!row) return;
    row.classList.toggle("off", !marked(cod));
    var cb = row.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = marked(cod);
    var cur = ptsOf(cod);
    Array.prototype.forEach.call(row.querySelectorAll(".pl-fib"), function (b) { b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-pt")) === cur)); });
    var sel = row.querySelector("select.pl-s");
    if (sel) { var own = (plan.us[cod] && plan.us[cod].owner) || ""; sel.classList.toggle("inherits", !own); }
  }
  function setPts(cod, val) {
    var at = reg(cod);
    at.pts = (at.pts === val && val !== 0) ? 0 : val;
    if (at.pts > 0 && !at.on) at.on = true;
    save(); paintRowState(cod); totalModal(); paintAll();
  }
  function setOn(cod, on) { reg(cod).on = !!on; save(); paintRowState(cod); totalModal(); paintAll(); }
  function setOwner(cod, id) {
    var at = reg(cod);
    at.owner = id;
    if (id && !at.on) at.on = true;
    save(); paintRowState(cod); totalModal(); paintAll();
  }
  function setFeatOwner(cod, id) {
    plan.feat[cod] = { owner: id };
    save();
    Array.prototype.forEach.call($("pl-mcontent").querySelectorAll("select.pl-s[data-us]"), function (s) {
      s.options[0].textContent = id ? "inherits: " + shortOf(id) : "no owner";
    });
    paintAll();
  }

  /* ---------------------------------------------------------------- full card pop-up */
  function showCard(cod) {
    var src = document.getElementById(cod.toLowerCase()) || document.getElementById("imp-" + cod.toLowerCase());
    if (!src) return;
    var clone = src.cloneNode(true);
    Array.prototype.forEach.call(clone.querySelectorAll("[id]"), function (el) { el.removeAttribute("id"); });
    clone.removeAttribute("id");
    if (clone.tagName === "DETAILS") clone.setAttribute("open", "");
    Array.prototype.forEach.call(clone.querySelectorAll("details"), function (d) { d.setAttribute("open", ""); });
    Array.prototype.forEach.call(clone.querySelectorAll(".pl-fx"), function (b) { b.remove(); });
    var title = (FEAT[cod] ? cod + " · " + FEAT[cod].name : (US[cod] ? cod + " · " + US[cod].name : cod));
    $("pl-ctitle").textContent = title;
    $("pl-ccontent").innerHTML = "";
    $("pl-ccontent").appendChild(clone);
    $("pl-cback").hidden = stack.length < 2;
    $("pl-card").hidden = false;
    $("pl-card").scrollTop = 0;
    $("pl-cclose").focus();
  }
  function openCard(cod) { stack.push(cod); showCard(cod); }
  function backCard() { stack.pop(); if (stack.length) showCard(stack[stack.length - 1]); else closeCard(); }
  function closeCard() { stack = []; $("pl-card").hidden = true; var f = $("pl-mcontent").querySelector("select, input, button"); if (f && !$("pl-modal").hidden) f.focus(); }

  /* ---------------------------------------------------------------- toast, clear, export */
  function toast(txt, cls) {
    var d = document.createElement("div");
    d.className = "pl-t " + (cls || "");
    d.innerHTML = txt + '<button type="button" aria-label="close">&times;</button>';
    d.querySelector('button[aria-label="close"]').onclick = function () { d.remove(); };
    var box = $("pl-toast");
    box.appendChild(d);
    while (box.children.length > 3) box.removeChild(box.firstChild);
    setTimeout(function () { d.remove(); }, 9000);
  }
  function clearPlan(ask) {
    var n = items().length;
    if (!n) return;
    if (ask && !window.confirm("Clear the plan of this meeting? Nothing else is touched.")) return;
    undoPlan = JSON.parse(JSON.stringify(plan));
    plan = { sprint: plan.sprint, limit: plan.limit, us: {}, feat: {} };
    over = {}; teamOver = false;
    saveNow(); paintAll();
    $("pl-output").innerHTML = "";
    toast("<span>Plan cleared: <b>" + n + " stories</b> left the count. The sprint and the limit stay as they were.</span>" +
      '<button type="button" class="pl-tundo" id="pl-undo">undo</button>', "cleared");
  }
  function undoClear() {
    if (!undoPlan) return;
    plan = undoPlan; undoPlan = null; over = {}; teamOver = false;
    saveNow(); paintAll();
    var c = $("pl-toast");
    while (c.firstChild) c.removeChild(c.firstChild);
  }
  function planText() {
    var list = items(), pp = perPerson(), tot = 0, tl = teamLimit();
    pp.list.forEach(function (x) { tot += x.d.pts; });
    tot += pp.free.pts;
    var l = ["Planning " + D.program + " · " + sprintName(plan.sprint) + " · " + new Date().toISOString().slice(0, 10),
             list.length + " stories · " + tot + " points · team capacity " + tl + " · " + pp.list.length + " people", ""];
    function block(label, d, filter, mark) {
      l.push(label + " · " + d.n + " stories · " + d.pts + " points" + (mark || ""));
      var cur = null;
      list.filter(filter).forEach(function (u) {
        var f = FEAT[u.feat];
        if (f.single) { cur = null; l.push("  " + f.cod + " · " + f.name + " (" + ptsOf(u.cod) + " pts)"); return; }
        if (f.cod !== cur) { cur = f.cod; l.push("  " + f.cod + " · " + f.name); }
        l.push("    " + u.cod + " (" + ptsOf(u.cod) + " pts) " + u.name);
      });
      l.push("");
    }
    pp.list.forEach(function (x) {
      var lim = limitOf(x.id);
      block(nameOf(x.id), x.d, function (u) { return ownerOf(u.cod) === x.id; }, lim && x.d.pts > lim ? "  [above the limit of " + lim + "]" : "");
    });
    if (pp.free.n) block("No owner", pp.free, function (u) { return !ownerOf(u.cod); }, "");
    return l.join("\n");
  }
  function copyPlan() {
    var t = planText();
    function done(ok) {
      $("pl-output").innerHTML = '<div class="pl-msg' + (ok ? " ok" : "") + '">' + (ok ? "Plan copied to the clipboard." : "Copy it from here:") + "<pre>" + esc(t) + "</pre></div>";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(false); });
    else done(false);
  }
  function exportJSON() {
    var rows = items().map(function (u) {
      return { story: u.cod, title: u.name, feature: u.feat, tracker_id: u.id, sprint: plan.sprint, owner: ownerOf(u.cod) || null, points: ptsOf(u.cod), change: change(u).txt };
    });
    var payload = { program: D.program, sprint: plan.sprint, exported: new Date().toISOString(), limit_per_person: plan.limit, team_capacity: teamLimit(), rows: rows };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "plan-" + plan.sprint + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    $("pl-output").innerHTML = '<div class="pl-msg ok">Exported ' + rows.length + " rows as plan-" + esc(plan.sprint) + ".json. In the original this step wrote owner, points and sprint to the tracker.</div>";
  }
  function resetExample() {
    if (!window.confirm("Forget the plan saved in this browser and go back to the empty example?")) return;
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    plan = { sprint: D.sprint_default, limit: D.limit, us: {}, feat: {} };
    over = {}; teamOver = false;
    $("pl-sprint").value = plan.sprint; $("pl-limit").value = plan.limit;
    $("pl-output").innerHTML = "";
    paintAll();
  }

  /* ---------------------------------------------------------------- events */
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("button, a") : null;
    if (!t) {
      if (ev.target === $("pl-modal")) close();
      else if (ev.target === $("pl-card")) closeCard();
      return;
    }
    if (t.classList.contains("pl-fx")) { returnTo = t; open(t.getAttribute("data-cod")); return; }
    if (t.hasAttribute("data-vercard")) { openCard(t.getAttribute("data-vercard")); return; }
    if (t.classList.contains("pl-fib")) { setPts(t.getAttribute("data-us"), Number(t.getAttribute("data-pt"))); return; }
    switch (t.id) {
      case "pl-close": close(); return;
      case "pl-all": openStories(FEAT[openFeat]).forEach(function (u) { reg(u.cod).on = true; paintRowState(u.cod); }); save(); totalModal(); paintAll(); return;
      case "pl-cback": backCard(); return;
      case "pl-cclose": closeCard(); return;
      case "pl-clearbar": clearPlan(true); return;
      case "pl-clear": clearPlan(true); return;
      case "pl-undo": undoClear(); return;
      case "pl-copy": copyPlan(); return;
      case "pl-export": exportJSON(); return;
      case "pl-reset": resetExample(); return;
    }
  });
  document.addEventListener("change", function (ev) {
    var el = ev.target;
    if (el.id === "pl-fowner") { setFeatOwner(openFeat, el.value); return; }
    if (el.id === "pl-sprint") { plan.sprint = el.value; over = {}; teamOver = false; save(); paintAll(); return; }
    if (el.id === "pl-limit") { plan.limit = Math.max(0, Number(el.value) || 0); over = {}; teamOver = false; save(); paintAll(); return; }
    var cod = el.getAttribute("data-us");
    if (!cod) return;
    if (el.type === "checkbox") setOn(cod, el.checked);
    else if (el.tagName === "SELECT") setOwner(cod, el.value);
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Escape") return;
    if (!$("pl-card").hidden) { closeCard(); ev.preventDefault(); }
    else if (!$("pl-modal").hidden) { close(); ev.preventDefault(); }
  });

  /* ---------------------------------------------------------------- start */
  load();
  if ($("pl-sprint")) { if (SPRINT[plan.sprint]) $("pl-sprint").value = plan.sprint; else plan.sprint = $("pl-sprint").value; }
  if ($("pl-limit")) $("pl-limit").value = plan.limit;
  paintAll();
  window.__backlogDocument = { plan: function () { return plan; }, items: items, perPerson: perPerson, teamLimit: teamLimit, limitOf: limitOf, level: level, setPts: setPts, setOwner: setOwner, setOn: setOn, planText: planText };
})();
