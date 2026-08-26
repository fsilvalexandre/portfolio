// ==========================================
// MENU HAMBURGER - MOBILE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  // Abrir/Fechar menu ao clicar no hamburger
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Fechar menu ao clicar num link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Fechar menu ao clicar fora (no overlay)
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Fechar menu com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});

// ==========================================
// NAVBAR SCROLL
// ==========================================

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  if (navbar.classList.contains('navbar-home')) return;
  
  const currentScrollY = window.scrollY;
  
  // Scrolling up -> navbar fixed
  if (currentScrollY < lastScrollY) {
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
  } 
  // Scrolling down -> navbar absolute
  else if (currentScrollY > 100) {
    navbar.style.position = 'absolute';
    navbar.style.top = (currentScrollY) + 'px';
  }
  
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

