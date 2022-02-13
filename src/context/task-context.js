import { createContext, useState, useEffect } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

const TaskContext = createContext();

function TaskContextProvider({ children }) {
  const [tasksArray, setTasksArray] = useState([]);

  const fetchTasks = async () => {
    let response;
    try {
      response = await API.graphql({ query: queries.listTasks });
    } catch (err) {
      console.log("error fetching tasks", err);
    }
    setTasksArray(response.data.listTasks.items);
  };

  const addTask = async (taskDetails) => {
    let response;
    try {
      response = await API.graphql({
        query: mutations.createTask,
        variables: { input: taskDetails },
      });
    } catch (err) {
      console.log(err);
    }
    if (response) {
      console.log("success", response.data.createTask);
      let updatedTasksArray = [response.data.createTask, ...tasksArray];
      setTasksArray(updatedTasksArray);
      return response;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasksArray, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskContextProvider };
