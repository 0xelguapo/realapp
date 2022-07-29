import { StyleSheet, TextInput } from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import AddSimple from "../../components/AddSimple";
import useClient from "../../hooks/client-hook";

export default function AddEditNote(props) {
  const { clientId, notes } = props.route.params;
  const [note, setNote] = useState(notes);
  const inputRef = useRef(null);
  const { addEditNote } = useClient();
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePress = async () => {
    const response = await addEditNote(clientId, note);
    props.navigation.navigate({
      name: 'ClientDetails',
      params: { note: note },
      merge: true
    });
    if(response) console.log(response)
  };

  return (
    <AddSimple goBack={props.navigation.goBack} title="NOTE">
      <TextInput
        style={styles.titleInput}
        value={note}
        onChangeText={setNote}
        ref={inputRef}
        placeholder="Enter a note..."
        placeholderTextColor="#d6d6d6"
        multiline={true}
      />
      <AddSimple.Actions handleSubmit={handlePress} />
    </AddSimple>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    height: 50,
    fontSize: 15,
    marginBottom: 35
  },
});
