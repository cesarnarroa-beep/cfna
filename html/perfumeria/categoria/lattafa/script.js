/* =========================================
   1. GALERÍA DE IMÁGENES (CAMBIO DE FOTO)
   ========================================= */
function changeMainImage(src) {
    const mainImg = document.getElementById('main-product-img');
    
    if (mainImg) {
        // Efecto de transición suave (opacidad)
        mainImg.style.opacity = '0';
        
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
        }, 150);
    }
}

/* =========================================
   2. CONFIGURACIÓN DINÁMICA DE WHATSAPP
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const btnBuy = document.querySelector('.btn-buy');
    const productNameElement = document.querySelector('.product-info-panel h1');
    const phoneNumber = "51992956034";
    
    // Si el botón existe, genera el mensaje automáticamente con el nombre del perfume
    if (btnBuy && productNameElement) {
        const productName = productNameElement.innerText;
        const message = `Hola, estoy interesado en el perfume ${productName}. Deseo comprarlo o reservarlo.`;
        const encodedMessage = encodeURIComponent(message);
        btnBuy.setAttribute('href', `https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    }
});

/* =========================================
   3. ENVÍO DE FORMULARIO A GMAIL WEB
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
        
        // Formateo del cuerpo del correo
        const bodyText = `Hola Mauvex Import,%0D%0A%0D%0A` +
                         `Datos del interesado:%0D%0A` +
                         `- Nombre: ${name}%0D%0A` +
                         `- Teléfono: ${phone}%0D%0A` +
                         `- Email: ${email}%0D%0A%0D%0A` +
                         `Mensaje:%0D%0A${message}`;

        // Abre Gmail en una pestaña nueva con los datos listos
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${bodyText}`;
        
        window.open(gmailUrl, '_blank');
    });
}