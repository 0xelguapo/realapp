import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect, useRef, useState, useContext } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { ChooseContext } from "../../context/choose-context";
import { addDeal } from "../../redux/deals-slice";
import { SuccessContext } from "../../context/success-context";

const STAGE_TYPES = [
  "QUALIFIED",
  "IN NEGOTIATIONS",
  "UNDER CONTRACT",
  "CLOSED",
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AddDeal({ navigation }) {
  const dispatch = useDispatch();
  const {
    selectedClient,
    setSelectedClient,
    selectedProperty,
    setSelectedProperty,
  } = useContext(ChooseContext);

  const {onStatusChange } = useContext(SuccessContext)

  const { width } = useWindowDimensions();
  const [selectedStage, setSelectedStage] = useState("Qualified");

  const [dealTitle, setDealTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const clearSelected = navigation.addListener("beforeRemove", (e) => {
      setSelectedClient(null);
      setSelectedProperty(null);
    });
    return clearSelected;
  }, [navigation]);

  const handlePickStage = (e) => {
    const { x: xPosition } = e.nativeEvent.contentOffset;
    if (xPosition < SCREEN_WIDTH / 2) setSelectedStage("Qualified");
    else if (xPosition >= SCREEN_WIDTH / 2 && xPosition < SCREEN_WIDTH) {
      setSelectedStage("Negotiations");
    } else if (xPosition >= SCREEN_WIDTH && xPosition < SCREEN_WIDTH + 40) {
      setSelectedStage("Contract");
    } else if (xPosition > SCREEN_WIDTH + 50) {
      setSelectedStage("Closed");
    }
  };

  const handleCreateDeal = async () => {
    if (!selectedClient && !selectedProperty) {
      Alert.alert("Please add a client or a property");
      return;
    }
    let dealDetails = {
      title:
        dealTitle.length > 0
          ? dealTitle
          : selectedProperty?.id
          ? selectedProperty.street
          : selectedClient.firstName + " " + selectedClient?.lastName,
      amount: amount,
      stage: selectedStage,
      clientId: (selectedClient?.id && selectedClient.id) || null,
      propertyId: (selectedProperty?.id && selectedProperty.id) || null,
    };
    const response = await dispatch(addDeal(dealDetails)).unwrap();
    if(response) {
      onStatusChange('DEAL CREATED')
      navigation.goBack()
    }
  };

  function StickyHeader() {
    return (
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>New Deal</Text>
        <TouchableOpacity onPress={handleCreateDeal}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      keyboardShouldPersistTaps="handled"
    >
      {<StickyHeader />}
      <View style={styles.inputsContainer}>
        <TouchableOpacity
          style={styles.addAnotherButton}
          onPress={() => navigation.navigate("ChooseClient")}
        >
          {!selectedClient ? (
            <>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color="#026bff" />
              </View>
              <Text style={styles.addOwnershipText}>Choose Client</Text>
            </>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={20} color="#026bff" />
              </View>
              <Text style={styles.addOwnershipText}>
                {selectedClient.firstName + " " + selectedClient?.lastName}
              </Text>
              <TouchableOpacity style={styles.removeSelectedButton} onPress={() => setSelectedClient(null)}>
                <AntDesign name="closecircle" size={18} color="#6B7280" />
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addAnotherButton}
          onPress={() => navigation.navigate("ChooseProperty")}
        >
          {!selectedProperty ? (
            <>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="city-variant-outline"
                  size={20}
                  color="#026bff"
                />
              </View>
              <Text style={styles.addOwnershipText}>Choose Property</Text>
            </>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="city-variant-outline"
                  size={20}
                  color="#026bff"
                />
              </View>
              <Text style={styles.addOwnershipText}>
                {selectedProperty.street +
                  ". " +
                  selectedProperty.city +
                  ", " +
                  selectedProperty.state +
                  " " +
                  selectedProperty.zip}
              </Text>
              <TouchableOpacity style={styles.removeSelectedButton} onPress={() => setSelectedProperty(null)}>
                <AntDesign name="closecircle" size={18} color="#6B7280" />
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <MaterialIcons
            name="drive-file-rename-outline"
            size={20}
            color="black"
          />
          <TextInput
            style={styles.textInput}
            placeholder={
              selectedProperty?.id
                ? selectedProperty.street
                : selectedClient?.id
                ? selectedClient.firstName + " " + selectedClient?.lastName
                : "Title"
            }
            placeholderTextColor="#757575"
            defaultValue={dealTitle}
            onChangeText={setDealTitle}
          />
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Feather name="dollar-sign" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder={"Commission Amount"}
              placeholderTextColor="#757575"
              defaultValue={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={styles.stageHeadingContainer}>
          <Text style={styles.stageHeadingText}>Stage</Text>
        </View>
        <View style={styles.stageContainer}>
          <View style={styles.stageOpacityCover} />
          <View style={styles.triangle} />

          <ScrollView
            snapToInterval={SCREEN_WIDTH / 2}
            pagingEnabled={true}
            decelerationRate={"fast"}
            horizontal={true}
            onMomentumScrollEnd={handlePickStage}
            contentContainerStyle={[
              {
                alignItems: "center",
                paddingHorizontal: SCREEN_WIDTH / 4,
              },
            ]}
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "darkgreen", height: "90%" }}
          >
            {STAGE_TYPES.map((type, index) => (
              <View
                key={index}
                style={{ width: SCREEN_WIDTH / 2, alignItems: "center" }}
              >
                <Text style={{ color: "white" }}>{type}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={120}
        >
          <View style={styles.addNoteContainer}>
            <Text style={styles.addNoteHeader}>Add a note</Text>
            <TextInput
              style={styles.addNoteInput}
              value={note}
              onChangeText={setNote}
              multiline={true}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: "#f6f6f6",
  },
  headingContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0064e5",
  },
  keyboardAvoiding: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 25,
  },
  inputsContainer: {
    paddingVertical: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "#e6e6e6",
    borderWidth: 0.2,
    height: 40,
  },
  textInput: {
    borderColor: "#dcdcdc",
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 16,
    height: "90%",
  },

  removeSelectedButton: {
    position: "absolute",
    right: "5%",
    zIndex: 3,
  },

  stageContainer: {
    height: 50,
  },
  stageHeadingContainer: {
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  stageHeadingText: {
    fontSize: 16,
    color: "#757575",
  },
  triangle: {
    position: "absolute",
    height: 12,
    zIndex: 5,
    right: SCREEN_WIDTH / 2 - 5,
    borderLeftWidth: 12,
    borderTopWidth: 12,
    borderRightWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#f9f9f9",
  },
  stageOpacityCover: {
    height: "100%",
    width: SCREEN_WIDTH / 3.5,
    backgroundColor: "darkgreen",
    opacity: 0.8,
    position: "absolute",
    zIndex: 2,
  },

  addNoteContainer: {
    paddingVertical: 20,
    height: 150,
  },
  addNoteHeader: {
    fontWeight: "500",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  addNoteInput: {
    borderColor: "#dcdcdc",
    backgroundColor: "white",
    paddingLeft: 20,
    flex: 1,
    fontSize: 16,
    height: 50,
  },
  addAnotherButton: {
    height: 40,
    backgroundColor: "white",
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    paddingLeft: 10,
  },
  addOwnershipText: {
    fontWeight: "500",
    color: "#026bff",
  },

  selectedClientNameContainer: {
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#0064e5",
  },
  selectedClientName: {
    fontWeight: "700",
  },
});
