import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";

//html'den gelen yapılar
const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

//menu icon tıklandığında class ekle-çıkar
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

//sayfa yüklendiğinde sayfayı tanı ve sayfaya göre işlem...
addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("/cart.html")) {
    renderCartItems();
    displayCartTotal();
  } else {
    //anasayfadaysan api'den verileri alındı
    const products = await fetchProducts();

    //api'dan gelen veriler render ve butona tıklanınca...
    renderProducts(products, (e) => {
      addToCart(e, products);
    });
  }
});
