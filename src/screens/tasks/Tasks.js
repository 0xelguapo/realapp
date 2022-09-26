import { useCallback, useContext } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { TaskContext } from "../../context/task-context";
import { Entypo } from "@expo/vector-icons";
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tasks</Text>
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
      <Pressable
        style={styles.addIconContainer}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Entypo name="add-to-list" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingTop: 30,
  },
  headerContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#454545",
  },
  addIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 30,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#0064e5",
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  listContainer: {
    flex: 0.85,
    paddingHorizontal: 15,
  },
});
