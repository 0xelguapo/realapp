import { useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectClientById } from "../../redux/clients-slice";
import {
  fetchOneProperty,
  selectPropertyById,
} from "../../redux/properties-slice";

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
      contentContainerStyle={[{ backgroundColor: "#f4f4f4", flex: 1 }]}
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
        </View>
      </View>
      <View styles={styles.body}>
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
    paddingVertical: 10,
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
  street: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  body: {},
  ownedByContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: 'space-between'
  },
  ownedByPlaceholder: {
    fontSize: 16,
    fontWeight: '500'
  },
  propertyOwnerName: {
    fontSize: 16,
    fontWeight: '600'
  },
});
