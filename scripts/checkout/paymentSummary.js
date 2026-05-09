import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
export function renderPaymentSummary() {
  let productTotal = 0;
  let shippingTotal = 0;
  let totalBeforeTax = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    productTotal += matchingProduct.price * cartItem.quantity;
    let matchingDelivery = getDeliveryOption(cartItem.deliveryOptionId);
    shippingTotal += matchingDelivery.price;
  });
  totalBeforeTax += productTotal + shippingTotal;
  const TaxProduct = totalBeforeTax * 0.1;
  const totalAllPayment = TaxProduct + totalBeforeTax;

  const paymentSummaryHTML = `
     <div class="payment-summary-title">
        Order Summary
      </div>
      <div class="payment-summary-row">
        <div>Item (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">${productTotal} DA</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${shippingTotal} DA</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${totalBeforeTax} DA</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%)</div>
        <div class="payment-summary-money">${TaxProduct} DA</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${totalAllPayment} DA</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
      `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
