import './App.css';

import ToDo from './components/todo/todo.js';
import UserSettingsForm from './components/userSettingsForm';

function App() {
  return (
    <>
      <UserSettingsForm />
      <ToDo />
    </>
  );
}

export default App;