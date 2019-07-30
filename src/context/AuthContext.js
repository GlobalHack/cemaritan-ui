import React, { useState } from "react";

const initialState = null;

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [auth, setAuth] = useState(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
