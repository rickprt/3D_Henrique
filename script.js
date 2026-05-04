// ============================================
// MENU MOBILE RESPONSIVO
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fecha menu quando clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SCROLL SUAVE PARA SEÇÕES
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
    });
}

// Adiciona scroll suave aos links do menu
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

// ============================================
// EFEITO NAVBAR TRANSPARENTE
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// ============================================
// BOTÕES INTERATIVOS - MOSTRA IMPACTO
// ============================================
function showImpact(action) {
    const impactMessage = document.getElementById('impact-message');
    
    const impacts = {
        'economia-agua': {
            title: '💧 Economia de Água',
            message: 'Reduzindo 1 banho por semana, você economiza <strong>2.500 litros de água por ano!</strong>',
            color: '#4A90E2'
        },
        'reduzir-plastico': {
            title: '♻️ Reduzir Plástico',
            message: 'Usando garrafa reutilizável, você evita <strong>156 garrafas PET por ano!</strong>',
            color: '#4CAF50'
        },
        'plantar-arvore': {
            title: '🌳 Plantar Árvores',
            message: 'Uma árvore absorve <strong>22kg de CO2 por ano</strong> e produz oxigênio para 4 pessoas!',
            color: '#7B68EE'
        }
    };
    
    const impact = impacts[action];
    if (impact) {
        impactMessage.innerHTML = `
            <h3 style="color: ${impact.color};">${impact.title}</h3>
            <p>${impact.message}</p>
            <button onclick="hideImpact()" style="background: ${impact.color}; margin-top: 1rem;">Fechar ✨</button>
        `;
        impactMessage.style.display = 'block';
        impactMessage.style.opacity = '0';
        
        // Animação de entrada
        setTimeout(() => {
            impactMessage.style.opacity = '1';
            impactMessage.style.transform = 'scale(1)';
        }, 100);
    }
}

function hideImpact() {
    const impactMessage = document.getElementById('impact-message');
    impactMessage.style.opacity = '0';
    setTimeout(() => {
        impactMessage.style.display = 'none';
    }, 300);
}

// ============================================
// MENSAGEM FINAL DE COMPROMETIMENTO
// ============================================
function showFinalMessage() {
    // Confetti effect simples
    createConfetti();
    
    // Mensagem de sucesso
    const message = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h2>Parabéns! Você se comprometeu! 🌟</h2>
            <p>Seu futuro está mais verde! Continue espalhando essa mensagem! 💚</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: var(--verde); color: white; padding: 1rem 2rem; border: none; border-radius: 25px; font-size: 1.1rem; cursor: pointer;">
                Fechar
            </button>
        </div>
    `;
    
    // Cria overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    overlay.innerHTML = message;
    document.body.appendChild(overlay);
    
    // Fecha ao clicar fora
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// ============================================
// EFEITO CONFETTI SIMPLES
// ============================================
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#4A90E2', '#7B68EE', '#E91E63', '#F8BBD9', '#4CAF50', '#FFEB3B'][Math.floor(Math.random()*6)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 3000;
            pointer-events: none;
            border-radius: 50%;
            animation: fall linear forwards;
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        confetti.animate([
            { transform: 'translateY(-100vh) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// ============================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa todos os cards e seções
document.querySelectorAll('.card, .solution-card, .timeline-item, .example').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// CONTADOR ANIMADO (BONUS)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start);
    }, 16);
}

// ============================================
// EFEITOS DE HOVER NOS CARDS
// ============================================
document.querySelectorAll('.card, .solution-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// PROGRESS BAR ANIMADA (BONUS)
// ============================================
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--verde), var(--azul));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Inicializa tudo quando a página carregar
window.addEventListener('load', () => {
    createProgressBar();
    
    // Pequena animação de entrada
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// MODO DARK/LIGHT (BONUS EXTRA)
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carrega preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// ALERTA DE PERFORMANCE (BONUS)
// ============================================
let actionCount = 0;
function trackAction() {
    actionCount++;
    if (actionCount >= 3) {
        console.log('🎉 Você interagiu muito! Site carregado com sucesso!');
        // Poderia mostrar uma mensagem especial aqui
    }
}

// Chama trackAction em todas as interações principais
document.querySelectorAll('.action-btn, .cta-button, .btn-primary').forEach(btn => {
    btn.addEventListener('click', trackAction);
});

console.log('🌍 Site "Em Busca de um Mundo Melhor" carregado com SUCESSO! 🚀');
console.log('💡 Dicas:');
console.log('- Clique nos botões coloridos para ver impactos');
console.log('- Role para ver animações');
console.log('- Teste o menu mobile redimensionando a tela');