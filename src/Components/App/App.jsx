import "./App.css";
import "bootstrap-css-only";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute"
import {Route, Routes} from 'react-router-dom';

function App() {

  return (

    <>
      <Routes>
        <Route path="/" element={
              <PrivateRoute >
                <DashboardPage />
              </PrivateRoute>
              }
        />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute >
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
