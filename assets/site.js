const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('header nav');

if (menuButton && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    menuButton.textContent = '☰';
  };

  menuButton.addEventListener('click', () => {
    const open = !siteNav.classList.contains('is-open');
    siteNav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menuButton.textContent = open ? '×' : '☰';
  });

  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}
