// ФізикаPRO — невеликі інтерактиви сайту
(function () {
  // Мобільне меню
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // «Перейти до змісту» на сторінці 404 (там діє <base>)
  var sk = document.querySelector('.skip');
  if (sk && document.querySelector('base')) {
    sk.addEventListener('click', function (e) {
      e.preventDefault();
      var m = document.getElementById('main');
      m.tabIndex = -1;
      m.focus();
    });
  }

  // Поточний рік у підвалі
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Фільтр матеріалів
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('[data-cat]');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
      f.classList.add('active');
      f.setAttribute('aria-pressed', 'true');
      var c = f.getAttribute('data-filter');
      items.forEach(function (it) {
        it.hidden = !(c === 'all' || it.getAttribute('data-cat').split(' ').indexOf(c) !== -1);
      });
    });
  });

  // Форма запису: відкриває лист у пошті користувача (сервер не потрібен)
  var form = document.getElementById('signup');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.getAttribute('data-email');
      if (!email) return;
      var d = new FormData(form);
      var body = 'Ім’я: ' + d.get('name') +
        '\nКонтакт: ' + d.get('contact') +
        '\nПредмет: ' + d.get('subject') +
        '\nКлас: ' + d.get('grade') +
        '\nПовідомлення: ' + d.get('message');
      window.location.href = 'mailto:' + email +
        '?subject=' + encodeURIComponent('Запис на заняття — ФізикаPRO') +
        '&body=' + encodeURIComponent(body);
      var note = document.getElementById('signup-note');
      if (note) note.textContent = 'Якщо поштова програма не відкрилася, напишіть на ' + email + ' або в Telegram.';
    });
  }
})();
