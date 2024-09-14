import React, { createContext, useState, useEffect } from "react";
import { fetchUserData } from "../utils/api";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((user) => setCurrentUser(user))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
