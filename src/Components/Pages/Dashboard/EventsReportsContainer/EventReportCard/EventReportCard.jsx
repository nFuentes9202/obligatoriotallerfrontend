import './EventReportCard.css';

const EventReportCard = ({title, value, icon}) => {

return (

        <div className="col-md-3 card-group">
            <div className={'card stats-info'}>
                <div className="card-body">
                    <h4>{title}</h4>
                    <h5>{value}</h5>
                    <i className={`bi bi-${icon}`}></i>
                </div>
            </div>
        </div>
    );
};

export default EventReportCard;