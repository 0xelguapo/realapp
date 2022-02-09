import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import EachClient from "../../components/EachClient";

const DATA = [
  {
    name: 'Harrison Owen',
    company: 'Dark Skins United',
    phone: '13109221824',
  },
  {
    name: 'Jackson Trinidad',
    company: 'Michael Skins United',
    phone: '3109221824',
  },
  {
    name: 'MoneyMan Krabs',
    company: 'Crab Skins United',
    phone: '3109221824',
  },
  {
    name: 'Harrison Owen',
    company: 'Dark Skins United',
    phone: '3109221824',
  },
  {
    name: 'Jackson Trinidad',
    company: 'Michael Skins United',
    phone: '3109221824',
  },
  {
    name: 'MoneyMan Krabs',
    company: 'Crab Skins United',
    phone: '3109221824',
  },
  {
    name: 'Harrison Owen',
    company: 'Dark Skins United',
    phone: '3109221824',
  },
  {
    name: 'Jackson Trinidad',
    company: 'Michael Skins United',
    phone: '3109221824',
  },
  {
    name: 'MoneyMan Krabs',
    company: 'Crab Skins United',
    phone: '3109221824',
  },
  {
    name: 'Harrison Owen',
    company: 'Dark Skins United',
    phone: '3109221824',
  },
  {
    name: 'Jackson Trinidad',
    company: 'Michael Skins United',
    phone: '3109221824',
  },
  {
    name: 'MoneyMan Krabs',
    company: 'Crab Skins United',
    phone: '3109221824',
  },
]

export default function Clients({ navigation }) {
  const [clientsArray, setClientsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllClients = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    setClientsArray(response.data.listClients.items);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   getAllClients();
  // }, []);

  const renderClient = ({ item }) => (
    <EachClient name={item.name} phone={item.phone} company={item.company} />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Add Client"
        onPress={() => navigation.navigate("AddClient")}
      />
      <FlatList
        data={DATA}
        renderItem={renderClient}
        keyExtractor={(c) => c.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: '9%',
    backgroundColor: 'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
