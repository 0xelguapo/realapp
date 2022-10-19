import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addProperty } from "../../redux/properties-slice";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";
import EachClient from "../../components/client/EachClient";

export default function AddProperty({ navigation }) {
  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);
  const clientStatus = useSelector((state) => state.clients.status);
  const [clientsVisible, setClientsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

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

  const filteredData = useMemo(() => {
    return allClients.filter((c) => {
      const fullName = c.firstName + " " + c?.lastName;
      const clientData = fullName ? fullName.toUpperCase() : "".toUpperCase();
      const textData = searchInput.toUpperCase();
      return clientData.indexOf(textData) > -1;
    });
  }, [searchInput, allClients]);

  useEffect(() => {
    if (clientStatus !== "succeeded") dispatch(fetchClients());
  }, []);

  const handleShowClients = () => {
    setClientsVisible(!clientsVisible);
    if (selectedClient) {
      setSearchInput("");
      setSelectedClient("");
    }
    Keyboard.dismiss();
  };

  const handleChooseClient = (client) => {
    setSelectedClient(client);
    setSearchInput(client.firstName + " " + client?.lastName);
    setClientsVisible(false);
    console.log(client);
  };

  const renderClient = useCallback(
    ({ item }) => (
      <EachClient
        onPress={() => handleChooseClient(item)}
        taskMode={true}
        firstName={item.firstName}
        lastName={item.lastName}
        phone={item.phone}
        company={item.company}
      />
    ),
    []
  );

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
              placeholder={"Street Address"}
              placeholderTextColor="#757575"
              value={streetAddress}
              onChangeText={setStreetAddress}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={true}
              blurOnSubmit={false}
              onSubmitEditing={() => cityRef.current.focus()}
            />
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
              value={city}
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
              value={stateAbbr}
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
              value={zipCode}
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
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              ref={priceRef}
            />
          </View>

          {!clientsVisible ? (
            <>
              {!selectedClient ? (
                <TouchableOpacity
                  style={styles.addAnotherButton}
                  onPress={handleShowClients}
                >
                  <Ionicons name="md-add-sharp" size={24} color="#026bff" />
                  <Text style={styles.addOwnershipText}>Add Ownership</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.addAnotherButton}
                  onPress={handleShowClients}
                >
                  <Ionicons name="md-remove-circle" size={20} color="red" />
                  <Text style={styles.ownedByText}>
                    Owned by:{" "}
                    <Text style={styles.selectedClientName}>
                      {selectedClient.firstName +
                        " " +
                        selectedClient?.lastName}
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <View style={styles.addClientContainer}>
                <TouchableOpacity
                  style={styles.addAnotherButton}
                  onPress={handleShowClients}
                >
                  <Ionicons name="md-remove-circle" size={20} color="red" />
                </TouchableOpacity>
                <View style={styles.listViewContainer}>
                  <TextInput
                    style={styles.search}
                    value={searchInput}
                    onChangeText={setSearchInput}
                    placeholder="Search..."
                    placeholderTextColor="#7b7b7c"
                    returnKeyType="done"
                  />
                  <FlatList
                    keyboardShouldPersistTaps={"handled"}
                    data={filteredData}
                    renderItem={renderClient}
                    refreshing={clientStatus !== "succeeded"}
                    keyExtractor={(c) => c.id}
                  />
                </View>
              </View>
            </>
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
                onFocus={() => setClientsVisible(false)}
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
});
