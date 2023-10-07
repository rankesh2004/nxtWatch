import React from 'react'

const ReactContext = React.createContext({
  isDark: false,
  saveList: [],
  toggleToDark: () => {},
  saveVideoToList: () => {},
})

export default ReactContext
