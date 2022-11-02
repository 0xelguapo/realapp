import { StyleSheet, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddSimple from "../../components/AddSimple";
import useClient from "../../hooks/client-hook";

export default function AddConnectionHistory(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const { addTask } = useClient();
  const { clientId } = props.route.params;

  const inputRef = useRef(null);

  const handlePress = async () => {
    if (!title) {
      props.navigation.goBack();
      return;
    }

    const task = await addTask({
      clientId: clientId,
      title: title,
      content: description,
      completed: false,
      date: date.toLocaleString(),
    });

    props.navigation.navigate({
      name: "ClientDetails",
      params: { id: clientId },
      merge: true,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <AddSimple
      goBack={props.navigation.goBack}
      withDescription={true}
      title="CREATE A TASK"
      enableOverlayGoBack={false}
    >
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        ref={inputRef}
        placeholder="Send contract, follow up..."
        placeholderTextColor="#d6d6d6"
      />
      <TextInput
        style={styles.descriptionInput}
        multiline={true}
        onChangeText={setDescription}
        placeholder="Optional description..."
        placeholderTextColor="#d6d6d6"
        value={description}
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
  titleInput: {
    height: 40,
    fontSize: 15,
  },
  descriptionInput: {
    height: 50,
    fontSize: 15,
    marginBottom: 5,
  },
});
