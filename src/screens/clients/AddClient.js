import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { addClient } from "../../redux/clients-slice";
import { SuccessContext } from "../../context/success-context";

export default function AddClient({ navigation }) {
  const { onStatusChange } = useContext(SuccessContext);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [emailInputs, setEmailInputs] = useState([]);
  const [phoneInputs, setPhoneInputs] = useState([]);

  const handleAddClient = async () => {
    const clientInputs = {
      name: name,
      company: company,
      phone: phoneInputs.toString(),
      email: emailInputs.toString(),
    };
    if (name.length !== 0) {
      const response = await dispatch(addClient(clientInputs));
      if (response) {
        navigation.goBack();
        onStatusChange();
      }
    } else {
      Alert.alert("Please enter a valid name");
    }
  };

  const handleAddAnotherPhoneInput = () => {
    let newPhoneInputs = [...phoneInputs, ""];
    setPhoneInputs(newPhoneInputs);
  };

  const handleRemoveAnotherPhoneInput = (index) => {
    let newPhoneInputs = [...phoneInputs];
    newPhoneInputs.splice(index, 1);
    setPhoneInputs(newPhoneInputs);
  };

  const handlePhoneInputChange = (text, index) => {
    let newPhoneInputs = [...phoneInputs];
    newPhoneInputs[index] = text;
    setPhoneInputs(newPhoneInputs);
  };

  const handleAddAnotherEmailInput = () => {
    let newEmailInputs = [...emailInputs, ""];
    setEmailInputs(newEmailInputs);
  };

  const handleRemoveAnotherEmailInput = (index) => {
    let newEmailInputs = [...emailInputs];
    newEmailInputs.splice(index, 1);
    setEmailInputs(newEmailInputs);
  };

  const handleEmailInputChange = (text, index) => {
    let newEmailInputs = [...emailInputs];
    newEmailInputs[index] = text;
    setEmailInputs(newEmailInputs);
  };

  const phoneFormat = (number) => {
    if (!number) {
      return "";
    }
    const phoneNumber = number.replace(/[^\d]/g, "");
    const phoneLength = phoneNumber.length;
    if (phoneLength < 4) return phoneNumber;

    if (phoneLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneLength > 10) {
      return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(
        1,
        4
      )}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>New Client</Text>
        <TouchableOpacity onPress={handleAddClient}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior="padding"
        keyboardVerticalOffset={75}
      >
        <ScrollView>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name[0]}</Text>
          </View>
          <View style={styles.inputContainerOne}>
            <Ionicons name="person-outline" size={20} color="black" />
            <TextInput
              style={styles.textInputOne}
              placeholder={"Full Name"}
              placeholderTextColor="#454545"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputContainerOne}>
            <Ionicons name="briefcase-outline" size={20} color="black" />
            <TextInput
              style={styles.textInputOne}
              placeholder="Company"
              placeholderTextColor="#454545"
              value={company}
              onChangeText={setCompany}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainerTwo}>
            {phoneInputs.map((input, index) => {
              return (
                <View key={index} style={styles.extraInput}>
                  <TouchableOpacity
                    style={styles.removeInput}
                    onPress={() => handleRemoveAnotherPhoneInput(index)}
                  >
                    <Ionicons
                      name="md-remove-circle"
                      size={24}
                      color="#7b7b7c"
                    />
                  </TouchableOpacity>
                  <TextInput
                    key={index}
                    style={styles.textInputOne}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    value={phoneFormat(phoneInputs[index])}
                    onChangeText={(text) => handlePhoneInputChange(text, index)}
                    placeholder="Phone"
                    placeholderTextColor="#454545"
                  />
                </View>
              );
            })}
            {phoneInputs.length < 5 && (
              <TouchableOpacity
                style={styles.addAnotherButton}
                onPress={handleAddAnotherPhoneInput}
              >
                <Ionicons name="md-add-sharp" size={24} color="#7b7b7c" />
                <Text style={styles.addAnotherText}>Add Phone Number</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainerTwo}>
            {emailInputs.map((input, index) => {
              return (
                <View key={index} style={styles.extraInput}>
                  <TouchableOpacity
                    style={styles.removeInput}
                    onPress={() => handleRemoveAnotherEmailInput(index)}
                  >
                    <Ionicons
                      name="md-remove-circle"
                      size={24}
                      color="#7b7b7c"
                    />
                  </TouchableOpacity>
                  <TextInput
                    key={index}
                    style={styles.textInputOne}
                    keyboardType="email-address"
                    returnKeyType="done"
                    autoCapitalize="none"
                    onChangeText={(text) => handleEmailInputChange(text, index)}
                    placeholder="Email"
                    placeholderTextColor="#454545"
                  />
                </View>
              );
            })}
            {phoneInputs.length < 5 && (
              <TouchableOpacity
                style={styles.addAnotherButton}
                onPress={handleAddAnotherEmailInput}
              >
                <Ionicons name="md-add-sharp" size={24} color="#7b7b7c" />
                <Text style={styles.addAnotherText}>Add Email</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  headingContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0064e5",
  },
  keyboardAvoiding: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 15,
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#ababab",
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "gray",
    fontSize: 50,
  },
  inputContainerOne: {
    backgroundColor: "#cccccc",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#e6e6e6",
    borderWidth: 0.2,
    height: 40,
  },
  textInputOne: {
    borderColor: "#dcdcdc",
    backgroundColor: "#cccccc",
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  inputContainerTwo: {
    paddingVertical: 10,
    marginTop: 30,
  },
  addAnotherButton: {
    height: 40,
    backgroundColor: "#cccccc",
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    paddingLeft: 10,
  },
  addAnotherText: {
    fontWeight: "500",
    color: "#7b7b7c",
  },
  extraInput: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    borderColor: "#dcdcdc",
    borderWidth: 1,
    height: 40,
  },
  removeInput: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
