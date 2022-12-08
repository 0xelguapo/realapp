import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneClient, selectClientById } from "../../redux/clients-slice";
import {
  fetchOneProperty,
  handleRemoveTaskFromProperty,
  removeProperty,
  selectPropertyById,
} from "../../redux/properties-slice";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import PropertyOptions from "../../components/property/PropertyOptions";
import { handlePropertyGroupsOnDeleteProperty } from "../../redux/propertyGroups-slice";
import PropertyTask from "../../components/property/PropertyTask";
import { removeOneTask } from "../../redux/tasks-slice";
import CensusData from "../../components/property/CensusData";

export default function PropertyDetails({ navigation, route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const property = useSelector((state) => selectPropertyById(state, id));
  const propertyOwnerId = property?.clientId;
  const [propertyDetailsVisible, setPropertyDetailsVisible] = useState(false);
  const propertyZip = property.zip.slice(0, 5)

  const propertyOwner = useSelector((state) =>
    selectClientById(state, propertyOwnerId)
  );

  const viewEditPropertyHandler = () => {
    navigation.navigate("EditProperty", {
      propertyState: property,
      propertyId: id,
    });
  };

  const viewEditPropertyGroupHandler = () => {
    navigation.navigate("AddEditPropertyGroup", {
      propertyId: id,
    });
  };

  const viewPropertyOwnerHandler = () => {
    if (propertyOwnerId) {
      navigation.navigate("ClientDetails", {
        client: { id: propertyOwnerId },
      });
    } else {
      navigation.navigate("AddOwner", { propertyId: id });
    }
  };

  const viewPropertyTaskHandler = () => {
    navigation.navigate("AddPropertyTask", { propertyId: id });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeOneTask(taskId));
    dispatch(handleRemoveTaskFromProperty({ propertyId: id, taskId: taskId }));
  };

  const deletePropertyHandler = () => {
    Alert.alert("Are you sure you want to delete this property?", null, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          dispatch(removeProperty(id));
          navigation.goBack();
          dispatch(handlePropertyGroupsOnDeleteProperty(id));
        },
      },
    ]);
  };

  const fetchOwnerDetails = async () => {
    if (propertyOwnerId) {
      const response = await dispatch(fetchOneClient(propertyOwnerId)).unwrap();
    }
  };

  const fetchPropertyDetails = () => {
    dispatch(fetchOneProperty(id)).unwrap();
  };

  useEffect(() => {
    fetchOwnerDetails();
  }, []);

  useEffect(() => {
    fetchPropertyDetails();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={navigation.goBack}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.headingContainer}>
          <Text style={styles.street}>{property.street}</Text>
          <View style={styles.headingBody}>
            <Text style={styles.headingBodyText}>
              {property.city && property.city + ", "}
            </Text>
            <Text style={styles.headingBodyText}>
              {property.state && property.state + " "}
            </Text>
            <Text style={styles.headingBodyText}>
              {property.zip && property.zip}
            </Text>
          </View>
          {property.price?.length > 0 && (
            <Text style={styles.priceText}>
              <Feather name="dollar-sign" size={12} color="#6c6c6c" />
              {Number(property.price).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[{ display: "flex", paddingBottom: 50 }]}
      >
        <PropertyOptions
          viewEditPropertyHandler={viewEditPropertyHandler}
          viewEditPropertyGroupHandler={viewEditPropertyGroupHandler}
          viewPropertyOwnerHandler={viewPropertyOwnerHandler}
          deletePropertyHandler={deletePropertyHandler}
        />
        <View style={styles.chooseInfoContainer}>
          <Pressable
            style={!propertyDetailsVisible && { borderBottomWidth: 1 }}
            onPress={() => setPropertyDetailsVisible(false)}
          >
            <Text
              style={
                propertyDetailsVisible
                  ? { ...styles.chooseInfoTitle, color: "#ababab" }
                  : styles.chooseInfoTitle
              }
            >
              OVERVIEW
            </Text>
          </Pressable>
          <Pressable
            style={propertyDetailsVisible && { borderBottomWidth: 1 }}
            onPress={() => setPropertyDetailsVisible(true)}
          >
            <Text
              style={
                propertyDetailsVisible
                  ? styles.chooseInfoTitle
                  : { ...styles.chooseInfoTitle, color: "#ababab" }
              }
            >
              DATA PROFILE
            </Text>
          </Pressable>
        </View>
        {!propertyDetailsVisible ? (
          <>
            <View style={styles.ownedByContainer}>
              {propertyOwner ? (
                <>
                  <Text style={styles.ownedByPlaceholder}>Owned by: </Text>
                  <Text style={styles.propertyOwnerName}>
                    {propertyOwner.firstName + " " + propertyOwner?.lastName}
                  </Text>
                </>
              ) : (
                <Text style={styles.ownedByPlaceholder}>No owner assigned</Text>
              )}
            </View>
            <View style={styles.notesContainer}>
              <Text style={styles.noteHeading}>NOTES</Text>
              {property.note ? (
                <Text style={styles.noteText}>{property.note}</Text>
              ) : (
                <Text style={styles.noteText}>Nothing here yet...</Text>
              )}
            </View>
            <View style={styles.tasksContainer}>
              <Text style={styles.taskHeading}>PLANNED</Text>
              {property.tasks.items?.length > 0 ? (
                property.tasks.items.map((task) => (
                  <PropertyTask
                    handlePress={() => handleDeleteTask(task.id)}
                    key={task.id}
                    title={task.title}
                    description={task.content}
                    date={task.date}
                  />
                ))
              ) : (
                <View style={styles.placeholderTaskContainer}>
                  <Text style={styles.placeholderTaskText}>
                    Nothing planned so far
                  </Text>
                  <TouchableOpacity
                    style={styles.scheduleButton}
                    onPress={viewPropertyTaskHandler}
                  >
                    {/* <Ionicons name="add" size={16} color="#0064e5" /> */}
                    <Text style={styles.scheduleText}>Schedule a task</Text>
                  </TouchableOpacity>
                </View>
              )}
              {property.tasks.items?.length > 0 && (
                <View
                  style={{ ...styles.placeholderTaskContainer, height: 50 }}
                >
                  <TouchableOpacity
                    style={styles.scheduleButton}
                    onPress={viewPropertyTaskHandler}
                  >
                    <Text style={styles.scheduleText}>
                      Schedule another task
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        ) : (
          <CensusData zipCode={propertyZip}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    paddingBottom: 20,
  },
  backButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headingContainer: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  headingBody: {
    flexDirection: "row",
  },
  headingBodyText: {
    marginTop: 5,
    fontSize: 16,
    color: "#6c6c6c",
  },
  priceText: {
    fontSize: 14,
    color: "#6c6c6c",
    marginTop: 5,
  },
  street: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  detailsContainer: {},
  chooseInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginBottom: 20,
  },
  chooseInfoTitle: {
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 12,
  },
  ownedByContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  ownedByPlaceholder: {
    fontSize: 16,
    fontWeight: "500",
  },
  propertyOwnerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  notesContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  noteHeading: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
  },
  noteText: {
    marginTop: 5,
    color: "#6c6c6c",
  },
  tasksContainer: {
    display: "flex",
    height: "auto",
    paddingVertical: 20,
  },
  taskHeading: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  placeholderTaskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  placeholderTaskText: {
    fontSize: 16,
    color: "#6c6c6c",
  },
  scheduleButton: {
    flexDirection: "row",
    marginTop: 5,
  },
  scheduleText: {
    color: "#0064e5",
    fontWeight: "500",
    fontSize: 16,
  },
});
