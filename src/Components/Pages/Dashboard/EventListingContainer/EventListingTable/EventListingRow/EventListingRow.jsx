import { useEffect, useState } from "react";
import { DeleteEventAPI } from "../../../../../../Services/api";

const EventListingRow = ({id, userLogged, onDelete, icono, idCategoria, detalle, fecha}) => {
    const [categorias, setCategorias] = useState([]);
    //const [nombreCategoria, setNombreCategoria] = useState("");

    const _onDelete = async () => {
        try{
            await DeleteEventAPI(id, userLogged.id, userLogged.apiKey);
            onDelete(id);
            console.log("idEvento:",id,"IDusuario:", userLogged.id);
            
        } catch(error){
            console.log("Error delete EvenetListingRow")
        }
    };
    
    useEffect(() => {
        const GetCategoriasAPI = async () => {
            try {
                console.log("holi");

                const response = await fetch(
                    "https://babytracker.develotion.com//categorias.php",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "apikey" : userLogged.apiKey,
                            "iduser" : userLogged.idUsuario
                        },
                    }
                );
                if (response.status === 200){
                    const data = await response.json();
                    console.log("array data fetch:",data);
                    return data;
                    
                } else{
                    return Promise.reject({
                        message: "Ha ocurrido un error",
                        status: response.status,
                    });
                }
            } catch (error) {
                return Promise.reject({
                    message: "Ha ocurrido un error",
                });
            }
        };

        /*
        const _getCategoria = async () => {
            try {
                const categoriasData = await GetCategoriasAPI(userLogged);
                setCategorias(categoriasData.categorias);

                //const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
                //return unaCategoria.tipo;
            } catch (error) {
                console.log("Error en useEffect getCategorias");
            }

        };
        _getCategoria();
        */
    }, []);
    
    const _nombreCategoria = () => {
        console.log("categorias",categorias);
        const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
        return unaCategoria;
    };
    /*
        const _findCategoryById = () => {
            const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
            return unaCategoria.tipo;
        };*/
        
    return(
        <tr>
            <td>{id}</td>
            <td>{icono}</td>
            <td>{_nombreCategoria()}</td>
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