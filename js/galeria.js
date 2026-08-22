// Lightbox para fotos
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');

// Click em fotos
document.querySelectorAll('.gallery-item.photo img').forEach(photo => {
    photo.addEventListener('click', function() {
        lightbox.classList.add('active');
        lightboxContent.src = this.src;
    });
});

// Fechar lightbox
lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});
