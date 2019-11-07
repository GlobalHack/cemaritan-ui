import React, { useState } from "react";

const initialState = {
  id: 1,
  organization_id: 1
};

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
