import { createContext, useState, useCallback, useEffect } from "react";
import Purchases from "react-native-purchases";
import { Auth } from "aws-amplify";
import { Alert } from "react-native";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const loginPurchaserUser = useCallback(async (userId) => {
    let response;
    try {
      response = await Purchases.logIn(userId);
    } catch (err) {
      console.error(err);
    }
    return response;
  });

  const checkUser = useCallback(async () => {
    try {
      await Auth.currentAuthenticatedUser().then((u) => {
        loginPurchaserUser(u.attributes.sub);
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
    setIsLoading(true);
    try {
      user = await Auth.signUp(username, password);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    return user;
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
    if (signedInUser) {
      let userId = signedInUser.attributes.sub;
      const { purchaserInfo, created } = await Purchases.logIn(userId);
      setUser(signedInUser);
    }
    return signedInUser;
  }, []);

  const handleForgotPassword = async (email) => {
    let response;
    setIsLoading(true)
    try {
      response = await Auth.forgotPassword(email);
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
    return response
  }

  const handleCodeForForgotPassword = async (email, code, newPassword) => {
    let response;
    setIsLoading(true)
    try {
      response = await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch(err) {
      console.error(err)
    }
    setIsLoading(false)
    return response
  }

  const signOut = useCallback(async () => {
    try {
      await Purchases.logOut();
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
        handleForgotPassword,
        handleCodeForForgotPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
