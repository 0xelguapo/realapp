import { useState, useEffect, useCallback } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { Ionicons } from "@expo/vector-icons";
import EachTask from "../../components/EachTask";

export default function Tasks({ navigation }) {
  const [tasksArray, setTasksArray] = useState([]);

  const fetchTasks = async () => {
    let response;
    try {
      response = await API.graphql({ query: queries.listTasks });
    } catch (err) {
      console.log("error fetching tasks", err);
    }
    console.log(response.data.listTasks.items);
    setTasksArray(response.data.listTasks.items);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTask = useCallback(({ item }) => <EachTask title={item.title} content={item.content} />, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tasks</Text>
        </View>
        <View style={styles.addIconContainer}>
          <View style={styles.addIconBackground}></View>
          <Ionicons
            name="md-add-circle"
            size={50}
            color="#0064e5"
            onPress={() => navigation.navigate("AddTask")}
          />
        </View>
      </View>
      <FlatList
        data={tasksArray}
        renderItem={renderTask}
        keyExtractor={(t) => t.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headerContainer: {
    flex: 0.15,
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#212121",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9e9e9",
  },
  addIconBackground: {
    position: "absolute",
    top: 15,
    right: 15,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "#e9e9e9",
  },
});
