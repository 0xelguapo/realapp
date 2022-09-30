import { useState, createContext, useRef, useEffect } from "react";
import { Animated } from "react-native";

const SuccessContext = createContext();

function SuccessContextProvider({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState("SUCCESS");

  const onStatusChange = (textInput) => {
    setText(textInput);
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
    <SuccessContext.Provider value={{ fadeAnim, text, onStatusChange }}>
      {children}
    </SuccessContext.Provider>
  );
}

export { SuccessContext, SuccessContextProvider };
