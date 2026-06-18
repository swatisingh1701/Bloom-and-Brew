const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const backTop = document.getElementById('backTop');
const reserveForm = document.getElementById('reserveForm');
const formMsg = document.getElementById('formMsg');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  themeToggle.classList.add('active');
  themeToggle.setAttribute('data-on', 'true');
}

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';

  if (isDark) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.classList.remove('active');
    themeToggle.setAttribute('data-on', 'false');
  } else {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.classList.add('active');
    themeToggle.setAttribute('data-on', 'true');
  }
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);

  const links = [...document.querySelectorAll('.nav-links a')];
  let current = 'home';

  document.querySelectorAll('main section, main').forEach(section => {
    if (section.id && section.offsetTop - 140 <= window.scrollY) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

backTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('date').value;

  const emailPattern = /\S+@\S+\.\S+/;
  const isValid = name && emailPattern.test(email) && guests && date;

  if (isValid) {
    formMsg.textContent = `Thanks, ${name}! Your reservation request has been confirmed successfully.`;
    formMsg.style.color = '#2d8a57';
    reserveForm.reset();
  } else {
    formMsg.textContent = 'Please fill in all required fields correctly before submitting.';
    formMsg.style.color = '#c84d4d';
  }
});

const backTopFooter = document.getElementById('backTopFooter');

if (backTopFooter) {
  backTopFooter.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
