import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import { useRef, useState } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

export default function AddProperty({ navigation }) {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateAbbr, setStateAbbr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [note, setNote] = useState("");
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();

  const [clientsVisible, setClientsVisible] = useState(false);

  const handleAddProperty = () => {
    
  };

  return (
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

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior="padding"
        keyboardVerticalOffset={75}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
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
              autoCapitalize="words"
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
            />
          </View>

          <View style={styles.addNoteContainer}>
            <Text style={styles.addNoteHeader}>Add a note</Text>
            <TextInput
              style={styles.addNoteInput}
              value={note}
              onChangeText={setNote}
              multiline={true}
            />
          </View>

          <TouchableOpacity
            style={styles.addAnotherButton}
            onPress={() => setClientsVisible(!clientsVisible)}
          >
            {!clientsVisible ? (
              <>
                <Ionicons name="md-add-sharp" size={24} color="#026bff" />
                <Text style={styles.addOwnershipText}>Add Ownership</Text>
              </>
            ) : (
              <>
                <Ionicons name="md-remove-circle" size={20} color="red" />
                <Text style={styles.removeOwnershipText}>Remove Ownership</Text>
              </>
            )}
          </TouchableOpacity>
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
  },
  addNoteHeader: {
    fontWeight: "500",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  addNoteInput: {
    borderColor: "#dcdcdc",
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 20,
    flex: 1,
    fontSize: 16,
    height: 70,
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
  removeOwnershipText: {
    color: 'red',
    fontWeight: '500',
    paddingLeft: 5
  }
});
