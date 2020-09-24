import React, { createContext, useReducer } from "react";

import StoreReducer from "./StoreReducer";
import { AppState } from "../types";

// TODO: Remove Hardcoded Values
const initialState: AppState = {
  auth:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2F0aWUgTWF0aGV3cyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLU9kV0FuNHZYVmxjL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmNMVnl5eUdsYnM5aWpvSEx4Zm9tdjFWTGdBb1EvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2NlbWFyaXRhbi1iZTQ3MiIsImF1ZCI6ImNlbWFyaXRhbi1iZTQ3MiIsImF1dGhfdGltZSI6MTYwMDk4NDE4NiwidXNlcl9pZCI6ImJEeXBLZ09UMHZNcnFQRW5EUVFLMHpnQUw1SzIiLCJzdWIiOiJiRHlwS2dPVDB2TXJxUEVuRFFRSzB6Z0FMNUsyIiwiaWF0IjoxNjAwOTg0MTg2LCJleHAiOjE2MDA5ODc3ODYsImVtYWlsIjoia21hdGhld3NAMTkwNGxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDkwMzM4MzI2NTUwMTEzMjcwNDIiXSwiZW1haWwiOlsia21hdGhld3NAMTkwNGxhYnMuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.r4Sw_ZkfsN6bIiOo9Lww5eOhyIInTOpWGcZ6AUaP21sKLwMezzddd2obIHTlf1wPIwX_N5d_5A49-h6qgeH6mHZ6tVos_iYZO8RR2PrPtH-WoG_P6YUywxQlfm101jCkPhWFgbc68hj3C3FeVKbQiv4Ez13bLn6UMLwjBrPDs6aIVa_ZmhJy-XgglL0_bhT5qVESfy1up6iiDnZ9Zbt4K2i1Y4Vi3OeuEx2DabV5adD0wu8GtvuYFw6uMzXJqpW8s61U-C1xqUJJhj42s2KCi_op7r7excZyfiZ9gAvIqJsrxa0H_TdlWC7yh0PMYQzxX3CfkUrG_NWIfZlKZBd8Bw",
  user: {
    uid: 2,
    name: "Katie",
    created_datetime: "2019-02-11 12:42:03",
    organization: 2,
  },
};

export const StoreStateContext = createContext(initialState);
export const StoreDispatchContext = createContext({});

const StoreProvider: React.FC = ({ children }) => {
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
