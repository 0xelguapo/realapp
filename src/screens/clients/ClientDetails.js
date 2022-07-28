import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import useClient from "../../hooks/client-hook";
import { ClientsContext } from "../../context/client-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ClientDetails(props) {
  const {
    id,
    name,
    company,
    email,
    phone,
    properties,
    tasks,
    updatedAt,
    notes,
  } = props.route.params.client;
  const [clientDetailsState, setClientDetailsState] = useState({});
  const { getOneClient } = useContext(ClientsContext);
  const { updateFavorite } = useClient();
  // console.log("props", props.route.params.client);

  const getClientDetails = async () => {
    const response = await getOneClient(id);
    if (response) {
      setClientDetailsState(response.data.getClient);
      console.log(response.data.getClient);
    }
  };

  const favoriteHandler = async () => {
    await updateFavorite(id, !clientDetailsState.favorite);
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

  useEffect(() => {
    getClientDetails();
  }, []);

  useEffect(() => {
    if (props.route.params) getClientDetails();
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{clientDetailsState.company}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <Pressable>
          <TouchableHighlight
            underlayColor="#e8e8e8"
            onPress={favoriteHandler}
            style={styles.touchableHighlightStyle}
          >
            <View style={styles.optionIconContainer}>
              {clientDetailsState.favorite ? (
                <AntDesign name="star" size={24} />
              ) : (
                <AntDesign name="staro" size={24} color="#535353" />
              )}
              <Text style={styles.optionText}>FAVORITE</Text>
            </View>
          </TouchableHighlight>
        </Pressable>
        <Pressable>
          <TouchableHighlight
            underlayColor="#e8e8e8"
            style={styles.touchableHighlightStyle}
          >
            <View style={styles.optionIconContainer}>
              <AntDesign name="contacts" size={24} color="#535353" />
              <Text style={styles.optionText}>CONTACT</Text>
            </View>
          </TouchableHighlight>
        </Pressable>
        <Pressable>
          <TouchableHighlight
            underlayColor="#e8e8e8"
            style={styles.touchableHighlightStyle}
          >
            <View style={styles.optionIconContainer}>
              <Feather name="edit-2" size={24} color="#535353" />
              <Text style={styles.optionText}>EDIT</Text>
            </View>
          </TouchableHighlight>
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>NOTES</Text>
            <Pressable onPress={viewNoteHandler}>
              <Ionicons name="add-circle-outline" size={20} color="#ababab" />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.notesText}>{clientDetailsState.notes}</Text>
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
  headerBottom: {
    marginTop: 10,
    justifyContent: "space-around",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  company: {
    color: "#6c6c6c",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  optionIconContainer: {
    display: "flex",
    alignItems: "center",
    width: 60,
  },
  touchableHighlightStyle: {
    borderRadius: 5,
    padding: 5,
  },
  optionText: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
    color: "#535353",
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
});
