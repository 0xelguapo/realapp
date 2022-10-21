import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Paywall(props) {
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
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.offerContainer}>
          <View style={styles.offerTitleContainer}>
            <Text style={styles.offerTitle}>CoAgent Pro</Text>
            <View style={styles.bestValueContainer}>
              <Text style={styles.bestValueText}>Best Value</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  offerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    height: "90%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  offerTitleContainer: {
    flexDirection: "row",
  },
  offerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  bestValueContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#84bfff',
    paddingHorizontal: 10,
    borderRadius: 5
  },
  bestValueText: {
    fontWeight: '500'
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "25%",
    paddingBottom: 50,
    backgroundColor: "0f0f0f",
    shadowRadius: 4,
    shadowColor: "rgba(188, 188, 188, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  continueButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 25,
    color: "black",
    fontWeight: "700",
  },
});
