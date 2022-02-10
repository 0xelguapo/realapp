import { useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, Animated, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { VALIDATOR_REQUIRE } from "../../utility/validators";
import useForm from "../../hooks/form-hook";
import Input from "../../components/Input";
import CustomPressable from "../../components/CustomPressable";

export default function AddClient({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handleSubmit = async () => {
    let response;
    if (!formState.inputs.name.value) {
      Alert.alert("Required Field Empty", "Please add a name");
    } else {
      try {
        response = await API.graphql(
          graphqlOperation(mutations.createClient, { input: clientDetails })
        );
      } catch (err) {
        console.log("error creating client", err);
      }
    }
    if (response) {
      navigation.goBack();
    } 
    console.log(response);
  };

  const onSuccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 4000);
  };

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
        <CustomPressable onPress={handleSubmit}>Save Client</CustomPressable>
      </View>
      <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>Contact created successfully</Text>
      </Animated.View>
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
  },
  fadingContainer: {
    padding: 10,
    backgroundColor: "#026bff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4e97ff",
    width: '100%',
  },
  successText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15
  }
});
