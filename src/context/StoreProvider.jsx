import React, { createContext, useReducer } from "react";

import StoreReducer from "./StoreReducer";

export const StoreStateContext = createContext();
export const StoreDispatchContext = createContext();

const initialState = {
  auth: null,
  user: null
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState);

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export default StoreProvider;
