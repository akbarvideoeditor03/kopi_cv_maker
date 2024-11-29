import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import HomeUser from "../client/home";
import UserList from "../admin/userList";
import UserListDetail from "../admin/userListDetail";
import CreateUser from "../admin/createUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<HomeUser />}></Route>
        <Route path="/user" element={<UserList />}></Route>
        <Route path="/user/:id" element={<UserListDetail />}></Route>
        <Route path="/user/create" element={<CreateUser />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
