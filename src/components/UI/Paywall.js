import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import Purchases from "react-native-purchases";
import PackageItem from "../purchase/PackageItem";

// remove go back after setting up payments

export default function Paywall(props) {
  const [showMonthly, setShowMonthly] = useState(false);
  const [packages, setPackages] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null)

  const handlePurchase = () => {
    console.log(currentPackage)
  }


  const renderYearly = useCallback(({ item, index }) => {
    if (item.packageType === "ANNUAL") {
      return (
        <PackageItem
          monthly={false}
          purchasePackage={item}
          setIsPurchasing={setIsPurchasing}
          setCurrentPackage={setCurrentPackage}
        />
      );
    }
  }, []);

  const renderMonthly = useCallback(({ item, index }) => {
    if (item.packageType === "MONTHLY") {
      return (
        <PackageItem
          monthly={true}
          purchasePackage={item}
          setIsPurchasing={setIsPurchasing}
          setCurrentPackage={setCurrentPackage}
        />
      );
    }
  }, []);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          setPackages(offerings.current.availablePackages);
          // console.log(offerings.current.availablePackages);
        }
      } catch (e) {
        Alert.alert("Error getting offers", e.message);
      }
    };

    getPackages();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => props.navigation.goBack()}
      >
        <Feather name="x" size={24} color="#6f6f6f" />
      </TouchableOpacity>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Build Better Relationships with CoAgent
        </Text>
        <View style={styles.monthlyContainer}>
          <Pressable
            style={[
              showMonthly
                ? styles.monthToggleButton
                : { ...styles.monthToggleButton, backgroundColor: "#84bfff" },
            ]}
            onPress={() => setShowMonthly(false)}
          >
            <Text style={styles.monthlyText}>Yearly (Discount)</Text>
          </Pressable>
          <Pressable
            style={[
              showMonthly
                ? { ...styles.monthToggleButton, backgroundColor: "#84bfff" }
                : styles.monthToggleButton,
            ]}
            onPress={() => setShowMonthly(true)}
          >
            <Text style={styles.monthlyText}>Monthly</Text>
          </Pressable>
        </View>
      </View>
      {showMonthly ? (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.identifier}
          renderItem={renderMonthly}
        />
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.identifier}
          renderItem={renderYearly}
        />
      )}

      {/* <ScrollView style={styles.bodyContainer}>
        <PackageItem monthly={showMonthly} />
      </ScrollView> */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Try it free</Text>
        </TouchableOpacity>
        <Text style={styles.subtext}>7-day free trial, cancel anytime.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#101010",
  },
  exitButton: {
    position: "absolute",
    right: 30,
    top: 50,
    zIndex: 2,
  },
  headingContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headingText: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "700",
  },
  checkMark: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  monthlyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  monthToggleButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    width: 160,
    borderRadius: 10,
  },
  monthlyText: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  offerTitleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  offerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  bestValueContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#84bfff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bestValueText: {
    fontWeight: "500",
  },
  priceContainer: {},
  strikeThroughContainer: {
    flexDirection: "row",
  },
  strikeThroughText: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "line-through",
    textDecorationColor: "white",
    fontWeight: "500",
  },
  saveText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 16,
    color: "#84bfff",
  },
  priceText: {
    marginTop: 5,
    paddingVertical: 5,
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  subtext: {
    color: "#d0d0d0",
    fontWeight: "700",
  },
  allBulletsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  bulletContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  bulletCircle: {
    width: 5,
    height: 5,
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 10,
  },
  bulletText: {
    color: "white",
    fontSize: 16,
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "25%",
    paddingBottom: 30,
    backgroundColor: "0f0f0f",
    shadowRadius: 4,
    shadowColor: "rgba(188, 188, 188, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  ctaButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "black",
    fontWeight: "700",
  },
});
