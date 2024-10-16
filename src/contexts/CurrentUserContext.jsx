import React, { createContext, useState, useEffect } from "react";
import { fetchUserData } from "../utils/api";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setLoading(false); // Set loading to false once the user data is fetched
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setLoading(false); // Even on error, stop loading
        });
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or text until data is fetched
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
