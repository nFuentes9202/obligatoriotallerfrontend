import { DeleteEventAPI } from "../../../../../../Services/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogged } from "../../../../../../app/slices/userSlice";
import { onDelete } from "../../../../../../app/slices/eventsSlice";

const EventListingRow = ({id, icono, nombreCategoria, detalle, fecha}) => {
    const dispatcher = useDispatch();

    const userLogged = useSelector(selectUserLogged);

    const _onDelete = async () => {
        try{
            await DeleteEventAPI(id, userLogged.id, userLogged.apiKey);
            dispatcher(onDelete(id));
            
        } catch(error){
            
        }
    };
    
    return(
        <tr>
            <td>{id}</td>
            <td><img src={`https://babytracker.develotion.com/imgs/${icono}.png`} alt={nombreCategoria}/></td>
            <td>{nombreCategoria}</td>
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