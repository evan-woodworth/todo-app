import React, { useState } from "react";

export const SettingsContext = React.createContext();

function Settings(props) {

  let [state, setState] = useState({
    hideComplete: true,
    displayedItems: 5,
    sort: 'difficulty',
  })

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default Settings;