document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTransformationButtons();
  initPowerMeter();
  initParticleEffects();
  initPageTransitions();
});

// Fix for back/forward cache (BFCache): when returning via browser back button,
// the page may be restored with body opacity still at 0 from our transition.
window.addEventListener('pageshow', (event) => {
  const navEntries = (performance && performance.getEntriesByType)
    ? performance.getEntriesByType('navigation')
    : [];
  const navType = navEntries[0]?.type;
  const isBackForward = event.persisted || navType === 'back_forward';

  if (!isBackForward) return;

  // Force the page visible immediately.
  document.body.style.transition = 'opacity 0s';
  document.body.style.opacity = '1';
  // Allow future transitions to work normally.
  setTimeout(() => {
    document.body.style.transition = '';
  }, 0);
});

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length === 0) return;
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('revealed');
      }
    });
  };
  
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });
}

function initTransformationButtons() {
  const transformButtons = document.querySelectorAll('.btn-transform');
  
  transformButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const transformType = button.dataset.transform;
      triggerTransformation(transformType);
      button.classList.toggle('active');
      createEnergyBurst(e.clientX, e.clientY);
    });
  });
}

function triggerTransformation(type) {
  const display = document.querySelector('.transformation-display');
  const aura = document.querySelector('.aura-effect');
  const image = document.querySelector('.transformation-image');
  
  if (!display) return;
  
  const transformations = {
    'base': {
      primary: '#F7941D',
      glow: 'rgba(247, 148, 29, 0.7)'
    },
    'kaioken': {
      primary: '#E53E3E',
      glow: 'rgba(229, 62, 62, 0.8)'
    },
    'ssj': {
      primary: '#FFD700',
      glow: 'rgba(255, 215, 0, 0.8)'
    },
    'ssj2': {
      primary: '#FFD700',
      glow: 'rgba(255, 215, 0, 0.85)'
    },
    'ssj3': {
      primary: '#FFD700',
      glow: 'rgba(255, 215, 0, 0.9)'
    },
    'ssg': {
      primary: '#FC8181',
      glow: 'rgba(252, 129, 129, 0.8)'
    },
    'ssb': {
      primary: '#4299E1',
      glow: 'rgba(66, 153, 225, 0.8)'
    },
    'ssb-kaioken': {
      primary: '#E53E3E',
      glow: 'rgba(229, 62, 62, 0.8)'
    },
    'ultra-instinct': {
      primary: '#CBD5E0',
      glow: 'rgba(203, 213, 224, 0.9)'
    }
  };
  
  const transform = transformations[type] || transformations['base'];
  
  document.documentElement.style.setProperty('--era-primary', transform.primary);
  
  if (aura) {
    aura.style.boxShadow = `0 0 30px ${transform.glow}, 0 0 60px ${transform.glow}, 0 0 90px ${transform.glow}`;
    aura.classList.add('active');
  }
  
  if (image) {
    image.classList.add('powered-up');
    const img = image.querySelector('img');
    if (img) {
      img.style.boxShadow = `0 0 20px ${transform.glow}, 0 0 40px ${transform.glow}, 0 0 60px ${transform.glow}`;
    }
  }
  
  flashScreen(transform.primary);
  updatePowerMeter(type);
}

function flashScreen(color) {
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${color};
    opacity: 0.5;
    z-index: 9999;
    pointer-events: none;
    animation: flashFade 0.5s ease-out forwards;
  `;
  
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 500);
}

const flashStyle = document.createElement('style');
flashStyle.textContent = `
  @keyframes flashFade {
    0% { opacity: 0.5; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(flashStyle);

function initPowerMeter() {
  const meter = document.querySelector('.power-meter-fill');
  if (!meter) return;
  
  const initialPower = meter.dataset.power || 0;
  
  setTimeout(() => {
    meter.style.width = `${initialPower}%`;
  }, 500);
}

function updatePowerMeter(transformType) {
  const meter = document.querySelector('.power-meter-fill');
  if (!meter) return;
  
  const powerLevels = {
    'base': 10,
    'great-ape': 20,
    'kaioken': 30,
    'ssj': 45,
    'ssj2': 55,
    'ssj3': 70,
    'ssg': 80,
    'ssb': 90,
    'ssb-kaioken': 95,
    'ultra-instinct': 100
  };
  
  const power = powerLevels[transformType] || 10;
  meter.style.width = `${power}%`;
}

function initParticleEffects() {
  if (!document.querySelector('.energy-particles')) {
    const container = document.createElement('div');
    container.className = 'energy-particles';
    document.body.appendChild(container);
  }
}

function createEnergyBurst(x, y) {
  const container = document.querySelector('.energy-particles');
  if (!container) return;
  
  const particleCount = 15;
  const colors = getComputedStyle(document.documentElement)
    .getPropertyValue('--era-primary').trim() || '#F7941D';
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = 50 + Math.random() * 100;
    const offsetX = Math.cos(angle) * velocity;
    const offsetY = Math.sin(angle) * velocity;
    
    particle.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      background: ${colors};
      box-shadow: 0 0 10px ${colors};
      --offset-x: ${offsetX}px;
      --offset-y: ${offsetY}px;
    `;
    
    particle.style.animation = 'particleBurst 0.8s ease-out forwards';
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

const burstStyle = document.createElement('style');
burstStyle.textContent = `
  @keyframes particleBurst {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(var(--offset-x), var(--offset-y)) scale(0);
    }
  }
`;
document.head.appendChild(burstStyle);

function initPageTransitions() {
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href === window.location.pathname.split('/').pop()) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
  
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
}

function createAmbientParticles() {
  const container = document.querySelector('.energy-particles');
  if (!container) return;
  
  setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'particle ambient';
    
    const startX = Math.random() * window.innerWidth;
    
    particle.style.cssText = `
      left: ${startX}px;
      bottom: -10px;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      opacity: ${0.3 + Math.random() * 0.4};
    `;
    
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }, 500);
}

function getEraFromPath() {
  const path = window.location.pathname;
  
  if (path.includes('db.html') || path.includes('great-ape')) {
    return 'db';
  } else if (path.includes('dbz') || path.includes('kaioken') || 
             path.includes('ssj.html') || path.includes('ssj2') || path.includes('ssj3')) {
    return 'dbz';
  } else if (path.includes('dbs') || path.includes('ssg') || 
             path.includes('ssb') || path.includes('ultra-instinct')) {
    return 'dbs';
  }
  
  return 'intro';
}

document.body.classList.add(`era-${getEraFromPath()}`);

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                    'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerTransformation('ultra-instinct');
      createEnergyBurst(window.innerWidth / 2, window.innerHeight / 2);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
