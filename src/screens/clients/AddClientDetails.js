import {
  StyleSheet,
  View,
  Text,
  Animated,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function AddClientDetails(props) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const backdropAnimation = useRef(new Animated.Value(0)).current
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    Animated.timing(backdropAnimation, {
      toValue: 1,
      duration: 1000
    }).start()
  }, [backdropAnimation])

  return (
    <Animated.View style={styles.container} >
      <View style={styles.backdrop}></View>
      <View style={styles.modalContainer}>
        <View style={styles.inputsContainer}>
          <View style={styles.titleHeaderContainer}>
            <Text style={styles.titleHeader}>LOG A CONNECTION</Text>
            <Pressable onPress={props.navigation.goBack}>
              <AntDesign name="close" size={24} color="#ababab" />
            </Pressable>
          </View>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            ref={inputRef}
            placeholder="Reached, Left Voicemail, Sent Email..."
            placeholderTextColor="#d6d6d6"
          />
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Optional Description..."
            placeholderTextColor="#d6d6d6"
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  backdrop: {
    height: "40%",
  },
  modalContainer: {
    backgroundColor: "white",
    height: "60%",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 18,
    zIndex: 3,
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
    height: 40,
    fontSize: 15,
  },
});
