import "./App.css";
import "bootstrap-css-only";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute"
import { useState } from "react";
import { 
  setToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage } from "../../Helpers/localStorage";
import {Route, Routes, useNavigate} from 'react-router-dom';

function App() {
  const userData = getFromLocalStorage("userData");
  const [userLogged, setUserLogged] = useState(userData);
  const navigateTo = useNavigate();

  const _loginUser = (userData) => {
    setUserLogged(userData);
    setToLocalStorage("userData", userData);
    navigateTo("/dashboard");
  };
  const _logout = () => {
    setUserLogged(null);
    removeFromLocalStorage("userData");
  };


  const _registerUser = (userData) => {
    //setUserLogged(userData);
    //setToLocalStorage("userData", userData);
    _loginUser(userData);
  };

  return (

    <>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={_loginUser}/>}/>
        <Route path="/login" element={<LoginPage onLogin={_loginUser}/>}/>
        <Route path="/signup" element={<RegisterPage onRegister={_registerUser}/>}/>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute userLogged={userLogged}>
              <DashboardPage userLogged = {userLogged} onLogout= {_logout}/>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
