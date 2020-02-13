import { useContext } from "react";
import { StoreStateContext } from "../context/StoreProvider";

const useStoreState = () => {
  const state = useContext(StoreStateContext);
  return state;
};

export default useStoreState;
