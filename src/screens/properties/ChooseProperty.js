import { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChooseContext } from "../../context/choose-context";
import { useNavigation } from "@react-navigation/native";
import {
  fetchOneProperty,
  fetchProperties,
  selectAllProperties,
} from "../../redux/properties-slice";
import { fetchClients, selectClientById } from "../../redux/clients-slice";
import PropertiesList from "../../components/property/PropertiesList";

export default function ChooseProperty() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const { setSelectedProperty, setSelectedClient } = useContext(ChooseContext);
  const clients = useSelector((state) => state.clients.entities);
  const clientStatus = useSelector((state) => state.clients.status);

  const dispatch = useDispatch();
  const allProperties = useSelector(selectAllProperties);
  const status = useSelector((state) => state.properties.status);

  const filteredData = useMemo(() => {
    return allProperties.filter((el) => {
      const textData = searchInput.toLowerCase();
      const propertyName =
        el.street + " " + el.city + " " + el.state + " " + el.zip;
      const propertyData = propertyName.toLowerCase();
      return propertyData.indexOf(textData) > -1;
    });
  }, [searchInput, allProperties]);

  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchProperties());
    }
    if (clientStatus !== "succeeded") {
      dispatch(fetchClients());
    }
  }, []);

  const handleSelectProperty = async (item) => {
    setSelectedProperty(item);
    const response = await dispatch(fetchOneProperty(item.id)).unwrap();
    if (response && response?.clientId) {
      setSelectedClient(clients[response.clientId]);
    }
    navigation.goBack();
  };

  return (
    <PropertiesList
      handleGoBack={navigation.goBack}
      handleSelectProperty={handleSelectProperty}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      filteredData={filteredData}
      status={status}
    />
  );
}
