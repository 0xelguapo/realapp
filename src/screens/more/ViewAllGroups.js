import { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  SectionList,
} from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Group from "../../components/more/Group";
import useGroups from "../../hooks/groups-hook";
import ScreenHeading from "../../components/UI/ScreenHeading";

export default function ViewAllGroups({navigation}) {
  const {
    clientGroups,
    propertyGroups,
    handleAddClientGroup,
    handleAddPropertyGroup,
  } = useGroups();

  const [clientInputVisible, setClientInputVisible] = useState(false);
  const [clientGroupTitle, setClientGroupTitle] = useState("");
  const [propertyInputVisible, setPropertyInputVisible] = useState(false);
  const [propertyGroupTitle, setPropertyGroupTitle] = useState("");

  const handleViewClientGroup = (id, title) => {
    navigation.navigate("ViewOneGroup", {
      groupID: id,
      groupTitle: title,
    });
  };

  const renderClientGroup = useCallback(
    ({ item, index }) => (
      <View style={{ paddingHorizontal: 20 }}>
        <Group
          title={item.title}
          length={item.clients.items.length}
          onPress={() => handleViewClientGroup(item.id, item.title)}
          icon={
            <Ionicons name="ios-people-outline" size={12} color="#535353" />
          }
        />
      </View>
    ),
    []
  );

  const renderPropertyGroup = useCallback(({ item, index }) => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <Group
          title={item.title}
          length={item.properties.items.length}
          icon={
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              size={12} color="#535353"
            />
          }
        />
      </View>
    );
  }, []);

  const handleClientGroupSubmit = async () => {
    if (clientGroupTitle.length > 0) {
      handleAddClientGroup(title);
    }
    setClientGroupTitle("");
    setClientInputVisible(false);
  };

  const handlePropertyGroupSubmit = async () => {
    if (propertyGroupTitle.length > 0) {
      handleAddPropertyGroup(propertyGroupTitle);
    }
    setPropertyGroupTitle("");
    setPropertyInputVisible(false);
  };

  const DATA = [
    {
      data: clientGroups,
      renderItem: renderClientGroup,
      header: (
        <Header
          sectionTitle={"Client Groups"}
          buttonText={"Create a new client group"}
          toggleInputVisible={() =>
            setClientInputVisible((prevState) => !prevState)
          }
          inputVisible={clientInputVisible}
          title={clientGroupTitle}
          setTitle={setClientGroupTitle}
          handleSubmit={handleClientGroupSubmit}
        />
      ),
    },
    {
      data: propertyGroups,
      renderItem: renderPropertyGroup,
      header: (
        <Header
          sectionTitle={"Property Groups"}
          buttonText="Create a new property group"
          toggleInputVisible={() =>
            setPropertyInputVisible((prevState = !prevState))
          }
          inputVisible={propertyInputVisible}
          title={propertyGroupTitle}
          setTitle={setPropertyGroupTitle}
          handleSubmit={handlePropertyGroupSubmit}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeading screenTitle={"View Groups"} />
      <View style={styles.body}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ section: { renderItem } }) => (
            <View>{renderItem}</View>
          )}
          keyboardShouldPersistTaps="handled"
          renderSectionHeader={({ section: { header } }) => header}
        />
      </View>
    </View>
  );
}

function Header({
  sectionTitle,
  buttonText,
  inputVisible,
  toggleInputVisible,
  title,
  setTitle,
  handleSubmit,
}) {
  return (
    <>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{sectionTitle}</Text>
      </View>
      <View style={{ paddingHorizontal: 20, backgroundColor: "#f1f1f1" }}>
        <CreateGroupButton
          buttonText={buttonText}
          inputVisible={inputVisible}
          toggleInputVisible={toggleInputVisible}
        />
        {inputVisible && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              returnKeyType="done"
              onChangeText={setTitle}
              onSubmitEditing={handleSubmit}
              autoFocus={true}
              value={title}
            />
          </View>
        )}
      </View>
    </>
  );
}

function CreateGroupButton({ inputVisible, toggleInputVisible, buttonText }) {
  return (
    <TouchableOpacity style={styles.createButton} onPress={toggleInputVisible}>
      <Text style={styles.createButtonText}>{buttonText}</Text>
      {inputVisible ? (
        <AntDesign name="minus" size={24} color="black" />
      ) : (
        <Ionicons name="add" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  body: {
    paddingVertical: 10,
    flex: 1,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f1f1f1",
  },
  sectionHeaderText: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5,
    color: "#454545",
  },
  createButton: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    display: "flex",
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    borderColor: "#454545",
  },
  clientGroupsContainer: {},
});
