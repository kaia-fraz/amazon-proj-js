let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update badge count
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

// Add product to cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update badge on page load
document.addEventListener("DOMContentLoaded", updateCartCount);