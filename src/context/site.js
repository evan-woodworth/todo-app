import React, { useState, useEffect } from "react";
import { stringify } from "uuid";

export const SettingsContext = React.createContext();

function Settings(props) {

  let [state, setState] = useState({
    hideComplete: true,
    displayedItems: 5,
    sort: 'difficulty',
    handleSave: function(values) {
      const {hideComplete, displayedItems, sort} = values
      let currentState = {
        hideComplete,
        displayedItems,
        sort
      }
      localStorage.setItem('userSettings', JSON.stringify(currentState));
    }
  })

  useEffect(()=>{
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      setState(JSON.parse(userSettings));
    }
  }, [])

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default Settings;