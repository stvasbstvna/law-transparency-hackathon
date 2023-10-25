import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { APIusers } from "../utils/consts";

const userContext = createContext();

export function useUserContext() {
  return useContext(userContext);
}

function UserContext({ children }) {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const { data } = await axios(APIusers);
    setUsers(data);
  }

  async function addUser(newData) {
    await axios.post(APIusers, newData);
    getUsers();
  }

  const value = {
    users,
    getUsers,
    addUser,
  };
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

export default UserContext;
