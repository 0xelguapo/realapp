import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  ScrollView,
  Alert,
} from "react-native";
import useClient from "../../hooks/client-hook";
import { ClientsContext } from "../../context/client-context";
import { Ionicons } from "@expo/vector-icons";
import ClientOptions from "../../components/client/ClientOptions";
import { format, parseISO } from "date-fns";
import { Feather } from '@expo/vector-icons'

export default function ClientDetails(props) {
  const { id, phone } = props.route.params.client;
  const { index } = props.route.params;
  const [clientDetailsState, setClientDetailsState] = useState({
    reminder: { items: 0 },
  });
  const { getOneClient } = useContext(ClientsContext);
  const { updateFavorite, removeClient } = useClient();

  const getClientDetails = async () => {
    const response = await getOneClient(id);
    if (response) {
      setClientDetailsState(response.data.getClient);
      console.log(response)
    }
  };

  const favoriteHandler = async () => {
    await updateFavorite(id, !clientDetailsState.favorite, index);
    setClientDetailsState({
      ...clientDetailsState,
      favorite: !clientDetailsState.favorite,
    });
  };

  const viewConnectionHandler = () => {
    props.navigation.navigate("AddConnectionHistory", { clientId: id });
  };

  const viewNoteHandler = () => {
    props.navigation.navigate("AddEditNote", {
      clientId: id,
      notes: clientDetailsState.notes,
    });
  };

  const viewTaskHandler = () => {
    props.navigation.navigate("AddClientTask", {
      clientId: id,
    });
  };

  const viewEditClientHandler = () => {
    props.navigation.navigate("EditClient", {
      clientId: id,
      clientDetailsState: clientDetailsState,
      index: index,
    });
  };

  const viewEditGroupHandler = () => {
    props.navigation.navigate("AddEditGroup", {
      clientId: id,
      index: index,
    });
  };

  const viewEditReminder = () => {
    props.navigation.navigate("EditReminder", {
      clientId: id,
    });
  };

  const removeClientHandler = () => {
    Alert.alert("Are you sure you want to delete this client?", null, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await removeClient(id, index);
          props.navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted || props.route.params) getClientDetails();
    return () => (isMounted = false);
  }, [props.route.params]);

  const formattedPhone =
    phone.length <= 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(
          4,
          7
        )}-${phone.slice(7, 11)}`;

  return (
    <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
      <View style={styles.header}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <Text style={styles.name}>{clientDetailsState.name}</Text>
        <Text style={styles.company}>{clientDetailsState.company}</Text>
      </View>
      <ClientOptions
        clientDetailsState={clientDetailsState}
        clientId={id}
        index={index}
        favoriteHandler={favoriteHandler}
        viewEditClientHandler={viewEditClientHandler}
        removeClientHandler={removeClientHandler}
        viewEditGroupHandler={viewEditGroupHandler}
        viewEditReminder={viewEditReminder}
      />
      <View style={styles.body}>
        <View style={styles.remindersContainer}>
          <View style={styles.bellIcon}>
            <Feather name="bell" size={15} color="#535353" />
          </View>
          <ScrollView
            style={styles.reminders}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {clientDetailsState.reminder.items.length ? (
              clientDetailsState.reminder.items.map((item) => (
                <View key={item.id} style={styles.reminder}>
                  <Text style={styles.reminderDate}>
                    {format(parseISO(item.date), "MM/dd/yy")}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyPlaceholderContainer}>
                <Text style={styles.emptyPlaceholder}>
                  No reminders set up...
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>NOTES</Text>
            <Pressable onPress={viewNoteHandler}>
              <Ionicons name="add-circle-outline" size={20} color="#ababab" />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            {clientDetailsState.notes ? (
              <Text style={styles.notesText}>{clientDetailsState.notes}</Text>
            ) : (
              <Text style={styles.emptyPlaceholder}>Add a note here...</Text>
            )}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>CONNECTION HISTORY</Text>
            <Pressable onPress={viewConnectionHandler}>
              <Ionicons name="add-circle-outline" size={20} color="#ababab" />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            {clientDetailsState.connectionHistory?.items &&
              clientDetailsState.connectionHistory.items.map((el) => (
                <View style={styles.connection} key={el.id}>
                  <Text style={styles.connectionTitle}>{el.title}</Text>
                  {el.date && (
                    <Text style={styles.connectionDate}>
                      {el.date.replace(",", " •")}
                    </Text>
                  )}
                </View>
              ))}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>TASKS</Text>
            <Pressable onPress={viewTaskHandler}>
              <Ionicons name="add-circle-outline" size={20} color="#ababab" />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            {clientDetailsState.tasks?.items &&
              clientDetailsState.tasks.items.map((el) => (
                <View style={styles.taskContainer} key={el.id}>
                  <Text style={styles.connectionTitle}>{el.title}</Text>
                  <Text style={styles.connectionDate}>{el.description}</Text>
                </View>
              ))}
          </View>
        </View>
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    display: "flex",
    paddingHorizontal: 30,
    backgroundColor: "#f4f4f4",
  },
  rectangleContainer: {
    display: "flex",
    position: "",
    alignItems: "center",
    height: 25,
    width: "100%",
    marginBottom: 15,
  },
  rectangle: {
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#f4f4f4",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  company: {
    color: "#6c6c6c",
  },
  body: {
    display: "flex",
  },
  blockHeadingText: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingVertical: 5,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
  detailsContainer: {
    paddingVertical: 5,
    borderColor: "#000000",
    minHeight: 75,
  },
  bellIcon: { marginRight: 5},

  remindersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reminders: {
    height: 35,
    paddingVertical: 5,
  },
  reminder: {
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
  },
  reminderDate: {
    display: "flex",
    color: "#545454",
    fontWeight: "500",
  },
  notesContainer: {
    paddingVertical: 5,
  },
  notesText: {
    color: "#6c6c6c",
  },
  detailContainer: {
    display: "flex",
    paddingVertical: 3,
  },
  connection: {
    paddingVertical: 5,
  },
  connectionTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#6c6c6c",
  },
  connectionDate: {
    color: "#ababab",
    fontSize: 14,
  },
  emptyPlaceholderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyPlaceholder: {
    color: "#ababab",
  },

});
