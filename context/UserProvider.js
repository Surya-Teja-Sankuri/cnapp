import React, { createContext, useState, useEffect } from 'react';
import { db, firebase } from "../firebase";
const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const user = firebase.auth().currentUser;
    const authUser = () => {
        db
            .collection("users")
            .where("owner_uid", "==", user.uid)
            .limit(1)
            .onSnapshot((snapshot) =>
                snapshot.docs.map((doc) => {
                    setUserDetails({ ...doc.data(), uid: doc.id });
                })
            );
    }

    useEffect(() => {
        authUser();
    }, [])

    return (
        <userContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </userContext.Provider>
    );
}

export default userContext;