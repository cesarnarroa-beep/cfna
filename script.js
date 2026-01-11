/* =========================================
   1. SISTEMA DE MENÚ LATERAL (SIDEBAR)
   ========================================= */
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function toggleSubmenu(event, element) {
    event.stopPropagation();
    const parent = element.parentElement;
    parent.classList.toggle('open');
}

/* =========================================
   2. BUSCADOR Y FILTRADO DE PRODUCTOS
   ========================================= */
function toggleSearch() {
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    }
}

function filterProducts() {
    const searchInput = document.getElementById('catalog-search');
    if (!searchInput) return;

    const input = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const nameElement = product.querySelector('.product-name');
        const brandElement = product.querySelector('.product-brand');
        
        if (nameElement && brandElement) {
            const name = nameElement.innerText.toLowerCase();
            const brand = brandElement.innerText.toLowerCase();
            
            // Filtra si el texto coincide con nombre o marca
            if (name.includes(input) || brand.includes(input)) {
                product.style.display = ""; 
            } else {
                product.style.display = "none"; 
            }
        }
    });
}

/* =========================================
   3. LÓGICA PARA EL SLIDER DE VIDEOS (JOHN IMPORT)
   ========================================= */
let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides.length === 0) return; // Si no hay slider, no hace nada

    // 1. Quitar clase activa del video actual y pausarlo
    slides[currentSlide].classList.remove('active');
    const oldVideo = slides[currentSlide].querySelector('video');
    if (oldVideo) {
        oldVideo.pause();
    }

    // 2. Calcular el índice del siguiente slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // 3. Activar el nuevo slide
    slides[currentSlide].classList.add('active');

    // 4. Reiniciar y reproducir el nuevo video
    const newVideo = slides[currentSlide].querySelector('video');
    if (newVideo) {
        newVideo.currentTime = 0; 
        newVideo.play().catch(error => {
            console.log("Autoplay prevenido: ", error);
        });
    }
}

/* =========================================
   4. CONTROL POR TECLADO (FLECHAS)
   ========================================= */
document.addEventListener('keydown', (event) => {
    // Solo permite el cambio si existe un slider en la página
    const hasSlider = document.querySelector('.video-slider');
    
    if (hasSlider) {
        if (event.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (event.key === "ArrowRight") {
            changeSlide(1);
        }
    }
});