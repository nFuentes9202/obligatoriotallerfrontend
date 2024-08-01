import AllEventsRow from "./AllEventsRow/AllEventsRow";
const AllEventsTable = () => {
    return (
    <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Icono</th>
            <th scope="col">Categoria</th>
            <th scope="col">Detalle</th>
            <th scope="col">Fecha y Hora</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <AllEventsRow></AllEventsRow>
        </tbody>
      </table>
    );
};

export default AllEventsTable;
