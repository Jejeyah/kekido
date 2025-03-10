
// Function to load the cart from local storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save the cart to local storage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart count in the header
function updateCartIcon() {
    let cart = getCart();
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Limit display to 99+
    document.getElementById("cart-count").textContent = totalQuantity > 99 ? "99" : totalQuantity;
}

// Function to add an item to the cart
function addToCart(productId, productName, productPrice, productImage) {
    let cart = getCart();
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Check if cart is full (99 items max)
    if (totalQuantity >= 99) {
        showCartFullToast();
        return;
    }

    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Ensure total doesn't exceed 99
        if (totalQuantity + 1 > 99) {
            showCartFullToast();
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartIcon();
    showCartNotification(productName, productImage);

    // 🔹 Ensure the cart page updates immediately
    if (window.location.pathname.includes("cart.html")) {
        loadCart(); // Reload cart page if already on it
    }
}

// Function to show the "Item Added" notification
function showCartNotification(productName, productImage) {
    const notification = document.getElementById("cart-notification");
    document.getElementById("cart-item-name").textContent = productName;
    document.getElementById("cart-item-img").src = productImage;

    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 2000); // Hide after 2 seconds
}

function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    let count = cart.length;
    
    if (count === 0) {
        cartCountElement.style.visibility = "hidden"; // Hide when no items
    } else {
        cartCountElement.style.visibility = "visible"; // Show when > 0
        cartCountElement.innerText = count > 99 ? "99" : count; // Limit to "99+"
    }
}

// Function to show the "Cart Full" toast
function showCartFullToast() {
    const toast = document.getElementById("cart-full-toast");
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000); // Hide after 3 seconds
}

// Attach event listeners to all "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            let productCard = button.closest(".product-card") || button.closest(".bread-card");
            if (!productCard) return;

            let productName = productCard.querySelector("h3, .bread-name").textContent;
            
            let priceElement = productCard.querySelector(".price p, .bread-price");
            let productPrice = parseInt(priceElement.textContent.replace("₱", "").replace(",", ""));

            let productImage = productCard.querySelector("img").src;
            let productId = productName.replace(/\s+/g, "-").toLowerCase() + "-" + Math.random().toString(36).substr(2, 5);

            addToCart(productId, productName, productPrice, productImage);
        });
    });
});