// Portfolio Created by Deep Mangrulkar
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 40 : 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
        

        particle.style.background = '#000000';
        particle.style.opacity = Math.random() * 0.1 + 0.05;
        
        particlesContainer.appendChild(particle);
    }
}




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
    

    document.addEventListener('mouseleave', () => {
        isActive = false;
        tracker.classList.remove('active');
    });
}




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
            
            const glowX = angleY * 15;
            const glowY = angleX * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX * 3}deg) rotateY(${angleY * 3}deg) translateY(-8px)`;
            card.style.boxShadow = `
                ${glowX}px ${glowY}px 50px rgba(0, 0, 0, 0.15),
                0 0 80px rgba(0, 0, 0, 0.08)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}




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
            typeSpeed = 2000;
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
            

            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}




function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}




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




function initFloatingCards() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
        card.style.animation = 'floatCard 6s ease-in-out infinite';
    });
}


const style = document.createElement('style');
style.textContent = `
    @keyframes floatCard {
        0%, 100% { 
            transform: translateY(0px);
            opacity: 1;
        }
        50% { 
            transform: translateY(-12px);
            opacity: 0.98;
        }
    }
`;
document.head.appendChild(style);




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




function initPaintEffect() {
    const canvas = document.getElementById('paintCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    

    function resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
    }
    resizeCanvas();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();

            blobs = [];
        }, 150);
    });
    

    class PaintBlob {
        constructor(x, y, radius, vx, vy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.maxRadius = radius;
            this.vx = vx;
            this.vy = vy;
            this.life = 1.0;
            this.decay = 0.01;
            this.spread = 0.3;
        }
        
        update() {

            this.x += this.vx;
            this.y += this.vy;
            

            this.vx *= 0.95;
            this.vy *= 0.95;
            

            this.radius += this.spread;
            this.spread *= 0.98;
            

            this.life -= this.decay;
            

            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
        }
        
        draw(ctx) {
            if (this.life <= 0) return false;
            

            const baseOpacity = this.isBurst ? (this.burstOpacity || 0.6) : 0.25;
            const opacity = this.life * baseOpacity;
            const currentRadius = this.radius * (0.7 + this.life * 0.3);
            

            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, currentRadius
            );
            

            const centerOpacity = this.isBurst ? opacity * 1.2 : opacity;
            gradient.addColorStop(0, `rgba(0, 0, 0, ${Math.min(1, centerOpacity)})`);
            gradient.addColorStop(0.4, `rgba(0, 0, 0, ${opacity * 0.7})`);
            gradient.addColorStop(0.7, `rgba(0, 0, 0, ${opacity * 0.3})`);
            gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
            
            ctx.save();
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            return true;
        }
    }
    
    let blobs = [];

    const isMobile = window.innerWidth <= 768;
    const maxBlobs = isMobile ? 80 : 150;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseDown = false;
    let frameCount = 0;
    

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        

        if (speed > 2) {
            const blobCount = isMouseDown ? 3 : 1;
            const radius = isMouseDown ? 40 + Math.random() * 20 : 25 + Math.random() * 15;
            const velocityScale = isMouseDown ? 0.8 : 0.4;
            
            for (let i = 0; i < blobCount; i++) {
                const offsetX = (Math.random() - 0.5) * 30;
                const offsetY = (Math.random() - 0.5) * 30;
                const vx = dx * velocityScale + (Math.random() - 0.5) * 2;
                const vy = dy * velocityScale + (Math.random() - 0.5) * 2;
                
                blobs.push(new PaintBlob(
                    mouseX + offsetX,
                    mouseY + offsetY,
                    radius,
                    vx,
                    vy
                ));
            }
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });
    

    document.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        

        const burstCount = 20 + Math.floor(Math.random() * 15);
        
        for (let i = 0; i < burstCount; i++) {
            const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.3;
            const speed = 3 + Math.random() * 5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            const radius = 15 + Math.random() * 15;
            

            const burstBlob = new PaintBlob(
                clickX,
                clickY,
                radius,
                vx,
                vy
            );

            burstBlob.isBurst = true;
            burstBlob.burstOpacity = 0.6;
            
            blobs.push(burstBlob);
        }
    });
    
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });
    
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    document.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });
    

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        
        if (Math.sqrt(dx * dx + dy * dy) > 2) {
            blobs.push(new PaintBlob(
                mouseX,
                mouseY,
                30 + Math.random() * 15,
                dx * 0.5,
                dy * 0.5
            ));
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }, { passive: false });
    

    document.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const clickX = touch.clientX;
        const clickY = touch.clientY;
        

        const burstCount = 10 + Math.floor(Math.random() * 8);
        
        for (let i = 0; i < burstCount; i++) {
            const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.3;
            const speed = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            const radius = 12 + Math.random() * 12;
            

            const burstBlob = new PaintBlob(
                clickX,
                clickY,
                radius,
                vx,
                vy
            );

            burstBlob.isBurst = true;
            burstBlob.burstOpacity = 0.6;
            
            blobs.push(burstBlob);
        }
    }, { passive: false });
    

    function animate() {

        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        

        blobs = blobs.filter(blob => {
            blob.update();
            return blob.draw(ctx);
        });
        

        if (blobs.length > maxBlobs) {
            blobs = blobs.slice(-maxBlobs);
        }
        
        frameCount++;
        requestAnimationFrame(animate);
    }
    
    animate();
}




function initCursorTrail() {
    const trail = [];
    const trailLength = 12;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        const size = 4 - (i * 0.2);
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.borderRadius = '50%';
        dot.style.background = `rgba(0, 0, 0, ${0.4 - i * 0.03})`;
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.transition = 'opacity 0.2s';
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
            x += (nextDot.x - x) * 0.25;
            y += (nextDot.y - y) * 0.25;
            
            dot.x = x;
            dot.y = y;
            dot.element.style.left = x + 'px';
            dot.element.style.top = y + 'px';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}




function initTechBackground() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) {
        console.error('techCanvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    console.log('Tech background initialized');
    

    class MatrixColumn {
        constructor(x) {
            this.x = x;
            this.y = Math.random() * -canvas.height;
            this.speed = 20 + Math.random() * 30;
            this.chars = [];
            this.charCount = Math.floor(canvas.height / 20) + 5;
            this.initChars();
        }
        
        initChars() {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            for (let i = 0; i < this.charCount; i++) {
                this.chars.push({
                    char: chars[Math.floor(Math.random() * chars.length)],
                    brightness: Math.random()
                });
            }
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = -100;
                this.initChars();
            }
            

            this.chars.forEach((c, i) => {
                c.brightness = Math.max(0, c.brightness - 0.02);
                if (i === this.chars.length - 1) {
                    c.brightness = 1;
                }
            });
        }
        
        draw(ctx) {
            ctx.save();
            ctx.font = '14px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            
            this.chars.forEach((c, i) => {
                const y = this.y + i * 20;
                if (y > -20 && y < canvas.height + 20) {
                    const alpha = c.brightness * 0.15;
                    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
                    ctx.fillText(c.char, this.x, y);
                }
            });
            ctx.restore();
        }
    }
    

    class CodeSnippet {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = 0;
            this.maxLife = 300 + Math.random() * 200;
            this.code = this.generateCode();
            this.opacity = 0;
            this.size = 0.9 + Math.random() * 0.3;
        }
        
        generateCode() {
            const snippets = [

                'function init() {',
                'const data = await fetch();',
                'class Component {',
                'return <div>...</div>;',
                'async function load() {',
                'const arr = [...data];',
                'if (condition) {',
                'for (let i = 0; i < n; i++)',
                'this.setState({});',
                'useEffect(() => {}, []);',
                'const [state, setState] = useState(initialState);',

                'def train_model():',
                'import tensorflow as tf',
                'for i in range(10):',
                'with open("file.txt") as f:',
                'class Solution:',
                'if __name__ == "__main__":',
                '@dataclass',
                'self.value = value',

                'public class Main {',
                'System.out.println("Hello, World!");',
                'private int count;',
                'for (int i = 0; i < 10; i++) {',
                '@Override',
                'List<String> names = new ArrayList<>();',

                'fun factorial 0 = 1',
                'val xs = [1,2,3,4]',
                'val rec fib = fn 0 => 0 | 1 => 1 | n => fib(n-1)+fib(n-2)',
                'datatype tree = Leaf of int | Node of tree * tree',

                '#include <stdio.h>',
                'int main(void) {',
                'printf("Hello, C!\\n");',
                'for(int i=0; i<10; i++) {',
                'return 0;',
                '// pointer arithmetic',
                'int *p = &x;',

                'SELECT * FROM users WHERE active = 1;',
                'INSERT INTO logs (event, created_at) VALUES (?, NOW());',
                'UPDATE products SET price = price * 1.1;',
                'CREATE TABLE account (id INT, balance DECIMAL);',
                'DELETE FROM sessions WHERE expires < NOW();',
            ];
            return snippets[Math.floor(Math.random() * snippets.length)];
        }
        
        update() {
            this.life++;
            if (this.life < 30) {
                this.opacity = this.life / 30;
            } else if (this.life > this.maxLife - 30) {
                this.opacity = (this.maxLife - this.life) / 30;
            } else {
                this.opacity = 1;
            }
        }
        
        draw(ctx) {
            if (this.opacity <= 0) return;
            
            ctx.save();
            const fontSize = 11 * this.size;
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
            ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity * 0.15})`;
            ctx.textAlign = 'left';
            ctx.fillText(this.code, this.x, this.y);
            ctx.restore();
        }
        
        isDead() {
            return this.life >= this.maxLife;
        }
    }
    

    class BinaryStream {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0.5 + Math.random() * 1;
            this.bits = [];
            this.length = 20 + Math.floor(Math.random() * 30);
            this.initBits();
        }
        
        initBits() {
            for (let i = 0; i < this.length; i++) {
                this.bits.push({
                    value: Math.random() > 0.5 ? '1' : '0',
                    opacity: 1 - (i / this.length)
                });
            }
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height + this.length * 15) {
                this.y = -this.length * 15;
                this.initBits();
            }
        }
        
        draw(ctx) {
            ctx.save();
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            
            this.bits.forEach((bit, i) => {
                const y = this.y + i * 15;
                if (y > -10 && y < canvas.height + 10) {
                    ctx.fillStyle = `rgba(0, 0, 0, ${bit.opacity * 0.12})`;
                    ctx.fillText(bit.value, this.x, y);
                }
            });
            ctx.restore();
        }
    }
    

    const matrixColumns = [];
    let columnCount = Math.floor(canvas.width / 30);
    for (let i = 0; i < columnCount; i++) {
        matrixColumns.push(new MatrixColumn(i * 30 + 15));
    }
    

    function resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);
        

        const newColumnCount = Math.floor(width / 30);
        if (newColumnCount !== columnCount) {
            matrixColumns.length = 0;
            for (let i = 0; i < newColumnCount; i++) {
                matrixColumns.push(new MatrixColumn(i * 30 + 15));
            }
            columnCount = newColumnCount;
        }
    }
    resizeCanvas();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
        }, 150);
    });
    
    const codeSnippets = [];
    const binaryStreams = [];
    

    const isMobile = window.innerWidth <= 768;
    const initialSnippets = isMobile ? 6 : 12;
    const maxSnippets = isMobile ? 15 : 25;
    const maxStreams = isMobile ? 8 : 15;
    

    for (let i = 0; i < initialSnippets; i++) {
        setTimeout(() => {
            codeSnippets.push(new CodeSnippet());
        }, i * 200);
    }
    

    for (let i = 0; i < (isMobile ? 3 : 5); i++) {
        setTimeout(() => {
            binaryStreams.push(new BinaryStream());
        }, i * 300);
    }
    

    setInterval(() => {
        if (codeSnippets.length < maxSnippets) {

            const count = isMobile ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    codeSnippets.push(new CodeSnippet());
                }, i * 100);
            }
        }
    }, isMobile ? 2500 : 1500);
    

    setInterval(() => {
        if (binaryStreams.length < maxStreams) {
            binaryStreams.push(new BinaryStream());
        }
    }, isMobile ? 3000 : 2000);
    

    function animate() {

        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        

        matrixColumns.forEach(column => {
            column.update();
            column.draw(ctx);
        });
        

        codeSnippets.forEach((snippet, index) => {
            snippet.update();
            snippet.draw(ctx);
            if (snippet.isDead()) {
                codeSnippets.splice(index, 1);
            }
        });
        

        binaryStreams.forEach((stream, index) => {
            stream.update();
            stream.draw(ctx);
            if (stream.y > canvas.height + 500) {
                binaryStreams.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}




document.addEventListener('DOMContentLoaded', () => {
    initTechBackground();
    initPaintEffect();
    createParticles();
    initInteractiveGlow();
    initTypewriter();
    initNavbarScroll();
    initSmoothScroll();
    initMobileMenu();
    initSkillBars();
    initActiveNavLink();
    initCursorTrail();
    initContactForm();
    

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});





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


window.addEventListener('scroll', throttle(() => {

}, 10));




function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'sending...';
        submitButton.disabled = true;
        formMessage.style.display = 'none';
        
        try {



            

            const mailtoLink = `mailto:deep.mangrulkar@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
            window.location.href = mailtoLink;
            








            








            

            formMessage.textContent = 'opening your email client...';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset();
            
        } catch (error) {
            formMessage.textContent = 'error sending message. please try again or email me directly.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

