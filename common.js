/* =====================================================
   COMMON JS — 戚俊皓 | Personal Website v3
   ===================================================== */

window.SHARED_I18N = {
  zh: {
    'nav.home':'首页','nav.music':'音乐','nav.travel':'旅行',
    'nav.photo':'摄影','nav.sport':'运动','nav.sports':'运动',
    'nav.resume':'简历','nav.contact':'联系','nav.about':'关于',
    'footer.text':'© 2026 戚俊皓 · 华东理工大学金融专业',
    'footer.tagline':'用音乐表达，用镜头记录，用脚步丈量世界',
    'footer.music':'音乐','footer.travel':'旅行','footer.photo':'摄影',
    'footer.sport':'运动','footer.resume':'简历',
    'footer.contact':'联系','footer.home':'首页','footer.about':'关于',
    'backtop':'回到顶部','theme.aria':'切换主题','nav.aria':'菜单',
    'coming.status':'还没做好','coming.desc':'这个页面还在施工中<br>内容会放在这里',
    'coming.back':'回到首页',
  },
  en: {
    'nav.home':'Home','nav.music':'Music','nav.travel':'Travel',
    'nav.photo':'Photography','nav.sport':'Sport','nav.sports':'Sports',
    'nav.resume':'Resume','nav.contact':'Contact','nav.about':'About',
    'footer.text':'© 2026 Qi JunHao · Finance @ ECUST',
    'footer.tagline':'Express through music, capture with lens, measure the world with steps',
    'footer.music':'Music','footer.travel':'Travel','footer.photo':'Photography',
    'footer.sport':'Sport','footer.resume':'Resume',
    'footer.contact':'Contact','footer.home':'Home','footer.about':'About',
    'backtop':'Back to top','theme.aria':'Toggle theme','nav.aria':'Menu',
    'coming.status':'Coming Soon','coming.desc':'This page is under construction<br>Content will be here soon',
    'coming.back':'Back to Home',
  },
  hant: {
    'nav.home':'首頁','nav.music':'音樂','nav.travel':'旅行',
    'nav.photo':'攝影','nav.sport':'運動','nav.sports':'運動',
    'nav.resume':'簡歷','nav.contact':'聯繫','nav.about':'關於',
    'footer.text':'© 2026 戚俊皓 · 華東理工大學金融專業',
    'footer.tagline':'用音樂表達，用鏡頭記錄，用腳步丈量世界',
    'footer.music':'音樂','footer.travel':'旅行','footer.photo':'攝影',
    'footer.sport':'運動','footer.resume':'簡歷',
    'footer.contact':'聯繫','footer.home':'首頁','footer.about':'關於',
    'backtop':'回到頂部','theme.aria':'切換主題','nav.aria':'選單',
    'coming.status':'還沒做好','coming.desc':'這個頁面還在施工中<br>內容會放在這裡',
    'coming.back':'回到首頁',
  }
};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ─── I18N ──────────────────────────────────────────
  let currentLang = localStorage.getItem('lang') || 'zh';

  function t(key, lang) {
    var page = window.PAGE_I18N && window.PAGE_I18N[lang];
    var shared = window.SHARED_I18N[lang];
    if (page && page[key] !== undefined) return page[key];
    if (shared && shared[key] !== undefined) return shared[key];
    var zp = window.PAGE_I18N && window.PAGE_I18N['zh'];
    var zs = window.SHARED_I18N['zh'];
    if (zp && zp[key] !== undefined) return zp[key];
    if (zs && zs[key] !== undefined) return zs[key];
    return key;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var txt = t(key, lang);
      if (txt) el.innerHTML = txt;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-aria');
      var txt = t(key, lang);
      if (txt) el.setAttribute('aria-label', txt.replace(/<[^>]*>/g, ''));
    });

    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      var titleTxt = t(titleKey, lang);
      if (titleTxt) document.title = titleTxt;
    }

    document.querySelectorAll('.lang-item').forEach(function(item) {
      item.classList.toggle('active', item.dataset.lang === lang);
    });

    document.querySelectorAll('.gooey-nav-container nav ul li a').forEach(function(a, i) {
      var keys = ['nav.home','nav.music','nav.travel','nav.photo','nav.sport','nav.resume','nav.contact'];
      var label = t(keys[i], lang);
      if (label) a.textContent = label;
    });
  }

  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function(e) {
      var item = e.target.closest('.lang-item');
      if (!item) return;
      var lang = item.dataset.lang;
      if (lang) applyLanguage(lang);
    });
  }

  applyLanguage(currentLang);

  // ─── Theme Toggle ──────────────────────────────────
  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
      setTimeout(function() {
        document.documentElement.classList.remove('theme-transitioning');
      }, 350);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }

  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
