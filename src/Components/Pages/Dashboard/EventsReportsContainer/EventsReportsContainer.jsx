import { selectEvents } from "../../../../app/slices/eventsSlice";
import EventsReportCard from "./EventReportCard/EventReportCard";
import {useSelector } from "react-redux";

const EventsReportsContainer = () => {

  const events = useSelector(selectEvents);

  const _fechaActual = new Date();
  const _getBiberones = () => events.filter((evt) => evt.idCategoria === 35).length;

  const _getIconBiberones = () =>{

    if(_getBiberones.length === 0){

        return 'emoji-angry-fill'
    }
    else {
        
        return 'emoji-heart-eyes-fill'

    }

  }
  const _getTiempoUltimoBiberon = () => {

    return 'N/A'

  }

  return (
    <div className="row text-center">
      <EventsReportCard title={"Biberones totales hoy"} value={_getBiberones} icon={_getIconBiberones()} />
      <EventsReportCard title={"Último biberon"} value={_getTiempoUltimoBiberon()} icon='clock' />
      <EventsReportCard title={"Pañales cambiados hoy"} value={_getBiberones} icon={'person-heart'} />
      <EventsReportCard title={"Último cambio de pañal"} value={_getTiempoUltimoBiberon()} icon='emoji-tear' />
    </div>
  );
};

export default EventsReportsContainer;
