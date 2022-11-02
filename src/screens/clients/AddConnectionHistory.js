import { StyleSheet, TextInput, View } from "react-native";
import { useState, useRef, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddSimple from "../../components/AddSimple";
import useClient from "../../hooks/client-hook";

export default function AddConnectionHistory(props) {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null)
  const [date, setDate] = useState(new Date());
  const { addConnection } = useClient();
  const { clientId } = props.route.params;

  const inputRef = useRef(null);

  const handlePress = async () => {
    if (!title) {
      props.navigation.goBack();
      return;
    }

    const connection = await addConnection({
      clientId: clientId,
      title: title,
      content: content,
      date: date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
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
      title="LOG A CONNECTION"
      enableOverlayGoBack={false}
    >
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
        multiline={true}
        value={content}
        onChangeText={setContent}
        placeholder="Optional description..."
        placeholderTextColor="#d6d6d6"
      />
      <View style={{ }}>
        <AddSimple.Actions handleSubmit={handlePress}>
          <DateTimePicker
            mode="datetime"
            value={date}
            is24Hour={true}
            onChange={(e, date) => setDate(date)}
            style={{ minWidth: 175, flex: 1 }}
          />
        </AddSimple.Actions>
      </View>
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
    height: 60,
    fontSize: 15,
    marginBottom: 5,
  },
  controlsContainer: {},
  controlOptions: {},
});
