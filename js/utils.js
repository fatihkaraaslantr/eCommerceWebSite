import elements from "./helper.js";

//locala veri ekleme..
const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//local veri alma..
const getFromLocalStorage = () => {
  const strData = localStorage.getItem("cart");

  return strData ? JSON.parse(strData) : [];
};

//sepet toplamını hesaplama....

const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const updateCartIcon = (cart) => {
  //sepet ürün miktarı hesaplama
  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  //render
  elements.icon.setAttribute("data-quantity", totalQuantity);
};

export {
  saveToLocalStorage,
  getFromLocalStorage,
  calculateCartTotal,
  updateCartIcon,
};
