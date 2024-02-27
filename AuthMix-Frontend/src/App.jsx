import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./Screen/Login/loginPage";
import Home from "./Screen/Home/Home";

function App() {
  
  React.useEffect(()=>{
    const checkIsLoggedIn=async()=>{

    }
    checkIsLoggedIn();
  },[])

  return (
    <Routes>
      <Route path="/login" Component={LoginPage}></Route>
      <Route path="/" Component={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
