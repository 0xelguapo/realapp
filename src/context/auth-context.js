import { createContext, useState, useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Alert } from "react-native";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    let user;
    try {
      user = await Auth.signUp(username, password);
    } catch (err) {
      console.error(err);
    }
    return user
  }, []);

  const confirmation = useCallback(async (username, confirmation) => {
    let confirmedUser;
    setIsLoading(true);
    try {
      confirmedUser = await Auth.confirmSignUp(username, confirmation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    return confirmedUser;
  }, []);

  const resend = useCallback(async (username) => {
    let response;
    try {
      response = await Auth.resendSignUp(username);
    } catch (err) {
      console.error(err);
    }
    return response;
  }, []);

  const signin = useCallback(async (username, password) => {
    let signedInUser;
    setIsLoading(true);
    try {
      signedInUser = await Auth.signIn(username, password);
    } catch (err) {
      Alert.alert(
        "Invalid Credentials",
        "Please check your email and password then try again"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    if (signedInUser) setUser(signedInUser);
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
        isLoading,
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
