/* ==========================================
   MM BIRYANI CENTRE - JAVASCRIPT FUNCTIONALITY
   ========================================== */

// ==========================================
// MENU DATA
// ==========================================

const menuData = [
    {
        id: 1,
        name: "Chicken Biryani",
        category: "biryani",
        description: "Fragrant rice cooked with tender chicken and aromatic spices",
        price: 450,
        image: "https://images.unsplash.com/photo-1589302168068-964664565272?w=300&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Beef Biryani",
        category: "biryani",
        description: "Premium beef pieces layered with basmati rice and traditional spices",
        price: 550,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2e60a014?w=300&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Special Biryani",
        category: "biryani",
        description: "Our signature blend with mixed meats and exotic spices",
        price: 650,
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e6f5eb3f?w=300&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Chicken Tikka",
        category: "chicken",
        description: "Marinated chicken pieces grilled to perfection",
        price: 350,
        image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd53c4f?w=300&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Chicken Karahi",
        category: "chicken",
        description: "Spiced chicken cooked with tomatoes and bell peppers",
        price: 400,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Butter Chicken",
        category: "chicken",
        description: "Creamy tomato-based gravy with tender chicken pieces",
        price: 420,
        image: "https://images.unsplash.com/photo-1585521914004-84a1f9caa3cb?w=300&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Plain Rice",
        category: "rice",
        description: "Fluffy white basmati rice",
        price: 150,
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Pulao",
        category: "rice",
        description: "Rice cooked with herbs and spices",
        price: 200,
        image: "https://images.unsplash.com/photo-1609137144813-57f2e03fdd87?w=300&h=300&fit=crop"
    },
    {
        id: 9,
        name: "Raita",
        category: "rice",
        description: "Yogurt-based side dish with cucumber and spices",
        price: 80,
        image: "https://images.unsplash.com/photo-1585518419759-4d4ee0643b47?w=300&h=300&fit=crop"
    },
    {
        id: 10,
        name: "Soft Drinks",
        category: "drinks",
        description: "Refreshing cold beverages",
        price: 100,
        image: "https://images.unsplash.com/photo-1554866585-acbb2f2dee2d?w=300&h=300&fit=crop"
    },
    {
        id: 11,
        name: "Lassi",
        category: "drinks",
        description: "Traditional yogurt-based drink",
        price: 120,
        image: "https://images.unsplash.com/photo-1553530666-ba2a8e36cd12?w=300&h=300&fit=crop"
    },
    {
        id: 12,
        name: "Mango Shake",
        category: "drinks",
        description: "Fresh mango smoothie",
        price: 150,
        image: "https://images.unsplash.com/photo-1590080876009-ce8d36860882?w=300&h=300&fit=crop"
    },
    {
        id: 13,
        name: "Biryani Combo",
        category: "deals",
        description: "Biryani + Raita + Soft Drink",
        price: 500,
        image: "https://images.unsplash.com/photo-1589302168068-964664565272?w=300&h=300&fit=crop"
    },
    {
        id: 14,
        name: "Family Feast",
        category: "deals",
        description: "2 Biryani + 2 Soft Drinks + Raita",
        price: 1200,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2e60a014?w=300&h=300&fit=crop"
    }
];

// ==========================================
// STATE MANAGEMENT
// ==========================================

let cart = [];
let currentFilter = 'all';

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    setupEventListeners();
    loadCartFromStorage();
});

// ==========================================
// MENU FUNCTIONS
// ==========================================

function initializeMenu() {
    renderMenuItems(menuData);
}

function renderMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    if (items.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No items found</p>';
        return;
    }

    items.forEach(item => {
        const card = createMenuCard(item);
        menuGrid.appendChild(card);
    });
}

function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.category = item.category;

    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-card-image">
        <div class="menu-card-content">
            <h3 class="menu-card-name">${item.name}</h3>
            <p class="menu-card-description">${item.description}</p>
            <p class="menu-card-price">Rs. ${item.price}</p>
            
            <div class="quantity-control">
                <button onclick="decreaseQuantity(this)">−</button>
                <input type="number" value="1" min="1" class="item-quantity">
                <button onclick="increaseQuantity(this)">+</button>
            </div>
            
            <div class="menu-card-buttons">
                <button class="btn btn-secondary" onclick="addToCart(${item.id}, event)">Add to Cart</button>
                <button class="btn btn-primary" onclick="orderNow(${item.id}, event)">Order Now</button>
            </div>
        </div>
    `;

    return card;
}

function filterMenu(category) {
    currentFilter = category;

    // Update active tab
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Filter items
    if (category === 'all') {
        renderMenuItems(menuData);
    } else {
        const filtered = menuData.filter(item => item.category === category);
        renderMenuItems(filtered);
    }
}

function increaseQuantity(button) {
    const input = button.parentElement.querySelector('.item-quantity');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(button) {
    const input = button.parentElement.querySelector('.item-quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ==========================================
// CART FUNCTIONS
// ==========================================

function addToCart(itemId, event) {
    event.preventDefault();

    const menuCard = event.target.closest('.menu-card');
    const quantityInput = menuCard.querySelector('.item-quantity');
    const quantity = parseInt(quantityInput.value);

    const item = menuData.find(item => item.id === itemId);

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }

    // Reset quantity
    quantityInput.value = 1;

    // Save cart and show notification
    saveCartToStorage();
    showNotification('Added to cart!');
}

function orderNow(itemId, event) {
    event.preventDefault();

    const menuCard = event.target.closest('.menu-card');
    const quantityInput = menuCard.querySelector('.item-quantity');
    const quantity = parseInt(quantityInput.value);

    const item = menuData.find(item => item.id === itemId);

    // Clear cart and add this item
    cart = [{
        ...item,
        quantity: quantity
    }];

    quantityInput.value = 1;
    saveCartToStorage();
    scrollToCheckout();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    updateCartDisplay();
}

function updateCartQuantity(itemId, newQuantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

function clearCart() {
    if (cart.length === 0) {
        alert('Cart is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        saveCartToStorage();
        document.getElementById('cartSection').style.display = 'none';
        showNotification('Cart cleared');
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    const subtotalEl = document.getElementById('subtotal');
    const grandTotalEl = document.getElementById('grandTotal');

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="color: #888; text-align: center;">Cart is empty</p>';
        subtotalEl.textContent = 'Rs. 0';
        grandTotalEl.textContent = 'Rs. 150';
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-qty">Quantity: ${item.quantity}</div>
            </div>
            <span class="cart-item-price">Rs. ${itemTotal}</span>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartList.appendChild(cartItem);
    });

    const deliveryFee = 150;
    const total = subtotal + deliveryFee;

    subtotalEl.textContent = `Rs. ${subtotal}`;
    grandTotalEl.textContent = `Rs. ${total}`;
}

function saveCartToStorage() {
    localStorage.setItem('mmBiryaniCart', JSON.stringify(cart));
    updateCartDisplay();
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('mmBiryaniCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// ==========================================
// CHECKOUT & ORDER FUNCTIONS
// ==========================================

function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert('Please add items to your cart first!');
        return;
    }

    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim();

    // Validation
    if (!customerName || !customerPhone || !deliveryAddress) {
        alert('Please fill in all required fields!');
        return;
    }

    if (!/^\d{10,}$/.test(customerPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid phone number!');
        return;
    }

    // Prepare order details
    const orderItems = cart.map(item => `${item.name} (Qty: ${item.quantity})`).join('\n');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 150;

    // Store order info
    const orderInfo = {
        name: customerName,
        phone: customerPhone,
        address: deliveryAddress,
        notes: orderNotes,
        items: orderItems,
        total: total,
        timestamp: new Date().toLocaleString()
    };

    // Show confirmation
    const confirmationMessage = `
Order Details:
Customer: ${customerName}
Phone: ${customerPhone}
Address: ${deliveryAddress}
Total: Rs. ${total}

${orderNotes ? 'Notes: ' + orderNotes : ''}
    `.trim();

    document.getElementById('confirmationMessage').textContent = confirmationMessage;
    document.getElementById('confirmationModal').style.display = 'block';

    // Send WhatsApp message (optional - comment out if not needed)
    sendWhatsAppOrder(orderInfo);

    // Clear form and cart
    document.getElementById('orderForm').reset();
    cart = [];
    saveCartToStorage();
}

function sendWhatsAppOrder(orderInfo) {
    const message = `Hello MM Biryani Centre,

I would like to place an order:

*Customer Name:* ${orderInfo.name}
*Phone:* ${orderInfo.phone}
*Delivery Address:* ${orderInfo.address}

*Items:*
${orderInfo.items}

*Total Amount:* Rs. ${orderInfo.total}

${orderInfo.notes ? `*Special Notes:* ${orderInfo.notes}` : ''}

Please confirm this order. Thank you!`;

    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    // Uncomment the line below to automatically open WhatsApp
    // window.open(whatsappUrl, '_blank');
}

function closeConfirmation() {
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// SCROLL & NAVIGATION FUNCTIONS
// ==========================================

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    menuSection.scrollIntoView({ behavior: 'smooth' });

    if (cart.length > 0) {
        setTimeout(() => {
            showCartSection();
        }, 500);
    }
}

function scrollToCheckout() {
    showCartSection();
    const cartSection = document.getElementById('cartSection');
    setTimeout(() => {
        cartSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function showCartSection() {
    const cartSection = document.getElementById('cartSection');
    if (cart.length > 0) {
        cartSection.style.display = 'block';
        updateCartDisplay();
    }
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-container')) {
            navLinks.classList.remove('active');
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('confirmationModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab button active state
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        if (index === 0) {
            btn.classList.add('active');
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 5000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==========================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ==========================================

if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView();
                    }
                }
            });
        });
    };
    smoothScroll();
}

// ==========================================
// ADDITIONAL CSS ANIMATIONS (defined in style but used here)
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('confirmationModal');
        if (modal.style.display === 'block') {
            closeConfirmation();
        }
    }

    // CTRL/CMD + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        scrollToMenu();
    }
});

// ==========================================
// PAGE VISIBILITY & PERFORMANCE
// ==========================================

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animation = 'none';
    } else {
        // Resume animations
    }
});

console.log('MM Biryani Centre Website Loaded Successfully!');
