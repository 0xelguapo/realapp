import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function OneGroupView({
  title,
  length,
  handleDelete,
  handleEdit,
  children
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.clientGroupDetails}>
          <Text>
            {length !== 0 ? (
              <Text style={styles.clientsLength}>{length}</Text>
            ) : (
              <Text style={styles.clientsLength}>0</Text>
            )}
          </Text>
          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
      </View>
      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Feather name="edit-2" size={20} color="#535353" />
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.editButton,
            borderLeftWidth: 1,
            borderLeftColor: "#e6e6e6",
          }}
          onPress={handleDelete}
        >
          <Ionicons name="remove-circle-outline" size={24} color="#535353" />
          <Text style={styles.editText}>DELETE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.clientsContainer}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ababab",
  },
  rectangleContainer: {
    display: "flex",
    position: "",
    alignItems: "center",
    height: 25,
    width: "100%",
    marginBottom: 15,
  },
  rectangle: {
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#454545",
    marginBottom: 5,
  },
  editContainer: {
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  editButton: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  clientGroupDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 22,
  },
  clientGroupTitle: {
    fontWeight: "600",
    marginBottom: 3,
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
  clientsContainer: {
    paddingHorizontal: 20,
  },
});
