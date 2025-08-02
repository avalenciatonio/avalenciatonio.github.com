// Toyota Radio Calculator - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeParticleEffect();
});

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicializar animaciones
function initializeAnimations() {
    // Animación de aparición para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .spec-item, .download-content'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Efectos de scroll
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        // Efecto parallax en el fondo de estrellas
        const stars = document.querySelector('.stars');
        const twinkling = document.querySelector('.twinkling');
        
        if (stars) {
            stars.style.transform = `translateY(${parallax}px)`;
        }
        if (twinkling) {
            twinkling.style.transform = `translateY(${parallax * 0.8}px)`;
        }

        // Efecto de transparencia en la navbar
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(10, 10, 10, ${opacity})`;
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate);
}

// Elementos interactivos
function initializeInteractiveElements() {
    // Efecto de hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .spec-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación de botones
    const buttons = document.querySelectorAll('.btn, .download-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Contador animado para precios
    animateCounters();

    // Efecto especial para la imagen de la app
    initializeAppImageEffects();
}

// Contador animado
function animateCounters() {
    const counters = document.querySelectorAll('.amount');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('€', ''));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '€';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '€';
            }
        };
        
        // Iniciar animación cuando el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

// Efectos especiales para la imagen de la app
function initializeAppImageEffects() {
    const appImage = document.querySelector('.app-screenshot');
    
    if (appImage) {
        // Efecto de pulso sutil cada 4 segundos
        setInterval(() => {
            appImage.style.animation = 'none';
            setTimeout(() => {
                appImage.style.animation = 'subtle-pulse 1s ease-in-out';
            }, 50);
        }, 4000);
        
        // Efecto de interacción al hacer hover
        appImage.addEventListener('mouseenter', () => {
            appImage.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        appImage.addEventListener('mouseleave', () => {
            appImage.style.filter = 'brightness(1) saturate(1)';
        });
    }
}

// Función para escribir texto automáticamente
function typeText(element, text, speed) {
    let i = 0;
    element.value = '';
    
    function typeChar() {
        if (i < text.length) {
            element.value += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Efecto de partículas flotantes
function initializeParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    // Crear partículas
    for (let i = 0; i < 30; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #00D4FF, transparent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: float-up ${duration}s ${delay}s linear infinite;
        opacity: ${Math.random() * 0.5 + 0.2};
    `;
    
    container.appendChild(particle);
    
    // Eliminar partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container); // Crear nueva partícula
        }
    }, (duration + delay) * 1000);
}

// Agregar CSS para animaciones adicionales
const additionalStyles = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes subtle-pulse {
        0%, 100% { 
            transform: scale(1);
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.6),
                0 0 30px rgba(0, 212, 255, 0.3);
        }
        50% { 
            transform: scale(1.02);
            box-shadow: 
                0 30px 60px rgba(0, 0, 0, 0.7),
                0 0 40px rgba(0, 212, 255, 0.5);
        }
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .hero-visual .phone-container {
        position: relative;
    }
    
    @keyframes rotate-glow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Agregar estilos adicionales al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Función para manejar el menú móvil (si se implementa)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Activar efecto especial
        document.body.style.animation = 'rainbow-bg 2s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Agregar animación rainbow para easter egg
const rainbowStyles = `
    @keyframes rainbow-bg {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const rainbowSheet = document.createElement('style');
rainbowSheet.textContent = rainbowStyles;
document.head.appendChild(rainbowSheet);

// Optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imágenes (si las hubiera)
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Función para compartir en redes sociales
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Toyota Radio Calculator - Códigos de desbloqueo ERC');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Inicialización completa
console.log('🚗 Toyota Radio Calculator Landing Page - Inicializada');
console.log('💻 Desarrollado con tecnologías modernas');
console.log('🔧 Basado en algoritmo Mafon calculator');