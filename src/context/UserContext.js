import React, { useState } from "react";

const initialState = null;

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState(initialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
