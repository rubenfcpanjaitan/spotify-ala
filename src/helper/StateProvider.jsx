import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, store, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)} store={store}  >
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
