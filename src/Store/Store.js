import { createStore } from "redux";
export const url = "https://codeflow-174q.onrender.com";
const name = localStorage.getItem("name");
const token = localStorage.getItem("token");
const cartItems = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
    count: 2,
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
    count: 2,
  },
];
const smt = 15000;
console.log("NAME", name);
const initialState = {
  cart: cartItems || [],
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
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload.status,
        name: action.payload.name,
      };
    // case "USER_NAME":
    //   return { ...state, name: action.payload };
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

    // case "ADD_TO_CART":
    //   return { ...state, cart: [...state.cart, action.payload] };
    // case "REMOVE_FROM_CART":
    //   state.cart.filter((item) => {
    //     return item.id !== action.payload.id;
    //   });
    //   return { ...state, questions: action.payload };
    // case "Correct":
    //   return { ...state, score: state.score + action.payload };
    // default:
    //   return state;
  }
};
export const store = createStore(reducer);
// const store = legacy_createStore(reducer, applyMiddleware(thunk));
// legacy_createStore

export default store;
