import { useState, createContext, useRef } from "react";
import { Animated } from "react-native";

const SuccessContext = createContext();

function SuccessContextProvider({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onStatusChange = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2800);
  };



  return (
    <SuccessContext.Provider value={{ fadeAnim, onStatusChange }}>
      {children}
    </SuccessContext.Provider>
  );
}

export { SuccessContext, SuccessContextProvider };
