import { useEffect, useRef, useState } from "react";
import Button from "../../../UI/Button/Button";
import Alert from "../../../UI/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { selectCategorias } from "../../../../app/slices/categoriasSlice";
import { selectUserLogged } from "../../../../app/slices/userSlice";
import AddEventApiCall from "./AddEventApiCall";
import { onAddEvent } from "../../../../app/slices/eventsSlice";
import GifAlert from "../../../UI/GifAlert/GifAlert";

const AddEventContainer = () => {
  const selectCategoriaRef = useRef();
  const inputFechaRef = useRef();
  const inputDetalleRef = useRef();
  const [btnState, setBtnDisabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const triggerAlert = () => {
    setShowAlert(true);
  };

  const categorias = useSelector(selectCategorias);
  const userLogged = useSelector(selectUserLogged);
  const dispatcher = useDispatch();

  const _onHandleChange = () => {

    selectCategoriaRef.current.value === 'default' || selectCategoriaRef.current.value === 'undefined' ? setBtnDisabled(true) : setBtnDisabled(false);

  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const resetearCampos = () => {

    selectCategoriaRef.current.value = 'default';
    inputFechaRef.current.value = formatDate(new Date());
    inputDetalleRef.current.value = '';
    setBtnDisabled(true);
  }

  const _onAddEvent = async (e) => {

    e.preventDefault();

    if(validateForm){

      try {
        let categoriaId = selectCategoriaRef.current.value;
        let userId = userLogged.id;
        let apiKey = userLogged.apiKey;
        let detalle = inputDetalleRef.current.value;
        let fecha = new Date(inputFechaRef.current.value);
        let formattedDate = formatDate(fecha);
        const data = await AddEventApiCall(categoriaId, userId, detalle, formattedDate,apiKey);

        //onRegister(data);
       dispatcher(onAddEvent({
         id: data.idEvento,
         idCategoria: categoriaId,
         idUsuario: userId,
         detalle: detalle,
         fecha: formattedDate,
       }));
       resetearCampos();
       triggerAlert();
        
      } catch (e) {
        
        setAlertMessage(e.message);
        setAlertClass("alert-danger");

      }

    } else {

      setAlertMessage("Revise la fecha y la categoria e intente nuevamente");
      setAlertClass("alert-danger");

    }

  }



  const validateForm = () => {
    let currentDate = new Date();
    let inputDate = new Date(inputFechaRef.current.value);

    return selectCategoriaRef.current.value !== 'default' && 
           selectCategoriaRef.current.value !== 'undefined' && 
           inputDate <= currentDate;
}




  useEffect(() => {
    const now = new Date();
    const formattedDate = formatDate(now);

    if (inputFechaRef.current) {
        inputFechaRef.current.value = formattedDate;
    }
}, []);

  return (
    <>
          <form className="card">
            <h5 className="text-center">Agregar evento</h5>
            <div className="form-row align-items-center justify-content-center">
              <div className="col-auto">
                <label className="label" htmlFor="slcCategorias" id="slcCategorias">Categoria:</label>
                <select
                
                ref={selectCategoriaRef}
                className="form-control"
                id="slcCategorias"
                onChange={_onHandleChange}
                >

                  <option value="default">Seleccione una categoria..</option>
                  {categorias.map(categoria => (
                    
                    <option key={categoria.id} value={categoria.id}>

                      {categoria.tipo}

                    </option>

                  ))}
                </select>
              </div>
              <div className="col-auto">
                <label className="label" htmlFor="fechaEvento" id="fechaEvento">Fecha:</label>
                <input type="datetime-local" className="form-control mb-3" id="fechaEvento" ref={inputFechaRef}/>
              </div>
              <div className="col-auto">
                <label className="label" htmlFor="detalleEvento" id="detalleEvento">Detalle:</label>
                <input type="text" className="form-control mb-3" id="detalleEvento" ref={inputDetalleRef}/>
              </div>
              
              <div className="col-auto">
                <Button isDisabled={btnState} message={"Agregar evento"} className="mb-3" onHandleClick={_onAddEvent}/>
              </div>
            </div>
          </form>
          {alertMessage !== "" ? <Alert message={alertMessage} classColor={alertClass}/> : ""}
          {showAlert && (
            <GifAlert
              gifUrl="https://i.gifer.com/2kXk.gif"
              message="Se agregó correctamente ¡Mira que contento está el bebe!"
              onClose={() => setShowAlert(false)}
            />
          )}
    </>
  );
};

export default AddEventContainer;
