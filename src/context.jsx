import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
// import cartItems from "./data";
import {
  CLEAR_CART,
  REMOVE_FROM,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
  STOP,
} from "./actions";
import { total } from "./utlis";
const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: true,
  cart: new Map(),
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
  const stopLoading = () => {
    dispatch({ type: STOP });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(url);

        const response = await resp.json();
        dispatch({ type: DISPLAY_ITEMS, payload: { response } });
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    fetchData();
  }, []);

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
