import {addToCart,cart, loadFromStorage,removeFromCart} from '../../data/cart.js';

describe('test suite : addToCart',()=>{
   const productId1= "8a53b180-6d40-4i65-ab26-b94ecf709bce";
   const productId2 = "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a"
  beforeEach(()=>{
    //Does nothing  (doesn't actually save)
    //Crashes nothing  (no errors)
    //Just pretends it ran 
    spyOn(localStorage,'setItem');
  })

  // to test addToCart() if 
  it('adds an existing product to the cart',()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : "1"
      }]);
    });

    loadFromStorage();
    addToCart('8a53b180-6d40-4i65-ab26-b94ecf709bce');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('8a53b180-6d40-4i65-ab26-b94ecf709bce');
    expect(cart[0].quantity).toEqual(2);
    // check if we called localStorage.setItem and is true
    // bc we use one function addToCart() that contain 
    //saveToStorage
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
       // we check function setItem localStorage if
    // it get same argument as we init the cart
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId : '8a53b180-6d40-4i65-ab26-b94ecf709bce',
        quantity : 2,
        deliveryOptionId : "1"
      }]))
  });
  // to test addToCart() else
  it('adds a new product to the cart',()=>{
    // we pretend that we save empty cart in localStorage
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })
    //after we mock cart we import the cart after we adding in function loadFromStorage();
    loadFromStorage()
    addToCart('8a53b180-6d40-4i65-ab26-b94ecf709bce');
    expect(cart.length).toEqual(1);
    // check if localStorage.setItem have been called
    // once and is true bc we add only one id
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // to check id that we add same with in cart
    expect(cart[0].productId).toEqual('8a53b180-6d40-4i65-ab26-b94ecf709bce');
    // to check quantity in cart has 1 like we have in function addToCart
    expect(cart[0].quantity).toEqual(1);

    // check that product that we add same expection
    // with cart in localStorage.setItem
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId : '8a53b180-6d40-4i65-ab26-b94ecf709bce',
        quantity : 1,
        deliveryOptionId : "1"
      }]))
  })
})

describe('test suite : removeFromCart',()=>{
     const productId1= "8a53b180-6d40-4i65-ab26-b94ecf709bce";
   const productId2 = "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a"
  beforeEach(()=>{
    //Does nothing  (doesn't actually save)
    //Crashes nothing  (no errors)
    //Just pretends it ran 
    spyOn(localStorage,'setItem');
  })


    // to test removeFromCart()
  it('remove productId is in the cart',()=>{

   spyOn(localStorage,'getItem').and.callFake(()=>{
    return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : "1"
      }])
   })
   loadFromStorage();
   removeFromCart(productId1);
   expect(cart.length).toEqual(0);
   // bc have saveToStorage() we have test localStorage.setItem
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]))
  })
  it('remove productId is not in the cart',()=>{

   spyOn(localStorage,'getItem').and.callFake(()=>{
    return JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : "1"
      }])
   })

   loadFromStorage();
   removeFromCart(productId2);
   expect(cart.length).toEqual(1);
   expect(cart[0].productId).toEqual(productId1)
   // check cart from localStorage 
   expect(localStorage.setItem).toHaveBeenCalledTimes(1);
   expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId : productId1,
        quantity : 1,
        deliveryOptionId : "1"
      }]))
  })
})