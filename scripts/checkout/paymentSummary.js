import { cart } from "../../data/cart.js";
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
  console.log(productTotal);
  console.log(shippingTotal);
  console.log(totalBeforeTax);
}
