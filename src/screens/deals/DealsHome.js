import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import AddButton from "../../components/UI/AddButton";
import { MaterialIcons } from "@expo/vector-icons";

const DATA = [
  {
    id: "129124123",
    title: "Property Address",
    amount: "$12912312",
    stage: "qualified",
  },
];

export default function DealsHome({ navigation }) {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Deals</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView
          horizontal={true}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
        >
          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Qualified</Text>
            </View>
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>In Negotiations</Text>
            </View>
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Under Contract</Text>
            </View>
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Closed</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <AddButton
        onPress={() => navigation.navigate("AddDeal")}
        icon={<MaterialIcons name="attach-money" size={28} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 3,
    paddingTop: 55,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  bodyContainer: {
    flex: 1,
  },
  dealsContainer: {},
  dealHeadingContainer: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: "#efefef",
    justifyContent: "center",
  },
  dealHeadingText: {
    fontWeight: "500",
  },
});
