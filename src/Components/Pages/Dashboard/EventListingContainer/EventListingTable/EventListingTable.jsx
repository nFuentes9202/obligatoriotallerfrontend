import EventListingRow from "./EventListingRow";

const EventListingTable = ({events}) => {
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
                {events.map(({icono, categoria, detalle, fechaHora}) => (
                    <EventListingRow
                        icono={icono}
                        categoria={categoria}
                        detalle={detalle}
                        fechaHora={fechaHora}
                    />
                ))};
            </tbody>
        </table>
    );
};
export default EventListingTable;