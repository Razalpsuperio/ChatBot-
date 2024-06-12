import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Bot from './page/Bot/Bot';
import AdminPage from "./page/AdminPage/AdminPage";
import Home from "./page/Home/Home";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Bot />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Home" element={<Home />} />
    
      </Routes>
    </>
  );
};

export default App;
