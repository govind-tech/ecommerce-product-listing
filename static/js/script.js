// Get HTML elements
const productList = document.getElementById("productList");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Store all products
let allProducts = [];

// Load products from backend API
async function loadProducts() {
    try {
        message.textContent = "Loading products...";

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {
        productList.replaceChildren();
        message.textContent = "Unable to load products. Please try again.";
        console.error("Error loading products:", error);
    }
}

// Display products on the webpage
function displayProducts(products) {
    productList.replaceChildren();

    if (products.length === 0) {
        message.textContent = "No products found.";
        return;
    }

    message.textContent = "";

    products.forEach(product => {
        // Create product card
        const card = document.createElement("section");
        card.className = "product-card";

        // Product image
        const image = document.createElement("img");
        image.src = `/static/${product.image.replace(".jpg", ".png")}`;
        image.alt = product.name;
        image.className = "product-image";

        image.onerror = function () {
            this.style.display = "none";
        };

        // Product name
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Product description
        const description = document.createElement("p");
        description.textContent = product.description;

        // Product price
        const price = document.createElement("p");
        price.textContent = `Price: ₹${Number(product.price).toFixed(2)}`;

        // Product category
        const category = document.createElement("p");
        category.textContent = `Category: ${product.category || "Other"}`;

        // View details button
        const button = document.createElement("button");
        button.textContent = "View Details";

        button.addEventListener("click", function () {
            window.location.href = `/product/${product.id}`;
        });

        // Add elements to card
        card.append(
            image,
            name,
            description,
            price,
            category,
            button
        );

        // Add card to product list
        productList.appendChild(card);
    });
}

// Search products and filter by category
function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = allProducts.filter(product => {
        const productName = (product.name || "").toLowerCase();
        const productCategory = (product.category || "").toLowerCase();
        const productDescription = (product.description || "").toLowerCase();

        const matchesSearch =
            productName.includes(query) ||
            productCategory.includes(query) ||
            productDescription.includes(query);

        const matchesCategory =
            selectedCategory === "" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Search when user types
searchInput.addEventListener("input", filterProducts);

// Filter when user selects a category
categoryFilter.addEventListener("change", filterProducts);

// Load products when page opens
loadProducts();