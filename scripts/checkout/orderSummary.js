import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
export function renderPaymentSummary() {
  let productTotal = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    productTotal += matchingProduct.price * cartItem.quantity;
  });
  console.log(productTotal);
}
