import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

function Settings({children}) {

  const [state, setState] = useState({
    hideComplete: true,
    displayedItems: 5,
    sort: 'difficulty'
  })

  const handleChange = (e, values) => {
    const { hideComplete, displayedItems, sort } = values;
    setState({
      hideComplete,
      displayedItems,
      sort
    })
  }

  const handleSave = (e) => {
    console.log(state)
    localStorage.setItem('userSettings', JSON.stringify(state));
  }

  useEffect(()=>{
    let userSettings = localStorage.getItem('userSettings');
    if (userSettings) {
      console.log(state)
      const { hideComplete, displayedItems, sort } = JSON.parse(userSettings);
      setState({ hideComplete, displayedItems, sort });
    }
  }, [])

  return (
    <SettingsContext.Provider value={{
        state,
        handleChange,
        handleSave
      }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default Settings;