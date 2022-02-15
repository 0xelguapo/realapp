import { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TaskContext } from "../../context/task-context";
import { ClientsContext } from "../../context/client-context";

export default function Home() {
  const { tasksArray } = useContext(TaskContext);
  const { clientsArray } = useContext(ClientsContext);

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.headerTasks}>Upcoming Tasks</Text>
          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.08,
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 30,
    color: "#212121",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTasks: {
    fontSize:18,
    fontWeight: "600",
    color: "#7b7b7c"
  },
//   tasksContainer: {
//     flex: 0.3,
//     marginTop: 10,
//     width: "90%",
//     backgroundColor: "white",
//     borderRadius: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   tasksHeader: {
//     flex: 0.25,
//     borderBottomWidth: 1,
//     borderBottomColor: "#dddddf",
//     justifyContent: "center",
//   },
//   tasksTitle: {
//     fontWeight: "600",
//     fontSize: 18,
//   },
});
