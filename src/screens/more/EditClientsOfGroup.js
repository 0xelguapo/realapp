import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import EditingClient from "../../components/more/EditingClient";
import { useDispatch, useSelector } from "react-redux";
import {
  editGroupName,
  selectGroupById,
  removeMultipleClientsFromGroup,
} from "../../redux/group-slice";

export default function EditClientsOfGroup(props) {
  const { groupID, groupTitle } = props.route.params;
  const [groupTitleInput, setGroupTitleInput] = useState(groupTitle);
  const [clientsToBeRemovedFromGroup, setClientsToBeRemovedFromGroup] =
    useState([]);
  const dispatch = useDispatch();

  const handleAddToRemove = (clientGroupID, undo = false) => {
    let idsArray = [...clientsToBeRemovedFromGroup];
    if (!undo) {
      idsArray.push(clientGroupID);
      setClientsToBeRemovedFromGroup(idsArray);
    } else {
      const index = idsArray.indexOf(clientGroupID);
      idsArray.splice(index, 1);
      setClientsToBeRemovedFromGroup(idsArray);
    }
  };

  const handleSubmit = () => {
    dispatch(
      removeMultipleClientsFromGroup({
        removeIDs: clientsToBeRemovedFromGroup,
        groupID: groupID,
      })
    );
  };

  const thisGroup = useSelector((state) => selectGroupById(state, groupID));

  const handleBlurTitleInput = () => {
    if (groupTitleInput !== groupTitle) {
      dispatch(editGroupName({ id: groupID, title: groupTitleInput }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <View style={styles.exitSubmitContainer}>
          <TouchableOpacity onPress={props.navigation.goBack}>
            <Feather name="x-circle" size={28} color="#ababab" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <AntDesign name="checkcircleo" size={25} color="#ababab" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headingContainer}>
        <View style={styles.groupTitleContainer}>
          <TextInput
            style={styles.groupTitleText}
            value={groupTitleInput}
            onChangeText={setGroupTitleInput}
            returnKeyType="done"
            onBlur={handleBlurTitleInput}
          />
        </View>
      </View>
      <View style={styles.groupLengthContainer}>
        <Text style={styles.groupLengthText}>
          {thisGroup.clients.items.length} CONTACTS
        </Text>
      </View>
      <ScrollView
        style={styles.groupMembersContainer}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {thisGroup.clients.items.map((client, index) => (
          <EditingClient
            key={client.client.id}
            clientId={client.client.id}
            name={client.client.name}
            company={client.client.company}
            groupID={client.clientGroupID}
            clientGroupID={client.id}
            index={index}
            handleAddToRemove={handleAddToRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  topContainer: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ababab",
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  rectangleContainer: {
    display: "flex",
    position: "",
    alignItems: "center",
    height: 25,
    width: "100%",
  },
  rectangle: {
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  exitSubmitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingContainer: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  groupTitleText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#454545",
    paddingVertical: 3,
  },
  groupLengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    width: "80%",
    height: 25,
    alignSelf: "center",
  },
  groupLengthText: {
    color: "#535353",
    marginRight: 5,
  },
});
