// Capacity simulation: named people, weekly capacity in points, Fibonacci stories,
// dependencies, a reserve for enabling work, and the week the Epic lands.
// Vanilla JS, no dependencies. State lives in localStorage under one key.
(function () {
  'use strict';

  var KEY = 'bws-capacity-v1-v2';
  var FIB = [1, 2, 3, 5, 8, 13];
  var MAX_WEEKS = 52;
  var NAMES = ['Eva', 'Felipe', 'Gabi', 'Hugo', 'Iris', 'Joel'];

  // The Acme example. Fictional team and numbers; the rules are real.
  var FEATURES = {
    F01: { name: 'Meetings and notes', impact: 1, reach: 1.0, conf: 3 },
    F02: { name: 'Follow-up draft and send', impact: 3, reach: 0.9, conf: 2 },
    F03: { name: 'CRM write-back', impact: 3, reach: 0.9, conf: 2 },
    F04: { name: 'Activity trail', impact: 2, reach: 0.2, conf: 3 },
    F05: { name: 'Manager weekly digest', impact: 2, reach: 0.2, conf: 1 },
    F06: { name: 'Drafts in a second language', impact: 1, reach: 0.1, conf: 1 },
    F07: { name: 'Schedule the next meeting', impact: 0, reach: 0, conf: 0 }
  };
  var FEATURE_ORDER = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07'];

  function example() {
    return {
      start: '2026-03-09',
      sprintWeeks: 2,
      reserve: 33,
      people: [
        { name: 'Ana', weekly: 5 },
        { name: 'Bruno', weekly: 5 },
        { name: 'Clara', weekly: 4 },
        { name: 'Diego', weekly: 3 }
      ],
      stories: [
        { code: 'F01-US01', title: "Show today's finished meetings with their notes", feature: 'F01', points: 3, owner: 'Ana', band: 'Now', deps: [], enabler: false },
        { code: 'F03-US01', title: 'Create a single write path to the CRM', feature: 'F03', points: 5, owner: 'Bruno', band: 'Now', deps: [], enabler: true },
        { code: 'F02-US01', title: 'Draft a follow-up email from the meeting notes', feature: 'F02', points: 3, owner: 'Ana', band: 'Now', deps: ['F01-US01'], enabler: false },
        { code: 'F03-US02', title: 'Show a CRM update preview for a finished meeting', feature: 'F03', points: 3, owner: 'Clara', band: 'Now', deps: ['F01-US01'], enabler: false },
        { code: 'F02-US02', title: 'Show the facts behind each draft', feature: 'F02', points: 3, owner: 'Ana', band: 'Now', deps: ['F02-US01'], enabler: false },
        { code: 'F02-US04', title: 'Store each draft until the rep approves or discards it', feature: 'F02', points: 2, owner: 'Diego', band: 'Now', deps: ['F02-US01'], enabler: true },
        { code: 'F03-US04', title: 'Block the update when the contact has no CRM match', feature: 'F03', points: 2, owner: 'Clara', band: 'Now', deps: ['F03-US02'], enabler: false },
        { code: 'F03-US03', title: 'Apply the CRM update the rep approved', feature: 'F03', points: 5, owner: 'Bruno', band: 'Now', deps: ['F03-US01', 'F03-US02'], enabler: false },
        { code: 'F02-US03', title: 'Send the follow-up after the rep edits it', feature: 'F02', points: 3, owner: 'Ana', band: 'Now', deps: ['F02-US02', 'F02-US04'], enabler: false },
        { code: 'F04-US01', title: 'Show the manager what was sent, applied and ignored', feature: 'F04', points: 2, owner: 'Ana', band: 'Now', deps: ['F02-US03', 'F03-US03'], enabler: false },
        { code: 'F05-US01', title: 'Weekly digest for managers from the trail', feature: 'F05', points: 8, owner: '', band: 'Next', deps: ['F04-US01'], enabler: false },
        { code: 'F06-US01', title: 'Detect the meeting language and draft in it', feature: 'F06', points: 8, owner: '', band: 'Later', deps: ['F02-US01'], enabler: false },
        { code: 'F07-US01', title: 'Schedule the next meeting from the follow-up', feature: 'F07', points: 0, owner: '', band: 'Now', deps: [], enabler: false }
      ]
    };
  }

  // ---------- state ----------

  var state = load();
  var lastLanding = null;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.people && s.stories) return s;
      }
    } catch (e) { /* storage unavailable or corrupt: fall back to the example */ }
    return example();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  // ---------- helpers ----------

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function byCode(code) {
    for (var i = 0; i < state.stories.length; i++) if (state.stories[i].code === code) return state.stories[i];
    return null;
  }

  function parseDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return new Date(2026, 2, 9);
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }

  function weekDate(w) {
    var d = parseDate(state.start);
    d.setDate(d.getDate() + (w - 1) * 7);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()];
  }

  function featureEffort(code) {
    var sum = 0;
    state.stories.forEach(function (s) { if (s.feature === code && s.points > 0) sum += s.points; });
    return sum;
  }

  function featureRoi(code) {
    var f = FEATURES[code] || { impact: 0, reach: 0, conf: 0 };
    var effort = featureEffort(code);
    if (!effort || !f.impact) return 0;
    return (f.impact * f.reach * f.conf) / effort;
  }

  // ---------- the engine ----------

  function simulate() {
    var problems = [];
    var stories = state.stories.map(function (s) {
      return {
        code: s.code, title: s.title, feature: s.feature, points: Number(s.points) || 0,
        owner: s.owner || '', band: s.band || 'Now', deps: (s.deps || []).slice(), enabler: !!s.enabler
      };
    });
    var people = state.people.filter(function (p) { return p.name && Number(p.weekly) > 0; })
      .map(function (p) { return { name: p.name, weekly: Number(p.weekly) }; });
    var sprintWeeks = Number(state.sprintWeeks) || 2;
    var reserveShare = Math.min(60, Math.max(0, Number(state.reserve) || 0)) / 100;

    var index = {};
    stories.forEach(function (s) { index[s.code] = s; });

    // Unknown dependencies.
    stories.forEach(function (s) {
      s.deps = s.deps.filter(function (d) {
        if (!index[d]) { problems.push(s.code + ' depends on ' + d + ', which does not exist. The dependency is ignored.'); return false; }
        if (d === s.code) { problems.push(s.code + ' depends on itself. The dependency is ignored.'); return false; }
        return true;
      });
    });

    // Cycles (Kahn over every story).
    var indeg = {}, out = {};
    stories.forEach(function (s) { indeg[s.code] = 0; out[s.code] = []; });
    stories.forEach(function (s) { s.deps.forEach(function (d) { indeg[s.code]++; out[d].push(s.code); }); });
    var queue = stories.filter(function (s) { return indeg[s.code] === 0; }).map(function (s) { return s.code; });
    var seen = 0;
    while (queue.length) {
      var c = queue.shift(); seen++;
      out[c].forEach(function (n) { if (--indeg[n] === 0) queue.push(n); });
    }
    if (seen < stories.length) {
      var inCycle = stories.filter(function (s) { return indeg[s.code] > 0; }).map(function (s) { return s.code; });
      problems.push('Dependency cycle among ' + inCycle.join(', ') + '. Nothing is scheduled until it is broken.');
      return { problems: problems, notes: [], people: people, stories: stories, scheduled: [], parked: [], refine: [], landing: null, weeks: 0, sprintWeeks: sprintWeeks, idle: {}, idleTotal: 0, spent: {}, chain: {}, result: {}, featureLanding: null, reserveTarget: 0 };
    }

    var refine = stories.filter(function (s) { return s.band === 'Now' && !(s.points > 0); });
    var parked = stories.filter(function (s) { return s.band !== 'Now'; });
    var now = stories.filter(function (s) { return s.band === 'Now' && s.points > 0; });
    var nowSet = {};
    now.forEach(function (s) { nowSet[s.code] = true; });

    // Blocked by a parked or unestimated dependency (transitively).
    var blocked = {};
    function isBlocked(code, trail) {
      if (blocked[code] !== undefined) return blocked[code];
      var s = index[code];
      var reason = null;
      for (var i = 0; i < s.deps.length; i++) {
        var d = s.deps[i];
        if (!nowSet[d]) { reason = d + (index[d].band !== 'Now' ? ' is ' + index[d].band : ' has no points'); break; }
        if (trail.indexOf(d) < 0 && isBlocked(d, trail.concat([code]))) { reason = 'of ' + d; break; }
      }
      blocked[code] = reason;
      return reason;
    }
    now.forEach(function (s) {
      var r = isBlocked(s.code, []);
      if (r) problems.push(s.code + ' is Now but waits on ' + (r.indexOf('of ') === 0 ? 'a blocked story (' + r.slice(3) + ')' : r) + '. Move the dependency up or the story down.');
    });
    var schedulable = now.filter(function (s) { return !blocked[s.code]; });

    // Longest downstream path in points, for priority.
    var down = {};
    function downstream(code) {
      if (down[code] !== undefined) return down[code];
      var best = 0;
      out[code].forEach(function (n) { if (index[n].band === 'Now' && index[n].points > 0 && !blocked[n]) best = Math.max(best, index[n].points + downstream(n)); });
      down[code] = best;
      return best;
    }
    schedulable.forEach(function (s) { downstream(s.code); });

    // Too big for anyone's whole sprint: reported, still scheduled, so the chain behind it is not hidden.
    var maxSprint = 0, teamWeekly = 0;
    people.forEach(function (p) { maxSprint = Math.max(maxSprint, p.weekly * sprintWeeks); teamWeekly += p.weekly; });
    function sprintCapOf(name) {
      for (var i = 0; i < people.length; i++) if (people[i].name === name) return people[i].weekly * sprintWeeks;
      return 0;
    }
    schedulable.forEach(function (s) {
      var cap = s.owner ? sprintCapOf(s.owner) : maxSprint;
      if (people.length && s.points > cap) problems.push(s.code + ' (' + s.points + ' points) is bigger than any whole sprint available to it (' + cap + '). Split it; do not estimate it.');
    });
    if (!people.length) problems.push('No one on the team has capacity. Add a person.');

    // Scheduling, week by week.
    var result = {};
    schedulable.forEach(function (s) { result[s.code] = { person: null, start: null, end: null, perWeek: {}, remaining: s.points }; });
    var done = {};
    var active = {};   // person name -> story code
    var spent = {};    // person -> week -> points
    var idle = {};     // person -> week -> points left
    var notes = [];
    people.forEach(function (p) { spent[p.name] = {}; idle[p.name] = {}; });

    var pending = schedulable.slice();
    var lastWeek = 0;
    var reserveTarget = Math.round(teamWeekly * sprintWeeks * reserveShare);
    var enablerPlaced = 0;
    var weekLeft = {};

    for (var w = 1; w <= MAX_WEEKS && people.length; w++) {
      var sprintStart = ((w - 1) % sprintWeeks) === 0;
      var weeksLeftInSprint = sprintWeeks - ((w - 1) % sprintWeeks); // including this week
      if (sprintStart) enablerPlaced = 0;
      weekLeft = {};
      people.forEach(function (p) { weekLeft[p.name] = p.weekly; });

      // Continue active stories.
      people.forEach(function (p) {
        var code = active[p.name];
        if (!code) return;
        var r = result[code];
        var take = Math.min(weekLeft[p.name], r.remaining);
        if (take > 0) consume(p.name, code, w, take);
        if (r.remaining === 0) { r.end = w; done[code] = w; active[p.name] = null; lastWeek = Math.max(lastWeek, w); }
      });

      // Start new stories: enablers first until the reserve share of the sprint holds enabling work,
      // then the longest chain first, then the Feature with the higher ROI.
      var ready = pending.filter(function (s) {
        if (done[s.code] || result[s.code].start !== null) return false;
        return s.deps.every(function (d) { return done[d] && done[d] < w; });
      });
      var protect = enablerPlaced < reserveTarget;
      ready.sort(function (a, b) {
        if (protect && a.enabler !== b.enabler) return a.enabler ? -1 : 1;
        var da = a.points + down[a.code], db = b.points + down[b.code];
        if (db !== da) return db - da;
        var ra = featureRoi(a.feature), rb = featureRoi(b.feature);
        if (rb !== ra) return rb - ra;
        return a.code < b.code ? -1 : 1;
      });
      ready.forEach(function (s) {
        var candidates = people.filter(function (p) { return !active[p.name] && weekLeft[p.name] > 0 && (!s.owner || p.name === s.owner); });
        var best = null;
        candidates.forEach(function (p) {
          var fit = fits(p, s, w, weekLeft[p.name], weeksLeftInSprint);
          if (!fit) return;
          var better = !best ||
            (best.fit.carry && !fit.carry) ||
            (best.fit.carry === fit.carry && (fit.finish < best.fit.finish || (fit.finish === best.fit.finish && weekLeft[p.name] > weekLeft[best.p.name])));
          if (better) best = { p: p, fit: fit };
        });
        if (!best) return;
        var r = result[s.code];
        r.person = best.p.name; r.start = w; active[best.p.name] = s.code;
        if (s.enabler) enablerPlaced += s.points;
        if (best.fit.carry) notes.push(s.code + ' carries over the sprint boundary (weeks ' + w + ' to ' + best.fit.finish + ') because ' + best.p.name + ' would otherwise sit idle. Split it to keep stories inside a sprint.');
        var take = Math.min(weekLeft[best.p.name], r.remaining);
        if (take > 0) consume(best.p.name, s.code, w, take);
        if (r.remaining === 0) { r.end = w; done[s.code] = w; active[best.p.name] = null; lastWeek = Math.max(lastWeek, w); }
      });

      // Idle capacity this week, flagged while work is still waiting.
      var waiting = pending.some(function (s) { return !done[s.code]; });
      people.forEach(function (p) { if (weekLeft[p.name] > 0 && waiting) idle[p.name][w] = weekLeft[p.name]; });

      if (!waiting) break;
    }

    function consume(name, code, week, take) {
      weekLeft[name] -= take;
      result[code].remaining -= take;
      result[code].perWeek[week] = (result[code].perWeek[week] || 0) + take;
      spent[name][week] = (spent[name][week] || 0) + take;
    }

    // When would this person finish the story, starting this week? carry = it would cross the sprint boundary.
    function fits(p, s, week, leftThisWeek, weeksLeft) {
      if (p.weekly <= 0) return null;
      var need = s.points, cap = leftThisWeek, k = 0;
      while (need > 0 && k < 60) {
        need -= Math.min(cap, need);
        if (need <= 0) break;
        k++;
        cap = p.weekly;
      }
      if (need > 0) return null;
      return { finish: week + k, carry: k >= weeksLeft };
    }

    var unscheduled = pending.filter(function (s) { return !done[s.code]; });
    unscheduled.forEach(function (s) { problems.push(s.code + ' could not be placed within ' + MAX_WEEKS + ' weeks. Check capacity and the owner.'); });
    var idleTotal = 0;
    people.forEach(function (p) { Object.keys(idle[p.name]).forEach(function (k) { idleTotal += idle[p.name][k]; }); });

    // Landing week and the chain that sets it.
    var landing = lastWeek || null;
    var chain = {};
    if (landing) {
      var last = null;
      pending.forEach(function (s) { if (done[s.code] === landing && (!last || result[s.code].start > result[last].start)) last = s.code; });
      var cur = last;
      while (cur) {
        chain[cur] = true;
        var s = index[cur], next = null, nextEnd = -1;
        s.deps.forEach(function (d) { if (done[d] && done[d] > nextEnd) { nextEnd = done[d]; next = d; } });
        cur = next;
      }
    }

    var featureLanding = {};
    FEATURE_ORDER.forEach(function (f) {
      var end = 0, start = Infinity, any = false, parkedF = false;
      stories.forEach(function (s) {
        if (s.feature !== f) return;
        if (s.band !== 'Now') { parkedF = true; return; }
        if (result[s.code] && result[s.code].end) { any = true; end = Math.max(end, result[s.code].end); start = Math.min(start, result[s.code].start); }
      });
      featureLanding[f] = any ? { start: start, end: end } : (parkedF ? { parked: true } : null);
    });

    return {
      problems: problems, notes: notes, people: people, stories: stories, index: index, result: result, done: done,
      spent: spent, idle: idle, idleTotal: idleTotal, chain: chain, landing: landing, weeks: Math.max(lastWeek, 1),
      parked: parked, refine: refine, featureLanding: featureLanding, sprintWeeks: sprintWeeks, scheduled: pending,
      reserveTarget: reserveTarget
    };
  }

  // ---------- rendering: inputs ----------

  function renderTeam() {
    var body = document.getElementById('team-body');
    body.innerHTML = state.people.map(function (p, i) {
      return '<tr>' +
        '<td><label class="sr-only" for="p-name-' + i + '">Name</label><input type="text" id="p-name-' + i + '" data-person="' + i + '" data-field="name" value="' + esc(p.name) + '"></td>' +
        '<td><label class="sr-only" for="p-weekly-' + i + '">Points per week</label><input type="number" id="p-weekly-' + i + '" data-person="' + i + '" data-field="weekly" min="0" max="20" step="1" value="' + esc(p.weekly) + '"></td>' +
        '<td><button type="button" class="btn small quiet" data-remove-person="' + i + '" aria-label="Remove ' + esc(p.name) + '">Remove</button></td>' +
        '</tr>';
    }).join('');
    document.getElementById('start-date').value = state.start;
    document.getElementById('sprint-weeks').value = String(state.sprintWeeks);
    document.getElementById('reserve').value = String(state.reserve);
  }

  function renderStories() {
    var body = document.getElementById('stories-body');
    var owners = '<option value="">Anyone</option>' + state.people.map(function (p) { return '<option value="' + esc(p.name) + '">' + esc(p.name) + '</option>'; }).join('');
    var feats = FEATURE_ORDER.map(function (f) { return '<option value="' + f + '">' + f + ' ' + esc(FEATURES[f].name) + '</option>'; }).join('');
    var pts = '<option value="0">none</option>' + FIB.map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
    body.innerHTML = state.stories.map(function (s, i) {
      return '<tr>' +
        '<td><label class="sr-only" for="s-code-' + i + '">Code</label><input type="text" class="code" id="s-code-' + i + '" data-story="' + i + '" data-field="code" value="' + esc(s.code) + '"></td>' +
        '<td><label class="sr-only" for="s-title-' + i + '">Title</label><input type="text" class="title" id="s-title-' + i + '" data-story="' + i + '" data-field="title" value="' + esc(s.title) + '"></td>' +
        '<td><label class="sr-only" for="s-feature-' + i + '">Feature</label><select id="s-feature-' + i + '" data-story="' + i + '" data-field="feature">' + feats + '</select></td>' +
        '<td><label class="sr-only" for="s-points-' + i + '">Points</label><select id="s-points-' + i + '" data-story="' + i + '" data-field="points">' + pts + '</select></td>' +
        '<td><label class="sr-only" for="s-owner-' + i + '">Owner</label><select id="s-owner-' + i + '" data-story="' + i + '" data-field="owner">' + owners + '</select></td>' +
        '<td><label class="sr-only" for="s-band-' + i + '">Band</label><select id="s-band-' + i + '" data-story="' + i + '" data-field="band"><option>Now</option><option>Next</option><option>Later</option></select></td>' +
        '<td><label class="sr-only" for="s-deps-' + i + '">Depends on</label><input type="text" class="deps" id="s-deps-' + i + '" data-story="' + i + '" data-field="deps" value="' + esc((s.deps || []).join(', ')) + '"></td>' +
        '<td><label class="sr-only" for="s-enabler-' + i + '">Enabler</label><input type="checkbox" id="s-enabler-' + i + '" data-story="' + i + '" data-field="enabler"' + (s.enabler ? ' checked' : '') + '></td>' +
        '<td><button type="button" class="btn small quiet" data-remove-story="' + i + '" aria-label="Remove ' + esc(s.code) + '">Remove</button></td>' +
        '</tr>';
    }).join('');
    state.stories.forEach(function (s, i) {
      document.getElementById('s-feature-' + i).value = s.feature;
      document.getElementById('s-points-' + i).value = String(Number(s.points) || 0);
      document.getElementById('s-owner-' + i).value = s.owner || '';
      document.getElementById('s-band-' + i).value = s.band || 'Now';
    });
  }

  // ---------- rendering: results ----------

  function renderResult(sim, changeText) {
    var headline = document.getElementById('headline');
    var subline = document.getElementById('subline');
    var message = document.getElementById('message');
    if (sim.landing) {
      headline.innerHTML = 'The Epic lands in <span class="week">week ' + sim.landing + '</span>.';
      var sprint = Math.ceil(sim.landing / sim.sprintWeeks);
      subline.textContent = 'Week of ' + weekDate(sim.landing) + ', sprint ' + sprint + ' of ' + sim.sprintWeeks + '-week sprints, ' + sim.scheduled.length + ' Now stories on ' + sim.people.length + ' people. ' +
        (sim.idleTotal ? sim.idleTotal + ' points sat idle while the chain ran: the chain, not the team, sets this date.' : 'No idle capacity: the team, not the chain, sets this date.');
    } else {
      headline.textContent = 'Nothing lands yet.';
      subline.textContent = sim.problems.length ? 'Fix the problems below.' : 'Add Now stories with points.';
    }

    if (changeText) {
      var delta;
      if (lastLanding === null || sim.landing === null) delta = sim.landing ? 'the Epic lands in week ' + sim.landing + '.' : 'nothing lands.';
      else if (sim.landing === lastLanding) delta = 'the landing week does not move (week ' + sim.landing + ').';
      else {
        var diff = sim.landing - lastLanding;
        delta = 'the Epic lands ' + Math.abs(diff) + (Math.abs(diff) === 1 ? ' week ' : ' weeks ') + (diff < 0 ? 'earlier' : 'later') + ' (week ' + lastLanding + ' to week ' + sim.landing + ').';
      }
      message.textContent = changeText + ': ' + delta;
    } else {
      message.textContent = '';
    }
    lastLanding = sim.landing;

    document.getElementById('problems').innerHTML =
      sim.problems.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
      (sim.notes || []).map(function (n) { return '<li class="quiet">' + esc(n) + '</li>'; }).join('');

    // Feature bars.
    var weeks = Math.max(sim.weeks, 1);
    var bars = FEATURE_ORDER.map(function (f) {
      var fl = sim.featureLanding ? sim.featureLanding[f] : null;
      var label = f + ' ' + esc(FEATURES[f].name);
      if (!fl) return '<li><span>' + label + '</span><span class="lane"></span><span class="lands">no stories</span></li>';
      if (fl.parked) return '<li><span>' + label + '</span><span class="lane"><span class="bar parked" style="left:0;width:100%"></span></span><span class="lands">parked</span></li>';
      var left = ((fl.start - 1) / weeks * 100).toFixed(1), width = ((fl.end - fl.start + 1) / weeks * 100).toFixed(1);
      var critical = sim.landing && fl.end === sim.landing;
      return '<li><span>' + label + '</span><span class="lane" style="--week:' + (100 / weeks).toFixed(2) + '%"><span class="bar" style="left:' + left + '%;width:' + width + '%"></span></span><span class="lands' + (critical ? ' critical' : '') + '">week ' + fl.end + '</span></li>';
    }).join('');
    document.getElementById('feature-bars').innerHTML = bars;

    // Allocation grid.
    var head = '<thead><tr><th scope="col" class="person">Person</th>';
    for (var w = 1; w <= weeks; w++) {
      var ss = ((w - 1) % sim.sprintWeeks) === 0;
      head += '<th scope="col"' + (ss ? ' class="sprint-start"' : '') + '>Week ' + w + '<span class="date">' + esc(weekDate(w)) + '</span></th>';
    }
    head += '</tr></thead>';
    var rows = sim.people.map(function (p) {
      var cells = '';
      for (var w = 1; w <= weeks; w++) {
        var chips = [];
        sim.scheduled.forEach(function (s) {
          var r = sim.result[s.code];
          if (r && r.person === p.name && r.perWeek[w]) {
            var cls = 'chip' + (sim.chain[s.code] ? ' critical' : '') + (s.enabler ? ' enabler' : '');
            chips.push('<span class="' + cls + '" title="' + esc(s.title) + '">' + esc(s.code) + ' <span class="pts">' + r.perWeek[w] + '</span></span>');
          }
        });
        var left = sim.idle[p.name] && sim.idle[p.name][w];
        var idleHtml = left ? '<span class="idle flag">idle ' + left + '</span>' : '';
        var ss = ((w - 1) % sim.sprintWeeks) === 0;
        cells += '<td' + (ss ? ' class="sprint-start"' : '') + '>' + chips.join('') + idleHtml + '</td>';
      }
      return '<tr><th scope="row" class="person">' + esc(p.name) + '<span class="date">' + p.weekly + ' pts/week</span></th>' + cells + '</tr>';
    }).join('');
    document.getElementById('grid').innerHTML = head + '<tbody>' + rows + '</tbody>';

    // Totals.
    var totals = sim.people.map(function (p) {
      var sum = 0;
      Object.keys(sim.spent[p.name] || {}).forEach(function (k) { sum += sim.spent[p.name][k]; });
      return esc(p.name) + ' ' + sum;
    });
    var allPoints = 0;
    sim.scheduled.forEach(function (s) { allPoints += s.points; });
    document.getElementById('totals').textContent = 'Points placed per person: ' + totals.join(', ') + '. Total Now points: ' + allPoints + '. Capacity per week: ' + sim.people.reduce(function (a, p) { return a + p.weekly; }, 0) + '. Reserve for enabling work: ' + sim.reserveTarget + ' points per sprint, placed first.';

    // Lists.
    document.getElementById('parked').innerHTML = sim.parked.length ? sim.parked.map(function (s) { return '<li>' + esc(s.code) + ' ' + esc(s.title) + ' <span class="facts-inline">(' + esc(s.band) + (s.points ? ', ' + s.points + ' pts' : '') + ')</span></li>'; }).join('') : '<li>None.</li>';
    document.getElementById('refine').innerHTML = sim.refine.length ? sim.refine.map(function (s) { return '<li>' + esc(s.code) + ' ' + esc(s.title) + '</li>'; }).join('') : '<li>None. Every Now story has points.</li>';
    document.getElementById('board').innerHTML = FEATURE_ORDER.map(function (f) {
      var fe = FEATURES[f], eff = featureEffort(f), roi = featureRoi(f);
      var bandSet = {};
      state.stories.forEach(function (s) { if (s.feature === f) bandSet[s.points > 0 ? s.band : 'To refine'] = true; });
      var band = Object.keys(bandSet).join(' / ') || 'no stories';
      return '<li>' + f + ' ' + esc(fe.name) + ' <span class="facts-inline">' + esc(band) + (fe.enabling ? ', enabling ' + esc(fe.enabling) : '') + (eff ? ', ' + eff + ' pts, ROI ' + roi.toFixed(2) : '') + '</span></li>';
    }).join('');
  }

  // ---------- events ----------

  function recompute(changeText) {
    save();
    renderResult(simulate(), changeText);
  }

  function readPerson(i, field, value) {
    var p = state.people[i];
    if (!p) return '';
    if (field === 'name') { var old = p.name; p.name = value.trim() || old; state.stories.forEach(function (s) { if (s.owner === old) s.owner = p.name; }); return p.name + ' renamed'; }
    p.weekly = Math.max(0, Math.min(20, Math.round(Number(value) || 0)));
    return p.name + ' at ' + p.weekly + ' points per week';
  }

  function readStory(i, field, el) {
    var s = state.stories[i];
    if (!s) return '';
    if (field === 'code') { var oldCode = s.code; var code = el.value.trim() || oldCode; s.code = code; state.stories.forEach(function (o) { o.deps = (o.deps || []).map(function (d) { return d === oldCode ? code : d; }); }); return oldCode + ' renamed to ' + code; }
    if (field === 'title') { s.title = el.value; return s.code + ' retitled'; }
    if (field === 'feature') { s.feature = el.value; return s.code + ' moved to ' + s.feature; }
    if (field === 'points') { s.points = Number(el.value) || 0; return s.code + ' at ' + (s.points || 'no') + ' points'; }
    if (field === 'owner') { s.owner = el.value; return s.code + (s.owner ? ' owned by ' + s.owner : ' open to anyone'); }
    if (field === 'band') { s.band = el.value; return s.code + ' moved to ' + s.band; }
    if (field === 'deps') { s.deps = el.value.split(',').map(function (d) { return d.trim(); }).filter(Boolean); return s.code + ' depends on ' + (s.deps.join(', ') || 'nothing'); }
    if (field === 'enabler') { s.enabler = el.checked; return s.code + (s.enabler ? ' marked as enabler' : ' no longer an enabler'); }
    return '';
  }

  document.getElementById('team-body').addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset.person === undefined) return;
    recompute(readPerson(Number(el.dataset.person), el.dataset.field, el.value));
    if (el.dataset.field === 'name') refreshOwners();
  });

  document.getElementById('stories-body').addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset.story === undefined || el.type === 'checkbox') return;
    recompute(readStory(Number(el.dataset.story), el.dataset.field, el));
  });

  document.getElementById('stories-body').addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset.story === undefined || el.type !== 'checkbox') return;
    recompute(readStory(Number(el.dataset.story), el.dataset.field, el));
  });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t) return;
    if (t.dataset.removePerson !== undefined) {
      var i = Number(t.dataset.removePerson);
      var gone = state.people.splice(i, 1)[0];
      state.stories.forEach(function (s) { if (gone && s.owner === gone.name) s.owner = ''; });
      renderTeam(); renderStories(); recompute('Removed ' + (gone ? gone.name : 'a person'));
    } else if (t.dataset.removeStory !== undefined) {
      var j = Number(t.dataset.removeStory);
      var rs = state.stories.splice(j, 1)[0];
      state.stories.forEach(function (s) { s.deps = (s.deps || []).filter(function (d) { return d !== rs.code; }); });
      renderStories(); recompute('Removed ' + (rs ? rs.code : 'a story'));
    }
  });

  document.getElementById('add-person').addEventListener('click', function () {
    var name = nextName();
    state.people.push({ name: name, weekly: 4 });
    renderTeam(); renderStories(); recompute('Added ' + name + ' at 4 points per week');
  });

  document.getElementById('add-story').addEventListener('click', function () {
    var n = 1;
    while (byCode('S' + n)) n++;
    state.stories.push({ code: 'S' + n, title: 'New story', feature: 'F01', points: 0, owner: '', band: 'Now', deps: [], enabler: false });
    renderStories(); recompute('Added S' + n + ' with no points');
    var el = document.getElementById('s-title-' + (state.stories.length - 1));
    if (el) el.focus();
  });

  document.getElementById('start-date').addEventListener('input', function (e) { state.start = e.target.value || state.start; recompute('Start date ' + state.start); });
  document.getElementById('sprint-weeks').addEventListener('change', function (e) { state.sprintWeeks = Number(e.target.value) || 2; recompute('Sprints of ' + state.sprintWeeks + (state.sprintWeeks === 1 ? ' week' : ' weeks')); });
  document.getElementById('reserve').addEventListener('input', function (e) { state.reserve = Math.max(0, Math.min(60, Number(e.target.value) || 0)); recompute('Reserve at ' + state.reserve + ' percent'); });

  document.getElementById('whatif-add').addEventListener('click', function () {
    var name = nextName();
    state.people.push({ name: name, weekly: 4 });
    renderTeam(); renderStories(); recompute('Added ' + name + ' at 4 points per week');
  });

  document.getElementById('whatif-remove').addEventListener('click', function () {
    if (!state.people.length) return;
    var idx = 0;
    state.people.forEach(function (p, i) { if (Number(p.weekly) < Number(state.people[idx].weekly)) idx = i; });
    var gone = state.people.splice(idx, 1)[0];
    state.stories.forEach(function (s) { if (s.owner === gone.name) s.owner = ''; });
    renderTeam(); renderStories(); recompute('Removed ' + gone.name + ' (' + gone.weekly + ' points per week)');
  });

  document.getElementById('whatif-later').addEventListener('click', function () {
    var biggest = null;
    state.stories.forEach(function (s) { if (s.band === 'Now' && s.points > 0 && (!biggest || s.points > biggest.points)) biggest = s; });
    if (!biggest) return;
    biggest.band = 'Later';
    renderStories(); recompute(biggest.code + ' (' + biggest.points + ' points) moved to Later');
  });

  document.getElementById('reset').addEventListener('click', function () {
    state = example();
    lastLanding = null;
    renderTeam(); renderStories(); recompute('Reset to the Acme example');
  });

  function nextName() {
    for (var i = 0; i < NAMES.length; i++) if (!state.people.some(function (p) { return p.name === NAMES[i]; })) return NAMES[i];
    return 'Person ' + (state.people.length + 1);
  }

  function refreshOwners() {
    var names = state.people.map(function (p) { return p.name; });
    state.stories.forEach(function (s, i) {
      var sel = document.getElementById('s-owner-' + i);
      if (!sel) return;
      sel.innerHTML = '<option value="">Anyone</option>' + names.map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + '</option>'; }).join('');
      sel.value = s.owner || '';
    });
  }

  // ---------- start ----------

  renderTeam();
  renderStories();
  renderResult(simulate(), null);
})();
