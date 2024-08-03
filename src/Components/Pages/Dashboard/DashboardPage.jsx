import EventListingContainer from "./EventListingContainer/EventListingContainer";
import { useState } from "react";

const DashboardPage = () => {

    /////llamada a api
    const EventListingAPI = async () => {
        try {
            const response = await fetch(
                "https://babytracker.develotion.com/eventos.php?idUsuario=3859",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey" : "7d314199e4d7ab751d8d6f55680106f5",
                        "iduser" : "3859"
                    },
                }
            );
            if (response.status === 200){
                const data = await response.json();
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
    
    /////
    //const events = EventListingAPI;
    const [filterEvents, setFilterEvents] = useState([]);
    
    const _onFilter = (selected) =>{
        if(selected === "0") {
            setFilterEvents(EventListingAPI);
        } else if( selected === "1"){
            alert("Se mostrarias los eventos de hoy")
        };
    };
    return(
        <div className="container-fluid">
            <EventListingContainer
            events={filterEvents}
            onFilter={_onFilter}/>
        </div>
    );
};

export default DashboardPage;