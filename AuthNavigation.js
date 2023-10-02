import React, { useEffect, useState } from "react";
import { SignedInStack, SignedOutStack } from "./navigation";

import { firebase } from "./firebase";
import { UserProvider } from "./context/UserProvider";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => userHandler(user));
    console.log(`event triggered`);
  }, []);

  return (
    <>
      <UserProvider>
        {currentUser ? <SignedInStack /> : <SignedOutStack />}
      </UserProvider>
    </>
  );
};

export default AuthNavigation;
