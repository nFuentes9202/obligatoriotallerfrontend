import { DeleteEventAPI } from "../../../../../../Services/api";

const EventListingRow = ({idEvento, userLogged, onDelete, icono, idCategoria, detalle, fecha}) => {
    const _onDelete = async () => {
        try{
            await DeleteEventAPI(idEvento, userLogged.id);
            onDelete(idEvento);
        } catch(error){
            console.log("Error delete EvenetListingRow")
        }
    };
    return(
        <tr>
            <td>{icono}</td>
            <td>{idCategoria}</td>
            <td>{detalle}</td>
            <td>{fecha}</td>
            <td>
                <button className="btn btn-danger" 
                onClick={_onDelete}>Eliminar</button>
            </td>
        </tr>
    );
};

export default EventListingRow;