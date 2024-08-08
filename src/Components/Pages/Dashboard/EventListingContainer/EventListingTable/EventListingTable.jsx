import EventListingRow from "./EventListingRow";

const EventListingTable = ({id, userLogged, onDelete, events, categorias}) => {

    const _nombreCategoria = (idCategoria) => {
        const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
        return unaCategoria ? unaCategoria.tipo : 'Sin categoria';
    };

    const _imagenCategoria = (idCategoria) => {
        const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
        return unaCategoria ? unaCategoria.imagen : '1';
    };

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Id evento</th>
                    <th scope="col">Icono</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Fecha y Hora</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {events.map(({id, imagen, idCategoria, detalle, fecha}) => (
                    <EventListingRow
                        id={id}
                        icono={_imagenCategoria(idCategoria)}
                        nombreCategoria={_nombreCategoria(idCategoria)}
                        detalle={detalle}
                        fecha={fecha}
                        userLogged={userLogged}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};
export default EventListingTable;