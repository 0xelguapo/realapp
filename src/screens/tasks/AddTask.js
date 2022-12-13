import { useState, useMemo, useCallback, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import EachClient from "../../components/client/EachClient";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import CustomPressable from "../../components/CustomPressable";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/tasks-slice";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";
import { format, add } from "date-fns";
import { SuccessContext } from "../../context/success-context";

const coeff = 1000 * 60 * 5;

export default function AddTask({ navigation, route }) {
  let curDate;
  if (route.params?.activeDate) {
    curDate = new Date(route.params.activeDate);
  } else {
    curDate = new Date();
  }
  const {onStatusChange} = useContext(SuccessContext)

  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    add(new Date(Math.round(curDate.getTime() / coeff) * coeff), {
      minutes: 15,
    })
  );
  const [endDate, setEndDate] = useState(add(new Date(date), { minutes: 30 }));
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);

  const [clientsVisible, setClientsVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  useEffect(() => {
    if (allClients.length < 1) dispatch(fetchClients());
  }, []);

  const onStartDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setEndDate(add(new Date(currentDate), { minutes: 30 }));
  };

  const onEndDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const showClients = () => {
    Keyboard.dismiss();
    navigation.navigate("AddReminder", { taskMode: true });
  };

  const removeSelectedClient = () => {
    setSelectedClient({});
  };

  const { params } = route;

  useEffect(() => {
    setSelectedClient(params);
    setClientsVisible(true);
  }, [params]);

  const handleSetStartVisible = () => {
    setStartPickerVisible(!startPickerVisible);
    setEndPickerVisible(false);
  };

  const handleSetEndVisible = () => {
    setEndPickerVisible(!endPickerVisible);
    setStartPickerVisible(false);
  };
  const handleAddTask = async () => {
    if (!title) {
      Alert.alert("Please enter a title");
      return;
    }
    const taskDetails = selectedClient?.clientId
      ? {
          title: title,
          content: description,
          date: date,
          endDate: endDate,
          clientId: selectedClient.clientId,
          completed: false,
        }
      : {
          title: title,
          content: description,
          date: date,
          endDate: endDate,
          completed: false,
        };

    const response = await dispatch(addTask(taskDetails)).unwrap();
    if (response) {
      onStatusChange('TASK CREATED')
      navigation.goBack();
    } else {
      console.error("cannot add task");
    }
  };

  function StickyHeader() {
    return (
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>New Task</Text>
        <TouchableOpacity onPress={handleAddTask}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView
      // style={styles.formContainer}
      stickyHeaderIndices={[0]}
      contentContainerStyle={[{ flex: 1 }]}
    >
      <StickyHeader />
      <View style={styles.container}>
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
          placeholder="Optional description"
          multiline={true}
          value={description}
        />

        <View style={styles.setDatesContainer}>
          <TouchableOpacity
            style={styles.timeTextContainer}
            onPress={handleSetStartVisible}
          >
            <Text
              style={
                !startPickerVisible
                  ? styles.startEndTimeTextTitle
                  : { ...styles.startEndTimeTextTitle, color: "#0071e3" }
              }
            >
              Start Time
            </Text>
            <Text
              style={
                !startPickerVisible
                  ? styles.startEndTimeText
                  : { ...styles.startEndTimeText, color: "#0071e3" }
              }
            >
              {format(date, "MMM dd, p")}
            </Text>
          </TouchableOpacity>
          {startPickerVisible && (
            <DateTimePicker
              style={{}}
              value={date}
              mode="datetime"
              is24Hour={true}
              onChange={onStartDateChange}
              minimumDate={new Date()}
              display="spinner"
              minuteInterval={5}
            />
          )}
          <TouchableOpacity
            style={styles.timeTextContainer}
            onPress={handleSetEndVisible}
          >
            <Text
              style={
                !endPickerVisible
                  ? styles.startEndTimeTextTitle
                  : { ...styles.startEndTimeTextTitle, color: "#0071e3" }
              }
            >
              End Time
            </Text>
            <Text
              style={
                !endPickerVisible
                  ? styles.startEndTimeText
                  : { ...styles.startEndTimeText, color: "#0071e3" }
              }
            >
              {format(endDate, "MMM dd, p")}
            </Text>
          </TouchableOpacity>
          {endPickerVisible && (
            <DateTimePicker
              style={{}}
              value={endDate}
              mode="datetime"
              is24Hour={true}
              onChange={onEndDateChange}
              minimumDate={date}
              display="spinner"
              minuteInterval={5}
            />
          )}
        </View>

        <View style={styles.associateClientContainer}>
          {!selectedClient?.firstName ? (
            <TouchableOpacity
              style={styles.addClientContainer}
              onPress={showClients}
            >
              <FontAwesome name="address-book-o" size={24} color="#0064e5" />
              <Text style={styles.addDateText}>Associate Client</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.closeClients}>
              <TouchableOpacity onPress={removeSelectedClient}>
                <FontAwesome name="remove" size={24} color="#ff6b66" />
              </TouchableOpacity>
              <View style={styles.selectedClientContainer}>
                <Text style={styles.selectedClientText}>
                  {selectedClient.firstName + " " + selectedClient.lastName}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#f9f9f9",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
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
    height: 30,
    fontSize: 16,
  },
  descriptionInput: {
    marginTop: 5,
    height: 50,
    fontSize: 16,
    borderBottomWidth: 0.2,
    borderColor: "#ababab",
    color: "#6c6c6c",
  },
  setDatesContainer: {
    borderBottomWidth: 0.2,
    borderColor: "#ababab",
  },
  timeTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  startEndTimeTextTitle: {
    fontSize: 16,
    color: "#cacacb",
  },
  startEndTimeText: {
    fontSize: 16,
    fontWeight: "600",
  },

  secondContainer: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 0.2,
    borderColor: "#ababab",
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
  associateClientContainer: {
    paddingVertical: 10,
  },
  addClientContainer: {
    flexDirection: "row",
    alignItems: "center",
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
