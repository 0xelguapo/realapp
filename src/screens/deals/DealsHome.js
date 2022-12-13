import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
  Animated,
} from "react-native";
import { useContext, useRef, useState } from "react";
import AddButton from "../../components/UI/AddButton";
import { MaterialIcons } from "@expo/vector-icons";
import useDeals from "../../hooks/deals-hook";
import DealsList from "../../components/deals/DealsList";
import { AuthContext } from "../../context/auth-context";

export default function DealsHome({ navigation }) {
  const { width } = useWindowDimensions();
  const { isProUser } = useContext(AuthContext);
  const [contentWidth, setContentWidth] = useState(1560);

  const { filteredDeals, lengthOfAllDeals } = useDeals();

  const barValue = useRef(new Animated.Value(0)).current;

  const viewAddDealHandler = () => {
    if (!isProUser && lengthOfAllDeals > 1) {
      navigation.navigate("Paywall");
    } else {
      navigation.navigate("AddEditDeal");
    }
  };

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
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: barValue } } }],
            { useNativeDriver: false }
          )}
          onContentSizeChange={(cw) => setContentWidth(cw)}
        >
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "green",
              height: 5,
              top: 60,
              width: 100,
              borderRadius: 10,
              transform: [
                {
                  translateX: barValue.interpolate({
                    inputRange: [
                      0,
                      contentWidth / 4,
                      contentWidth / 2,
                      contentWidth * 0.75,
                    ],
                    outputRange: [
                      0,
                      contentWidth / 4 + width / 4,
                      contentWidth / 2 + width / 2,
                      contentWidth * 0.75 + width - 100,
                    ],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Qualified</Text>
              <Text style={styles.dealTotalAmountText}>
                ${filteredDeals.Qualified.amount.toLocaleString()}
              </Text>
            </View>
            {filteredDeals.Qualified.data.length > 0 ? (
              <DealsList dealsData={filteredDeals.Qualified.data} />
            ) : (
              <View style={styles.emptyDealsContainer}>
                <Text style={styles.emptyDealsText}>
                  Start tracking your deals!
                </Text>
                <Text style={styles.emptySubtext}>Tap the '$' to add</Text>
              </View>
            )}
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>In Negotiations</Text>
              <Text style={styles.dealTotalAmountText}>
                ${filteredDeals.Negotiations.amount.toLocaleString()}
              </Text>
            </View>
            <DealsList dealsData={filteredDeals.Negotiations.data} />
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Under Contract</Text>
              <Text style={styles.dealTotalAmountText}>
                ${filteredDeals.Contract.amount.toLocaleString()}
              </Text>
            </View>
            <DealsList dealsData={filteredDeals.Contract.data} />
          </View>

          <View style={{ ...styles.dealsContainer, width: width }}>
            <View style={styles.dealHeadingContainer}>
              <Text style={styles.dealHeadingText}>Closed</Text>
              <Text style={styles.dealTotalAmountText}>
                ${filteredDeals.Closed.amount.toLocaleString()}
              </Text>
            </View>
            <DealsList dealsData={filteredDeals.Closed.data} />
          </View>
        </ScrollView>
      </View>

      <AddButton
        onPress={viewAddDealHandler}
        icon={<MaterialIcons name="attach-money" size={28} color="white" />}
        pro={lengthOfAllDeals > 1}
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
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
  },
  dealHeadingText: {
    fontWeight: "500",
  },
  dealTotalAmountText: {
    marginTop: 3,
    fontWeight: "500",
    color: "#6c6c6c",
  },
  emptyDealsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyDealsText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ababab",
  },
  emptySubtext: {
    fontWeight: "300",
    color: "#ababab",
  },
});
