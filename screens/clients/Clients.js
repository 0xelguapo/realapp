import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
} from "react-native";

export default function Clients({ navigation }) {
  return (
    <View>
      <Button
        title="Add Client"
        onPress={() => navigation.navigate("AddClient")}
      />
      <Text>Clients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});
