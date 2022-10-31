import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function PackageItem({
  monthly,
  purchasePackage,
  setCurrentPackage
}) {

  useEffect(() => {
    setCurrentPackage(purchasePackage)
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.offerContainer}>
        <View style={styles.offerTitleContainer}>
          <Text style={styles.offerTitle}>CoAgent Pro</Text>
          <View style={styles.bestValueContainer}>
            <Text style={styles.bestValueText}>
              {monthly ? "Pay as you go" : "Best Value"}
            </Text>
          </View>
          <View style={styles.checkMark}>
            <Ionicons name="checkmark-circle" size={40} color="#454545" />
          </View>
        </View>
        <View style={styles.priceContainer}>
          {!monthly && (
            <View style={styles.strikeThroughContainer}>
              <Text style={styles.strikeThroughText}>$24.99 USD</Text>
              <Text style={styles.saveText}>(Save $50/year)</Text>
            </View>
          )}
          <Text style={styles.priceText}>
            {monthly
              ? purchasePackage.product.priceString
              : "$" + Math.max(purchasePackage.product.price / 12).toFixed(2)}
          </Text>
          <Text style={styles.subtext}>
            {monthly
              ? "Per month, billed monthly"
              : "Per month, billed annually"}
          </Text>
        </View>
        <View style={styles.allBulletsContainer}>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Unlimited contacts and properties
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Lead, calendar, and relationship management
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Easy data import from excel or .csv
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Reminders, to-dos, notifications, all in one place
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Customize properties and contacts into categories
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Live customer support by phone, email, or video
            </Text>
          </View>
          <View style={styles.bulletContainer}>
            <View style={styles.bulletCircle} />
            <Text style={styles.bulletText}>
              Early access to cross-platform web app
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  checkMark: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  offerContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#454545",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  offerTitleContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  offerTitle: {
    color: "#454545",
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
    color: "#6c6c6c",
    fontSize: 16,
    textDecorationLine: "line-through",
    textDecorationColor: "#454545",
    fontWeight: "500",
  },
  saveText: {
    color: "#454545",
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 16,
    color: "#84bfff",
  },
  priceText: {
    marginTop: 5,
    paddingVertical: 3,
    fontSize: 24,
    fontWeight: "700",
    color: "#454545",
  },
  subtext: {
    color: "#6c6c6c",
    fontWeight: "700",
    fontSize: 21
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
    backgroundColor: "#454545",
    borderRadius: 50,
    marginRight: 10,
  },
  bulletText: {
    color: "#454545",
    fontSize: 16,
  },
});
