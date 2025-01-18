//sepete ekleme yapan fonksiyon....

import elements from "./helper.js";
import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./utils.js";

let cart = getFromLocalStorage();

const addToCart = (e, products) => {
  const productId = parseInt(e.target.dataset.id);

  const product = products.find((product) => product.id === productId);

  if (product) {
    const exitingItem = cart.find((item) => item.id === productId);

    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      //cart elemanı objesi
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      //objeji diziye aktar...
      cart.push(cartItem);
    }
    saveToLocalStorage(cart);

    //sepete ekle butonunun içeriğini düzenle
    e.target.textContent = "Added";
    setTimeout(() => {
      e.target.textContent = "Add to cart";
    }, 2000);
  }
};

//sepetten ürün sil
const removeFromCart = (e) => {
  const productId = parseInt(e.target.dataset.id);

  cart = cart.filter((item) => item.id != productId);

  saveToLocalStorage(cart);
  renderCartItems();

  //sepet toplamını rende et
  displayCartTotal();
};

//sepetteki ürün miktarını güncelle...

const onQuantityChange = (e) => {
  const productId = parseInt(e.target.dataset.id);
  const newQuantity = parseInt(e.target.value);

  if (newQuantity > 0) {
    const cartItem = cart.find((item) => item.id === productId);
    cartItem.quantity = newQuantity;

    saveToLocalStorage(cart);
    displayCartTotal();
  }
};

//sepetteki ürünleri render eden fonsk

const renderCartItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class="cart-item-quantity" data-id="${item.id}" value="${item.quantity}" />
              </div>
              <h2 class="cart-item-price">$ ${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}" >Remove</button>
            </div>`
    )
    .join("");

  //remove'a ait buttonlara eriş....
  const removeButtons = document.querySelectorAll(".remove-from-cart");

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];

    removeButton.addEventListener("click", removeFromCart);
  }
  //cart-item-quantity clasına sahip elemanlara eriş....
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];

    quantityInput.addEventListener("change", onQuantityChange);
  }
};

//seppetteki toplam ürün miktarını render eden fonsiyon

const displayCartTotal = () => {
  const total = calculateCartTotal(cart);
  elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

export { addToCart, renderCartItems, displayCartTotal };
