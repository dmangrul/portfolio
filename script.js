// ============================================
// PARTICLE SYSTEM
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// MOUSE TRACKER EFFECT
// ============================================
function initMouseTracker() {
    const tracker = document.createElement('div');
    tracker.className = 'mouse-tracker';
    document.body.appendChild(tracker);
    
    let mouseX = 0;
    let mouseY = 0;
    let trackerX = 0;
    let trackerY = 0;
    let isActive = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isActive) {
            isActive = true;
            tracker.classList.add('active');
        }
    });
    
    function animate() {
        trackerX += (mouseX - trackerX) * 0.1;
        trackerY += (mouseY - trackerY) * 0.1;
        
        tracker.style.left = trackerX - 10 + 'px';
        tracker.style.top = trackerY - 10 + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hide tracker when mouse leaves window
    document.addEventListener('mouseleave', () => {
        isActive = false;
        tracker.classList.remove('active');
    });
}

// ============================================
// INTERACTIVE GLOW EFFECTS ON MOUSE MOVE
// ============================================
function initInteractiveGlow() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / centerY;
            const angleY = (centerX - x) / centerX;
            
            const glowX = angleY * 20;
            const glowY = angleX * 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX * 5}deg) rotateY(${angleY * 5}deg) translateY(-5px)`;
            card.style.boxShadow = `
                ${glowX}px ${glowY}px 40px rgba(0, 217, 255, 0.3),
                0 0 60px rgba(0, 217, 255, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriter() {
    const texts = [
        'AI/ML Engineer',
        'Software Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    const typewriterElement = document.getElementById('typewriter');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ============================================
// PARALLAX EFFECT FOR SECTIONS
// ============================================
function initParallax() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                const speed = 0.5;
                section.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });
}

// ============================================
// FLOATING ANIMATION FOR CARDS
// ============================================
function initFloatingCards() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'floatCard 6s ease-in-out infinite';
    });
}

// Add floating animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatCard {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ============================================
// CURSOR TRAIL EFFECT (OPTIONAL ENHANCEMENT)
// ============================================
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.background = `rgba(0, 217, 255, ${0.3 - i * 0.03})`;
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.transition = 'opacity 0.3s';
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || { x, y };
            x += (nextDot.x - x) * 0.3;
            y += (nextDot.y - y) * 0.3;
            
            dot.x = x;
            dot.y = y;
            dot.element.style.left = x + 'px';
            dot.element.style.top = y + 'px';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initMouseTracker();
    initInteractiveGlow();
    initTypewriter();
    initNavbarScroll();
    initSmoothScroll();
    initMobileMenu();
    initSkillBars();
    initActiveNavLink();
    initCursorTrail();
    
    // Add fade-in animation on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 10));

