'use client';

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/signIn/page";
import Register from "../components/auth/signUp/page";

function App () {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
