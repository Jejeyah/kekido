
document.addEventListener("DOMContentLoaded", function () {
  console.log("📌 Script Loaded");

  // 🔽 Dropdown Menu Logic
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  if (dropbtn && dropdownContent) {
      dropbtn.addEventListener("click", function (event) {
          event.stopPropagation();
          dropdownContent.classList.toggle("active");
      });

      document.addEventListener("click", function (event) {
          if (!dropdownContent.contains(event.target) && !dropbtn.contains(event.target)) {
              dropdownContent.classList.remove("active");
          }
      });
  } else {
      console.warn("⚠️ Dropdown elements not found.");
  }

  // 🔽 Additional Dropdown Buttons (if any)
  const dropdownButtons = document.querySelectorAll(".dropbutton");

  dropdownButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
          event.stopPropagation();
          const dropdownContent = this.nextElementSibling;
          closeAllDropdowns();
          dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
      });
  });

  document.addEventListener("click", function () {
      closeAllDropdowns();
  });

  function closeAllDropdowns() {
      document.querySelectorAll(".dropdwn-cntnt").forEach((menu) => {
          menu.style.display = "none";
      });
  }

  // 🔽 Carousel Logic
  let currentIndex = 0;

  function moveCarousel(index) {
      const carousel = document.querySelector(".product-container");
      if (!carousel) {
          console.warn("⚠️ Product container not found.");
          return;
      }

      const cardWidth = 220;
      const totalCards = carousel.children.length;
      const visibleCards = 3;
      const maxIndex = totalCards - visibleCards;

      index = Math.max(0, Math.min(index, maxIndex));
      currentIndex = index;

      const offset = index * cardWidth * -1;
      carousel.style.transform = `translateX(${offset}px)`;

      document.querySelectorAll(".dot").forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
      });
  }

  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const dots = document.querySelectorAll(".dot");

  if (leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => {
          if (currentIndex > 0) moveCarousel(currentIndex - 1);
      });
      rightArrow.addEventListener("click", () => {
          moveCarousel(currentIndex + 1);
      });
  } else {
      console.warn("⚠️ Carousel arrows not found.");
  }

  if (dots.length) {
      dots.forEach((dot, i) => {
          dot.addEventListener("click", () => moveCarousel(i));
      });
  } else {
      console.warn("⚠️ Dots not found.");
  }

  // 🔽 Price Sorting Logic
  const priceSortOptions = document.querySelectorAll(".price-sort-option");
  const productContainer = document.querySelector(".bread-container");
  let products = Array.from(document.querySelectorAll(".bread-card"));

  if (!productContainer || products.length === 0) {
      console.error("❌ ERROR: Elements not found. Check class names in HTML!");
      return;
  }

  priceSortOptions.forEach(option => {
      option.addEventListener("click", function () {
          console.log("🔄 Sorting triggered:", this.dataset.sort);

          let sortedProducts = [...products]; // Copy array before sorting
          sortedProducts.sort((a, b) => {
              return this.dataset.sort === "low-to-high"
                  ? getPrice(a) - getPrice(b)
                  : getPrice(b) - getPrice(a);
          });

          console.log("✅ Sorted Prices:", sortedProducts.map(p => getPrice(p)));

          // Reorder elements without clearing innerHTML
          sortedProducts.forEach(product => productContainer.appendChild(product));
      });
  });

  function getPrice(product) {
      let priceText = product.querySelector(".bread-price").textContent.replace("₱", "").trim();
      let price = parseFloat(priceText);
      console.log("💰 Extracted Price:", price);
      return price || 0;
  }
});
