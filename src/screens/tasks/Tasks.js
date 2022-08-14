import { useCallback, useContext } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { TaskContext } from "../../context/task-context";
import { Ionicons } from "@expo/vector-icons";
import EachTask from "../../components/EachTask";
import SuccessMessage from "../../components/SuccessMessage";

export default function Tasks({ navigation }) {
  const { isLoading, tasksArray, successStatus, fetchTasks } =
    useContext(TaskContext);

  const renderTask = useCallback(
    ({ item }) => (
      <EachTask id={item.id} title={item.title} content={item.content} />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <View style={styles.addIconContainer}>
          <View style={styles.addIconBackground}></View>
          <Ionicons
            name="md-add-circle"
            size={40}
            color="#0064e5"
            onPress={() => navigation.navigate("AddTask")}
          />
        </View>
      </View>
      {successStatus && <SuccessMessage>Task Created</SuccessMessage>}
      <View style={styles.listContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={tasksArray}
            renderItem={renderTask}
            keyExtractor={(t) => t.id}
            onRefresh={fetchTasks}
            refreshing={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headerContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#454545",
  },
  addIconBackground: {
    position: "absolute",
    top: 15,
    right: 15,
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: "#e9e9e9",
  },
  listContainer: {
    flex: 0.85,
    paddingHorizontal: 15,
  },
});
