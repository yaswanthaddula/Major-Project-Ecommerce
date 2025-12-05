const cartContainer = document.getElementById('cart-container');
const totalAmountSpan = document.getElementById('total-amount');

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<h2>Your cart is empty.</h2>";
    totalAmountSpan.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <div class="quantity">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
  });

  totalAmountSpan.textContent = total;
}

function increaseQty(index) {
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Checkout action
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // Store cart temporarily if needed later
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to address page
  window.location.href = "address.html";
});

renderCart();
