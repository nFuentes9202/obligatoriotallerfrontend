import { useRef } from "react";

const EventListingFilter = ({ onFilter }) => {
  const selectRef = useRef();
  
  const _onHandleChange = () => {
    onFilter(selectRef.current.value);
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
