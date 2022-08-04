import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useClient from "../../hooks/client-hook";

export default function EditClient(props) {
  const { clientId, clientDetailsState } = props.route.params;
  const { index } = props.route.params
  const [fullName, setFullName] = useState(clientDetailsState.name);
  const [company, setCompany] = useState(clientDetailsState.company);
  const [phone, setPhone] = useState(clientDetailsState.phone);
  const [email, setEmail] = useState(clientDetailsState.email);
  const [notes, setNotes] = useState(clientDetailsState.notes);
  const { updateClient } = useClient();

  const handleSubmit = async () => {
    const connection = await updateClient({
      id: clientId,
      name: fullName,
      company: company,
      phone: phone,
      email: email,
      notes: notes,
    }, index);

    props.navigation.navigate({
      name: "ClientDetails",
      params: { id: clientId },
      merge: true,
    });
    console.log(connection)
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
            <Text style={styles.avatarText}>D</Text>
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
            <TextInput
              style={styles.fieldInput}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>EMAIL</Text>
            <TextInput
              style={styles.fieldInput}
              value={email}
              onChangeText={setEmail}
            />
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
    fontWeight: "500",
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
});
