// ============================================================
// ACE PRIME - SHARED SCRIPT
// Used across all pages
// ============================================================

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Hero line draw-in
  var heroLine = document.getElementById('heroLine');
  if (heroLine) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        heroLine.style.width = '100%';
      }, 600);
    });
  }

  // Dashboard chart bars fill on load
  var chartBars = document.querySelectorAll('.dash-bar-col');
  if (chartBars.length) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        var heights = [55, 75, 45, 90, 65, 100, 80];
        chartBars.forEach(function (bar, i) {
          bar.style.height = (heights[i % heights.length]) + '%';
        });
      }, 500);
    });
  }

  // Count up stats on scroll into view
  function animateCount(el, target, duration) {
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    var counted = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          var leadsEl = document.getElementById('statLeads');
          var hoursEl = document.getElementById('statHours');
          var daysEl = document.getElementById('statDays');
          if (leadsEl) animateCount(leadsEl, 3, 1400);
          if (hoursEl) animateCount(hoursEl, 40, 1400);
          if (daysEl) animateCount(daysEl, 14, 1400);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsGrid);
  }
});

function closeMenu() {
  var mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

function toggleServiceRow(trigger) {
  var panelId = trigger.getAttribute('aria-controls');
  var panel = document.getElementById(panelId);
  if (!panel) return;

  var isOpen = trigger.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    // Closing: lock current height, then animate to 0
    panel.style.height = panel.scrollHeight + 'px';
    requestAnimationFrame(function () {
      panel.style.height = '0px';
    });
    trigger.setAttribute('aria-expanded', 'false');
  } else {
    // Opening: start at 0 (in case it was 'auto'), then animate to full height
    panel.style.height = '0px';
    var targetHeight = panel.scrollHeight;
    requestAnimationFrame(function () {
      panel.style.height = targetHeight + 'px';
    });
    trigger.setAttribute('aria-expanded', 'true');
    panel.addEventListener('transitionend', function handler() {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        panel.style.height = 'auto';
      }
      panel.removeEventListener('transitionend', handler);
    });
  }
}

// Recalculate open panel heights on resize so wrapped text doesn't get clipped
window.addEventListener('resize', function () {
  document.querySelectorAll('.service-row-trigger[aria-expanded="true"]').forEach(function (trigger) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel) panel.style.height = 'auto';
  });
});
