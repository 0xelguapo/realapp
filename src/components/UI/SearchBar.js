import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function SearchBar({searchInput, setSearchInput, handleClearSearch}) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name="ios-search" size={20} color="black" />
      <TextInput
        style={styles.input}
        placeholderTextColor="#7b7b7c"
        placeholder="Search or type any address to quick add"
        returnKeyType="done"
        onChangeText={setSearchInput}
        value={searchInput}
      />
      {searchInput.length !== 0 && (
        <TouchableOpacity onPress={handleClearSearch}>
          <Feather name="x-circle" size={20} color="#7b7b7c" />
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderColor: "#e9e9e9",
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderRadius: 5,
    shadowRadius: 2,
    shadowColor: "rgba(34, 34, 34, 0.2)",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
    },
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },

})