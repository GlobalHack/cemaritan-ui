import { useContext } from "react";
import { StoreDispatchContext } from "../context/StoreProvider";

const useStoreDispatch = () => {
  const context = useContext(StoreDispatchContext);
  return context;
};

export default useStoreDispatch;
