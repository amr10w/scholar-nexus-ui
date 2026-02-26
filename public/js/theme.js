/* =================================================================
   THEME — Scholar Nexus
   Dark mode toggle. This file loads FIRST (in <head>) to prevent
   flash-of-unstyled-content (FOUC).
   ================================================================= */

(function () {
  var saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  /* Update toggle icon if it exists */
  var icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  /* Forward theme to iframes (keep existing behavior) */
  document.querySelectorAll('iframe').forEach(function (iframe) {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'THEME_CHANGE', theme: next }, '*');
    }
  });
}
