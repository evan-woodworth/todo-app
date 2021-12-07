import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import base64 from 'base-64';
const DB_URL = process.env.DB_URL || 'localhost:3003';

export const AuthContext = React.createContext();
const SECRET = process.env.REACT_APP_SECRET || 'gumshoe';

async function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: '',
    token: '',
    capabilities: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isAuthorized(capability) {
    return user?.capabilities?.includes(capability);
  }

  async function login(username, password) {

    const encodedString = base64.encode(`${username}:${password}`);
    let url = `${DB_URL}/signin/`;
    let user = await axios.post(url, {
      headers: {
        'Authorization': `Basic ${encodedString}`
      }
    })

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
