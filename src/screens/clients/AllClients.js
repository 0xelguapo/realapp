import { useEffect, useCallback, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { ClientsContext } from "../../context/client-context";
import EachClient from "../../components/EachClient";
import { Ionicons } from "@expo/vector-icons";

export default function Clients({ navigation }) {
  const {
    clientsArray,
    isLoading,
    getAllClients,
    successStatus,
    favoriteClients,
  } = useContext(ClientsContext);
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
        <Text style={styles.headerText}>Contacts</Text>
        {/* <View style={styles.addIconContainer}>
          <Ionicons
            name="ios-person-add"
            size={17}
            color="white"
            onPress={() => navigation.navigate("AddClient")}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Search for a name, category..."
          />
        </View>
        <ScrollView style={styles.favorites} horizontal={true} showsHorizontalScrollIndicator={false}>
          {favoriteClients.map((fave) => (
            <View style={styles.favoriteClient}>
              <Text style={styles.favoriteFirstLetter}>
                {fave.name[0].toUpperCase()}
              </Text>
              <Text className={styles.favoriteName}>{fave.name}</Text>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#454545",
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
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderColor: "#e9e9e9",
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderRadius: 5,
    shadowRadius: 2,
    shadowColor: "rgba(34, 34, 34, 0.2)",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
    },
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },
  favorites: {
    paddingVertical: 20,
  },
  favoriteClient: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: 70,
    flex: 1,
    marginRight: 20
  },
  favoriteFirstLetter: {},
  favoriteName: {},
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
    alignSelf: "center",
  },
  successText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
