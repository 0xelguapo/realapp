import { StyleSheet, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AddSimple from "../../components/AddSimple";
import useClient from "../../hooks/client-hook";

export default function AddConnectionHistory(props) {
  const [title, setTitle] = useState(null);
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
