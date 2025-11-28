import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";

updateCartQuantity();
let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartSummaryHTML += `  <div class="cart-item-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">Delivery date : Tuesday,June 21</div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" />
              <div class="cart-item-details">
                <div class="cart-item-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-price">${matchingProduct.price} DA</div>
                  <div class="product-quantity">
                    <span
                      >Quantity : <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchingProduct.id}">Save</span>
                    <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}"
                      >Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link 
                    " data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>

                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">500 DA - Shipping</div>
                  </div>
                </div>

                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">700 DA - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const deleteElement = document.querySelector(
      `.js-cart-container-${productId}`
    );
    deleteElement.remove();
    updateCartQuantity();
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-container-${productId}`);
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId, newQuantity);
    if (newQuantity < 0 || newQuantity >= 100) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }
    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
    const container = document.querySelector(`.js-cart-container-${productId}`);
    container.classList.remove("is-editing-quantity");
  });
});


function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerText = `${cartQuantity} items`;
}
