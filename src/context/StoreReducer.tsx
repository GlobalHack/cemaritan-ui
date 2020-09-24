import { AppState, AppActions } from "../types";

const StoreReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case "SET_AUTH": {
      console.log(action.authToken);
      return {
        ...state,
        auth: action.authToken,
      };
    }
    case "SET_USER": {
      console.log("user", action.user);
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};

export default StoreReducer;
