import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { editClient } from "../../redux/clients-slice";
import { phoneFormat } from "../../utility/phone-format";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function EditClient(props) {
  const { clientId, clientDetailsState } = props.route.params;
  const [fullName, setFullName] = useState(clientDetailsState.name);
  const [company, setCompany] = useState(clientDetailsState.company);
  const [phoneInputs, setPhoneInputs] = useState(
    clientDetailsState.phone.split(",")
  );
  const [emailInputs, setEmailInputs] = useState(
    clientDetailsState.email.split(",")
  );
  const [notes, setNotes] = useState(clientDetailsState.notes);
  const dispatch = useDispatch();
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const isMountedPhone = useRef(false);
  const isMountedEmail = useRef(false)
  // const { index } = props.route.params;

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
    newPhoneInputs[index] = phoneFormat(text);
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

  useEffect(() => {
    if (phoneInputs.length > 0 && isMountedPhone.current) {
      phoneInputRef.current.focus();
    } else {
      isMountedPhone.current = true;
    }
  }, [phoneInputs.length]);

  useEffect(() => {
    if (emailInputs.length > 0 && isMountedEmail.current) {
      emailInputRef.current.focus();
    } else {
      isMountedEmail.current = true;
    }
  }, [emailInputs.length]);

  const handleSubmit = async () => {
    const clientDetails = {
      id: clientId,
      name: fullName,
      phone: phoneInputs.toString(),
      email: emailInputs.toString(),
      notes: notes,
    };
    if (fullName.length !== 0) {
      dispatch(editClient(clientDetails));
      props.navigation.navigate({
        name: "ClientDetails",
        params: { id: clientId },
        merge: true,
      });
    } else {
      Alert.alert("Please enter a valid name");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Pressable onPress={props.navigation.goBack}>
          <Ionicons name="chevron-back" size={30} color="#6c6c6c" />
        </Pressable>
        <Text style={styles.editClientHeadingText}>Edit Client</Text>
        <TouchableHighlight onPress={handleSubmit} underlayColor="#e8e8e8">
          <AntDesign name="check" size={28} color="#6c6c6c" />
        </TouchableHighlight>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior="padding"
        keyboardVerticalOffset={75}
      >
        <ScrollView style={styles.detailsContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{fullName[0].toUpperCase()}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>FULL NAME</Text>
            <TextInput
              style={styles.fieldInput}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>COMPANY</Text>
            <TextInput
              style={styles.fieldInput}
              value={company}
              onChangeText={setCompany}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>PHONE</Text>
            {phoneInputs.map((phone, index) => (
              <View key={index} style={styles.extraInput}>
                <TouchableOpacity
                  style={styles.removeInput}
                  onPress={() => handleRemoveAnotherPhoneInput(index)}
                >
                  <Ionicons name="md-remove-circle" size={24} color="#7b7b7c" />
                </TouchableOpacity>
                <TextInput
                  style={styles.dynamicFieldInput}
                  value={phoneFormat(phoneInputs[index])}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  placeholder="Phone"
                  placeholderTextColor="#454545"
                  onChangeText={(text) => handlePhoneInputChange(text, index)}
                  ref={phoneInputRef}
                />
              </View>
            ))}
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

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>EMAIL</Text>
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
                    style={styles.dynamicFieldInput}
                    value={emailInputs[index]}
                    keyboardType="email-address"
                    returnKeyType="done"
                    autoCapitalize="none"
                    onChangeText={(text) => handleEmailInputChange(text, index)}
                    placeholder="Email"
                    placeholderTextColor="#454545"
                    ref={emailInputRef}
                  />
                </View>
              );
            })}
            {emailInputs.length < 5 && (
              <TouchableOpacity
                style={styles.addAnotherButton}
                onPress={handleAddAnotherEmailInput}
              >
                <Ionicons name="md-add-sharp" size={24} color="#7b7b7c" />
                <Text style={styles.addAnotherText}>Add Email</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>NOTES</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              style={[styles.fieldInput, { height: 75 }]}
              multiline={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  editClientHeadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  keyboardAvoiding: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 20,
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
  },
  avatarText: {
    color: "gray",
    fontSize: 50,
  },
  fieldContainer: {
    display: "flex",
    paddingVertical: 20,
  },
  fieldTitle: {
    fontSize: 12,
    color: "#ababab",
    letterSpacing: 3,
    paddingHorizontal: 20,
  },
  fieldInput: {
    backgroundColor: "#cccccc",
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 16,
    color: "#454545",
    fontWeight: "300",
  },
  dynamicFieldInput: {
    color: "#454545",
    borderColor: "#dcdcdc",
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    height: "90%",
  },
  extraInput: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    borderColor: "#dcdcdc",
    borderWidth: 0.2,
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  removeInput: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
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
});
