// ✅ Merge Bread and Cake Products
const products = [
    { id: "brioche", name: "Brioche Au Sucre", price: 90, image: "img/brioche.png", description: "A classic French pastry with a soft, buttery texture, topped with a sweet sugar crust.", sizes: ["Single", "Pack of 4"] },
    { id: "anpan", name: "Anpan", price: 120, image: "img/anpan bread.png", description: "A beloved Japanese sweet bun filled with smooth, sweet red bean paste.", sizes: ["Single", "Pack of 3"] },
    { id: "currypan", name: "Curry Pan", price: 80, image: "img/currypan.png", description: "A savory Japanese delicacy—crispy on the outside and filled with spiced curry.", sizes: ["Single", "Pack of 6"] },
    { id: "shokupan", name: "Shokupan", price: 150, image: "img/shokupan.png", description: "A traditional Japanese milk bread known for its softness and sweetness.", sizes: ["Single", "Pack of 2"] },
    { id: "saffron", name: "Saffron Sugar Buns", price: 99, image: "img/Saffron Sugar Buns - Bread By Elise.png", description: "Golden and aromatic buns infused with saffron and coated with sugar.", sizes: ["Single", "Pack of 4"] },
    { id: "mantou", name: "Fried Mantou with Condensed Milk", price: 89, image: "img/Fried Mantou with Condensed Milk.png", description: "Crispy Mantou buns best enjoyed with sweet condensed milk.", sizes: ["Single", "Pack of 5"] },
    { id: "whitebread", name: "White Fluffy Moist Bread", price: 89, image: "img/ふんわりやわらか♪白パンレシピ.png", description: "Light and fluffy bread that melts in your mouth.", sizes: ["Single", "Pack of 3"] },
    { id: "kkwabaegi", name: "Korean Twisted Donut", price: 120, image: "img/Korean Twisted Donuts.png", description: "Soft, chewy, and coated in cinnamon sugar.", sizes: ["Single", "Pack of 4"] },
    { id: "curnet", name: "Choco Curnets", price: 190, image: "img/choco curnet.png", description: "A Japanese pastry filled with rich chocolate custard.", sizes: ["Single", "Pack of 4"] },

    // ✅ Cake Products
    { id: "1", name: "Biscoff Cheesecake", price: 1299, image: "pics/biscoff-cc.png", description: "A rich and creamy cheesecake infused with Biscoff flavor.", sizes: ["6 inches", "8 inches"] },
    { id: "2", name: "Midnight Berry Swiss Roll", price: 1299, image: "pics/Chocolate-Strawberry-swiss-roll.png", description: "A luscious Swiss roll filled with dark chocolate and fresh berries.", sizes: ["Single Roll"] },
    { id: "3", name: "Choco Royal Mini Cake", price: 95, image: "pics/royal.png", description: "A decadent mini chocolate cake, perfect for a quick indulgence.", sizes: ["Single"] },
    { id: "4", name: "Creamy Mango Mousse Cake", price: 1299, image: "pics/mango-mousse.png", description: "A light, fluffy mango mousse layered with a soft sponge base.", sizes: ["6 inches", "8 inches"] },
    { id: "5", name: "Choco Overload", price: 1375, image: "pics/choco-overload.png", description: "A chocolate lover's dream with layers of rich, moist chocolate cake.", sizes: ["6 inches", "8 inches"] },
    { id: "6", name: "Matcha Berry Delight", price: 1200, image: "pics/matcha-berry.png", description: "Earthy matcha meets sweet berries in this refreshing cake.", sizes: ["6 inches", "8 inches"] },
    { id: "7", name: "Ube Royale Swiss Roll", price: 425, image: "pics/ube-royale.png", description: "A soft Ube Swiss Roll with a creamy filling.", sizes: ["Single Roll"] },
    { id: "8", name: "Blueberry Cheesecake", price: 75, image: "pics/bb-cc.png", description: "A creamy blueberry cheesecake.", sizes: ["Single"] },
    { id: "9", name: "Strawberry Shortcake", price: 1499, image: "pics/straw-cc.png", description: "Classic strawberry shortcake with fresh berries.", sizes: ["6 inches", "8 inches"] },
    { id: "10", name: "Classic Tiramisu", price: 180, image: "pics/tiramisu.png", description: "An indulgent tiramisu with layers of mascarpone and espresso.", sizes: ["Single"] },
];

function handleProductClick(productId) {
    const selectedProduct = products.find(p => p.id === productId);

    if (selectedProduct) {
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
        window.location.href = "product-detail.html";
    } else {
        alert("Product not found!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bread-card a, .product-card a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const urlParams = new URL(link.href).searchParams;
            const productId = urlParams.get("id");

            console.log("Clicked Product ID:", productId); // ✅ Debugging log
            handleProductClick(productId);
        });
    });
});

// ✅ Display the Correct Product on product-detail.html
document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        window.location.href = "bread.html"; // Redirect if no product found
        return;
    }

    // Populate product details
    document.querySelector(".ew-img").src = product.image;
    document.querySelector(".ew-img").alt = product.name;
    document.querySelector(".ew-name").textContent = product.name;
    document.querySelector(".ew-price").textContent = `₱${product.price}`;
    document.querySelector(".ew-desc").textContent = product.description;

    // Populate available sizes
    const sizeSelect = document.querySelector(".ew-size");
    product.sizes.forEach(size => {
        const option = document.createElement("option");
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    // Add to Cart Logic
    document.getElementById("add-to-cart").addEventListener("click", () => {
        addToCart(product);
    });
});
