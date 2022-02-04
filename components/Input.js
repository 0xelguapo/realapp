import { useReducer, useEffect } from "react";
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
    isValid: false,
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
        nativeID={props.nativeID}
        value={inputState.value}
        onChangeText={handleChange}
        style={styles.textInput}
        onBlur={handleTouch}
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
    paddingBottom: 10,
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
  },
});

Input.defaultProps = {
  validators: [],
};
