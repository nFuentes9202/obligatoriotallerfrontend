import {useRef, useState, useEffect} from 'react';
import './RegisterPage.css';
import Alert from "../../UI/Alert/Alert"
import { registerUserApiCall, getCiudades, getDepartamentos } from './RegisterApiCall';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const inputUserNameRef = useRef();
    const inputPassRef = useRef();
    const selectDepartamentosRef = useRef();
    const selectCiudadRef = useRef();
    const dispatcher = useDispatch();
    const navigateTo = useNavigate();

    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const [btnState, setBtnDisabled] = useState(true);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('default');

    useEffect(() => {
        const loadDepartamentos = async () => {
            try {
                const departamentosData = await getDepartamentos();
                setDepartamentos(departamentosData.departamentos);
            } catch (e) {
                setAlertMessage(e.message || "Hubo un error al cargar los departamentos, recargue la página");
                setAlertClass("alert-danger");
            }
        };

        loadDepartamentos();

    }, []);


    useEffect(() => {

        if (selectDepartamentosRef.current.value !== 'default') {
            const loadCiudades = async () => {
                try {
                    const ciudadesData = await getCiudades(selectDepartamentosRef.current.value);
                    setCiudades(ciudadesData.ciudades);
                } catch (e) {
                    setAlertMessage(e.message || "Hubo un error al cargar las ciudades, recargue la página");
                    setAlertClass("alert-danger");
                }
            };
            loadCiudades();
        }

    }, [selectedDepartamento]);


    const _OnDepartamentoChange = (e) =>{

        const newDepartamento = e.target.value;
        setSelectedDepartamento(newDepartamento);
        _onHandleChange();

    }

    const _OnCiudadChange = (e) =>{
        _onHandleChange();
    }


    const validateForm = () =>{

        return(

            inputUserNameRef.current.value.trim() !== "" 
            && inputPassRef.current.value.trim() !== "" 
            && selectDepartamentosRef.current.value !== "default" 
            && selectCiudadRef.current.value !== "default"

        );

    };


    const _onHandleChange = () => {

      setBtnDisabled(!validateForm());

    }

    const _onRegister = async (e) => {

        e.preventDefault();

        if(validateForm()){

          try {
            let username = inputUserNameRef.current.value;
            let password = inputPassRef.current.value;
            let idDepartamento = selectDepartamentosRef.current.value;
            let idCiudad = selectCiudadRef.current.value;
            const data = await registerUserApiCall(username, password, idDepartamento, idCiudad)

            //onRegister(data);
            dispatcher(registerUser(data));
            navigateTo("/dashboard");
            
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
        <div className="form-group">
          <label htmlFor="selectDepartamentos">Departamento</label>
          <select
            onChange={_OnDepartamentoChange}
            ref={selectDepartamentosRef}
            className="form-control"
            id="selectDepartamentos"
          >

            <option value="default">Selecciona un departamento</option>
            {departamentos.map(departamento => (

                <option key={departamento.id} value={departamento.id}>

                    {departamento.nombre}

                </option>

            ))}
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="selectCiudades">Ciudad</label>
          <select
            onChange={_OnCiudadChange}
            ref={selectCiudadRef}
            className="form-control"
            id="selectCiudades"
          >
            
            <option value="default">Selecciona una ciudad</option>
            {ciudades.map(ciudad => (

                <option key={ciudad.id} value={ciudad.id}>

                    {ciudad.nombre}

                </option>

            ))}

        </select>
        </div>
        <button className="btn btn-primary" onClick={_onRegister} disabled={btnState}>
          Registrarse
        </button>
        {alertMessage !== "" ? <Alert message={alertMessage} classColor={alertClass}/> : ""}
      </form>
    </div>

)};


export default RegisterPage;