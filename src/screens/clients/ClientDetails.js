import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
import { handleGroupsOnDeleteClient } from "../../redux/groups-slice";
import { handleRemindersOnDeleteClient } from "../../redux/reminders-slice";
import { AntDesign } from "@expo/vector-icons";
import DetailsProperties from "../../components/client/clientDetails/DetailsProperties";

export default function ClientDetails(props) {
  const { id, phone } = props.route.params.client;
  const { index } = props.route.params;
  const [contactDetailsVisible, setContactDetailsVisible] = useState(false);

  const dispatch = useDispatch();
  const clientSelect = useSelector((state) => selectClientById(state, id));
  const fetchClientDetails = () => {
    dispatch(fetchOneClient(id));
  };

  useEffect(() => {
    fetchClientDetails();
  }, []);

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
      firstName: clientSelect.firstName,
      lastName: clientSelect.lastName,
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
          dispatch(handleGroupsOnDeleteClient(id));
          dispatch(handleRemindersOnDeleteClient(id));
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

  return (
    <>
      {!clientSelect ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7b7b7c" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={props.navigation.goBack}
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.name}>
              {clientSelect.lastName
                ? clientSelect.firstName + " " + clientSelect.lastName
                : clientSelect.firstName}
            </Text>
            <Text style={styles.company}>{clientSelect.company}</Text>
          </View>
          <ScrollView style={styles.body} contentContainerStyle={[{paddingBottom: 30}]}>
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
              <View style={styles.detailsContainer}>
                <DetailsContact clientDetailsState={clientSelect} />
              </View>
            ) : (
              <View style={styles.detailsContainer}>
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
                <DetailsProperties clientDetailsState={clientSelect} />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
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
  backButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    display: "flex",
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  header: {
    paddingVertical: 0,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  company: {
    marginTop: 5,
    fontSize: 16,
    color: "#6c6c6c",
  },
  body: {
    display: "flex",
    height: "100%",
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  chooseInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    borderColor: "#000000",
    paddingHorizontal: 10,
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
