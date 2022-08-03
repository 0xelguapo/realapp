import {
  StyleSheet,
  View,
  Text,
  Animated,
  Pressable,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";

function AddSimple({ title, goBack, children, withDescription = false }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.backdrop}></Pressable>
      <View style={styles.modalContainer}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.titleHeader}>{title}</Text>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="close" size={24} color="#ababab" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  );
}

AddSimple.Actions = ({ handleSubmit, children }) => (
  <View style={styles.controlsContainer}>
    <View style={styles.controlOptions}>{children}</View>
    <TouchableOpacity underlayColor="#e8e8e8" onPress={handleSubmit}>
      <View style={styles.submitContainer}>
        <AntDesign name="checkcircleo" size={30} color="#6c6c6c" />
      </View>
    </TouchableOpacity>
  </View>
);

export default AddSimple;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 18,
  },
  titleHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleHeader: {
    fontSize: 13,
    fontWeight: "500",
    color: "#ababab",
    letterSpacing: 1.8,
    paddingVertical: 5,
  },
  titleInput: {
    height: 40,
    fontSize: 15,
  },
  descriptionInput: {
    height: 50,
    fontSize: 15,
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
  },
});