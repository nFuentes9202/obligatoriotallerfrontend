import { selectEvents } from "../../../../app/slices/eventsSlice";
import EventsReportCard from "./EventReportCard/EventReportCard";
import {useSelector } from "react-redux";

const EventsReportsContainer = () => {

  const events = useSelector(selectEvents);

  const now = new Date();

  const isToday = (compareDate) => {

    let formatedDate = new Date(compareDate);

    return now.getDay() === formatedDate.getDay() & now.getMonth() === formatedDate.getMonth() & now.getFullYear() === formatedDate.getFullYear();

  }

  const _getBiberones = () => events.filter((evt) => evt.idCategoria == 35 && isToday(evt.fecha));


  const _getIconBiberones = () =>{

    return _getBiberones().length === 0 ? 'emoji-angry-fill' : 'emoji-heart-eyes-fill';

  }

  const _getTiempoUltimoBiberon = () => {

    const biberones = _getBiberones();
    if (biberones.length === 0) {
      return 'N/A';
    }

    const ultimoBiberon = biberones.reduce((latest, evt) => {
      return new Date(evt.fecha) > new Date(latest.fecha) ? evt : latest;
    });
    return new Date(ultimoBiberon.fecha).toLocaleTimeString();

  }

  const _getPanialesCambiados = () => events.filter((evt) => evt.idCategoria == 33 && isToday(evt.fecha));

  const _getIconPaniales = () =>{

    return _getBiberones().length === 0 ? 'hand-thumbs-up-fill' : 'hand-thumbs-down-fill';

  }

  const _getTiempoUltimoCambioPanial = () => {

    const paniales = _getPanialesCambiados();
    if (paniales.length === 0) {
      return 'N/A';
    }

    const ultimoPanial = paniales.reduce((latest, evt) => {
      return new Date(evt.fecha) > new Date(latest.fecha) ? evt : latest;
    });
    return new Date(ultimoPanial.fecha).toLocaleTimeString();

  }

  return (
    <div className="row text-center card-container">
      <EventsReportCard title={"Biberones totales hoy"} value={_getBiberones().length ? _getBiberones().length : 0} icon={_getIconBiberones()} />
      <EventsReportCard title={"Último biberon"} value={_getTiempoUltimoBiberon()} icon='clock' />
      <EventsReportCard title={"Pañales cambiados hoy"} value={_getPanialesCambiados().length ? _getPanialesCambiados().length : 0} icon={_getIconPaniales()} />
      <EventsReportCard title={"Último cambio de pañal"} value={_getTiempoUltimoCambioPanial()} icon='emoji-tear' />
    </div>
  );
};

export default EventsReportsContainer;
