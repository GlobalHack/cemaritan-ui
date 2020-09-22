const StoreReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH": {
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
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default StoreReducer;
