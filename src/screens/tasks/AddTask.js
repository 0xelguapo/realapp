import { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import EachClient from "../../components/client/EachClient";
import { ClientsContext } from "../../context/client-context";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import CustomPressable from "../../components/CustomPressable";
import { TaskContext } from "../../context/task-context";

export default function AddTask({ navigation }) {
  const { addTask } = useContext(TaskContext);
  const { clientsArray } = useContext(ClientsContext);
  const [filteredData, setFilteredData] = useState(clientsArray);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [clientsVisible, setClientsVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(currentDate);
  };

  const showPickers = () => {
    setPickerVisible(!pickerVisible);
  };

  const showClients = () => {
    setClientsVisible(!clientsVisible);
    if (clientsVisible) {
      setSearchInput("");
      setSelectedClient({});
    }
    Keyboard.dismiss();
  };

  const renderClient = useCallback(
    ({ item }) => (
      <EachClient
        onPress={() => handleChooseClient(item)}
        taskMode={true}
        name={item.name}
        phone={item.phone}
        company={item.company}
      />
    ),
    []
  );

  const handleChooseClient = (client) => {
    setSelectedClient(client);
    setSearchInput(client.name);
    console.log(client);
  };

  const handleSearch = (text) => {
    if (text) {
      const selectedData = clientsArray.filter((c) => {
        const clientData = c.name ? c.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return clientData.indexOf(textData) > -1;
      });
      setFilteredData(selectedData);
      setSearchInput(text);
    } else {
      setFilteredData(clientsArray);
      setSearchInput(text);
    }
  };

  let taskDetails = selectedClient.id
    ? {
        title: title,
        content: description,
        date: date,
        clientId: selectedClient.id,
        completed: false,
      }
    : { title: title, content: description, date: date, completed: false };

  const handleAddTask = async () => {
    let response = await addTask(taskDetails);
    if (response) {
      navigation.goBack();
    } else {
      console.log("cannot add task");
    }
  };
  //   const fetchData = async () => {
  //     let response;
  //     try {
  //       response = await API.graphql({
  //         query: listClients,
  //         variables: { filter: filter },
  //       });
  //       console.log(searchInput);
  //       console.log(response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Add a Task</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="check" size={28} color="#6c6c6c" />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(newText) => setTitle(newText)}
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor={"#cacacb"}
          value={title}
          autoFocus={true}
        />
        <TextInput
          onChangeText={(newText) => setDescription(newText)}
          style={styles.descriptionInput}
          placeholder="Add a note"
          multiline={true}
          value={description}
        />
        <View style={styles.secondContainer}>
          <Pressable onPress={showPickers}>
            {pickerVisible ? (
              <FontAwesome name="calendar-times-o" size={24} color="#ff6b66" />
            ) : (
              <View style={styles.addDateContainer}>
                <FontAwesome5 name="calendar-check" size={24} color="#0064e5" />
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
        <Pressable style={styles.pressableAddClient} onPress={showClients}>
          {clientsVisible ? (
            <View style={styles.closeClients}>
              <FontAwesome name="remove" size={24} color="#ff6b66" />
              {selectedClient.name && (
                <View style={styles.selectedClientContainer}>
                  <Text style={styles.selectedClientText}>
                    {selectedClient.name}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.addClientContainer}>
              <FontAwesome name="address-book-o" size={24} color="#0064e5" />
              <Text style={styles.addDateText}>Associate Client</Text>
            </View>
          )}
        </Pressable>
        {clientsVisible && (
          <View style={styles.contactContainer}>
            <TextInput
              style={styles.search}
              placeholder="Search..."
              value={searchInput}
              onChangeText={handleSearch}
              returnKeyType="done"
            />
            <View style={styles.listViewContainer}>
              <FlatList
                style={styles.clientList}
                data={filteredData}
                renderItem={renderClient}
                keyExtractor={(c) => c.id}
              />
            </View>
          </View>
        )}
        <View style={styles.save}>
          <CustomPressable onPress={handleAddTask}>Save Task</CustomPressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
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
    width: 350,
  },
  addDateText: {
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    color: "#cacacb",
  },
  addClientContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressableAddClient: {
    flex: 0.1,
    justifyContent: "center",
  },
  closeClients: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactContainer: {
    flex: 0.5,
    borderBottomWidth: 0.3,
  },
  search: {
    fontSize: 16,
    flex: 0.1,
    paddingVertical: 5,
  },
  listViewContainer: {
    flex: 1,
  },
  selectedClientContainer: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#0064e5",
  },
  selectedClientText: {
    color: "white",
    fontWeight: "500",
  },
  save: {
    marginTop: 10,
  },
});
