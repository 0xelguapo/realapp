import { View, Text, StyleSheet } from "react-native";
import BlockHeading from "./BlockHeading";

export default function DetailsContact({ clientDetailsState }) {

  console.log(clientDetailsState);
  return (
    <View style={styles.container}>
      <BlockHeading title={"PHONE NUMBERS"} />
      <View style={styles.detailsContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>{clientDetailsState.phone}</Text>
        </View>
      </View>
    <BlockHeading title="EMAILS" />
    <View style={styles.detailsContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{clientDetailsState.email}</Text>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontWeight: '500'
  }
});
