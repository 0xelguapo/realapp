import { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import EachClient from "../../components/EachClient";
import { ClientsContext } from "../../context/client-context";
import { API } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CustomPressable from "../../components/CustomPressable";
import { listClients } from "../../graphql/queries";

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const { clientsArray } = useContext(ClientsContext);
  const [showClients, setShowClients] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState(clientsArray);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log(currentDate);
  };

  const showPickers = () => {
    setPickerVisible(!pickerVisible);
  };

  let filter = {
    name: {
      contains: searchInput,
    },
  };

  const renderClient = useCallback(
    ({ item }) => (
      <EachClient
        onPress={() => setSearchInput(item.name)}
        taskMode={true}
        name={item.name}
        phone={item.phone}
        company={item.company}
      />
    ),
    []
  );

  const handleChooseClient = (client) => {
    setShowClients(false);
    
  };

  const handleSearch = (text) => {
    if (text) {
      const selectedData = masterData.filter((c) => {
        const clientData = c.name ? c.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return clientData.indexOf(textData) > -1;
      });
      setFilteredData(selectedData);
      setSearchInput(text);
    } else {
      setFilteredData(masterData);
      setSearchInput(text);
    }
  };

  // we have clientsarray
  // pass in a string, check to see if any items in clientsarray match string

  useEffect(() => {
    const timeoutId = setTimeout(() => console.log("im searching"), 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const fetchData = async () => {
    let response;
    try {
      response = await API.graphql({
        query: listClients,
        variables: { filter: filter },
      });
      console.log(searchInput);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
          value={title}
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
        <View style={styles.contactContainer}>
          <TextInput
            style={styles.search}
            placeholder="Associate with Contact"
            value={searchInput}
            onChangeText={handleSearch}
          />
          <View><Text>{searchInput}</Text></View>
          <View style={styles.listViewContainer}>
            <FlatList
              style={styles.clientList}
              data={filteredData}
              renderItem={renderClient}
              keyExtractor={(c) => c.id}
            />
          </View>
        </View>
        <View style={styles.save}>
          <Button title="test" onPress={fetchData} />
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
  contactContainer: {
    flex: 0.5,
    borderBottomWidth: 0.3,
  },
  search: {
    flex: 0.1,
    paddingVertical: 5,
  },
  listViewContainer: {
    flex: 1,
  },
  selectedClient: {
      width: '30%',
      backgroundColor: "blue",
  },
  save: {
    marginTop: 10,
  },
});
