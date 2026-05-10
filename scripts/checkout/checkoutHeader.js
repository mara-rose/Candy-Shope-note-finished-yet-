import {cart} from '../../data/cart.js'
export function renderCheckoutHeader(){

 let cartQuantity = 0;
 cart.forEach((cartItem) => {
   cartQuantity+= cartItem.quantity;
 });
const checkoutHeaderHTML = `  
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="CandyCloud.html">
            <img class="candy-logo" src="icons/candy-logo.png" />
            <img class="candy-logo-mobile" src="icons/candy-logo-mobile.png" />
          </a>
        </div>
        <div class="checkout-header-middle-section">
          Checkout (<a
            class="return-to-home-link"
            href="CandyCloud.html"
          >${cartQuantity}</a
          >)
        </div>
        <div class="checkout-header-right-section">
          <img src="icons/checkout-lock-icon.png" />
        </div>
      </div>
    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}