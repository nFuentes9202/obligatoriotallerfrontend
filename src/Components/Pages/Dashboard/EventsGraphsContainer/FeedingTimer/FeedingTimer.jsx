import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "../../../../../app/slices/eventsSlice";

const FeedingTimer = () => {

    const events = useSelector(selectEvents);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [timeExceeded, setTimeExceeded] = useState(null);

    const getTimeRemaining = () => {

        const lastFeeding = events.filter(event => event.idCategoria == 35).sort((a,b) => new Date (b.fecha) - new Date(a.fecha))[0];

        if(lastFeeding){

            const lastFeedingTime = new Date(lastFeeding.fecha);

            const now = new Date();

            const timeDifference = now - lastFeedingTime;
            const hoursDifference = timeDifference / (1000 * 60 * 60);

            const remainingTime = 4 - hoursDifference;
            setTimeRemaining(remainingTime);

            setTimeExceeded(remainingTime <= 0);
         } else {
            setTimeRemaining(null);
        };

    }
    const formatTime = (timeInHours) => {
        const absTime = Math.abs(timeInHours);
        const hours = Math.floor(absTime);
        const minutes = Math.floor((absTime * 60) % 60);
        return `${timeInHours < 0 ? '-' : ''}${hours}:${minutes.toString().padStart(2, '0')}`;
      };
    
      useEffect(() => {
        getTimeRemaining();
    
        const interval = setInterval(() => {
            getTimeRemaining();
        }, 60000);
    
        return () => clearInterval(interval);
      }, [events]);
    
      if (timeRemaining === null) {
        return <p>No hay registros de biberones aún.</p>;
      }
    
      return (
        <div>
          <h5>
            Tiempo restante para el próximo biberón:{" "}
            <span style={{ color: timeExceeded ? "red" : "green" }}>
              {formatTime(timeRemaining)} horas
            </span>
          </h5>
        </div>
      );
};

export default FeedingTimer;