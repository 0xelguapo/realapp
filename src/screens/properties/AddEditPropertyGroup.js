import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useRef } from "react";
import ClientGroup from "../../components/client/ClientGroup";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  addPropertyGroup,
  fetchPropertyGroups,
  selectAllPropertyGroups,
  addPropertyToGroup,
} from "../../redux/propertyGroups-slice";
import PropertyGroup from "../../components/property/PropertyGroup";
import { selectPropertyById } from "../../redux/properties-slice";

export default function AddEditPropertyGroup(props) {
  const { propertyId } = props.route.params;
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [allUpdatedGroups, setAllUpdatedGroups] = useState([]);

  const groupsOfProperty = useSelector((state) =>
    selectPropertyById(state, propertyId)
  ).group.items;
  const allPropertyGroups = useSelector(selectAllPropertyGroups);

  const updatePropertyGroups = (allPropertyGroups, groupsOfProperty) => {
    let allPropertyGroupsCopy = [...allPropertyGroups];
    for (let i = 0; i < allPropertyGroupsCopy.length; i++) {
      const propertyGroupsId = allPropertyGroupsCopy[i].id;
      for (let j = 0; j < groupsOfProperty.length; j++) {
        if (propertyGroupsId === groupsOfProperty[j].propertyGroupID) {
          allPropertyGroupsCopy[i] = {
            ...allPropertyGroupsCopy[i],
            inGroup: true,
            groupsPropertyID: groupsOfProperty[j].id,
          };
          break;
        } else if (propertyGroupsId !== groupsOfProperty[j].propertyGroupID) {
          allPropertyGroups[i] = {
            ...allPropertyGroups[i],
            inGroup: false,
            groupsPropertyID: null,
          };
        }
      }
    }
    return allPropertyGroupsCopy;
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (title) {
      dispatch(addPropertyGroup(title));
      setTitle("");
      setShowInput(false);
    } else if (!title) {
      setTitle("");
      setShowInput(false);
    }
  };

  useEffect(() => {
    dispatch(fetchPropertyGroups());
  }, []);

  useEffect(() => {
    let finalArray = updatePropertyGroups(allPropertyGroups, groupsOfProperty);
    setAllUpdatedGroups(finalArray);
  }, [allPropertyGroups, groupsOfProperty]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.screenTitle}>Add to Group</Text>
        <TouchableOpacity onPress={props.navigation.goBack}>
          <AntDesign name="close" size={24} color="#ababab" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={[{ paddingBottom: 70, paddingHorizontal: 30 }]}
      >
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.createButtonText}>Create a New Group</Text>
          {showInput ? (
            <AntDesign name="minus" size={24} color="black" />
          ) : (
            <Ionicons name="add" size={24} color="black" />
          )}
        </TouchableOpacity>
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              returnKeyType="done"
              autoCapitalize="words"
              onChangeText={setTitle}
              onSubmitEditing={handleSubmit}
              autoFocus={true}
              value={title}
            />
          </View>
        )}
        <View style={styles.groupsContainer}>
          {allUpdatedGroups.map((propertyGroup, index) => (
            <PropertyGroup
              key={index}
              propertyId={propertyId}
              propertyGroup={propertyGroup}
              groupsPropertyID={propertyGroup.groupsPropertyID}
              index={index}
              inGroup={propertyGroup.inGroup}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 75,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 18,
  },
  createButton: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    display: "flex",
    paddingVertical: 10,
  },
  input: {
    height: 35,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    borderColor: "#454545",
  },
  groupsContainer: {
    marginTop: 10,
  },
});
