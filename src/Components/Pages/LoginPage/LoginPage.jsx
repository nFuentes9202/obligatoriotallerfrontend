import {useRef, useState} from 'react';
import './LoginPage.css';
import Alert from "../../UI/Alert/Alert"
import { loginApiCall } from './LoginApiCall';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const inputUserNameRef = useRef();
    const inputPassRef = useRef();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [btnState, setBtnDisabled] = useState(true);
    const dispatcher = useDispatch();
    const navigateTo = useNavigate();
  

    const validateForm = () =>{

        return(

            inputUserNameRef.current.value.trim() !== "" && inputPassRef.current.value.trim() !== ""

        );

    };


    const _onHandleChange = () => {

      setBtnDisabled(!validateForm());

    }

    const _onLogin = async (e) => {

        e.preventDefault();

        if(validateForm()){

          try {
            let username = inputUserNameRef.current.value;
            let password = inputPassRef.current.value;
            const data = await loginApiCall(username, password)

            //onLogin(data);
            dispatcher(loginUser(data))
            navigateTo("/dashboard")
            
          } catch (e) {
            
            setAlertMessage(e.message);
            setAlertClass("alert-danger");

          }

        } else {

          setAlertMessage("Se deben llenar ambos campos obligatoriamente");
          setAlertClass("alert-danger");

        }



    };

return (

    <div className="card">
      <form>
        <div className="form-group">
          <label htmlFor="inputUserName">Nombre de usuario</label>
          <input
            onChange={_onHandleChange}
            ref={inputUserNameRef}
            className="form-control"
            type="text"
            id="inputUserName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPass">Contraseña</label>
          <input
            onChange={_onHandleChange}
            ref={inputPassRef}
            className="form-control"
            type="password"
            id="inputPass"
          />
        </div>
        <button className="btn btn-primary mb-4" onClick={_onLogin} disabled={btnState}>
          Login
        </button>
        {alertMessage !== "" ? <Alert message={alertMessage} classColor={alertClass}/> : ""}

        <div className="row justify-content-center">
          <div className="col-6">
            <Link to="/signup" className="btn btn-violet" style={{ width: '100%' }}>
              ¡Quiero registrarme!
            </Link>
          </div>
        </div>
      </form>
    </div>

)};


export default LoginPage;