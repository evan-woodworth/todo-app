import './App.css';

import ToDo from './components/todo/todo.js';
import UserSettingsForm from './components/userSettingsForm';
import Auth from './components/auth/IsAuthorized';
import Login from './components/auth/Login'

function App() {
  return (
    <>
      <Login />
      <Auth capability='read'>
        <UserSettingsForm />
        <ToDo />
      </Auth>
    </>
  );
}

export default App;