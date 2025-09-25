const cartItemsContainer = document.createElement("div");
cartItemsContainer.className = "p-6 space-y-4";
document.body.appendChild(cartItemsContainer);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart badge
const cartCount = document.getElementById("cart-count");
if (cartCount) cartCount.textContent = getTotalQuantity();

function renderCart() {
  cartItemsContainer.innerHTML = ""; // clear before re-render

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (cartCount) cartCount.textContent = 0;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded bg-white flex justify-between items-center";

    // Item info + dropdown + remove
    div.innerHTML = `
      <div>
        <h2 class="font-semibold">${item.name}</h2>
        <p class="text-gray-600">$${item.price}</p>
      </div>
      <div class="flex items-center gap-2">
        <label for="qty-${index}" class="text-sm">Qty:</label>
        <select id="qty-${index}" class="border rounded p-1">
          ${[1, 2, 3, 4, 5].map(num => `
            <option value="${num}" ${item.quantity === num ? "selected" : ""}>${num}</option>
          `).join("")}
        </select>
        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Remove
        </button>
      </div>
    `;

    // Hook up quantity change
    div.querySelector(`#qty-${index}`).addEventListener("change", (e) => {
      updateQuantity(index, parseInt(e.target.value));
    });

    // Hook up remove button
    div.querySelector("button").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartItemsContainer.appendChild(div);
  });

  if (cartCount) cartCount.textContent = getTotalQuantity();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateQuantity(index, newQty) {
  cart[index].quantity = newQty;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function getTotalQuantity() {
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

// Initial render
renderCart();
