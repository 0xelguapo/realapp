import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

export default function ContactsToImport(props) {
  const [contactsArray, setContactsArray] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filteredContacts = useMemo(() => {
    return contactsArray.filter((c) => {
      const fullName = c.firstName + " " + c?.lastName;
      const clientData = fullName ? fullName.toUpperCase() : "".toUpperCase();
      const textData = searchInput.toUpperCase();
      return clientData.indexOf(textData) > -1;
    }).sort((a,b) => a.firstName > b.firstName);
  }, [searchInput, contactsArray]);

  const getContactPermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.Birthday,
          Contacts.Fields.Company,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.JobTitle,
          Contacts.Fields.Addresses,
        ],
      });
      if (data.length > 0) {
        setContactsArray(data);
        const contact = data[5];
      }
    } else {
      Alert.alert("Please Allow CoAgent to Access Contacts", "", [
        { text: "Cancel" },
        {
          text: "Settings",
          onPress: () => Linking.openSettings(),
        },
      ]);
    }
  };

  const renderContact = useCallback(({ item, index }) => (
    <View>
      <Text>{item.firstName}</Text>
    </View>
  ), []);

  useEffect(() => {
    getContactPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={props.navigation.goBack}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingText}>Import Contacts</Text>
        </View>
        <View style={styles.flexPlaceholder} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#7b7b7c"
            placeholder="Search by name"
            returnKeyType="done"
            onChangeText={setSearchInput}
            value={searchInput}
          />
          {searchInput.length !== 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x-circle" size={20} color="#7b7b7c" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={(c) => c.id}
          contentContainerStyle={[{paddingBottom: 120}]}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 3,
    paddingTop: 20,
  },
  headingTextContainer: {
    flex: 1,
    minWidth: "50%",
  },
  headingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#454545",
    textAlign: "center",
  },
  flexPlaceholder: {
    flex: 1,
  },
  backButtonContainer: {
    paddingBottom: 10,
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderColor: "#e9e9e9",
    backgroundColor: "#f1f1f3",
    borderRadius: 5,
    // shadowRadius: 2,
    // shadowColor: "rgba(34, 34, 34, 0.2)",
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   height: 2,
    // },
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },
});
