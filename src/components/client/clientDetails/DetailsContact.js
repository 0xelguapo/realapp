import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BlockHeading from "./BlockHeading";
import * as Linking from "expo-linking";
import { AntDesign, Feather } from "@expo/vector-icons";
import globalStyles from "../../../globalStyles";

export default function DetailsContact({ clientDetailsState }) {
  console.log(clientDetailsState);
  return (
    <View style={styles.container}>
      <BlockHeading title={"PHONE NUMBERS"} />
      <View style={styles.detailsContainer}>
        {clientDetailsState.phone.length > 1 ? (
          clientDetailsState.phone.split(",").map((number, index) => (
            <View style={styles.phoneEmailContainer} key={index}>
              <Text style={styles.detailText}>{number}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => Linking.openURL(`sms://${number}`)}
                >
                  <Feather name="message-circle" size={20} color="#6c6c6c" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel://${number}`)}
                  style={styles.iconContainer}
                >
                  <AntDesign name="phone" size={20} color="#6c6c6c" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={globalStyles.emptyPlaceholderText}>
            Add a phone number...
          </Text>
        )}
      </View>
      <BlockHeading title="EMAILS" />
      <View style={styles.detailsContainer}>
        {clientDetailsState.email.length > 1 ? (
          clientDetailsState.email.split(",").map((email, index) => (
            <View style={styles.phoneEmailContainer} key={index}>
              <Text style={styles.detailText}>{email}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => Linking.openURL(`mailto:${email}`)}
                >
                  <Feather name="mail" size={20} color="#6c6c6c" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={globalStyles.emptyPlaceholderText}>
            Add a phone number...
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
  },
  iconContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneEmailContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(0,0,0,.2)",
  },
  detailText: {
    fontWeight: "500",
    color: "#6c6c6c",
    fontSize: 15,
  },
});
