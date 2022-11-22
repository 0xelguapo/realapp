import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Pressable,
} from "react-native";

export default function EachProperty({
  street,
  city = "",
  state = "",
  zipCode = "",
  handlePress,
}) {
  return (
    <TouchableHighlight
      onPress={handlePress}
      underlayColor="#f1f1f1"
      style={styles.touchable}
    >
      <View style={styles.container}>
        <View style={styles.streetContainer}>
          <Text style={styles.streetText}>{street}</Text>
        </View>
        <View style={styles.detailsContainer}>
          {city.length > 0 && <Text>{city + ", "}</Text>}
          {state.length > 0 && <Text>{state + " "}</Text>}
          {zipCode.length > 0 && <Text>{zipCode}</Text>}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    justifyContent: "center",
  },
  container: {
    display: "flex",
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    justifyContent: "center",
  },
  streetText: {
    fontWeight: "600",
    fontSize: 16,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
