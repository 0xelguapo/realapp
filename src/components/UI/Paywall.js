import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as Linking from "expo-linking";
import Purchases from "react-native-purchases";
import PackageItem from "../purchase/PackageItem";
import { ENTITLEMENT_ID } from "../../constants";
import { useNavigation } from "@react-navigation/native";

// remove go back after setting up payments

const TermsOfUse = () => {
  const navigation = useNavigation();
  const restorePurchase = async () => {
    let restoreResponse;
    try {
      restoreResponse = await Purchases.restorePurchases();
    } catch (err) {
      Alert.alert(
        "Error restoring purchases, please contact us at https://coagent.co/contact"
      );
      console.error(err);
    }
    if (restoreResponse.entitlements.active[ENTITLEMENT_ID] !== "undefined") {
      navigation.navigate("HomeScreen");
    }
  };
  return (
    <>
      <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
          onPress={restorePurchase}
        >
          <Text style={{ color: "black", fontWeight: "700" }}>
            Restore Purchases
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 10,
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Text
          style={{ color: "#454545", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("https://coagent.co/terms-of-use")}
        >
          Terms of Use
        </Text>
        <Text
          style={{ color: "#454545", textDecorationLine: "underline" }}
          onPress={() => Linking.openURL("https://coagent.co/privacy-policy")}
        >
          Privacy Policy
        </Text>
      </View>
    </>
  );
};

export default function Paywall(props) {
  const [showMonthly, setShowMonthly] = useState(false);
  const [packages, setPackages] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    try {
      const { customerInfo, productIdentifier } =
        await Purchases.purchasePackage(currentPackage);
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"
      ) {
        props.navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.error(e);
      }
    } finally {
      setIsPurchasing(false);
    }
  };

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
        }
      } catch (e) {
        Alert.alert("Error getting offers", e.message);
      }
    };
    getPackages();
  }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.exitButton}
        onPress={() => props.navigation.goBack()}
      >
        <Feather name="x" size={24} color="#6f6f6f" />
      </TouchableOpacity> */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Build Better Relationships with CoAgent
        </Text>
        <View style={styles.monthlyContainer}>
          <Pressable
            style={[
              showMonthly
                ? styles.monthToggleButton
                : { ...styles.monthToggleButton, backgroundColor: "#0064e5" },
            ]}
            onPress={() => setShowMonthly(false)}
          >
            <Text style={styles.monthlyText}>Yearly (Discount)</Text>
          </Pressable>
          <Pressable
            style={[
              showMonthly
                ? { ...styles.monthToggleButton, backgroundColor: "#0064e5" }
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
          ListFooterComponent={<TermsOfUse />}
        />
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.identifier}
          renderItem={renderYearly}
          ListFooterComponent={<TermsOfUse />}
        />
      )}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handlePurchase}>
          <Text style={styles.buttonText}>Try it free</Text>
        </TouchableOpacity>
        <Text style={styles.subtext}>3-day free trial, cancel anytime.</Text>
      </View>
      {isPurchasing && <View style={styles.overlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f6f6f6",
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
    color: "black",
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
    backgroundColor: "black",
    paddingVertical: 10,
    width: 160,
    borderRadius: 10,
  },
  monthlyText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
    backgroundColor: "black",
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontWeight: "700",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    backgroundColor: "black",
  },
});
