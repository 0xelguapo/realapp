import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddSimple from "../../components/AddSimple";
import { useDispatch } from "react-redux";
import { addPropertyTask } from "../../redux/properties-slice";

export default function AddPropertyTask(props) {
  const { propertyId } = props.route.params
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch()
  
  const handleSubmit = async () => {
    if(!title) {
      props.navigation.goBack();
      return;
    }
    const taskInputs = {
      title: title,
      content: description,
      completed: false,
      date: date.toLocaleString(),
      propertyId: propertyId
    }
    let response = await dispatch(addPropertyTask(taskInputs)).unwrap()
    if(response) {
      props.navigation.goBack()
    }
  }
  
  return (
    <AddSimple
      goBack={props.navigation.goBack}
      enableOverlayGoBack={false}
      withDescription={true}
      title="CREATE A TASK"
    >
      <TextInput
        style={styles.titleInput}
        placeholder="Finish due diligence, research owner..."
        placeholderTextColor="#d6d6d6"
        autoFocus={true}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.descriptionInput}
        multiline={true}
        placeholder="Optional description..."
        placeholderTextColor="#d6d6d6"
        value={description}
        onChangeText={setDescription}
      />
      <AddSimple.Actions handleSubmit={handleSubmit}>
        <DateTimePicker
          mode="datetime"
          value={date}
          onChange={(e, date) => setDate(date)}
          is24Hour={true}
          style={{ minWidth: 180, flex: 1 }}
        />
      </AddSimple.Actions>
    </AddSimple>
    // <View style={styles.container}>
    //   <Pressable
    //     onPress={props.navigation.goBack}
    //     style={[
    //       StyleSheet.absoluteFill,
    //       { backgroundColor: "rgba(0, 0, 0, 0.3)" },
    //     ]}
    //   />
    //   <View
    //     style={styles.modalContainer}
    //     behavior="padding"
    //   >
    //     <View style={styles.headingContainer}>
    //       <Text style={styles.headingTitle}>CREATE A TASK</Text>
    //     </View>
    //     <View style={styles.bodyContainer}>
    //       <TextInput
    //         style={styles.titleInput}
    //         placeholder="Finish due diligence, research owner..."
    //         placeholderTextColor="#d6d6d6"
    //         autoFocus={true}
    //       />
    //       <TextInput
    //         style={styles.descriptionInput}
    //         multiline={true}
    //         placeholder="Optional description..."
    //         placeholderTextColor="#d6d6d6"
    //       />
    //     </View>
    //     <View style={styles.actionsContainer}>
    //       <TouchableOpacity>
    //         <AntDesign name="checkcircleo" size={30} color="#6c6c6c" />
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
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flexGrow: 0.55,
    backgroundColor: "#f6f6f6",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headingTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#ababab",
    letterSpacing: 1.8,
  },
  bodyContainer: {
    display: "flex",
    paddingHorizontal: 20,
  },
  titleInput: {
    height: 35,
    fontSize: 16,
  },
  descriptionInput: {
    height: 60,
    fontSize: 15,
    marginBottom: 5,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
