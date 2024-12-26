import {
  CLEAR_CART,
  REMOVE_FROM,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
  STOP,
} from "./actions";
const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE_FROM) {
    console.log(action);
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    // return state;
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    // console.log(item);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);
    // console.log(item);

    if (item.amount === 1) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }

    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === STOP) {
    return { ...state, loading: false };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newResponse = action.payload.response;
    const newCart = new Map(newResponse.map((item) => [item.id, item]));

    return { ...state, cart: newCart };
  }
  throw new Error(`no matching for "${action.type}" - action type is found`);
};

export default reducer;
