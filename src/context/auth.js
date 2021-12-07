import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext();

// dummy users for testing
const testUsers = {
  administrator: {username: 'administrator', password: 'test', capabilities:['create', 'read', 'update', 'delete']},
  user: {username: 'user', password: 'test', capabilities:['read']},
}

const SECRET = process.env.REACT_APP_SECRET || 'gumshoe';

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: '',
    token: '',
    capabilities: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isAuthorized(capability) {
    return user?.capabilities?.includes(capability);
  }

  function login(username, password) {

    let user = testUsers[username];

    if (user) {
      const token = jwt.sign({ user }, SECRET);
      setUser({
        username: user.username,
        token: token,
        capabilities: user.capabilities
      });
      setIsLoggedIn(true);
    }
  }

  function logout() {
    if (isLoggedIn) {
      setUser({username: '', token: '', capabilities: []});
      setIsLoggedIn(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
