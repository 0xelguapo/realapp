import { useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectClientById } from "../../redux/clients-slice";
import {
  fetchOneProperty,
  selectPropertyById,
} from "../../redux/properties-slice";
import { Feather, Ionicons } from "@expo/vector-icons";
import PropertyOptions from "../../components/property/PropertyOptions";

export default function PropertyDetails({ navigation, route }) {
  const { id } = route.params;
  const property = useSelector((state) => selectPropertyById(state, id));
  const propertyOwnerId = property.clientId;
  const propertyOwner = useSelector((state) =>
    selectClientById(state, propertyOwnerId)
  );

  const dispatch = useDispatch();

  const fetchPropertyDetails = () => {
    dispatch(fetchOneProperty(id)).unwrap();
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [dispatch]);

  return (
    <ScrollView
      contentContainerStyle={[
        { backgroundColor: "#f4f4f4", display: "flex", paddingBottom: 100, },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
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
          {property.price && (
            <Text style={styles.priceText}>
              <Feather name="dollar-sign" size={12} color="#6c6c6c" />
              {Number(property.price).toLocaleString()}
            </Text>
          )}
        </View>
      </View>
      <PropertyOptions />
      <View style={styles.body}>
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
            <Text>hi</Text>
          ) : (
            <View style={styles.placeholderTaskContainer}>
              <Text style={styles.placeholderTaskText}>
                Nothing planned so far
              </Text>
              <TouchableOpacity style={styles.scheduleButton}>
                {/* <Ionicons name="add" size={16} color="#0064e5" /> */}
                <Text style={styles.scheduleText}>Schedule a task</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
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
  body: {
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
    paddingVertical: 20,
    flex: 0.2,
  },
  taskHeading: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingHorizontal: 30,
  },
  placeholderTaskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
