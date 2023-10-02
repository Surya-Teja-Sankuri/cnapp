import React, { createContext, useState } from "react";
const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <userContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </userContext.Provider>
  );
};

export default userContext;
