import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import useClient from "../../hooks/client-hook";
import { ClientsContext } from "../../context/client-context";
import { GroupsContext } from "../../context/group-context";
import ClientOptions from "../../components/client/ClientOptions";
import DetailsReminders from "../../components/client/clientDetails/DetailsReminders";
import DetailsNote from "../../components/client/clientDetails/DetailsNote";
import DetailsConnectionHistory from "../../components/client/clientDetails/DetailsConnectionHistory";
import DetailsTasks from "../../components/client/clientDetails/DetailsTasks";
import DetailsContact from "../../components/client/clientDetails/DetailsContact";

export default function ClientDetails(props) {
  const { id, phone } = props.route.params.client;
  const { index } = props.route.params;
  const [clientDetailsState, setClientDetailsState] = useState({
    reminder: { items: 0 },
  });
  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);
  const { removeClientFromClientsOfGroupArray } = useContext(GroupsContext);
  const { getOneClient } = useContext(ClientsContext);
  const { updateFavorite, removeClient } = useClient();

  const getClientDetails = async () => {
    const response = await getOneClient(id);
    if (response) {
      setClientDetailsState(response.data.getClient);
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
    let removeResponse;
    Alert.alert("Are you sure you want to delete this client?", null, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          removeResponse = await removeClient(id, index);
          if (removeResponse && props.route.params.groupMode === true) {
            removeClientFromClientsOfGroupArray(id);
          }
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
        <View style={styles.chooseInfoContainer}>
          <Pressable
            style={!contactDetailsVisible && { borderBottomWidth: 1 }}
            onPress={() => setContactDetailsVisible(false)}
          >
            <Text
              style={
                contactDetailsVisible
                  ? { ...styles.chooseInfoTitle, color: "#ababab" }
                  : styles.chooseInfoTitle
              }
            >
              OVERVIEW
            </Text>
          </Pressable>
          <Pressable
            style={contactDetailsVisible && { borderBottomWidth: 1 }}
            onPress={() => setContactDetailsVisible(true)}
          >
            <Text
              style={
                contactDetailsVisible
                  ? styles.chooseInfoTitle
                  : { ...styles.chooseInfoTitle, color: "#ababab" }
              }
            >
              CONTACT INFO
            </Text>
          </Pressable>
        </View>
        {contactDetailsVisible ? (
          <DetailsContact clientDetailsState={clientDetailsState} />
        ) : (
          <>
            <DetailsReminders clientDetailsState={clientDetailsState} />
            <DetailsNote
              clientDetailsState={clientDetailsState}
              viewNoteHandler={viewNoteHandler}
            />
            <DetailsConnectionHistory
              clientDetailsState={clientDetailsState}
              viewConnectionHandler={viewConnectionHandler}
            />
            <DetailsTasks
              clientDetailsState={clientDetailsState}
              viewTaskHandler={viewTaskHandler}
            />
          </>
        )}
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
  chooseInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 20,
  },
  chooseInfoTitle: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 12,
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
  detailContainer: {
    display: "flex",
    paddingVertical: 3,
  },
  emptyPlaceholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPlaceholder: {
    color: "#ababab",
  },
});
