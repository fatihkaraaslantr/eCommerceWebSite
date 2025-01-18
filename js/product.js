import elements from "./helper.js";

//api(db.json) verileri çekme
const fetchProducts = async () => {
  try {
    const res = await fetch("db.json");
    const data = await res.json();
    if (!res.ok) {
      throw new Error("işlem sırasında hata oluştu");
    }
    return data;
  } catch (err) {
    console.log(`hata:  ${err}`);
    return [];
  }
};

//ürünleri render eden fonksiyon...
const renderProducts = (products, addToCartCallBack) => {
  elements.productList.innerHTML = products
    .map(
      (product) => `<div class="product">
          <img
            src="${product.image}"
            class="product-image"
            alt="product-image"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a  class="add-to-cart" data-id="${product.id}" >Add to cart</a>
          </div>
        </div>`
    )
    .join("");

  //class'ı add-to-cart olan elamanlar.....
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];

    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};

//export işlemleri
export { fetchProducts, renderProducts };
