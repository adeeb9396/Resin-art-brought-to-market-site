
// Resin Art: Brought to Market
// These products and prices are demonstration examples.

const products = [
    {
        id: 1,
        name: "Resin Keychain",
        description: "A small decorative accessory.",
        price: 199,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Resin Jewellery",
        description: "Decorative jewellery for special occasions.",
        price: 399,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Decorative Tray",
        description: "A stylish accent for your home.",
        price: 799,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Resin Coaster Set",
        description: "Decorative coasters for your table.",
        price: 499,
        image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Personalized Gift",
        description: "A thoughtful gift idea.",
        price: 599,
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Resin Decoration",
        description: "An artistic decorative piece.",
        price: 899,
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80"
    }
];

let cart = [];

// Display all products
function displayProducts() {
    const grid = document.getElementById("product-grid");

    grid.innerHTML = products.map(product => `
        <article class="product-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">
                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">
                    <span class="product-price">
                        ₹${product.price}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to your cart!");
}

// Update the shopping cart
function updateCart() {
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = cartCount;

    document.getElementById("cart-total").textContent =
        cartTotal.toLocaleString("en-IN");

    const cartItems = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-row">
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <button
                    onclick="changeQuantity(${item.id}, -1)"
                    aria-label="Decrease quantity"
                >−</button>

                <strong>${item.quantity}</strong>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                    aria-label="Increase quantity"
                >+</button>

                <button
                    onclick="removeFromCart(${item.id})"
                >Remove</button>
            </div>
        </div>
    `).join("");
}

// Change product quantity
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

// Remove an item
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show or hide the cart
function toggleCart() {
    const section = document.getElementById("cart-section");

    section.hidden = !section.hidden;

    if (!section.hidden) {
        updateCart();
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// Submit an order enquiry
function placeOrder() {
    if (cart.length === 0) {
        alert("Please add a product to your cart first.");
        return;
    }

    const orderSummary = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Demo Order Enquiry\n\n" +
        orderSummary +
        "\n\nTotal: ₹" + total +
        "\n\nThis is a demonstration only. " +
        "Your order has not been sent to a seller."
    );
}

// Contact form demonstration
document.getElementById("contact-form").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            document.getElementById("form-status").textContent =
                "Please complete all fields.";

            return;
        }

        document.getElementById("form-status").textContent =
            "Thank you, " + name +
            "! The form works as a demo, but your message has not been sent.";

        this.reset();
    }
);

// Current year in the footer
document.getElementById("year").textContent =
    new Date().getFullYear();

// Start the website
displayProducts();
updateCart();

