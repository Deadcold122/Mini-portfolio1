/* =====================================================
   PORTFOLIO - JAVASCRIPT
   Particles, Theme Toggle, Interactions
   ===================================================== */

// =====================================================
// PARTICLE SYSTEM
// =====================================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.settings = {
            type: 'stars',
            count: 100,
            speed: 1,
            size: 1,
            glow: true,
            color: '#7c4dff'
        };
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.settings.count; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const isDark = document.body.classList.contains('theme-dark');
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5 * this.settings.speed,
            vy: (Math.random() - 0.5) * 0.5 * this.settings.speed,
            size: (Math.random() * 3 + 1) * this.settings.size,
            alpha: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            pulsePhase: Math.random() * Math.PI * 2
        };
    }
    
    drawStar(particle) {
        const ctx = this.ctx;
        const spikes = 5;
        const outerRadius = particle.size;
        const innerRadius = particle.size / 2;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.alpha;
        
        // Glow effect
        if (this.settings.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.settings.color;
        }
        
        ctx.beginPath();
        ctx.fillStyle = this.settings.color;
        
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    
    drawHeart(particle) {
        const ctx = this.ctx;
        const size = particle.size;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.alpha;
        
        // Pulse effect
        const pulse = Math.sin(particle.pulsePhase) * 0.1 + 1;
        ctx.scale(pulse, pulse);
        
        if (this.settings.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.settings.color;
        }
        
        ctx.beginPath();
        ctx.fillStyle = this.settings.color;
        
        // Heart shape
        ctx.moveTo(0, -size / 2);
        ctx.bezierCurveTo(0, -size, -size, -size, -size, -size / 2);
        ctx.bezierCurveTo(-size, 0, 0, size, 0, size * 1.5);
        ctx.bezierCurveTo(0, size * 1.5, size, 0, size, -size / 2);
        ctx.bezierCurveTo(size, -size, 0, -size, 0, -size / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    drawCross(particle) {
        const ctx = this.ctx;
        const size = particle.size * 1.5;
        const width = size / 4;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.alpha;
        
        if (this.settings.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.settings.color;
        }
        
        ctx.fillStyle = this.settings.color;
        
        // Gothic cross shape
        const path = new Path2D();
        // Vertical bar
        path.rect(-width / 2, -size, width, size * 2);
        // Horizontal bar (top)
        path.rect(-size / 2, -size * 0.6, size, width);
        // Horizontal bar (bottom, shorter)
        path.rect(-size / 3, size * 0.3, size / 1.5, width * 0.8);
        
        ctx.fill(path);
        ctx.restore();
    }
    
    drawCircle(particle) {
        const ctx = this.ctx;
        
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.globalAlpha = particle.alpha;
        
        if (this.settings.glow) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.settings.color;
            
            // Outer glow ring
            ctx.beginPath();
            ctx.strokeStyle = this.settings.color;
            ctx.lineWidth = 1;
            ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.beginPath();
        ctx.fillStyle = this.settings.color;
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    drawParticle(particle) {
        switch (this.settings.type) {
            case 'stars':
                this.drawStar(particle);
                break;
            case 'hearts':
                this.drawHeart(particle);
                break;
            case 'crosses':
                this.drawCross(particle);
                break;
            case 'circles':
                this.drawCircle(particle);
                break;
        }
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.pulsePhase += 0.02;
        
        // Wrap around screen
        if (particle.x < -50) particle.x = this.canvas.width + 50;
        if (particle.x > this.canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = this.canvas.height + 50;
        if (particle.y > this.canvas.height + 50) particle.y = -50;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    updateSetting(key, value) {
        this.settings[key] = value;
        
        if (key === 'count') {
            this.init();
        } else if (key === 'speed') {
            this.particles.forEach(p => {
                p.vx = (Math.random() - 0.5) * 0.5 * value;
                p.vy = (Math.random() - 0.5) * 0.5 * value;
            });
        } else if (key === 'size') {
            this.particles.forEach(p => {
                p.size = (Math.random() * 3 + 1) * value;
            });
        }
    }
}

// =====================================================
// THEME TOGGLE
// =====================================================
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.toggleBtn = document.getElementById('themeToggle');
        this.loadTheme();
        this.init();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.body.className = savedTheme;
        }
    }
    
    saveTheme() {
        localStorage.setItem('theme', this.body.className);
    }
    
    toggle() {
        if (this.body.classList.contains('theme-dark')) {
            this.body.classList.remove('theme-dark');
            this.body.classList.add('theme-light');
        } else {
            this.body.classList.remove('theme-light');
            this.body.classList.add('theme-dark');
        }
        this.saveTheme();
    }
    
    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
    }
}

// =====================================================
// PARTICLE SETTINGS PANEL
// =====================================================
class ParticlePanel {
    constructor(particleSystem) {
        this.panel = document.getElementById('particlePanel');
        this.openBtn = document.getElementById('particleSettings');
        this.closeBtn = document.getElementById('panelClose');
        this.particleSystem = particleSystem;
        
        this.init();
    }
    
    init() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Particle type buttons
        document.querySelectorAll('.particle-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.particle-type-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.particleSystem.updateSetting('type', e.currentTarget.dataset.type);
            });
        });
        
        // Sliders
        const countSlider = document.getElementById('particleCount');
        const countValue = document.getElementById('countValue');
        countSlider.addEventListener('input', (e) => {
            countValue.textContent = e.target.value;
            this.particleSystem.updateSetting('count', parseInt(e.target.value));
        });
        
        const speedSlider = document.getElementById('particleSpeed');
        const speedValue = document.getElementById('speedValue');
        speedSlider.addEventListener('input', (e) => {
            speedValue.textContent = e.target.value;
            this.particleSystem.updateSetting('speed', parseFloat(e.target.value));
        });
        
        const sizeSlider = document.getElementById('particleSize');
        const sizeValue = document.getElementById('sizeValue');
        sizeSlider.addEventListener('input', (e) => {
            sizeValue.textContent = e.target.value;
            this.particleSystem.updateSetting('size', parseFloat(e.target.value));
        });
        
        // Glow toggle
        const glowToggle = document.getElementById('glowToggle');
        glowToggle.addEventListener('change', (e) => {
            this.particleSystem.updateSetting('glow', e.target.checked);
        });
        
        // Color picker
        const colorPicker = document.getElementById('particleColor');
        colorPicker.addEventListener('input', (e) => {
            this.particleSystem.updateSetting('color', e.target.value);
        });
        
        // Color presets
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.addEventListener('click', () => {
                const color = preset.dataset.color;
                colorPicker.value = color;
                this.particleSystem.updateSetting('color', color);
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.panel.classList.contains('active') && 
                !this.panel.contains(e.target) && 
                !this.openBtn.contains(e.target)) {
                this.close();
            }
        });
    }
    
    open() {
        this.panel.classList.add('active');
    }
    
    close() {
        this.panel.classList.remove('active');
    }
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// =====================================================
// ACTIVE NAV LINK
// =====================================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// DOWNLOAD MODAL
// =====================================================
function initDownloadModal() {
    const modal = document.getElementById('downloadModal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const projectName = document.getElementById('downloadProjectName');
    const downloadSource = document.getElementById('downloadSource');
    const downloadBuild = document.getElementById('downloadBuild');
    
    // Project data
    const projects = {
        'catalcysm': {
            name: 'Catalcysm Cheat Engine',
            source: 'https://github.com/Solyaniu/catalcysm-cheat',
            build: '#'
        },
        'memory-scanner': {
            name: 'Memory Scanner Pro',
            source: 'https://github.com/Solyaniu/memory-scanner',
            build: '#'
        },
        'dll-injector': {
            name: 'DLL Injector',
            source: 'https://github.com/Solyaniu/dll-injector',
            build: '#'
        },
        'obfuscator': {
            name: 'Code Obfuscator',
            source: 'https://github.com/Solyaniu/obfuscator',
            build: '#'
        }
    };
    
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.dataset.project;
            const project = projects[projectId];
            
            if (project) {
                projectName.textContent = project.name;
                downloadSource.href = project.source;
                downloadBuild.href = project.build;
                modal.classList.add('active');
            }
        });
    });
    
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    overlay.addEventListener('click', () => modal.classList.remove('active'));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// =====================================================
// HEADER SCROLL EFFECT
// =====================================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// =====================================================
// ANIMATION ON SCROLL
// =====================================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.project-card, .stat-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =====================================================
// TYPING EFFECT FOR HERO
// =====================================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--accent-primary)';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            subtitle.style.borderRight = 'none';
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 500);
}

// =====================================================
// INITIALIZE EVERYTHING
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const particleSystem = new ParticleSystem('particleCanvas');
    
    // Initialize theme manager
    new ThemeManager();
    
    // Initialize particle settings panel
    new ParticlePanel(particleSystem);
    
    // Initialize other features
    initSmoothScroll();
    initActiveNav();
    initDownloadModal();
    initHeaderScroll();
    initScrollAnimations();
    initTypingEffect();
    
    // Log
    console.log('%c Portfolio Loaded ', 'background: #7c4dff; color: #fff; font-size: 16px; padding: 10px;');
    console.log('%c Created by Solyaniu ', 'color: #7c4dff; font-size: 12px;');
});
