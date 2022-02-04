import { createContext, useState } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [auth, setAuth] = useState();

  const handleSignup = async (username, password) => {
    try {
      const { user } = await Auth.signUp(username, password);
      console.log("successful", user);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleConfirmation = async (username, confirmation) => {
    try {
      await Auth.confirmSignUp(username, confirmation);
    } catch (err) {
      console.log("error confirming", err);
    }
  };

  const handleResend = async (username) => {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code:", err);
    }
  };

  const handleSignin = async (username, password) => {
    let user;
    try {
      user = await Auth.signIn(username, password);
    } catch (err) {
      console.log("error", err);
    }
    if (!user) {
      return console.log("no user found");
    }
    return user;
  };

  return <AuthContext.Provider value="">{children}</AuthContext.Provider>;
}
