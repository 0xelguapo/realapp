import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTask, fetchTasks, selectAllTasks } from "../redux/tasks-slice";
import { format } from "date-fns";

function useTasks(activeDate) {
  let date = new Date();
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const tasksOfDate = allTasks
    .filter((task) => {
      if (task.date.length > 1) {
        return (
          format(new Date(task.date), "L, d") === format(activeDate, "L, d")
        );
      } else if (task.date.length < 1) {
        return true;
      }
    })
    .sort((a, b) => {
      if (b.date.length < 1) return 2;
      else return new Date(a.date) - new Date(b.date);
    });

  const lengthOfCompletedTasks = tasksOfDate.reduce(
    (acc, el) => {
      if (el.completed) acc++;
      return acc;
    },
    [0]
  );

  const lengthOfOverdueTasks = allTasks.reduce(
    (acc, el) => {
      if (
        format(new Date(el.date), "L, d") <
          format(new Date(activeDate), "L, d") &&
        !el.completed
      )
        acc++;
      return acc;
    },
    [0]
  );

  const handleCompleteTask = async (id, completed) => {
    const response = await dispatch(
      completeTask({ id, completed: !completed })
    ).unwrap();
    return response;
  };

  return {
    allTasks,
    tasksOfDate,
    lengthOfCompletedTasks,
    lengthOfOverdueTasks,
    handleCompleteTask,
  };
}

export default useTasks;
