import './App.css';
import LoginPage from '../Pages/LoginPage/LoginPage';
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import "bootstrap-css-only";
import {useState} from 'react';

function App() {
  const [userLogged, setUserLogged] = useState(null);

  const _loginUser = (userData) =>{

    setUserLogged(userData);

  }

  return (
    <>

    {userLogged ? <DashboardPage/> : <LoginPage onLogin={_loginUser}/>}

    </>
  );
}

export default App;
