import { DeleteEventAPI } from "../../../../../../Services/api";

const EventListingRow = ({id, userLogged, onDelete, icono, idCategoria, detalle, fecha}) => {
    const _onDelete = async () => {
        try{
            await DeleteEventAPI(id, userLogged.id, userLogged.apiKey);
            onDelete(id);
            console.log("idEvento:",id,"IDusuario:", userLogged.id);
            
        } catch(error){
            console.log("Error delete EvenetListingRow")
        }
    };
    
    return(
        <tr>
            <td>{id}</td>
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