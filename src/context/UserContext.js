import React, { useState } from "react";

const initialState = {
  uid: 1,
  name: "Katie Mathews",
  organization: 1,
  created_date: "2019-01-01",
  authToken: "BLABHABHA"
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
