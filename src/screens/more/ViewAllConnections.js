import { useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import ConnectionHistory from "../../components/more/ConnectionHistory";
import ScreenHeading from "../../components/UI/ScreenHeading";
import useConnections from "../../hooks/connections-hook";

export default function ViewAllConnections(props) {
  const { allConnections } = useConnections();
  console.log(allConnections);

  const renderConnection = useCallback(({ item, index }) => {
    return (
      <ConnectionHistory
        date={item.date}
        client={item.client}
        title={item.title}
        content={item.content}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeading
        handleGoBack={props.navigation.goBack}
        screenTitle="All Connection Logs"
      />
      <FlatList data={allConnections} renderItem={renderConnection} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
