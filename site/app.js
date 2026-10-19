// The workflow track: one stage open at a time, keyboard reachable.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.track [role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panels [role="tabpanel"]'));
  if (!tabs.length || tabs.length !== panels.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function select(index, focus, updateHash) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (panel, i) {
      var on = i === index;
      panel.classList.toggle('is-active', on);
      if (on && !reduceMotion.matches) {
        panel.classList.remove('entering');
        void panel.offsetWidth;
        panel.classList.add('entering');
      }
    });
    if (focus) tabs[index].focus();
    if (updateHash && history.replaceState) {
      history.replaceState(null, '', '#' + panels[index].id);
    }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      select(i, false, true);
    });
    tab.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        select(next, true, true);
      }
    });
  });

  function fromHash() {
    var match = /^#stage-(\d)$/.exec(location.hash);
    return match && Number(match[1]) < tabs.length ? Number(match[1]) : null;
  }

  var start = fromHash();
  select(start === null ? 0 : start, false, false);

  window.addEventListener('hashchange', function () {
    var index = fromHash();
    if (index !== null) select(index, true, false);
  });
})();
