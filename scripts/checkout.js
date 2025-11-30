import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOption.js";

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

  const deliveryOptionId = cartItem.deliveryOptionId;
  let matchingDeliveryOption;
  deliveryOptions.forEach((Option) => {
    if (Option.id === deliveryOptionId) {
      matchingDeliveryOption = Option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(matchingDeliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSummaryHTML += `  <div class="cart-item-container js-cart-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">Delivery date : ${dateString}</div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" />
              <div class="cart-item-details">
                <div class="cart-item-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-price">${matchingProduct.price} DA</div>
                  <div class="product-quantity">
                    <span
                      >Quantity : <span class="quantity-label js-quantity-label-${
                        matchingProduct.id
                      }">${cartItem.quantity}</span>
                    </span>
                    <input class="quantity-input js-quantity-input-${
                      matchingProduct.id
                    }">
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
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.price === 0
        ? "FREE Shipping"
        : `${deliveryOption.price} DA - Shipping`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += ` <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryOption.id}">
         <input
           type="radio"
           ${isChecked ? "checked" : ""}
           class="delivery-option-input"
           name="delivery-option-${matchingProduct.id}"
          />
          <div>
           <div class="delivery-option-date">${dateString}</div>
           <div class="delivery-option-price">${priceString}</div>
          </div>
         </div>`;
  });

  return html;
}

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
  const productId = link.dataset.productId;
  const quantityInput = document.querySelector(
    `.js-quantity-input-${productId}`
  );
  link.addEventListener("click", () => {
    handleUpadateQuantity(productId, quantityInput);
  });
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleUpadateQuantity(productId, quantityInput);
    }
  });
});

function handleUpadateQuantity(productId, quantityInput) {
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
}

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerText = `${cartQuantity} items`;
}

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const {productId,deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
