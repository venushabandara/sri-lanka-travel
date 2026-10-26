/**
 * Serendib Odyssey - Sri Lanka Travel Web Application Logic
 * Interactive destination explorer, package viewer, currency switcher,
 * trip cost calculator, modals, and booking management.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentCurrency: 'USD',
    destFilter: 'all',
    pkgFilter: 'all',
    activeModal: null,

    // Custom Calculator State
    calc: {
      days: 7,
      travelers: 2,
      tier: 'boutique', // boutique | luxury | eco
      tierMultipliers: { boutique: 1.0, luxury: 1.55, eco: 0.88 },
      transport: 'chauffeur', // chauffeur | suv | combo
      transportDailyUSD: { chauffeur: 65, suv: 95, combo: 80 },
      baseDailyPerPersonUSD: 110,
      addons: {
        balloon: false,
        whale: false,
        ayurveda: false
      },
      addonPricesUSD: {
        balloon: 220,
        whale: 140,
        ayurveda: 280
      }
    }
  };

  // Elements
  const header = document.querySelector('.site-header');
  const currencyBtn = document.getElementById('currencyBtn');
  const currencyDropdown = document.getElementById('currencyDropdown');
  const destinationsContainer = document.getElementById('destinationsGrid');
  const packagesContainer = document.getElementById('packagesGrid');
  const destFilterBtns = document.querySelectorAll('[data-dest-filter]');
  const pkgFilterBtns = document.querySelectorAll('[data-pkg-filter]');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Modals
  const destModal = document.getElementById('destModal');
  const itineraryModal = document.getElementById('itineraryModal');
  const bookingModal = document.getElementById('bookingModal');
  const toastContainer = document.getElementById('toastContainer');

  /* --------------------------------------------------------------------------
     1. NAVIGATION & SCROLL BEHAVIOR
     -------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      backToTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. CURRENCY SWITCHER LOGIC
     -------------------------------------------------------------------------- */
  function formatPrice(amountInUSD) {
    const cur = SRI_LANKA_DATA.currencies[state.currentCurrency] || SRI_LANKA_DATA.currencies.USD;
    return cur.format(amountInUSD);
  }

  if (currencyBtn && currencyDropdown) {
    currencyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currencyDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      currencyDropdown.classList.remove('active');
    });

    currencyDropdown.querySelectorAll('.currency-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedCode = option.getAttribute('data-currency');
        if (selectedCode && SRI_LANKA_DATA.currencies[selectedCode]) {
          state.currentCurrency = selectedCode;
          currencyBtn.innerHTML = `<i class="fa-solid fa-globe"></i> <span>${selectedCode} (${SRI_LANKA_DATA.currencies[selectedCode].symbol})</span> <i class="fa-solid fa-chevron-down" style="font-size:0.75rem;"></i>`;
          
          currencyDropdown.querySelectorAll('.currency-option').forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          currencyDropdown.classList.remove('active');

          // Re-render components relying on currency
          renderPackages();
          updateCalculator();
          showToast(`Currency switched to ${selectedCode}`, 'fa-money-bill-wave');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. DESTINATIONS RENDERER & MODAL
     -------------------------------------------------------------------------- */
  function renderDestinations() {
    if (!destinationsContainer) return;

    const filtered = state.destFilter === 'all'
      ? SRI_LANKA_DATA.destinations
      : SRI_LANKA_DATA.destinations.filter(d => d.category === state.destFilter);

    destinationsContainer.innerHTML = filtered.map(dest => `
      <article class="destination-card" data-id="${dest.id}">
        <div class="dest-image-wrap">
          <img src="${dest.image}" alt="${dest.name}" loading="lazy">
          <span class="dest-region-badge"><i class="fa-solid fa-location-dot"></i> ${dest.region}</span>
          <span class="dest-sinhala-badge">${dest.sinhalaName}</span>
        </div>
        <div class="dest-content">
          <span class="dest-tagline">${dest.tagline}</span>
          <h3 class="dest-name">${dest.name}</h3>
          <p class="dest-desc">${dest.shortDesc}</p>
          <div class="dest-meta-row">
            <span class="dest-meta-item"><i class="fa-regular fa-clock"></i> ${dest.duration}</span>
            <span class="dest-meta-item"><i class="fa-regular fa-calendar-check"></i> ${dest.bestTimeToVisit.split('(')[0]}</span>
          </div>
          <button class="btn btn-outline-dark dest-btn open-dest-modal-btn" data-dest-id="${dest.id}">
            <i class="fa-solid fa-compass"></i> Explore Guide & Tips
          </button>
        </div>
      </article>
    `).join('');

    // Attach listeners
    destinationsContainer.querySelectorAll('.open-dest-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const destId = btn.getAttribute('data-dest-id');
        openDestinationModal(destId);
      });
    });
  }

  destFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      destFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.destFilter = btn.getAttribute('data-dest-filter');
      renderDestinations();
    });
  });

  function openDestinationModal(destId) {
    const dest = SRI_LANKA_DATA.destinations.find(d => d.id === destId);
    if (!dest || !destModal) return;

    const modalHeroImg = destModal.querySelector('.modal-hero-img');
    const modalTitle = destModal.querySelector('.modal-dest-title');
    const modalSubtitle = destModal.querySelector('.modal-dest-subtitle');
    const modalBody = destModal.querySelector('.modal-dest-body');

    if (modalHeroImg) modalHeroImg.src = dest.image;
    if (modalTitle) modalTitle.textContent = `${dest.name} (${dest.sinhalaName})`;
    if (modalSubtitle) modalSubtitle.textContent = dest.tagline;

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; color: var(--primary-deep); margin-bottom: 8px;">About This Destination</h4>
          <p style="color: var(--text-muted); line-height: 1.68;">${dest.fullDesc}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; background: var(--bg-sand); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-light); font-weight: 700; display: block;">Best Season</span>
            <strong style="color: var(--primary-teal); font-size: 0.9rem;">${dest.bestTimeToVisit}</strong>
          </div>
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-light); font-weight: 700; display: block;">Drive from Colombo</span>
            <strong style="color: var(--text-main); font-size: 0.9rem;">${dest.travelTimeFromColombo}</strong>
          </div>
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-light); font-weight: 700; display: block;">Entry Ticket</span>
            <strong style="color: var(--ceylon-gold-hover); font-size: 0.9rem;">${dest.entryFee}</strong>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1.1rem; color: var(--primary-deep); margin-bottom: 12px;"><i class="fa-solid fa-star" style="color: var(--ceylon-gold);"></i> Key Highlights</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${dest.highlights.map(h => `<li style="display:flex; align-items:center; gap:10px; font-size: 0.92rem; color: var(--text-main);"><i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${h}</li>`).join('')}
          </ul>
        </div>

        <div style="background: var(--ceylon-gold-subtle); border-left: 4px solid var(--ceylon-gold); padding: 16px; border-radius: 6px; margin-bottom: 28px;">
          <h5 style="font-size: 0.88rem; color: var(--ceylon-gold-hover); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Local Insider Tip</h5>
          <p style="font-size: 0.9rem; color: var(--primary-deep); margin: 0;">${dest.insiderTip}</p>
        </div>

        <div style="display:flex; gap:12px; justify-content: flex-end; flex-wrap:wrap;">
          <button class="btn btn-outline-dark close-modal-btn">Close</button>
          <button class="btn btn-teal plan-around-dest-btn" data-dest-name="${dest.name}">
            <i class="fa-solid fa-paper-plane"></i> Plan Trip to ${dest.name.split(' ')[0]}
          </button>
        </div>
      `;

      // Modal action buttons
      modalBody.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
      });

      const planBtn = modalBody.querySelector('.plan-around-dest-btn');
      if (planBtn) {
        planBtn.addEventListener('click', () => {
          closeModal();
          openBookingModal(`Custom tour featuring ${dest.name}`);
        });
      }
    }

    openModal(destModal);
  }

  /* --------------------------------------------------------------------------
     4. PACKAGES RENDERER & ITINERARY VIEWER
     -------------------------------------------------------------------------- */
  function renderPackages() {
    if (!packagesContainer) return;

    const filtered = state.pkgFilter === 'all'
      ? SRI_LANKA_DATA.packages
      : SRI_LANKA_DATA.packages.filter(p => p.category === state.pkgFilter);

    packagesContainer.innerHTML = filtered.map(pkg => {
      const formattedPrice = formatPrice(pkg.basePriceUSD);
      return `
        <article class="package-card" data-id="${pkg.id}">
          <div class="pkg-media">
            <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
            <span class="pkg-badge">${pkg.badge}</span>
          </div>
          <div class="pkg-details">
            <div class="pkg-top-meta">
              <span class="pkg-duration"><i class="fa-solid fa-clock"></i> ${pkg.durationDays} Days / ${pkg.durationNights} Nights</span>
              <span class="pkg-rating"><i class="fa-solid fa-star"></i> ${pkg.rating} <small style="color:var(--text-light); font-weight:400;">(${pkg.reviewsCount})</small></span>
            </div>
            <h3 class="pkg-title">${pkg.title}</h3>
            <div class="pkg-route"><i class="fa-solid fa-route"></i> <span>${pkg.route}</span></div>
            <p class="pkg-summary">${pkg.summary}</p>
            <ul class="pkg-features-list">
              ${pkg.inclusions.slice(0, 3).map(inc => `<li><i class="fa-solid fa-check"></i> ${inc}</li>`).join('')}
            </ul>
            <div class="pkg-footer">
              <div class="pkg-price-box">
                <span class="pkg-price-label">From / Person</span>
                <span class="pkg-price-amount">${formattedPrice}</span>
                <span class="pkg-price-sub">All-inclusive land package</span>
              </div>
              <div class="pkg-actions">
                <button class="btn btn-sm btn-outline-dark view-itinerary-btn" data-pkg-id="${pkg.id}">
                  <i class="fa-solid fa-calendar-days"></i> Itinerary
                </button>
                <button class="btn btn-sm btn-primary book-pkg-direct-btn" data-pkg-id="${pkg.id}">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners
    packagesContainer.querySelectorAll('.view-itinerary-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkgId = btn.getAttribute('data-pkg-id');
        openItineraryModal(pkgId);
      });
    });

    packagesContainer.querySelectorAll('.book-pkg-direct-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkgId = btn.getAttribute('data-pkg-id');
        const pkg = SRI_LANKA_DATA.packages.find(p => p.id === pkgId);
        if (pkg) {
          openBookingModal(pkg.title, pkg.basePriceUSD);
        }
      });
    });
  }

  pkgFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pkgFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.pkgFilter = btn.getAttribute('data-pkg-filter');
      renderPackages();
    });
  });

  function openItineraryModal(pkgId) {
    const pkg = SRI_LANKA_DATA.packages.find(p => p.id === pkgId);
    if (!pkg || !itineraryModal) return;

    const modalHeroImg = itineraryModal.querySelector('.modal-hero-img');
    const modalTitle = itineraryModal.querySelector('.modal-itinerary-title');
    const modalSubtitle = itineraryModal.querySelector('.modal-itinerary-subtitle');
    const modalBody = itineraryModal.querySelector('.modal-itinerary-body');

    if (modalHeroImg) modalHeroImg.src = pkg.image;
    if (modalTitle) modalTitle.textContent = pkg.title;
    if (modalSubtitle) modalSubtitle.textContent = `${pkg.durationDays} Days / ${pkg.durationNights} Nights • ${pkg.route}`;

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-light); flex-wrap: wrap; gap: 12px;">
          <div>
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-light); font-weight: 700;">Package Price</span>
            <div style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 800; color: var(--primary-teal);">${formatPrice(pkg.basePriceUSD)} <span style="font-size:0.9rem; font-weight:500; color:var(--text-muted);">/ person</span></div>
          </div>
          <button class="btn btn-primary book-from-modal-btn" data-pkg-id="${pkg.id}">
            <i class="fa-solid fa-calendar-check"></i> Book This Experience
          </button>
        </div>

        <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--primary-deep); margin-bottom: 8px;">Day-by-Day Journey Schedule</h4>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">Every day is designed for relaxed discovery, scenic comfort, and authentic local immersion.</p>

        <div class="itinerary-timeline">
          ${pkg.itinerary.map(day => `
            <div class="timeline-item">
              <div class="timeline-dot">${day.day}</div>
              <div class="timeline-content">
                <span class="timeline-day-tag">Day 0${day.day}</span>
                <h5 class="timeline-title">${day.title}</h5>
                <p class="timeline-desc">${day.description}</p>
                <div class="timeline-meta">
                  <span><i class="fa-solid fa-hotel" style="color:var(--primary-teal);"></i> ${day.hotel}</span>
                  <span><i class="fa-solid fa-utensils" style="color:var(--ceylon-gold-hover);"></i> ${day.meals}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 32px; background: var(--bg-sand); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <h5 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-deep); margin-bottom: 12px;">What's Included & Excluded</h5>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <strong style="font-size: 0.85rem; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;"><i class="fa-solid fa-circle-check"></i> Inclusions</strong>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--text-main);">
                ${pkg.inclusions.map(inc => `<li>• ${inc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <strong style="font-size: 0.85rem; color: #ef4444; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;"><i class="fa-solid fa-circle-xmark"></i> Exclusions</strong>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--text-main);">
                ${pkg.exclusions.map(exc => `<li>• ${exc}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:28px;">
          <button class="btn btn-outline-dark close-modal-btn">Close</button>
          <button class="btn btn-primary book-from-modal-btn" data-pkg-id="${pkg.id}">
            Book This Package Now
          </button>
        </div>
      `;

      modalBody.querySelectorAll('.close-modal-btn').forEach(b => b.addEventListener('click', closeModal));
      modalBody.querySelectorAll('.book-from-modal-btn').forEach(b => {
        b.addEventListener('click', () => {
          closeModal();
          openBookingModal(pkg.title, pkg.basePriceUSD);
        });
      });
    }

    openModal(itineraryModal);
  }

  /* --------------------------------------------------------------------------
     5. CUSTOM TRIP BUILDER & COST ESTIMATOR
     -------------------------------------------------------------------------- */
  const durationSlider = document.getElementById('calcDurationSlider');
  const durationBadge = document.getElementById('calcDurationBadge');
  const travelersSlider = document.getElementById('calcTravelersSlider');
  const travelersBadge = document.getElementById('calcTravelersBadge');
  const tierChips = document.querySelectorAll('.tier-chip');
  const transportChips = document.querySelectorAll('.transport-chip');
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');

  const summaryDays = document.getElementById('summaryDays');
  const summaryTravelers = document.getElementById('summaryTravelers');
  const summaryTier = document.getElementById('summaryTier');
  const summaryTransport = document.getElementById('summaryTransport');
  const summaryAddonsTotal = document.getElementById('summaryAddonsTotal');
  const summaryTotalPrice = document.getElementById('summaryTotalPrice');
  const summaryPerPerson = document.getElementById('summaryPerPerson');
  const bookCustomTripBtn = document.getElementById('bookCustomTripBtn');

  function updateCalculator() {
    const { days, travelers, tier, tierMultipliers, transport, transportDailyUSD, baseDailyPerPersonUSD, addons, addonPricesUSD } = state.calc;

    // Calculate lodging base per person
    const dailyRatePerPerson = baseDailyPerPersonUSD * tierMultipliers[tier];
    const totalLodging = dailyRatePerPerson * days * travelers;

    // Calculate transport total
    const totalTransport = transportDailyUSD[transport] * days;

    // Calculate add-ons
    let totalAddons = 0;
    if (addons.balloon) totalAddons += addonPricesUSD.balloon * travelers;
    if (addons.whale) totalAddons += addonPricesUSD.whale * travelers;
    if (addons.ayurveda) totalAddons += addonPricesUSD.ayurveda * travelers;

    // Total estimation in USD
    const totalUSD = totalLodging + totalTransport + totalAddons;
    const perPersonUSD = totalUSD / travelers;

    // Update DOM UI elements
    if (durationBadge) durationBadge.textContent = `${days} Days / ${days - 1} Nights`;
    if (travelersBadge) travelersBadge.textContent = `${travelers} Traveler${travelers > 1 ? 's' : ''}`;

    if (summaryDays) summaryDays.textContent = `${days} Days`;
    if (summaryTravelers) summaryTravelers.textContent = `${travelers} Person${travelers > 1 ? 's' : ''}`;
    
    const tierLabels = { boutique: 'Boutique & Heritage', luxury: '5-Star Luxury Villas', eco: 'Eco Nature Lodges' };
    if (summaryTier) summaryTier.textContent = tierLabels[tier];

    const transportLabels = { chauffeur: 'Private Sedan Chauffeur', suv: 'Luxury SUV / Van', combo: 'Scenic Rail & Chauffeur' };
    if (summaryTransport) summaryTransport.textContent = transportLabels[transport];

    if (summaryAddonsTotal) summaryAddonsTotal.textContent = formatPrice(totalAddons);
    if (summaryTotalPrice) summaryTotalPrice.textContent = formatPrice(totalUSD);
    if (summaryPerPerson) summaryPerPerson.textContent = `${formatPrice(perPersonUSD)} per traveler`;
  }

  if (durationSlider) {
    durationSlider.addEventListener('input', (e) => {
      state.calc.days = parseInt(e.target.value, 10);
      updateCalculator();
    });
  }

  if (travelersSlider) {
    travelersSlider.addEventListener('input', (e) => {
      state.calc.travelers = parseInt(e.target.value, 10);
      updateCalculator();
    });
  }

  tierChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tierChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.calc.tier = chip.getAttribute('data-tier');
      updateCalculator();
    });
  });

  transportChips.forEach(chip => {
    chip.addEventListener('click', () => {
      transportChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.calc.transport = chip.getAttribute('data-transport');
      updateCalculator();
    });
  });

  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      const addonKey = chk.getAttribute('data-addon');
      if (addonKey) {
        state.calc.addons[addonKey] = chk.checked;
        updateCalculator();
      }
    });
  });

  if (bookCustomTripBtn) {
    bookCustomTripBtn.addEventListener('click', () => {
      const customTitle = `Custom ${state.calc.days}-Day Tour (${state.calc.travelers} Travelers, ${state.calc.tier.toUpperCase()})`;
      openBookingModal(customTitle);
    });
  }

  /* --------------------------------------------------------------------------
     6. BOOKING & INQUIRY MODAL LOGIC
     -------------------------------------------------------------------------- */
  const bookingForm = document.getElementById('mainBookingForm');
  const bookingPackageSelect = document.getElementById('bookingPackageSelect');

  function populateBookingSelect() {
    if (!bookingPackageSelect) return;
    bookingPackageSelect.innerHTML = `
      <option value="Custom Itinerary">Custom Tailored Tour</option>
      ${SRI_LANKA_DATA.packages.map(p => `<option value="${p.title}">${p.title} (${p.durationDays}D/${p.durationNights}N)</option>`).join('')}
    `;
  }

  function openBookingModal(preselectedPackageName = null) {
    if (!bookingModal) return;
    populateBookingSelect();

    if (preselectedPackageName && bookingPackageSelect) {
      // Check if exact option exists, or create custom option
      let found = false;
      for (let opt of bookingPackageSelect.options) {
        if (opt.value === preselectedPackageName) {
          bookingPackageSelect.value = preselectedPackageName;
          found = true;
          break;
        }
      }
      if (!found) {
        const customOpt = document.createElement('option');
        customOpt.value = preselectedPackageName;
        customOpt.textContent = preselectedPackageName;
        customOpt.selected = true;
        bookingPackageSelect.appendChild(customOpt);
      }
    }

    openModal(bookingModal);
  }

  // Trigger booking from hero buttons
  document.querySelectorAll('.trigger-booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value || 'Traveler';
      const pkg = bookingPackageSelect?.value || 'Selected Tour';
      const refCode = 'SL-' + Math.floor(100000 + Math.random() * 900000);

      closeModal();
      bookingForm.reset();

      showToast(`Ayubowan, ${name}! Your inquiry for "${pkg}" is received (Ref #${refCode}). Our Ceylon travel designer will contact you within 2 hours!`, 'fa-circle-check', 6000);
    });
  }

  /* --------------------------------------------------------------------------
     7. HERO QUICK SEARCH FILTER
     -------------------------------------------------------------------------- */
  const heroSearchForm = document.getElementById('heroSearchForm');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const region = document.getElementById('heroSearchRegion')?.value;
      const style = document.getElementById('heroSearchStyle')?.value;

      if (style && style !== 'all') {
        const matchingTab = document.querySelector(`[data-pkg-filter="${style}"]`);
        if (matchingTab) matchingTab.click();
      }

      const pkgSection = document.getElementById('packages');
      if (pkgSection) {
        pkgSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Filtered packages matching your travel preferences!`, 'fa-filter');
    });
  }

  /* --------------------------------------------------------------------------
     8. FAQ ACCORDION LOGIC
     -------------------------------------------------------------------------- */
  const faqContainer = document.getElementById('faqContainer');
  if (faqContainer) {
    faqContainer.innerHTML = SRI_LANKA_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <div class="faq-question">
          <span>${faq.q}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');

    faqContainer.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const parent = q.parentElement;
        const isActive = parent.classList.contains('active');
        faqContainer.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) {
          parent.classList.add('active');
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. EXPERIENCES & ESSENTIALS RENDERING
     -------------------------------------------------------------------------- */
  const experiencesGrid = document.getElementById('experiencesGrid');
  if (experiencesGrid) {
    experiencesGrid.innerHTML = SRI_LANKA_DATA.experiences.map(exp => `
      <div class="experience-card">
        <div class="exp-icon-wrap">
          <i class="fa-solid ${exp.icon}"></i>
        </div>
        <span class="exp-tag">${exp.tag}</span>
        <h3 class="exp-title">${exp.title}</h3>
        <p class="exp-desc">${exp.description}</p>
      </div>
    `).join('');
  }

  const essentialsGrid = document.getElementById('essentialsGrid');
  if (essentialsGrid) {
    essentialsGrid.innerHTML = SRI_LANKA_DATA.practicalInfo.map(info => `
      <div class="essential-card">
        <i class="fa-solid ${info.icon} essential-icon"></i>
        <h4 class="essential-title">${info.title}</h4>
        <p class="essential-desc">${info.desc}</p>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     10. MODAL SYSTEM HELPERS
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    closeModal();
    modalEl.classList.add('active');
    state.activeModal = modalEl;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (state.activeModal) {
      state.activeModal.classList.remove('active');
      state.activeModal = null;
      document.body.style.overflow = '';
    }
  }

  // Close modals on clicking backdrop or close buttons
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* --------------------------------------------------------------------------
     11. TOAST SYSTEM HELPER
     -------------------------------------------------------------------------- */
  function showToast(message, icon = 'fa-circle-info', duration = 4000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // INITIALIZE APP
  renderDestinations();
  renderPackages();
  updateCalculator();
  populateBookingSelect();
});
