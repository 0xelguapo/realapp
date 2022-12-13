import { useContext, useEffect, useReducer, useRef, useState } from "react";
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
import { phoneFormat } from "../../utility/phone-format";
import { Geo } from "aws-amplify";
import { addProperty } from "../../redux/properties-slice";

function propertyReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      state[action.index] = {
        ...state[action.index],
        [action.key]: action.value,
      };
      return state;
    case "ADD_INPUT":
      return [
        ...state,
        {
          street: "",
          city: "",
          state: "",
          zip: "",
          price: "",
          note: "",
        },
      ];
    case "REMOVE_INPUT":
      state.splice(action.index, 1);
      return [...state];
    case "AUTOFILL":
      state[action.index] = {
        ...state[action.index],
        street: action.street,
        city: action.city,
        state: action.state,
        zip: action.zip,
      };
      return state;
  }
}

export default function AddClient({ navigation }) {
  const { onStatusChange } = useContext(SuccessContext);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);

  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [emailInputs, setEmailInputs] = useState([]);
  const [phoneInputs, setPhoneInputs] = useState([]);
  const [streetSearch, setStreetSearch] = useState("");
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [searchIndex, setSearchIndex] = useState(0);

  const [propertyInputs, propertyInputsDispatch] = useReducer(
    propertyReducer,
    []
  );

  const handleAddClient = async () => {
    const clientInputs = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      phone: phoneInputs.toString(),
      email: emailInputs.toString(),
    };
    if (firstName.length !== 0) {
      const response = await dispatch(addClient(clientInputs)).unwrap();
      if (response) {
        const clientId = response.id;
        for (const property of propertyInputs) {
          let propertyDetails = { ...property, clientId: clientId };
          const propertyResponse = await dispatch(
            addProperty(propertyDetails)
          ).unwrap();
        }
        navigation.goBack();
        onStatusChange("CONTACT CREATED");
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

  const handleAddAnotherPropertyInput = () => {
    propertyInputsDispatch({ type: "ADD_INPUT" });
    setStreetSearch("");
    setSuggestedAddresses([]);
  };

  const handleStreetSearch = (value, index) => {
    setSearchIndex(index);
    setStreetSearch(value);
    propertyInputsDispatch({
      type: "INPUT_CHANGE",
      index: index,
      key: "street",
      value: value,
    });
  };

  const handleChooseProperty = (res, index) => {
    const {
      addressNumber,
      street,
      municipality: city,
      region: state,
      postalCode: zip,
    } = res;
    propertyInputsDispatch({
      type: "AUTOFILL",
      index: index,
      street: addressNumber + " " + street,
      city,
      state,
      zip,
    });
    setSuggestedAddresses([]);
    setStreetSearch("");
  };

  const searchOptionContraints = {
    countries: ["USA"],
    maxResults: 4,
  };

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (streetSearch.length > 5) {
        const result = await Geo.searchByText(
          propertyInputs[searchIndex].street,
          searchOptionContraints
        );
        setSuggestedAddresses(result);
      }
    }, 1500);
    return () => clearTimeout(delaySearch);
  }, [streetSearch]);

  useEffect(() => {
    if (phoneInputs.length > 0) {
      phoneInputRef.current.focus();
    }
  }, [phoneInputs.length]);

  useEffect(() => {
    if (emailInputs.length > 0) {
      emailInputRef.current.focus();
    }
  }, [emailInputs.length]);

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
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          contentContainerStyle={[
            { backgroundColor: "#f2f1f6", paddingTop: 20, paddingBottom: 40 },
          ]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName[0]}</Text>
          </View>

          <View style={styles.inputContainerOne}>
            <Ionicons name="person-outline" size={20} color="black" />
            <TextInput
              style={styles.textInputOne}
              placeholder={"First Name"}
              placeholderTextColor="#8c8b90"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoFocus={true}
              blurOnSubmit={false}
              onSubmitEditing={() => secondInputRef.current.focus()}
            />
          </View>
          <View style={styles.inputContainerOne}>
            <Ionicons name="person-outline" size={20} color="black" />
            <TextInput
              style={styles.textInputOne}
              placeholder={"Last Name"}
              placeholderTextColor="#8c8b90"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              ref={secondInputRef}
              onSubmitEditing={() => thirdInputRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputContainerOne}>
            <Ionicons name="briefcase-outline" size={20} color="black" />
            <TextInput
              style={styles.textInputOne}
              placeholder="Company"
              placeholderTextColor="#8c8b90"
              value={company}
              onChangeText={setCompany}
              autoCapitalize="words"
              ref={thirdInputRef}
              blurOnSubmit={true}
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
                      color="#fe3d30"
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.textInputOne}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    value={phoneFormat(phoneInputs[index])}
                    onChangeText={(text) => handlePhoneInputChange(text, index)}
                    placeholder="Phone"
                    placeholderTextColor="#8c8b90"
                    ref={phoneInputRef}
                  />
                </View>
              );
            })}
            {phoneInputs.length < 5 && (
              <TouchableOpacity
                style={styles.addAnotherButton}
                onPress={handleAddAnotherPhoneInput}
              >
                <Ionicons name="md-add-sharp" size={24} color="#0064e5" />
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
                      color="#fe3d30"
                    />
                  </TouchableOpacity>
                  <TextInput
                    key={index}
                    style={styles.textInputOne}
                    keyboardType="email-address"
                    returnKeyType="done"
                    autoCapitalize="none"
                    value={emailInputs[index]}
                    onChangeText={(text) => handleEmailInputChange(text, index)}
                    placeholder="Email"
                    placeholderTextColor="#8c8b90"
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
                <Ionicons name="md-add-sharp" size={24} color="#0064e5" />
                <Text style={styles.addAnotherText}>Add Email</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainerTwo}>
            {propertyInputs.map((input, index) => {
              return (
                <View key={index}>
                  <View style={styles.extraInput}>
                    <TouchableOpacity
                      style={styles.removeInput}
                      onPress={() =>
                        propertyInputsDispatch({
                          type: "REMOVE_INPUT",
                          index: index,
                        })
                      }
                    >
                      <Ionicons
                        name="md-remove-circle"
                        size={24}
                        color="#fe3d30"
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={{ ...styles.textInputOne, paddingTop: 9 }}
                      returnKeyType="done"
                      placeholder="Street"
                      placeholderTextColor="#8c8b90"
                      autoFocus={true}
                      multiline
                      value={propertyInputs[index].street}
                      onChangeText={(value) => handleStreetSearch(value, index)}
                    />
                  </View>
                  {suggestedAddresses.length > 0 && (
                    <View style={styles.searchContainer}>
                      {suggestedAddresses.map((result, i) => {
                        return (
                          <View key={i} style={styles.searchResultContainer}>
                            <View style={styles.searchResultTextContainer}>
                              <Text style={styles.searchResultTitle}>
                                {(result?.addressNumber || "") +
                                  " " +
                                  result?.street}
                              </Text>
                              <Text style={styles.searchResultSubtitle}>
                                {result?.municipality +
                                  ", " +
                                  result?.region +
                                  " " +
                                  result?.postalCode}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.searchAddContainer}
                              onPress={() =>
                                handleChooseProperty(result, searchIndex)
                              }
                            >
                              <Text>Add +</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  <View style={{ ...styles.extraInput, paddingLeft: 40 }}>
                    <TextInput
                      style={styles.textInputOne}
                      returnKeyType="done"
                      placeholder="City"
                      defaultValue={propertyInputs[index].city}
                      placeholderTextColor="#8c8b90"
                      onChangeText={(val) =>
                        propertyInputsDispatch({
                          type: "INPUT_CHANGE",
                          index: index,
                          key: "city",
                          value: val,
                        })
                      }
                    />
                  </View>
                  <View style={{ ...styles.extraInput, paddingLeft: 40 }}>
                    <TextInput
                      style={styles.textInputOne}
                      returnKeyType="done"
                      placeholder="State"
                      placeholderTextColor="#8c8b90"
                      defaultValue={propertyInputs[index].state}
                      onChangeText={(val) =>
                        propertyInputsDispatch({
                          type: "INPUT_CHANGE",
                          index: index,
                          key: "state",
                          value: val,
                        })
                      }
                    />
                    <TextInput
                      style={styles.textInputOne}
                      returnKeyType="done"
                      placeholder="Zip Code"
                      placeholderTextColor="#8c8b90"
                      keyboardType="number-pad"
                      defaultValue={propertyInputs[index].zip}
                      onChangeText={(val) =>
                        propertyInputsDispatch({
                          type: "INPUT_CHANGE",
                          index: index,
                          key: "zip",
                          value: val,
                        })
                      }
                    />
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.addAnotherButton}
              onPress={handleAddAnotherPropertyInput}
            >
              <Ionicons name="md-add-sharp" size={24} color="#0064e5" />
              <Text style={styles.addAnotherText}>Add Property Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#f2f1f6",
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
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#e6e6e6",
    borderWidth: 0.2,
    height: 40,
  },
  textInputOne: {
    display: "flex",
    borderColor: "#dcdcdc",
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    height: "90%",
  },
  inputContainerTwo: {
    paddingVertical: 10,
    marginTop: 30,
  },
  addAnotherButton: {
    height: 40,
    backgroundColor: "white",
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    paddingLeft: 10,
    zIndex: 3,
  },
  addAnotherText: {
    fontWeight: "500",
    color: "#0064e5",
  },
  extraInput: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#dcdcdc",
    borderWidth: 0.2,
    height: 40,
    alignItems: "center",
  },
  removeInput: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    minHeight: 50,
    zIndex: 5,
    backgroundColor: "#f9f9f9",
  },
  searchResultContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchResultTextContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  searchResultTitle: {
    fontWeight: "500",
    color: "#454545",
  },
  searchResultSubtitle: {
    fontWeight: "300",
    color: "#6c6c6c",
  },
  searchAddContainer: {
    width: 40,
  },
});
