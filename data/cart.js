export let cart;

loadFromStorage();
// we put it in function for a test so we can mock and then get localStorage of cart 
export function loadFromStorage(){
cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
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
}




// to save the cart in localstorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// loop cart if productId that we get from id dataset of element equal id of cart we put in new var matchingItem
// always we get string form dom so we use NUMber function to get value of input
// if matching exist add quantity in matching who has object of cart if not we use push
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  const selectorElement = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );
  const quantity = selectorElement ? Number(selectorElement.value) : 1;
  //mathcingItem truthy
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

// to delect cart in the page we creat new array
// and loop the cart if id cart not equal productId push mean push everything in new cart expact the way that want delete and put new array in cart
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

//function to calculate the header quantity in display in dom with function updateCartQuantity() in checkout.js
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

// function in checkout.js we want to update quantity
// as alway check if product exist in cart by id and than put in machingItem and update the data matchingItem.quantity
export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}

// function in checkout.js we want to update quantity
// as alway check if product exist in cart by id and than put in machingItem and update the data   matchingItem.deliveryOptionId
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if(!matchingItem){
    return;
  }
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
