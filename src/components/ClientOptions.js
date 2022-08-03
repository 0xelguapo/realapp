import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ClientOptions({ favoriteHandler, viewEditClientHandler, clientDetailsState }) {
  return (
    <View style={styles.optionsContainer}>
      <TouchableHighlight
        underlayColor="#e8e8e8"
        onPress={favoriteHandler}
        style={styles.touchableHighlightStyle}
      >
        <View style={styles.optionIconContainer}>
          {clientDetailsState.favorite ? (
            <AntDesign name="star" size={24} />
          ) : (
            <AntDesign name="staro" size={24} color="#535353" />
          )}
          <Text style={styles.optionText}>FAVORITE</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="#e8e8e8"
        style={styles.touchableHighlightStyle}
      >
        <View style={styles.optionIconContainer}>
          <AntDesign name="contacts" size={24} color="#535353" />
          <Text style={styles.optionText}>CONTACT</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="#e8e8e8"
        style={styles.touchableHighlightStyle}
        onPress={viewEditClientHandler}
      >
        <View style={styles.optionIconContainer}>
          <Feather name="edit-2" size={24} color="#535353" />
          <Text style={styles.optionText}>EDIT</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  optionIconContainer: {
    display: "flex",
    alignItems: "center",
    minWidth: 60,
  },
  touchableHighlightStyle: {
    borderRadius: 5,
    padding: 5,
  },
  optionText: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
    color: "#535353",
  },
})