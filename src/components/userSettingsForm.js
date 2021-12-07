import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../context/site';
import useForm from '../hooks/form.js';


export default function UserSettingsForm() {
  let settings = useContext(SettingsContext);
  const { handleChange, handleSubmit } = useForm(settings.handleSave);
  console.log(settings)
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <h2>Site Settings</h2>

        <label>
          <span>Items Per Page</span>
          <input onChange={handleChange} name="displayedItems" type="text" placeholder={`${settings.displayedItems}`} />
        </label>

        <label>
          <span>Hide Completed</span>
          <select onChange={handleChange} name="hideComplete" value={settings.hideComplete}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <label>
          <button type="submit">Save</button>
        </label>
      </form>
    </div>
  )
}
