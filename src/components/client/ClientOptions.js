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

export default function ClientOptions({
  favoriteHandler,
  viewEditClientHandler,
  removeClientHandler,
  clientDetailsState,
  viewEditGroupHandler,
  viewEditReminder,
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
        onPress={favoriteHandler}
        style={styles.touchableOpacityStyle}
      >
        <View style={styles.optionIconContainer}>
          {clientDetailsState.favorite ? (
            <AntDesign name="star" size={24} />
          ) : (
            <AntDesign name="staro" size={24} color="#535353" />
          )}
          <Text style={styles.optionText}>FAVORITE</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
      >
        <View style={styles.optionIconContainer}>
          <AntDesign name="contacts" size={24} color="#535353" />
          <Text style={styles.optionText}>CONTACT</Text>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
        onPress={viewEditReminder}
      >
        <View style={styles.optionIconContainer}>
          <Feather name="bell" size={24} color="#535353" />
          <Text style={styles.optionText}>REMIND</Text>
        </View>
      </TouchableOpacity>
      {!groupMode && (
        <TouchableOpacity
          underlayColor="#e8e8e8"
          style={styles.touchableOpacityStyle}
          onPress={viewEditGroupHandler}
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
        onPress={viewEditClientHandler}
      >
        <View style={styles.optionIconContainer}>
          <Feather name="edit-2" size={24} color="#535353" />
          <Text style={styles.optionText}>EDIT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        underlayColor="#e8e8e8"
        style={styles.touchableOpacityStyle}
        onPress={removeClientHandler}
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
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "flex-start",
    width: "auto",
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
