import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState, useMemo, useContext } from "react";
import EachClient from "../../components/client/EachClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";
import { editProperty } from "../../redux/properties-slice";
import { SuccessContext } from "../../context/success-context";

export default function AddOwner(props) {
  const { onStatusChange } = useContext(SuccessContext)
  const { propertyId } = props.route.params;
  console.log(propertyId);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const allClients = useSelector(selectAllClients);
  const status = useSelector((state) => state.clients.status);

  const filteredData = useMemo(() => {
    return allClients.filter((c) => {
      const clientData = c.name ? c.name.toUpperCase() : "".toUpperCase();
      const textData = searchInput.toUpperCase();
      return clientData.indexOf(textData) > -1;
    });
  }, [searchInput, allClients]);

  useEffect(() => {
    if (allClients.length < 1) {
      dispatch(fetchClients());
    }
  }, []);

  const handleSelectClient = async (clientId) => {
    const response = await dispatch(
      editProperty({ id: propertyId, clientId: clientId })
    ).unwrap();
    if (response) {
      onStatusChange("OWNER ADDED")
      props.navigation.goBack();
    }
  };

  const renderClient = useCallback(
    ({ item, index }) => (
      <EachClient
        onPress={() => handleSelectClient(item.id)}
        index={index}
        firstName={item.firstName}
        lastName={item.lastName}
        phone={item.phone}
        taskMode={true}
        company={item.company}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.exitContainer}
        >
          <AntDesign name="left" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a Client</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput
            style={styles.input}
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Search for a name, category..."
            placeholderTextColor="#7b7b7c"
          />
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={filteredData}
          renderItem={renderClient}
          keyExtractor={(c) => c.id}
          refreshing={status !== "succeeded"}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#f1f1f1",
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
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
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },
  list: {
    flex: 1,
    paddingLeft: 20,
  },
});
