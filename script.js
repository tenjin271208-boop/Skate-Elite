/* ========================================
   BASE DE DONNÉES PRODUITS AVEC IMAGES
   ======================================== */

const products = [
    {
        id: 1,
        name: 'Pro Deck X1 Carbon',
        category: 'street',
        description: 'Deck professionnel en carbone 7 plis pour tricks extrêmes',
        price: 149.99,
        rating: 4.9,
        reviews: 245,
        badge: 'Populaire',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=600&fit=crop',
        specs: ['Deck 8.25"', 'Carbone HD', 'Poids: 520g']
    },
    {
        id: 2,
        name: 'Urban Cruiser Pro',
        category: 'freestyle',
        description: 'Parfait pour les trajets urbains avec style intemporel',
        price: 129.99,
        rating: 4.8,
        reviews: 187,
        badge: 'Nouveau',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=600&h=600&fit=crop',
        specs: ['Deck 8.5"', 'Érable 9 plis', 'Poids: 580g']
    },
    {
        id: 3,
        name: 'Freestyle Master',
        category: 'freestyle',
        description: 'Spécialisé pour les kickflips et manuals impossibles',
        price: 159.99,
        rating: 4.95,
        reviews: 312,
        badge: 'Best-seller',
        image: 'https://images.unsplash.com/photo-1516622328381-7ee09eac1e58?w=600&h=600&fit=crop',
        specs: ['Deck 8.0"', 'Érable premium', 'Poids: 490g']
    },
    {
        id: 4,
        name: 'Speed Demon DH',
        category: 'downhill',
        description: 'Pour les descentes rapides et les compétitions de downhill',
        price: 189.99,
        rating: 4.85,
        reviews: 156,
        badge: 'Premium',
        image: 'https://images.unsplash.com/photo-1571902970337-3d73a5b4d35d?w=600&h=600&fit=crop',
        specs: ['Deck 9.0"', 'Bambou carbone', 'Poids: 620g']
    },
    {
        id: 5,
        name: 'Beginner Board',
        category: 'street',
        description: 'Idéal pour débuter le skateboard. Stable et durable',
        price: 89.99,
        rating: 4.7,
        reviews: 428,
        badge: 'Populaire',
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6c4d?w=600&h=600&fit=crop',
        specs: ['Deck 7.8"', 'Érable standard', 'Poids: 450g']
    },
    {
        id: 6,
        name: 'Street Legend X',
        category: 'street',
        description: 'Édition limitée pour les riders expérimentés. Couleur exclusive.',
        price: 199.99,
        rating: 5.0,
        reviews: 89,
        badge: 'Limité',
        image: 'https://images.unsplash.com/photo-1508270828219-a3a9987e0402?w=600&h=600&fit=crop',
        specs: ['Deck 8.25"', 'Érable sélectionné', 'Poids: 510g']
    }
];

/* ========================================
   GESTION DU PANIER
   ======================================== */

let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`✓ ${product.name} ajouté au panier!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity) || 1);
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    const cartItemsContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-qty">
                        <input type="number" min="1" value="${item.quantity}" 
                               onchange="updateQuantity(${item.id}, this.value)"
                               style="width: 50px; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">
                    </div>
                </div>
                <div>
                    <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)} €</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

/* ========================================
   AFFICHAGE DES PRODUITS
   ======================================== */

function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s;">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                
                <div class="product-stats">
                    <span>⭐ ${product.rating}</span>
                    <span>(${product.reviews} avis)</span>
                </div>

                <div class="product-footer">
                    <div class="product-price">${product.price.toFixed(2)} €</div>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'street': 'STREET',
        'freestyle': 'FREESTYLE',
        'downhill': 'DOWNHILL'
    };
    return labels[category] || 'GÉNÉRAL';
}

function filterProducts(category) {
    // Mise à jour des boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Affichage des produits filtrés
    renderProducts(category);
}

/* ========================================
   GESTION DU PANIER FLOTTANT
   ======================================== */

document.getElementById('cart-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cart-panel').classList.add('active');
});

document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-panel').classList.remove('active');
});

// Fermer le panier en cliquant en dehors
document.addEventListener('click', function(e) {
    const cartPanel = document.getElementById('cart-panel');
    const cartToggle = document.getElementById('cart-toggle');
    
    if (!cartPanel.contains(e.target) && !cartToggle.contains(e.target) && cartPanel.classList.contains('active')) {
        cartPanel.classList.remove('active');
    }
});

/* ========================================
   FORMULAIRE DE CONTACT
   ======================================== */

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input, textarea');
    const nom = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;

    // Simulation d'envoi
    showNotification('✓ Merci! Votre message a été envoyé avec succès.', 'success');
    
    console.log({
        nom: nom,
        email: email,
        message: message,
        date: new Date().toLocaleString('fr-FR')
    });

    this.reset();
});

/* ========================================
   PAIEMENT
   ======================================== */

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderSummary = cart.map(item => 
        `${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}€`
    ).join('\n');

    console.log('=== COMMANDE ===');
    console.log(orderSummary);
    console.log(`\nTotal: ${total.toFixed(2)}€`);
    console.log(`Date: ${new Date().toLocaleString('fr-FR')}`);
    console.log('================');

    showNotification(
        `✓ Commande confirmée!\nTotal: ${total.toFixed(2)}€\n\nVous recevrez une confirmation par email.`,
        'success'
    );

    setTimeout(() => {
        cart = [];
        updateCartUI();
        document.getElementById('cart-panel').classList.remove('active');
    }, 1500);
});

/* ========================================
   NOTIFICATIONS
   ======================================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        'success': '#00b894',
        'error': '#FF4757',
        'info': '#667eea'
    };

    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 1rem 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 400px;
        white-space: pre-line;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

/* ========================================
   MENU MOBILE
   ======================================== */

document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

/* ========================================
   ANIMATIONS AU SCROLL
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/* ========================================
   INITIALISATION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🛹 Bienvenue sur SKATE ELITE!', 'font-size: 24px; font-weight: bold; color: #FF4757;');
    console.log('%cLa meilleure sélection de skateboards premium', 'font-size: 14px; color: #667eea;');
    console.log('%cContact: +33 (0)1 45 67 89 12 | support@skatepro.fr', 'font-size: 12px; color: #666;');

    renderProducts();
    updateCartUI();

    // Observation des éléments
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Parallax sur scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });

    // Dark mode toggle (optionnel)
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

/* ========================================
   UTILITAIRES
   ======================================== */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Animation au scroll des sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.products-section, .about-section, .contact-section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            section.style.opacity = '1';
        }
    });
});

// Gestion de la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('cart-panel').classList.remove('active');
    }
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});
