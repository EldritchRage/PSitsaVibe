import { getCartCount, onCartUpdated } from "./cart.js";
import { logOut, watchAuth } from "./auth-service.js?v=phase2-checkout-1";

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) {
    return;
  }
  const count = getCartCount();
  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

updateCartBadge();
onCartUpdated(updateCartBadge);

const accountLink = document.querySelector('.site-nav a[href^="login.html"]');
if (accountLink) {
  watchAuth((user) => {
    if (user) {
      accountLink.textContent = "Sign Out";
      accountLink.href = "#";
      accountLink.onclick = async (event) => {
        event.preventDefault();
        await logOut();
        window.location.reload();
      };
    } else {
      accountLink.textContent = "Login";
      accountLink.href = "login.html";
      accountLink.onclick = null;
    }
  });
}
