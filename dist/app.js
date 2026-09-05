(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const company = String(data.get('company') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();

      const subject = `Forespørsel fra ${company || name}`;
      const body = [
        `Navn: ${name}`,
        `Bedrift: ${company || 'Ikke oppgitt'}`,
        `Telefon: ${phone || 'Ikke oppgitt'}`,
        `E-post: ${email}`,
        '',
        message
      ].join('\n');

      const mailto = `mailto:kontakt@nin.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) status.textContent = 'E-postprogrammet ditt åpnes med meldingen ferdig utfylt.';
      window.location.href = mailto;
    });
  }
})();
