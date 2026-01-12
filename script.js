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
   3. SLIDER DE VIDEOS Y BOTÓN DINÁMICO
   ========================================= */
let currentSlide = 0;
let autoSlideTimer;

function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000); // Cambio cada 5 segundos
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.video-slide');
    if (slides.length === 0) return;

    // Pausar video actual
    slides[currentSlide].classList.remove('active');
    const oldVideo = slides[currentSlide].querySelector('video');
    if (oldVideo) oldVideo.pause();

    // Calcular siguiente
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Activar nuevo slide
    slides[currentSlide].classList.add('active');

    // Reproducir nuevo video
    const newVideo = slides[currentSlide].querySelector('video');
    if (newVideo) {
        newVideo.currentTime = 0; 
        newVideo.play().catch(error => console.log("Autoplay bloqueado:", error));
    }

    // Actualizar color de WhatsApp si existe el botón en el slider
    updateWhatsappColor(currentSlide, slides[currentSlide]);
    startAutoSlide();
}

function updateWhatsappColor(index, activeSlide) {
    const btn = activeSlide.querySelector('.btn-whatsapp-slider');
    if (!btn) return;

    const colors = ["#25d366", "#a30000", "#000000", "#000000", "#007bff", "#007bff"];
    btn.style.backgroundColor = colors[index] || "#25d366";
}

/* =========================================
   4. GALERÍA DE PRODUCTOS (lattafa.html)
   ========================================= */
function changeMainImage(newSrc) {
    const mainImg = document.getElementById('main-product-img');
    if (mainImg) {
        // Efecto visual de desvanecimiento
        mainImg.style.opacity = '0.3';
        
        setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
        }, 150);
    }
}

/* =========================================
   5. FILTROS Y OTROS
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
   6. INICIALIZACIÓN
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar Slider de videos
    const hasSlider = document.querySelector('.video-slider');
    if (hasSlider) {
        const firstSlide = document.querySelector('.video-slide.active');
        if (firstSlide) updateWhatsappColor(0, firstSlide);
        startAutoSlide();
    }
});

/* =========================================
   7. ENVÍO DE FORMULARIO DIRECTO A GMAIL WEB
   ========================================= */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const name = document.getElementById('form-name').value;
        const phone = document.getElementById('form-phone').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        const targetEmail = "Mauveximport@gmail.com";
        const subject = encodeURIComponent(`Nuevo mensaje de: ${name}`);
        
        // Cuerpo del mensaje formateado para Gmail
        const bodyText = `Hola Mauvex Import,%0D%0A%0D%0A` +
                         `Datos del interesado:%0D%0A` +
                         `- Nombre: ${name}%0D%0A` +
                         `- Teléfono: ${phone}%0D%0A` +
                         `- Email: ${email}%0D%0A%0D%0A` +
                         `Mensaje:%0D%0A${message}`;

        // OPCIÓN A: Forzar apertura en GMAIL WEB (Pestaña nueva)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${bodyText}`;
        
        window.open(gmailUrl, '_blank');
    });
}


/* =========================================
   ENVÍO NEWSLETTER A WHATSAPP (+1 317 650-2892)
   ========================================= */
const importForm = document.getElementById('import-form');

if (importForm) {
    importForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se refresque

        // Capturar el nombre del input
        const fullName = document.getElementById('import-name').value;
        const phoneNumber = "13176502892"; // Formato internacional sin símbolos

        // Construir el mensaje personalizado
        // El espacio vacío "soy de _________" queda listo para que el usuario rellene su ubicación
        const message = `Hola soy ${fullName}, soy de _________ deseo aprender a importar mi primer producto con ustedes.`;
        
        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear el enlace final
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Abrir en una pestaña nueva
        window.open(whatsappUrl, '_blank');
    });
}
