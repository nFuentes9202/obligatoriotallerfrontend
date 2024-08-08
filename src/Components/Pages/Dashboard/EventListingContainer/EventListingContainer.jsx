import EventListingTable from "./EventListingTable";
import EventListingFilter from "./EventListingFilter";

const EventListingContainer = ({ userLogged, onDelete, events, onFilter, categorias}) => {
  return (
    <div className="row my-3">
      <div className="col-12">
        <div className="card">
          <EventListingFilter onFilter={onFilter} />
          <div className="card-body">
            <h5>Lista de Eventos</h5>
            <EventListingTable 
              events={events} 
              userLogged={userLogged}
              onDelete={onDelete}
              categorias={categorias}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListingContainer;
