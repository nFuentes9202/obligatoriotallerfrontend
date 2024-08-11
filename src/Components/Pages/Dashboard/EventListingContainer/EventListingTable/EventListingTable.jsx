import { selectCategorias } from "../../../../../app/slices/categoriasSlice";
import { selectFilteredEvents } from "../../../../../app/slices/eventsSlice";
import EventListingRow from "./EventListingRow";
import {useSelector } from "react-redux";


const EventListingTable = () => {



    const categorias = useSelector(selectCategorias) || [];
    const events = useSelector(selectFilteredEvents) || [];

    const _nombreCategoria = (idCategoria) => {
        const unaCategoria = categorias.find((unaCat) => unaCat.id == idCategoria);
        return unaCategoria ? unaCategoria.tipo : 'Sin categoria';
    };

    const _imagenCategoria = (idCategoria) => {
        const unaCategoria = categorias.find((unaCat) => unaCat.id == idCategoria);
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
                {events.map(({id, idCategoria, detalle, fecha}) => (
                    <EventListingRow
                        key={id}
                        id={id}
                        icono={_imagenCategoria(idCategoria)}
                        nombreCategoria={_nombreCategoria(idCategoria)}
                        detalle={detalle}
                        fecha={fecha}
                    />
                ))}
            </tbody>
        </table>
    );
};
export default EventListingTable;