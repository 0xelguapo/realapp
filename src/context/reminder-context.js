import { createContext, useState } from 'react'

const RemindersContext = createContext()

function RemindersContextProvider({ children }) {
  
  return (
    <RemindersContext.Provider>
      {children}
    </RemindersContext.Provider>
  )
}

export { RemindersContext, RemindersContextProvider}