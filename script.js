// Función para contactar por WhatsApp
function contactar(tipo) {
const timestamp = new Date().toLocaleDateString();
    const mensajes = {
        'retazos': `¡Hola! Me interesa el stock de Retazos Clasificados (Ref: ${timestamp}). ¿Tienen disponibilidad de colores naturales?`,
        'fibra': `Hola Raíz Textil. Deseo información sobre la Fibra Corta para un proyecto de biopolímeros/relleno.`,
        'kit': `¡Hola! Quiero el Kit Creativo Circular para experimentar con algodón nativo.`,
        'vender': `Hola, soy productor y tengo subproductos de algodón nativo. Me gustaría unirme al marketplace.`,
        'comprar': `Hola, soy diseñador y busco materiales circulares de origen peruano.`
    };
    
    const mensaje = mensajes[tipo] || 'Hola, quisiera más información sobre Raíz Textil.';
    const telefono = '51945184212'; // Reemplaza con tu número real
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
}

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animar
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.problem-card, .product-card, .impact-card, .step');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Validación de formulario (si se agrega un formulario)
function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll('input[required], textarea[required]');
    let esValido = true;
    
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.style.borderColor = '#dc3545';
            esValido = false;
        } else {
            campo.style.borderColor = '#28a745';
        }
    });
    
    return esValido;
}

// Función para copiar al portapapeles (útil para compartir)
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        // Mostrar notificación de éxito
        mostrarNotificacion('Enlace copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
    });
}

// Función para mostrar notificaciones temporales
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-green, #2D5016);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Analytics simple (puedes conectar con Google Analytics)
function trackEvent(action, category = 'Engagement', label = '') {
    // Si tienes Google Analytics instalado
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Log para desarrollo
    console.log('Event tracked:', { category, action, label });
}

// Track clicks en botones importantes
document.addEventListener('DOMContentLoaded', function() {
    // Track clicks en botones de productos
    document.querySelectorAll('button[onclick^="contactar"]').forEach(boton => {
        boton.addEventListener('click', function() {
            const tipo = this.getAttribute('onclick').match(/contactar\('(\w+)'\)/)[1];
            trackEvent('product_click', 'Products', tipo);
        });
    });
    
    // Track clicks en navegación
    document.querySelectorAll('.nav-menu a').forEach(enlace => {
        enlace.addEventListener('click', function() {
            trackEvent('nav_click', 'Navigation', this.textContent);
        });
    });
});

// Función para compartir en redes sociales
function compartirRedSocial(red, url = window.location.href, texto = 'Raíz Textil - Marketplace circular de algodón nativo del Perú') {
    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`
    };
    
    if (urls[red]) {
        window.open(urls[red], '_blank', 'width=600,height=400');
        trackEvent('share', 'Social', red);
    }
}

// Detectar dispositivo móvil
function esDispositivoMovil() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones para móvil
if (esDispositivoMovil()) {
    document.addEventListener('DOMContentLoaded', function() {
        // Ajustar tamaños de fuente en móvil
        document.querySelectorAll('h1').forEach(h1 => {
            h1.style.fontSize = '2rem';
        });
        
        // Hacer botones más grandes en móvil
        document.querySelectorAll('.btn').forEach(btn => {
            btn.style.padding = '1rem 2rem';
            btn.style.fontSize = '1.125rem';
        });
    });
}