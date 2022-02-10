import { useReducer, useEffect, useState } from "react";
import { validate } from "../utility/validators";
import { StyleSheet, Text, View, TextInput } from "react-native";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: props.initiallyValid,
    isTouched: false,
  });

  const handleChange = (newText) => {
    dispatch({ type: "CHANGE", value: newText, validators: props.validators });
  };

  const handleTouch = () => {
    dispatch({ type: "TOUCH" });
  };

  const { nativeID, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(nativeID, value, isValid);
  }, [nativeID, value, isValid]);

  return (
    <View style={styles.container}>
      <Text style={styles.helperText}>{props.helperText}</Text>
      <TextInput
        style={styles.textInput}
        nativeID={props.nativeID}
        value={inputState.value}
        onChangeText={handleChange}
        onBlur={handleTouch}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        autoCapitalize={props.autoCapitalize}
      />
      {!inputState.isValid && inputState.isTouched && (
        <Text style={styles.error}>{props.errorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    paddingLeft: 10,
  },
  helperText: {
    fontWeight: "600",
    marginBottom: 5,
  },
  error: {
    color: "red",
    position: "absolute",
    bottom: -5
  },
});

Input.defaultProps = {
  validators: [],
  initiallyValid: false,
};
