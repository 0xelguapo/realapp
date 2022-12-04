import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

export default function EditItemsOfGroup({
  handleGoBack,
  handleSubmit,
  groupTitleInput,
  setGroupTitleInput,
  handleBlurTitleInput,
  lengthText,
  handleNavigateAdd,
  addButtonText,
  children,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <View style={styles.exitSubmitContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Feather name="x-circle" size={28} color="#ababab" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <AntDesign name="checkcircleo" size={25} color="#ababab" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headingContainer}>
        <View style={styles.groupTitleContainer}>
          <TextInput
            style={styles.groupTitleText}
            value={groupTitleInput}
            onChangeText={setGroupTitleInput}
            returnKeyType="done"
            onBlur={handleBlurTitleInput}
          />
        </View>
      </View>
      <View style={styles.groupLengthContainer}>
        <Text style={styles.groupLengthText}>{lengthText}</Text>
      </View>
      <ScrollView
        style={styles.groupMembersContainer}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <TouchableOpacity
          style={styles.addContainer}
          onPress={handleNavigateAdd}
        >
          <View style={styles.addIconContainer}>
            <Ionicons name="add" size={28} color="blue" />
          </View>
          <Text style={styles.addText}>{addButtonText}</Text>
        </TouchableOpacity>

        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  topContainer: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ababab",
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  rectangleContainer: {
    display: "flex",
    position: "",
    alignItems: "center",
    height: 25,
    width: "100%",
  },
  rectangle: {
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  exitSubmitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingContainer: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  groupTitleText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#454545",
    paddingVertical: 3,
  },
  groupLengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: "80%",
    height: 25,
    alignSelf: "center",
  },
  groupLengthText: {
    color: "#535353",
    marginRight: 5,
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "3%",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
  addIconContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
