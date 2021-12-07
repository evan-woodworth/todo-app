import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import { SettingsContext } from '../../context/site.js';
import { AuthContext } from '../../context/auth.js';
import { v4 as uuid } from 'uuid';
import Auth from '../auth/IsAuthorized';

const ToDo = () => {

  const [listPage, setListPage] = useState(1);
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  let settings = useContext(SettingsContext);
  let authContext = useContext(AuthContext);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {

    if (authContext.isAuthorized('delete')) {
      const items = list.filter( item => item.id !== id );
      setList(items);
    }

  }

  function toggleComplete(id) {

    if (authContext.isAuthorized('update')) {
      const items = list.map( item => {
        if ( item.id === id ) {
          item.complete = ! item.complete;
        }
        return item;
      });
  
      setList(items);
    }

  }

  function handlePage(e, modifier) {
    console.log(displayList.length)
    let currentPage = listPage;
    let nextPage = currentPage + modifier;
    if ( ((nextPage > 0) && (list.length > (nextPage-1)*settings.displayedItems)) || (nextPage === 1) ) {
      setListPage(nextPage)
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    let tempList = [];
    for (let i=0; i<list.length; i++) {
      if (!settings.hideComplete || !list[i].complete) {
        if (i+1 <= listPage*settings.displayedItems
          && i+1 >= (listPage-1)*settings.displayedItems+1) {
            tempList.push(list[i]);
          }
      }
    }
    setDisplayList(tempList)
  }, [list, listPage]);

  return (
    <>
      <header>
        <h1>To Do List: {incomplete} items pending</h1>
      </header>

      <Auth capability='create'>
        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <button type="submit">Add Item</button>
          </label>
        </form>
      </Auth>

      <div className="btn btn-secondary" onClick={e=>handlePage(e, -1)}>Last Page</div>
      <p>Page: {listPage}</p>
      <div className="btn btn-secondary" onClick={e=>handlePage(e, 1)}>Next Page</div>

      {displayList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}


    </>
  );
};

export default ToDo;
