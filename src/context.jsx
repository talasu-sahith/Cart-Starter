import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
  CLEAR_CART,
  REMOVE_FROM,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import { total } from "./utlis";

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(cartItems.map((items) => [items.id, items])),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = total(state.cart);

  const clearcart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_FROM, payload: { id } });
  };
  const handleIncrement = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const handleDecrement = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearcart,
        removeItem,
        handleIncrement,
        handleDecrement,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
