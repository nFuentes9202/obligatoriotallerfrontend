import { useState, useEffect } from "react";
import EventListingContainer from "./EventListingContainer/EventListingContainer";
import EventsReportsContainer from "./EventsReportsContainer/EventsReportsContainer";
import Header from "./Header/Header"
import AddEventContainer from "./AddEventContainer";
import { CategoriasAPICall } from "./CategoriasAPICall";
import Alert from "../../UI/Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUserLogged } from "../../../app/slices/userSlice";
import { loadInitialEvents } from "../../../app/slices/eventsSlice";
import { loadInitialCategorias } from "../../../app/slices/categoriasSlice";


const DashboardPage = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");
    const dispatcher = useDispatch();

    const userLogged = useSelector(selectUserLogged);
    
    const loadCategorias = async () => {
        try {
            const categoriasData = await CategoriasAPICall(userLogged.apiKey, userLogged.id);
            dispatcher(loadInitialCategorias(categoriasData.categorias));
            //setCategorias(categoriasData.categorias);
        } catch (e) {
            setAlertMessage(e.message || "Hubo un error al cargar las categorías, recargue la página");
            setAlertClass("alert-danger");
        }
    };

    useEffect(() => {
        fetch(
            "https://babytracker.develotion.com/eventos.php?idUsuario=" + userLogged.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : userLogged.apiKey,
                    "iduser" : userLogged.id,
                },
            }
        )
            .then((response)=> {
                if(response.status === 200){
                    return response.json();
                } else{ 
                    return Promise.reject({
                        message: "Ha ocurrido un error",
                        status: response.status,
                    });
                }
            })
            .then((data) => {
                dispatcher(loadInitialEvents(data.eventos));
            })
            .catch((e) => e.status === 401 ? dispatcher(logoutUser()) : setAlertMessage(e.message || "Hubo un error al traer los eventos, refresque e intente nuevamente"),
            setAlertClass("alert-danger") );
            
            loadCategorias();

        }, []);
    

    return(
        <div className="container-fluid">
            <Header/>
            <EventsReportsContainer
            />
            <AddEventContainer/>
            <EventListingContainer
            />
             {alertMessage !== "" ? <Alert message={alertMessage} classColor={alertClass}/> : ""}
        </div>
    );
};

export default DashboardPage;