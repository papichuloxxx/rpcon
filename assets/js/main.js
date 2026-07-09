
// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = () => {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
        requestAnimationFrame(update);
      } else {
        stat.textContent = target + (target === 98 ? '%' : '+');
      }
    };
    update();
  });
};

// Intersection observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Stats observer
const statsBar = document.querySelector('.stats-bar');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statsObserver.observe(statsBar);

// Project filter tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// Contact form to WhatsApp redirection
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const form = e.target;
  const name = form.querySelector('[name="name"]').value;
  const phone = form.querySelector('[name="phone"]').value;
  const email = form.querySelector('[name="email"]').value;
  const service = form.querySelector('[name="service"]').value;
  const message = form.querySelector('[name="message"]').value;
  
  // Construct WhatsApp message
  let waText = `Hello RP Builders! I would like to request a quotation.%0A%0A`;
  waText += `*Name:* ${name}%0A`;
  waText += `*Phone:* ${phone}%0A`;
  waText += `*Email:* ${email}%0A`;
  waText += `*Service Required:* ${service}%0A`;
  waText += `*Project Details:* ${message}`;
  
  // Provide feedback and redirect
  const btn = form.querySelector('.form-submit');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fab fa-whatsapp"></i> Redirecting...';
  btn.style.background = '#25D366';
  
  setTimeout(() => {
    window.open(`https://wa.me/263772902104?text=` + encodeURIComponent(waText), '_blank');
    btn.innerHTML = originalText;
    btn.style.background = '';
    form.reset();
  }, 1500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- PREMIUM FEATURES ---



// 3. Magnetic Buttons
const magneticBtns = document.querySelectorAll('.btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px)`;
  });
});

// 4. Vanilla-Tilt Initialization
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".service-card, .operate-card, .policy-card"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.1
  });
  
  VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
  });
}
// --- QUOTATION WIZARD ---
let wizardData = {
  type: '',
  scope: '',
  drawings: ''
};

function openWizard(e) {
  if(e) e.preventDefault();
  document.getElementById('quoteWizard').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeWizard() {
  document.getElementById('quoteWizard').classList.remove('show');
  document.body.style.overflow = '';
}

function selectOption(key, value, nextStepNum) {
  wizardData[key] = value;
  goToStep(nextStepNum);
}

function goToStep(stepNum) {
  document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
  document.getElementById('wizardStep' + stepNum).classList.add('active');
  
  const progress = (stepNum / 4) * 100;
  document.getElementById('wizardProgress').style.width = progress + '%';
}

function prevStep(stepNum) {
  goToStep(stepNum);
}

function submitWizard(e) {
  e.preventDefault();
  
  const name = document.getElementById('wizName').value;
  const phone = document.getElementById('wizPhone').value;
  const notes = document.getElementById('wizNotes').value;
  
  let waText = "Hello RP Builders! I would like to request a quotation.%0A%0A";
  waText += "*Project Type:* " + encodeURIComponent(wizardData.type) + "%0A";
  waText += "*Scope:* " + encodeURIComponent(wizardData.scope) + "%0A";
  waText += "*Drawings:* " + encodeURIComponent(wizardData.drawings) + "%0A";
  waText += "*Name:* " + encodeURIComponent(name) + "%0A";
  waText += "*Phone:* " + encodeURIComponent(phone) + "%0A";
  if (notes) {
    waText += "*Notes:* " + encodeURIComponent(notes);
  }
  
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
  
  setTimeout(() => {
    window.open("https://wa.me/263772902104?text=" + waText, '_blank');
    btn.innerHTML = originalText;
    closeWizard();
    e.target.reset();
    goToStep(1);
  }, 1000);
}
