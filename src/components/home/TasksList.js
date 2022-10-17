import { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, selectAllTasks } from "../../redux/tasks-slice";
import EachTask from "../EachTask";

export default function TasksList() {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      {allTasks.map((task) => (
        <EachTask
          key={task.id}
          id={task.id}
          title={task.title}
          content={task.content}
        />
      ))}
    </>
  );
}
