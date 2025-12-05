// scripts/home.js
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const productsContainer = document.getElementById('products-container');
const cartCount = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');  // Make sure your HTML input has id="search-input"

let allProducts = []; // Store all products

// Load products from Firestore
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    allProducts = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      allProducts.push({ ...product, id: doc.id });
    });
    renderFilteredProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Render filtered products
function renderFilteredProducts(products) {
  productsContainer.innerHTML = ''; // Clear old products
  products.forEach(product => renderProductCard(product, product.id));
}

// Render single product card
function renderProductCard(product, id) {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart('${id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
  `;

  productsContainer.appendChild(card);
}

// Add to cart function
window.addToCart = function (id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.id === id);
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showSuccess(`${name} added to cart!`);
};

// Update cart icon count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

// Show popup message
function showSuccess(message) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = 'success-popup';
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 2000);
}

// Live Search Filter
searchInput?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.name && product.name.toLowerCase().includes(query)
  );
  renderFilteredProducts(filtered);
});

// Initialize
loadProducts();
updateCartCount();
