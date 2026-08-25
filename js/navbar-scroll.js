window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  // Se for a página inicial (navbar-home), não faz nada
  if (navbar.classList.contains('navbar-home')) return;
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
