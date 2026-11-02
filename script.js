/* Astro's African Foodies - site scripts */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Mobile menu ---------- */
  const nav = $('.main-nav'), header = $('.site-header');
  if (nav && header) {
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '\u2630';
    header.insertBefore(btn, nav);
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  /* ---------- Today's special highlight ---------- */
  // Menu order is Monday..Sunday; JS getDay() is Sunday=0
  const today = new Date().getDay();
  const dayIndex = (today + 6) % 7;
  const mark = el => {
    if (!el) return;
    el.classList.add('is-today');
    const b = document.createElement('span');
    b.className = 'today-badge';
    b.textContent = "Today's special";
    el.appendChild(b);
  };
  mark($$('.menu-card')[dayIndex]);
  mark($$('.strip-item')[dayIndex]);

  /* ---------- Order builder (Munchies) ---------- */
  const cards = $$('.menu-card');
  if (cards.length) {
    const order = {};
    const bar = document.createElement('div');
    bar.className = 'order-bar';
    bar.innerHTML = '<div class="order-lines"></div><div class="order-foot"><strong class="total"></strong><span><button type="button" class="clear">Clear</button> <button type="button" class="place">Place order</button></span></div>';
    document.body.appendChild(bar);
    const lines = $('.order-lines', bar), totalEl = $('.total', bar);

    const render = () => {
      const names = Object.keys(order);
      bar.classList.toggle('show', names.length > 0);
      let total = 0, count = 0;
      lines.innerHTML = '';
      names.forEach(n => {
        const it = order[n];
        total += it.price * it.qty; count += it.qty;
        const row = document.createElement('div');
        row.className = 'order-line';
        row.innerHTML = '<span class="nm"></span><button type="button" aria-label="Remove one">\u2212</button><span>' + it.qty + '</span><button type="button" aria-label="Add one">+</button><span>R' + it.price * it.qty + '</span>';
        $('.nm', row).textContent = n;
        const [minus, plus] = $$('button', row);
        minus.onclick = () => { if (--it.qty <= 0) delete order[n]; render(); };
        plus.onclick = () => { it.qty++; render(); };
        lines.appendChild(row);
      });
      totalEl.textContent = count + (count === 1 ? ' item' : ' items') + ' \u2022 Total: R' + total;
    };

    cards.forEach(card => {
      const name = $('h3', card).innerText.replace(/\s+/g, ' ').trim();
      const price = parseInt($('.price-tag', card).textContent.replace(/\D/g, ''), 10);
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'add-btn';
      add.textContent = 'Add to order';
      add.onclick = () => {
        order[name] = order[name] || { price, qty: 0 };
        order[name].qty++;
        render();
      };
      card.appendChild(add);
    });

    $('.clear', bar).onclick = () => { Object.keys(order).forEach(k => delete order[k]); render(); };
    $('.place', bar).onclick = () => {
      const t = totalEl.textContent;
      Object.keys(order).forEach(k => delete order[k]);
      render();
      alert('Order placed! ' + t.split('\u2022')[1].trim() + '\nThank you for ordering from Astro\u2019s African Foodies.');
    };

    /* ---------- Image lightbox ---------- */
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt=""><div class="cap"></div>';
    document.body.appendChild(lb);
    const open = img => {
      $('img', lb).src = img.src;
      $('img', lb).alt = img.alt;
      $('.cap', lb).textContent = img.alt + ' \u2014 click anywhere to close';
      lb.classList.add('show');
    };
    $$('.menu-card img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(img));
      img.addEventListener('keydown', e => { if (e.key === 'Enter') open(img); });
    });
    lb.addEventListener('click', () => lb.classList.remove('show'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('show'); });
  }

  /* ---------- Form validation + show/hide password ---------- */
  const form = $('.form-card form');
  if (form) {
    form.noValidate = true;
    const f = id => form.elements[id];

    // show/hide toggle on password fields
    $$('input[type="password"]', form).forEach(input => {
      const wrap = document.createElement('div');
      wrap.className = 'pw-wrap';
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
      const t = document.createElement('button');
      t.type = 'button';
      t.className = 'pw-toggle';
      t.textContent = 'Show';
      t.onclick = () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        t.textContent = show ? 'Hide' : 'Show';
      };
      wrap.appendChild(t);
    });

    const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const rules = {
      fullname: v => v.trim().length < 2 ? 'Please enter your name.' : '',
      email: v => !v.trim() ? 'Email is required.' : !emailOk(v.trim()) ? 'Enter a valid email, e.g. name@example.com.' : '',
      password: v => !v ? 'Password is required.' : (f('confirm_password') && v.length < 8) ? 'Use at least 8 characters.' : '',
      confirm_password: v => v !== f('password').value ? 'Passwords do not match.' : '',
      message: v => v.trim().length < 10 ? 'Message should be at least 10 characters.' : ''
    };

    const setErr = (el, msg) => {
      let err = el.closest('.form-row').querySelector('.field-error');
      if (!err) {
        err = document.createElement('span');
        err.className = 'field-error';
        err.setAttribute('role', 'alert');
        el.closest('.form-row').appendChild(err);
      }
      err.textContent = msg;
      el.classList.toggle('invalid', !!msg);
    };
    const check = el => {
      const rule = rules[el.id];
      if (!rule) return true;
      const msg = rule(el.value);
      setErr(el, msg);
      return !msg;
    };

    const fields = $$('input, textarea', form).filter(el => rules[el.id]);
    fields.forEach(el => {
      el.addEventListener('blur', () => check(el));
      el.addEventListener('input', () => { if (el.classList.contains('invalid')) check(el); });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const results = fields.map(check);
      const firstBad = fields[results.indexOf(false)];
      let msg = $('.form-message', form);
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'form-message';
        form.appendChild(msg);
      }
      if (firstBad) {
        firstBad.focus();
        msg.textContent = 'Please fix the highlighted fields.';
        return;
      }
      const page = location.pathname.split('/').pop();
      if (page === 'signup.html') {
        msg.textContent = 'Account created! Taking you to login\u2026';
        setTimeout(() => location.href = 'login.html', 1200);
      } else if (page === 'login.html') {
        msg.textContent = 'Welcome back! Taking you to the menu\u2026';
        setTimeout(() => location.href = 'munchies.html', 1200);
      } else {
        msg.textContent = 'Thanks! Your message has been sent. We\u2019ll be in touch soon.';
        form.reset();
      }
    });
  }
});
