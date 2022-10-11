import { createContext, useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Alert } from "react-native";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const checkUser = useCallback(async () => {
    try {
      await Auth.currentAuthenticatedUser().then((u) => {
        setUser(u);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAppIsReady(true);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  const signup = useCallback(async (username, password) => {
    try {
      const { user } = await Auth.signUp(username, password);
      console.log("successful", user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const confirmation = useCallback(async (username, confirmation) => {
    let confirmedUser;
    try {
      confirmedUser = await Auth.confirmSignUp(username, confirmation);
    } catch (err) {
      console.error(err);
    }
    console.log(confirmedUser);
  }, []);

  const resend = useCallback(async (username) => {
    try {
      const response = await Auth.resendSignUp(username);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const signin = useCallback(async (username, password) => {
    let signedInUser;
    try {
      signedInUser = await Auth.signIn(username, password);
    } catch (err) {
      Alert.alert(
        "Invalid Credentials",
        "Please check your email and password then try again"
      );
      console.error(err);
      return;
    }
    setUser(signedInUser);
    return signedInUser;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error(err);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        appIsReady,
        signup,
        resend,
        signin,
        confirmation,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
