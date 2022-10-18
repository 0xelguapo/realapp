import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function PropertyOptions({
  viewEditPropertyHandler,
  removePropertyHandler,
  viewEditPropertyGroupHandler,
  groupMode,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.optionsContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
      >
        <View style={styles.optionIconContainer}>
          <AntDesign name="contacts" size={24} color="#535353" />
          <Text style={{...styles.optionText, marginTop: 7}}>CONTACT</Text>
        </View>
      </TouchableOpacity>
      {!groupMode && (
        <TouchableOpacity
          underlayColor="#e8e8e8"
          style={styles.touchableOpacityStyle}
          onPress={viewEditPropertyGroupHandler}
        >
          <View style={styles.optionIconContainer}>
            <Ionicons name="people-outline" size={24} color="#535353" />
            <Text style={styles.optionText}>GROUP</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
        onPress={viewEditPropertyHandler}
      >
        <View style={styles.optionIconContainer}>
          <Feather name="edit-2" size={24} color="#535353" />
          <Text style={styles.optionText}>EDIT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
        onPress={removePropertyHandler}
      >
        <View style={styles.optionIconContainer}>
          <Ionicons name="remove-circle-outline" size={24} color="#535353" />
          <Text style={styles.optionText}>DELETE</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
    paddingLeft: 15,
    justifyContent: "space-between",
    width: "100%",
  },
  optionIconContainer: {
    display: "flex",
    alignItems: "center",
    width: 69,
    marginRight: 15,
  },
  touchableOpacityStyle: {
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
