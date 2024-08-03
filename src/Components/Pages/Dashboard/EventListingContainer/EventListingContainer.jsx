import EventListingTable from "./EventListingTable";
import EventListingFilter from "./EventListingFilter";

const EventListingContainer = ({ events, onFilter }) => {
   //agregar como prop userLogged, onDelete
  return (
    <div className="row my-3">
      <div className="col-12">
        <div className="card">
          <EventListingFilter onFilter={onFilter} />
          <div className="card-body">
            <h5>Lista de Eventos</h5>
            <EventListingTable events={events} 
            //falta pasarle el userLogged, onDelete del boton
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListingContainer;
