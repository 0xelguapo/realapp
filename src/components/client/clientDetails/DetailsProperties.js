import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { el } from "date-fns/locale";

export default function DetailsProperties({ clientDetailsState }) {
  const navigation = useNavigation();
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.blockHeadingContainer}>
        <Text style={styles.blockHeadingText}>PROPERTIES</Text>
      </View>
      <View style={styles.detailContainer}>
        {clientDetailsState.properties.items?.length ? (
          clientDetailsState.properties.items.map((el) => (
            <TouchableOpacity
              style={styles.property}
              key={el.id}
              onPress={() =>
                navigation.navigate("PropertyDetails", { id: el.id })
              }
            >
              <Text style={styles.streetText}>{el.street}</Text>
              <View style={styles.cityStateContainer}>
                {el.city && (
                  <Text style={styles.cityStateText}>{el.city + ", "}</Text>
                )}
                {el.state && (
                  <Text style={styles.cityStateText}>{el.state + " "}</Text>
                )}
                {el.zip && <Text style={styles.cityStateText}>{el.zip}</Text>}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyPlaceholderContainer}>
            <Text style={styles.emptyPlaceholder}>No properties logged...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockHeadingText: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingVertical: 5,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
  detailsContainer: {
    paddingVertical: 5,
    borderColor: "#000000",
    minHeight: 75,
  },
  detailContainer: {
    display: "flex",
    paddingVertical: 3,
  },
  property: {
    paddingVertical: 5,
  },
  streetText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#6c6c6c",
  },
  cityStateText: {
    color: "#ababab",
    fontSize: 14,
  },
  cityStateContainer: {
    flexDirection: "row",
  },
  emptyPlaceholderContainer: {
    justifyContent: "center",
  },
  emptyPlaceholder: {
    color: "#ababab",
  },
});
