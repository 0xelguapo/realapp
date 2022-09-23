import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { GroupsContext } from "../../context/group-context";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import EditingClient from "../../components/more/EditingClient";
import { useDispatch } from "react-redux";
import { editGroupName } from "../../redux/group-slice";

export default function EditClientsOfGroup(props) {
  const { clientsOfGroup } = useContext(GroupsContext);
  const { groupID, groupTitle } = props.route.params;
  const [groupTitleInput, setGroupTitleInput] = useState(groupTitle);
  const dispatch = useDispatch();

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
          <TouchableOpacity onPress={props.navigation.goBack}>
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
          {clientsOfGroup.length} CONTACTS
        </Text>
      </View>
      <ScrollView
        style={styles.groupMembersContainer}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {clientsOfGroup.map((client) => (
          <EditingClient
            key={client.client.id}
            name={client.client.name}
            company={client.client.company}
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
