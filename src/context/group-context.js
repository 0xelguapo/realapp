import { createContext, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as customQueries from "../graphql/customQueries";

const GroupsContext = createContext();

function GroupsContextProvider({ children }) {
  const [oneGroupArray, setOneGroupArray] = useState([]);

  
  

  return <GroupsContext.Provider>{children}</GroupsContext.Provider>
}

export { GroupsContext, GroupsContextProvider };
