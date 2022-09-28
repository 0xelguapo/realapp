import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneClient,
  selectClientById,
  updateFavorite,
  removeClient,
} from "../../redux/clients-slice";
import { handleDeletedClient } from "../../redux/groups-slice";

export default function ClientDetails(props) {
  const { id, phone } = props.route.params.client;
  const { index } = props.route.params;
  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);
  const { removeClientFromClientsOfGroupArray } = useContext(GroupsContext);

  const dispatch = useDispatch();
  const clientSelect = useSelector((state) => selectClientById(state, id));

  const fetchClientDetails = () => {
    dispatch(fetchOneClient(id));
  };

  useEffect(() => {
    fetchClientDetails();
  }, [dispatch]);

  const favoriteHandler = async () => {
    dispatch(updateFavorite({ id: id, favorite: !clientSelect.favorite }));
  };

  const viewConnectionHandler = () => {
    props.navigation.navigate("AddConnectionHistory", { clientId: id });
  };

  const viewNoteHandler = () => {
    props.navigation.navigate("AddEditNote", {
      clientId: id,
      notes: clientSelect.notes,
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
      clientDetailsState: clientSelect,
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
          dispatch(removeClient(id));
          props.navigation.goBack();
          dispatch(handleDeletedClient(id));
          // if (removeResponse && props.route.params.groupMode === true) {
          //   removeClientFromClientsOfGroupArray(id);
          // }
        },
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted || props.route.params) fetchClientDetails();
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
    <>
      {!clientSelect ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7b7b7c" />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
          <View style={styles.header}>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}></View>
            </View>
            <Text style={styles.name}>{clientSelect.name}</Text>
            <Text style={styles.company}>{clientSelect.company}</Text>
          </View>
          <ClientOptions
            clientDetailsState={clientSelect}
            clientId={id}
            index={index}
            favoriteHandler={favoriteHandler}
            viewEditClientHandler={viewEditClientHandler}
            removeClientHandler={removeClientHandler}
            viewEditGroupHandler={viewEditGroupHandler}
            viewEditReminder={viewEditReminder}
            groupMode={props.route.params.groupMode}
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
              <DetailsContact clientDetailsState={clientSelect} />
            ) : (
              <>
                <DetailsReminders clientDetailsState={clientSelect} />
                <DetailsNote
                  clientDetailsState={clientSelect}
                  viewNoteHandler={viewNoteHandler}
                />
                <DetailsConnectionHistory
                  clientDetailsState={clientSelect}
                  viewConnectionHandler={viewConnectionHandler}
                />
                <DetailsTasks
                  clientDetailsState={clientSelect}
                  viewTaskHandler={viewTaskHandler}
                />
              </>
            )}
          </View>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
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
