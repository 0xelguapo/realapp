import { useEffect, useCallback, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Animated,
} from "react-native";
import { ClientsContext } from "../../context/client-context";
import EachClient from "../../components/EachClient";
import { Ionicons } from "@expo/vector-icons";

export default function Clients({ navigation }) {
  const { clientsArray, isLoading, getAllClients, successStatus } =
    useContext(ClientsContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const viewClientHandler = useCallback((client) => {
    navigation.navigate("ClientDetails", { client: client });
  }, []);

  const renderClient = useCallback(
    ({ item }) => (
      <EachClient
        onPress={() => viewClientHandler(item)}
        name={item.name}
        phone={item.phone}
        company={item.company}
      />
    ),
    []
  );

  useEffect(() => {
    onSuccess();
  }, [successStatus]);

  const onSuccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3500);
  };

  return (
    <View style={styles.container}>
      {successStatus && (
        <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>Contact created successfully</Text>
        </Animated.View>
      )}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Clients</Text>
        <View style={styles.addIconContainer}>
          <Ionicons
            name="ios-person-add"
            size={17}
            color="white"
            onPress={() => navigation.navigate("AddClient")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput style={styles.input} />
        </View>
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={clientsArray}
            renderItem={renderClient}
            keyExtractor={(c) => c.id}
            onRefresh={getAllClients}
            refreshing={isLoading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flex: 0.15,
    backgroundColor: "#212121",
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#e9e9e9",
  },
  addIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 25,
    top: 68,
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: "#0064e5",
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 25,
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.4)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
    },
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },
  list: {
    flex: 1,
  },
  fadingContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    padding: 10,
    backgroundColor: "#026bff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4e97ff",
    width: "95%",
    alignSelf: "center"
  },
  successText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
