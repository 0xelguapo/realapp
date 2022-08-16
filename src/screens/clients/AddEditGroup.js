import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 

export default function AddEditGroup(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.screenTitle}>Add to Group</Text>
        <TouchableOpacity onPress={props.navigation.goBack}>
            <AntDesign name="close" size={24} color="#ababab" />
          </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create a New Group</Text>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  body: {
    paddingVertical: 30
  },
  createButton: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '500'
  }
});
