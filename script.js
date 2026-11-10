const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

// The form opens the visitor's email application. Set your public email below
// before publishing if you want messages to be sent to a real inbox.
const portfolioEmail = ''; // Example: 'hello@example.com'
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!portfolioEmail) {
    formNote.textContent = 'Contact form is a demo. Add your public email in script.js to enable email sending.';
    formNote.style.color = '#f0bd7a';
    return;
  }

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(formData.get('subject'));
  const body = encodeURIComponent(
    'Name: ' + formData.get('name') + '\n' +
    'Email: ' + formData.get('email') + '\n\n' +
    formData.get('message')
  );
  window.location.href = 'mailto:' + portfolioEmail + '?subject=' + subject + '&body=' + body;
});