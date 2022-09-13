import { View, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import AddSimple from "../../components/AddSimple";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default function AddNote(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePress = async () => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.createNote, {
          input: {
            title: title,
            content: content,
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
    if (response) {
      console.log(response);
    }
    props.navigation.navigate("MoreHome", { note: response.data.createNote });
    return response;
  };

  return (
    <AddSimple goBack={props.navigation.goBack} title="ADD A NOTE">
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          ref={inputRef}
        />
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          multiline={true}
          placeholder="Description (optional)"
        />
      </View>
      <AddSimple.Actions handleSubmit={handlePress} />
    </AddSimple>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {},

  titleInput: {
    height: 28,
    fontSize: 15,
    marginBottom: 5,
  },
  contentInput: {
    height: 60,
  },
});
