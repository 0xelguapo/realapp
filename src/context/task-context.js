import { createContext, useState, useEffect } from "react";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

const TaskContext = createContext();

function TaskContextProvider({ children }) {
  const [tasksArray, setTasksArray] = useState([]);
  const [successStatus, setSuccessStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let completedFilter = {
    completed: {
      eq: false,
    },
  };

  const onSuccess = () => {
    setSuccessStatus(true);
    setTimeout(() => {
      setSuccessStatus(false);
    }, 3500);
  };

  const fetchTasks = async () => {
    let response;
    setIsLoading(true);
    try {
      response = await API.graphql({
        query: queries.listTasks,
        variables: { filter: completedFilter },
      });
    } catch (err) {
      console.log("error fetching tasks", err);
    }
    setIsLoading(false);
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
      onSuccess();
      return response;
    }
  };

  const completeTask = async (taskDetails) => {
    let response;
    try {
      response = await API.graphql({
        query: mutations.updateTask,
        variables: { input: taskDetails },
      });
    } catch (err) {
      console.log(err);
    }
    if (response) {
      console.log("successfully updated task", response);
      return response;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasksArray,
        successStatus,
        isLoading,
        addTask,
        completeTask,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskContextProvider };
