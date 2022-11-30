import { useState, createContext, useCallback } from "react";

const ClientsContext = createContext();

function ClientContextProvider({ children }) {
  const [selectedClient, setSelectedClient] = useState();

  return (
    <ClientsContext.Provider value={{ selectedClient, setSelectedClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export { ClientsContext, ClientContextProvider };
