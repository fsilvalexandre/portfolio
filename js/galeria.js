// Gallery Photos Data
const photos = [
    {
        thumb: 'imagens/galeria/foto1.jpg',
        full: 'imagens/galeria/foto1.jpg',
        alt: 'RePercussion Trio',
        size: 'small' // large, medium, small
    },
    {
        thumb: 'imagens/galeria/foto2.jpg',
        full: 'iimagens/galeria/foto2.jpg',
        alt: 'Membro 1',
        size: 'medium'
        }
];

// YouTube Videos Data
const videos = [    
    {
        id: 'EwRCXJEFdnM',
        title: 'BK',
        composer: 'Maria Vittoria Agresti',
        year: '2024',
        thumb: 'https://img.youtube.com/vi/EwRCXJEFdnM/maxresdefault.jpg'
    },
    {
        id: 'NGF_QhZKx_s',
        title: 'Musique de Table',
        composer: 'Thierry de Mey',
        year: '1987',
        thumb: 'https://img.youtube.com/vi/NGF_QhZKx_s/maxresdefault.jpg'
    },
    {
        id: 'Ixwtmh-hVBk',
        title: 'Psychedelic Industrial',
        composer: 'Carlos Guedes',
        year: '2022',
        thumb: 'https://img.youtube.com/vi/Ixwtmh-hVBk/maxresdefault.jpg'
    },
    {
        id: '-1yYJOTor2Y',
        title: 'VUOI CHE NEL FUORI',
        composer: 'Marco Momi',
        year: '2020',
        thumb: 'https://img.youtube.com/vi/-1yYJOTor2Y/maxresdefault.jpg'
    },
    {
        id: 'pVqMi05E52M',
        title: 'Pointless Dream',
        composer: 'Olívia Silva',
        year: '2020',
        thumb: 'https://img.youtube.com/vi/pVqMi05E52M/maxresdefault.jpg'
    },
    {
        id: 'gR9JXiznWq0',
        title: 'Zoom in Zoom out',
        composer: 'Luís Tinoco',
        year: '2009',
        thumb: 'https://img.youtube.com/vi/gR9JXiznWq0/maxresdefault.jpg'
    }
];

// Initialize Gallery
document.addEventListener('DOMContentLoaded', function() {
    loadMasonryGallery();
    initLightbox();
    initYouTubeModal();
});

// Load Masonry Gallery
function loadMasonryGallery() {
    const masonry = document.getElementById('gallery-masonry');
    
    // Mix photos and videos for better layout
    let galleryItems = [];
    
    // Add first photo (large)
    galleryItems.push({ type: 'photo', data: photos[0], index: 0 });
    
    // Add first video (featured)
    galleryItems.push({ type: 'video', data: videos[0] });
    
    // Add remaining photos
    for (let i = 1; i < photos.length; i++) {
        galleryItems.push({ type: 'photo', data: photos[i], index: i });
    }
    
    // Add remaining videos scattered
    for (let i = 1; i < videos.length; i++) {
        galleryItems.push({ type: 'video', data: videos[i] });
    }
    
    // Render items
    galleryItems.forEach((item) => {
        if (item.type === 'photo') {
            const photoDiv = createPhotoItem(item.data, item.index);
            masonry.appendChild(photoDiv);
        } else {
            const videoDiv = createVideoItem(item.data);
            masonry.appendChild(videoDiv);
        }
    });
}

// Create Photo Item
function createPhotoItem(photo, index) {
    const div = document.createElement('div');
    div.className = `gallery-item photo-item size-${photo.size}`;
    div.innerHTML = `
        <img src="${photo.thumb}" alt="${photo.alt}" class="gallery-photo" data-index="${index}">
        <div class="photo-overlay">
            <i class="fas fa-search-plus"></i>
        </div>
    `;
    
    div.addEventListener('click', () => openLightbox(index));
    return div;
}

// Create Video Item
function createVideoItem(video) {
    const div = document.createElement('div');
    div.className = 'gallery-item video-item';
    div.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumb}" alt="${video.title}" class="video-thumb-img">
            <div class="video-play-icon">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="video-info-card">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-meta">${video.composer}</p>
            <p class="video-year">${video.year}</p>
        </div>
    `;
    
    div.addEventListener('click', () => openYouTubeModal(video.id));
    return div;
}

// ===== LIGHTBOX PARA FOTOS =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'Escape') closeLightbox();
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxImage.src = photos[index].full;
    lightboxImage.alt = photos[index].alt;
    lightbox.style.display = 'flex';
    lightbox.dataset.currentIndex = index;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    const lightbox = document.getElementById('lightbox');
    let currentIndex = parseInt(lightbox.dataset.currentIndex) || 0;
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;
    
    openLightbox(newIndex);
}

// ===== YOUTUBE MODAL PARA VÍDEOS =====
function initYouTubeModal() {
    const modal = document.getElementById('youtube-modal');
    const closeBtn = document.querySelector('.youtube-close');
    
    closeBtn.addEventListener('click', closeYouTubeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeYouTubeModal();
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex' && e.key === 'Escape') {
            closeYouTubeModal();
        }
    });
}

function openYouTubeModal(videoId) {
    const modal = document.getElementById('youtube-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeYouTubeModal() {
    const modal = document.getElementById('youtube-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
