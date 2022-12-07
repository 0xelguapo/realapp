import { StyleSheet, Alert } from "react-native";
import EachClient from "../../components/client/EachClient";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGroupById,
  deleteGroup,
  removeMultipleClientsFromGroup,
} from "../../redux/groups-slice";
import OneGroupView from "../../components/UI/OneGroupView";
import * as MailComposer from "expo-mail-composer";

export default function ViewOneGroup(props) {
  const { groupID } = props.route.params;
  const dispatch = useDispatch();
  const thisGroup = useSelector((state) => selectGroupById(state, groupID));

  const handleViewClient = (client) => {
    props.navigation.goBack();
    props.navigation.navigate("ClientDetails", {
      client: client,
      groupMode: true,
    });
  };

  const handleEditGroup = () => {
    props.navigation.navigate("EditClientsOfGroup", {
      groupID: groupID,
      groupTitle: thisGroup.title,
    });
  };

  const handleDeleteGroup = () => {
    Alert.alert(
      "Are you sure you want to delete this group? This action cannot be undone",
      null,
      [
        { text: "Cancel", style: "default" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (thisGroup.clients.items.length === 0) {
              props.navigation.goBack();
              dispatch(deleteGroup(groupID));
            } else {
              const allClientsToBeRemoved = thisGroup.clients.items.map(
                (el) => el.id
              );
              props.navigation.goBack();
              dispatch(
                removeMultipleClientsFromGroup({
                  removeIDs: allClientsToBeRemoved,
                  groupID: groupID,
                })
              ).then(() => dispatch(deleteGroup(groupID)));
            }
          },
        },
      ]
    );
  };

  const handleEmail = async () => {
    let canCompose;
    let sendEmail;
    try {
      canCompose = await MailComposer.isAvailableAsync();
    } catch (err) {
      console.error(err);
    }

    if (canCompose) {
      const clientEmails = thisGroup.clients.items.reduce(
        (acc, el) => {
          let emails;
          if (el.client.email?.length > 0) {
            emails = el.client.email.split(",");
            acc.recipients.push(emails[0]);
            acc.ccs.push(...emails.slice(1));
          }
          return acc;
        },
        { recipients: [], ccs: [] }
      );
      try {
        sendEmail = await MailComposer.composeAsync({
          bccRecipients: clientEmails.recipients,
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (sendEmail.status === "sent") {
      const clientIdsArray = thisGroup.clients.items.map((el) => el.client.id);
      props.navigation.navigate("AddConnectionHistory", {
        clientId: null,
        groupMode: true,
        clientIdsArray: clientIdsArray,
      });
    }
  };

  return (
    <OneGroupView
      title={thisGroup.title}
      length={thisGroup.clients.items.length}
      handleDelete={handleDeleteGroup}
      handleEdit={handleEditGroup}
      clientMode={true}
      handleEmail={handleEmail}
    >
      {thisGroup.clients.items.map((client, index) => (
        <EachClient
          taskMode={true}
          key={client.client.id + index}
          phone={client.client.phone}
          firstName={client.client.firstName}
          lastName={client.client.lastName}
          company={client.client.company}
          onPress={() => handleViewClient(client.client)}
        />
      ))}
    </OneGroupView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ababab",
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
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#454545",
    marginBottom: 5,
  },
  editContainer: {
    flexDirection: "row",
    height: 65,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  editButton: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  clientGroupDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 22,
  },
  clientGroupTitle: {
    fontWeight: "600",
    marginBottom: 3,
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
  clientsContainer: {
    paddingHorizontal: 20,
  },
});
