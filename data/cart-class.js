class Cart {
  cartItems;
  localStoragekey = undefined;

  constructor(localStoragekey) {
    // cart.localStoragekey = 'cart-oop';
    // businessCart.localStoragekey =  'business-oop';
    // cart.loadFromStorage();
    // businessCart.loadFromStorage();
    // each object have run constructor
    // don't call cart everytime so :
    // this. whatever objcet that we generated it
    this.localStoragekey = localStoragekey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStoragekey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
          quantity: 5,
          deliveryOptionId: "2",
        },
      ];
    }
  };
  // saveToStorage : function(){}
  saveToStorage() {
    localStorage.setItem(this.localStoragekey, JSON.stringify(this.cartItems));
  };
  // addToCart : function(productId){}
  addToCart(productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    const selectorElement = document.querySelector(
      `.js-quantity-selector-${productId}`,
    );
    const quantity = selectorElement ? Number(selectorElement.value) : 1;

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  };
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  };

  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if (!matchingItem) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}
// paramter of Cart is going to parameter of constructor
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart);