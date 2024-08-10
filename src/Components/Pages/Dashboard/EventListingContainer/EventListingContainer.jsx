import EventListingTable from "./EventListingTable";
import EventListingFilter from "./EventListingFilter";

const EventListingContainer = () => {
  return (
    <div className="row my-3">
      <div className="col-12">
        <div className="card">
          <EventListingFilter/>
          <div className="card-body">
            <h5>Lista de Eventos</h5>
            <EventListingTable 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventListingContainer;
