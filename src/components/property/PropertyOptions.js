import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function PropertyOptions({
  viewEditPropertyHandler,
  deletePropertyHandler,
  viewEditPropertyGroupHandler,
  viewPropertyOwnerHandler,
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
        onPress={viewPropertyOwnerHandler}
      >
        <View style={styles.optionIconContainer}>
          <AntDesign name="contacts" size={24} color="#535353" />
          <Text style={{...styles.optionText, marginTop: 7}}>OWNER</Text>
        </View>
      </TouchableOpacity>
      {!groupMode && (
        <TouchableOpacity
          underlayColor="#e8e8e8"
          style={styles.touchableOpacityStyle}
          onPress={viewEditPropertyGroupHandler}
        >
          <View style={styles.optionIconContainer}>
            <MaterialIcons name="label-outline" size={24} color="#535353" />
            <Text style={styles.optionText}>CATEGORY</Text>
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
        onPress={deletePropertyHandler}
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
    height: 55,

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
