const products =[
 { image: 'images/candy/haribo.webp',
  name : 'Haribo GoldBears',
  rating :{
    stars : 4.5,
    count : 87
  },
  price : 870
 },
  { image: 'images/candy/motts.avif',
  name : 'Motts Fruits',
  rating :{
    stars : 4,
    count : 127
  },
  price : 1200
 },
   { image: 'images/candy/life-savers.avif',
  name : 'Life Savers (Mintes)',
  rating :{
    stars : 3.5,
    count : 300
  },
  price : 1200
 },
   { image: 'images/candy/white-chocolate.avif',
  name : 'Ghirardelle - White Chocolate',
  rating :{
    stars : 4.5,
    count : 20
  },
  price : 980
 },
    { image: 'images/candy/jolly.avif',
  name : 'Jolly Rancher Gummies',
  rating :{
    stars : 5,
    count : 56
  },
  price : 450
 },
  { image: 'images/candy/snicker-s.avif',
  name : 'Chocolate Snicker',
  rating :{
    stars : 4,
    count : 100
  },
  price : 500
 },
   { image: 'images/candy/kit-kat.avif',
  name : 'Chocolate Kit-Kat',
  rating :{
    stars : 3.5,
    count : 100
  },
  price : 500
 },
    { image: 'images/candy/ferrero.avif',
  name : 'Ferrero Snick',
  rating :{
    stars : 4,
    count : 40
  },
  price : 1500
 },
 { image: 'images/candy/lindt.webp',
  name : 'Lindt',
  rating :{
    stars : 5,
    count : 10
  },
  price : 770
 },
  { image: 'images/candy/ritz.avif',
  name : 'Ritz Candy',
  rating :{
    stars : 4.5,
    count : 99
  },
  price : 400
 },
  { image: 'images/candy/skittles.webp',
  name : 'Skittles Sweets Colores',
  rating :{
    stars : 3.5,
    count : 240
  },
  price : 250
 },
  { image: 'images/candy/reastables.avif',
  name : 'Feastables Chocolate',
  rating :{
    stars : 5,
    count : 850
  },
  price : 550
 },
  { image: 'images/candy/hi-chewavif.avif',
  name : 'Hi-Chew Stawbarry Dessert',
  rating :{
    stars : 3.5,
    count : 99
  },
  price : 650
 },
];

let productsHTML = '';
products.forEach(product =>{
const html = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}" />
          </div>

          <div class="product-name limit-to-2-line">${product.name}</div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count">${product.rating.count}</div>
          </div>

          <div class="product-price">${product.price} DA</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="added-to-cart">
            <img src="icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>
`
productsHTML+=html;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;


