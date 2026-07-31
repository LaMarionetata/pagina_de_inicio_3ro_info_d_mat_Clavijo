document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMACIÓN FADE-IN DE CARGA
    const fadeWrapper = document.querySelector('.fade-wrapper');
    if (fadeWrapper) {
        setTimeout(() => {
            fadeWrapper.classList.add('loaded');
        }, 100);
    }

    // 2. MENÚ HAMBURGUESA RESPONSIVO
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. AUTO-FORMATO A MAYÚSCULAS PARA LA PLACA
    const placaInput = document.getElementById('placaInput');
    if (placaInput) {
        placaInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }

    // 4. GALERÍA DE VIDEOS INTERACTIVA CON TRANSICIÓN
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const videoSource = document.getElementById('videoSource');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const videoThumbs = document.querySelectorAll('.video-thumb');

    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remover clase activa de todos
            videoThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Obtener datos de la miniatura clickeada
            const newVideoSrc = thumb.getAttribute('data-video');
            const newTitle = thumb.getAttribute('data-title');
            const newDesc = thumb.getAttribute('data-desc');

            // Transición suave al cambiar de video
            mainVideoPlayer.style.opacity = '0';
            setTimeout(() => {
                videoSource.setAttribute('src', newVideoSrc);
                videoTitle.innerText = newTitle;
                videoDesc.innerText = newDesc;
                
                mainVideoPlayer.load();
                mainVideoPlayer.play();
                mainVideoPlayer.style.opacity = '1';
            }, 300);
        });
    });

    // 5. NAVEGACIÓN Y SCROLL SUAVE A SERVICIOS
    const btnReservar = document.getElementById('btnReservar');
    const navReservaBtn = document.getElementById('navReservaBtn');

    const scrollToServicios = () => {
        const target = document.getElementById('servicios');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (btnReservar) btnReservar.addEventListener('click', scrollToServicios);
    if (navReservaBtn) navReservaBtn.addEventListener('click', scrollToServicios);

    // 6. CONTROL DE MODAL DETALLADO PARA SERVICIOS/PRODUCTOS
    const productModal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const productCards = document.querySelectorAll('.product-card');

    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalTime = document.getElementById('modalTime');
    const modalDescription = document.getElementById('modalDescription');
    const modalBadge = document.getElementById('modalBadge');
    const modalImg = document.getElementById('modalImg');
    const confirmProductBtn = document.getElementById('confirmProductBtn');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const price = card.getAttribute('data-price');
            const time = card.getAttribute('data-time');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-img');
            const badge = card.querySelector('.card-badge').innerText;

            modalTitle.innerText = title;
            modalPrice.innerText = price;
            modalTime.innerText = `⏱ ${time}`;
            modalDescription.innerText = desc;
            modalBadge.innerText = badge;
            if (modalImg) modalImg.src = img;

            productModal.classList.add('active');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => productModal.classList.remove('active'));
    }

    window.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });

    if (confirmProductBtn) {
        confirmProductBtn.addEventListener('click', () => {
            const chosenService = modalTitle.innerText;
            const userPlaca = placaInput && placaInput.value.trim() !== "" ? placaInput.value : "NO REGISTRADA";
            
            alert(`✅ ¡Servicio Agendado!\n\n🚘 Placa del Auto: ${userPlaca}\n✨ Plan Seleccionado: ${chosenService}\n\nTe esperamos en nuestras instalaciones.`);
            productModal.classList.remove('active');
        });
    }
});