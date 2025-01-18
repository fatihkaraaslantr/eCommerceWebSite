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

export { saveToLocalStorage, getFromLocalStorage, calculateCartTotal };
