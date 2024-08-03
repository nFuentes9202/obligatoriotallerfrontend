import "./App.css";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import "bootstrap-css-only";
import { useState } from "react";

function App() {
  const [userLogged, setUserLogged] = useState(null);

  const _loginUser = (userData) => {
    setUserLogged(userData);
  };

  const _registerUser = (userData) => {
    setUserLogged(userData);
  };

  return (

    <>
      <DashboardPage/>
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
