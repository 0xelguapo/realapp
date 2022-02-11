import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomPressable from "../../components/CustomPressable";

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(currentDate);
  };

  const showPickers = () => {
    setPickerVisible(!pickerVisible);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => console.log("im searching"), 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <AntDesign name="left" size={25} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>New Task</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(newText) => setTitle(newText)}
          style={styles.titleInput}
          placeholder="Title"
        />
        <TextInput
          onChangetext={(newText) => setDescription(newText)}
          style={styles.descriptionInput}
          placeholder="Add a note"
          multiline={true}
        />
        <View style={styles.secondContainer}>
          <Pressable onPress={showPickers}>
            {pickerVisible ? (
              <FontAwesome name="calendar-times-o" size={20} color="#ff6b66" />
            ) : (
              <View style={styles.addDateContainer}>
                <FontAwesome5 name="calendar-check" size={20} color="#0064e5" />
                <Text style={styles.addDateText}>Add Date</Text>
              </View>
            )}
          </Pressable>
          {pickerVisible && (
            <DateTimePicker
              style={{ width: 220 }}
              value={date}
              mode="datetime"
              is24Hour={true}
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
        </View>
        <View style={styles.secondContainer}>
          <TextInput
            style={styles.search}
            placeholder="Associate with Contact"
            onChangeText={(newText) => setSearchInput(newText)}
          />
        </View>
        <View style={styles.save}>
          <CustomPressable>Save Task</CustomPressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  headingContainer: {
    flex: 0.06,
    padding: 20,
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  titleInput: {
    height: 45,
    fontSize: 18,
  },
  descriptionInput: {
    marginTop: 5,
    height: 80,
    fontSize: 16,
    borderBottomWidth: 0.3,
  },
  secondContainer: {
    flex: 0.1,
    flexDirection: "row",
    borderBottomWidth: 0.3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addDateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  addDateText: {
    fontWeight: "500",
    paddingLeft: 7,
    fontSize: 15,
    color: "#cacacb",
  },
  save: {
    marginTop: 10,
  },
});
