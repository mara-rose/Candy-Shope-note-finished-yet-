import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
describe('test suite : renderOrderSummary',()=>{
  // we put out the beforEach scope
    const productId1 ="b0f17cc5-8b40-4ca5-9142-b61fe3d98c85";
    const productId2="a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a";
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div><div class="js-payment-summary"></div><div class="js-checkout-header"></div>`

    // It replaces localStorage.setItem with a fake function that:
    //Does nothing (doesn't actually save)
    //Crashes nothing  (no errors)
    //Just pretends it ran 
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId:productId2,
      quantity: 5,
      deliveryOptionId: "2",
    },
  ])
    })
    // we use this function to mock localStorage first
    // and then get from localStorage which mocked
    loadFromStorage();
    // this function that we test
    renderOrderSummary();
  })

  // share code after test 
  afterEach(()=>{
    // to remove the test in the page after we finish testing
    document.querySelector('.js-test-container').innerHTML ='';
  })

  it('display the cart',()=>{
    // to check element container if has 2 cart item containers in the page 
    //cart since we have  NodeList.length 
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    //check the quantity productId1 
    //since we have container have bunch of div 
   expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity : 2');

   expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity : 5');
   // to check by name product after we add
   expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Glico Pocky Chocolate Biscuit');
   // to check by price with product1
   expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('2.50 $');
  })

  it('removes a product',()=>{
    document.querySelector(`.js-delete-link-${productId1}`).click();
    // check is cart array updated 
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    // to check firt item is delete form container
    expect(document.querySelector(`.js-cart-container-${
      productId1
    }`)).not.toEqual(productId1);
    expect(document.querySelector(`.js-cart-container-${productId1}`)).toEqual(null)
    // to check by name product after we remove
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Hershey Kisses Candy Cone');

    // to check by price with product2 after remove
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('9.90 $')
  })
})