import { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { ClientsContext } from "../../context/client-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { API } from "aws-amplify";

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
  const { handleFavorite, getOneClient } = useContext(ClientsContext);
  // console.log("props", props.route.params.client);

  const favoriteHandler = async () => {
    await handleFavorite({ id: id, favorite: !clientDetailsState.favorite });
    setClientDetailsState({
      ...clientDetailsState,
      favorite: !clientDetailsState.favorite,
    });
  };

  const viewConnectionHandler = () => {
    props.navigation.navigate("AddClientDetails", { clientId: id });
  };

  const getClientDetails = async () => {
    const response = await getOneClient(id);
    if (response) {
      setClientDetailsState(response.data.getClient);
      console.log(response.data.getClient);
    }
  };

  useEffect(() => {
    getClientDetails();
  }, []);

  const formattedPhone =
    phone.length <= 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(
          4,
          7
        )}-${phone.slice(7, 11)}`;

  return (
    <View style={styles.container}>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}></View>
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{clientDetailsState.company}</Text>
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
      </View>
      <View style={styles.body}>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>Notes</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>Connection History</Text>
            <Pressable onPress={viewConnectionHandler}>
              <Ionicons name="add-circle-outline" size={20} color="#ababab" />
            </Pressable>
          </View>
          <View style={styles.connectionHistoryContainer}>
            {clientDetailsState.connectionHistory?.items &&
              clientDetailsState.connectionHistory.items.map((el) => (
                <View style={styles.connection}>
                  <Text style={styles.connectionTitle} key={el.id}>{el.title}</Text>
                  <Text style={styles.connectionDescription}>{el.description}</Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>Tasks</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 30,
  },
  rectangleContainer: {
    display: "flex",
    alignItems: "center",
  },
  rectangle: {
    top: 10,
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  header: {
    paddingTop: 40,
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
    paddingBottom: 5,
    letterSpacing: 2,
    fontSize: 12,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
  detailsContainer: {
    minHeight: 65,
    borderColor: "#000000",
  },
  connectionHistoryContainer: {
    display: 'flex',
    paddingVertical: 3
  },
  connection: {
    paddingVertical: 5
  },
  connectionTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#6c6c6c'
  },
  connectionDescription: {
    color: '#ababab',
    fontSize: 14
  },
});
