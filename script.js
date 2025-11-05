// CarbonEcoMarket - Main JavaScript
// Bilingual TR/EN Support

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
      if (navMenu) navMenu.classList.remove('active');
    }
  });

  // Initialize all features
  initMiniCalculator();
  initCarbonCalculator();
  initLiveMarketData();
  initFAQ();
  initCounterAnimation();
  initScrollAnimations();
});

// ============================================
// Mini Calculator (Hero Section)
// ============================================
function initMiniCalculator() {
  const calculateBtn = document.getElementById('quickCalculateBtn');
  if (!calculateBtn) return;

  calculateBtn.addEventListener('click', function() {
    const electricity = parseFloat(document.getElementById('quickElectricity')?.value) || 0;

    if (electricity === 0) {
      alert(getCurrentLang() === 'tr' ? 'Lütfen elektrik tüketiminizi girin' : 'Please enter your electricity consumption');
      return;
    }

    const result = (electricity * 0.5).toFixed(2); // Simple calculation: kWh * 0.5 kg CO2

    const resultDiv = document.getElementById('quickResult');
    if (resultDiv) {
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = `
        <strong>${result} kg CO₂</strong>
        <p style="font-size: 0.875rem; margin-top: 0.5rem;">
          ${getCurrentLang() === 'tr' ? 'Aylık tahmini karbon ayak izi' : 'Estimated monthly carbon footprint'}
        </p>
      `;
    }
  });
}

// ============================================
// Carbon Calculator Module
// ============================================
function initCarbonCalculator() {
  const calculateBtn = document.getElementById('calculateCarbon');
  if (!calculateBtn) return;

  calculateBtn.addEventListener('click', function() {
    // Get input values
    const electricity = parseFloat(document.getElementById('electricity')?.value) || 0;
    const gas = parseFloat(document.getElementById('gas')?.value) || 0;
    const water = parseFloat(document.getElementById('water')?.value) || 0;
    const transport = parseFloat(document.getElementById('transport')?.value) || 0;

    // Calculate CO2 (simplified formula)
    const electricityCO2 = electricity * 0.5; // kWh * 0.5 kg CO2
    const gasCO2 = gas * 2.0; // m³ * 2.0 kg CO2
    const waterCO2 = water * 0.3; // m³ * 0.3 kg CO2
    const transportCO2 = transport * 0.2; // km * 0.2 kg CO2

    const totalCO2 = (electricityCO2 + gasCO2 + waterCO2 + transportCO2).toFixed(2);

    // Display result
    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
      const lang = getCurrentLang();
      resultDiv.innerHTML = `
        <div style="background: var(--cloud-light); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
          <h3 style="color: var(--trust-teal); margin-bottom: 1rem;">
            ${lang === 'tr' ? 'Hesaplama Sonucu' : 'Calculation Result'}
          </h3>
          <div style="font-size: 3rem; font-weight: 700; color: var(--trust-teal); margin-bottom: 1rem;">
            ${totalCO2} kg CO₂
          </div>
          <p style="margin-bottom: 1.5rem;">
            ${lang === 'tr'
              ? 'Aylık tahmini karbon ayak iziniz'
              : 'Your estimated monthly carbon footprint'}
          </p>
          <button class="btn btn-primary" onclick="scrollToSection('certificate-purchase')">
            ${lang === 'tr' ? 'Şimdi Dengele' : 'Offset Now'}
          </button>
        </div>
      `;
    }
  });
}

// ============================================
// Live Market Data - DISABLED
// ============================================
function initLiveMarketData() {
  // ALL UPDATES DISABLED to prevent any layout shifts
  // Page is now completely static
}

function updateLiveStats() {
  // DISABLED - no auto-updates to prevent flickering
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const parent = this.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Open clicked FAQ if it wasn't active
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

// ============================================
// Counter Animation - DISABLED
// ============================================
function initCounterAnimation() {
  // Counter animation DISABLED to prevent layout shifts
  // Numbers are now static (shown directly in HTML)
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (target) {
      counter.textContent = formatNumber(target);
    }
  });
}

function animateCounter(element) {
  // DISABLED - no animation
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// ============================================
// Scroll Animations - DISABLED
// ============================================
function initScrollAnimations() {
  // Scroll animations DISABLED to prevent layout shifts
  // All elements are now visible immediately (no fade-in)
}

// ============================================
// Smooth Scroll
// ============================================
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Add smooth scroll to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// ============================================
// Language Detection
// ============================================
function getCurrentLang() {
  return document.documentElement.lang || 'tr';
}

// ============================================
// Newsletter Form
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value;

    if (email) {
      const lang = getCurrentLang();
      alert(lang === 'tr'
        ? 'Başarıyla abone oldunuz! Teşekkür ederiz.'
        : 'Successfully subscribed! Thank you.');
      this.reset();
    }
  });
}

// ============================================
// Live Statistics Data
// ============================================
function setLiveStats() {
  const stats = [
    { id: 'totalCO2', value: 2500000 },
    { id: 'activeUsers', value: 15000 },
    { id: 'dailyVolume', value: 45000000 },
    { id: 'projectsSupported', value: 250 },
    { id: 'registeredFarmers', value: 3500 },
    { id: 'partnerNGOs', value: 85 },
    { id: 'traderCount', value: 1200 },
    { id: 'apiCalls', value: 5000000 }
  ];

  stats.forEach(stat => {
    const element = document.getElementById(stat.id);
    if (element) {
      element.setAttribute('data-target', stat.value);
    }
  });
}

// Initialize stats
setLiveStats();

// ============================================
// Interactive Map for Climate Agreements
// ============================================
function initClimateMap() {
  // Placeholder for interactive map functionality
  // Can be enhanced with libraries like Leaflet.js or Mapbox
  console.log('Climate agreement map initialized');
}

// ============================================
// Package Selection
// ============================================
const packageButtons = document.querySelectorAll('.package-card .btn');
packageButtons.forEach(button => {
  button.addEventListener('click', function() {
    const packageName = this.closest('.package-card').querySelector('h3').textContent;
    const lang = getCurrentLang();

    alert(lang === 'tr'
      ? `${packageName} paketi seçildi. Ödeme sayfasına yönlendiriliyorsunuz...`
      : `${packageName} package selected. Redirecting to payment...`);
  });
});

// ============================================
// Subscription Selection
// ============================================
const subscriptionButtons = document.querySelectorAll('.subscription-card .btn');
subscriptionButtons.forEach(button => {
  button.addEventListener('click', function() {
    const subscriptionName = this.closest('.subscription-card').querySelector('.subscription-name').textContent;
    const lang = getCurrentLang();

    alert(lang === 'tr'
      ? `${subscriptionName} aboneliği seçildi.`
      : `${subscriptionName} subscription selected.`);
  });
});

// ============================================
// Form Validation
// ============================================
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;

  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = '#ef4444';
    } else {
      input.style.borderColor = '';
    }
  });

  return isValid;
}

// ============================================
// Lazy Loading Images
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🌱 CarbonEcoMarket', 'font-size: 24px; color: #0F6B63; font-weight: bold;');
console.log('%cGlobal Carbon Marketplace - Making sustainability accessible', 'font-size: 14px; color: #A6E22E;');
console.log('%cVersion 1.0.0', 'font-size: 12px; color: #6b7280;');
