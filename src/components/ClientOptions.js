import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ClientOptions({
  favoriteHandler,
  viewEditClientHandler,
  clientDetailsState,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.optionsContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
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
      <TouchableHighlight
        underlayColor="#e8e8e8"
        style={styles.touchableHighlightStyle}
        // onPress={viewEditClientHandler}
      >
        <View style={styles.optionIconContainer}>
          <Ionicons name="people-outline" size={24} color="#535353" />
          <Text style={styles.optionText}>GROUP</Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: "flex-start",
    width: "auto",
  },
  optionIconContainer: {
    display: "flex",
    alignItems: "center",
    width: 65,
    marginRight: 10,
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
});
