import { useRef } from "react";
import { useDispatch } from "react-redux";
import { onFilter } from "../../../../../app/slices/eventsSlice";


const EventListingFilter = () => {
  const selectRef = useRef();
  const dispatcher = useDispatch();
  
  const _onHandleChange = () => {
    dispatcher(onFilter(selectRef.current.value));
    //onFilter(selectRef.current.value);
  };

  return (
    <select className="form-control" onChange={_onHandleChange} ref={selectRef}>
      <option value="0">Todos</option>
      <option value="1">Eventos de hoy</option>
      <option value="2">Eventos anteriores</option>
    </select>
  );
};

export default EventListingFilter;
