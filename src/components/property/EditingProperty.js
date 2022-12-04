import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function EditingProperty({
  street,
  city = '',
  state = '',
  zip = '',
  handleAddToRemove,
  groupsPropertyID
}) {
  const [checked, setChecked] = useState(true);

  const handleCheck = () => {
    if (checked) {
      handleAddToRemove(groupsPropertyID, false);
      setChecked(false);
    } else {
      handleAddToRemove(groupsPropertyID, true);
      setChecked(true);
    }
  };

  return (
    <Pressable>
      <TouchableHighlight underlayColor="#f1f1f1" onPress={handleCheck}>
        <View style={styles.container}>
          <View style={styles.checkContainer}>
            {checked && <Ionicons name="checkmark" size={30} color="blue" />}
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{street}</Text>
            <Text style={styles.subtitle}>
              {city + " " + state + " " + zip}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    width: "100%",
  },
  checkContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: "90%",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 3,
  },
  subtitle: {
    color: "#7b7b7c",
  },
  phone: {
    color: "#7b7b7c",
  },
});
