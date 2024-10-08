import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

export default function EachClient({
  firstName,
  lastName,
  phone,
  company,
  email,
  onPress,
  taskMode = false,
  index,
}) {
  const fullName = lastName ? (firstName + ' ' + lastName) : firstName

  let companyTrue = company !== null && company.length > 0

  //for the add task view
  if (taskMode) {
    return (
      <Pressable>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.taskModeContainer}>
            <Text style={styles.name}>{fullName}</Text>
            {companyTrue && (
              <Text style={styles.company}>{company}</Text>
            )}
          </View>
        </TouchableOpacity>
      </Pressable>
    );
  }

  return (
    <Pressable>
      <TouchableHighlight onPress={onPress} underlayColor="#f1f1f1">
        <View style={styles.container}>
          <Text style={styles.name}>{fullName}</Text>
          {companyTrue && <Text style={styles.phone}>{company}</Text>}
          <View style={styles.goContainer}>
            {/* <SimpleLineIcons name="options" size={24} color="#dddddf" /> */}
          </View>
        </View>
      </TouchableHighlight>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: "#7b7b7c",
  },
  phone: {
    color: "#7b7b7c",
  },
  goContainer: {
    position: "absolute",
    right: 25,
    top: 25,
  },
  taskModeContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10,
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
});