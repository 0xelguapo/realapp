import { useState, createContext, useCallback } from "react";

const ChooseContext = createContext();

function ChooseContextProvider({ children }) {
  const [selectedClient, setSelectedClient] = useState();
  const [selectedProperty, setSelectedProperty] = useState();

  return (
    <ChooseContext.Provider
      value={{
        selectedClient,
        selectedProperty,
        setSelectedClient,
        setSelectedProperty,
      }}
    >
      {children}
    </ChooseContext.Provider>
  );
}

export { ChooseContext, ChooseContextProvider };
