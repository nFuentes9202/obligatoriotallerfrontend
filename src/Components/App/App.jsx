import "./App.css";
import "bootstrap-css-only";

import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import { useState } from "react";
import { 
  setToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage } from "../../Helpers/localStorage";

function App() {
  const userData = getFromLocalStorage("userData");
  const [userLogged, setUserLogged] = useState(userData);

  const _loginUser = (userData) => {
    setUserLogged(userData);
    setToLocalStorage("userData", userData);
  };

  const _registerUser = (userData) => {
    setUserLogged(userData);
    setToLocalStorage("userData", userData);
  };

  return (

    <>
      <DashboardPage userLogged = {userLogged}/>
      {userLogged 
        ? <DashboardPage /> 
        : <LoginPage onLogin={_loginUser} />}
      {userLogged 
        ? (<DashboardPage />) 
        : (<RegisterPage onRegister={_registerUser} />)}
    </>
  );
}

export default App;
