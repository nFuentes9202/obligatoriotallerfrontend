import {useRef, useState} from 'react';
import './LoginPage.css';
import Alert from "../../UI/Alert/Alert"
import { loginApiCall } from './LoginApiCall';

const LoginPage = ({onLogin}) => {

    const inputUserNameRef = useRef();
    const inputPassRef = useRef();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [btnState, setBtnDisabled] = useState(true);

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

            onLogin(data);
            
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
        <button className="btn btn-primary" onClick={_onLogin} disabled={btnState}>
          Login
        </button>
        {alertMessage !== "" ? <Alert message={alertMessage} classColor={alertClass}/> : ""}
      </form>
    </div>

)};


export default LoginPage;