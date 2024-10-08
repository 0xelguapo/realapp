import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, selectAllTasks } from "../../redux/tasks-slice";
import { format } from "date-fns";
import HomeTask from "../../components/home/HomeTask";

let curDate = new Date();

export default function Overdue(props) {
  const { activeDate } = props.route.params;
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);

  const overdueTasks = allTasks
    .filter((task) => {
      if (task.date.length > 1 && !task.completed) {
        return (
          format(new Date(task.date), "L, d") <
          format(new Date(activeDate), "L, d")
        );
      } else if (task.date.length < 1 && !task.completed) {
        return true;
      }
    })
    .sort((a, b) => {
      if (b.date.length < 1) return 2;
      else return new Date(a.date) - new Date(b.date);
    });

  const handleCompleteTask = async (id, completed) => {
    const response = await dispatch(
      completeTask({ id, completed: !completed })
    ).unwrap();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={props.navigation.goBack}
        >
          <AntDesign name="left" size={24} color="#ababab" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Overdue</Text>
      </View>

      <ScrollView contentContainerStyle={[{ paddingBottom: 20 }]}>
        {overdueTasks.map((task, index) => (
          <HomeTask
            key={task.id}
            title={task.title}
            index={index}
            completed={task.completed}
            content={task.content}
            length={overdueTasks.length}
            date={task.date}
            onPress={() => handleCompleteTask(task.id, task.completed)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  backButtonContainer: { position: "absolute", left: 20 },
  screenTitle: {
    fontWeight: "500",
    fontSize: 20,
  },
  tasksContainer: {},
});
