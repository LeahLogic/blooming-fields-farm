document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Farm website initializing...');

    setupFlowerToggle();
    setupSmoothScroll();
    setupForms();
    setupActiveNav();
    setupAnimations();
    setupFarmStatus();
    setupVisitCounter();
    setupStrawberryCountdown();
    setupSeasonalProducts();
    setupMapControls();
    setupModalHandlers();
    setupFooterLinks();

    addDynamicStyles();

    console.log('✅ All functions initialized');
});

function setupFlowerToggle() {
    const btn = document.getElementById('toggleFlowers');
    const moreFlowers = document.querySelector('.more-flowers');

    if (btn && moreFlowers) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        document.getElementById('toggleFlowers').addEventListener('click', function() {
            const isHidden = moreFlowers.classList.contains('d-none');

            if (isHidden) {
                moreFlowers.classList.remove('d-none');
                this.textContent = 'Hide Flowers';
                console.log('🌺 Flowers shown');
            } else {
                moreFlowers.classList.add('d-none');
                this.textContent = 'View All Flowers';
                console.log('🌺 Flowers hidden');
            }
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                const mobileMenu = document.querySelector('.navbar-collapse.show');
                if (mobileMenu) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });
}

function setupForms() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }

    const newsletterForm = document.querySelector('.item.py-5 form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
}

function setupActiveNav() {
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

function setupAnimations() {
    function checkAnimations() {
        const cards = document.querySelectorAll('.product-card, .card');

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                card.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', checkAnimations);
    checkAnimations();
}

function setupFarmStatus() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    const month = now.getMonth() + 1;

    let status = '',
        icon = '🌱',
        isOpen = false;

    if (day === 0) {
        if (hours >= 10 && hours < 16) {
            status = 'Open now! (Sunday 10am-4pm)';
            icon = '⛅';
            isOpen = true;
        } else if (hours < 10) {
            status = 'Opens at 10am today';
            icon = '⏰';
        } else {
            status = 'Closed now (opens tomorrow at 8am)';
            icon = '🌙';
        }
    } else {
        if (hours >= 8 && hours < 17) {
            status = 'Open now! (8am-5pm)';
            icon = '☀️';
            isOpen = true;
        } else if (hours < 8) {
            status = 'Opens at 8am today';
            icon = '⏰';
        } else {
            status = 'Closed now (opens tomorrow at 8am)';
            icon = '🌙';
        }
    }

    let seasonMsg = '';
    if (month >= 3 && month <= 5) seasonMsg = '🌸 Spring blossoms are blooming!';
    else if (month >= 6 && month <= 8) seasonMsg = '☀️ Summer berries are ripe!';
    else if (month >= 9 && month <= 11) seasonMsg = '🍁 Fall colors are showing!';
    else seasonMsg = '❄️ Winter - see you in spring!';

    const heroSection = document.querySelector('.hero-section .container');
    if (heroSection && !heroSection.querySelector('.farm-status')) {
        const statusDiv = document.createElement('div');
        statusDiv.className = `farm-status alert mt-4 ${isOpen ? 'alert-success' : 'alert-info'}`;
        statusDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="fs-4 me-3">${icon}</span>
                <div>
                    <strong>${status}</strong><br>
                    <small>${seasonMsg}</small>
                </div>
            </div>
        `;
        heroSection.appendChild(statusDiv);
    }
}

function setupVisitCounter() {
    let visits = localStorage.getItem('farmVisitCount') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('farmVisitCount', visits);

    const counterElement = document.getElementById('visitCounter');
    if (counterElement) {
        counterElement.innerHTML = `
            <div class="d-inline-flex align-items-center">
                <i class="bi bi-eye me-2"></i>
                <span>This educational project has been viewed <strong>${visits}</strong> times</span>
            </div>
        `;
    }
}

function setupStrawberryCountdown() {
    const currentYear = new Date().getFullYear();
    let strawberrySeason = new Date(currentYear, 4, 1);

    const now = new Date();
    if (now > strawberrySeason) {
        strawberrySeason.setFullYear(currentYear + 1);
    }

    const daysLeft = Math.ceil((strawberrySeason - now) / (1000 * 60 * 60 * 24));

    if (daysLeft > 0 && daysLeft < 365) {
        const strawberryCard = document.querySelector('#berries .card:first-child .card-body');
        if (strawberryCard && !strawberryCard.querySelector('.strawberry-countdown')) {
            const countdownDiv = document.createElement('div');
            countdownDiv.className = 'strawberry-countdown mt-3';
            countdownDiv.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-calendar-heart me-2"></i>
                    <strong>${daysLeft} days</strong> until strawberry season begins!
                </div>
            `;
            strawberryCard.appendChild(countdownDiv);
        }
    }
}

function setupSeasonalProducts() {
    const currentMonth = new Date().getMonth() + 1;

    let seasonalProducts = [];
    if (currentMonth >= 3 && currentMonth <= 5) {
        seasonalProducts = ['Tulips', 'Peonies', 'Cherry'];
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        seasonalProducts = ['Hydrangea', 'Lavender', 'Strawberry', 'Blueberry', 'Raspberry'];
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        seasonalProducts = ['Apple', 'Pear'];
    }

    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title');
        if (title) {
            const productName = title.textContent;
            if (seasonalProducts.some(seasonal => productName.includes(seasonal))) {
                if (!card.querySelector('.season-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'season-badge position-absolute top-0 end-0 m-2';
                    badge.innerHTML = '<span class="badge bg-success">In Season Now!</span>';
                    card.style.position = 'relative';
                    card.appendChild(badge);
                }
            }
        }
    });
}

function setupMapControls() {
    setTimeout(() => {
        const mapIframe = document.querySelector('#gmap_canvas');
        if (mapIframe) {
            const mapContainer = mapIframe.parentElement;
            mapContainer.style.position = 'relative';

            const expandBtn = document.createElement('button');
            expandBtn.className = 'map-expand-btn';
            expandBtn.innerHTML = '⛶';
            expandBtn.title = 'Expand map';

            expandBtn.addEventListener('click', function() {
                mapContainer.classList.toggle('fullscreen');
                if (mapContainer.classList.contains('fullscreen')) {
                    this.innerHTML = '✕';
                    document.body.style.overflow = 'hidden';
                } else {
                    this.innerHTML = '⛶';
                    document.body.style.overflow = '';
                }
            });

            mapContainer.appendChild(expandBtn);
        }
    }, 2000);
}

function setupModalHandlers() {
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                } else {
                    modal.classList.remove('show');
                    modal.style.display = 'none';
                    document.body.classList.remove('modal-open');
                }
            } else {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        }
    }

    document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.querySelectorAll('.modal .btn').forEach(btn => {
        if (btn.textContent.match(/got it|close|understand/i)) {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) closeModal(modal.id);
            });
        }
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) closeModal(openModal.id);
        }
    });
}

function setupFooterLinks() {
    document.querySelectorAll('.educational-notice a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

function addDynamicStyles() {
    const styles = `
    /* Анимация карточек */
    .product-card, .card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .product-card.fade-in, .card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Активная навигация */
    .navbar-nav .nav-link.active {
        color: #fff !important;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 4px;
    }
    
    /* Educational notice */
    .educational-notice {
        background: linear-gradient(135deg, #328E6E 0%, #4caf93 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin-top: 30px;
        border-left: 5px solid #ffeb3b;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .educational-notice .project-link {
        color: #ffeb3b !important;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s;
    }
    
    .educational-notice .project-link:hover {
        color: white !important;
        text-decoration: underline;
    }
    
    /* Счетчик посещений */
    #visitCounter {
        background: rgba(255, 255, 255, 0.1);
        padding: 10px 20px;
        border-radius: 20px;
        display: inline-block;
        font-size: 0.9rem;
    }
    
    /* Кнопка карты */
    .map-expand-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: 2px solid #328E6E;
        color: #328E6E;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .map-expand-btn:hover {
        background: #328E6E;
        color: white;
    }
    
    /* Карта на весь экран */
    .fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
        background: white;
    }
    
    /* Сезонные бейджи */
    .season-badge {
        z-index: 1;
    }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
}