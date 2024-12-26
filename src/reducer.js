import {
  CLEAR_CART,
  REMOVE_FROM,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
const reducer = (state, action) => {
  if (action.type === "stateUpdate") {
    console.log(action);
    return { ...state, items: action.payload.cartArr };
  }
  return state;
};

export default reducer;
