import EventListingRow from "./EventListingRow";

const EventListingTable = ({idEvento, userLogged, onDelete, events}) => {
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Icono</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Fecha y Hora</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {events.map(({icono, idCategoria, detalle, fecha}) => (
                    <EventListingRow
                        icono={icono}
                        idCategoria={idCategoria}
                        detalle={detalle}
                        fecha={fecha}
                        idEvento={idEvento}
                        userLogged={userLogged}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};
export default EventListingTable;