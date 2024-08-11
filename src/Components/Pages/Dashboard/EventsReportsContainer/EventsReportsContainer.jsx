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

  const calcularDiferenciaTiempo = (fecha) => {
    const tiempoDiferencia = new Date() - fecha;
    const dias = Math.floor(tiempoDiferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoDiferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoDiferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoDiferencia % (1000 * 60)) / 1000);

    if (dias > 0) {
      return `Hace ${dias}d ${horas}h`;
    }
    if (horas > 0) {
      return `Hace ${horas}h ${minutos}m`;
    }
    if (minutos > 0) {
      return `Hace ${minutos}m ${segundos}s`;
    }
    return `Hace ${segundos}s`;
  };

  const _getBiberones = () => events.filter((evt) => evt.idCategoria == 35);
  const _getBiberonesDeHoy = () => _getBiberones().filter((evt) => isToday(evt.fecha));


  const _getIconBiberones = () =>{

    return _getBiberonesDeHoy().length === 0 ? 'emoji-angry-fill' : 'emoji-heart-eyes-fill';

  }

  const _getTiempoUltimoBiberon = () => {
    const biberones = _getBiberones();
    if (biberones.length === 0) {
      return 'N/A';
    }

    const ultimoBiberon = biberones.reduce((latest, evt) =>
      new Date(evt.fecha) > new Date(latest.fecha) ? evt : latest
    );

    return calcularDiferenciaTiempo(new Date(ultimoBiberon.fecha));
  };

  const _getPanialesCambiados = () => events.filter((evt) => evt.idCategoria == 33);

  const _getPanialesCambiadosDeHoy = () => _getPanialesCambiados().filter((evt) => isToday(evt.fecha));

  const _getIconPaniales = () =>{

    return _getPanialesCambiadosDeHoy().length == 0 ? 'hand-thumbs-down-fill' : 'hand-thumbs-up-fill';

  }

  const _getTiempoUltimoCambioPanial = () => {
    const paniales = _getPanialesCambiados();
    if (paniales.length === 0) {
      return 'N/A';
    }

    const ultimoPanial = paniales.reduce((latest, evt) =>
      new Date(evt.fecha) > new Date(latest.fecha) ? evt : latest
    );

    return calcularDiferenciaTiempo(new Date(ultimoPanial.fecha));
  };

  

  return (
    <div className="row text-center card-container">
      <EventsReportCard title={"Biberones totales hoy"} value={_getBiberonesDeHoy().length ? _getBiberonesDeHoy().length : 0} icon={_getIconBiberones()} />
      <EventsReportCard title={"Último biberon"} value={_getTiempoUltimoBiberon()} icon='clock' />
      <EventsReportCard title={"Pañales cambiados hoy"} value={_getPanialesCambiadosDeHoy().length ? _getPanialesCambiadosDeHoy().length : 0} icon={_getIconPaniales()} />
      <EventsReportCard title={"Último cambio de pañal"} value={_getTiempoUltimoCambioPanial()} icon='emoji-tear' />
    </div>
  );
};

export default EventsReportsContainer;
