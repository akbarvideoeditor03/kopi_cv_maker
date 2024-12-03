import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import HomeUser from "../client/home";
import UserList from "../admin/userList";
import UserListDetail from "../admin/userListDetail";
import CreateUserAdmin from "../admin/createUser";
import UpdateUserAdmin from "../admin/updateUser";
import UpdateUserSelf from "../client/user/updateUser";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/register" element={<Register />}></Route>
        <Route path="/home" element={<HomeUser />}></Route>
        <Route path="/user" element={<UserList />}></Route>
        <Route path="/user/:id" element={<UserListDetail />}></Route>
        <Route path="/user/create" element={<CreateUserAdmin />}></Route>
        <Route path="/user/edit/:id" element={<UpdateUserAdmin />}></Route>
        <Route path="/user/edit/:id" element={<UpdateUserSelf />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
