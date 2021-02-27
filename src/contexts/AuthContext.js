import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

// Create custom hook for authentication
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // On first render set an user (firebase takes care of everything)
  useEffect(() => {
    // When method is called it will unsubscribe from onAuthStateChanged
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Signup user - returns a promise
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Login user - returns a promise
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Reset password - returns a promise
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // Logout user - returns a promise
  function logout(email, password) {
    return auth.signOut();
  }

  // All information from AuthContext
  const value = {
    currentUser,
    login,
    signup,
    resetPassword,
    logout,
  };

  //   Render children inside provider and pass value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
