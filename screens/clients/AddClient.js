import { StyleSheet, Text, View, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Input from "../../components/Input";
import useForm from "../../hooks/form-hook";
import CustomPressable from "../../components/CustomPressable";
import { VALIDATOR_REQUIRE } from "../../utility/validators";

export default function AddClient() {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      company: {
        value: "",
        isValid: true,
      },
      phone: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const handleSubmit = async () => {
    if(!formState.inputs.name.value) {
      Alert.alert('Required Field Empty', 'Please add a name')
    } else {
      
    }

  };

  return (
    <View style={styles.container}>
      <AntDesign name="left" size={25} />
      <Text style={styles.title}>Add a Client</Text>
      <View style={styles.inputsContainer}>
        <Input
          nativeID="name"
          onInput={inputHandler}
          helperText={"Name"}
          placeholder={"Required"}
          errorText={"A name is required!"}
          returnKeyType="done"
          validators={[VALIDATOR_REQUIRE()]}
        />
        <Input
          nativeID="company"
          helperText={"Company"}
          placeholder={"Optional"}
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
        <Input
          nativeID="phone"
          helperText={"Phone Number"}
          placeholder={"Optional"}
          keyboardType={"number-pad"}
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
        <Input
          nativeID="email"
          helperText={"Email"}
          placeholder={"Optional"}
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable onPress={handleSubmit}>Save Client</CustomPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  inputsContainer: {
    marginTop: 15,
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
  },
  buttonContainer: {
    width: '100%',
    bottom: 0,
  }
});
