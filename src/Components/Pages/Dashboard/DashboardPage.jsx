import { useState, useEffect } from "react";
import EventListingContainer from "./EventListingContainer/EventListingContainer";
import EventsReportsContainer from "./EventsReportsContainer/EventsReportsContainer";
import Header from "./Header/Header"
import AddEventContainer from "./AddEventContainer";



const DashboardPage = ({userLogged, onLogout}) => {
    const [events, setEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    function formatDateFromString(dateString) {

        const datePart = dateString.split(" ")[0];
        
        const [year, month, day] = datePart.split("-");
    
        return `${year}-${month}-${day}`;
    }
    

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
                setEvents(data.eventos);
                setFilterEvents(data.eventos);
            })
            .catch((e) => console.error(e));
    });

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

    const _onDelete = (id) => {
      const newEventsList = events.filter((unEvent) => unEvent.id !== id);
      setEvents(newEventsList);  
    }
    
    const _onFilter = (selected) =>{
        if(selected === "0") {
            setFilterEvents(events);
        } else if( selected === "1"){
            alert("Se mostrarias los eventos de hoy");
            setFilterEvents(events.filter((unEvent) => formatDateFromString(unEvent.fecha) === formatDate(new Date())));
        } else{
            alert("Se mostraran los eventos anteriores");
            setFilterEvents(events.filter((unEvent) => formatDateFromString(unEvent.fecha) < formatDate(new Date())))
        }
    };

    return(
        <div className="container-fluid">
            <Header onLogout={onLogout}/>
            <EventsReportsContainer
            events={filterEvents}
            />
            <AddEventContainer/>
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