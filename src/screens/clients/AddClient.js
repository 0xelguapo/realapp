import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ClientsContext } from "../../context/client-context";
import { VALIDATOR_REQUIRE } from "../../utility/validators";
import useForm from "../../hooks/form-hook";
import Input from "../../components/Input";
import CustomPressable from "../../components/CustomPressable";

export default function AddClient({ navigation }) {
  const { addClient } = useContext(ClientsContext);
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

  const clientDetails = {
    name: formState.inputs.name.value,
    company: formState.inputs.company.value,
    phone: formState.inputs.phone.value,
    email: formState.inputs.email.value,
  };

  const handleAddClient = async () => {
    let response;
    response = await addClient(formState, clientDetails);
    if(response) {
      navigation.goBack()
    } else {
      console.log('cannot add!');
    }
  }

  return (
    <View style={styles.container}>
      <AntDesign name="left" size={25} onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Add a Client</Text>
      <View style={styles.inputsContainer}>
        <Input
          nativeID="name"
          onInput={inputHandler}
          helperText="Name"
          placeholder="Required"
          errorText="A name is required!"
          returnKeyType="done"
          validators={[VALIDATOR_REQUIRE()]}
          autoCapitalize="words"
        />
        <Input
          nativeID="company"
          helperText="Company"
          placeholder="Optional"
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
        <Input
          nativeID="phone"
          helperText="Phone Number"
          placeholder="Optional"
          keyboardType="number-pad"
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
        <Input
          nativeID="email"
          helperText="Email"
          placeholder="Optional"
          onInput={inputHandler}
          returnKeyType="done"
          initiallyValid="true"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable onPress={handleAddClient}>Save Client</CustomPressable>
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
    width: "100%",
    bottom: 0,
  }
});
