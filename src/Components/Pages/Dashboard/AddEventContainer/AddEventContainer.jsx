import {useRef} from "react";

const AddEventContainer = (userLogged) => {
    const selectCategoriaRef = useRef();
    const inputFechaRef = useRef();
    const inputDetalleRef = useRef();

    return (
     <>
        <form className="form-inline">
        <div className="form-group mb-2">
          <label className="sr-only">Categoria:</label>
          <select className="form-control" ref={selectRef}>
            <option value="0">Todos</option>
            <option value="1">Eventos de hoy</option>
            <option value="2">Eventos anteriores</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label className="sr-only">Fecha:</label>
          <input type="date" className="form-control" ref={inputToDoRef} />
        </div>
        <div className="form-group mb-2">
          <label className="sr-only">Detalle:</label>
          <input type="text" className="form-control" ref={inputToDoRef} />
        </div>
        <div className="form-group mb-2">
          <Button cta={"Agregar ToDo"} onHandleClick={_onAddToDo} />
        </div>
        <div>
            
        </div>
      </form>
    </>)
}

export default AddEventContainer;