import { createContext, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as customQueries from "../graphql/customQueries";
import { parseISO, differenceInCalendarDays } from "date-fns";

const RemindersContext = createContext();

function RemindersContextProvider({ children }) {
  const [remindersArray, setRemindersArray] = useState([]);

  const getAllReminders = async () => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(customQueries.listReminders)
      );
    } catch (err) {
      console.error(err);
    }
    return response;
  };

  const deleteReminder = async (reminderId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.deleteReminder, {
          input: { id: reminderId },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response;
  };

  const getReminders = async () => {
    let response = await getAllReminders();
    let dateHelper = new Date();
    if (response) {
      let newResponse = response.data.listReminders.items;
      let filteredResponse = newResponse.filter((el) => {
        const result = differenceInCalendarDays(parseISO(el.date), dateHelper);
        if (result <= 5) return true;
        else return false;
      });
      const sortedResponse = filteredResponse.sort((a, b) => a.date - b.date);
      setRemindersArray(sortedResponse);
    }
  };

  const createReminder = async (details) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.createReminder, { input: details })
      );
    } catch (err) {
      console.error(err);
    }
    if (response.data.createReminder) {
      getReminders();
    }
    return response;
  };

  return (
    <RemindersContext.Provider
      value={{
        remindersArray,
        deleteReminder,
        getReminders,
        getAllReminders,
        createReminder,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
}

export { RemindersContext, RemindersContextProvider };
