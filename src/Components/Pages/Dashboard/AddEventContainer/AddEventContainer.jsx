import { useRef } from "react";
import Button from "../../../UI/Button/Button";

const AddEventContainer = (userLogged) => {
  const selectCategoriaRef = useRef();
  const inputFechaRef = useRef();
  const inputDetalleRef = useRef();

  return (
    <>
          <form className="card">
            <h5>Agregar evento</h5>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <label className="sr-only" htmlFor="slcCategorias" id="slcCategorias">Categoria:</label>
                <input type="text" className="form-control mb-3" id="slcCategorias" ref={selectCategoriaRef}/>
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="fechaEvento" id="fechaEvento">Fecha:</label>
                <input type="date" className="form-control mb-3" id="fechaEvento" ref={inputFechaRef}/>
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="detalleEvento" id="detalleEvento">Detalle:</label>
                <input type="text" className="form-control mb-3" id="detalleEvento" ref={inputDetalleRef}/>
              </div>
              
              <div className="col-auto">
                <Button message={"Agregar evento"} className="mb-3"/>
              </div>
            </div>
          </form>
    </>
  );
};

export default AddEventContainer;
