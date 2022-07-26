import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import { ClientsContext } from "../../context/client-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import AddSimple from "../../components/AddSimple";

export default function AddClientDetails(props) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(new Date());
  const { addConnection } = useContext(ClientsContext);
  const { clientId } = props.route.params;

  const inputRef = useRef(null);

  const handlePress = async () => {
    await addConnection({
      clientId: clientId,
      title: title,
      date: date.toLocaleString(),
    });
    props.navigation.goBack();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <AddSimple goBack={props.navigation.goBack} title="LOG A CONNECTION">
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        ref={inputRef}
        placeholder="Reached, Left Voicemail, Sent Email..."
        placeholderTextColor="#d6d6d6"
      />
      <AddSimple.Actions handleSubmit={handlePress}>
        <DateTimePicker
          mode="datetime"
          value={date}
          is24Hour={true}
          onChange={(e, date) => setDate(date)}
          style={{ minWidth: 170, flex: 1 }}
        />
      </AddSimple.Actions>
    </AddSimple>
    // <View style={styles.container}>
    //   <Pressable onPress={props.navigation.goBack}>
    //     <View style={styles.backdrop}></View>
    //   </Pressable>
    //   <View style={styles.modalContainer}>
    //     <View style={styles.inputsContainer}>
    //       <View style={styles.titleHeaderContainer}>
    //         <Text style={styles.titleHeader}>LOG A CONNECTION</Text>
    //         <TouchableOpacity onPress={props.navigation.goBack}>
    //           <AntDesign name="close" size={24} color="#ababab" />
    //         </TouchableOpacity>
    //       </View>
    //       <TextInput
    //         style={styles.titleInput}
    //         value={title}
    //         onChangeText={setTitle}
    //         ref={inputRef}
    //         placeholder="Reached, Left Voicemail, Sent Email..."
    //         placeholderTextColor="#d6d6d6"
    //       />
    //     </View>
    //     <View style={styles.controlsContainer}>
    //       <View style={styles.controlOptions}>
    //         <DateTimePicker
    //           mode="datetime"
    //           value={date}
    //           is24Hour={true}
    //           onChange={(e, date) => setDate(date)}
    //           style={{ minWidth: 180 }}
    //         />
    //       </View>
    //       <View style={{ flex: 1 }}></View>
    //       <TouchableOpacity underlayColor="#e8e8e8" onPress={handlePress}>
    //         <View style={styles.submitContainer}>
    //           <AntDesign name="checkcircleo" size={30} color="#6c6c6c" />
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  backdrop: {
    height: "42%",
  },
  modalContainer: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 18,
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
    height: 50,
    fontSize: 15,
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  controlOptions: {},
});
