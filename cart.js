const cartItemsContainer = document.createElement("div");
cartItemsContainer.className = "p-6 space-y-4";
document.body.appendChild(cartItemsContainer);

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update badge
const cartCount = document.getElementById("cart-count");
if (cartCount) cartCount.textContent = cart.length;

if (cart.length === 0) {
  cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded bg-white";
    div.innerHTML = `
      <h2 class="font-semibold">${item.name}</h2>
      <p class="text-gray-600">$${item.price}</p>
    `;
    cartItemsContainer.appendChild(div);
  });
}
