import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Deal from "./Deal";

export default function DealsList({ width, dealsData }) {
  const navigation = useNavigation();

  const handleViewEditDeal = (deal) => {
    navigation.navigate("AddEditDeal", { deal });
  };

  return (
    <ScrollView
      style={{ width: width }}
      contentContainerStyle={[{ flex: 1, paddingTop: 10 }]}
    >
      {dealsData.map((deal, index) => (
        <Deal deal={deal} onPress={() => handleViewEditDeal(deal)} key={deal.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
