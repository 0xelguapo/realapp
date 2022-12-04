import { useState } from "react";
import EditingClient from "../../components/more/EditingClient";
import { useDispatch, useSelector } from "react-redux";
import {
  editGroupName,
  selectGroupById,
  removeMultipleClientsFromGroup,
} from "../../redux/groups-slice";
import EditItemsOfGroup from "../../components/UI/EditItemsOfGroup";

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
    props.navigation.goBack();
  };

  const thisGroup = useSelector((state) => selectGroupById(state, groupID));

  const handleBlurTitleInput = () => {
    if (groupTitleInput !== groupTitle) {
      dispatch(editGroupName({ id: groupID, title: groupTitleInput }));
    }
  };

  return (
    <EditItemsOfGroup
      groupTitleInput={groupTitleInput}
      setGroupTitleInput={setGroupTitleInput}
      lengthText={`${thisGroup.clients.items.length} Clients`}
      addButtonText="Add Clients"
      handleGoBack={props.navigation.goBack}
      handleSubmit={handleSubmit}
      handleBlurTitleInput={handleBlurTitleInput}
      handleNavigateAdd={() =>
        props.navigation.navigate("AddClientsToGroup", { groupID: groupID })
      }
    >
      {thisGroup.clients.items.map((client, index) => (
        <EditingClient
          key={client.client.id + index}
          clientId={client.client.id}
          firstName={client.client.firstName}
          lastName={client.client.lastName}
          company={client.client.company}
          groupID={client.clientGroupID}
          clientGroupID={client.id}
          index={index}
          handleAddToRemove={handleAddToRemove}
        />
      ))}
    </EditItemsOfGroup>
    // <View style={styles.container}>
    //   <View style={styles.topContainer}>
    //     <View style={styles.rectangleContainer}>
    //       <View style={styles.rectangle}></View>
    //     </View>
    //     <View style={styles.exitSubmitContainer}>
    //       <TouchableOpacity onPress={props.navigation.goBack}>
    //         <Feather name="x-circle" size={28} color="#ababab" />
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={handleSubmit}>
    //         <AntDesign name="checkcircleo" size={25} color="#ababab" />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    //   <View style={styles.headingContainer}>
    //     <View style={styles.groupTitleContainer}>
    //       <TextInput
    //         style={styles.groupTitleText}
    //         value={groupTitleInput}
    //         onChangeText={setGroupTitleInput}
    //         returnKeyType="done"
    //         onBlur={handleBlurTitleInput}
    //       />
    //     </View>
    //   </View>
    //   <View style={styles.groupLengthContainer}>
    //     <Text style={styles.groupLengthText}>
    //       {thisGroup.clients.items.length} CONTACTS
    //     </Text>
    //   </View>
    //   <ScrollView
    //     style={styles.groupMembersContainer}
    //     contentContainerStyle={{
    //       alignItems: "center",
    //       justifyContent: "center",
    //       paddingBottom: 50,
    //     }}
    //   >
    //     <TouchableOpacity
    //       style={styles.addContainer}
    //       onPress={() =>
    //         props.navigation.navigate("AddClientsToGroup", {
    //           groupID: groupID,
    //         })
    //       }
    //     >
    //       <View style={styles.addIconContainer}>
    //         <Ionicons name="add" size={28} color="blue" />
    //       </View>
    //       <Text style={styles.addText}>Add Clients</Text>
    //     </TouchableOpacity>

    //     {thisGroup.clients.items.map((client, index) => (
    //       <EditingClient
    //         key={client.client.id}
    //         clientId={client.client.id}
    //         firstName={client.client.firstName}
    //         lastName={client.client.lastName}
    //         company={client.client.company}
    //         groupID={client.clientGroupID}
    //         clientGroupID={client.id}
    //         index={index}
    //         handleAddToRemove={handleAddToRemove}
    //       />
    //     ))}
    //   </ScrollView>
    // </View>
  );
}
