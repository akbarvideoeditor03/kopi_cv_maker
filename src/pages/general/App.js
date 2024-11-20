import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Home from "./home";
import Login from "./login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
