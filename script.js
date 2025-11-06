// Configuración del canvas de partículas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Reajustar tamaño al cambiar la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===============================
// CONFIGURACIÓN DE PARTÍCULAS
// ===============================
const numParticles = 100;
const maxDistance = 120;
const particles = [];

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    size: 2 + Math.random() * 2
  });
}

// ===============================
// FUNCIÓN DE DIBUJO
// ===============================
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar cada partícula
  for (let i = 0; i < numParticles; i++) {
    const p = particles[i];

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = '#58a6ff';
    ctx.fill();

    // Mover
    p.x += p.vx;
    p.y += p.vy;

    // Rebote en bordes
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }

  // Conectar partículas cercanas
  for (let i = 0; i < numParticles; i++) {
    for (let j = i + 1; j < numParticles; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(88,166,255, ${1 - dist / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

// ===============================
// NAVEGACIÓN Y FUNCIONALIDADES
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.getElementById('navLinks');
  
  // Verificar si estamos en una página de una sola sección o múltiples páginas
  const isSinglePage = document.querySelectorAll('section').length > 1;

  // Scroll efecto navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Actualizar link activo (solo para páginas de una sola sección)
    if (isSinglePage) {
      let current = '';
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    }
  });

  // Menu toggle para móvil
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  // Smooth scroll para enlaces internos (solo para páginas de una sola sección)
  if (isSinglePage) {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          navLinksContainer.classList.remove('active');
        }
      });
    });
  }

  // Animar barras de habilidades cuando entran en viewport
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsSection = document.getElementById('habilidades');
  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Inicializar barras de progreso en 0
  document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0%';
  });

  // Iniciar animación de partículas
  drawParticles();
});

// Función enviar formulario
function enviarFormulario() {
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  if (nombre && email && mensaje) {
    if (nombre.value && email.value && mensaje.value) {
      alert('¡Gracias por tu mensaje! Te contactaré pronto.');
      nombre.value = '';
      email.value = '';
      mensaje.value = '';
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}