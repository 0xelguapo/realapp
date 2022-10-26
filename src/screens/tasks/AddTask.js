import { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import EachClient from "../../components/client/EachClient";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import CustomPressable from "../../components/CustomPressable";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/tasks-slice";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";

export default function AddTask({ navigation }) {
  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);
  const clientStatus = useSelector((state) => state.clients.status);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [clientsVisible, setClientsVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  const filteredData = useMemo(() => {
    return allClients.filter((c) => {
      const fullName = c.firstName + " " + c?.lastName;
      const clientData = fullName ? fullName.toUpperCase() : "".toUpperCase();
      const textData = searchInput.toUpperCase();
      return clientData.indexOf(textData) > -1;
    });
  }, [searchInput, allClients]);

  useEffect(() => {
    if (allClients.length < 1) dispatch(fetchClients());
  }, []);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
        firstName={item.firstName}
        lastName={item.lastName}
        phone={item.phone}
        company={item.company}
      />
    ),
    []
  );

  const handleChooseClient = (client) => {
    setSelectedClient(client);
    setSearchInput(client.firstName + " ", client?.lastName);
    setClientsVisible(false);
  };

  const handleAddTask = async () => {
    let taskDetails = selectedClient.id
      ? {
          title: title,
          content: description,
          date: date,
          clientId: selectedClient.id,
          completed: false,
        }
      : { title: title, content: description, date: date, completed: false };

    const response = await dispatch(addTask(taskDetails));
    if (response) {
      navigation.goBack();
    } else {
      console.error("cannot add task");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>New Task</Text>
        <TouchableOpacity onPress={handleAddTask}>
          <Text style={styles.saveText}>Save</Text>
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
              {selectedClient.firstName && (
                <View style={styles.selectedClientContainer}>
                  <Text style={styles.selectedClientText}>
                    {selectedClient.firstName + " " + selectedClient.lastName}
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.addClientContainer}>
              <FontAwesome name="address-book-o" size={24} color="#0064e5" />
              <Text style={styles.addDateText}>
                {selectedClient.firstName
                  ? selectedClient.firstName + " " + selectedClient.lastName
                  : "Associate Client"}
              </Text>
            </View>
          )}
        </Pressable>
        {clientsVisible && (
          <View style={styles.contactContainer}>
            <TextInput
              style={styles.search}
              value={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search..."
              placeholderTextColor="#7b7b7c"
              returnKeyType="done"
            />
            <View style={styles.listViewContainer}>
              <FlatList
                data={filteredData}
                renderItem={renderClient}
                refreshing={clientStatus !== "succeeded"}
                keyExtractor={(c) => c.id}
              />
            </View>
          </View>
        )}
        {/* <View style={styles.save}>
          <CustomPressable onPress={handleAddTask}>Save Task</CustomPressable>
        </View> */}
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
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0064e5",
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
