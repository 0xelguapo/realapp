import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addProperty } from "../../redux/properties-slice";
import SuggestedProperty from "../../components/property/SuggestedProperty";
import { Geo } from "aws-amplify";
import { ChooseContext } from "../../context/choose-context";

export default function AddProperty({ navigation }) {
  const dispatch = useDispatch();
  const { selectedClient, setSelectedClient, setSelectedProperty } = useContext(ChooseContext);
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [suggestedLoading, setSuggestedLoading] = useState(false);
  const [suggestedAddressChosen, setSuggestedAddressChosen] = useState(false);

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateAbbr, setStateAbbr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const priceRef = useRef();

  const searchOptionContraints = {
    countries: ["USA"],
    maxResults: 5,
  };

  useEffect(() => {
    if (streetAddress.length === 0) setSuggestedAddresses([]);
    const delaySearch = setTimeout(async () => {
      if (streetAddress.length > 6 && !suggestedAddressChosen) {
        let result;
        setSuggestedLoading(true);
        try {
          result = await Geo.searchByText(
            streetAddress,
            searchOptionContraints
          );
        } catch (err) {
          console.error(err);
        } finally {
          setSuggestedLoading(false);
        }
        if (result) {
          console.log(result);
          setSuggestedAddresses(result);
        }
      }
    }, 1200);
    return () => clearTimeout(delaySearch);
  }, [streetAddress]);

  useEffect(() => {
    const clearSelected = navigation.addListener("beforeRemove", (e) => {
      setSelectedClient(null);
      setSelectedProperty(null)
    });
    return clearSelected;
  }, [navigation]);

  const handleChooseSuggestedProperty = (item) => {
    let fullStreet;
    fullStreet =
      item?.addressNumber?.length > 0
        ? item.addressNumber + " " + item.street
        : item.street;
    setStreetAddress(fullStreet);
    setCity(item.municipality);
    setStateAbbr(item.region);
    setZipCode(item.postalCode);
    setSuggestedAddressChosen(true);
    setSuggestedAddresses([]);
  };

  const handleAddProperty = async () => {
    const propertyInputs = {
      street: streetAddress,
      city: city,
      state: stateAbbr,
      zip: zipCode,
      price: price,
      note: note,
      clientId: selectedClient.id,
    };
    const response = await dispatch(addProperty(propertyInputs)).unwrap();
    if (response) {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={25} color="#6c6c6c" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>New Property</Text>
          <TouchableOpacity onPress={handleAddProperty}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              size={20}
              color="black"
            />
            <TextInput
              style={styles.textInput}
              placeholder={"Street Address | or search via full address"}
              placeholderTextColor="#757575"
              defaultValue={streetAddress}
              onChangeText={setStreetAddress}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={true}
              blurOnSubmit={false}
              onSubmitEditing={() => cityRef.current.focus()}
            />
          </View>
          <View style={styles.suggestedAddressesContainer}>
            {!suggestedLoading ? (
              suggestedAddresses.map((item, index) => (
                <SuggestedProperty
                  key={index}
                  item={item}
                  buttonText="Select"
                  handlePress={() => handleChooseSuggestedProperty(item)}
                />
              ))
            ) : (
              <ActivityIndicator size="small" />
            )}
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="city-variant-outline"
              size={20}
              color="black"
            />
            <TextInput
              style={styles.textInput}
              placeholder={"City"}
              placeholderTextColor="#757575"
              defaultValue={city}
              onChangeText={setCity}
              autoCapitalize="words"
              ref={cityRef}
              blurOnSubmit={false}
              onSubmitEditing={() => stateRef.current.focus()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={20} color="black" />
            <TextInput
              style={{
                ...styles.textInput,
                borderRightWidth: 0.5,
                borderRadius: 0,
              }}
              placeholder={"State"}
              placeholderTextColor="#757575"
              defaultValue={stateAbbr}
              onChangeText={setStateAbbr}
              autoCapitalize="characters"
              ref={stateRef}
              blurOnSubmit={false}
              onSubmitEditing={() => zipRef.current.focus()}
            />
            <TextInput
              style={{ ...styles.textInput, paddingLeft: 20 }}
              placeholder={"Zip"}
              placeholderTextColor="#757575"
              defaultValue={zipCode}
              onChangeText={setZipCode}
              autoCapitalize="words"
              ref={zipRef}
              keyboardType="numeric"
              blurOnSubmit={false}
              onSubmitEditing={() => priceRef.current.focus()}
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="dollar-sign" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder={"Price"}
              placeholderTextColor="#757575"
              defaultValue={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              ref={priceRef}
            />
          </View>

          {!selectedClient ? (
            <TouchableOpacity
              style={styles.addAnotherButton}
              onPress={() => navigation.navigate("ChooseClient")}
            >
              <Ionicons name="md-add-sharp" size={24} color="#026bff" />
              <Text style={styles.addOwnershipText}>Add Ownership</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addAnotherButton}
              onPress={() => navigation.navigate("ChooseClient")}
            >
              <Ionicons name="md-remove-circle" size={20} color="red" />
              <Text style={styles.ownedByText}>
                Owned by:{" "}
                <Text style={styles.selectedClientName}>
                  {selectedClient.firstName + " " + selectedClient?.lastName}
                </Text>
              </Text>
            </TouchableOpacity>
          )}

          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
          >
            <View style={styles.addNoteContainer}>
              <Text style={styles.addNoteHeader}>Add a note</Text>
              <TextInput
                style={styles.addNoteInput}
                value={note}
                onChangeText={setNote}
                multiline={true}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#fdfdfd",
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
    paddingVertical: 25,
  },
  inputsContainer: {
    paddingVertical: 20,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#e6e6e6",
    borderWidth: 0.2,
    height: 40,
  },
  textInput: {
    borderColor: "#dcdcdc",
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    height: "90%",
  },
  addNoteContainer: {
    paddingVertical: 20,
    height: 150,
  },
  addNoteHeader: {
    fontWeight: "500",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  addNoteInput: {
    borderColor: "#dcdcdc",
    backgroundColor: "white",
    paddingLeft: 20,
    flex: 1,
    fontSize: 16,
    height: 50,
  },
  addAnotherButton: {
    height: 40,
    backgroundColor: "white",
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    paddingLeft: 10,
  },
  addOwnershipText: {
    fontWeight: "500",
    color: "#026bff",
  },
  removeOwnershipContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  removeOwnershipText: {
    color: "red",
    fontWeight: "500",
    paddingLeft: 5,
  },
  addClientContainer: {
    display: "flex",
    flex: 2,
  },
  listViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  search: {
    fontSize: 16,
    height: 30,
    paddingVertical: 5,
  },
  ownedByText: {
    fontWeight: "500",
  },
  selectedClientNameContainer: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#0064e5",
  },
  selectedClientName: {
    fontWeight: "700",
  },

  suggestedAddressesContainer: {},
});
