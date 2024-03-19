export const addToCart = (product) => {
  return { type: "ADD_TO_CART", payload: product };
};
export const removeFromCart = (product) => {
  return { type: "REMOVE_FROM_CART", payload: product };
};
export const increment = (product) => {
  return { type: "INCREASE_COUNT", payload: product };
};
export const decrement = (product) => {
  return { type: "DECREASE_COUNT", payload: product };
};
export const orderPrice = (totalPrice) => {
  return { type: "ORDER_PRICE", payload: totalPrice };
};
// module.exports = { addToCart, removeFromCart };
