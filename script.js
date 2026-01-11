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
    parent.classList.toggle('active'); 
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
            
            if (name.includes(input) || brand.includes(input)) {
                product.style.display = ""; 
            } else {
                product.style.display = "none"; 
            }
        }
    });
}

/* =========================================
   3. LÓGICA PARA EL SLIDER DE VIDEOS Y BOTÓN DINÁMICO
   ========================================= */
let currentSlide = 0;
let autoSlideTimer;

function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000); // 5 segundos para que de tiempo a ver el video
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides.length === 0) return;

    // 1. Quitar clase activa del video actual y pausarlo
    slides[currentSlide].classList.remove('active');
    const oldVideo = slides[currentSlide].querySelector('video');
    if (oldVideo) oldVideo.pause();

    // 2. Calcular el índice del siguiente slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // 3. Activar el nuevo slide
    slides[currentSlide].classList.add('active');

    // 4. Reiniciar y reproducir el nuevo video
    const newVideo = slides[currentSlide].querySelector('video');
    if (newVideo) {
        newVideo.currentTime = 0; 
        newVideo.play().catch(error => console.log("Autoplay bloqueado:", error));
    }

    // 5. CAMBIAR COLOR DEL BOTÓN DE WHATSAPP SEGÚN EL SLIDE
    updateWhatsappColor(currentSlide, slides[currentSlide]);

    // 6. Reiniciar temporizador
    startAutoSlide();
}

// Función específica para los colores del botón
function updateWhatsappColor(index, activeSlide) {
    const btn = activeSlide.querySelector('.btn-whatsapp-slider');
    if (!btn) return;

    // Lógica de colores (ajusta los colores a tu gusto)
    if (index === 0) {
        btn.style.backgroundColor = "#25d366"; // Verde (Perfumes)
    } else if (index === 1) {
        btn.style.backgroundColor = "#a30000"; // Rojo (Fragancias)
    } else if (index === 2 || index === 3) {
        btn.style.backgroundColor = "#000000"; // Negro (Relojes)
    } else if (index === 4 || index === 5) {
        btn.style.backgroundColor = "#007bff"; // Azul (iPhones)
    }
}

/* =========================================
   4. FILTROS DEL CATÁLOGO (PERFUMES.HTML)
   ========================================= */
function toggleMainFilters() {
    const content = document.getElementById('all-filters-content');
    if (content) content.classList.toggle('hidden');
}

function toggleFilterGroup(element) {
    const parent = element.parentElement;
    parent.classList.toggle('active');
}

/* =========================================
   5. INICIALIZACIÓN
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar slider si existe en la página
    const hasSlider = document.querySelector('.video-slider');
    if (hasSlider) {
        // Inicializar el color del primer slide al cargar
        const firstSlide = document.querySelector('.video-slide.active');
        if (firstSlide) updateWhatsappColor(0, firstSlide);
        startAutoSlide();
    }
});
