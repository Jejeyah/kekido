// ✅ Debug the current path
console.log("Current Path:", window.location.pathname);


// ✅ Fetch product from localStorage (Store globally for reuse)
window.product = JSON.parse(localStorage.getItem("selectedProduct"));

// ✅ Redirect if no product found (Reusable function)
function redirectIfNoProduct() {
    if (!window.product) {
        const redirectPage = window.location.pathname.includes("cake") ? "cake.html" : "bread.html";
        window.location.href = redirectPage;
    }
}
redirectIfNoProduct(); // Perform initial check

document.addEventListener("DOMContentLoaded", function onLoad() {
    console.log("DOMContentLoaded triggered!");

    // Unbind the event after execution para di ito maulit
    document.removeEventListener("DOMContentLoaded", onLoad);

    // ✅ Populate product details if available
    const { image, name, price, description, sizes } = window.product;

    document.querySelector(".ew-img").src = image;
    document.querySelector(".ew-img").alt = name;
    document.querySelector(".ew-name").textContent = name;
    document.querySelector(".ew-price").textContent = `₱${price}`;
    document.querySelector(".ew-desc").textContent = description;

    // ✅ Populate sizes dropdown (Fix duplicate options)
    const sizeSelect = document.querySelector(".ew-size");
    sizeSelect.innerHTML = ""; // Clear previous options before appending new ones

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    console.log("Dropdown populated!");
});

    // ✅ Handle "Add to Cart" click
    document.getElementById("add-to-cart").addEventListener("click", () => {
        addToCart(window.product);
    });
