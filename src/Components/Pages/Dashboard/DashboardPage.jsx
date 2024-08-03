import { useState, useEffect } from "react";
import EventListingContainer from "./EventListingContainer/EventListingContainer";
import EventsReportsContainer from "./EventsReportsContainer/EventsReportsContainer";
import Header from "./Header/Header"


const DashboardPage = ({userLogged, onLogout}) => {
///// falta pasarle como prop el onLogout del header
    const [events, setEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {
        fetch(
            "https://babytracker.develotion.com/eventos.php?idUsuario=3859",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey" : "7d314199e4d7ab751d8d6f55680106f5",
                    "iduser" : "3859"
                },
            }
        )
            .then((response)=> {
                console.log("response en el 1er then", response);
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
                console.log("data en el 2do then",data)
                setEvents(data.eventos);
                setFilterEvents(data.eventos);
            })
            .catch((e) => console.error(e));
    }, []);

    /*
    /////llamada a api
    /*
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
                return data.eventos;
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
    */
    /////
    //const events = EventListingAPI;

    //Borrado de eventos
    const _onDelete = (idEvento) => {
      const newEventsList = events.filter((unEvent) => unEvent.id !== idEvento);
      setEvents(newEventsList);  
    }
    
    //Filtrado de eventos
    const _onFilter = (selected) =>{
        if(selected === "0") {
            setFilterEvents(events);
        } else if( selected === "1"){
            alert("Se mostrarias los eventos de hoy");
        } else{
            alert("Se mostraran los eventos anteriores");
        }
    };

    
    return(
        <div className="container-fluid">
            <Header onLogout={onLogout}/>
            <EventsReportsContainer
            events={filterEvents}
            />
            <EventListingContainer
            events={filterEvents}
            onFilter={_onFilter}
            userLogged={userLogged}
            onDelete={_onDelete}
            />
        </div>
    );
};

export default DashboardPage;