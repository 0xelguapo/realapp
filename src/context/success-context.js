import { useState, createContext, useRef, useEffect } from "react";
import { Animated } from "react-native";

const SuccessContext = createContext();

function SuccessContextProvider({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState("SUCCESS");
  let timeoutId;

  const onStatusChange = (textInput) => {
    clearTimeout(timeoutId);

    setText(textInput);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    timeoutId = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  return (
    <SuccessContext.Provider value={{ fadeAnim, text, onStatusChange }}>
      {children}
    </SuccessContext.Provider>
  );
}

export { SuccessContext, SuccessContextProvider };
