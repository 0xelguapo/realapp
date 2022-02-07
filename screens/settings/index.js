import { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../context/auth-context";

export default function Settings() {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
