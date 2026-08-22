// ==========================================
// GALERIA - RePercussion Trio
// ==========================================


// ==========================================
// FOTOGRAFIAS
// ==========================================

const photos = [
    {
        thumb: 'imagens/galeria/foto1.jpg',
        full: 'imagens/galeria/foto1.jpg',
        alt: 'RePercussion Trio',
        size: 'large'
    },
    {
        thumb: 'imagens/galeria/foto2.jpg',
        full: 'imagens/galeria/foto2.jpg',
        alt: 'Membro 1',
        size: 'small'
    }

    // Podes adicionar mais fotografias aqui:
    //
    // {
    //     thumb: 'imagens/galeria/foto3.jpg',
    //     full: 'imagens/galeria/foto3.jpg',
    //     alt: 'RePercussion Trio',
    //     size: 'medium'
    // }
];


// ==========================================
// VÍDEOS YOUTUBE
// ==========================================

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


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    loadMasonryGallery();

    initLightbox();

    initYouTubeModal();

});


// ==========================================
// CARREGAR GALERIA MASONRY
// ==========================================

function loadMasonryGallery() {

    const masonry = document.getElementById('gallery-masonry');

    if (!masonry) {
        console.error('Elemento #gallery-masonry não encontrado.');
        return;
    }

    // Limpa a galeria antes de carregar
    masonry.innerHTML = '';

    // Array que vai misturar fotografias e vídeos
    const galleryItems = [];


    // ======================================
    // ADICIONAR FOTOGRAFIAS
    // ======================================

    photos.forEach((photo, index) => {

        galleryItems.push({
            type: 'photo',
            data: photo,
            index: index
        });

    });


    // ======================================
    // ADICIONAR VÍDEOS
    // ======================================

    videos.forEach((video, index) => {

        galleryItems.push({
            type: 'video',
            data: video,
            index: index
        });

    });


    // ======================================
    // MISTURAR OS ELEMENTOS
    // ======================================

    const shuffledItems = shuffleArray(galleryItems);


    // ======================================
    // RENDERIZAR
    // ======================================

    shuffledItems.forEach((item) => {

        if (item.type === 'photo') {

            const photoDiv = createPhotoItem(
                item.data,
                item.index
            );

            masonry.appendChild(photoDiv);

        } else {

            const videoDiv = createVideoItem(
                item.data,
                item.index
            );

            masonry.appendChild(videoDiv);

        }

    });

}


// ==========================================
// CRIAR ITEM DE FOTOGRAFIA
// ==========================================

function createPhotoItem(photo, index) {

    const div = document.createElement('div');


    // Classe baseada no tamanho definido na fotografia
    div.className = `gallery-item photo-item size-${photo.size}`;


    div.innerHTML = `

        <img
            src="${photo.thumb}"
            alt="${photo.alt}"
            class="gallery-photo"
            data-index="${index}"
        >

        <div class="photo-overlay">

            <i class="fas fa-search-plus"></i>

        </div>

    `;


    // Abrir Lightbox ao clicar
    div.addEventListener('click', function () {

        openLightbox(index);

    });


    return div;

}


// ==========================================
// CRIAR ITEM DE VÍDEO
// ==========================================

function createVideoItem(video, index) {

    const div = document.createElement('div');


    // ======================================
    // TAMANHOS DIFERENTES DOS VÍDEOS
    // ======================================

    const videoSizes = [

        'size-large',
        'size-medium',
        'size-small',
        'size-large',
        'size-medium',
        'size-small'

    ];


    const selectedSize =
        videoSizes[index % videoSizes.length];


    div.className =
        `gallery-item video-item ${selectedSize}`;


    div.innerHTML = `

        <div class="video-thumbnail">

            <img
                src="${video.thumb}"
                alt="${video.title}"
                class="video-thumb-img"
            >

            <div class="video-play-icon">

                <i class="fas fa-play"></i>

            </div>

        </div>


        <div class="video-info-card">

            <h3 class="video-title">
                ${video.title}
            </h3>

            <p class="video-meta">
                ${video.composer}
            </p>

            <p class="video-year">
                ${video.year}
            </p>

        </div>

    `;


    // Abrir YouTube ao clicar
    div.addEventListener('click', function () {

        openYouTubeModal(video.id);

    });


    return div;

}


// ==========================================
// FUNÇÃO PARA MISTURAR ELEMENTOS
// ==========================================

function shuffleArray(array) {

    const newArray = [...array];


    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));


        [
            newArray[i],
            newArray[j]
        ] =
        [
            newArray[j],
            newArray[i]
        ];

    }


    return newArray;

}


// ==========================================
// LIGHTBOX DAS FOTOGRAFIAS
// ==========================================

function initLightbox() {

    const lightbox =
        document.getElementById('lightbox');

    const closeBtn =
        document.querySelector('.lightbox-close');

    const prevBtn =
        document.getElementById('lightbox-prev');

    const nextBtn =
        document.getElementById('lightbox-next');


    if (!lightbox) {
        return;
    }


    // Fechar
    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            closeLightbox
        );

    }


    // Anterior
    if (prevBtn) {

        prevBtn.addEventListener(
            'click',
            function () {

                navigateLightbox(-1);

            }
        );

    }


    // Seguinte
    if (nextBtn) {

        nextBtn.addEventListener(
            'click',
            function () {

                navigateLightbox(1);

            }
        );

    }


    // Clicar fora da imagem fecha
    lightbox.addEventListener(
        'click',
        function (e) {

            if (e.target === lightbox) {

                closeLightbox();

            }

        }
    );


    // Teclado
    document.addEventListener(
        'keydown',
        function (e) {

            if (
                lightbox.style.display === 'flex'
            ) {

                if (e.key === 'ArrowLeft') {

                    navigateLightbox(-1);

                }

                if (e.key === 'ArrowRight') {

                    navigateLightbox(1);

                }

                if (e.key === 'Escape') {

                    closeLightbox();

                }

            }

        }
    );

}


// ==========================================
// ABRIR LIGHTBOX
// ==========================================

function openLightbox(index) {

    const lightbox =
        document.getElementById('lightbox');

    const lightboxImage =
        document.getElementById('lightbox-image');


    if (!lightbox || !lightboxImage) {
        return;
    }


    lightboxImage.src =
        photos[index].full;


    lightboxImage.alt =
        photos[index].alt;


    lightbox.style.display = 'flex';


    lightbox.dataset.currentIndex =
        index;


    document.body.style.overflow =
        'hidden';

}


// ==========================================
// FECHAR LIGHTBOX
// ==========================================

function closeLightbox() {

    const lightbox =
        document.getElementById('lightbox');


    if (!lightbox) {
        return;
    }


    lightbox.style.display =
        'none';


    document.body.style.overflow =
        'auto';

}


// ==========================================
// NAVEGAR LIGHTBOX
// ==========================================

function navigateLightbox(direction) {

    const lightbox =
        document.getElementById('lightbox');


    let currentIndex =
        parseInt(
            lightbox.dataset.currentIndex
        ) || 0;


    let newIndex =
        currentIndex + direction;


    // Voltar ao último
    if (newIndex < 0) {

        newIndex =
            photos.length - 1;

    }


    // Voltar ao primeiro
    if (newIndex >= photos.length) {

        newIndex = 0;

    }


    openLightbox(newIndex);

}


// ==========================================
// MODAL YOUTUBE
// ==========================================

function initYouTubeModal() {

    const modal =
        document.getElementById('youtube-modal');

    const closeBtn =
        document.querySelector('.youtube-close');


    if (!modal) {
        return;
    }


    // Fechar botão X
    if (closeBtn) {

        closeBtn.addEventListener(
            'click',
            closeYouTubeModal
        );

    }


    // Clicar fora
    modal.addEventListener(
        'click',
        function (e) {

            if (e.target === modal) {

                closeYouTubeModal();

            }

        }
    );


    // ESC
    document.addEventListener(
        'keydown',
        function (e) {

            if (
                modal.style.display === 'flex' &&
                e.key === 'Escape'
            ) {

                closeYouTubeModal();

            }

        }
    );

}


// ==========================================
// ABRIR YOUTUBE
// ==========================================

function openYouTubeModal(videoId) {

    const modal =
        document.getElementById('youtube-modal');

    const iframe =
        document.getElementById('youtube-iframe');


    if (!modal || !iframe) {
        return;
    }


    iframe.src =
        `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;


    modal.style.display =
        'flex';


    document.body.style.overflow =
        'hidden';

}


// ==========================================
// FECHAR YOUTUBE
// ==========================================

function closeYouTubeModal() {

    const modal =
        document.getElementById('youtube-modal');

    const iframe =
        document.getElementById('youtube-iframe');


    if (!modal || !iframe) {
        return;
    }


    // Para o vídeo
    iframe.src = '';


    modal.style.display =
        'none';


    document.body.style.overflow =
        'auto';

}
