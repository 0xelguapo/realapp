import {
  StyleSheet,
  TextInput,
} from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import { ClientsContext } from "../../context/client-context";
import AddSimple from "../../components/AddSimple";

export default function AddEditNote(props) {
  const [note, setNote] = useState();
  const inputRef = useRef(null);
  const { clientId } = props.route.params;

  useEffect(() => {
    inputRef.current.focus();
  });

  const handlePress = () => {

  }

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
      <AddSimple.Actions handleSubmit={handlePress}/>
    </AddSimple>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    height: 50,
    fontSize: 15,
  },
});
