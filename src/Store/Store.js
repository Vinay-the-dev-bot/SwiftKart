import { applyMiddleware, createStore } from "redux";

const initialState = {
  cart: [],
  orderPrice: 0,
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
    case "DECREASE_COUNT":
      const updatedCartDecrease = state.cart.map((item) =>
        item.id === action.payload.id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      );
      console.log(updatedCartDecrease);
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
