import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import AddButton from "../../components/UI/AddButton";
import { MaterialIcons } from "@expo/vector-icons";
import useDeals from "../../hooks/deals-hook";

const DATA = [
  {
    id: "129124123",
    title: "Property Address",
    amount: "$12912312",
    stage: "qualified",
  },
];

export default function DealsHome({ navigation }) {
  const { width } = useWindowDimensions();
  const [contentWidth, setContentWidth] = useState(1560);

  const { allDeals, qualifiedDeals } = useDeals()

  console.log(qualifiedDeals)

  const barValue = useRef(new Animated.Value(0)).current;

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
                      contentWidth / 4 + width/4,
                      contentWidth / 2 + width/2,
                      contentWidth * 0.75 + width-100,
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
