import { useWindowDimensions, Dimensions, Alert } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { ChooseContext } from "../../context/choose-context";
import { addDeal, editDeal } from "../../redux/deals-slice";
import { SuccessContext } from "../../context/success-context";
import AddEditDealModal from "../../components/deals/AddEditDealModal";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AddEditDeal({ navigation, route }) {
  let deal = null;
  if (route.params?.deal) {
    deal = route.params.deal;
  }

  const dispatch = useDispatch();
  const {
    selectedClient,
    setSelectedClient,
    selectedProperty,
    setSelectedProperty,
  } = useContext(ChooseContext);

  const { onStatusChange } = useContext(SuccessContext);

  const [selectedStage, setSelectedStage] = useState(
    deal?.stage || "Qualified"
  );

  const [dealTitle, setDealTitle] = useState(deal?.title || "");
  const [amount, setAmount] = useState(deal?.amount || "");
  const [note, setNote] = useState(deal?.note || "");
  const [contentOffset, setContentOffset] = useState(0);

  useEffect(() => {
    const clearSelected = navigation.addListener("beforeRemove", (e) => {
      setSelectedClient(null);
      setSelectedProperty(null);
    });
    return clearSelected;
  }, [navigation]);

  useEffect(() => {
    if (deal && deal?.client) {
      setSelectedClient(deal.client);
    }
    if (deal && deal?.property) {
      setSelectedProperty(deal.property);
    }
  }, []);

  useEffect(() => {
    if (deal) {
      if (deal.stage == "Negotiations") setContentOffset(SCREEN_WIDTH / 2);
      else if (deal.stage == "Contract") setContentOffset(SCREEN_WIDTH);
      else if (deal.stage == "Closed") setContentOffset(SCREEN_WIDTH + 50);
    }
  }, []);

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

  const handleSubmitDeal = async () => {
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
      note: note
    };

    let response;
    if (!deal) {
      response = await dispatch(addDeal(dealDetails)).unwrap();
      if (response) {
        onStatusChange("DEAL CREATED");
      }
    } else {
      response = await dispatch(
        editDeal({ id: deal.id, ...dealDetails })
      ).unwrap();
      if (response) {
        onStatusChange("DEAL EDITED");
      }
    }
    navigation.goBack();
  };

  return (
    <AddEditDealModal
      screenTitle={deal ? "Edit Deal" : "New Deal"}
      selectedClient={selectedClient}
      selectedProperty={selectedProperty}
      dealTitle={dealTitle}
      setDealTitle={setDealTitle}
      amount={amount}
      setAmount={setAmount}
      note={note}
      setNote={setNote}
      handlePickStage={handlePickStage}
      handleSubmit={handleSubmitDeal}
      contentOffset={contentOffset}
    />
  );
}
