import { createStore } from "redux";
export const url = "http://localhost:4500";
const name = localStorage.getItem("name");
const token = localStorage.getItem("token");
const smt = 15000;
export const passwordConditions = {
  lower: "Password must contain at least one lowercase letter.",
  upper: "Password must contain at least one uppercase letter.",
  digit: "Password must contain at least one digit.",
  special: "Password must contain at least one special character.",
  length: "Password must be minimum 8 characters length.",
};
const initialState = {
  cart: [],
  orderPrice: smt || 0,
  isLoggedIn: name ? true : false,
  name: name || "",
  token: token || "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, count: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: updatedCart };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload.status,
        name: action.payload.name,
      };
    case "DECREASE_COUNT":
      const updatedCartDecrease = state.cart
        .map((item) =>
          item.id === action.payload.id && item.count > 0
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count != 0);

      return { ...state, cart: updatedCartDecrease };
    case "INCREASE_COUNT":
      const updatedCartIncrease = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: item.count + 1 }
          : item
      );
      return { ...state, cart: updatedCartIncrease };
    case "ORDER_PRICE":
      return { ...state, orderPrice: action.payload };
    default:
      return state;
  }
};
export const store = createStore(reducer);

export default store;
